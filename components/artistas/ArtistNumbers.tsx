import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

type Stat = {
  value: string;
  label: string;
};

/**
 * Prueba social de un vistazo: cifras grandes del artista.
 * Plug-and-play: sin stats, no renderiza nada.
 */
export function ArtistNumbers({ stats }: { stats: Stat[] }) {
  const locale = serverLocale();
  // Descartamos entradas vacías por si llegan a medias desde el contenido.
  const items = (stats ?? []).filter(
    (s) => s?.value?.trim().length && s?.label?.trim().length
  );
  if (items.length === 0) return null;

  // Rejilla según cuántos datos haya: nunca dejamos columnas huérfanas.
  const cols =
    items.length === 1
      ? "grid-cols-1"
      : items.length === 2
        ? "grid-cols-2"
        : items.length === 3
          ? "grid-cols-2 md:grid-cols-3"
          : "grid-cols-2 md:grid-cols-4";

  return (
    <Section id="numeros">
      {/* Eyebrow que además es el titular real del bloque (jerarquía + SEO). */}
      <RevealOnScroll as="h2" className="eyebrow">
        {tr(locale, "En números")}
      </RevealOnScroll>

      {/* <dl>: cada par cifra//etiqueta es una definición, no texto suelto. */}
      <StaggerGroup
        as="dl"
        stagger={0.08}
        className={`mt-10 grid gap-x-6 gap-y-12 ${cols}`}
      >
        {items.map((stat) => (
          <div key={`${stat.value}-${stat.label}`} className="flex flex-col">
            {/* Detalle cian: punto sobre la cifra, el único acento */}
            <span
              aria-hidden="true"
              className="mb-4 block h-1.5 w-1.5 rounded-full bg-[#16b6d4]"
            />
            {/* col-reverse: se lee "etiqueta → cifra", se ve "cifra → etiqueta". */}
            <div className="flex flex-col-reverse">
              <dt className="mt-3 text-sm leading-snug text-text-muted">
                {stat.label}
              </dt>
              <dd className="display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-text-primary">
                {stat.value}
              </dd>
            </div>
          </div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
