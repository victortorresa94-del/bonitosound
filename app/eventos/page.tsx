import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { YouTubeEmbed } from "@/components/Embeds";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eventos — Activaciones para marcas y giras",
  description:
    "Productora de eventos musicales: activaciones de marca y tour management. Del brief al titular, con un solo equipo.",
  alternates: { canonical: `${site.url}/eventos` },
};

export default function Eventos() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Eventos</Eyebrow>
            <Heading as="h1">Aquí está la pasta. Y el oficio.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Dos cosas: producimos activaciones para marcas que quieren música
              que se recuerde, y llevamos giras de principio a fin. Las dos con
              el mismo equipo que las monta.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/eventos/marcas" className="card group flex flex-col">
            <Eyebrow>Marcas</Eyebrow>
            <h2 className="display mt-3 text-3xl">Eventos para marcas</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              Ballantine&apos;s, Pernod Ricard, Pepsico, Absolut. Activaciones,
              lanzamientos y experiencias culturales. Del brief al titular en 6
              semanas.
            </p>
            <span className="mt-6 text-accent-warm">Ver eventos para marcas →</span>
          </Link>

          <Link href="/eventos/giras" className="card group flex flex-col">
            <Eyebrow>Giras</Eyebrow>
            <h2 className="display mt-3 text-3xl">Tour management</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              Road, tour y stage management. Hemos llevado a Albert Pla, Alfred
              García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo.
            </p>
            <span className="mt-6 text-accent-warm">Ver giras →</span>
          </Link>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>En directo</Eyebrow>
        <Heading>Final de gira en el Sant Jordi Club.</Heading>
        <div className="mt-10 max-w-3xl">
          <YouTubeEmbed id="r47SP4OULcI" title="Final de Gira 1016 — Sant Jordi Club" />
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Marca o gira?</Heading>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Cuéntanos qué necesitas. Te decimos qué se puede hacer de verdad.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta href="/contacto">Hablamos →</Cta>
          </div>
        </div>
      </Section>
    </>
  );
}
