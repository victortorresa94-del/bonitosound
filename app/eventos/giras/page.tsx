import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import { YouTubeEmbed } from "@/components/Embeds";
import {
  RevealOnScroll,
  SplitTextReveal,
  MagneticButton,
  FaqMotion,
  MarqueeLogoWall,
} from "@/components/motion";
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
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Giras</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Una gira no se improvisa. Se lleva.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Road, tour y stage management. La parte que no se ve desde el
              público y que decide si la gira sale o se cae.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href="/contacto">Cuéntanos tu gira →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Hemos llevado de gira a</RevealOnScroll>
        <div className="mt-8">
          <MarqueeLogoWall items={tourArtists} dir="giras" label="Hemos llevado de gira a" speed={35} />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">El vídeo lo cuenta mejor</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Final de Gira 1016 — Sant Jordi Club.
        </SplitTextReveal>
        <div className="mt-10 max-w-3xl">
          <YouTubeEmbed id="r47SP4OULcI" title="Final de Gira 1016" />
        </div>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo que se pregunta antes de firmar.
        </SplitTextReveal>
        <div className="mt-10 max-w-3xl">
          <FaqMotion items={faq} />
        </div>
      </Section>
    </>
  );
}
