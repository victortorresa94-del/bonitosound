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
