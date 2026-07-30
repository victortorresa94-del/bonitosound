/**
 * Radio Bonito — genera UNA sesión continua tipo DJ a partir de los másters.
 *
 *   node scripts/radio-mix.mjs <carpeta-con-audios> [segundos-por-tema]
 *
 * Antes esto sacaba 20 mp3 sueltos y el reproductor saltaba de uno a otro: se
 * paraba una canción y empezaba otra de golpe, que es justo lo que no queremos.
 * Ahora produce un ÚNICO mp3 continuo en el que los temas se solapan con
 * crossfade, como pincharía un DJ, más un JSON con el minutaje de cada tema
 * para que la radio sepa qué suena en cada momento y pueda saltar de emisora.
 *
 * Qué hace con cada tema:
 *   1. Lo decodifica con ffmpeg (WAV/MP3, cualquier profundidad) a PCM mono.
 *   2. Busca la ventana con MÁS energía — en la práctica, el estribillo.
 *   3. Mide su loudness real (RMS) y lo iguala al del resto: normalizar por
 *      PICO no sirve, dos temas con el mismo pico pueden sonar muy distinto.
 *   4. Lo encadena con el anterior solapando CROSSFADE segundos.
 *
 * El resultado va a public/audio/ como radio-bonito.mp3 + radio-bonito.json.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import * as lamejs from "@breezystack/lamejs";

const SRC = process.argv[2];
const SEGUNDOS = Number(process.argv[3] ?? 14);
const CROSSFADE = 3;            // solape entre temas, en segundos
const SR = 44100;
const RMS_OBJETIVO = 0.06;      // ~-24 dBFS RMS: nivel cómodo de fondo web
const DEST = path.join(process.cwd(), "public", "audio");

const FFMPEG =
  process.env.FFMPEG_PATH ||
  "/tmp/ff/node_modules/@ffmpeg-installer/linux-x64/ffmpeg";

if (!SRC || !fs.existsSync(SRC)) {
  console.error("Uso: node scripts/radio-mix.mjs <carpeta-con-audios> [segundos]");
  process.exit(1);
}
if (!fs.existsSync(FFMPEG)) {
  console.error(`No encuentro ffmpeg en ${FFMPEG}. Define FFMPEG_PATH.`);
  process.exit(1);
}

/** Decodifica cualquier audio a Float32 mono con ffmpeg. */
function decodificar(archivo) {
  const raw = execFileSync(
    FFMPEG,
    ["-v", "error", "-i", archivo, "-ac", "1", "-ar", String(SR), "-f", "f32le", "-"],
    { maxBuffer: 1024 * 1024 * 1024 },
  );
  return new Float32Array(raw.buffer, raw.byteOffset, Math.floor(raw.length / 4));
}

/** Inicio de la ventana de N segundos con más energía. */
function mejorVentana(pcm, segundos) {
  const ancho = Math.floor(SR * segundos);
  if (pcm.length <= ancho) return 0;

  const bloque = Math.floor(SR * 0.25);
  const n = Math.floor(pcm.length / bloque);
  const energia = new Float64Array(n);
  for (let b = 0; b < n; b++) {
    let s = 0;
    for (let i = b * bloque; i < (b + 1) * bloque; i++) s += pcm[i] * pcm[i];
    energia[b] = s;
  }

  const vent = Math.floor(ancho / bloque);
  let suma = 0;
  for (let b = 0; b < vent; b++) suma += energia[b];
  let mejor = suma;
  let mejorB = 0;
  for (let b = vent; b < n; b++) {
    suma += energia[b] - energia[b - vent];
    if (suma > mejor) {
      mejor = suma;
      mejorB = b - vent + 1;
    }
  }
  return mejorB * bloque;
}

/** Nombre limpio: fuera códigos internos y coletillas de estudio. */
function parsearNombre(archivo) {
  let s = archivo.replace(/\.(wav|mp3|m4a|flac)$/i, "");
  // GitHub Releases cambia los espacios por puntos al subir un adjunto.
  s = s.replace(/\./g, " ");
  s = s.replace(/\bBS\d+\b/gi, "");
  s = s.replace(/[\[(][^\])]*[\])]/g, "");
  s = s.replace(/[_]+/g, " - ");
  s = s.replace(/\b(master|mix|final|studio version|v\d+)\b/gi, "");
  s = s.replace(/\s*-\s*/g, " - ").replace(/\s+/g, " ").trim();
  s = s.replace(/(\s*-\s*)+/g, " - ");
  s = s.replace(/^[-\s]+|[-\s]+$/g, "");

  const partes = s.split(" - ").map((p) => p.trim()).filter(Boolean);
  const artista = partes[0] ?? s;
  const titulo = partes.slice(1).join(" ") || artista;
  const bonito = (x) =>
    x
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  return { artist: bonito(artista), title: bonito(titulo) };
}

const archivos = fs
  .readdirSync(SRC)
  .filter((f) => /\.(wav|mp3|m4a|flac)$/i.test(f))
  .sort();

if (!archivos.length) {
  console.error(`No hay audios en ${SRC}`);
  process.exit(1);
}

console.log(`${archivos.length} temas · ${SEGUNDOS}s cada uno · crossfade ${CROSSFADE}s\n`);

const fadeMuestras = Math.floor(SR * CROSSFADE);
const clipMuestras = Math.floor(SR * SEGUNDOS);
// Cada tema aporta (clip - crossfade) al total, porque se solapa con el anterior.
const totalMuestras = archivos.length * (clipMuestras - fadeMuestras) + fadeMuestras;
const sesion = new Float32Array(totalMuestras);
const pistas = [];

let cursor = 0;
archivos.forEach((archivo, i) => {
  const pcm = decodificar(path.join(SRC, archivo));
  const inicio = mejorVentana(pcm, SEGUNDOS);
  const trozo = pcm.slice(inicio, inicio + clipMuestras);

  // Normalizado por RMS (loudness percibido), no por pico: es lo que hace que
  // todos los temas suenen IGUAL de fuertes. El pico engaña.
  let suma = 0;
  for (const v of trozo) suma += v * v;
  const rms = Math.sqrt(suma / trozo.length) || 1e-9;
  let g = RMS_OBJETIVO / rms;
  // Techo de seguridad: que ningún pico sature tras aplicar la ganancia.
  let pico = 0;
  for (const v of trozo) pico = Math.max(pico, Math.abs(v));
  if (pico * g > 0.95) g = 0.95 / pico;

  // Mezcla con solape: los primeros CROSSFADE segundos se suman al final del
  // tema anterior, subiendo este y bajando aquel a la vez.
  for (let n = 0; n < trozo.length; n++) {
    const pos = cursor + n;
    if (pos >= sesion.length) break;
    let v = trozo[n] * g;
    if (i > 0 && n < fadeMuestras) v *= n / fadeMuestras; // entra
    if (i < archivos.length - 1 && n >= trozo.length - fadeMuestras) {
      v *= (trozo.length - n) / fadeMuestras; // sale
    }
    sesion[pos] += v;
  }

  const { artist, title } = parsearNombre(archivo);
  pistas.push({ artist, title, at: +(cursor / SR).toFixed(2) });
  console.log(
    `  ${String(i + 1).padStart(2, "0")}. ${artist} — ${title}  (min ${(cursor / SR / 60).toFixed(1)})`,
  );

  cursor += clipMuestras - fadeMuestras;
});

// Limitador suave por si la suma de dos temas solapados se pasa.
let picoFinal = 0;
for (const v of sesion) picoFinal = Math.max(picoFinal, Math.abs(v));
const techo = picoFinal > 0.95 ? 0.95 / picoFinal : 1;

const pcm16 = new Int16Array(sesion.length);
for (let n = 0; n < sesion.length; n++) {
  pcm16[n] = Math.max(-32768, Math.min(32767, Math.round(sesion[n] * techo * 32767)));
}

const enc = new lamejs.Mp3Encoder(1, SR, 128);
const trozos = [];
for (let n = 0; n < pcm16.length; n += 1152) {
  trozos.push(Buffer.from(enc.encodeBuffer(pcm16.subarray(n, n + 1152))));
}
trozos.push(Buffer.from(enc.flush()));
const mp3 = Buffer.concat(trozos);

fs.mkdirSync(DEST, { recursive: true });
fs.writeFileSync(path.join(DEST, "radio-bonito.mp3"), mp3);
fs.writeFileSync(
  path.join(DEST, "radio-bonito.json"),
  JSON.stringify({ duration: +(sesion.length / SR).toFixed(2), tracks: pistas }, null, 2),
);

const mins = (sesion.length / SR / 60).toFixed(1);
console.log(`\nSesión de ${mins} min · ${(mp3.length / 1024 / 1024).toFixed(1)} MB`);
console.log("→ public/audio/radio-bonito.mp3 + radio-bonito.json");
