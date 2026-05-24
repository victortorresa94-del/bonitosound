import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
import { YouTubeEmbed } from "@/components/Embeds";
import { LogoWall } from "@/components/LogoWall";
import { tourArtists, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tour management — Giras de principio a fin",
  description:
    "Road, tour y stage management. Hemos llevado giras de Albert Pla, Alfred García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo, Ramon Mirabet y Efecto Pasillo.",
  alternates: { canonical: `${site.url}/eventos/giras` },
};

const faq = [
  {
    q: "¿Qué incluye el tour management de Bonito Sound?",
    a: "Road management, tour management y stage management: logística, rutas, equipo, producción técnica y coordinación en plaza. De la primera furgoneta al desmontaje del último bolo.",
  },
  {
    q: "¿Con qué artistas habéis trabajado en gira?",
    a: "Hemos trabajado con Albert Pla, Alfred García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo, Ramon Mirabet y Efecto Pasillo, entre otros.",
  },
  {
    q: "¿Lleváis giras de artistas que no son del roster?",
    a: "Sí. El tour management es un servicio: no hace falta estar fichado por Bonito para que llevemos tu gira.",
  },
];

export default function Giras() {
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
            <Eyebrow>Giras</Eyebrow>
            <Heading as="h1">
              Una gira no se improvisa. Se lleva.
            </Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Road, tour y stage management. La parte que no se ve desde el
              público y que decide si la gira sale o se cae.
            </p>
            <div className="mt-9">
              <Cta href="/contacto">Cuéntanos tu gira →</Cta>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>Hemos llevado de gira a</Eyebrow>
        <div className="mt-8">
          <LogoWall items={tourArtists} dir="giras" />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>El vídeo lo cuenta mejor</Eyebrow>
        <Heading>Final de Gira 1016 — Sant Jordi Club.</Heading>
        <div className="mt-10 max-w-3xl">
          <YouTubeEmbed id="r47SP4OULcI" title="Final de Gira 1016" />
        </div>
      </Section>

      <Section>
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <Heading>Lo que se pregunta antes de firmar.</Heading>
        <div className="mt-10 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>
    </>
  );
}
