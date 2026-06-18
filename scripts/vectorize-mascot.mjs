/**
 * scripts/vectorize-mascot.mjs
 *
 * One-off: convierte public/img/marca/superheroe-home.png (silueta de dos
 * colores planos sobre alpha) en SVG vectorial con paths agrupados por
 * color, listo para animar con GSAP DrawSVG.
 *
 * Estrategia (pensada para esta silueta concreta, no genérica):
 *   1. Cargar el PNG raster con sharp.
 *   2. Para cada color objetivo (cian claro + navy oscuro) producir un
 *      bitmap binario blanco/negro: píxel del color → negro, resto → blanco.
 *   3. Pasarlo por potrace con parámetros pensados para arte vectorial
 *      limpio (turdSize bajo = no descarta motivos pequeños).
 *   4. Componer un único SVG con un <g id="cape"> y un <g id="body">,
 *      añadir grupo wrapper data-bs-mascot.
 *   5. Optimizar con svgo (precisión 2 decimales, sin tocar IDs).
 *
 * No es un script genérico — sirve solo para este PNG.
 *
 * Uso: `node scripts/vectorize-mascot.mjs`
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import potrace from "potrace";
import { optimize } from "svgo";

const PNG_IN = "public/img/marca/superheroe-home.png";
const SVG_OUT = "public/img/marca/superheroe-vector.svg";

// Colores reales detectados en el PNG (muestreados antes con sharp).
// Cian de capa/wordmark/decor: ~#16b6d4 family. Navy del cuerpo: ~#0d3147 family.
const TARGETS = [
  {
    id: "cape",
    color: "#16b6d4", // cian (capa, BONITO, motivos, ojos)
    match: (r, g, b) => {
      // píxeles cian-clarito: azul/verde dominantes, rojo bajo
      return b > 130 && g > 110 && r < 130;
    },
  },
  {
    id: "body",
    color: "#0d3147", // navy (cuerpo + outline)
    match: (r, g, b) => {
      // píxeles muy oscuros con tinte azul
      return r < 80 && g < 90 && b > 40 && b < 130;
    },
  },
];

const VIEWBOX_W = 0; // se calcula tras leer el PNG
const VIEWBOX_H = 0;

async function colorMaskBitmap(rgba, w, h, match) {
  // Devuelve un PNG buffer en grises: píxeles que matchean → 0 (negro), resto → 255 (blanco)
  const out = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) {
    const r = rgba[i * 4];
    const g = rgba[i * 4 + 1];
    const b = rgba[i * 4 + 2];
    const a = rgba[i * 4 + 3];
    const isTarget = a > 40 && match(r, g, b);
    out[i] = isTarget ? 0 : 255;
  }
  return sharp(out, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();
}

function traceBitmap(buffer) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      buffer,
      {
        threshold: 128,
        turdSize: 4,
        optTolerance: 0.2,
        alphaMax: 1.2,
        color: "currentColor",
      },
      (err, svg) => (err ? reject(err) : resolve(svg))
    );
  });
}

function extractPaths(svg) {
  // potrace devuelve un SVG completo con UN solo <path> que concatena muchos
  // subpaths (M ... Z M ... Z …). Para que GSAP pueda stagger, los troceamos
  // por cada "M" inicial → varios <path>, uno por silueta.
  const matches = [...svg.matchAll(/<path[^>]*?d="([^"]+)"/g)];
  const ds = [];
  for (const m of matches) {
    // split por M mayúscula sin perder el comando
    const sub = m[1].split(/(?=M)/g).map((s) => s.trim()).filter(Boolean);
    ds.push(...sub);
  }
  return ds;
}

async function main() {
  const png = sharp(PNG_IN);
  const meta = await png.metadata();
  const { width: w, height: h } = meta;
  const rgba = await png.ensureAlpha().raw().toBuffer();

  console.log(`PNG ${w}x${h}, alpha:${meta.hasAlpha}, canales:${meta.channels}`);

  const groups = [];
  for (const t of TARGETS) {
    console.log(`→ mask & trace ${t.id} (${t.color})`);
    const maskBuf = await colorMaskBitmap(rgba, w, h, t.match);
    const tracedSvg = await traceBitmap(maskBuf);
    const ds = extractPaths(tracedSvg);
    console.log(`  ${ds.length} paths extraídos`);
    groups.push({ id: t.id, color: t.color, ds });
  }

  // Componer SVG final
  const groupsXml = groups
    .map(
      (g) =>
        `<g id="${g.id}" style="color:${g.color}">` +
        g.ds.map((d) => `<path d="${d}"/>`).join("") +
        `</g>`
    )
    .join("");

  const composed =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ` +
    `fill="currentColor" preserveAspectRatio="xMidYMax meet" data-bs-mascot="">` +
    groupsXml +
    `</svg>`;

  // Optimizar con svgo (mantiene IDs y atributos data-*)
  const opt = optimize(composed, {
    multipass: true,
    floatPrecision: 2,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIds: false, // mantenemos #cape #body
            removeUnknownsAndDefaults: { keepDataAttrs: true },
            mergePaths: false, // GSAP necesita paths separados para stagger
          },
        },
      },
    ],
  });

  await fs.mkdir(path.dirname(SVG_OUT), { recursive: true });
  await fs.writeFile(SVG_OUT, opt.data);
  const kb = (opt.data.length / 1024).toFixed(1);
  console.log(`✓ ${SVG_OUT} — ${kb} KB`);
  // Conteo final por grupo
  for (const g of groups) {
    const n = (opt.data.match(new RegExp(`<g id="${g.id}"[\\s\\S]*?</g>`)) || [
      "",
    ])[0].match(/<path /g);
    console.log(`  ${g.id}: ${n ? n.length : 0} paths`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
