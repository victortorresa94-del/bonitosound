import type { Metadata } from "next";
import Link from "next/link";
import { Section, Cta, JsonLd } from "@/components/ui";
import { RecordsHero } from "@/components/records/RecordsHero";
import { LeadMagnetArtists } from "@/components/LeadMagnetArtists";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  MarqueeLogoWall,
  FaqMotion,
} from "@/components/motion";
import { getArtists } from "@/lib/content";
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

      <RecordsHero />

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">¿Encajas con Bonito?</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          No te vendemos humo. Te decimos qué te toca.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10 max-w-3xl" delay={0.15}>
          <LeadMagnetArtists />
        </RevealOnScroll>
      </Section>

      <Section className="bg-bg-primary">
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
          Artistas que tienen el rollo bonito.
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
            <Link href="/artistas/todos" className="btn btn-primary">
              Roster completo →
            </Link>
          </MagneticButton>
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Catálogo de distribución</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          ~20 artistas, una distribuidora.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10" delay={0.2}>
          <MarqueeLogoWall items={distributionCatalog} dir="artistas" speed={35} />
        </RevealOnScroll>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Cómo son nuestros contratos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo que firmas con nosotros, en cinco líneas.
        </SplitTextReveal>
        <RevealOnScroll
          as="p"
          className="mt-6 max-w-2xl text-text-secondary"
          delay={0.15}
        >
          No vamos a poner los porcentajes en una web. Sí los principios.
          Si encajan, hablamos; si no, mejor saberlo ya.
        </RevealOnScroll>
        <StaggerGroup
          stagger={0.08}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {[
            {
              t: "Pacto antes de empezar",
              d: "Todo lo que prometemos en la primera llamada acaba por escrito antes del primer movimiento. Cero acuerdos verbales que luego nadie recuerda.",
            },
            {
              t: "Exclusividad solo donde aporta",
              d: "Si te llevamos en booking no te obligamos a fichar también el sello. Cada servicio se contrata por separado y se justifica por separado.",
            },
            {
              t: "Salida ordenada",
              d: "Si la cosa no va, se acaba sin pelea. Plazo de aviso corto, devolución de los activos que son tuyos, y a otra cosa.",
            },
            {
              t: "Sin cláusulas de papelera",
              d: "Nada de obligar a sacar X canciones al año ni a cubrir gastos imposibles. Si tenemos que renegociar, se renegocia.",
            },
            {
              t: "Tu música, tus masters",
              d: "Lo que produzcamos juntos se acuerda en el papel: a quién pertenece, durante cuánto y bajo qué condiciones revierten. Sin ambigüedad.",
            },
            {
              t: "Liquidaciones a tiempo",
              d: "Cuentas claras y trimestrales — vengan o no las liquidaciones de plataformas en hora. Si hay retraso, te lo decimos.",
            },
          ].map((p) => (
            <div key={p.t} className="card">
              <h3 className="display text-xl">{p.t}</h3>
              <p className="mt-3 text-text-secondary">{p.d}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Cómo trabajamos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Cuatro pasos. Sin letra pequeña.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-5 card">
              <span className="display text-3xl text-text-muted">
                0{i + 1}
              </span>
              <p className="text-text-secondary">{s}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
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
