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
import { alternatesFor } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return {
  title: "Artiverse — La app de la programación artística",
  description:
    "Artiverse conecta artistas, promotores, salas y agencias: datos reales de seguidores, streams y presencia por ciudad para programar y cerrar acuerdos.",
  alternates: alternatesFor(`/lab/artiverse`),
  };
}

const faq = [
  {
    q: "¿Qué es Artiverse y por qué nace?",
    a: "Artiverse es la app de la programación artística: una plataforma que conecta artistas, promotores, salas y agencias del sector musical. Nace porque la industria mueve cientos de millones con Excel, WhatsApp y favores: hacía falta una herramienta seria.",
  },
  {
    q: "¿Qué puede hacer un artista en Artiverse?",
    a: "Ver qué promotores visitan su perfil y presentarse con datos que importan: seguidores, streams, presencia por ciudad y país, y próximos conciertos. En vez de mandar un dossier a ciegas, el promotor te encuentra con la información delante.",
  },
  {
    q: "¿Para quién es Artiverse?",
    a: "Para promotores y programadores de sala que planifican su programación con datos, y para agencias y managers que quieren poner su roster delante de quien contrata. Hay usuarios que la usan cada semana para programar su sala.",
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
              La app de la programación artística: artistas, promotores,
              salas y agencias en la misma plataforma, con datos reales en
              vez de corazonadas. La parte del sector que decidió ordenarse.
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
            [
              "Artistas y agencias",
              "Ves qué promotores visitan tu perfil y te presentas con datos: seguidores, streams, presencia por ciudad y próximos bolos.",
            ],
            [
              "Salas y programadores",
              "Planificas la programación con información real, no con cadenas de favores. Hay salas que la usan cada semana.",
            ],
            [
              "Promotores",
              "Encuentras y cierras acuerdos con el sector en una capa común, en vez de mil hilos de WhatsApp.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <h3 className="display text-xl">{t}</h3>
              <p className="mt-3 text-sm text-text-secondary">{d}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8 max-w-3xl">
          <FaqMotion items={faq} />
        </div>
      </Section>
    </>
  );
}
