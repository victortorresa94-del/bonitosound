import type { Metadata } from "next";
import { Section, Cta } from "@/components/ui";
import { RevealOnScroll, SplitTextReveal, MagneticButton } from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diario",
  description:
    "Noticias y publicaciones de Bonito Sound: nuevos artistas, lanzamientos y presencia en eventos.",
  alternates: { canonical: `${site.url}/diario` },
  // Página vacía: no indexar hasta que tenga ≥1 entrada real.
  robots: { index: false, follow: true },
};

export default function Diario() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Diario</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Lo que va pasando, sin postureo.
            </SplitTextReveal>
          </div>
        </div>
      </section>

      <Section>
        <div className="rounded-3xl border border-subtle bg-bg-secondary p-12 text-center">
          <SplitTextReveal as="h3" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            Todavía no hemos escrito nada aquí.
          </SplitTextReveal>
          <RevealOnScroll as="p" className="mx-auto mt-4 max-w-lg text-text-secondary" delay={0.2}>
            El diario se llena cuando hay algo que contar de verdad: un fichaje,
            un lanzamiento, un evento. No para rellenar. Mientras tanto, lo que
            se cuece está en Instagram.
          </RevealOnScroll>
          <RevealOnScroll className="mt-8 flex justify-center" delay={0.35}>
            <MagneticButton strength={0.35}>
              <Cta href={site.social.instagram}>Ver @bonito_sound →</Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </Section>
    </>
  );
}
