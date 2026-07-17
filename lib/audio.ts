import fs from "node:fs";
import path from "node:path";

/**
 * Playlist propia del player flotante. Primero SIEMPRE la canción de Bonito;
 * después, cualquier audio que se deje en /public/audio/playlist/ (mp3 o m4a),
 * por orden alfabético. Plug-and-play: sube temas ahí y el botón "siguiente"
 * se activa solo. Sin Spotify (su embed obliga a mostrar el banner de marca).
 */
export function getPlaylist(): string[] {
  const first = "/audio/bonito.mp3";
  const dir = path.join(process.cwd(), "public", "audio", "playlist");
  let extra: string[] = [];
  if (fs.existsSync(dir)) {
    extra = fs
      .readdirSync(dir)
      .filter((f) => /\.(mp3|m4a)$/i.test(f))
      .sort()
      .map((f) => `/audio/playlist/${f}`);
  }
  return [first, ...extra];
}
