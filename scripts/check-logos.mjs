#!/usr/bin/env node
/**
 * Inventario de logos: qué falta, qué sobra y con qué NOMBRE EXACTO hay que
 * guardar cada fichero.
 *
 *   node scripts/check-logos.mjs          → resumen + lo que falta
 *   node scripts/check-logos.mjs --all    → además, los ficheros huérfanos
 *
 * No modifica nada. Lee los nombres de lib/site.ts y calcula el slug con la
 * MISMA regla que lib/assets.ts (assetSlug), así que lo que imprime es
 * literalmente el nombre de fichero que el sitio va a buscar.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const EXT = ["svg", "webp", "png", "jpg", "jpeg", "avif", "gif"];

/** Copia exacta de assetSlug() en lib/assets.ts. */
function assetSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Saca los strings de un `const NOMBRE = [ ... ] as const;` de lib/site.ts. */
function extractArray(src, name) {
  const re = new RegExp(`(?:const|export const)\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\]\\s*as const`, "m");
  const m = src.match(re);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

const siteSrc = fs.readFileSync(path.join(root, "lib", "site.ts"), "utf8");

const CATEGORIES = [
  { dir: "marcas", arrays: ["brands", "MARCAS_EXTRA"] },
  { dir: "agencias", arrays: ["AGENCIAS"] },
  { dir: "ayuntamientos", arrays: ["AYUNTAMIENTOS"] },
  { dir: "asociaciones", arrays: ["ASOCIACIONES"] },
  { dir: "proveedores", arrays: ["PROVEEDORES"] },
  { dir: "instituciones", arrays: ["memberships"] },
  { dir: "apoyos", arrays: ["support", "supportPending"] },
];

const showAll = process.argv.includes("--all");
let totalMissing = 0;
let totalOk = 0;

for (const cat of CATEGORIES) {
  const names = cat.arrays.flatMap((a) => extractArray(siteSrc, a));
  if (names.length === 0) continue;

  const dirPath = path.join(root, "public", "img", cat.dir);
  const onDisk = fs.existsSync(dirPath)
    ? fs.readdirSync(dirPath).filter((f) => !f.startsWith("."))
    : [];

  const missing = [];
  const used = new Set();
  const seen = new Map();

  for (const name of names) {
    const slug = assetSlug(name);
    // Colisión de slug dentro de la misma categoría (dos nombres, un fichero).
    if (seen.has(slug)) {
      console.log(`  ⚠ COLISIÓN en ${cat.dir}: "${seen.get(slug)}" y "${name}" → ${slug}`);
    } else {
      seen.set(slug, name);
    }
    const hit = EXT.map((e) => `${slug}.${e}`).find((f) => onDisk.includes(f));
    if (hit) {
      used.add(hit);
      totalOk++;
    } else {
      missing.push({ name, slug });
    }
  }

  console.log(`\n${cat.dir.toUpperCase()}  ${names.length - missing.length}/${names.length}`);
  if (missing.length) {
    totalMissing += missing.length;
    console.log(`  Faltan (guardar como <slug>.png|jpg|svg|webp):`);
    for (const m of missing) console.log(`    ${m.slug.padEnd(48)} ← ${m.name}`);
  }
  if (showAll) {
    const orphans = onDisk.filter((f) => !used.has(f));
    if (orphans.length) {
      console.log(`  Huérfanos (fichero sin nombre asociado):`);
      for (const o of orphans) console.log(`    ${o}`);
    }
  }
}

console.log(`\n──────\nLogos puestos: ${totalOk} · Faltan: ${totalMissing}`);
