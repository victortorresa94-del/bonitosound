import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import { R2Video } from "@/components/R2Video";
import { YouTubeEmbed } from "@/components/Embeds";
import { RevealOnScroll, StaggerGroup, SplitTextReveal } from "@/components/motion";
import { getGira, getGiraSlugs, getGiras } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { giras } from "@/lib/giras";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function generateStaticParams() {
  return getGiraSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGira(params.slug);
  if (!g) return {};
  return {
    title: `${g.title} | Bonito Sound`,
    description: g.context,
    alternates: { canonical: `${site.url}/giras/${g.slug}` },
  };
}

export default function GiraPage({ params }: { params: { slug: string } }) {
  const g = getGira(params.slug);
  if (!g) notFound();

  // Los datos duros (años, nº de conciertos) mandan desde lib/giras.ts, que es
  // lo que confirmó Dani; el markdown aporta el relato.
  const meta = giras.find((x) => x.slug === params.slug);
  const cover = findAsset("giras", g.slug);

  const facts = [
    ...(meta?.years || g.year ? [{ k: "Años", v: meta?.years ?? g.year }] : []),
    ...(meta?.shows ? [{ k: "Conciertos", v: meta.shows }] : []),
    ...(g.location ? [{ k: "Dónde", v: g.location }] : []),
  ];

  // Otras giras del mismo artista que tengan página.
  const masDelArtista = getGiras().filter(
    (x) => x.slug !== g.slug && x.artist === g.artist,
  );

  return (
    <div style={{ backgroundColor: "#FBFAF6" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: g.title,
          description: g.context,
          ...(g.location ? { location: { "@type": "Place", name: g.location } } : {}),
          performer: { "@type": "MusicGroup", name: g.artist },
          organizer: { "@type": "Organization", name: site.legalName },
        }}
      />

      {/* HERO */}
      <section className="border-b border-subtle">
        <div className="wrap py-16 md:py-24">
          <RevealOnScroll className="mb-6">
            <Link
              href="/giras"
              className="text-sm font-semibold text-text-muted underline-offset-4 transition-colors hover:text-accent-cyan hover:underline"
            >
              ← Todas las giras
            </Link>
          </RevealOnScroll>

          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <div>
              <RevealOnScroll as="p" className="eyebrow mb-4">
                {meta?.artist ?? g.artist}
              </RevealOnScroll>
              <SplitTextReveal
                as="h1"
                split="lines"
                className="display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04]"
              >
                {meta?.tour ?? g.title}
              </SplitTextReveal>
              {g.context && (
                <RevealOnScroll
                  as="p"
                  delay={0.15}
                  className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
                >
                  {g.context}
                </RevealOnScroll>
              )}

              {facts.length > 0 && (
                <StaggerGroup stagger={0.07} className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                  {facts.map((f) => (
                    <div key={f.k}>
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                        {f.k}
                      </p>
                      <p className="mt-1 font-round text-lg font-bold" style={{ color: NAVY }}>
                        {f.v}
                      </p>
                    </div>
                  ))}
                </StaggerGroup>
              )}
            </div>

            {/* Foto de la gira, en polaroid como en la ruta. */}
            {cover && (
              <RevealOnScroll delay={0.12}>
                <figure
                  className="relative mx-auto max-w-[24rem] bg-white p-3 pb-4 shadow-[0_10px_30px_rgba(20,40,60,0.13)]"
                  style={{ transform: "rotate(1.6deg)" }}
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 h-6 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[2px]"
                    style={{ backgroundColor: "rgba(214,199,166,0.75)" }}
                  />
                  <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: NAVY }}>
                    <Image
                      src={cover}
                      alt={`${g.artist} — ${meta?.tour ?? g.title}`}
                      fill
                      sizes="(max-width: 768px) 90vw, 380px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {meta?.credit && (
                    <figcaption className="pt-2 text-center text-[0.6rem] text-text-muted/70">
                      © {meta.credit}
                    </figcaption>
                  )}
                </figure>
              </RevealOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* QUÉ PUSIMOS + EL RELATO */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          {g.services && g.services.length > 0 && (
            <RevealOnScroll>
              <p className="eyebrow mb-5">Qué pusimos</p>
              <ul className="space-y-2.5">
                {g.services.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-text-secondary">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: CYAN }}
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          )}

          {g.body.length > 0 && (
            <RevealOnScroll delay={0.1} className="space-y-5 text-lg leading-relaxed text-text-secondary">
              {g.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {g.result && (
                <p className="pt-2 text-xl font-semibold leading-snug" style={{ color: NAVY }}>
                  {g.result}
                </p>
              )}
            </RevealOnScroll>
          )}
        </div>
      </Section>

      {/* VÍDEO */}
      {(g.video || g.youtubeId) && (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-6">El vídeo lo cuenta mejor</RevealOnScroll>
          <RevealOnScroll delay={0.08} className="mx-auto max-w-3xl">
            {g.youtubeId ? (
              <YouTubeEmbed id={g.youtubeId} title={g.title} />
            ) : (
              <R2Video src={g.video!} ratio="16 / 9" />
            )}
          </RevealOnScroll>
        </Section>
      )}

      {/* OTRAS GIRAS DEL MISMO ARTISTA */}
      {masDelArtista.length > 0 && (
        <Section>
          <RevealOnScroll as="p" className="eyebrow mb-6">
            Más de {g.artist}
          </RevealOnScroll>
          <StaggerGroup stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {masDelArtista.map((o) => {
              const om = giras.find((x) => x.slug === o.slug);
              return (
                <Link
                  key={o.slug}
                  href={`/giras/${o.slug}`}
                  className="rounded-2xl border border-subtle p-5 transition-colors duration-300 hover:border-text-primary/25"
                >
                  <h3 className="display text-lg leading-tight" style={{ color: NAVY }}>
                    {om?.tour ?? o.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs tabular-nums text-text-muted">
                    {[om?.years ?? o.year, om?.shows].filter(Boolean).join(" · ")}
                  </p>
                </Link>
              );
            })}
          </StaggerGroup>
        </Section>
      )}

      <Section>
        <CtaBlock
          title="¿Tienes una gira que mover?"
          desc="Cuéntanos las fechas y el proyecto. Te decimos cómo la montamos y por dónde empezaríamos."
          href="/contacto"
          cta="Cuéntanos tu gira →"
        />
      </Section>
    </div>
  );
}
