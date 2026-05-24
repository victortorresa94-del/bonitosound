import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Giraverse — La circulación de giras, ordenada",
  description:
    "Giraverse: plataforma en desarrollo para gestionar la circulación de giras a nivel nacional e internacional.",
  alternates: { canonical: `${site.url}/lab/giraverse` },
};

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
          <div className="stagger max-w-3xl">
            <Eyebrow>Lab · Giraverse · En desarrollo</Eyebrow>
            <Heading as="h1">Las giras dejan de montarse a mano.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Circulación de giras nacional e internacional, ordenada. Lo que
              ahora resuelven cien llamadas y una hoja de cálculo compartida.
            </p>
            <div className="mt-9">
              <Cta
                href={`mailto:${site.emails.general}?subject=${encodeURIComponent(
                  "Avísame cuando esté Giraverse",
                )}`}
              >
                Avísame cuando esté listo →
              </Cta>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <div className="mt-8 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>
    </>
  );
}
