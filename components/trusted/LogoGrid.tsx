import { resolveLogos } from "@/lib/assets";

/**
 * Rejilla de logos para listas largas (hasta ~40 por categoría).
 *
 * Decisiones tomadas a propósito:
 *  - **Chip blanco** siempre: con logos de 110 procedencias distintas (PNG con
 *    alfa, JPG con fondo, escudos a color) es el único tratamiento que no
 *    revienta. Nada de filtro de silueta aquí — ese requiere transparencia y
 *    convierte un JPG en un rectángulo blanco.
 *  - **`<img loading="lazy">` en vez de `next/image`**: son ~110 logos de pocos
 *    KB bajo el pliegue; la optimización aporta poco y cuesta transformaciones.
 *    Mismo criterio que components/eventos/EventosBrands.tsx.
 *  - **El nombre va SIEMPRE debajo**, no dentro del chip: un escudo municipal a
 *    40px es ilegible, y el nombre es el dato que importa.
 *  - Sin fichero → chip con el nombre. La rejilla funciona antes de subir nada.
 */
export function LogoGrid({
  dir,
  items,
  layout = "wide",
}: {
  dir: string;
  items: readonly string[];
  /** "shield" = escudos (celda cuadrada); "wide" = logotipos apaisados. */
  layout?: "wide" | "shield";
}) {
  const logos = resolveLogos(dir, items);
  if (logos.length === 0) return null;

  const cell = layout === "shield" ? "aspect-square" : "h-20";
  const img = layout === "shield" ? "max-h-14" : "max-h-10";

  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {logos.map((l) => (
        <li key={`${dir}-${l.slug}`} className="text-center">
          <div
            className={`flex ${cell} items-center justify-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5`}
          >
            {l.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={l.src}
                alt={l.name}
                loading="lazy"
                decoding="async"
                className={`${img} w-auto max-w-full object-contain`}
              />
            ) : (
              <span className="px-1 text-[0.7rem] font-semibold leading-tight text-text-secondary">
                {l.name}
              </span>
            )}
          </div>
          <p className="mt-2 text-[0.68rem] leading-snug text-text-muted">{l.name}</p>
        </li>
      ))}
    </ul>
  );
}
