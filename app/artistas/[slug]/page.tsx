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
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <RevealOnScroll className="max-w-xl space-y-5 text-lg text-text-secondary">
            {a.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </RevealOnScroll>
          <RevealOnScroll className="space-y-6" delay={0.15}>
            {a.spotifyArtistId ? (
              <SpotifyEmbed
                type="artist"
                id={a.spotifyArtistId}
                title={`${a.name} en Spotify`}
              />
            ) : (
              <div className="rounded-2xl border border-subtle bg-bg-secondary p-6 text-sm text-text-muted">
                Embed de Spotify pendiente: añade{" "}
                <code>spotifyArtistId</code> en{" "}
                <code>content/artistas/{a.slug}.md</code>.
              </div>
            )}
            <div className="rounded-2xl border border-subtle bg-bg-secondary p-6 text-sm text-text-muted">
              Reels de Instagram (2-3) pendientes: añade los enlaces en el
              frontmatter <code>reels</code>.
            </div>
          </RevealOnScroll>
        </div>
        <RevealOnScroll className="mt-14">
          <Link href="/artistas" className="link-underline text-sm text-accent-warm">
            ← Roster completo
          </Link>
        </RevealOnScroll>
      </Section>
    </>
  );
}
