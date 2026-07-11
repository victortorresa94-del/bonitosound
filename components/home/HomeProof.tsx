import { Section } from "@/components/ui";
import { RevealOnScroll, MarqueeLogoWall } from "@/components/motion";
import { brands, tourArtists } from "@/lib/site";

/**
 * Banda de prueba social de la home. Va justo después del hero: nombres y logos
 * reales generan confianza antes de que el visitante lea nada (Cialdini, prueba
 * social — ver knowledge/conversion-psychology.md).
 *
 * - Artistas de gira: texto (no todos tienen logo). Ya se nombran en la escena
 *   "giras", así que aquí no se sobre-afirma; solo se listan.
 * - Marcas: marquee de logos (con fallback tipográfico si falta el logo).
 * Copy calibrado con la skill bonito-voz: sobrio, sin superlativos.
 */
export function HomeProof() {
  return (
    <Section className="bg-bg-secondary py-16 md:py-20">
      <RevealOnScroll as="p" className="eyebrow mb-8 text-center">
        Giras que hemos llenado y marcas que han sonado con nosotros
      </RevealOnScroll>

      <RevealOnScroll className="mx-auto mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {tourArtists.map((name) => (
          <span
            key={name}
            className="font-display text-lg text-text-secondary md:text-xl"
          >
            {name}
          </span>
        ))}
      </RevealOnScroll>

      <RevealOnScroll>
        <MarqueeLogoWall items={brands} dir="marcas" speed={40} />
      </RevealOnScroll>
    </Section>
  );
}
