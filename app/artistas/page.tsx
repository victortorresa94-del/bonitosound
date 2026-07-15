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

function ArtistCard({
  slug,
  name,
  genre,
  photo,
  big = false,
}: {
  slug: string;
  name: string;
  genre: string;
  photo: string | null;
  big?: boolean;
}) {
  return (
    <Link href={`/artistas/${slug}`} className="group" data-cursor="link">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
        {photo && (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5">
          <span className={`display text-white ${big ? "text-3xl" : "text-2xl"}`}>
            {name}
          </span>
        </span>
      </div>
      <p className="mt-3 text-sm text-text-muted">{genre}</p>
    </Link>
  );
}

export default function Artistas() {
  const all = getArtists();
  const booking = all.filter((a) => a.tier === "booking");
  const distro = all
    .filter((a) => a.tier === "distribucion")
    .map((a) => ({ ...a, photo: a.image ?? findAsset("artistas", a.slug) }))
    .filter((a) => a.photo);

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
        <RevealOnScroll as="p" className="eyebrow mb-8">
          Booking &amp; Management
        </RevealOnScroll>
        <StaggerGroup stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {booking.map((a) => (
            <ArtistCard
              key={a.slug}
              slug={a.slug}
              name={a.name}
              genre={a.genre}
              photo={a.image ?? findAsset("artistas", a.slug)}
              big
            />
          ))}
        </StaggerGroup>
      </Section>

      {distro.length > 0 && (
        <Section className="bg-bg-primary pt-0">
          <RevealOnScroll as="p" className="eyebrow mb-8">
            En distribución y editorial
          </RevealOnScroll>
          <StaggerGroup
            stagger={0.06}
            className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          >
            {distro.map((a) => (
              <ArtistCard
                key={a.slug}
                slug={a.slug}
                name={a.name}
                genre={a.genre}
                photo={a.photo!}
              />
            ))}
          </StaggerGroup>
          <RevealOnScroll className="mt-14">
            <p className="mb-6 text-sm text-text-muted">Y muchos más en catálogo:</p>
            <MarqueeLogoWall items={distributionCatalog} dir="artistas" speed={35} />
          </RevealOnScroll>
        </Section>
      )}

      <Section>
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Quieres a alguien del roster?</Heading>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Booking directo. Sin intermediarios raros — coges el teléfono y hablas
            con quien lo lleva.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <MagneticButton strength={0.5}>
              <Cta href={`mailto:${site.emails.booking}?subject=Booking%20roster`}>
                Contactar booking →
              </Cta>
            </MagneticButton>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-accent-cyan"
            >
              o llama al {site.phone}
            </a>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
