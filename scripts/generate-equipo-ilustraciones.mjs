// Genera las ilustraciones del equipo (/nosotros) en el MISMO estilo ya usado
// para los artistas del roster (line-art navy + un único acento cian, ver
// docs/CONTEXTO-GRAFICO.md §3 y public/img/artistas/ilustracion/*.png).
//
// Usa /v1/images/edits con la foto real de cada persona como referencia
// (mismo método que docs/GENERACION-IMAGENES.md §3), para conservar el
// parecido de cara/pelo/ropa pero reinterpretado en el estilo ilustrado.
//
// Uso (en local, con la key en .env.local — NUNCA commitear la key):
//   node --env-file=.env.local scripts/generate-equipo-ilustraciones.mjs
//   node --env-file=.env.local scripts/generate-equipo-ilustraciones.mjs --only=dani-boada
//   node --env-file=.env.local scripts/generate-equipo-ilustraciones.mjs --force
//   node scripts/generate-equipo-ilustraciones.mjs --clean-only   (solo recorta el alpha, sin API/key)
//
// Requiere red abierta a api.openai.com (bloqueada en Claude Code on the web
// por política de egress → correr en local).
//
// Al terminar deja: public/img/equipo/ilustracion/<slug>.png
// app/nosotros/page.tsx los recoge solo (plug-and-play vía findAsset).

import { writeFileSync, mkdirSync, existsSync, readFileSync, unlinkSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

// El endpoint de OpenAI deja un halo semi-transparente pegado a la silueta
// (visible como "fondo raro" al componer sobre cualquier color que no sea
// el exacto que usó el modelo). El propio canal alpha ya es prácticamente
// binario (ver bordes reales del personaje); endurecerlo a 0/255 elimina
// ese halo sin recortar al personaje. Mismo espíritu que el flood-fill de
// los vídeos (ver memoria "bonito-sound-quitar-fondo"): cortar por corte
// limpio, no rellenar con IA de matting.
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

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const force = args.includes("--force");
const cleanOnly = args.includes("--clean-only");

const KEY = process.env.OPENAI_API_KEY;
if (!KEY && !cleanOnly) {
  console.error(
    "Falta OPENAI_API_KEY. Corre con: node --env-file=.env.local scripts/generate-equipo-ilustraciones.mjs",
  );
  process.exit(1);
}

const STYLE_PROMPT = [
  "La PRIMERA imagen adjunta es una foto real: convierte a esa persona en un retrato ILUSTRADO, exactamente el mismo encuadre y la misma pose (igual que aparece, de hombros o pecho hacia arriba, sin inventar cuerpo que no se ve en la foto). Conserva de la primera imagen: la cara real, el pelo, las gafas o accesorios (pendientes, collares) y la ropa que lleva puesta.",
  "IMPORTANTE — encuadre con aire: deja SIEMPRE margen vacío por encima de la cabeza y a los lados. La parte más alta del pelo/cabeza NUNCA debe tocar ni salirse del borde superior del lienzo — si hace falta, dibuja a la persona un poco más pequeña/alejada dentro del cuadrado para que quepa entera con margen, en vez de recortarla.",
  "IGNORA POR COMPLETO el escenario/localización/pared/agua/plantas/luces/desenfoque que aparezca detrás de la persona en la primera foto: no lo dibujes, no lo insinúes, no crees ninguna versión estilizada, difuminada o resplandeciente de ese entorno. Ese fondo original NO EXISTE para este encargo.",
  "La SEGUNDA imagen adjunta es SOLO una referencia de ESTILO (ignora su pose, su ropa, su género y quién es la persona): copia de ahí únicamente la técnica de line-art, la paleta de dos colores y, MUY IMPORTANTE, su fondo: liso, plano, uniforme, de un solo tono, de esquina a esquina, sin ninguna variación tonal.",
  "Estilo line-art cómic/editorial limpio, trazo firme y continuo, tipo icono/avatar plano para una página web de equipo — NO un póster de cine, NO un retrato de estudio, NO fotografía de producto.",
  "Tinta navy oscuro (#14283C) para el contorno y el dibujo de línea.",
  "Sombreado plano (cel-shading, sin degradados) con UN único color de acento: cian/teal (#16b6d4) en distintas intensidades — nada de otros colores.",
  "Luces en blanco/crema (#FBFAF6).",
  "Reinterpretado en este estilo ilustrado — NO foto-realista, NO 3D render, NO pintura digital.",
  "PROHIBIDO EXPLÍCITAMENTE en el fondo: viñeta, degradado radial, resplandor/glow alrededor de la persona, halo de luz, esquinas oscuras, iluminación de foco/spotlight dramática, bokeh fotográfico, cualquier variación de tono o de opacidad. El fondo entero, de borde a borde, tiene que ser UN SOLO valor constante: o bien 100% transparente (alpha=0 en todos los píxeles de fondo, sin degradado hacia el sujeto) o bien un relleno sólido crema (#FBFAF6) totalmente uniforme. Como el emoji o icono plano de un avatar de equipo, no como una portada o cartel.",
  "Sin texto, sin marcas de agua, sin logotipos.",
].join(" ");

const STYLE_REF = "public/img/artistas/ilustracion/natura.png";

const TEAM = [
  { slug: "dani-boada", ref: "public/img/equipo/dani-boada.jpg" },
  { slug: "manu-rojo", ref: "public/img/equipo/manu-rojo.jpg" },
  { slug: "xavi-julia", ref: "public/img/equipo/xavi-julia.jpg" },
  { slug: "cristina-soler", ref: "public/img/equipo/cristina-soler.jpg" },
  { slug: "victor-torres", ref: "public/img/equipo/victor-torres.jpg" },
];

async function generateOne({ slug, ref }) {
  const dest = `public/img/equipo/ilustracion/${slug}.png`;
  if (existsSync(dest) && !force) {
    console.log(`↪ ${slug} ya existe, saltado (usa --force para regenerar)`);
    return;
  }

  console.log(`▶ ${slug} (gpt-image-1, referencia: ${ref})…`);

  const fd = new FormData();
  fd.append("model", "gpt-image-1");
  fd.append("prompt", STYLE_PROMPT);
  fd.append("size", "1024x1024");
  fd.append("quality", "medium");
  fd.append("background", "transparent");
  const buf = readFileSync(ref);
  fd.append("image[]", new Blob([buf], { type: "image/jpeg" }), `${slug}.jpg`);
  const styleBuf = readFileSync(STYLE_REF);
  fd.append("image[]", new Blob([styleBuf], { type: "image/png" }), "style-ref.png");

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
  await hardCutAlpha(dest);
  console.log(`  ✓ Guardado y recortado en ${dest}`);
}

const targets = only ? TEAM.filter((t) => t.slug === only) : TEAM;
if (targets.length === 0) {
  console.error(`--only=${only} no coincide con ningún slug del equipo.`);
  process.exit(1);
}

if (cleanOnly) {
  // Re-aplica solo el recorte de alpha a los PNG que ya existen, sin llamar
  // a la API (útil si el fondo quedó con halo pero el resto está bien).
  for (const t of targets) {
    const dest = `public/img/equipo/ilustracion/${t.slug}.png`;
    if (!existsSync(dest)) {
      console.log(`↪ ${t.slug}: no existe ${dest}, saltado`);
      continue;
    }
    await hardCutAlpha(dest);
    console.log(`✓ ${t.slug}: alpha recortado`);
  }
} else {
  for (const t of targets) {
    await generateOne(t);
  }
}

console.log("Fin. Revisa public/img/equipo/ilustracion/ y compara con el estilo de los artistas antes de commitear.");
