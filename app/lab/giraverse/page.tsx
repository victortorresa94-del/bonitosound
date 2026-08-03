import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  SplitTextReveal,
  MagneticButton,
  FaqMotion,
} from "@/components/motion";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return {
  title: "Giraverse — La circulación de giras, ordenada",
  description:
    "Giraverse: plataforma en desarrollo para gestionar la circulación de giras a nivel nacional e internacional.",
  alternates: alternatesFor(`/lab/giraverse`),
  };
}

const faq = [
  {
    q: "¿Qué problema resuelve Giraverse?",
    a: "Hoy la circulación de una gira se monta a base de llamadas, hojas de cálculo y suerte. Giraverse ordena ese proceso a nivel nacional e internacional: rutas, fechas, disponibilidades y encaje entre giras y plazas.",
  },
  {
    q: "¿Cuándo estará disponible Giraverse?",
    a: "Está en desarrollo. Si nos dejas tu email te avisamos cuando esté listo, sin spam de por medio.",
  },
];

export default function Giraverse() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Lab · Giraverse · En desarrollo</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Las giras dejan de montarse a mano.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Circulación de giras nacional e internacional, ordenada. Lo que
              ahora resuelven cien llamadas y una hoja de cálculo compartida.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta
                  href={`mailto:${site.emails.general}?subject=${encodeURIComponent(
                    "Avísame cuando esté Giraverse",
                  )}`}
                >
                  Avísame cuando esté listo →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8 max-w-3xl">
          <FaqMotion items={faq} />
        </div>
      </Section>
    </>
  );
}
