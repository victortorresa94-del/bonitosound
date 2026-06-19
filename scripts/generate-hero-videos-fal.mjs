#!/usr/bin/env node
/**
 * Genera los vídeos del home con fal.ai (image-to-video).
 *
 * Lee FAL_KEY de .env.local, lanza N jobs en paralelo desde URLs públicas
 * de GitHub raw, espera a que terminen y descarga los .mp4 a
 * public/video/home/.
 *
 * Modelo por defecto: Kling v2 Master (calidad alta, ~5 s, 0.50 €/vídeo aprox).
 * Para abaratar: pasar FAL_MODEL=fal-ai/kling-video/v1/standard/image-to-video
 * antes del comando.
 *
 * Uso:  node scripts/generate-hero-videos-fal.mjs [id1,id2,...]
 *       (sin args = todos los del array PIECES)
 */

import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";
import { fal } from "@fal-ai/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}
loadEnv();

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error("Falta FAL_KEY en .env.local");
  console.error("Consíguela en https://fal.ai/dashboard/keys");
  process.exit(1);
}
fal.config({ credentials: FAL_KEY });

const MODEL = process.env.FAL_MODEL ||
  "fal-ai/kling-video/v2/master/image-to-video";

const RAW = "https://raw.githubusercontent.com/victortorresa94-del/bonitosound/main/public";

const PIECES = [
  {
    id: "hero",
    image_url: RAW + "/img/marca/superheroe-home.png",
    prompt:
      "The cartoon superhero floats gently in mid-air, cape and hair flowing in a soft breeze. They wave at the camera with a confident smile, then continue hovering with subtle bounces. Cinematic, warm, editorial. Plain cream background.",
    duration: "10",
  },
  {
    id: "marcas",
    image_url: RAW + "/img/marca/heroe-megafono.jpeg",
    prompt:
      "The cartoon superhero raises a megaphone, energetic bounce, soundwaves ripple outwards, hair and cape flutter. Editorial, confident, warm.",
    duration: "5",
  },
  {
    id: "records",
    image_url: RAW + "/img/marca/superheroe-records.png",
    prompt:
      "The cartoon superhero holds a vinyl record that spins gently; they tilt their head and bob to a beat. Calm, editorial, premium.",
    duration: "5",
  },
  {
    id: "festival",
    image_url: RAW + "/img/jaleo/jaleo-01.jpg",
    prompt:
      "Festival crowd at golden hour, subtle camera push-in, lights flicker as people raise hands gently. Warm, inviting, cinematic.",
    duration: "5",
  },
];

const wanted = process.argv[2]?.split(",").filter(Boolean);
const pieces = wanted ? PIECES.filter((p) => wanted.includes(p.id)) : PIECES;

const OUT_DIR = path.join(ROOT, "public", "video", "home");
fs.mkdirSync(OUT_DIR, { recursive: true });

async function downloadTo(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status + " al descargar " + url);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
}

async function runPiece(p) {
  console.log("[" + p.id + "] iniciando con " + MODEL + " …");
  try {
    const result = await fal.subscribe(MODEL, {
      input: {
        image_url: p.image_url,
        prompt: p.prompt,
        duration: p.duration,
        aspect_ratio: p.id === "hero" ? "9:16" : "16:9",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          process.stdout.write("[" + p.id + "] en proceso…\n");
        }
      },
    });

    const url = result.data?.video?.url;
    if (!url) {
      console.error("[" + p.id + "] respuesta sin video:", JSON.stringify(result, null, 2));
      throw new Error("respuesta sin video.url");
    }
    const dest = path.join(OUT_DIR, p.id + ".mp4");
    await downloadTo(url, dest);
    const mb = (fs.statSync(dest).size / 1024 / 1024).toFixed(2);
    console.log("[" + p.id + "] OK  →  public/video/home/" + p.id + ".mp4  (" + mb + " MB)");
  } catch (err) {
    console.error("[" + p.id + "] ERROR:");
    console.error("  message:", err?.message);
    if (err?.body) console.error("  body:", JSON.stringify(err.body, null, 2));
    if (err?.status) console.error("  status:", err.status);
    throw err;
  }
}

console.log("Generando " + pieces.length + " vídeo(s) en paralelo con fal.ai\n");
const results = await Promise.allSettled(pieces.map(runPiece));
let ok = 0;
for (let i = 0; i < results.length; i++) {
  if (results[i].status === "fulfilled") ok++;
}
console.log("\nTerminado: " + ok + "/" + pieces.length);
process.exit(ok === pieces.length ? 0 : 1);
