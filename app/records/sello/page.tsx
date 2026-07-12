import type { Metadata } from "next";
import Image from "next/image";
import { Section, Cta, JsonLd } from "@/components/ui";
import { SpotifyEmbed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { FaqOpen } from "@/components/FaqOpen";
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
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Records · Sello</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Del máster a la calle, con criterio.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              No somos una fábrica de canciones. Trabajamos pocos proyectos y
              los trabajamos en serio: producción, publicación y carrera.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={`mailto:${site.emails.booking}?subject=Sello`}>
                  Mándanos tu música →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Qué ponemos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo que un sello debería poner y casi ninguno pone.
        </SplitTextReveal>
        <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-3">
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
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">Un ejemplo</RevealOnScroll>
            <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
              MARCA DIVINA, de Eva Calyza.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-6 max-w-2xl text-lg text-text-secondary" delay={0.15}>
              El primer álbum de Eva Calyza — diez canciones que fusionan folclore
              andaluz y electrónica oscura — se produjo con nosotros y salió en
              2025. Del máster a la calle, con criterio: eso es lo que hace un
              sello cuando hace su trabajo.
            </RevealOnScroll>
            <RevealOnScroll className="mt-8" delay={0.25}>
              <MagneticButton strength={0.3}>
                <Cta href="/artistas/eva-calyza" variant="ghost">
                  Ver a Eva Calyza →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
          <RevealOnScroll className="space-y-5" delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle">
              <Image
                src="/img/artistas/eva-calyza.jpg"
                alt="Eva Calyza"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <SpotifyEmbed
              type="artist"
              id="6rUgNfaBgUk0WCQbNafgKh"
              height={152}
              title="Eva Calyza en Spotify"
            />
          </RevealOnScroll>
        </div>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8">
          <FaqOpen items={faq} />
        </div>
      </Section>
    </>
  );
}
