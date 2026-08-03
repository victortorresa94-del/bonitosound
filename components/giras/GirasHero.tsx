import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Hero de /giras: la palabra GIRAS enorme en OUTLINE (letras transparentes con
 * trazo navy), ligeramente inclinada, y una carretera cian dibujada a mano que
 * la cruza con sus chinchetas. Hermano del hero de /experiencias, pero con
 * ruta en vez de onda. Todo SVG/CSS: no depende de ninguna imagen.
 */
export function GirasHero() {
  const locale = serverLocale();
  return (
    <div className="relative px-5 pt-14 md:px-10 md:pt-16">
      <div className="pointer-events-none relative">
        <h1
          aria-label="Giras"
          className="select-none whitespace-nowrap text-center font-round font-bold leading-[0.82]"
          style={{
            fontSize: "clamp(4rem, 20vw, 17rem)",
            letterSpacing: "0.01em",
            color: "transparent",
            WebkitTextStroke: `clamp(1.5px, 0.28vw, 3.5px) ${NAVY}`,
            transform: "rotate(-2deg)",
          }}
        >
          GIRAS
        </h1>

        {/* Carretera cian cruzando las letras, con chinchetas de ciudad. */}
        <svg
          className="absolute inset-x-0 top-1/2 h-[52%] w-full -translate-y-1/2"
          viewBox="0 0 1200 200"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M-20 150 C 160 60, 330 62, 470 108 C 600 150, 700 132, 820 86 C 950 38, 1080 52, 1220 118"
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
