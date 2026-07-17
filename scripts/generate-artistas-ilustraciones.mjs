// Genera las ilustraciones de artista (/artistas/<slug>) que faltan, en el
// MISMO estilo que las ya integradas (natura, paule, alexdelion, sa-pena,
// pablo-rojo): line-art navy #14283C + un único acento cian #16b6d4 sobre
// fondo crema plano. Ver docs/CONTEXTO-GRAFICO.md §3.
//
// Método idéntico al del equipo (scripts/generate-equipo-ilustraciones.mjs):
// /v1/images/edits con la foto real del artista como sujeto + una ilustración
// ya aprobada (natura) como referencia de ESTILO. Conserva el parecido pero
// reinterpretado en el estilo del roster.
//
// A diferencia del equipo, aquí el fondo es CREMA sólido (no transparente),
// para que encaje igual que las ilustraciones que ya están en el repo.
//
// Uso (en local, key en .env.local — NUNCA commitear la key):
//   node --env-file=.env.local scripts/generate-artistas-ilustraciones.mjs
//   node --env-file=.env.local scripts/generate-artistas-ilustraciones.mjs --only=hebe
//   node --env-file=.env.local scripts/generate-artistas-ilustraciones.mjs --force

import { writeFileSync, mkdirSync, existsSync, readFileSync, unlinkSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

// gpt-image devuelve un fondo crema/beige AMARILLENTO (~#fff8e1) que no casa
// con el crema real de la web (#FBFAF6) y "canta". Lo quitamos a transparente
// por flood-fill de "píxel claro" desde el borde (mismo método que los vídeos,
// ver memoria bonito-sound-quitar-fondo): el sujeto va con trazo navy oscuro,
// así que el relleno se detiene ahí y los cremas interiores se conservan.
// Así la ilustración se apoya siempre sobre el fondo real de la página.
async function stripCreamBg(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const idx = (x, y) => (y * width + x) * channels;
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
  for (let x = 0; x < width; x++) { pushIf(x, 0); pushIf(x, height - 1); }
  for (let y = 0; y < height; y++) { pushIf(0, y); pushIf(width - 1, y); }
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    data[idx(x, y) + 3] = 0;
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1);
  }
  await sharp(data, { raw: { width, height, channels } }).png().toFile(file + ".tmp.png");
  writeFileSync(file, readFileSync(file + ".tmp.png"));
  unlinkSync(file + ".tmp.png");
}

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const force = args.includes("--force");

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error("Falta OPENAI_API_KEY. Corre con --env-file=.env.local");
  process.exit(1);
}

const STYLE_REF = "public/img/artistas/ilustracion/natura.png";

const STYLE_PROMPT = [
  "La PRIMERA imagen adjunta es la foto real de un artista musical: conviértelo en un retrato ILUSTRADO manteniendo EXACTAMENTE su mismo encuadre y su misma pose (si en la foto sale de cuerpo entero, cuerpo entero; si sale de medio cuerpo o retrato, respétalo — no inventes cuerpo que no se ve). Conserva el parecido REAL de la cara, el pelo, la barba, los tatuajes, las gafas o accesorios (pendientes, collares, anillos, gorra) y la ropa exacta que lleva.",
  "IGNORA POR COMPLETO el escenario/fondo/pared/escaleras/luces/desenfoque de la foto original: no lo dibujes ni lo insinúes.",
  "SOLO la persona: NO dibujes ningún mueble, mesa de mezclas, altavoces, monitores, teclados, cascos sueltos, micrófonos ni ningún objeto o equipo alrededor. Únicamente la figura de la persona recortada sobre el fondo crema vacío, como en la referencia de estilo.",
  "La SEGUNDA imagen adjunta es SOLO la referencia de ESTILO (una ilustración de otra artista): copia de ahí la técnica exacta de line-art, la paleta de dos colores y el tipo de fondo plano — ignora quién es, su pose y su ropa.",
  "Estilo: line-art cómic/manga limpio y editorial, trazo firme y seguro, tipo ilustración de portada de artista.",
  "Tinta navy oscuro (#14283C) para el contorno y todo el dibujo de línea.",
  "Sombreado plano (cel-shading, sin degradados fotográficos) con UN único color de acento: cian/teal (#16b6d4) en distintas intensidades — NADA de otros colores.",
  "CRÍTICO — paleta estricta de DOS colores: aunque en la foto haya ropa, cables, objetos o cualquier elemento de color rojo, granate, naranja, verde, amarillo, morado o cualquier otro color, NO los reproduzcas con ese color. Recolorea TODO usando solo navy (#14283C) y cian (#16b6d4): por ejemplo un chaleco rojo pásalo a navy/cian, un cable rojo píntalo navy. El resultado final SOLO puede contener navy, cian y crema — cero rojos, cero naranjas, cero verdes.",
  "Luces y blancos en crema (#FBFAF6).",
  "Reinterpretado en este estilo ilustrado — NO foto-realista, NO 3D render, NO pintura digital.",
  "Fondo: totalmente TRANSPARENTE, o en su defecto un crema MUY claro y neutro (#FBFAF6, casi blanco) — NUNCA un beige ni un crema amarillento/dorado. Plano y uniforme, sin viñeta, sin degradado, sin resplandor, sin textura.",
  "Deja algo de aire alrededor del sujeto, sin recortar la cabeza ni los pies contra el borde.",
  "Sin texto, sin marcas de agua, sin logotipos.",
].join(" ");

// Artistas con foto en public/img/artistas/ pero sin ilustración todavía.
// (natura, paule, alexdelion, sa-pena, pablo-rojo ya tienen su dibujo.)
const ARTISTS = [
  { slug: "d-nacar", ref: "public/img/artistas/d-nacar.jpeg" },
  { slug: "dulze", ref: "public/img/artistas/dulze.png" },
  { slug: "eva-calyza", ref: "public/img/artistas/eva-calyza.jpg" },
  { slug: "hebe", ref: "public/img/artistas/hebe.jpeg" },
  { slug: "marco-la-testa", ref: "public/img/artistas/marco-la-testa.jpeg" },
];

function mime(path) {
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

async function generateOne({ slug, ref }) {
  const dest = `public/img/artistas/ilustracion/${slug}.png`;
  if (existsSync(dest) && !force) {
    console.log(`↪ ${slug} ya existe, saltado (usa --force para regenerar)`);
    return;
  }
  if (!existsSync(ref)) {
    console.error(`  ✗ ${slug}: no existe la foto ${ref}`);
    return;
  }

  console.log(`▶ ${slug} (gpt-image-1, foto: ${ref})…`);

  const fd = new FormData();
  fd.append("model", "gpt-image-1");
  fd.append("prompt", STYLE_PROMPT);
  fd.append("size", "1024x1536"); // vertical, como las fichas de artista
  fd.append("quality", "high");
  fd.append("image[]", new Blob([readFileSync(ref)], { type: mime(ref) }), `${slug}${ref.slice(ref.lastIndexOf("."))}`);
  fd.append("image[]", new Blob([readFileSync(STYLE_REF)], { type: "image/png" }), "style-ref.png");

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}` },
    body: fd,
  });

  if (!res.ok) {
    console.error(`  ✗ ${slug}: ${res.status} ${await res.text()}`);
    return;
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) {
    console.error(`  ✗ ${slug}: respuesta sin imagen`, JSON.stringify(json).slice(0, 400));
    return;
  }

  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(b64, "base64"));
  await stripCreamBg(dest);
  console.log(`  ✓ Guardado (fondo quitado) en ${dest}`);
}

const targets = only ? ARTISTS.filter((a) => a.slug === only) : ARTISTS;
if (targets.length === 0) {
  console.error(`--only=${only} no coincide con ningún slug con foto pendiente.`);
  process.exit(1);
}

for (const t of targets) {
  await generateOne(t);
}

console.log("Fin. Revisa public/img/artistas/ilustracion/ y compara con natura/paule antes de commitear.");
