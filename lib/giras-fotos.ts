import fs from "node:fs";
import path from "node:path";

/**
 * Fotos de una gira, más allá de la portada.
 *
 * Se descubren solas: todo lo que haya en /public/img/giras/<slug>/ sale en la
 * página de esa gira. Basta con dejar el fichero ahí, igual que con los logos.
 *
 * El pie y la autoría SÍ se escriben a mano aquí abajo, porque un nombre de
 * fichero no sabe quién sale en la foto ni quién la hizo. Si una foto no tiene
 * entrada, se pinta igualmente pero sin pie: mejor la foto muda que no tenerla.
 */
export type GiraFoto = { src: string; caption?: string; credit?: string };

/** slug de gira → nombre de fichero (sin extensión) → pie y autoría. */
const PIES: Record<string, Record<string, { caption: string; credit?: string }>> = {
  "alfred-garcia-1016": {
    // La de Dani afinando la guitarra de Alfred en pleno escenario: la que
    // pidió Víctor expresamente para esta gira.
    backliner: { caption: "Backline en escenario", credit: "Roser Gamonal" },
    madrid: { caption: "Madrid, marzo de 2019", credit: "Roser Gamonal" },
    gijon: { caption: "Gijón, marzo de 2019" },
    barcelona: { caption: "Barcelona, abril de 2019", credit: "Roser Gamonal" },
    lleida: { caption: "Lleida, mayo de 2019", credit: "Roser Gamonal" },
    anoia: { caption: "Anòlia, Igualada, julio de 2019", credit: "Roser Gamonal" },
    "anoia-2": { caption: "Anòlia, Igualada, julio de 2019", credit: "Roser Gamonal" },
    portalblau: { caption: "Portalblau, julio de 2019", credit: "Roser Gamonal" },
    camerino: { caption: "El corro de antes de salir", credit: "Roser Gamonal" },
    equipo: { caption: "El equipo de la gira, al completo" },
    publico: { caption: "El público, que es de lo que va todo", credit: "Roser Gamonal" },
  },
};

/** El orden en que se enseñan. Lo que no esté listado va detrás, alfabético. */
const ORDEN: Record<string, string[]> = {
  "alfred-garcia-1016": [
    "backliner", "camerino", "madrid", "barcelona", "lleida",
    "anoia", "anoia-2", "portalblau", "gijon", "equipo", "publico",
  ],
};

const EXT = /\.(jpe?g|png|webp|avif)$/i;

export function girasFotos(slug: string): GiraFoto[] {
  const dir = path.join(process.cwd(), "public", "img", "giras", slug);
  let ficheros: string[];
  try {
    ficheros = fs.readdirSync(dir).filter((f) => EXT.test(f));
  } catch {
    return []; // sin carpeta no hay galería, y no pasa nada
  }

  const orden = ORDEN[slug] ?? [];
  const pos = (f: string) => {
    const i = orden.indexOf(f.replace(EXT, ""));
    return i === -1 ? orden.length : i;
  };
  ficheros.sort((a, b) => pos(a) - pos(b) || a.localeCompare(b));

  return ficheros.map((f) => ({
    src: `/img/giras/${slug}/${f}`,
    ...(PIES[slug]?.[f.replace(EXT, "")] ?? {}),
  }));
}
