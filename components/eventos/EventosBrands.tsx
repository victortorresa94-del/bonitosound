import type { Evento } from "@/lib/content";
import { findLogo } from "@/lib/assets";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/** Extrae el número de un count tipo "+80 eventos" para ordenar. */
function num(count?: string) {
  const m = count?.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
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
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
          Marcas que han confiado
        </p>
        <h2 className="font-round text-3xl font-bold md:text-5xl" style={{ color: NAVY }}>
          Marcas que han querido hacerlo bonito.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {marcas.map((e) => {
            const logo = e.brand ? findLogo("marcas", e.brand) : null;
            return (
              <div key={e.slug} className="border-t-2 pt-4" style={{ borderColor: NAVY }}>
                {/* Logo de la marca (o su nombre si aún no hay logo). */}
                <div className="flex h-9 items-center md:h-10">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={e.brand}
                      className="max-h-9 w-auto max-w-[70%] object-contain object-left md:max-h-10"
                    />
                  ) : (
                    <p className="font-round text-lg font-bold leading-tight md:text-xl" style={{ color: NAVY }}>
                      {e.brand}
                    </p>
                  )}
                </div>
                {/* Número de eventos, protagonista. */}
                <p className="mt-3 font-round text-2xl font-bold leading-none md:text-3xl" style={{ color: e.count ? CYAN : "rgba(20,40,60,0.4)" }}>
                  {e.count ?? "Evento de marca"}
                </p>
                {/* Nombre pequeño de apoyo cuando hay logo (para leerse igual). */}
                {logo && (
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted">
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
