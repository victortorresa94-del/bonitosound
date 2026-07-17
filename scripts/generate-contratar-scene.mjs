// Genera la ilustración de la página de contratación (/contratar/<artista>).
// Estilo: el "rollo" de Bonito — teléfono hecho a mano, notas y textura — con
// la PALETA ACTUAL (navy #14283C + único acento cian #16b6d4) sobre fondo
// transparente, para que se apoye sobre el crema de la web.
//
// Uso (en local, con la key en .env.local — NUNCA commitear la key):
//   node --env-file=.env.local scripts/generate-contratar-scene.mjs
//
// Requiere red abierta a api.openai.com. El entorno de Claude Code on the web
// la bloquea por política de egress → esto se corre en tu máquina.
//
// Al terminar deja: public/img/marca/contratar-scene.png
// El componente BookingScene lo detecta y sustituye el SVG de fallback solo.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("Falta OPENAI_API_KEY. Corre con: node --env-file=.env.local scripts/generate-contratar-scene.mjs");
  process.exit(1);
}

const DEST = "public/img/marca/contratar-scene.png";

const prompt = [
  "Hand-drawn editorial illustration in the Bonito Sound brand style, on a fully TRANSPARENT background (no backdrop, no white box).",
  "Scene: a hand holding up a vintage telephone handset, with a long coiled phone cord spiralling down to a small rotary desk phone at the bottom.",
  "Around it, scattered like confetti at small scale: a couple of music notes, a small cassette tape, a few four-point sparkle stars and dots, tiny lightning ticks.",
  "Line art with confident, slightly rough hand-drawn strokes and a subtle print/riso texture. No shadows, no gradients, no photoreal textures.",
  "STRICT palette: dark navy (#14283C) for all outlines and linework; a SINGLE accent of bright cyan (#16b6d4) for fills/highlights (the handset body, note heads, the dial ring); soft cream (#FBFAF6) for any interior fills. Nothing else — no other colors.",
  "Playful, musical, editorial — never flat corporate. Generous negative space, asymmetric and organic composition.",
  "Do NOT add any text, letters, taglines or wordmarks. Single centered composition.",
].join(" ");

console.log("Generando ilustración de contratación (gpt-image-1)…");

const res = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
    quality: "high",
    background: "transparent",
    n: 1,
  }),
});

if (!res.ok) {
  console.error("Error de la API:", res.status, await res.text());
  process.exit(1);
}

const json = await res.json();
const b64 = json?.data?.[0]?.b64_json;
if (!b64) {
  console.error("Respuesta sin imagen:", JSON.stringify(json).slice(0, 400));
  process.exit(1);
}

mkdirSync(dirname(DEST), { recursive: true });
writeFileSync(DEST, Buffer.from(b64, "base64"));
console.log(`✅ Guardado en ${DEST}`);
console.log("Haz commit del PNG y la página /contratar/<artista> lo usará sola.");
