import Link from "next/link";
import { findLogo } from "@/lib/assets";

const CREAM = "#FBFAF6";
const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Cierre de /eventos (mockup): franja navy en diagonal con la frase grande,
 * fila de logos de marca, y CTA final en blob cyan fuera de eje.
 */
export function EventosOutro({ brands }: { brands: readonly string[] }) {
  // Set curado tipo mockup; findLogo cae a null si falta el archivo.
  const preferred = ["Ballantine's", "Schweppes", "Pepsico", "Pernod Ricard"];
  const logos = preferred
    .map((name) => ({ name, src: findLogo("marcas", name) }))
    .filter((b): b is { name: string; src: string } => Boolean(b.src));

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: CREAM }}>
      {/* Franja navy en diagonal con la frase */}
      <div
        className="relative px-5 py-16 md:px-10 md:py-24"
        style={{
          backgroundColor: NAVY,
          clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)",
        }}
      >
        <p
          className="mx-auto max-w-5xl text-center font-round font-bold leading-[1.05] text-white"
          style={{ fontSize: "clamp(1.7rem, 5vw, 3.6rem)" }}
        >
          <span style={{ color: CYAN }}>“No organizamos eventos.</span>
          <br />
          Creamos momentos que suenan.”
        </p>
      </div>

      {/* Logos de marca + blob CTA fuera de eje */}
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-12 md:px-10 md:pb-28 md:pt-16">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: NAVY, opacity: 0.55 }}>
          Marcas que han confiado
        </p>
        {/* Fila de logos, no centrada perfecta. <img> plano: next/image
            fallaba con estos SVG/logos en este contexto. */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6 md:gap-x-16">
          {logos.map((b) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={b.name}
              src={b.src}
              alt={b.name}
              className="h-9 w-auto object-contain opacity-90 md:h-11"
            />
          ))}
        </div>

        {/* Estrella/garabato decorativo cyan + CTA blob, misma fila en desktop */}
        <div className="mt-10 flex items-end justify-between gap-6 md:mt-8">
          <div>
            <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none" aria-hidden>
              <path d="M20 3 L23 16 L36 12 L25 21 L33 32 L20 26 L7 32 L15 21 L4 12 L17 16 Z" stroke={CYAN} strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wide" style={{ color: NAVY }}>
              ¿Tienes algo en mente?<br />Cuéntanoslo.
            </p>
          </div>
          {/* Blob CTA fuera de eje */}
          <div
            className="relative px-10 py-12 text-center md:px-16 md:py-14"
            style={{
              backgroundColor: CYAN,
              borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
            }}
          >
            <p className="font-round font-bold leading-none text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              ¿Marca<br />o gira?
            </p>
            <Link
              href="/contacto"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] transition-transform hover:scale-105"
              style={{ color: NAVY }}
            >
              Hablemos →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
