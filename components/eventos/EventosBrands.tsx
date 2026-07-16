import type { Evento } from "@/lib/content";

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
          Cuántos hemos montado, marca por marca.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {marcas.map((e) => (
            <div key={e.slug} className="border-t-2 pt-3" style={{ borderColor: NAVY }}>
              <p className="font-round text-lg font-bold leading-tight md:text-xl" style={{ color: NAVY }}>
                {e.brand}
              </p>
              <p className="mt-1 text-sm font-bold" style={{ color: e.count ? CYAN : "rgba(20,40,60,0.45)" }}>
                {e.count ?? "Evento de marca"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
