import Link from "next/link";
import { Section } from "@/components/ui";
import { RevealOnScroll, SplitTextReveal, MagneticButton } from "@/components/motion";
import { EventHeroVideo } from "@/components/eventos/EventHeroVideo";

const CYAN = "#16b6d4";

/**
 * Presentación del home, en formato CENTRAL (rompe la dinámica izq/der del
 * resto de escenas): título arriba, el "Vídeo TOP Bonito" en vertical (reel)
 * en el medio, y debajo la prueba (+150 lanzamientos, etc.) + CTA a Nosotros.
 *
 * El vídeo se sirve LOCAL desde /public/video/home/top-bonito.mp4 (formato reel
 * 9:16). Mientras no esté el archivo, EventHeroVideo pinta un fallback navy con
 * el nombre — nunca una caja vacía. En cuanto se sube el .mp4, se ve.
 */
export function PresentacionVideo() {
  return (
    <Section className="bg-bg-primary">
      <div className="mx-auto max-w-2xl text-center">
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Esto es Bonito Sound
        </RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(1.9rem,4.2vw,3rem)]">
          Un minuto y lo ves todo.
        </SplitTextReveal>

        {/* Vídeo vertical (reel) en el centro. */}
        <RevealOnScroll delay={0.15} className="mx-auto mt-10 w-full max-w-[300px] sm:max-w-[330px]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] shadow-xl ring-1 ring-black/5">
            <EventHeroVideo src="/video/home/top-bonito.mp4" label="Bonito Sound" />
          </div>
        </RevealOnScroll>

        {/* Prueba, más pequeño, debajo del vídeo. */}
        <RevealOnScroll as="p" delay={0.2} className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-text-secondary">
          Más de <span className="font-semibold text-text-primary">150 lanzamientos</span> desde 2022,
          artistas, eventos de marca y festival propio. Esto es lo que montamos.
        </RevealOnScroll>

        {/* CTA a Nosotros (antes iba a Instagram). */}
        <RevealOnScroll className="mt-8 flex justify-center" delay={0.3}>
          <MagneticButton strength={0.4}>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-transform duration-200 hover:scale-[1.03]"
              style={{ backgroundColor: CYAN }}
            >
              Conócenos →
            </Link>
          </MagneticButton>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
