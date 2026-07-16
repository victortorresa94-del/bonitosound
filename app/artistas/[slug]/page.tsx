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
  // Ilustración de artista (estilo navy line-art). Si no existe, cae a la foto.
  const illustration = findAsset("artistas/ilustracion", a.slug);
  const heroMedia = illustration ?? photo;
  // Contador "NN/TT" dentro del mismo tier (booking/distribución).
  const tierList = getArtists().filter((x) => x.tier === a.tier);
  const artistIdx = tierList.findIndex((x) => x.slug === a.slug) + 1;
  const artistTotal = tierList.length;
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

      {/* Hero editorial (mockup): nombre serif + género cian + bio + stats a la
          izquierda; ilustración navy a la derecha. */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap grid items-center gap-8 py-14 md:grid-cols-[1fr_1fr] md:py-20">
          <div className="relative z-10 order-2 md:order-1">
            <RevealOnScroll as="p" className="eyebrow mb-6">
              Artista · {String(artistIdx).padStart(2, "0")}/
              {String(artistTotal).padStart(2, "0")}
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="chars"
              stagger={0.02}
              y={40}
              className="display font-normal leading-[0.9] text-[clamp(3rem,9vw,6.5rem)] text-[#14283C]"
            >
              {a.name}
            </SplitTextReveal>
            <RevealOnScroll
              as="p"
              delay={0.12}
              className="mt-2 font-display text-[clamp(1.3rem,3.2vw,2rem)] italic text-[#16b6d4]"
            >
              {a.genre}
            </RevealOnScroll>
            {a.bio[0] && (
              <RevealOnScroll
                as="p"
                className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary"
                delay={0.2}
              >
                {a.bio[0]}
              </RevealOnScroll>
            )}

            {/* Stats: Spotify + Instagram (con cifra solo si está en frontmatter). */}
            {(a.spotifyArtistId || a.instagram) && (
              <RevealOnScroll
                className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4"
                delay={0.28}
              >
                {a.spotifyArtistId && (
                  <a
                    href={`https://open.spotify.com/artist/${a.spotifyArtistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3"
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="#14283C" aria-hidden>
                      <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 11-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34.35.22.46.68.25 1.03zm1.47-3.27a.94.94 0 01-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 01-.55-1.8c4.37-1.33 9.79-.68 13.5 1.6.44.27.58.85.31 1.29zm.13-3.4C15.72 8.23 8.98 8 5.2 9.15a1.12 1.12 0 11-.65-2.15c4.34-1.32 11.78-1.06 16.43 1.7a1.12 1.12 0 11-1.15 1.93z" />
                    </svg>
                    <span className="text-sm text-text-secondary transition-colors group-hover:text-[#0c7e93]">
                      {a.listeners ?? "Spotify"}
                    </span>
                  </a>
                )}
                {a.instagram && (
                  <a
                    href={a.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3"
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="#14283C" strokeWidth="1.7" aria-hidden>
                      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                      <circle cx="12" cy="12" r="4.2" />
                      <circle cx="17.4" cy="6.6" r="1.1" fill="#14283C" stroke="none" />
                    </svg>
                    <span className="text-sm text-text-secondary transition-colors group-hover:text-[#0c7e93]">
                      {a.followers ?? "Instagram"}
                    </span>
                  </a>
                )}
              </RevealOnScroll>
            )}

            <RevealOnScroll className="mt-9" delay={0.34}>
              <MagneticButton strength={0.4}>
                <Cta
                  href={`mailto:${site.emails.booking}?subject=${encodeURIComponent(
                    `Booking ${a.name}`,
                  )}`}
                >
                  Contratar booking →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>

          {/* Ilustración (o foto de fallback). */}
          <div className="order-1 md:order-2">
            {heroMedia &&
              (illustration ? (
                <div className="relative mx-auto aspect-[3/4] w-full max-w-md">
                  <Image
                    src={heroMedia}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  <ParallaxLayer speed={0.16} className="absolute inset-0">
                    <Image
                      src={heroMedia}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="scale-110 object-cover grayscale"
                      priority
                    />
                  </ParallaxLayer>
                </div>
              ))}
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
