import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion";
import { findAsset, findLogo } from "@/lib/assets";
import type { Gira } from "@/lib/giras";
import { localePath } from "@/lib/i18n";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";


const NAVY = "#14283C";
const CYAN = "#16b6d4";

/** Cinta adhesiva de la polaroid (beige translúcido, girada). */
function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 top-0 h-6 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[2px] ${className}`}
      style={{ backgroundColor: "rgba(214,199,166,0.75)" }}
    />
  );
}

/** Tarjeta-polaroid de una gira. Foto si existe; si no, fallback navy.
 *  Si la gira tiene página de detalle (`href`), la tarjeta es un enlace. */
function GiraCard({ g, tilt, href }: { g: Gira; tilt: number; href?: string }) {
  // Foto por prioridad: la de ESA gira → la del artista en el roster → la de
  // su ficha de trayectoria. Así casi todas las tarjetas llevan cara aunque no
  // tengamos foto específica de la gira.
  const photo =
    findAsset("giras", g.slug) ??
    findLogo("artistas", g.artist) ??
    findLogo("artistas-dani", g.artist);
  const Tag = (href ? Link : "div") as React.ElementType;

  return (
    <Tag
      {...(href ? { href } : {})}
      className={`relative block w-full max-w-[19rem] bg-white p-3 pb-4 shadow-[0_10px_30px_rgba(20,40,60,0.13)] transition-transform duration-300 hover:!rotate-0 hover:scale-[1.03] ${
        href ? "cursor-pointer" : ""
      }`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <Tape />
      <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ backgroundColor: NAVY }}>
        {photo ? (
          <Image
            src={photo}
            alt={`${g.artist} — ${g.tour}`}
            fill
            sizes="(max-width: 768px) 80vw, 300px"
            className="object-cover"
          />
        ) : (
          // Fallback con carácter mientras no haya foto de la gira.
          <div className="absolute inset-0 grid place-items-center px-4 text-center">
            <div>
              <span
                className="font-round text-3xl font-bold leading-none text-white/90"
                aria-hidden
              >
                {g.artist
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                {g.year}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-1 pt-3 text-center">
        <h3 className="display text-[1.35rem] leading-tight" style={{ color: NAVY }}>
          {g.artist}
        </h3>
        <p className="mt-0.5 text-sm italic text-text-secondary">{g.tour}</p>
        {(g.shows || g.years) && (
          <p className="mt-1.5 font-mono text-[0.68rem] tabular-nums text-text-muted">
            {[g.years ?? g.year, g.shows].filter(Boolean).join(" · ")}
          </p>
        )}
        {/* Autoría de la foto, cuando la tiene (crédito a quien la hizo). */}
        {g.credit && photo && (
          <p className="mt-1 text-[0.6rem] text-text-muted/70">© {g.credit}</p>
        )}
        {href && (
          <p className="mt-2 text-[0.68rem] font-bold" style={{ color: CYAN }}>
            {tr(serverLocale(), "Ver la gira →")}
          </p>
        )}
      </div>
    </Tag>
  );
}

/**
 * "La ruta": las giras colgando de una carretera cian que serpentea.
 *
 * - Escritorio: la carretera baja por el centro y las tarjetas se alternan
 *   izquierda/derecha, rotadas como polaroids pegadas, con el año en marca de
 *   agua gigante por fuera.
 * - Móvil: la ruta se endereza a la izquierda y las tarjetas van en columna
 *   (mismo concepto, legible en pantalla pequeña).
 */
export function GirasRuta({
  giras,
  conPagina = [],
}: {
  giras: Gira[];
  /** Slugs que tienen página de detalle (los que tienen .md en content/giras). */
  conPagina?: string[];
}) {
  const locale = serverLocale();
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="wrap">
        <RevealOnScroll as="p" className="eyebrow mb-3">
          {tr(locale, "Lo que hemos llevado")}
        </RevealOnScroll>
        <RevealOnScroll
          as="h2"
          delay={0.05}
          className="display text-[clamp(2.2rem,6vw,4.2rem)] leading-[1] text-[#14283C]"
        >
          {tr(serverLocale(), "Giras Bonitas.")}
        </RevealOnScroll>
      </div>

      <div className="relative mx-auto mt-12 max-w-5xl px-5 md:mt-16 md:px-10">
        {/* --- La carretera --- */}
        {/* Móvil: recta a la izquierda. Escritorio: serpentea por el centro. */}
        <svg
          className="pointer-events-none absolute left-[26px] top-0 h-full w-4 md:left-1/2 md:w-24 md:-translate-x-1/2"
          viewBox="0 0 100 1000"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          {/* Una curva por cada PAREJA de tarjetas: así serpentea de verdad
              aunque el bloque mida varios miles de píxeles. */}
          <path
            d="M50 0 C90 25,10 75,50 100 C90 125,10 175,50 200 C90 225,10 275,50 300 C90 325,10 375,50 400 C90 425,10 475,50 500 C90 525,10 575,50 600 C90 625,10 675,50 700 C90 725,10 775,50 800 C90 825,10 875,50 900 C90 925,10 975,50 1000"
            stroke={CYAN}
            strokeWidth="5"
            strokeLinecap="round"
            className="hidden md:block"
          />
          <path
            d="M50 0 V1000"
            stroke={CYAN}
            strokeWidth="7"
            strokeLinecap="round"
            className="md:hidden"
          />
        </svg>

        {/* --- Paradas de la ruta ---
            Las tarjetas se INTERCALAN en vertical (margen negativo en
            escritorio) para que el zigzag quede apretado como en el mockup y
            la página no se haga eterna. En móvil van en columna. */}
        <ol className="relative space-y-10 md:space-y-0">
          {giras.map((g, i) => {
            const right = i % 2 === 1;
            const tilt = right ? 2.2 : -2.2;

            const year = (
              <span
                aria-hidden
                className="hidden shrink-0 select-none font-round font-bold leading-none md:block"
                style={{ fontSize: "clamp(3.5rem,6.5vw,6rem)", color: "rgba(20,40,60,0.10)" }}
              >
                {g.year}
              </span>
            );
            const href = conPagina.includes(g.slug)
              ? localePath(`/giras/${g.slug}`, serverLocale())
              : undefined;
            const card = <GiraCard g={g} tilt={tilt} href={href} />;

            return (
              <li
                key={g.slug}
                className={`relative ${i > 0 ? "md:-mt-[11rem]" : ""}`}
              >
                <RevealOnScroll delay={0.05}>
                  <div
                    className={`relative flex items-center gap-4 pl-16 md:w-1/2 md:gap-6 md:pl-0 ${
                      right ? "md:ml-auto md:justify-start md:pl-14" : "md:justify-end md:pr-14"
                    }`}
                  >
                    {/* Punto cian que engancha la tarjeta a la carretera. */}
                    <span
                      aria-hidden
                      className={`absolute top-1/2 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full ${
                        right ? "left-[-7px]" : "left-[-7px] md:left-auto md:right-[-7px]"
                      }`}
                      style={{ backgroundColor: CYAN, boxShadow: "0 0 0 4px #FBFAF6" }}
                    />

                    {/* Año SIEMPRE por fuera (nunca tapado por la tarjeta). */}
                    {right ? (
                      <>
                        {card}
                        {year}
                      </>
                    ) : (
                      <>
                        {year}
                        {card}
                      </>
                    )}
                  </div>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
