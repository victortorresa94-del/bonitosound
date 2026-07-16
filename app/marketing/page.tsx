import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { FaqOpen } from "@/components/FaqOpen";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing musical para artistas — ads y lanzamientos",
  description:
    "Campañas de ads, estrategia de redes y lanzamientos de álbum y de evento para artistas. Cuando salga, se entera quien se tiene que enterar.",
  alternates: { canonical: `${site.url}/marketing` },
};

const services = [
  {
    name: "Ads y paid media",
    desc: "Campañas en Meta, TikTok y YouTube para mover oyentes y vender entradas. Medimos lo que de verdad importa: escuchas nuevas y entradas vendidas.",
  },
  {
    name: "Estrategia de redes",
    desc: "Qué contar, cuándo y en qué formato. Calendario de contenido alineado con tus lanzamientos, no publicar por publicar.",
  },
  {
    name: "Lanzamientos",
    desc: "Plan de salida para un single, un álbum o un evento: teaser, día de estreno y sostenimiento. Que el lanzamiento no pase desapercibido.",
  },
];

const faq = [
  {
    q: "¿Hace falta ser artista del sello para contratar marketing?",
    a: "No. El marketing es un servicio independiente: llevamos campañas de artistas que no están fichados en Records. Lo que pedimos es tener música o evento de verdad detrás.",
  },
  {
    q: "¿Cómo planteáis la inversión en ads?",
    a: "Según el objetivo (oyentes, entradas, territorio) y lo que tengas encima de la mesa. Montamos el plan sobre tu lanzamiento real y te decimos qué mueve la aguja y qué no. Lo concreto lo hablamos.",
  },
  {
    q: "¿En qué se diferencia de una agencia de marketing normal?",
    a: "En que venimos del sector musical. Sabemos cómo se mueve un lanzamiento, qué mide de verdad una carrera y cómo se llena una sala. No aprendemos tu industria sobre la marcha.",
  },
];

export default function Marketing() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Marketing musical para artistas",
          provider: { "@type": "Organization", name: site.legalName },
          areaServed: "ES",
          description: metadata.description,
        }}
      />
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
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Marketing para artistas
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              Que el lanzamiento no pase desapercibido.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Campañas de ads, estrategia de redes y lanzamientos de álbum y
              de evento. Cuando salga, se entera quien se tiene que enterar.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta
                  href={`mailto:${site.emails.general}?subject=${encodeURIComponent("Marketing para artistas")}`}
                >
                  Cuéntanos tu lanzamiento →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Qué hacemos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Tres piezas, un mismo objetivo.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="card flex flex-col">
              <h3 className="display text-xl">{s.name}</h3>
              <p className="mt-3 flex-1 text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8">
          <FaqOpen items={faq} />
        </div>
      </Section>

      <Section>
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            ¿Tienes algo que sacar?
          </SplitTextReveal>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Cuéntanos qué lanzas y cuándo. Te decimos qué se puede hacer de
            verdad y por dónde empezar.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton strength={0.5}>
              <Cta href={`mailto:${site.emails.general}?subject=${encodeURIComponent("Marketing para artistas")}`}>
                Hablamos →
              </Cta>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
