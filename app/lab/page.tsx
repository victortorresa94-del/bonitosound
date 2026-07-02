import type { Metadata } from "next";
import Image from "next/image";
import { Section, Cta } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
} from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lab — Artiverse y Giraverse",
  description:
    "El software que el sector cultural no tiene. Artiverse conecta agencias, programadores y promotores. Giraverse ordena la circulación de giras.",
  alternates: { canonical: `${site.url}/lab` },
};

export default function Lab() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap grid items-center gap-10 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">Lab</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              El sector mueve carreras por WhatsApp. Nos parece flipante.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Cientos de millones moviéndose con Excel, WhatsApp y favores. No
              esperamos a que alguien lo arregle. Lo construimos.
            </RevealOnScroll>
          </div>
          {(() => {
            const img = findAsset("heroes", "lab");
            return img ? (
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-subtle">
                <ParallaxLayer speed={0.2} className="absolute inset-0">
                  <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover scale-110" />
                </ParallaxLayer>
              </div>
            ) : null;
          })()}
        </div>
      </section>

      <Section>
        <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col">
            <p className="eyebrow">En marcha</p>
            <h2 className="display mt-3 text-3xl">Artiverse</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              Plataforma B2B que conecta agencias, programadores y promotores.
              El sitio donde el sector deja de trabajar a ciegas.
            </p>
            <div className="mt-6 flex gap-3">
              <MagneticButton strength={0.25}>
                <Cta href="/lab/artiverse" variant="ghost">
                  Qué es →
                </Cta>
              </MagneticButton>
              <MagneticButton strength={0.35}>
                <Cta href={site.external.artiverse}>Ir a Artiverse →</Cta>
              </MagneticButton>
            </div>
          </div>

          <div className="card flex flex-col">
            <p className="eyebrow">En desarrollo</p>
            <h2 className="display mt-3 text-3xl">Giraverse</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              La circulación de giras, ordenada. Nacional e internacional. Lo
              que ahora se resuelve a base de llamadas y suerte.
            </p>
            <div className="mt-6">
              <MagneticButton strength={0.25}>
                <Cta href="/lab/giraverse" variant="ghost">
                  Avísame cuando esté →
                </Cta>
              </MagneticButton>
            </div>
          </div>
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Por qué construimos software</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Porque entender el sistema entero también significa darle herramientas.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-5 max-w-2xl text-text-secondary" delay={0.2}>
          Bonito no es una agencia con un departamento de tecnología. Es un
          ecosistema donde el software es otra vertical: la que conecta a las
          demás y al resto de la industria.
        </RevealOnScroll>
      </Section>
    </>
  );
}
