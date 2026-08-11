import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

/**
 * Cabecera de /experiencias — variante EA del banco de pruebas.
 *
 * La palabra a todo el ancho en OUTLINE (filete navy sobre relleno del color
 * del fondo, así que se lee hueca) con una línea cian que se enreda entre las
 * letras: pasa por detrás de unas y por delante de otras, como un cable de
 * escenario. Los puntitos cian rematan.
 *
 * Va en SVG y no con `-webkit-text-stroke` a propósito: esa propiedad de CSS
 * pinta el filete sobre los tramos que se cruzan dentro de una misma letra y
 * deja artefactos en la R y la A a tamaños grandes (el mismo fallo que hubo
 * que arreglar en la cabecera de /giras). Con `stroke` + `paint-order` el
 * filete sigue el contorno real de la fuente y sale limpio.
 *
 * El tejido está hecho con tres capas: línea detrás → tipografía →
 * fragmentos de la MISMA línea recortados por delante. Los fragmentos se
 * dibujan con un `clipPath` de bandas verticales, así que basta con mover
 * las bandas para cambiar por dónde asoma.
 */
const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREMA = "#FBFAF6";

/** El recorrido del cable. Compartido por la capa de detrás y la de delante. */
const CABLE =
  "M-40 232 C 90 118, 190 274, 300 214 C 410 154, 470 84, 560 122 C 660 164, 612 276, 700 268 C 796 260, 826 140, 946 158 C 1026 170, 1038 232, 1044 244";

/** Por dónde asoma el cable POR DELANTE de las letras (x inicial y ancho). */
const DELANTE = [
  { x: 120, w: 95 },
  { x: 430, w: 110 },
  { x: 740, w: 100 },
];

export function EventosHero() {
  const locale = serverLocale();
  return (
    <div className="px-5 pb-4 pt-12 md:px-10 md:pt-16">
      <svg
        viewBox="0 0 1000 300"
        className="block w-full"
        role="img"
        aria-label={tr(locale, "Experiencias")}
      >
        <defs>
          <clipPath id="exp-delante">
            {DELANTE.map((b) => (
              <rect key={b.x} x={b.x} y="0" width={b.w} height="300" />
            ))}
          </clipPath>
        </defs>

        {/* 1 · el cable, por detrás */}
        <path d={CABLE} stroke={CYAN} strokeWidth="7" strokeLinecap="round" fill="none" />

        {/* 2 · la palabra.
               El relleno es CREMA, no `none`: con las letras realmente huecas
               el cable de la capa 1 se vería a través y no habría tejido
               ninguno —delante y detrás se verían igual—. Relleno del color
               del fondo, el cuerpo de la letra tapa lo que pasa por detrás.
               `textLength` la obliga a caber exactamente en el viewBox: sin
               eso, con 12 letras se salía por los dos lados, y además el
               ancho dependía de si la fuente había cargado ya. */}
        <text
          x="500"
          y="232"
          textAnchor="middle"
          textLength="952"
          lengthAdjust="spacingAndGlyphs"
          className="font-round"
          style={{ fontSize: "180px", fontWeight: 700 }}
          fill={CREMA}
          stroke={NAVY}
          strokeWidth="3.5"
          paintOrder="stroke"
        >
          EXPERIENCIAS
        </text>

        {/* 3 · el mismo cable otra vez, recortado: solo asoma en tres tramos,
               y ahí parece que pase por delante de la letra */}
        <g clipPath="url(#exp-delante)">
          <path d={CABLE} stroke={CYAN} strokeWidth="7" strokeLinecap="round" fill="none" />
        </g>

        {/* 4 · puntitos sueltos, como el resto de dibujos de la casa */}
        <g fill={CYAN}>
          <circle cx="152" cy="104" r="8" />
          <circle cx="616" cy="78" r="7" />
          <circle cx="858" cy="278" r="8" />
          <circle cx="352" cy="282" r="6" />
        </g>
      </svg>

      <div className="mt-2 flex items-start gap-4 md:mt-4 md:items-center">
        <svg className="mt-1.5 h-3 w-16 shrink-0 md:mt-0 md:w-28" viewBox="0 0 112 12" fill="none" aria-hidden>
          <path d="M2 8 Q 14 2, 28 7 T 56 7 T 84 7 T 110 5" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="max-w-md text-[0.8rem] font-semibold uppercase leading-snug md:text-sm" style={{ color: NAVY }}>
          {tr(locale, "Diseñamos experiencias musicales que conectan marcas, artistas y personas.")}
        </p>
      </div>
    </div>
  );
}
