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
  const hasMusic = Boolean(a.spotifyArtistId || a.spotifyPlaylistId);

  // Otros del roster (mismo tier primero), para no dejar la página sin salida.
  const others = getArtists()
    .filter((x) => x.slug !== a.slug)
    .sort((x, y) => (x.tier === a.tier ? -1 : 1))
    .slice(0, 3);

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

      {/* Hero editorial: foto grande + nombre gigante montado encima del borde. */}
      <section className="relative overflow-hidden border-b border-subtle">
        <div className="wrap grid items-center gap-8 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
          <div className="relative z-10 md:pr-6">
            <RevealOnScroll as="p" className="eyebrow mb-5">
              {a.genre}
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="chars"
              stagger={0.028}
              y={60}
              className="display text-[clamp(3rem,10vw,7rem)] leading-[0.92]"
            >
              {a.name}
            </SplitTextReveal>
            {a.bio[0] && (
              <RevealOnScroll
                as="p"
                className="mt-7 max-w-md text-lg text-text-secondary"
                delay={0.25}
              >
                {a.bio[0]}
              </RevealOnScroll>
            )}
            <RevealOnScroll className="mt-9 flex flex-wrap gap-4" delay={0.35}>
              <MagneticButton strength={0.4}>
                <Cta
                  href={`mailto:${site.emails.booking}?subject=${encodeURIComponent(
                    `Booking ${a.name}`,
                  )}`}
                >
                  Contratar booking →
                </Cta>
              </MagneticButton>
              {a.instagram && (
                <MagneticButton strength={0.25}>
                  <Cta href={a.instagram} variant="ghost" external>
                    Instagram
                  </Cta>
                </MagneticButton>
              )}
            </RevealOnScroll>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary md:-mt-6">
            {photo && (
              <ParallaxLayer speed={0.18} className="absolute inset-0">
                <Image
                  src={photo}
                  alt={a.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="scale-110 object-cover"
                  priority
                />
              </ParallaxLayer>
            )}
          </div>
        </div>
      </section>

      {/* Música primero: si hay, suena arriba. */}
      {hasMusic && (
        <Section>
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.1fr]">
            <div>
              <RevealOnScroll as="p" className="eyebrow mb-4">
                Escúchale
              </RevealOnScroll>
              <SplitTextReveal
                as="h2"
                split="lines"
                className="display text-[clamp(1.8rem,4vw,3rem)]"
              >
                Dale al play antes de escribirnos.
              </SplitTextReveal>
              {/* Guiño de marca: clip de cassette, el único elemento en
                  movimiento de esta zona (web-motion: un protagonista). */}
              <div
                aria-hidden
                className="mt-8 hidden aspect-video w-48 opacity-90 md:block"
              >
                <video
                  src="/video/home/records.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
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
          </div>
        </Section>
      )}

      {/* Bio completa: párrafos a partir del 2º (el 1º ya va en el hero). */}
      {a.bio.length > 1 && (
        <Section className={hasMusic ? "pt-0" : undefined}>
          <RevealOnScroll className="max-w-2xl space-y-5 text-lg leading-relaxed text-text-secondary">
            {a.bio.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </RevealOnScroll>
        </Section>
      )}

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
                  className="object-cover transition-transform duration-700 hover:scale-105"
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
        </Section>
      )}

      {/* Otros del roster: nunca un callejón sin salida. */}
      {others.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="mb-10 flex items-end justify-between gap-6">
            <p className="eyebrow">Más del roster</p>
            <Link href="/artistas" className="link-underline text-sm text-text-secondary">
              Ver todos →
            </Link>
          </div>
          <StaggerGroup stagger={0.08} className="grid gap-6 sm:grid-cols-3">
            {others.map((o) => {
              const p = o.image ?? findAsset("artistas", o.slug);
              return (
                <Link key={o.slug} href={`/artistas/${o.slug}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                    {p && (
                      <Image
                        src={p}
                        alt={o.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
                      <span className="display text-2xl text-white">{o.name}</span>
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{o.genre}</p>
                </Link>
              );
            })}
          </StaggerGroup>
        </Section>
      )}
    </>
  );
}
