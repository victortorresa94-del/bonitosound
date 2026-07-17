import type { Evento } from "@/lib/content";
import { EventoCard } from "@/components/EventoCard";
import { tourArtists } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Eventos de ARTISTA / giras (Albert Pla, Anne Lukin, Alfred García…): tour
 * management y directos, aparte de las activaciones de marca. Muestra los
 * eventos de tipo gira/showcase con artista + los grandes nombres que hemos
 * movido de gira.
 */
export function EventosGiras({ eventos }: { eventos: Evento[] }) {
  const giras = eventos.filter(
    (e) => e.type === "gira" || (e.type === "showcase" && e.artist)
  );

  return (
    <section className="w-full" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-24">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
          Giras y directos de artista
        </p>
        <h2 className="mb-8 font-round text-3xl font-bold md:text-5xl" style={{ color: NAVY }}>
          También llenamos giras.
        </h2>

        {giras.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giras.map((e) => (
              <EventoCard key={e.slug} evento={e} />
            ))}
          </div>
        )}

        {tourArtists.length > 0 && (
          <div className="mt-12 border-t border-subtle pt-8">
            <p className="mb-4 text-sm text-text-muted">
              Hemos producido y movido giras de:
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-round text-lg font-semibold md:text-xl" style={{ color: NAVY }}>
              {tourArtists.map((name, i) => (
                <span key={name} className="whitespace-nowrap">
                  {i > 0 && <span className="mr-6" style={{ color: CYAN }}>·</span>}
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
