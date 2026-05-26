import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  FaqMotion,
} from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artiverse — La plataforma que conecta al sector",
  description:
    "Artiverse es la plataforma B2B que conecta agencias, programadores y promotores. 200+ usuarios y creciendo.",
  alternates: { canonical: `${site.url}/lab/artiverse` },
};

const faq = [
  {
    q: "¿Qué es Artiverse y por qué nace?",
    a: "Artiverse es una plataforma B2B que conecta agencias, programadores y promotores del sector musical. Nace porque la industria mueve cientos de millones con Excel, WhatsApp y favores: hacía falta una herramienta seria.",
  },
  {
    q: "¿Para quién es Artiverse?",
    a: "Para agencias de booking y management, programadores de salas y festivales, y promotores que necesitan dejar de trabajar a ciegas.",
  },
  {
    q: "¿Artiverse es lo mismo que Bonito Sound?",
    a: "Artiverse es la vertical de software del ecosistema Bonito Sound, con su propia marca e identidad. Bonito lo construye porque entiende el sistema entero del sector.",
  },
];

export default function Artiverse() {
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
            <RevealOnScroll as="p" className="eyebrow mb-4">Lab · Artiverse</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Deja de trabajar a ciegas.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Artiverse conecta agencias, programadores y promotores. 200+
              usuarios usándola ya. La parte del sector que decidió ordenarse.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={site.external.artiverse}>Conocer Artiverse →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Qué resuelve</RevealOnScroll>
        <StaggerGroup stagger={0.08} className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Agencias", "Tu roster y tu disponibilidad, visibles para quien programa."],
            ["Programadores", "Encuentra y cierra sin cadena de favores."],
            ["Promotores", "Una capa común en vez de mil hilos de WhatsApp."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <h3 className="display text-xl">{t}</h3>
              <p className="mt-3 text-sm text-text-secondary">{d}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8 max-w-3xl">
          <FaqMotion items={faq} />
        </div>
      </Section>
    </>
  );
}
