import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { LogoWall } from "@/components/LogoWall";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { distributionCatalog, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roster — Artistas Bonito Sound",
  description:
    "Roster de booking y management de Bonito Sound y catálogo de distribución. Pocos artistas, bien llevados.",
  alternates: { canonical: `${site.url}/artistas` },
};

export default function Artistas() {
  const roster = getArtists().filter((a) => a.tier === "booking");
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Roster</Eyebrow>
            <Heading as="h1">
              Pocos. Bien llevados.
            </Heading>
            <p className="mt-7 text-lg text-text-secondary">
              No coleccionamos artistas. Llevamos a los que podemos llevar como
              hay que llevarlos.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>Booking & Management</Eyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roster.map((a) => {
            const photo = a.image ?? findAsset("artistas", a.slug);
            return (
              <Link key={a.slug} href={`/artistas/${a.slug}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6">
                    <span className="display text-3xl text-white">{a.name}</span>
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-muted">{a.genre}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Catálogo de distribución</Eyebrow>
        <Heading>~20 artistas en distribución y editorial.</Heading>
        <div className="mt-10">
          <LogoWall items={distributionCatalog} dir="artistas" />
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Quieres a alguien del roster?</Heading>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Booking directo. Sin intermediarios raros.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta href={`mailto:${site.emails.booking}?subject=Booking%20roster`}>
              Contactar booking →
            </Cta>
          </div>
        </div>
      </Section>
    </>
  );
}
