import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section, Cta, JsonLd } from "@/components/ui";
import { SpotifyEmbed, YouTubeEmbed, InstagramFeed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
} from "@/components/motion";
import { getArtist, getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getArtists().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getArtist(params.slug);
  if (!a) return {};
  return {
    title: `${a.name} — ${a.genre}`,
    description: `${a.name} en Bonito Sound. ${a.bio[0] ?? ""}`,
    alternates: { canonical: `${site.url}/artistas/${a.slug}` },
  };
}

export default function ArtistPage({
  params,
}: {
  params: { slug: string };
}) {
  const a = getArtist(params.slug);
  if (!a) notFound();

  const photo = a.image ?? findAsset("artistas", a.slug);
  const hasReels = a.reels && a.reels.length > 0;
  const hasVideos = a.youtubeIds && a.youtubeIds.length > 0;
  const hasGallery = a.gallery && a.gallery.length > 0;

  // Schema MusicGroup enriquecido: sameAs (Spotify + IG) + image cuando
  // existan. Mejora SEO y aparición en Knowledge Graph / Music panels.
  const sameAs: string[] = [];
  if (a.spotifyArtistId)
    sameAs.push(`https://open.spotify.com/artist/${a.spotifyArtistId}`);
  if (a.instagram) sameAs.push(a.instagram);

  const absolutePhoto = photo ? `${site.url}${photo}` : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: a.name,
          genre: a.genre,
          recordLabel: { "@type": "Organization", name: "Bonito Sound" },
          "@id": `${site.url}/artistas/${a.slug}`,
          url: `${site.url}/artistas/${a.slug}`,
          agent: { "@type": "Organization", name: site.legalName },
          ...(absolutePhoto ? { image: absolutePhoto } : {}),
          ...(sameAs.length ? { sameAs } : {}),
        }}
      />
      <section className="border-b border-subtle">
        <div className="wrap grid items-end gap-10 py-24 md:grid-cols-[1fr_1fr] md:py-32">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">
              {a.genre}
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="chars"
              stagger={0.03}
              y={50}
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              {a.name}
            </SplitTextReveal>
            <RevealOnScroll className="mt-9 flex flex-wrap gap-4" delay={0.3}>
              <MagneticButton strength={0.4}>
                <Cta
                  href={`mailto:${site.emails.booking}?subject=${encodeURIComponent(
                    `Booking ${a.name}`,
                  )}`}
                >
                  Contactar booking →
                </Cta>
              </MagneticButton>
              {a.instagram && (
                <MagneticButton strength={0.25}>
                  <Cta href={a.instagram} variant="ghost" external>
                    Instagram →
                  </Cta>
                </MagneticButton>
              )}
            </RevealOnScroll>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
            {photo && (
              <ParallaxLayer speed={0.2} className="absolute inset-0">
                <Image
                  src={photo}
                  alt={a.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover scale-110"
                  priority
                />
              </ParallaxLayer>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div
          className={`grid gap-12 ${
            a.spotifyArtistId || a.spotifyPlaylistId
              ? "md:grid-cols-[1.2fr_1fr]"
              : "md:grid-cols-1"
          }`}
        >
          <RevealOnScroll className="max-w-xl space-y-5 text-lg text-text-secondary">
            {a.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </RevealOnScroll>
          {(a.spotifyArtistId || a.spotifyPlaylistId) && (
            <RevealOnScroll className="space-y-6" delay={0.15}>
              {a.spotifyArtistId && (
                <SpotifyEmbed
                  type="artist"
                  id={a.spotifyArtistId}
                  title={`${a.name} en Spotify`}
                />
              )}
              {a.spotifyPlaylistId && (
                <SpotifyEmbed
                  type="playlist"
                  id={a.spotifyPlaylistId}
                  height={232}
                  title={`Playlist de ${a.name}`}
                />
              )}
            </RevealOnScroll>
          )}
        </div>
      </Section>

      {hasGallery && (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-8">
            Galería
          </RevealOnScroll>
          <StaggerGroup stagger={0.08} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {a.gallery!.map((src) => (
              <div
                key={src}
                className="relative aspect-[3/4] overflow-hidden rounded-xl border border-subtle"
              >
                <Image
                  src={src}
                  alt={a.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {hasReels && (
        <Section>
          <RevealOnScroll as="p" className="eyebrow mb-8">
            En directo
          </RevealOnScroll>
          <InstagramFeed posts={a.reels} />
        </Section>
      )}

      {hasVideos && (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-8">
            Vídeos
          </RevealOnScroll>
          <StaggerGroup stagger={0.1} className="grid gap-6 md:grid-cols-2">
            {a.youtubeIds!.map((id) => (
              <YouTubeEmbed key={id} id={id} title={`${a.name} en YouTube`} />
            ))}
          </StaggerGroup>
        </Section>
      )}

      {a.milestones && a.milestones.length > 0 && (
        <Section>
          <RevealOnScroll className="max-w-3xl">
            <p className="eyebrow mb-6">Trayectoria</p>
            <ul className="divide-y divide-subtle border-y border-subtle">
              {a.milestones.map((m, i) => (
                <li
                  key={`${m.year}-${i}`}
                  className="grid grid-cols-[80px_1fr] gap-6 py-4 text-text-secondary"
                >
                  <span className="font-mono text-sm tabular-nums text-text-muted">
                    {m.year}
                  </span>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll className="mt-14">
            <Link href="/artistas" className="link-underline text-sm text-text-secondary">
              ← Roster completo
            </Link>
          </RevealOnScroll>
        </Section>
      )}

      {!(a.milestones && a.milestones.length > 0) && (
        <Section>
          <RevealOnScroll>
            <Link href="/artistas" className="link-underline text-sm text-text-secondary">
              ← Roster completo
            </Link>
          </RevealOnScroll>
        </Section>
      )}
    </>
  );
}
