import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import { NuestrasEdiciones } from "@/components/records/NuestrasEdiciones";
import { FaqOpen } from "@/components/FaqOpen";
import { ServiceIcon, type IconName } from "@/components/services/ServiceIcon";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { getArtists } from "@/lib/content";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Records — Sello, editorial y distribución | Bonito Sound",
  description:
    "La división de música grabada de Bonito Sound: sello discográfico, editorial y distribución digital. Producimos, publicamos, registramos y llevamos tu música a donde se escucha. Más de 150 lanzamientos desde 2022.",
  alternates: { canonical: `${site.url}/records` },
};

// Las tres patas de Records, cada una con su página de detalle.
const PATAS: { icon: IconName; t: string; d: string; href: string; cta: string }[] = [
  {
    icon: "disco",
    t: "Sello",
    d: "Producimos, publicamos y empujamos tu música. Pocos proyectos y en serio: del primer demo al máster listo para plataformas.",
    href: "/records/sello",
    cta: "El sello",
  },
  {
    icon: "derechos",
    t: "Editorial",
    d: "Registramos tus obras y seguimos sus usos para que cada vez que suena tu música, rinda lo que tiene que rendir.",
    href: "/records/editorial",
    cta: "La editorial",
  },
  {
    icon: "distribucion",
    t: "Distribución",
    d: "Llevamos tu música a Spotify, Apple Music, YouTube y las demás, con los metadatos en orden y gente del sector detrás.",
    href: "/records/distribucion",
    cta: "La distribución",
  },
];

const faq = [
  {
    q: "¿Qué es exactamente Records?",
    a: "Es la división de música grabada de Bonito Sound: sello, editorial y distribución. Todo lo que le pasa a tu música desde que existe la grabación hasta que suena y se cobra en las plataformas. El booking y el management van aparte.",
  },
  {
    q: "Sello vs distribución vs editorial: ¿qué hace cada uno?",
    a: "El sello produce y publica tu música y asume parte del riesgo. La distribución la lleva a las plataformas con los metadatos en orden. La editorial gestiona los derechos de autor de las canciones. Puedes contratar una, dos o las tres.",
  },
  {
    q: "¿Hace falta fichar por el sello para distribuir o llevar la editorial?",
    a: "No. La distribución y la editorial son servicios independientes: puedes usarlos aunque publiques por tu cuenta. Cada pata se contrata y se justifica por separado.",
  },
  {
    q: "¿Cómo se ficha por el sello?",
    a: "Escribiéndonos. Escuchamos lo que tienes, te decimos con honestidad si hay encaje y, si lo hay, montamos un plan concreto. No fichamos por volumen.",
  },
];

export default function Records() {
  const roster = getArtists().filter((a) => a.tier === "booking");
  const illo = "/img/servicios/heroes/sello.png";
  const mailto = `mailto:${site.emails.general}?subject=${encodeURIComponent("Records")}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Bonito Sound Records",
          "@id": `${site.url}/records`,
          url: `${site.url}/records`,
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

      {/* ── HERO ── */}
      <section className="border-b border-subtle">
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">Records</RevealOnScroll>
            <RevealOnScroll as="h1" className="display leading-[1.02] text-[clamp(2.6rem,7vw,5rem)]">
              <span style={{ color: NAVY }}>Tu música grabada, </span>
              <span style={{ color: CYAN }}>de principio a fin.</span>
            </RevealOnScroll>
            <RevealOnScroll as="p" delay={0.2} className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary">
              La división de música grabada de Bonito: sello, editorial y
              distribución. Producimos, publicamos, registramos los derechos y
              llevamos tu música a donde se escucha. Todo bajo el mismo techo.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}><Cta href={mailto}>Hablamos →</Cta></MagneticButton>
            </RevealOnScroll>
          </div>
          <RevealOnScroll className="order-first md:order-none" delay={0.15}>
            <Image src={illo} alt="" width={720} height={520} priority className="mx-auto h-auto w-full max-w-[440px] object-contain md:max-w-[500px]" />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── LAS 3 PATAS ── */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Tres patas, un sistema</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo que le pasa a tu música, ordenado.
        </SplitTextReveal>
        <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-3">
          {PATAS.map((p) => (
            <Link key={p.t} href={p.href} className="card group flex flex-col transition-transform duration-300 hover:-translate-y-1">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-cyan/10 transition-all duration-300 group-hover:-rotate-6 group-hover:bg-accent-cyan/20" style={{ color: NAVY }}>
                <ServiceIcon name={p.icon} />
              </span>
              <h3 className="display text-2xl leading-tight">{p.t}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{p.d}</p>
              <span className="mt-5 text-sm font-semibold text-accent-cyan">
                {p.cta} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── STATEMENT ── */}
      <Section>
        <RevealOnScroll as="p" className="statement mx-auto max-w-4xl text-center text-[clamp(1.5rem,3.4vw,2.5rem)] leading-tight text-text-primary">
          Publicar es el minuto uno. Hacerlo bien —máster, metadatos, derechos y un
          plan para el día después— es todo lo demás. Eso es Records.
        </RevealOnScroll>
        <RevealOnScroll className="mx-auto mt-7 w-40" delay={0.15}>
          <svg viewBox="0 0 160 16" fill="none" aria-hidden className="h-4 w-full">
            <path d="M3 9 C 28 2, 52 2, 78 9 S 128 15, 157 6" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
          </svg>
        </RevealOnScroll>
      </Section>

      {/* ── EDICIONES (catálogo real) ── */}
      <NuestrasEdiciones />

      {/* ── ROSTER ── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Roster</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Artistas que llevamos.
        </SplitTextReveal>
        <StaggerGroup stagger={0.04} className="mt-10 flex flex-wrap gap-3">
          {roster.map((a) => (
            <Link key={a.slug} href={`/artistas/${a.slug}`} className="btn btn-ghost" data-cursor="link">
              {a.name}
            </Link>
          ))}
          <MagneticButton strength={0.3}>
            <Link href="/artistas/todos" className="btn btn-primary">Roster completo →</Link>
          </MagneticButton>
        </StaggerGroup>
      </Section>

      {/* ── FAQ ── */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-8">Preguntas frecuentes</RevealOnScroll>
        <FaqOpen items={faq} />
      </Section>

      {/* ── CTA ── */}
      <Section>
        <CtaBlock
          title="¿Tienes música?"
          desc="Mándanosla. Escuchamos lo que tienes y te decimos, sin humo, cómo la sacaríamos."
          href={mailto}
          cta="Hablamos →"
        />
      </Section>
    </>
  );
}
