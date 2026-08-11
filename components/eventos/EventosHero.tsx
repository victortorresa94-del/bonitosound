import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

/**
 * Cabecera de /experiencias.
 *
 * La versión anterior era la palabra en outline inclinada con una onda cian
 * cruzándola. Víctor la veía "más floja que el diseño antiguo de eventos" y
 * pidió rehacerla sin miedo. Esta es la variante E4 del banco de pruebas
 * (/lab/secciones): la palabra PARTIDA en dos líneas a tamaño de cartel, en
 * grotesca de peso alto, con el segundo tramo en cian.
 *
 * Por qué esta y no la de las cifras: las tres cifras de la página (250
 * eventos · 58 marcas · 53 artistas) ya salen inmediatamente debajo, en
 * EventosShowcase. Repetirlas aquí sería decir dos veces lo mismo en dos
 * pantallas seguidas.
 *
 * El título se parte a propósito, así que el <h1> lleva `aria-label` con la
 * palabra entera y el dibujo va `aria-hidden`: quien use lector de pantalla
 * oye "Experiencias", no "Experi. Encias".
 */
const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function EventosHero() {
  const locale = serverLocale();
  return (
    <div className="px-5 pb-4 pt-14 md:px-10 md:pt-16">
      <h1
        aria-label={tr(locale, "Experiencias")}
        className="font-cartel font-black uppercase leading-[0.86] tracking-tight"
        style={{ color: NAVY, fontSize: "clamp(2.8rem,11vw,8.5rem)" }}
      >
        <span aria-hidden>
          EXPERI
          <br />
          <span style={{ color: CYAN }}>ENCIAS</span>
        </span>
      </h1>

      {/* El garabato hace de guion entre el titular y la frase: los ata sin
          necesidad de una línea de separación. */}
      <div className="mt-7 flex items-start gap-4 md:mt-8 md:items-center">
        <svg className="mt-1.5 h-3 w-16 shrink-0 md:mt-0 md:w-28" viewBox="0 0 112 12" fill="none" aria-hidden>
          <path
            d="M2 8 Q 14 2, 28 7 T 56 7 T 84 7 T 110 5"
            stroke={CYAN}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="max-w-md text-[0.8rem] font-semibold uppercase leading-snug md:text-sm" style={{ color: NAVY }}>
          {tr(locale, "Diseñamos experiencias musicales que conectan marcas, artistas y personas.")}
        </p>
      </div>
    </div>
  );
}
