import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Section, Heading, Cta } from "@/components/ui";
import { RevealOnScroll, MagneticButton, MarqueeLogoWall } from "@/components/motion";
import { ArtistShowcase, type ShowcaseArtist } from "@/components/artistas/ArtistShowcase";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { distributionCatalog, site } from "@/lib/site";

/** Ilustración "dibujo" si existe en /public; si no, la foto real. */
function resolveShowcaseImage(slug: string, fallback: string | null) {
  const ill = path.join(process.cwd(), "public", "img", "artistas", "ilustracion", `${slug}.png`);
  if (fs.existsSync(ill)) return { image: `/img/artistas/ilustracion/${slug}.png`, isIllustration: true };
  return { image: fallback, isIllustration: false };
}

export const metadata: Metadata = {
  title: "Artistas — Roster Bonito Sound",
  description:
    "Los artistas que llevamos en Bonito Sound: booking, management, sello y distribución. Todos juntos, bien llevados.",
  alternates: { canonical: `${site.url}/artistas` },
};

export default function Artistas() {
  // Todos los artistas juntos, sin separar booking de distribución.
  const all = getArtists();
  const showcase: ShowcaseArtist[] = all.map((a) => {
    const { image, isIllustration } = resolveShowcaseImage(
      a.slug,
      a.image ?? findAsset("artistas", a.slug)
    );
    return {
      slug: a.slug,
      name: a.name,
      genre: a.genre,
      bioLine: a.bio[0] ?? "",
      image,
      isIllustration,
      spotifyUrl: a.spotifyArtistId
        ? `https://open.spotify.com/artist/${a.spotifyArtistId}`
        : undefined,
      instagramUrl: a.instagram,
    };
  });

  return (
    <>
      <ArtistShowcase artists={showcase} />

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-6">
          Todos los que llevamos
        </RevealOnScroll>
        <MarqueeLogoWall items={distributionCatalog} dir="artistas" speed={35} />
      </Section>

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
