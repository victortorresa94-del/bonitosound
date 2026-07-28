import fs from "node:fs";
import path from "node:path";

const pub = path.join(process.cwd(), "public");
const EXT = ["svg", "webp", "png", "jpg", "jpeg", "avif"];

/** Pasa un nombre de marca/persona a slug de fichero: "Ballantine's" -> "ballantines". */
export function assetSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "") // "ballantine's" -> "ballantines" (no guión)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Devuelve la ruta pública de un asset si el fichero existe en /public,
 * probando varias extensiones. Si no existe, devuelve null y el componente
 * cae al placeholder. Así, en cuanto se suba el fichero, aparece solo.
 *
 * dir: subcarpeta dentro de /public/img (ej. "marcas", "artistas", "instituciones")
 */
export function findAsset(dir: string, slug: string): string | null {
  for (const ext of EXT) {
    const rel = path.join("img", dir, `${slug}.${ext}`);
    if (fs.existsSync(path.join(pub, rel))) return "/" + rel.split(path.sep).join("/");
  }
  return null;
}

export function findLogo(dir: string, name: string): string | null {
  return findAsset(dir, assetSlug(name));
}

export type ResolvedLogo = {
  name: string;
  slug: string;
  src: string | null;
  /** .jpg/.jpeg = foto con fondo, NO admite el filtro de silueta blanca. */
  isPhoto: boolean;
};

/**
 * Resuelve una lista de nombres a sus logos. Devuelve SIEMPRE una entrada por
 * nombre (con `src: null` si aún no hay fichero) para que el componente pueda
 * caer al nombre en texto: así el muro funciona antes de subir un solo logo.
 */
export function resolveLogos(dir: string, items: readonly string[]): ResolvedLogo[] {
  return items.map((name) => {
    const slug = assetSlug(name);
    const src = findAsset(dir, slug);
    return { name, slug, src, isPhoto: Boolean(src && /\.jpe?g$/i.test(src)) };
  });
}

/**
 * Canción propia para el botón "Escuchar a X" de la ficha: SOLO si el artista
 * tiene su audio en /public/audio/artistas/<slug>.(mp3|m4a) — su propia música,
 * que sí podemos reproducir. Si no hay, devuelve undefined y el botón no se
 * pinta (nada de reproducir música de terceros sin derechos).
 */
export function findArtistAudio(slug: string): string | undefined {
  for (const ext of ["mp3", "m4a"]) {
    const rel = path.join("audio", "artistas", `${slug}.${ext}`);
    if (fs.existsSync(path.join(pub, rel))) return "/" + rel.split(path.sep).join("/");
  }
  return undefined;
}
