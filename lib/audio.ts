import fs from "node:fs";
import path from "node:path";

export type Track = {
  /** Título del tema. */
  title: string;
  /** Artista. */
  artist?: string;
  /** Segundo de la sesión en el que entra este tema. */
  at: number;
};

export type Radio = {
  /** El mp3 continuo de la sesión. */
  src: string;
  /** Duración total en segundos. */
  duration: number;
  /** Los temas, con el momento en que entra cada uno. */
  tracks: Track[];
};

/**
 * La Radio Bonito es UNA sesión continua mezclada tipo DJ, no una lista de
 * ficheros sueltos: los temas se solapan con crossfade, así que no se puede
 * trocear en mp3 independientes sin perder la mezcla. La genera
 * `scripts/radio-mix.mjs` a partir de los másters, y deja el mp3 junto a un
 * JSON con el minutaje de cada tema.
 *
 * Si no existe el mp3, devuelve null y no se pinta ninguna radio.
 */
export function getRadio(): Radio | null {
  const dir = path.join(process.cwd(), "public", "audio");
  const mp3 = path.join(dir, "radio-bonito.mp3");
  const meta = path.join(dir, "radio-bonito.json");
  if (!fs.existsSync(mp3) || !fs.existsSync(meta)) return null;

  try {
    const { duration, tracks } = JSON.parse(fs.readFileSync(meta, "utf8"));
    if (!Array.isArray(tracks) || !tracks.length) return null;
    return { src: "/audio/radio-bonito.mp3", duration, tracks };
  } catch {
    // Un JSON corrupto no debe tumbar la web entera: sin radio y a seguir.
    return null;
  }
}
