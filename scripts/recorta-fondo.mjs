/**
 * Quita el fondo blanco de una ilustración generada, para que se apoye sobre el
 * crema de la página en vez de traer su propio cuadrado blanco.
 *
 * Va por INUNDACIÓN DESDE EL BORDE y no por color en toda la imagen: aquí hay
 * camisas blancas y una camiseta de rayas blancas, y un filtro global de "todo
 * lo que sea casi blanco" les haría agujeros. Lo que toca el borde y es blanco
 * es fondo; lo que está encerrado dentro de la figura, no.
 *
 * El borde se suaviza con una banda de alfa intermedio para que no queden
 * dientes de sierra contra el fondo de la página.
 *
 *   node scripts/recorta-fondo.mjs entrada.png salida.png [umbral]
 */
import sharp from "sharp";

const [, , entrada, salida, umbralArg] = process.argv;
if (!entrada || !salida) {
  console.error("uso: node scripts/recorta-fondo.mjs <entrada> <salida> [umbral]");
  process.exit(1);
}
const UMBRAL = Number(umbralArg ?? 236); // por encima de esto se considera blanco

const { data, info } = await sharp(entrada)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H } = info;
const esBlanco = (i) => data[i] >= UMBRAL && data[i + 1] >= UMBRAL && data[i + 2] >= UMBRAL;

// Inundación en anchura desde los cuatro bordes. Pila explícita, no recursión:
// con un millón de píxeles la recursiva revienta.
const fondo = new Uint8Array(W * H);
const pila = [];
for (let x = 0; x < W; x++) { pila.push(x, (H - 1) * W + x); }
for (let y = 0; y < H; y++) { pila.push(y * W, y * W + W - 1); }

while (pila.length) {
  const p = pila.pop();
  if (fondo[p]) continue;
  if (!esBlanco(p * 4)) continue;
  fondo[p] = 1;
  const x = p % W, y = (p - x) / W;
  if (x > 0) pila.push(p - 1);
  if (x < W - 1) pila.push(p + 1);
  if (y > 0) pila.push(p - W);
  if (y < H - 1) pila.push(p + W);
}

// Alfa: 0 en el fondo, 255 en la figura, y una banda intermedia de un píxel en
// la frontera para que el contorno no salga dentado.
for (let p = 0; p < W * H; p++) {
  if (!fondo[p]) continue;
  const x = p % W, y = (p - x) / W;
  let vecinoFigura = false;
  for (let dy = -1; dy <= 1 && !vecinoFigura; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      if (!fondo[ny * W + nx]) { vecinoFigura = true; break; }
    }
  }
  data[p * 4 + 3] = vecinoFigura ? 90 : 0;
}

await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(salida);

const recortados = fondo.reduce((n, v) => n + v, 0);
console.log(`${salida}: ${((recortados / (W * H)) * 100).toFixed(1)}% del lienzo era fondo`);
