// Genera el dibujo decorativo del banner "El día a día" (/nosotros) en el
// MISMO estilo navy/cian que el equipo y los artistas (ver
// docs/CONTEXTO-GRAFICO.md §3 y public/img/equipo/ilustracion/*.png).
//
// A diferencia del script del equipo, aquí NO hay foto de una persona que
// convertir: es una escena nueva (mano + móvil + reel), así que solo se le
// da la imagen de estilo como referencia — mismo método, sin la foto.
//
// Uso: node --env-file=.env.local scripts/generate-banner-instagram-ilustracion.mjs

import { writeFileSync, mkdirSync, readFileSync, unlinkSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("Falta OPENAI_API_KEY. Corre con --env-file=.env.local");
  process.exit(1);
}

const STYLE_REF = "public/img/equipo/ilustracion/victor-torres.png";
const DEST = "public/img/marca/banner-instagram.png";

const PROMPT = [
  "La imagen adjunta es SOLO una referencia de ESTILO: copia de ahí la técnica exacta de line-art, la paleta de dos colores y el fondo plano — ignora que es un retrato de una persona, esto es una escena distinta.",
  "Dibuja: una mano sujetando un móvil en vertical. La pantalla del móvil muestra el fotograma de un vídeo vertical simple con un icono de PLAY triangular grande en el centro y un pequeño icono de corazón en una esquina — nada de logos de apps reales, nada de interfaz realista, solo esos dos iconos simples dibujados a mano.",
  "Alrededor del móvil, 2-3 detalles sueltos 'a mano' tipo doodle: una chispita/estrella cian, una línea de movimiento o una notita musical — estilo garabato suelto, no recargado.",
  "Estilo line-art cómic/editorial limpio, trazo firme y continuo, plano tipo icono — NO fotorealista, NO 3D, NO póster.",
  "Tinta navy oscuro (#14283C) para el contorno y el dibujo de línea.",
  "Sombreado plano (cel-shading, sin degradados) con UN único color de acento: cian/teal (#16b6d4) en distintas intensidades — nada de otros colores.",
  "Luces en blanco/crema (#FBFAF6).",
  "CRÍTICO sobre el fondo: fondo perfectamente PLANO y UNIFORME, sin viñeta, sin degradado radial, sin resplandor, sin esquinas oscuras, sin iluminación de foco dramática. El fondo entero tiene que ser 100% transparente, borde a borde, sin degradado hacia el sujeto.",
  "Composición suelta y centrada, con aire alrededor (no pegado a los bordes). Cuadrado.",
  "Sin texto, sin marcas de agua, sin logotipos de ninguna marca real.",
].join(" ");

async function hardCutAlpha(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    data[i + 3] = data[i + 3] < 128 ? 0 : 255;
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(file + ".tmp.png");
  writeFileSync(file, readFileSync(file + ".tmp.png"));
  unlinkSync(file + ".tmp.png");
}

const fd = new FormData();
fd.append("model", "gpt-image-1");
fd.append("prompt", PROMPT);
fd.append("size", "1024x1024");
fd.append("quality", "medium");
fd.append("background", "transparent");
fd.append("image[]", new Blob([readFileSync(STYLE_REF)], { type: "image/png" }), "style-ref.png");

console.log("▶ Generando ilustración del banner IG…");
const res = await fetch("https://api.openai.com/v1/images/edits", {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}` },
  body: fd,
});

if (!res.ok) {
  console.error(`✗ ${res.status} ${await res.text()}`);
  process.exit(1);
}

const json = await res.json();
const b64 = json?.data?.[0]?.b64_json;
if (!b64) {
  console.error("✗ respuesta sin imagen", JSON.stringify(json).slice(0, 400));
  process.exit(1);
}

mkdirSync(dirname(DEST), { recursive: true });
writeFileSync(DEST, Buffer.from(b64, "base64"));
await hardCutAlpha(DEST);
console.log(`✓ Guardado y recortado en ${DEST}`);
