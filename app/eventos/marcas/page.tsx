import type { Metadata } from "next";
import Image from "next/image";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
import { LeadMagnetBrands } from "@/components/LeadMagnetBrands";
import { LogoWall } from "@/components/LogoWall";
import { getCases } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { brands, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agencia de eventos musicales para marcas",
  description:
    "Productora de eventos corporativos con música y activaciones de marca en España. Del brief al titular en 6 semanas. Ballantine's, Pernod Ricard, Pepsico, Absolut.",
  alternates: { canonical: `${site.url}/eventos/marcas` },
};

const services = [
  {
    name: "Brand Live",
    desc: "Del brief al titular en 6 semanas. Concepto, artista, producción y dirección artística.",
  },
  {
    name: "Brand Touring",
    desc: "Tu marca de gira. Road, tour y stage management con experiencia real en gira nacional.",
  },
  {
    name: "Brand Sessions",
    desc: "Formatos íntimos de música en directo donde la curaduría manda sobre el tamaño.",
  },
];

const why = [
  "Un solo equipo del brief al desmontaje. No rebotas entre cinco proveedores.",
  "30 años de agenda real: sabemos qué artista funciona en qué evento.",
  "La música no es decoración: la elegimos como decisión estratégica.",
  "Producción técnica propia. Lo que prometemos en el deck, lo montamos.",
];

const faq = [
  {
    q: "¿Cuánto cuesta producir un evento de marca?",
    a: "Depende del formato, el artista y la escala. Las activaciones de marca con música en directo suelen moverse entre 30.000 € y 150.000 €. No damos precio por una web: lo cerramos sobre tu brief real.",
  },
  {
    q: "¿Necesito traer mi propio artista?",
    a: "No. Bonito Sound tiene roster propio y 30 años de agenda en la industria española. Elegimos al artista que encaja con tu marca y tu público, no el que toca por agenda.",
  },
  {
    q: "¿En qué se diferencia una agencia de eventos de una productora?",
    a: "Una agencia conecta proveedores. Una productora lo ejecuta. Bonito Sound hace las dos cosas con el mismo equipo: concepto, booking y producción técnica integradas.",
  },
  {
    q: "¿En cuánto tiempo podéis montar un evento?",
    a: "El formato Brand Live va del brief al titular en 6 semanas. Con menos margen también se puede, pero lo honesto es decírtelo antes de cobrarlo.",
  },
];

export default function EventosMarcas() {
  const cases = getCases();
  const heroImg = findAsset("heroes", "eventos-marcas");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Agencia de eventos musicales para marcas",
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
        <div className="wrap grid items-center gap-10 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
          <div className="stagger">
            <Eyebrow>Eventos para marcas</Eyebrow>
            <Heading as="h1">
              Música que la gente recuerda. No decorado.
            </Heading>
            <p className="mt-7 max-w-xl text-lg text-text-secondary">
              Producimos activaciones, lanzamientos y experiencias culturales
              para marcas premium. Del brief al titular, con un solo equipo.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Cta href="/contacto">Reservar llamada de 30 min →</Cta>
              <Cta href="#disena" variant="ghost">
                Diseña tu activación
              </Cta>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
            {heroImg && (
              <Image
                src={heroImg}
                alt="Activación de marca con música — Bonito Sound"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>
      </section>

      <Section id="disena">
        <Eyebrow>Diseña tu activación en 90 segundos</Eyebrow>
        <Heading>Cuéntanos qué tienes en la cabeza.</Heading>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Cuatro preguntas. Sin email para usarlo. Al final te enseñamos qué
          del portfolio se parece a lo tuyo.
        </p>
        <div className="mt-10 max-w-3xl">
          <LeadMagnetBrands />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Casos</Eyebrow>
        <Heading>Lo hemos hecho. No lo contamos, lo montamos.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c) => {
            const cover = findAsset("casos", c.slug);
            return (
              <div key={c.slug} className="card overflow-hidden p-0">
                <div className="relative aspect-[4/3] border-b border-subtle bg-bg-tertiary">
                  {cover && (
                    <Image
                      src={cover}
                      alt={`${c.brand} — ${c.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-7">
                  <p className="text-sm text-accent-warm">{c.brand}</p>
                  <h3 className="display mt-2 text-xl">{c.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary">{c.context}</p>
                  <p className="mt-4 border-t border-subtle pt-4 text-sm text-text-muted">
                    {c.result}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <Eyebrow>Servicios</Eyebrow>
        <Heading>Tres formas de hacerlo bien.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="card">
              <h3 className="display text-2xl">{s.name}</h3>
              <p className="mt-3 text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Marcas con las que hemos trabajado</Eyebrow>
        <div className="mt-8">
          <LogoWall items={brands} dir="marcas" />
        </div>
      </Section>

      <Section>
        <Eyebrow>Por qué nosotros</Eyebrow>
        <Heading>Cuatro razones, ninguna de relleno.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {why.map((w, i) => (
            <div key={i} className="flex gap-5 card">
              <span className="display text-3xl text-accent-blue">
                0{i + 1}
              </span>
              <p className="text-text-secondary">{w}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <Heading>Lo que nos preguntáis antes de la llamada.</Heading>
        <div className="mt-10 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Lo hablamos?</Heading>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Una llamada de 30 minutos. Tú cuentas el evento, nosotros te
            decimos qué se puede hacer de verdad.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta href={`mailto:${site.emails.general}?subject=Llamada%20activación`}>
              Reservar llamada →
            </Cta>
          </div>
        </div>
      </Section>
    </>
  );
}
