/**
 * Adelgaza las imágenes de /public/img sin cambiar sus rutas.
 *
 * Motivo: un despliegue en Vercel se cayó porque el material en bruto de Dani
 * entró tal cual (una foto de 23 MB). Nadie necesita 6000 px de ancho en una
 * web; con 2000 px de lado largo y JPEG q78 la diferencia no se ve.
 *
 * Los PNG con transparencia se quedan en PNG (son dibujos recortados sobre el
 * crema: pasarlos a JPEG les pondría fondo). Los PNG opacos pasan a JPEG.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const LADO = 2000;      // px de lado largo
const UMBRAL = 420 * 1024;

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const objetivo = walk("public/img")
  .filter((p) => /\.(jpe?g|png)$/i.test(p))
  .filter((p) => fs.statSync(p).size > UMBRAL);

let antes = 0, despues = 0;
const renombrados = [];

for (const p of objetivo) {
  const orig = fs.statSync(p).size;
  antes += orig;
  const img = sharp(p).rotate();
  const meta = await img.metadata();
  const conAlfa = meta.hasAlpha && /\.png$/i.test(p);

  const redim = meta.width > LADO || meta.height > LADO
    ? img.resize(LADO, LADO, { fit: "inside", withoutEnlargement: true })
    : img;

  let destino = p, buf;
  if (conAlfa) {
    buf = await redim.png({ compressionLevel: 9, palette: true, quality: 82 }).toBuffer();
  } else {
    buf = await redim.jpeg({ quality: 78, mozjpeg: true }).toBuffer();
    if (/\.png$/i.test(p)) destino = p.replace(/\.png$/i, ".jpg");
  }

  if (buf.length >= orig && destino === p) { despues += orig; continue; }
  fs.writeFileSync(destino, buf);
  if (destino !== p) { fs.unlinkSync(p); renombrados.push([p, destino]); }
  despues += buf.length;
}

console.log(`${objetivo.length} ficheros · ${(antes / 1048576).toFixed(0)}MB → ${(despues / 1048576).toFixed(0)}MB`);
if (renombrados.length) {
  console.log("PNG opacos convertidos a JPEG (revisar referencias):");
  renombrados.forEach(([a, b]) => console.log("  ", a, "→", b));
}
