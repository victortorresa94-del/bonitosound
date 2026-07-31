import Link from "next/link";
import type { Evento } from "@/lib/content";
import { findLogo, assetSlug } from "@/lib/assets";
import { trustedBy } from "@/lib/site";

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
 * Muro de marcas de /experiencias.
 *
 * Muestra TODAS las marcas con las que hemos trabajado (lib/site.ts), no solo
 * las que tienen relato escrito: antes se caían del muro las que aún no tenían
 * su .md y parecía que hubiéramos trabajado con la mitad.
 *
 * Las que SÍ tienen página son un <Link> —con su número de eventos—; las que
 * todavía no, se quedan como tarjeta muda. En cuanto se escriba su .md se
 * vuelven clicables solas, sin tocar este componente. Mismo criterio que las
 * giras: solo tiene página lo que tiene contenido de verdad.
 */
export function EventosBrands({ eventos }: { eventos: Evento[] }) {
  const conHistoria = new Map(
    eventos.filter((e) => e.type === "marca" && e.brand).map((e) => [e.brand!, e]),
  );

  const todas = trustedBy.find((c) => c.id === "marcas")?.items ?? [];
  if (todas.length === 0) return null;

  // Primero las que tienen página (ordenadas por volumen de eventos), detrás
  // el resto: lo que se puede visitar va delante.
  const marcas = [...todas]
    .map((name) => ({ name, evento: conHistoria.get(name) }))
    .sort((a, b) => {
      if (!!a.evento !== !!b.evento) return a.evento ? -1 : 1;
      return num(b.evento?.count) - num(a.evento?.count);
    });

  return (
    <section className="w-full" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 md:px-10 md:pb-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
          Marcas que han confiado
        </p>
        <h2 className="display leading-[1.04] text-[clamp(2rem,5vw,3.6rem)]" style={{ color: NAVY }}>
          Marcas que han querido <span style={{ color: CYAN }}>hacerlo bonito.</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {marcas.map(({ name, evento }) => {
            const logo = findLogo("marcas", name);
            const c = splitCount(evento?.count);

            const contenido = (
              <>
                {/* Logo de la marca (o su nombre en display si aún no hay logo). */}
                <div className="flex h-9 items-center md:h-10">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-9 w-auto max-w-[75%] object-contain object-left md:max-h-10"
                    />
                  ) : (
                    <p className="display text-lg leading-tight md:text-xl" style={{ color: NAVY }}>
                      {name}
                    </p>
                  )}
                </div>

                {c ? (
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span
                      className="font-round font-bold leading-none"
                      style={{ color: CYAN, fontSize: "clamp(1.9rem,3.2vw,2.6rem)" }}
                    >
                      {c.n}
                    </span>
                    <span className="text-sm font-medium text-text-secondary">{c.unit}</span>
                  </p>
                ) : (
                  <p className="mt-3 text-sm font-medium italic text-text-muted">
                    {evento ? "Evento de marca" : "Han confiado en nosotros"}
                  </p>
                )}

                {logo && (
                  <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-text-muted">
                    {name}
                  </p>
                )}

                {evento && (
                  <span
                    className="mt-2 inline-block text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: CYAN }}
                  >
                    Ver la experiencia →
                  </span>
                )}
              </>
            );

            const clases = "border-t pt-4";
            const borde = { borderColor: "rgba(20,40,60,0.16)" };

            // Solo es enlace si de verdad hay una página que visitar.
            return evento ? (
              <Link
                key={name}
                href={`/experiencias/${assetSlug(name)}`}
                className={`group ${clases}`}
                style={borde}
              >
                {contenido}
              </Link>
            ) : (
              <div key={name} className={clases} style={borde}>
                {contenido}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
