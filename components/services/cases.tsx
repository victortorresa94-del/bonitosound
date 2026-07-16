import Image from "next/image";
import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import { SpotifyEmbed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  MarqueeLogoWall,
} from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { brands, distributionCatalog } from "@/lib/site";

/** Caso destacado: un artista con foto + Spotify (sello, management). */
export function ArtistFeatureCase({
  eyebrow,
  h2,
  body,
  slug,
  spotifyId,
}: {
  eyebrow: string;
  h2: string;
  body: string;
  slug: string;
  spotifyId: string;
}) {
  const photo = findAsset("artistas", slug);
  return (
    <Section className="bg-bg-primary">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <RevealOnScroll as="p" className="eyebrow mb-4">{eyebrow}</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            {h2}
          </SplitTextReveal>
          <RevealOnScroll as="p" className="mt-6 max-w-2xl text-lg text-text-secondary" delay={0.15}>
            {body}
          </RevealOnScroll>
          <RevealOnScroll className="mt-8" delay={0.25}>
            <MagneticButton strength={0.3}>
              <Cta href={`/artistas/${slug}`} variant="ghost">Ver la ficha →</Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
        <RevealOnScroll className="space-y-5" delay={0.15}>
          {photo && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle">
              <Image src={photo} alt={h2} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
            </div>
          )}
          <SpotifyEmbed type="artist" id={spotifyId} height={152} title={h2} />
        </RevealOnScroll>
      </div>
    </Section>
  );
}

/** Grid de artistas del roster de booking (con foto). */
export function RosterGridCase() {
  const artists = getArtists()
    .filter((a) => a.tier === "booking")
    .map((a) => ({ ...a, photo: a.image ?? findAsset("artistas", a.slug) }))
    .filter((a) => a.photo);
  if (artists.length === 0) return null;
  return (
    <Section>
      <RevealOnScroll as="p" className="eyebrow mb-8">A quién llevamos</RevealOnScroll>
      <StaggerGroup stagger={0.06} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {artists.map((a) => (
          <Link key={a.slug} href={`/artistas/${a.slug}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
              <Image src={a.photo!} alt={a.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="display text-lg text-white">{a.name}</span>
              </span>
            </div>
          </Link>
        ))}
      </StaggerGroup>
      <RevealOnScroll className="mt-10">
        <MagneticButton strength={0.3}>
          <Cta href="/artistas/todos" variant="ghost">Roster completo →</Cta>
        </MagneticButton>
      </RevealOnScroll>
    </Section>
  );
}

/** Marquee del catálogo de distribución (~20 artistas). */
export function CatalogMarqueeCase() {
  return (
    <Section>
      <RevealOnScroll as="p" className="eyebrow mb-8">Ya distribuyen con nosotros</RevealOnScroll>
      <MarqueeLogoWall items={distributionCatalog} dir="artistas" speed={35} />
    </Section>
  );
}

/** Caso de producciones: muro de marcas + enlace a los eventos reales. */
export function BrandsCase() {
  return (
    <Section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <RevealOnScroll as="p" className="eyebrow">Marcas que han confiado</RevealOnScroll>
        <Link href="/eventos" className="link-underline text-sm text-text-secondary">Ver los eventos →</Link>
      </div>
      <MarqueeLogoWall items={brands} dir="marcas" speed={42} direction="right" />
    </Section>
  );
}
