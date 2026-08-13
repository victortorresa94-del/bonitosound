import fs from "node:fs";
import path from "node:path";
import { pngAguantaSilueta } from "./png-alpha";

const pub = path.join(process.cwd(), "public");
// El orden importa: gana el primero que exista. Vectorial antes que mapa de
// bits, y el gif al final porque un par de asociaciones solo nos han pasado el
// logo en ese formato — no es un formato que elijamos, es el que hay.
const EXT = ["svg", "webp", "png", "jpg", "jpeg", "avif", "gif"];

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
  /**
   * El logo es tinta sobre fondo transparente, así que aguanta el filtro de
   * silueta (`brightness(0)`) sin convertirse en un rectángulo negro. Los que
   * traen el fondo incrustado dan `false` — ver lib/png-alpha.ts.
   */
  aguantaSilueta: boolean;
};

/**
 * ¿El fichero aguanta el filtro de silueta sin volverse un rectángulo negro?
 * El detalle de por qué hace falta y cómo se comprueba está en lib/png-alpha.ts.
 *
 * Los SVG se dan por transparentes: es lo normal en un logotipo vectorial y
 * analizarlos para comprobarlo no compensa.
 *
 * Se cachea por ruta: esto corre en build/SSR y un mismo logo sale en varias
 * páginas — no tiene sentido releer el fichero cada vez.
 */
const cacheSilueta = new Map<string, boolean>();

function aguantaSilueta(rutaPublica: string): boolean {
  const cacheado = cacheSilueta.get(rutaPublica);
  if (cacheado !== undefined) return cacheado;

  let resultado = false;
  if (/\.svg$/i.test(rutaPublica)) {
    resultado = true;
  } else if (/\.png$/i.test(rutaPublica)) {
    resultado = pngAguantaSilueta(path.join(pub, rutaPublica.replace(/^\//, "")));
  }
  // JPG y compañía: sin canal alfa por definición, siempre opacos.

  cacheSilueta.set(rutaPublica, resultado);
  return resultado;
}

/**
 * Resuelve una lista de nombres a sus logos. Devuelve SIEMPRE una entrada por
 * nombre (con `src: null` si aún no hay fichero) para que el componente pueda
 * caer al nombre en texto: así el muro funciona antes de subir un solo logo.
 */
export function resolveLogos(dir: string, items: readonly string[]): ResolvedLogo[] {
  return items.map((name) => {
    const slug = assetSlug(name);
    const src = findAsset(dir, slug);
    return {
      name,
      slug,
      src,
      isPhoto: Boolean(src && /\.jpe?g$/i.test(src)),
      aguantaSilueta: Boolean(src && aguantaSilueta(src)),
    };
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
