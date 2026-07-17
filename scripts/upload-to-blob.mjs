/**
 * Sube vídeos a Vercel Blob con nombres LIMPIOS y predecibles.
 *
 * Por qué: por defecto Blob añade un sufijo aleatorio a la URL. Con
 * `addRandomSuffix: false` la URL queda `<BASE>/<nombre>`, así podemos usar una
 * sola base (NEXT_PUBLIC_VIDEO_BASE) y que `videoUrl: "corona.mp4"` resuelva
 * solo, sin apuntar 12 URLs a mano.
 *
 * Uso (desde el PC, que sí tiene red y los vídeos):
 *   1) npm i -D @vercel/blob            (o npm i @vercel/blob)
 *   2) vercel env pull                  (trae BLOB_READ_WRITE_TOKEN a .env.local)
 *   3) Mete los vídeos YA RENOMBRADOS a su slug en ./videos-blob/
 *      (corona.mp4, schweppes.mp4, albert-pla.mp4, …)
 *   4) node scripts/upload-to-blob.mjs
 *
 * Al terminar imprime la BASE. Pon esa BASE en Vercel como
 * NEXT_PUBLIC_VIDEO_BASE (Project → Settings → Environment Variables) y
 * redesplega. Listo.
 */
import { put } from "@vercel/blob";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DIR = process.argv[2] || "./videos-blob";
const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error("Falta BLOB_READ_WRITE_TOKEN. Corre `vercel env pull` primero (o expórtalo).");
  process.exit(1);
}

const files = (await readdir(DIR)).filter((f) => /\.(mp4|webm|mov)$/i.test(f));
if (files.length === 0) {
  console.error(`No hay vídeos en ${DIR}. Mete los .mp4 renombrados a su slug ahí.`);
  process.exit(1);
}

const urls = [];
for (const f of files) {
  const body = await readFile(path.join(DIR, f));
  const { url } = await put(f, body, {
    access: "public",
    addRandomSuffix: false,
    contentType: "video/mp4",
    token,
  });
  urls.push(url);
  console.log("✓", f, "→", url);
}

// La base común (todo antes del nombre de archivo).
const base = urls[0].slice(0, urls[0].lastIndexOf("/"));
console.log("\n────────────────────────────────────────");
console.log("BASE para NEXT_PUBLIC_VIDEO_BASE:");
console.log(base);
console.log("────────────────────────────────────────");
console.log("Ponla en Vercel (Settings → Environment Variables) y redesplega.");
