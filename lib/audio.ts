import fs from "node:fs";
import path from "node:path";

export type Track = {
  src: string;
  /** Título del tema, sacado del nombre del fichero. */
  title: string;
  /** Artista, si el nombre del fichero lo trae. */
  artist?: string;
};

/** "03-dulze-que-fantasia.mp3" → { artist: "Dulze", title: "Que Fantasia" } */
function parseName(file: string): { title: string; artist?: string } {
  const base = file.replace(/\.(mp3|m4a)$/i, "");
  // El prefijo numérico solo sirve para ordenar; no se muestra.
  const sinOrden = base.replace(/^\d+[-_\s]+/, "");

  const capitalizar = (s: string) =>
    s
      .replace(/[-_]+/g, " ")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");

  // El separador oficial es el DOBLE guion: los nombres de artista llevan
  // guiones simples dentro ("kenai-white"), así que partir por el primero
  // dejaba a Kenai sin apellido.
  if (sinOrden.includes("--")) {
    const [artista, ...resto] = sinOrden.split("--");
    return { artist: capitalizar(artista), title: capitalizar(resto.join("--")) };
  }

  // Ficheros subidos a mano sin el doble guion: primer tramo = artista.
  const partes = sinOrden.split(/[-_]/).filter(Boolean);
  if (partes.length >= 2) {
    const [artista, ...resto] = partes;
    return { artist: capitalizar(artista), title: capitalizar(resto.join(" ")) };
  }
  return { title: capitalizar(sinOrden || base) };
}

/**
 * Playlist del reproductor global. Coge los audios que se dejen en
 * /public/audio/playlist/ (mp3 o m4a), por orden alfabético — de ahí que
 * convenga nombrarlos `NN-artista-titulo.mp3`: el número ordena y el resto se
 * muestra en la radio.
 *
 * Plug-and-play: sube un tema CON LICENCIA ahí y el reproductor aparece y suena;
 * con dos o más se activan el "siguiente" y el modo radio. Si no hay ninguno, no
 * se pinta nada. Nada hardcodeado: la canción sin derechos se retiró.
 */
export function getPlaylist(): Track[] {
  const dir = path.join(process.cwd(), "public", "audio", "playlist");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(mp3|m4a)$/i.test(f))
    .sort()
    .map((f) => ({ src: `/audio/playlist/${f}`, ...parseName(f) }));
}
