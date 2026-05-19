import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
import { LeadMagnetArtists } from "@/components/LeadMagnetArtists";
import { LogoWall } from "@/components/LogoWall";
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

      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Records</Eyebrow>
            <Heading as="h1">
              Tienes la música. Te falta el sistema.
            </Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Sello, booking, management, distribución y editorial. Lo que la
              mayoría te hace montar con cinco proveedores, aquí está en uno.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>¿Encajas con Bonito?</Eyebrow>
        <Heading>No te vendemos humo. Te decimos qué te toca.</Heading>
        <div className="mt-10 max-w-3xl">
          <LeadMagnetArtists />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Servicios</Eyebrow>
        <Heading>Cuatro piezas del mismo sistema.</Heading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.name} className="card">
              <h3 className="display text-xl">{s.name}</h3>
              <p className="mt-3 text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Roster</Eyebrow>
        <Heading>A estos los llevamos nosotros.</Heading>
        <div className="mt-10 flex flex-wrap gap-3">
          {roster.map((a) => (
            <Link
              key={a.slug}
              href={`/artistas/${a.slug}`}
              className="btn btn-ghost"
            >
              {a.name}
            </Link>
          ))}
          <Link href="/artistas" className="btn btn-primary">
            Roster completo →
          </Link>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Catálogo de distribución</Eyebrow>
        <Heading>~20 artistas, una distribuidora.</Heading>
        <div className="mt-10">
          <LogoWall items={distributionCatalog} />
        </div>
      </Section>

      <Section>
        <Eyebrow>Cómo trabajamos</Eyebrow>
        <Heading>Cuatro pasos. Sin letra pequeña.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-5 card">
              <span className="display text-3xl text-accent-warm">
                0{i + 1}
              </span>
              <p className="text-text-secondary">{s}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <Heading>Lo básico, claro.</Heading>
        <div className="mt-10 max-w-3xl">
          <Faq items={faq} />
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Cta href="/records/sello">Sello →</Cta>
          <Cta href="/records/booking-management" variant="ghost">
            Booking y management →
          </Cta>
          <Cta href="/records/distribucion" variant="ghost">
            Distribución →
          </Cta>
        </div>
      </Section>
    </>
  );
}
