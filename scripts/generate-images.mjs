#!/usr/bin/env node
// Genera las imágenes definidas en scripts/manifest.mjs llamando a gpt-image-1.
//
// Uso:
//   npm run generate-images                   (lee OPENAI_API_KEY de process.env)
//   npm run generate-images:local             (carga desde .env.local)
//   node scripts/generate-images.mjs --only=opengraph
//   node scripts/generate-images.mjs --category=web
//   node scripts/generate-images.mjs --force         (re-genera aunque exista)
//
// Requisitos: Node 22+ (fetch, FormData y Blob nativos).

import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { manifest, REFS, STYLE } from "./manifest.mjs";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error(
    "✗ Falta OPENAI_API_KEY.\n" +
      "  · CCw: configúrala como variable de entorno del entorno.\n" +
      "  · Local: crea .env.local con OPENAI_API_KEY=sk-... y ejecuta `npm run generate-images:local`.",
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const get = (k) => args.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
const opts = {
  only: get("only"),
  category: get("category"),
  force: args.includes("--force"),
};

const log = (...m) => console.log(new Date().toISOString().slice(11, 19), "·", ...m);

async function refAsBlob(refKey) {
  const p = REFS[refKey];
  if (!p) throw new Error(`ref no definida: ${refKey}`);
  const buf = await fs.readFile(p);
  const mime = p.endsWith(".avif")
    ? "image/avif"
    : p.endsWith(".png")
      ? "image/png"
      : "image/jpeg";
  const safeName = path.basename(p).replace(/\s+/g, "_");
  return { blob: new Blob([buf], { type: mime }), name: safeName };
}

async function callOpenAI(entry, attempt = 0) {
  const fullPrompt = `${entry.prompt}\n\n${STYLE}`;
  const refs = entry.refs ?? [];
  const useEdits = refs.length > 0;
  const endpoint = useEdits
    ? "https://api.openai.com/v1/images/edits"
    : "https://api.openai.com/v1/images/generations";

  let body, headers;
  if (useEdits) {
    const fd = new FormData();
    fd.append("model", "gpt-image-1");
    fd.append("prompt", fullPrompt);
    fd.append("size", entry.size);
    fd.append("quality", entry.quality);
    fd.append("background", "transparent");
    for (const key of refs) {
      const { blob, name } = await refAsBlob(key);
      fd.append("image[]", blob, name);
    }
    body = fd;
    headers = { Authorization: `Bearer ${API_KEY}` };
  } else {
    body = JSON.stringify({
      model: "gpt-image-1",
      prompt: fullPrompt,
      size: entry.size,
      quality: entry.quality,
      background: "transparent",
      n: 1,
    });
    headers = {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    };
  }

  const res = await fetch(endpoint, { method: "POST", headers, body });
  if (!res.ok) {
    const text = await res.text();
    if ((res.status === 429 || res.status >= 500) && attempt < 2) {
      const wait = (2 ** attempt) * 2000;
      log(`  ⚠  ${res.status} reintentando en ${wait}ms`);
      await new Promise((r) => setTimeout(r, wait));
      return callOpenAI(entry, attempt + 1);
    }
    throw new Error(`OpenAI ${res.status}: ${text.slice(0, 400)}`);
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error("respuesta sin b64_json: " + JSON.stringify(json).slice(0, 400));
  return Buffer.from(b64, "base64");
}

let ok = 0, skipped = 0, failed = 0;

for (const entry of manifest) {
  if (opts.only && entry.id !== opts.only) { skipped++; continue; }
  if (opts.category && entry.category !== opts.category) { skipped++; continue; }
  if (existsSync(entry.dest) && !opts.force) {
    log(`↪ ${entry.id} ya existe, saltado (usa --force para regenerar)`);
    skipped++;
    continue;
  }

  log(`▶ ${entry.id} → ${entry.dest}`);
  try {
    const png = await callOpenAI(entry);
    mkdirSync(path.dirname(entry.dest), { recursive: true });
    await fs.writeFile(entry.dest, png);
    log(`  ✓ ${(png.length / 1024).toFixed(1)} KB`);
    ok++;
  } catch (e) {
    log(`  ✗ ${entry.id}: ${e.message}`);
    failed++;
  }
}

log(`Fin. ok=${ok} saltadas=${skipped} fallidas=${failed} (total manifest=${manifest.length})`);
process.exit(failed > 0 ? 1 : 0);
