import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
/**
 * Banda superior de /eventos (mockup): título EVENTOS gigante en outline,
 * LIGERAMENTE INCLINADO, con una onda cyan hand-drawn cruzándolo, y la
 * descripción arriba a la derecha con su garabato. Crema dominante.
 */
const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function EventosHero() {
  return (
    <div className="relative px-5 pt-14 md:px-10 md:pt-16">
      {/* EVENTOS gigante, inclinado, en outline + onda cyan cruzando */}
      <div className="pointer-events-none relative">
        <h1
          aria-label="Experiencias"
          className="select-none whitespace-nowrap font-round font-bold leading-[0.82]"
          style={{
            fontSize: "clamp(2.6rem, 12.5vw, 11rem)",
            letterSpacing: "-0.015em",
            color: "transparent",
            WebkitTextStroke: `clamp(1.5px, 0.3vw, 3.5px) ${NAVY}`,
            transform: "rotate(-3deg)",
            transformOrigin: "left center",
            marginLeft: "-0.5vw",
          }}
        >
          EXPERIENCIAS
        </h1>

        {/* Onda cyan hand-drawn cruzando el título, con caída a la derecha */}
        <svg
          className="absolute left-0 top-1/2 h-[46%] w-full -translate-y-[46%]"
          viewBox="0 0 1200 180"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M-30 110 C 140 40, 320 40, 500 96 C 640 138, 720 150, 840 96 C 960 44, 1080 60, 1230 128"
            stroke={CYAN}
            strokeWidth="15"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Descripción a la derecha, bajo el título (no la solapa) */}
      <div className="ml-auto mt-2 max-w-[15rem] md:-mt-2 md:max-w-[17rem]">
        <p className="text-[0.8rem] font-semibold uppercase leading-snug tracking-[0.03em] md:text-sm" style={{ color: NAVY }}>
          {tr(serverLocale(), "Diseñamos experiencias musicales que conectan marcas, artistas y personas.")}
        </p>
        <svg className="mt-2 h-3 w-24" viewBox="0 0 96 12" fill="none" aria-hidden>
          <path d="M2 8 Q 12 2, 24 7 T 48 7 T 72 7 T 94 5" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
