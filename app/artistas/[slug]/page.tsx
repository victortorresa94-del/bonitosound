import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section, Cta, JsonLd } from "@/components/ui";
import { SpotifyEmbed } from "@/components/Embeds";
import {
  RevealOnScroll,
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
            <RevealOnScroll className="mt-9" delay={0.3}>
              <MagneticButton strength={0.4}>
                <Cta
                  href={`mailto:${site.emails.booking}?subject=${encodeURIComponent(
                    `Booking ${a.name}`,
                  )}`}
                >
                  Contactar booking →
                </Cta>
              </MagneticButton>
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
            a.spotifyArtistId || (a.reels && a.reels.length > 0)
              ? "md:grid-cols-[1.2fr_1fr]"
              : "md:grid-cols-1"
          }`}
        >
          <RevealOnScroll className="max-w-xl space-y-5 text-lg text-text-secondary">
            {a.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </RevealOnScroll>
          {(a.spotifyArtistId || (a.reels && a.reels.length > 0)) && (
            <RevealOnScroll className="space-y-6" delay={0.15}>
              {a.spotifyArtistId && (
                <SpotifyEmbed
                  type="artist"
                  id={a.spotifyArtistId}
                  title={`${a.name} en Spotify`}
                />
              )}
            </RevealOnScroll>
          )}
        </div>

        {a.milestones && a.milestones.length > 0 && (
          <RevealOnScroll className="mt-20 max-w-3xl">
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
        )}

        <RevealOnScroll className="mt-14">
          <Link href="/artistas" className="link-underline text-sm text-text-secondary">
            ← Roster completo
          </Link>
        </RevealOnScroll>
      </Section>
    </>
  );
}
