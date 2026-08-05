import fs from "node:fs";
import zlib from "node:zlib";

/**
 * ¿Este PNG aguanta el filtro de silueta (`brightness(0)`) sin convertirse en
 * un rectángulo negro?
 *
 * Por qué hace falta: para pintar un muro de logos de mil marcas distintas en
 * un solo tono se usa `brightness(0)`, que multiplica todos los canales de
 * color por cero. Sobre un logotipo dibujado sobre fondo transparente eso da
 * justo la silueta que buscamos. Sobre uno que trae el fondo incrustado
 * (font-vella.png es un rectángulo azul marino con el texto en blanco) lo que
 * da es un tocho negro ilegible.
 *
 * Mirar la extensión NO basta —los dos son PNG en RGBA— y mirar solo "¿tiene
 * algún píxel transparente?" tampoco: los logos con fondo macizo suelen venir
 * centrados en un lienzo con márgenes transparentes, así que también dan que
 * sí. Lo que de verdad los distingue es la COBERTURA: qué porcentaje de la
 * caja que ocupa el logo está relleno.
 *
 *   · Logo de tinta sobre transparencia → 0,03–0,62 (medido en los 13 logos
 *     que hay hoy en public/img/marcas)
 *   · Logo con fondo incrustado         → 1,000 exacto
 *
 * De ahí el umbral de 0,9: hay un abismo entre los dos grupos, no un
 * gradiente, así que no es un número fino de calibrar.
 *
 * Por qué a mano y no con sharp: sharp está en el proyecto, pero su API es
 * asíncrona y esto se consume desde componentes de servidor que renderizan
 * síncronos. Son ficheros de pocos KB y el resultado se cachea arriba.
 *
 * Devuelve `false` ante cualquier problema (PNG entrelazado, 16 bits, error de
 * inflado…). Es el lado seguro: un logo a color de más se nota mucho menos que
 * un rectángulo negro en mitad de la fila.
 */
export function pngAguantaSilueta(ruta: string): boolean {
  const alfa = leerAlfa(ruta);
  if (!alfa) return false;

  const { ancho, alto, datos } = alfa;
  let x0 = ancho, y0 = alto, x1 = -1, y1 = -1, opacos = 0;
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      if (datos[y * ancho + x] < 250) continue;
      opacos++;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  if (x1 < 0) return false; // todo transparente: no hay nada que pintar

  const areaCaja = (x1 - x0 + 1) * (y1 - y0 + 1);
  return opacos / areaCaja < 0.9;
}

/** Canal alfa del PNG, ya sin filtrar. `null` si no se puede leer. */
function leerAlfa(
  ruta: string,
): { ancho: number; alto: number; datos: Uint8Array } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(ruta);
  } catch {
    return null;
  }
  if (buf.length < 33 || buf.readUInt32BE(0) !== 0x89504e47) return null;

  const ancho = buf.readUInt32BE(16);
  const alto = buf.readUInt32BE(20);
  const bits = buf[24];
  const tipoColor = buf[25];
  const entrelazado = buf[28];

  // Solo los tipos CON canal alfa (4 = gris+alfa, 6 = RGBA). Los demás son
  // opacos de principio a fin, así que nunca aguantan la silueta.
  const canales = tipoColor === 4 ? 2 : tipoColor === 6 ? 4 : 0;
  // El entrelazado Adam7 reordena los datos y 16 bits/canal cambia el tamaño;
  // ninguno de los dos aparece en logotipos y no compensa implementarlos.
  if (!canales || entrelazado !== 0 || bits !== 8) return null;

  const idat: Buffer[] = [];
  let off = 8;
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const tipo = buf.toString("ascii", off + 4, off + 8);
    if (tipo === "IDAT") idat.push(buf.subarray(off + 8, off + 8 + len));
    if (tipo === "IEND") break;
    off += 12 + len; // longitud + tipo + datos + CRC
  }
  if (idat.length === 0) return null;

  let datos: Buffer;
  try {
    datos = zlib.inflateSync(Buffer.concat(idat));
  } catch {
    return null;
  }

  const bpp = canales; // 8 bits por canal → 1 byte por canal
  const anchoFila = ancho * bpp;
  if (datos.length < (anchoFila + 1) * alto) return null;

  // PNG guarda cada fila filtrada respecto a la de arriba o al píxel de la
  // izquierda; hay que deshacerlo para leer valores reales.
  const previa = Buffer.alloc(anchoFila);
  const actual = Buffer.alloc(anchoFila);
  const salida = new Uint8Array(ancho * alto);

  for (let y = 0; y < alto; y++) {
    const base = y * (anchoFila + 1);
    const filtro = datos[base];
    for (let i = 0; i < anchoFila; i++) {
      const x = datos[base + 1 + i];
      const a = i >= bpp ? actual[i - bpp] : 0; // izquierda
      const b = previa[i]; // arriba
      const c = i >= bpp ? previa[i - bpp] : 0; // arriba-izquierda
      let v: number;
      switch (filtro) {
        case 0: v = x; break;
        case 1: v = x + a; break;
        case 2: v = x + b; break;
        case 3: v = x + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v = x + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: return null;
      }
      actual[i] = v & 0xff;
    }
    // El alfa es el último canal de cada píxel.
    for (let x = 0; x < ancho; x++) salida[y * ancho + x] = actual[x * bpp + bpp - 1];
    actual.copy(previa);
  }

  return { ancho, alto, datos: salida };
}
