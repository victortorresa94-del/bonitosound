/**
 * Radio Bonito — corta 10 s de cada tema y los deja listos para la web.
 *
 *   node scripts/radio-mix.mjs <carpeta-con-wavs> [segundos]
 *
 * Qué hace con cada .wav:
 *   1. Lo lee (PCM 16/24/32 bits, mono o estéreo) y lo pasa a mono.
 *   2. Busca la ventana de N segundos con MÁS energía — que en la práctica es
 *      el estribillo — en vez de cortar por un tiempo fijo a ciegas.
 *   3. Le mete fundido de entrada y salida para que no chasquee al encadenar.
 *   4. Lo codifica a mp3 y lo deja en public/audio/playlist/.
 *
 * El nombre de salida sale del propio fichero: se limpia el código interno
 * (BS00xx), "Master", "MIX", etc., y queda `NN-artista-titulo.mp3`, que es lo
 * que lee lib/audio.ts para saber quién suena en el dial.
 *
 * Por qué en JS y no con ffmpeg: el ffmpeg de este entorno viene compilado con
 * --disable-everything y no trae un solo códec de audio. lamejs sí codifica.
 */
import fs from "node:fs";
import path from "node:path";
import * as lamejs from "@breezystack/lamejs";

const SRC = process.argv[2];
const SEGUNDOS = Number(process.argv[3] ?? 10);
const DEST = path.join(process.cwd(), "public", "audio", "playlist");

if (!SRC || !fs.existsSync(SRC)) {
  console.error("Uso: node scripts/radio-mix.mjs <carpeta-con-wavs> [segundos]");
  process.exit(1);
}

/** Lee un WAV PCM y devuelve { pcm: Float32Array mono, sampleRate }. */
function leerWav(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WAVE") {
    throw new Error("no es un WAV RIFF");
  }

  let pos = 12;
  let fmt = null;
  let data = null;

  // Recorremos los chunks: no damos por hecho que 'data' vaya justo detrás de
  // 'fmt ', porque los másters suelen traer chunks de metadatos en medio.
  while (pos + 8 <= buf.length) {
    const id = buf.toString("ascii", pos, pos + 4);
    const size = buf.readUInt32LE(pos + 4);
    const cuerpo = pos + 8;
    if (id === "fmt ") {
      fmt = {
        formato: buf.readUInt16LE(cuerpo),
        canales: buf.readUInt16LE(cuerpo + 2),
        sampleRate: buf.readUInt32LE(cuerpo + 4),
        bits: buf.readUInt16LE(cuerpo + 14),
      };
    } else if (id === "data") {
      data = buf.subarray(cuerpo, Math.min(cuerpo + size, buf.length));
    }
    pos = cuerpo + size + (size % 2); // los chunks van alineados a par
  }

  if (!fmt || !data) throw new Error("faltan los chunks fmt/data");

  const { canales, bits, sampleRate, formato } = fmt;
  const bytes = bits / 8;
  const frames = Math.floor(data.length / (bytes * canales));
  const mono = new Float32Array(frames);

  for (let i = 0; i < frames; i++) {
    let suma = 0;
    for (let c = 0; c < canales; c++) {
      const o = (i * canales + c) * bytes;
      let v;
      if (formato === 3 && bits === 32) v = data.readFloatLE(o);           // float
      else if (bits === 16) v = data.readInt16LE(o) / 32768;
      else if (bits === 24) v = ((data[o] | (data[o + 1] << 8) | (data[o + 2] << 24 >> 8)) << 8) / 2147483648 * 256;
      else if (bits === 32) v = data.readInt32LE(o) / 2147483648;
      else if (bits === 8) v = (data[o] - 128) / 128;
      else throw new Error(`${bits} bits no soportado`);
      suma += v;
    }
    mono[i] = suma / canales;
  }

  return { pcm: mono, sampleRate };
}

/** Remuestrea por interpolación lineal. Suficiente para un clip de 10 s. */
function remuestrear(pcm, de, a) {
  if (de === a) return pcm;
  const ratio = de / a;
  const salida = new Float32Array(Math.floor(pcm.length / ratio));
  for (let i = 0; i < salida.length; i++) {
    const x = i * ratio;
    const i0 = Math.floor(x);
    const i1 = Math.min(i0 + 1, pcm.length - 1);
    salida[i] = pcm[i0] + (pcm[i1] - pcm[i0]) * (x - i0);
  }
  return salida;
}

/** Índice donde arranca la ventana de N segundos con más energía (RMS). */
function mejorVentana(pcm, sr, segundos) {
  const ancho = Math.floor(sr * segundos);
  if (pcm.length <= ancho) return 0;

  // Energía acumulada por bloques de 0,25 s: comparar bloques es mucho más
  // barato que recorrer muestra a muestra y da el mismo resultado.
  const bloque = Math.floor(sr * 0.25);
  const nBloques = Math.floor(pcm.length / bloque);
  const energia = new Float64Array(nBloques);
  for (let b = 0; b < nBloques; b++) {
    let s = 0;
    for (let i = b * bloque; i < (b + 1) * bloque; i++) s += pcm[i] * pcm[i];
    energia[b] = s;
  }

  const bloquesVentana = Math.floor(ancho / bloque);
  let suma = 0;
  for (let b = 0; b < bloquesVentana; b++) suma += energia[b];
  let mejor = suma;
  let mejorB = 0;
  for (let b = bloquesVentana; b < nBloques; b++) {
    suma += energia[b] - energia[b - bloquesVentana];
    if (suma > mejor) {
      mejor = suma;
      mejorB = b - bloquesVentana + 1;
    }
  }
  return mejorB * bloque;
}

/** Nombre bonito: fuera códigos internos y coletillas de estudio. */
function nombreSalida(archivo, i) {
  let s = archivo.replace(/\.wav$/i, "");
  // GitHub Releases sustituye los espacios del nombre original por puntos al
  // subir el adjunto ("BS0076 Roky - Master.wav" → "BS0076.Roky.-.Master.wav").
  // Sin deshacerlo aquí, el split por " - " nunca encuentra el separador
  // (queda ".-." sin espacios) y el título se pierde.
  s = s.replace(/\./g, " ");
  s = s.replace(/\bBS\d+\b/gi, "");                        // BS0077
  s = s.replace(/[\[(][^\])]*[\])]/g, "");                 // [MIX], (24_48)
  // Los separadores van ANTES de limpiar coletillas: en "Master_verdeaceituna"
  // el guion bajo cuenta como carácter de palabra y \bmaster\b no casaría.
  s = s.replace(/[_]+/g, " - ");
  s = s.replace(/\b(master|mix|final|studio version|v\d+)\b/gi, "");
  s = s.replace(/\s*-\s*/g, " - ").replace(/\s+/g, " ").trim();
  s = s.replace(/(\s*-\s*)+/g, " - ");                     // guiones huérfanos
  s = s.replace(/^[-\s]+|[-\s]+$/g, "");

  const partes = s.split(" - ").map((p) => p.trim()).filter(Boolean);
  const [artista, ...resto] = partes;
  const titulo = resto.join(" ") || artista;

  const limpio = (x) =>
    x
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Doble guion entre artista y título: con uno solo, "Kenai White - Déjame"
  // quedaba como artista "Kenai" y título "White Déjame".
  const nn = String(i + 1).padStart(2, "0");
  return `${nn}-${limpio(artista)}--${limpio(titulo)}.mp3`;
}

const wavs = fs.readdirSync(SRC).filter((f) => /\.wav$/i.test(f)).sort();
if (!wavs.length) {
  console.error(`No hay .wav en ${SRC}`);
  process.exit(1);
}

fs.mkdirSync(DEST, { recursive: true });
console.log(`${wavs.length} temas · ${SEGUNDOS}s de cada uno\n`);

let ok = 0;
wavs.forEach((archivo, i) => {
  try {
    const { pcm, sampleRate } = leerWav(fs.readFileSync(path.join(SRC, archivo)));

    // 44.1k es tasa MPEG válida y ahorra la mitad de peso frente a 48k.
    const sr = 44100;
    const mono = remuestrear(pcm, sampleRate, sr);

    const inicio = mejorVentana(mono, sr, SEGUNDOS);
    const trozo = mono.slice(inicio, inicio + Math.floor(sr * SEGUNDOS));

    // Fundidos de 300 ms: sin ellos el corte chasquea al entrar y al salir.
    const fade = Math.floor(sr * 0.3);
    for (let n = 0; n < fade && n < trozo.length; n++) {
      trozo[n] *= n / fade;
      trozo[trozo.length - 1 - n] *= n / fade;
    }

    // Normalizamos a -1 dB para que todos los temas suenen igual de fuertes:
    // en una radio, que un tema entre mucho más bajo que el anterior canta.
    let pico = 0;
    for (const v of trozo) pico = Math.max(pico, Math.abs(v));
    const g = pico > 0 ? 0.89 / pico : 1;

    const pcm16 = new Int16Array(trozo.length);
    for (let n = 0; n < trozo.length; n++) {
      pcm16[n] = Math.max(-32768, Math.min(32767, Math.round(trozo[n] * g * 32767)));
    }

    const enc = new lamejs.Mp3Encoder(1, sr, 128);
    const trozos = [];
    for (let n = 0; n < pcm16.length; n += 1152) {
      trozos.push(Buffer.from(enc.encodeBuffer(pcm16.subarray(n, n + 1152))));
    }
    trozos.push(Buffer.from(enc.flush()));
    const mp3 = Buffer.concat(trozos);

    const salida = nombreSalida(archivo, i);
    fs.writeFileSync(path.join(DEST, salida), mp3);
    ok++;
    console.log(
      `  ✓ ${salida}  (desde ${(inicio / sr).toFixed(0)}s · ${(mp3.length / 1024).toFixed(0)} KB)`,
    );
  } catch (e) {
    console.error(`  ✗ ${archivo}: ${e.message}`);
  }
});

console.log(`\n${ok}/${wavs.length} listos en public/audio/playlist/`);
