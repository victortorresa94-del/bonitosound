/**
 * scripts/vectorize-mascot.mjs
 *
 * Pipeline de vectorización para la IDENTIDAD METAMÓRFICA de Bonito Sound.
 *
 * Convierte los keyframes finales de los vídeos del usuario en SVGs por
 * capas, optimizados para encadenar transformaciones con GSAP (MorphSVG +
 * DrawSVG + ScrollTrigger).
 *
 * El logo "BONITO SOUND" se metamorfosea en distintos objetos musicales
 * (superhéroe → megáfono → guitarra → bafle → ...). En todas las formas:
 *  - el LETTERING "BONITO SOUND" está integrado y se mantiene como ancla
 *    visual (sin morphear); hace crossfade entre formas.
 *  - la SILUETA del objeto cambia → es lo que morphea.
 *
 * Salidas (todas en /public/img/marca/):
 *  - forma-superheroe.svg
 *  - forma-megafono.svg
 *  - forma-guitarra.svg
 *  - forma-bafle.svg
 *
 * Estructura de cada SVG:
 *  <svg viewBox preserveAspectRatio data-bs-forma="...">
 *    <g id="shape" style="color:#0d3147">   ← silueta gruesa (para morph)
 *      <path id="silhouette" d="..." />
 *      <path d="..." /> ...                  ← detalles del objeto
 *    </g>
 *    <g id="lettering" style="color:#16b6d4">
 *      <path d="..." /> ... (BONITO, cian)
 *    </g>
 *    <g id="lettering-dark" style="color:#0d3147">
 *      <path d="..." /> ... (SOUND, navy)
 *    </g>
 *  </svg>
 *
 * Uso: `node scripts/vectorize-mascot.mjs`
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import potrace from "potrace";
import { optimize } from "svgo";

const OUT_DIR = "public/img/marca";

// Fuentes (PNGs/JPEGs) y nombre de la forma a generar.
// Los frames extraídos se guardan en /tmp/keyframes/<name>-last.png — los
// generamos antes con scripts/extract-keyframes.sh (o ffmpeg manual).
// Cada forma puede tener umbrales finos: los frames IA (guitarra, bafle)
// usan un navy casi negro distinto del navy oficial del logo. Sin overrides
// = defaults conservadores que funcionan con #16b6d4 / #0d3147 puros.
const FORMS = [
  {
    name: "superheroe",
    source: "public/img/marca/heroe-megafono.jpeg",
  },
  {
    name: "megafono",
    source: "/tmp/keyframes/megafono-last.png",
  },
  {
    name: "guitarra",
    source: "/tmp/keyframes/guitarra-last.png",
    // Mástil/clavijero/cuerpo cuasinegros: ampliamos navy hasta gris medio.
    navyMaxBrightness: 145,
    // El "BONITO" cian aquí es más saturado: subimos rojo permitido.
    cyanMaxRed: 175,
  },
  {
    name: "bafle",
    source: "/tmp/keyframes/bafle-last.png",
    navyMaxBrightness: 145,
    cyanMaxRed: 175,
  },
];

const COLOR_CYAN = "#16b6d4";
const COLOR_NAVY = "#0d3147";

const SVGO_OPTS = {
  multipass: true,
  floatPrecision: 2,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          cleanupIds: false,
          removeUnknownsAndDefaults: { keepDataAttrs: true },
          mergePaths: false,
          // No eliminar el <path id="silhouette" opacity="0"/> que es la
          // base del morph (sería visualmente invisible, pero el motor
          // GSAP lo lee). svgo lo barre por defecto.
          removeHiddenElems: false,
          removeUselessDefs: false,
        },
      },
    },
  ],
};

/** Carga la imagen y aplica denoise (median) para matar ruido de
 *  compresión. Devuelve buffer RGB raw + dimensiones. */
async function loadDenoised(filePath) {
  const meta = await sharp(filePath).metadata();
  const { width: W, height: H } = meta;
  // Flatten sobre blanco por si el PNG tiene alpha (frames extraídos).
  const buf = await sharp(filePath)
    .flatten({ background: "#ffffff" })
    .median(3)
    .removeAlpha()
    .raw()
    .toBuffer();
  return { buf, W, H };
}

/** Clasifica píxeles: 0=fondo, 1=cyan, 2=navy. Umbrales generosos pero
 *  pensados para los dos tonos corporativos del logo. Acepta overrides
 *  por forma cuando los frames IA tienen tonos ligeramente distintos. */
function classifyPixels(buf, W, H, opts = {}) {
  const cyanMaxRed = opts.cyanMaxRed ?? 165;
  const navyMaxBrightness = opts.navyMaxBrightness ?? 175;
  const cls = new Uint8Array(W * H);
  for (let i = 0, n = W * H; i < n; i++) {
    const r = buf[i * 3];
    const g = buf[i * 3 + 1];
    const b = buf[i * 3 + 2];
    // Cian: azul-verdoso, rojo bajo, contraste b-r alto.
    if (b > 105 && g > 95 && r < cyanMaxRed && b - r > 18) cls[i] = 1;
    // Navy: oscuro con tinte azul. Acepta también casi-negro (frames IA).
    else if (
      r < 110 &&
      g < 120 &&
      b > 25 &&
      Math.max(r, g, b) < navyMaxBrightness
    )
      cls[i] = 2;
  }
  return cls;
}

function potraceSync(buffer, opts = {}) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      buffer,
      {
        threshold: 128,
        turdSize: 15,
        optTolerance: 0.4,
        alphaMax: 1.2,
        color: "currentColor",
        ...opts,
      },
      (err, svg) => (err ? reject(err) : resolve(svg))
    );
  });
}

function extractPaths(svg) {
  // potrace devuelve un único <path>; troceamos por "M" inicial para que
  // GSAP haga stagger por trazo.
  const matches = [...svg.matchAll(/<path[^>]*?d="([^"]+)"/g)];
  const ds = [];
  for (const m of matches) {
    const sub = m[1]
      .split(/(?=M)/g)
      .map((s) => s.trim())
      .filter(Boolean);
    ds.push(...sub);
  }
  return ds;
}

/** Buffer binario 1 canal a partir de un predicado por píxel. */
function maskFrom(cls, W, H, predicate) {
  const out = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) out[i] = predicate(cls[i], i) ? 0 : 255;
  return out;
}

async function bufferToPng(buf, W, H) {
  return sharp(buf, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer();
}

/** Silueta cerrada (1 path) de TODA la forma: cian∪navy, dilatada para
 *  cerrar huecos internos. Es la base del morph. */
async function buildSilhouettePath(cls, W, H) {
  const raw = maskFrom(cls, W, H, (c) => c !== 0);
  const closed = await sharp(raw, {
    raw: { width: W, height: H, channels: 1 },
  })
    .blur(4)
    .threshold(96)
    .png()
    .toBuffer();
  const svg = await potraceSync(closed, {
    turdSize: 800,
    optTolerance: 1.8,
    alphaMax: 1.2,
  });
  const ds = extractPaths(svg);
  // Concatenamos en un único atributo d.
  return ds.join(" ");
}

/** Capa "shape": detalle navy del objeto (cuerpo del megáfono, cuerpo de
 *  la guitarra, contornos del bafle, etc.). Excluye el lettering (que sale
 *  como cian + parte del navy del SOUND). */
async function buildShapePaths(cls, W, H) {
  const raw = maskFrom(cls, W, H, (c) => c === 2);
  const png = await bufferToPng(raw, W, H);
  const svg = await potraceSync(png, { turdSize: 40, optTolerance: 0.4 });
  return extractPaths(svg);
}

/** Capa "lettering-cyan": las letras cian (BONITO). */
async function buildLetteringCyan(cls, W, H) {
  const raw = maskFrom(cls, W, H, (c) => c === 1);
  const png = await bufferToPng(raw, W, H);
  const svg = await potraceSync(png, { turdSize: 25, optTolerance: 0.35 });
  return extractPaths(svg);
}

function composeForm(name, W, H, silhouetteD, shapeDs, letteringCyanDs) {
  // El SOUND navy no se separa fácilmente del resto de detalles navy del
  // objeto. Estrategia: las letras navy van mezcladas en `#shape`. El
  // crossfade entre formas mata sutilezas; lo que importa es que se
  // RECONOZCA cada forma. Aceptable como v1.
  const groups = [
    `<g id="shape" style="color:${COLOR_NAVY}">` +
      `<path id="silhouette" d="${silhouetteD}" opacity="0"/>` +
      shapeDs.map((d) => `<path d="${d}"/>`).join("") +
      `</g>`,
    letteringCyanDs.length
      ? `<g id="lettering" style="color:${COLOR_CYAN}">` +
        letteringCyanDs.map((d) => `<path d="${d}"/>`).join("") +
        `</g>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" ` +
    `fill="currentColor" preserveAspectRatio="xMidYMid meet" ` +
    `data-bs-forma="${name}">` +
    groups +
    `</svg>`
  );
}

async function processForm(form) {
  const { name, source, cyanMaxRed, navyMaxBrightness } = form;
  console.log(`\n== ${name} ← ${source} ==`);
  try {
    await fs.access(source);
  } catch {
    console.log(`  ⚠ no existe ${source}, salto`);
    return null;
  }

  const { buf, W, H } = await loadDenoised(source);
  console.log(`  ${W}x${H} loaded`);

  const cls = classifyPixels(buf, W, H, { cyanMaxRed, navyMaxBrightness });
  let cyanCount = 0,
    navyCount = 0;
  for (let i = 0; i < W * H; i++) {
    if (cls[i] === 1) cyanCount++;
    else if (cls[i] === 2) navyCount++;
  }
  console.log(`  cian: ${cyanCount} px, navy: ${navyCount} px`);
  if (cyanCount + navyCount < 1000) {
    console.log("  ⚠ clasificación pobre, salto");
    return null;
  }

  console.log("  → silhouette (1 path cerrado para morph)");
  const silhouetteD = await buildSilhouettePath(cls, W, H);

  console.log("  → shape (detalles navy)");
  const shapeDs = await buildShapePaths(cls, W, H);
  console.log(`     ${shapeDs.length} paths navy`);

  console.log("  → lettering cyan (BONITO)");
  const letteringDs = await buildLetteringCyan(cls, W, H);
  console.log(`     ${letteringDs.length} paths cian`);

  const svg = composeForm(name, W, H, silhouetteD, shapeDs, letteringDs);
  const opt = optimize(svg, SVGO_OPTS);
  const outPath = path.join(OUT_DIR, `forma-${name}.svg`);
  await fs.writeFile(outPath, opt.data);
  console.log(`  ✓ ${outPath} — ${(opt.data.length / 1024).toFixed(1)} KB`);
  return outPath;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const f of FORMS) {
    try {
      await processForm(f);
    } catch (e) {
      console.error(`✗ ${f.name}:`, e.message);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
