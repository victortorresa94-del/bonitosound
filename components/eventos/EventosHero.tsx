/**
 * Hero + Stats de /eventos — layout roto/asimétrico a propósito (mockup
 * validado). Crema dominante, cyan de acento, navy para texto. "EVENTOS"
 * gigante en outline sangrando por el borde derecho, onda cyan cruzando en
 * diagonal (SVG), y stats 106/58/53 en ruta diagonal conectados por una
 * línea fina dibujada, NO en columnas.
 *
 * Colores hardcodeados a propósito: esta página va en crema aunque el resto
 * del sitio ya no lo use.
 */
const CREAM = "#FBFAF6";
const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function EventosHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: CREAM, color: NAVY }}
    >
      {/* ---- HERO: título gigante sangrando + onda + descripción ---- */}
      <div className="relative px-5 pb-6 pt-10 md:px-10 md:pb-10 md:pt-16">
        {/* Descripción arriba a la derecha */}
        <div className="relative z-10 ml-auto mb-4 max-w-[15rem] text-right md:mb-8 md:max-w-xs">
          <p className="text-[0.82rem] font-semibold uppercase leading-snug tracking-[0.04em] md:text-sm">
            Diseñamos experiencias musicales que conectan marcas, artistas y
            personas.
          </p>
          {/* Garabato cyan bajo la descripción */}
          <svg
            className="ml-auto mt-3 h-3 w-24"
            viewBox="0 0 96 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 8 Q 14 2, 26 8 T 50 8 T 74 8 T 94 6"
              stroke={CYAN}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Título EVENTOS gigante en outline, sangrando por la derecha */}
        <div className="pointer-events-none relative mt-1 md:mt-2">
          <h1
            aria-label="Eventos"
            className="select-none whitespace-nowrap font-body font-black leading-[0.8]"
            style={{
              fontSize: "clamp(5.5rem, 21vw, 20rem)",
              letterSpacing: "-0.02em",
              color: "transparent",
              WebkitTextStroke: `clamp(1.5px, 0.32vw, 4px) ${NAVY}`,
              // sangra por la derecha del viewport
              marginRight: "-8vw",
              marginLeft: "-1vw",
            }}
          >
            EVENTOS
          </h1>

          {/* Onda cyan cruzando el título en diagonal */}
          <svg
            className="absolute inset-x-0 top-1/2 -z-0 h-[42%] w-[112%] -translate-y-1/2"
            viewBox="0 0 1200 160"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M-20 120 C 180 20, 360 20, 560 90 S 940 180, 1220 40"
              stroke={CYAN}
              strokeWidth="14"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* ---- STATS: 106 / 58 / 53 en ruta diagonal ---- */}
      <div className="relative mx-auto min-h-[440px] max-w-6xl px-5 pb-20 pt-2 md:min-h-[520px] md:px-10 md:pb-28">
        {/* Línea fina dibujada que conecta los números */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 800 560"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <path
            d="M175 90 C 235 150, 205 205, 250 240 C 300 280, 330 300, 300 360 C 275 410, 200 420, 235 500"
            stroke={CYAN}
            strokeWidth="2"
            strokeDasharray="1 0"
            strokeLinecap="round"
          />
          <circle cx="255" cy="118" r="6" fill="none" stroke={CYAN} strokeWidth="2" />
          <circle cx="238" cy="235" r="6" fill="none" stroke={CYAN} strokeWidth="2" />
          <circle cx="150" cy="360" r="6" fill="none" stroke={CYAN} strokeWidth="2" />
          {/* X final */}
          <path d="M228 496 l16 16 M244 496 l-16 16" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* 106 — arriba izquierda, el más grande */}
        <div className="absolute left-[2%] top-[6%] md:left-[8%]">
          <p className="font-body font-black leading-none" style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: NAVY }}>
            106
          </p>
          <p className="mt-2 text-xs font-bold uppercase leading-tight tracking-wide md:text-sm">
            Eventos<br />realizados
          </p>
        </div>

        {/* 58 — centro, tamaño medio */}
        <div className="absolute left-[28%] top-[40%] md:left-[34%]">
          <p className="font-body font-black leading-none" style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)", color: NAVY }}>
            58
          </p>
          <p className="mt-2 text-xs font-bold uppercase leading-tight tracking-wide md:text-sm">
            Marcas<br />que han confiado
          </p>
        </div>

        {/* 53 — abajo izquierda, el más pequeño */}
        <div className="absolute left-[3%] top-[74%] md:left-[6%]">
          <p className="font-body font-black leading-none" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: NAVY }}>
            53
          </p>
          <p className="mt-2 text-xs font-bold uppercase leading-tight tracking-wide md:text-sm">
            Artistas con los que<br />hemos colaborado
          </p>
        </div>
      </div>
    </section>
  );
}
