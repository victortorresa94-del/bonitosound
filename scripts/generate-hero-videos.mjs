#!/usr/bin/env node
/**
 * Genera los vídeos del home con Higgsfield (image-to-video DoP).
 *
 * Lee credenciales de .env.local (HIGGSFIELD_API_KEY_ID / _SECRET),
 * lanza N jobs en paralelo desde URLs públicas de GitHub raw, espera
 * a que terminen y descarga los .mp4 a public/video/home/.
 *
 * Uso:  node scripts/generate-hero-videos.mjs [id1,id2,...]
 *       (sin args = todos los del array PIECES)
 */

import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { config, higgsfield, DoPModel } from "@higgsfield/client/v2";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Carga .env.local sin dependencias.
function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}
loadEnv();

const KEY_ID = process.env.HIGGSFIELD_API_KEY_ID;
const KEY_SECRET = process.env.HIGGSFIELD_API_KEY_SECRET;
if (!KEY_ID || !KEY_SECRET) {
  console.error("Faltan HIGGSFIELD_API_KEY_ID / _SECRET en .env.local");
  process.exit(1);
}

config({ credentials: `${KEY_ID}:${KEY_SECRET}` });

const RAW = "https://raw.githubusercontent.com/victortorresa94-del/bonitosound/main/public";

const PIECES = [
  {
    id: "hero",
    image_url: `${RAW}/img/marca/heroe-volando.jpeg`,
    prompt:
      "A cartoon superhero hovers in mid-air with cape and hair flowing gently in the wind, waves once at the viewer with a confident smile, then continues to float upward. Cinematic, smooth, editorial.",
  },
  {
    id: "marcas",
    image_url: `${RAW}/img/marca/heroe-megafono.jpeg`,
    prompt:
      "A cartoon superhero raises a megaphone, slight bounce of energy, soundwaves ripple out, hair and cape flutter. Editorial, confident, warm.",
  },
  {
    id: "records",
    image_url: `${RAW}/img/marca/superheroe-records.png`,
    prompt:
      "A cartoon superhero with a vinyl record: the disc subtly spins, the character tilts head slightly. Calm, editorial, premium.",
  },
  {
    id: "festival",
    image_url: `${RAW}/img/jaleo/jaleo-01.jpg`,
    prompt:
      "Festival crowd at golden hour, subtle camera push-in, lights flicker and people raise hands gently. Warm, inviting, cinematic.",
  },
];

const wanted = process.argv[2]?.split(",").filter(Boolean);
const pieces = wanted ? PIECES.filter((p) => wanted.includes(p.id)) : PIECES;

const OUT_DIR = path.join(ROOT, "public", "video", "home");
fs.mkdirSync(OUT_DIR, { recursive: true });

async function downloadTo(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} al descargar ${url}`);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
}

async function runPiece(p) {
  console.log(`[${p.id}] iniciando…`);
  const result = await higgsfield.subscribe("/v1/image2video/dop", {
    input: {
      model: DoPModel.TURBO,
      prompt: p.prompt,
      input_images: [{ type: "image_url", image_url: p.image_url }],
    },
    withPolling: true,
  });

  if (result.status !== "completed") {
    throw new Error(`[${p.id}] status=${result.status}`);
  }
  const url = result.video?.url;
  if (!url) {
    console.error(`[${p.id}] respuesta sin video:`, JSON.stringify(result, null, 2));
    throw new Error(`[${p.id}] respuesta sin video.url`);
  }
  const dest = path.join(OUT_DIR, `${p.id}.mp4`);
  await downloadTo(url, dest);
  const kb = (fs.statSync(dest).size / 1024).toFixed(0);
  console.log(`[${p.id}] OK  →  public/video/home/${p.id}.mp4  (${kb} KB)`);
}

const results = await Promise.allSettled(pieces.map(runPiece));
let ok = 0;
for (let i = 0; i < results.length; i++) {
  const r = results[i];
  if (r.status === "fulfilled") ok++;
  else console.error(`[${pieces[i].id}] FAIL:`, r.reason?.message || r.reason);
}
console.log(`\nTerminado: ${ok}/${pieces.length}`);
process.exit(ok === pieces.length ? 0 : 1);
