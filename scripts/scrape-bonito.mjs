#!/usr/bin/env node
// Scrapea bonitosound.com (la web actual en WordPress) para extraer:
//  - El logo oficial y assets de marca
//  - Las fotos de los artistas que ya tengan en su roster
//  - Los logos de marcas clientes que mostraban
//  - Las imágenes destacadas que usaban en cabeceras
//
// Uso (en entorno con red abierta):
//   node scripts/scrape-bonito.mjs
//
// Salida: descarga los assets a /scraped/ y un manifest.json con metadatos
// y rutas sugeridas dentro de /public/img/ para mover a mano lo que sirva.

import fs from "node:fs/promises";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = "https://bonitosound.com";
const OUT = "scraped";
const VISITED = new Set();
const QUEUE = [ROOT];
const FOUND_IMAGES = new Map(); // url -> { context, alt }
const MAX_PAGES = 40;

mkdirSync(OUT, { recursive: true });
mkdirSync(path.join(OUT, "img"), { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 " +
  "(KHTML, like Gecko) Version/17.0 Safari/605.1.15";

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return await res.text();
}

async function fetchBinary(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  return true;
}

function abs(url, base) {
  try { return new URL(url, base).href; } catch { return null; }
}

function extractImages(html, pageUrl) {
  // src y data-src de <img>, srcset (primer candidato), y url() de inline style
  const out = [];
  const reImg = /<img[^>]+>/g;
  for (const tag of html.match(reImg) || []) {
    const src = tag.match(/(?:data-src|src)="([^"]+)"/)?.[1];
    const alt = tag.match(/alt="([^"]*)"/)?.[1] ?? "";
    if (src) out.push({ src: abs(src, pageUrl), alt, context: "img" });
    const srcset = tag.match(/srcset="([^"]+)"/)?.[1];
    if (srcset) {
      const first = srcset.split(",")[0]?.trim().split(/\s+/)[0];
      if (first) out.push({ src: abs(first, pageUrl), alt, context: "img-srcset" });
    }
  }
  const reBg = /background-image:\s*url\(['"]?([^'")]+)['"]?\)/g;
  let m;
  while ((m = reBg.exec(html))) {
    out.push({ src: abs(m[1], pageUrl), alt: "", context: "background" });
  }
  return out.filter((x) => x.src && /\.(jpe?g|png|webp|avif|svg)(\?|$)/i.test(x.src));
}

function extractLinks(html, pageUrl) {
  const out = new Set();
  for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const u = abs(m[1], pageUrl);
    if (!u) continue;
    if (!u.startsWith(ROOT)) continue;
    if (/\.(jpg|jpeg|png|gif|pdf|zip)$/i.test(u)) continue;
    out.add(u.split("#")[0]);
  }
  return Array.from(out);
}

let pages = 0;
while (QUEUE.length && pages < MAX_PAGES) {
  const url = QUEUE.shift();
  if (VISITED.has(url)) continue;
  VISITED.add(url);
  try {
    process.stdout.write(`→ ${url}  … `);
    const html = await fetchText(url);
    pages++;
    for (const img of extractImages(html, url)) {
      if (!FOUND_IMAGES.has(img.src))
        FOUND_IMAGES.set(img.src, { ...img, foundOn: url });
    }
    for (const link of extractLinks(html, url)) {
      if (!VISITED.has(link)) QUEUE.push(link);
    }
    console.log(`${FOUND_IMAGES.size} imgs total`);
  } catch (e) {
    console.log(`ERR ${e.message}`);
  }
}

console.log(`\n${FOUND_IMAGES.size} imágenes únicas en ${pages} páginas. Descargando…`);

const manifest = [];
let i = 0;
for (const [url, meta] of FOUND_IMAGES) {
  const ext = url.match(/\.(jpe?g|png|webp|avif|svg)(\?|$)/i)?.[1] || "jpg";
  const base = path.basename(new URL(url).pathname).replace(/[?#].*$/, "");
  const safe = base.replace(/[^a-z0-9._-]/gi, "_") || `img-${i}.${ext}`;
  const dest = path.join(OUT, "img", safe);
  try {
    if (!existsSync(dest)) await fetchBinary(url, dest);
    manifest.push({ original: url, file: `img/${safe}`, alt: meta.alt, foundOn: meta.foundOn });
    i++;
  } catch (e) {
    console.log(`fail ${url}: ${e.message}`);
  }
}

await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n✓ Descargadas ${i} imágenes en ${OUT}/img/`);
console.log(`✓ Metadatos en ${OUT}/manifest.json`);
console.log(`\nSiguiente: revisa manifest.json, identifica logo / artistas / marcas`);
console.log(`y mueve los ficheros a public/img/{marca,artistas,marcas,instituciones}/.`);
