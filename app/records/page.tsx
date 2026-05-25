import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, Heading, Eyebrow, Cta, JsonLd } from "@/components/ui";
import { LeadMagnetArtists } from "@/components/LeadMagnetArtists";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
  MarqueeLogoWall,
  FaqMotion,
} from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { distributionCatalog, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Records — Sello, booking, management y distribución",
  description:
    "Sello discográfico independiente en España: booking, management, distribución digital y editorial. Todo bajo el mismo techo.",
  alternates: { canonical: `${site.url}/records` },
};

const services = [
  { name: "Booking Engine", desc: "Agenda real, no promesas. Te ponemos donde tienes que estar." },
  { name: "Records 360", desc: "Sello: del máster a la calle, con criterio." },
  { name: "Editorial 360", desc: "Tus derechos, gestionados por quien sabe leerlos." },
  { name: "Distribución", desc: "Tu música en plataformas, bien hecha." },
];

const steps = [
  "Escuchamos. De verdad, no por compromiso.",
  "Te decimos qué te toca: sello, booking, distribución o todo.",
  "Montamos el plan con fechas y responsables, no con humo.",
  "Lo ejecutamos contigo, no por encima de ti.",
];

const faq = [
  {
    q: "Sello vs distribución vs editorial: ¿qué hace cada uno?",
    a: "El sello produce y publica tu música y asume parte del riesgo. La distribución pone tu música en plataformas (Spotify, Apple Music). La editorial gestiona los derechos de autor de las canciones. En Bonito puedes tener una, dos o las tres.",
  },
  {
    q: "¿Cómo se ficha por Bonito?",
    a: "Escribiéndonos. Escuchamos lo que tienes, te decimos con honestidad si hay encaje y, si lo hay, montamos un plan concreto. No fichamos por volumen.",
  },
  {
    q: "¿Cuánto se queda el sello?",
    a: "Depende del servicio y del acuerdo. No hay un número universal y desconfía de quien te lo dé por una web. Lo cerramos por escrito antes de empezar.",
  },
];

export default function Records() {
  const roster = getArtists().filter((a) => a.tier === "booking");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Bonito Sound Records",
          "@id": `${site.url}/records`,
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
        <div className="wrap grid items-center gap-10 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Records
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              Tienes la música. Te falta el sistema.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Sello, booking, management, distribución y editorial. Lo que la
              mayoría te hace montar con cinco proveedores, aquí está en uno.
            </RevealOnScroll>
          </div>
          {(() => {
            const img = findAsset("heroes", "records");
            return img ? (
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-subtle">
                <ParallaxLayer speed={0.2} className="absolute inset-0">
                  <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover scale-110" />
                </ParallaxLayer>
              </div>
            ) : null;
          })()}
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">¿Encajas con Bonito?</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          No te vendemos humo. Te decimos qué te toca.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10 max-w-3xl" delay={0.15}>
          <LeadMagnetArtists />
        </RevealOnScroll>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Servicios</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Cuatro piezas del mismo sistema.
        </SplitTextReveal>
        <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.name} className="card">
              <h3 className="display text-xl">{s.name}</h3>
              <p className="mt-3 text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Roster</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          A estos los llevamos nosotros.
        </SplitTextReveal>
        <StaggerGroup stagger={0.04} className="mt-10 flex flex-wrap gap-3">
          {roster.map((a) => (
            <Link
              key={a.slug}
              href={`/artistas/${a.slug}`}
              className="btn btn-ghost"
              data-cursor="link"
            >
              {a.name}
            </Link>
          ))}
          <MagneticButton strength={0.3}>
            <Link href="/artistas" className="btn btn-primary">
              Roster completo →
            </Link>
          </MagneticButton>
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Catálogo de distribución</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          ~20 artistas, una distribuidora.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10" delay={0.2}>
          <MarqueeLogoWall items={distributionCatalog} dir="artistas" speed={35} />
        </RevealOnScroll>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Cómo trabajamos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Cuatro pasos. Sin letra pequeña.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-5 card">
              <span className="display text-3xl text-accent-warm">
                0{i + 1}
              </span>
              <p className="text-text-secondary">{s}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo básico, claro.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10 max-w-3xl" delay={0.15}>
          <FaqMotion items={faq} />
        </RevealOnScroll>
        <RevealOnScroll className="mt-12 flex flex-wrap gap-4" delay={0.25}>
          <MagneticButton strength={0.3}>
            <Cta href="/records/sello">Sello →</Cta>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Cta href="/records/booking-management" variant="ghost">
              Booking y management →
            </Cta>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Cta href="/records/distribucion" variant="ghost">
              Distribución →
            </Cta>
          </MagneticButton>
        </RevealOnScroll>
      </Section>
    </>
  );
}
