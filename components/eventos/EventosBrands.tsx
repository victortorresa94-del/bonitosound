import type { Evento } from "@/lib/content";
import { findLogo } from "@/lib/assets";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/** Extrae el número de un count tipo "+80 eventos" para ordenar. */
function num(count?: string) {
  const m = count?.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

/** "+80 eventos" -> { n: "+80", unit: "eventos" } para pintarlos con
 *  tipografías distintas (número en Fredoka, unidad en Geist). */
function splitCount(count?: string) {
  if (!count) return null;
  const m = count.match(/^\s*([+~]?\d[\d.]*)\s*(.*)$/);
  return m ? { n: m[1], unit: m[2] || "eventos" } : { n: count, unit: "" };
}

/**
 * Muro de marcas: todas las marcas con las que hemos trabajado y cuántos
 * eventos hemos hecho de cada una (dato de los títulos de los vídeos).
 */
export function EventosBrands({ eventos }: { eventos: Evento[] }) {
  const marcas = eventos
    .filter((e) => e.type === "marca" && e.brand)
    .sort((a, b) => num(b.count) - num(a.count));

  if (marcas.length === 0) return null;

  return (
    <section className="w-full" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 md:px-10 md:pb-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
          Marcas que han confiado
        </p>
        {/* Título en Zilla Slab (display) con corte de color — rompe el
            "todo Fredoka bold". El "hacerlo bonito" siempre en cian. */}
        <h2 className="display leading-[1.04] text-[clamp(2rem,5vw,3.6rem)]" style={{ color: NAVY }}>
          Marcas que han querido <span style={{ color: CYAN }}>hacerlo bonito.</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {marcas.map((e) => {
            const logo = e.brand ? findLogo("marcas", e.brand) : null;
            const c = splitCount(e.count);
            return (
              <div key={e.slug} className="border-t pt-4" style={{ borderColor: "rgba(20,40,60,0.16)" }}>
                {/* Logo de la marca (o su nombre en display si aún no hay logo). */}
                <div className="flex h-9 items-center md:h-10">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={e.brand}
                      className="max-h-9 w-auto max-w-[75%] object-contain object-left md:max-h-10"
                    />
                  ) : (
                    <p className="display text-lg leading-tight md:text-xl" style={{ color: NAVY }}>
                      {e.brand}
                    </p>
                  )}
                </div>
                {/* Número protagonista en Fredoka (ahí sí luce el redondeo);
                    la unidad "eventos" en Geist normal, más pequeña. */}
                {c ? (
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="font-round font-bold leading-none" style={{ color: CYAN, fontSize: "clamp(1.9rem,3.2vw,2.6rem)" }}>
                      {c.n}
                    </span>
                    <span className="text-sm font-medium text-text-secondary">{c.unit}</span>
                  </p>
                ) : (
                  <p className="mt-3 text-sm font-medium italic text-text-muted">Evento de marca</p>
                )}
                {/* Nombre pequeño de apoyo cuando hay logo (Geist, secundario). */}
                {logo && (
                  <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    {e.brand}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
