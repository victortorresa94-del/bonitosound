import { Section, Cta } from "@/components/ui";
import { RevealOnScroll, SplitTextReveal, MagneticButton } from "@/components/motion";
import { InstagramReel } from "@/components/Embeds";
import { site } from "@/lib/site";

const REEL_URL = "https://www.instagram.com/reel/DCOfx1YKHsP/";

/**
 * Bloque de presentación: el reel de marca + empujón a Instagram.
 * Objetivo claro: presentar Bonito Sound y que la gente se vaya al perfil.
 */
export function PresentacionReel() {
  return (
    <Section className="bg-bg-primary">
      <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
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
            Nuestra presentación, en vídeo. Si te encaja lo que ves, el día a día
            lo contamos en Instagram — ahí está lo que montamos, semana a semana.
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
          <InstagramReel url={REEL_URL} title="Presentación de Bonito Sound" />
        </RevealOnScroll>
      </div>
    </Section>
  );
}
