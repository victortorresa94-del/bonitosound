import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
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
          <div className="stagger max-w-3xl">
            <Eyebrow>Lab · Artiverse</Eyebrow>
            <Heading as="h1">Deja de trabajar a ciegas.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Artiverse conecta agencias, programadores y promotores. 200+
              usuarios usándola ya. La parte del sector que decidió ordenarse.
            </p>
            <div className="mt-9">
              <Cta href={site.external.artiverse}>Conocer Artiverse →</Cta>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>Qué resuelve</Eyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
