import { RevealOnScroll } from "@/components/motion";
import { girasStats } from "@/lib/giras";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";


const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Franja navy EN DIAGONAL con los números que convencen a quien contrata:
 * conciertos, giras y artistas. Todo derivado de lib/giras.ts (nada inventado).
 */
export function GirasNumeros() {
  const locale = serverLocale();
  const items = [
    { n: `+${girasStats.conciertos}`, l: tr(locale, "Conciertos") },
    { n: String(girasStats.giras), l: tr(locale, "Giras") },
    { n: String(girasStats.artistas), l: tr(locale, "Artistas") },
  ];

  return (
    <section
      className="relative px-5 py-16 md:px-10 md:py-24"
      style={{
        backgroundColor: NAVY,
        clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
      }}
    >
      <RevealOnScroll className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-10 sm:flex-row sm:gap-0">
        {items.map((it, i) => (
          <div key={it.l} className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <p
                className="font-round font-bold leading-none"
                style={{ fontSize: "clamp(2.8rem,7vw,4.6rem)", color: CYAN }}
              >
                {it.n}
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white">
                {it.l}
              </p>
            </div>
            {/* Barra separadora inclinada, como en el mockup. */}
            {i < items.length - 1 && (
              <span
                aria-hidden
                className="ml-auto hidden h-16 w-px rotate-[12deg] sm:block"
                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
              />
            )}
          </div>
        ))}
      </RevealOnScroll>
    </section>
  );
}
