import { Section, Cta } from "@/components/ui";
import { RevealOnScroll, SplitTextReveal, MagneticButton } from "@/components/motion";
import { R2Video } from "@/components/R2Video";
import { site } from "@/lib/site";

/**
 * Bloque de presentación del home: el vídeo "resumen Bonito" (lanzamientos /
 * qué hacemos) reproduciéndose en grande. Sustituye al antiguo reel de IG,
 * que se movió a la página Nosotros.
 */
export function PresentacionVideo() {
  return (
    <Section className="bg-bg-primary">
      <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        <div className="max-w-xl">
          <RevealOnScroll as="p" className="eyebrow mb-4">
            Esto es Bonito Sound
          </RevealOnScroll>
          <SplitTextReveal
            as="h2"
            split="lines"
            className="display text-[clamp(2rem,4.5vw,3.4rem)]"
          >
            Míranos un minuto. Luego hablamos.
          </SplitTextReveal>
          <RevealOnScroll as="p" className="mt-6 text-lg text-text-secondary" delay={0.2}>
            Más de 150 lanzamientos desde 2022, artistas, eventos de marca y
            festival propio. Esto es lo que montamos — en un vídeo.
          </RevealOnScroll>
          <RevealOnScroll className="mt-8" delay={0.35}>
            <MagneticButton strength={0.35}>
              <Cta href={site.social.instagram} external>
                Síguenos en Instagram →
              </Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
        <RevealOnScroll delay={0.15}>
          <R2Video src="resumen-bonito.mp4" ratio="16 / 9" start={3} />
        </RevealOnScroll>
      </div>
    </Section>
  );
}
