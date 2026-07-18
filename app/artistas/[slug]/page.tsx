import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Section, JsonLd } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { ArtistShowcase, type ShowcaseArtist } from "@/components/artistas/ArtistShowcase";
import { ArtistNumbers } from "@/components/artistas/ArtistNumbers";
import { ArtistFeaturedMusic } from "@/components/artistas/ArtistFeaturedMusic";
import { ArtistStyle } from "@/components/artistas/ArtistStyle";
import { ArtistBio } from "@/components/artistas/ArtistBio";
import { ArtistLiveFeed } from "@/components/artistas/ArtistLiveFeed";
import { ArtistConcerts } from "@/components/artistas/ArtistConcerts";
import { ArtistCTA } from "@/components/artistas/ArtistCTA";
import { getArtist, getArtists } from "@/lib/content";
import { findAsset, findArtistAudio } from "@/lib/assets";
import { site } from "@/lib/site";

// Los 6 destacados del roster (orden del mockup de /artistas) van primero en el
// carrusel; detrás, el resto de artistas. Es un ORDEN ÚNICO: entres por donde
// entres, las flechas recorren siempre a todos en el mismo orden.
const FEATURED_ORDER = ["dulze", "eva-calyza", "natura", "pablo-rojo", "paule", "sa-pena"];

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

/**
 * Ficha de artista = EXPERIENCIA ("un field donde quedarse a explorar").
 *
 * Orden según la lente de `bonito-super-team`:
 *  1. Hero/carrusel  → P1 (orgullo) + P4 (escuchar), y se recorre el roster sin salir.
 *  2. Números        → P2 (quien contrata) decide rápido; P1 se valida.
 *  3. Música         → P4 escucha ya (lo último + destacados).
 *  4. Su sonido      → de qué va su música.
 *  5. Su historia    → bio currada, aparte de la del hero.
 *  6. Su mundo       → reels + YouTube intercalados (entretenido).
 *  7. Directo        → primer/último concierto + trayectoria (prueba para P2).
 *  8. Galería        → si hay fotos.
 *  9. CTA final      → que no acabe en callejón sin salida.
 *
 * Todos los bloques son plug-and-play: si el dato no está en el frontmatter,
 * la sección devuelve null y no se pinta. Nada inventado.
 */
export default function ArtistPage({
  params,
}: {
  params: { slug: string };
}) {
  const a = getArtist(params.slug);
  if (!a) notFound();

  const photo = a.image ?? findAsset("artistas", a.slug);

  // Carrusel navegable: TODOS los artistas en un orden único y consistente
  // (destacados primero, luego el resto), sin importar por cuál se haya
  // entrado. Las flechas (teclado o pantalla) recorren el roster entero.
  const all = getArtists();
  const featured = FEATURED_ORDER.map((slug) => all.find((x) => x.slug === slug)).filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );
  const rest = all.filter((x) => !FEATURED_ORDER.includes(x.slug));
  const ordered = [...featured, ...rest];
  const showcase: ShowcaseArtist[] = ordered.map((x) => {
    const illustration = findAsset("artistas/ilustracion", x.slug);
    const xPhoto = x.image ?? findAsset("artistas", x.slug);
    return {
      slug: x.slug,
      name: x.name,
      genre: x.genre,
      bioLine: x.bio[0] ?? "",
      image: illustration ?? xPhoto,
      isIllustration: Boolean(illustration),
      spotifyUrl: x.spotifyArtistId
        ? `https://open.spotify.com/artist/${x.spotifyArtistId}`
        : undefined,
      instagramUrl: x.instagram,
      // Canción del botón "Escuchar a X" (su audio si lo tiene, o el de Bonito).
      audioSrc: findArtistAudio(x.slug),
    };
  });

  const hasGallery = a.gallery && a.gallery.length > 0;

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

      {/* 1. Hero: carrusel (nombre + género cian + bio + Spotify/IG + flechas). */}
      <ArtistShowcase artists={showcase} startSlug={a.slug} />

      {/* 2. Números: prueba social de un vistazo. */}
      <ArtistNumbers stats={a.stats ?? []} />

      {/* 3. Música: que se escuche ya. */}
      <ArtistFeaturedMusic
        name={a.name}
        lastTrackId={a.lastTrackId}
        featuredTrackIds={a.featuredTracks}
        spotifyArtistId={a.spotifyArtistId}
        spotifyPlaylistId={a.spotifyPlaylistId}
      />

      {/* 4. Su mundo: reels + YouTube intercalados. Va aquí, pegado a la
          música, mientras el visitante está en modo "ver y escuchar" — no
          tirado al final de la página. */}
      <ArtistLiveFeed name={a.name} reels={a.reels} youtubeIds={a.youtubeIds} />

      {/* 5. Su sonido. */}
      <ArtistStyle
        genre={a.genre}
        style={a.musicStyle}
        influences={a.influences}
      />

      {/* 6. Su historia: la bio currada (el 1er párrafo ya va en el hero). */}
      <ArtistBio paragraphs={a.bio.slice(1)} name={a.name} photo={photo} />

      {/* 7. Directo: de su primer bolo a hoy + trayectoria. */}
      <ArtistConcerts
        firstConcert={a.firstConcert}
        lastConcert={a.lastConcert}
        milestones={a.milestones}
      />

      {/* 8. Galería (si hay fotos). */}
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

      {/* 9. Cierre. */}
      <ArtistCTA
        name={a.name}
        bookingEmail={site.emails.booking}
        instagram={a.instagram}
        slug={a.slug}
      />
    </>
  );
}
