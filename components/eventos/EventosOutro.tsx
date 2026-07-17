import Link from "next/link";

const CREAM = "#FBFAF6";
const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Cierre de /eventos (mockup): franja navy en diagonal con la frase, doodles
 * cyan (estrella, flecha, ×, puntos) y CTA en bloque cyan diagonal en la
 * esquina inferior derecha. (Los logos de marca viven ahora en el banner de
 * números "marca por marca", combinados con su cifra.)
 */
export function EventosOutro() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: CREAM }}>
      {/* Franja navy en diagonal con la frase */}
      <div
        className="relative px-5 py-14 md:px-10 md:py-20"
        style={{ backgroundColor: NAVY, clipPath: "polygon(0 14%, 100% 0, 100% 86%, 0 100%)" }}
      >
        <p className="display mx-auto max-w-5xl text-center font-bold leading-[1.02] text-white" style={{ fontSize: "clamp(1.7rem, 5vw, 3.7rem)" }}>
          <span style={{ color: CYAN }}>“</span>No organizamos eventos.
          <br />
          Creamos momentos que suenan bonito.<span style={{ color: CYAN }}>”</span>
        </p>
      </div>

      {/* Zona inferior: doodles + CTA diagonal */}
      <div className="relative mx-auto max-w-6xl px-5 pb-0 pt-12 md:px-10 md:pt-16">
        {/* Doodles cyan sueltos: × y puntos */}
        <svg className="h-24 w-full" viewBox="0 0 900 120" fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
          {/* × */}
          <path d="M470 26 l16 16 M486 26 l-16 16" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
          {/* puntos */}
          <circle cx="430" cy="70" r="4" fill={CYAN} />
          <circle cx="452" cy="86" r="3" fill={CYAN} />
          <circle cx="470" cy="72" r="2.5" fill={CYAN} />
          {/* flecha curva hacia el CTA (der) */}
          <path d="M520 60 C 600 100, 680 96, 740 66" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
          <path d="M740 66 l-18 -2 M740 66 l-8 16" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Estrella + microcopy (abajo izquierda) */}
        <div className="relative z-10 pb-24 md:pb-28">
          <svg className="h-11 w-11" viewBox="0 0 44 44" fill="none" aria-hidden>
            <path d="M22 3 L25 17 L39 13 L27 23 L36 36 L22 28 L8 36 L17 23 L5 13 L19 17 Z" stroke={CYAN} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M8 8 l3 3 M38 6 l-3 3" stroke={CYAN} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide" style={{ color: NAVY }}>
            ¿Tienes algo en mente?<br />Cuéntanoslo.
          </p>
        </div>

        {/* CTA: bloque cyan diagonal en la esquina inferior derecha */}
        <div
          className="absolute bottom-0 right-0 flex w-[72%] flex-col items-start px-6 pb-8 pt-10 sm:w-[52%] md:w-[46%] md:px-12 md:pb-12 md:pt-16"
          style={{ backgroundColor: CYAN, clipPath: "polygon(14% 0, 100% 22%, 100% 100%, 0 100%)" }}
        >
          <p className="pl-6 font-round font-bold uppercase leading-[0.95] md:pl-10" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", color: NAVY }}>
            ¿Marca<br />o gira?
          </p>
          <Link
            href="/contacto"
            className="ml-6 mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-transform hover:scale-105 md:ml-10"
            style={{ color: NAVY }}
          >
            Hablemos →
          </Link>
        </div>
      </div>
    </section>
  );
}
