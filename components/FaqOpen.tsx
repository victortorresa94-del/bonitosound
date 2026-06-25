type FaqOpenProps = {
  items: { q: string; a: string }[];
};

/**
 * Variante de FAQ con todas las respuestas visibles a la vez, en
 * bloque editorial. Para preguntas que se merecen estar en el cuerpo
 * del documento, no escondidas en un acordeón — mejor SEO/AIO y
 * más densidad real de contenido en la página.
 *
 * Para FAQs largas o secundarias seguir usando <FaqMotion />.
 */
export function FaqOpen({ items }: FaqOpenProps) {
  return (
    <div className="divide-y divide-subtle border-y border-subtle">
      {items.map((it) => (
        <div
          key={it.q}
          className="grid gap-3 py-8 md:grid-cols-[1fr_2fr] md:gap-10"
        >
          <h3 className="display text-xl leading-tight md:text-2xl">
            {it.q}
          </h3>
          <p className="text-text-secondary md:text-lg">{it.a}</p>
        </div>
      ))}
    </div>
  );
}
