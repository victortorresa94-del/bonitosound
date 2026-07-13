import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, Heading, Cta } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  MarqueeLogoWall,
} from "@/components/motion";
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
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Roster
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="chars"
              stagger={0.025}
              y={40}
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              Pocos. Bien llevados.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.3}>
              No coleccionamos artistas. Llevamos a los que podemos llevar como
              hay que llevarlos.
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Booking & Management
        </RevealOnScroll>
        <StaggerGroup
          stagger={0.08}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {roster.map((a) => {
            const photo = a.image ?? findAsset("artistas", a.slug);
            return (
              <Link
                key={a.slug}
                href={`/artistas/${a.slug}`}
                className="group"
                data-cursor="link"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
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
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Catálogo de distribución
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          ~20 artistas en distribución y editorial.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10" delay={0.2}>
          <MarqueeLogoWall items={distributionCatalog} dir="artistas" speed={35} />
        </RevealOnScroll>
      </Section>

      <Section>
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Quieres a alguien del roster?</Heading>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Booking directo. Sin intermediarios raros.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton strength={0.5}>
              <Cta href={`mailto:${site.emails.booking}?subject=Booking%20roster`}>
                Contactar booking →
              </Cta>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
