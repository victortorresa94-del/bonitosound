// Quita el fondo claro (crema/beige amarillento) de una ilustración dejándolo
// TRANSPARENTE, por flood-fill de color desde los bordes (mismo método que los
// vídeos de logo, ver memoria "bonito-sound-quitar-fondo": corte por color, NO
// IA de matting). El sujeto va rodeado de línea navy oscura, así que el relleno
// se detiene ahí y los cremas/blancos INTERIORES (cara, camisa) se conservan
// porque quedan encerrados por el trazo.
//
// Uso: node scripts/_remove-cream-bg.mjs public/img/artistas/ilustracion/hebe.png [...más]

import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const TOL = 60; // distancia de color máx. respecto al fondo semilla (0-441)

async function stripBg(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const idx = (x, y) => (y * width + x) * channels;

  // El fondo de estas ilustraciones es SIEMPRE crema/beige claro (#f8f3ef…
  // #fff8e1). El sujeto va con trazo navy oscuro (#14283C) y relleno cian
  // (#16b6d4, R muy bajo) → un simple test de "píxel claro y cálido" separa
  // fondo de sujeto de forma fiable, sin depender de una semilla que se
  // ensucie cuando el sujeto toca una esquina. Los cremas INTERIORES (cara,
  // camisa) no se tocan porque el flood-fill parte del borde y el trazo navy
  // los deja encerrados.
  const near = (o) => data[o] >= 224 && data[o + 1] >= 220 && data[o + 2] >= 190;

  const visited = new Uint8Array(width * height);
  const stack = [];
  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    visited[p] = 1;
    if (near(idx(x, y))) stack.push(x, y);
  };
  // Sembrar todo el borde.
  for (let x = 0; x < width; x++) { pushIf(x, 0); pushIf(x, height - 1); }
  for (let y = 0; y < height; y++) { pushIf(0, y); pushIf(width - 1, y); }

  let removed = 0;
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    data[idx(x, y) + 3] = 0; // transparente
    removed++;
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1);
  }

  await sharp(data, { raw: { width, height, channels } }).png().toFile(file + ".tmp.png");
  writeFileSync(file, readFileSync(file + ".tmp.png"));
  const { unlinkSync } = await import("node:fs");
  unlinkSync(file + ".tmp.png");
  console.log(`✓ ${file}  px_fondo_borrados=${removed}`);
}

const files = process.argv.slice(2);
if (!files.length) { console.error("Pasa uno o más PNG."); process.exit(1); }
for (const f of files) await stripBg(f);
