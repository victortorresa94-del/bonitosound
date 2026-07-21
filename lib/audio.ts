import fs from "node:fs";
import path from "node:path";

/**
 * Playlist del reproductor global. Coge los audios que se dejen en
 * /public/audio/playlist/ (mp3 o m4a), por orden alfabético. Plug-and-play:
 * sube un tema CON LICENCIA ahí y el reproductor aparece y suena; con dos o más,
 * el botón "siguiente" se activa solo. Si no hay ninguno, el reproductor no se
 * muestra. Nada hardcodeado: la canción sin derechos se retiró.
 */
export function getPlaylist(): string[] {
  const dir = path.join(process.cwd(), "public", "audio", "playlist");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(mp3|m4a)$/i.test(f))
    .sort()
    .map((f) => `/audio/playlist/${f}`);
}
