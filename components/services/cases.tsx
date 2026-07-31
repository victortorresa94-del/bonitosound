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
import { findAsset, findLogo, assetSlug } from "@/lib/assets";
import { brands, distributionCatalog, distributionPlatforms } from "@/lib/site";

const CYAN = "#16b6d4";

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

/** Glyph genérico (barras de sonido) para las plataformas sin logo propio. */
function WaveGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4" />
    </svg>
  );
}

/** Chip de plataforma: si hay logo en /img/plataformas/<slug>, se usa; si no,
 *  un chip limpio con el nombre (mismo tamaño, se ve uniforme). */
function PlatformChip({ name }: { name: string }) {
  const logo = findLogo("plataformas", name);
  return (
    <div className="flex h-14 items-center gap-2.5 rounded-full border border-subtle bg-bg-primary px-5 shadow-sm md:h-16 md:px-6">
      {logo ? (
        <Image src={logo} alt={name} width={130} height={32} className="h-6 w-auto max-w-[130px] object-contain md:h-7" />
      ) : (
        <>
          <span style={{ color: CYAN }}><WaveGlyph /></span>
          <span className="font-round text-base font-bold text-text-primary md:text-lg">{name}</span>
        </>
      )}
    </div>
  );
}

/**
 * Caso de la página de distribución: la prueba de que esto funciona.
 * Plataformas (dónde llega) + números + catálogo de artistas (con quién) +
 * cómo funciona el precio (genérico, sin cifras — pendiente de cerrar con Dani).
 */
export function DistribucionCase() {
  const stats = [
    { n: "+150", l: "lanzamientos" },
    { n: "~20", l: "artistas" },
    { n: "2022", l: "distribuyendo desde" },
  ];
  return (
    <>
      {/* PLATAFORMAS */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">En todas las plataformas</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(1.8rem,4vw,3rem)]">
          Que suene donde tenga que sonar.
        </SplitTextReveal>
        <StaggerGroup stagger={0.05} className="mt-10 flex flex-wrap gap-3 md:gap-4">
          {distributionPlatforms.map((p) => (
            <PlatformChip key={p} name={p} />
          ))}
        </StaggerGroup>
        <RevealOnScroll as="p" className="mt-6 text-sm text-text-muted" delay={0.1}>
          Y en el resto de tiendas y redes donde la gente descubre y guarda música.
        </RevealOnScroll>
      </Section>

      {/* NÚMEROS + CATÁLOGO */}
      <Section>
        <div className="grid gap-x-8 gap-y-8 border-b border-subtle pb-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-round font-bold leading-none" style={{ color: "#14283C", fontSize: "clamp(2.6rem,6vw,4.4rem)" }}>{s.n}</p>
              <p className="mt-2 text-sm font-semibold uppercase leading-tight tracking-wide" style={{ color: "#14283C" }}>{s.l}</p>
            </div>
          ))}
        </div>

      </Section>

      {/* PRECIO (genérico, sin cifras — Dani cierra el modelo) */}
      <Section className="bg-bg-primary">
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll as="p" className="eyebrow mb-4">El precio</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(1.8rem,4vw,2.8rem)]">
            Hablado antes de empezar. Sin sorpresas.
          </SplitTextReveal>
          <RevealOnScroll as="p" className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary" delay={0.15}>
            La distribución se ajusta a lo que necesitas —un single suelto o todo tu
            catálogo— y lo cerramos contigo antes de subir nada. Sin letra pequeña:
            tu música sigue siendo tuya.
          </RevealOnScroll>
          <RevealOnScroll className="mx-auto mt-7 w-40" delay={0.2}>
            <svg viewBox="0 0 160 16" fill="none" aria-hidden className="h-4 w-full">
              <path d="M3 9 C 28 2, 52 2, 78 9 S 128 15, 157 6" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </RevealOnScroll>
        </div>
      </Section>
    </>
  );
}

/** Caso de producciones: muro de marcas + enlace a los eventos reales. */
export function BrandsCase() {
  return (
    <Section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <RevealOnScroll as="p" className="eyebrow">Marcas que han confiado</RevealOnScroll>
        <Link href="/experiencias" className="link-underline text-sm text-text-secondary">Ver los eventos →</Link>
      </div>
      <MarqueeLogoWall items={brands} dir="marcas" speed={42} direction="right" />
    </Section>
  );
}
