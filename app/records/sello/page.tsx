import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sello discográfico independiente en España",
  description:
    "Sello discográfico independiente: del máster a la calle con criterio. Producción, publicación y carrera, sin fábrica de canciones.",
  alternates: { canonical: `${site.url}/records/sello` },
};

const faq = [
  {
    q: "¿Qué hace exactamente un sello independiente?",
    a: "Un sello independiente produce, publica y empuja la música de sus artistas asumiendo parte del riesgo, sin depender de una multinacional. Decide repertorio, calendario y estrategia junto al artista.",
  },
  {
    q: "¿Bonito Sound es un sello o una distribuidora?",
    a: "Las dos cosas, separadas. El sello asume proyecto y riesgo; la distribución es un servicio para llevar tu música a plataformas. Puedes contratar solo lo que necesites.",
  },
  {
    q: "¿Trabajáis con artistas que ya tienen música publicada?",
    a: "Sí. No hace falta empezar de cero: revisamos lo que tienes y decidimos juntos qué tiene sentido relanzar y qué construir nuevo.",
  },
];

export default function Sello() {
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
            <Eyebrow>Records · Sello</Eyebrow>
            <Heading as="h1">Del máster a la calle, con criterio.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              No somos una fábrica de canciones. Trabajamos pocos proyectos y
              los trabajamos en serio: producción, publicación y carrera.
            </p>
            <div className="mt-9">
              <Cta href={`mailto:${site.emails.booking}?subject=Sello`}>
                Mándanos tu música →
              </Cta>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>Qué ponemos</Eyebrow>
        <Heading>Lo que un sello debería poner y casi ninguno pone.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Criterio", "Te decimos qué single sale y por qué. Con argumentos, no con corazonadas."],
            ["Sistema", "Sello, booking y distribución hablan entre sí. No vas rebotando."],
            ["Cara", "Hay alguien al teléfono. Con nombre. Que coge."],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <h3 className="display text-xl">{t}</h3>
              <p className="mt-3 text-sm text-text-secondary">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <div className="mt-8 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>
    </>
  );
}
