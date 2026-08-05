import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Hero de /giras: la palabra GIRAS enorme en OUTLINE (letras transparentes con
 * trazo navy), ligeramente inclinada, y una carretera cian dibujada a mano que
 * la cruza con sus chinchetas. Hermano del hero de /experiencias, pero con
 * ruta en vez de onda. Todo SVG/CSS: no depende de ninguna imagen.
 *
 * El trazo va con <text> de SVG, NO con `-webkit-text-stroke`: ese CSS pinta
 * el contorno del glifo completo (incluidos los tramos donde la propia letra
 * se cruza consigo misma, como la pierna de la R o el vértice de la A), y a
 * tamaños grandes esos cruces salen como un parche mal rellenado — el
 * "glitch" que se veía. El stroke de SVG recorre el contorno real de la
 * fuente sin ese artefacto.
 */
export function GirasHero() {
  const locale = serverLocale();
  return (
    <div className="relative px-5 pt-14 md:px-10 md:pt-16">
      <div className="pointer-events-none relative">
        <svg
          role="img"
          aria-label={tr(locale, "Giras")}
          viewBox="0 0 1200 280"
          className="block w-full"
          style={{ transform: "rotate(-2deg)" }}
        >
          <text
            x="600"
            y="205"
            textAnchor="middle"
            className="font-round font-bold"
            style={{ fontSize: "255px", letterSpacing: "3px" }}
            fill="none"
            stroke={NAVY}
            strokeWidth="4.5"
            paintOrder="stroke"
          >
            GIRAS
          </text>

          {/* Carretera cian cruzando las letras, con chinchetas de ciudad. */}
          <path
            d="M-20 150 C 160 60, 330 62, 470 108 C 600 150, 700 132, 820 86 C 950 38, 1080 52, 1220 118"
            fill="none"
            stroke={CYAN}
            strokeWidth="9"
            strokeLinecap="round"
          />
          {[
            [180, 108],
            [470, 108],
            [820, 86],
            [1080, 62],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="13" fill={CYAN} />
          ))}
        </svg>
      </div>

      {/* Bajada: qué hacemos en una gira, con su garabato. */}
      <div className="ml-auto mt-3 max-w-[17rem] text-right md:-mt-1 md:max-w-[22rem]">
        <p
          className="text-[0.72rem] font-bold uppercase leading-snug tracking-[0.06em] md:text-[0.82rem]"
          style={{ color: NAVY }}
        >
          {tr(locale, "Producción técnica, logística y road management")}
        </p>
        <svg className="ml-auto mt-2 h-3 w-40" viewBox="0 0 160 12" fill="none" aria-hidden>
          <path
            d="M2 7 q 10 -5, 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 18 -2"
            stroke={CYAN}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
