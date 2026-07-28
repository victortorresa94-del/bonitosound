import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import { EventoCard } from "@/components/EventoCard";
import { EventHeroVideo } from "@/components/eventos/EventHeroVideo";
import { R2Video } from "@/components/R2Video";
import { RevealOnScroll, StaggerGroup, SplitTextReveal } from "@/components/motion";
import { getEvento, getEventos } from "@/lib/content";
import { findAsset, findLogo } from "@/lib/assets";
import { site } from "@/lib/site";

const NAVY = "#14283C";

const TYPE_LABEL = {
  marca: "Evento de marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
} as const;

// Título de la sección de "más eventos", según el tipo del que estás viendo.
const MORE_TITLE: Record<string, string> = {
  marca: "Más eventos de marca",
  gira: "Más giras y directos",
  festival: "Más directos que hemos montado",
  showcase: "Más directos que hemos montado",
};

export function generateStaticParams() {
  return getEventos().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEvento(params.slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.context,
    alternates: { canonical: `${site.url}/experiencias/${e.slug}` },
  };
}

export default function EventoPage({ params }: { params: { slug: string } }) {
  const e = getEvento(params.slug);
  if (!e) notFound();

  const cover = findAsset("eventos", e.slug);
  const label = e.brand ?? e.artist;
  const logo = e.brand ? findLogo("marcas", e.brand) : null;
  const meta = [e.location, e.year].filter(Boolean).join(" · ");
  const hasVideo = Boolean(e.video);
  const cinematic = Boolean(e.video || cover);

  // La .webp acompaña al texto del caso SOLO si no es ya el hero (si el hero es
  // vídeo). Si el hero ya es la foto, al lado del texto va un panel de marca.
  const storyImage = hasVideo ? cover : null;

  // Ficha: datos reales del evento (nada inventado).
  const facts = [
    { k: "Tipo", v: TYPE_LABEL[e.type] as string },
    { k: e.brand ? "Marca" : "Artista", v: label },
    { k: "Año", v: e.year },
    ...(e.location ? [{ k: "Dónde", v: e.location }] : []),
    ...(e.capacity ? [{ k: "Aforo", v: e.capacity }] : []),
    ...(e.count ? [{ k: "Volumen", v: e.count }] : []),
  ].filter((f) => Boolean(f.v)) as { k: string; v: string }[];

  // Relacionados: misma marca → mismo artista → mismo tipo con vídeo → resto
  // con vídeo → resto. Sin duplicados, con vídeo por delante (más vivo).
  const all = getEventos().filter((x) => x.slug !== e.slug);
  const ordered = [
    ...all.filter((x) => e.brand && x.brand === e.brand),
    ...all.filter((x) => e.artist && x.artist === e.artist),
    ...all.filter((x) => x.type === e.type && x.video),
    ...all.filter((x) => x.video),
    ...all,
  ];
  const seen = new Set<string>();
  const related = ordered.filter((x) => (seen.has(x.slug) ? false : seen.add(x.slug))).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: e.title,
          startDate: e.year,
          location: e.location ? { "@type": "Place", name: e.location } : undefined,
          organizer: { "@type": "Organization", name: site.legalName },
          performer: e.artist ? { "@type": "PerformingGroup", name: e.artist } : undefined,
        }}
      />

      {/* ── HERO ── */}
      {cinematic ? (
        <section className="relative flex h-[80svh] min-h-[520px] items-end overflow-hidden border-b border-subtle bg-text-primary">
          {e.video ? (
            <EventHeroVideo src={e.video} poster={cover ?? undefined} label={label ?? e.title} />
          ) : cover ? (
            <Image src={cover} alt={e.title} fill sizes="100vw" className="object-cover opacity-90" priority />
          ) : null}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="wrap relative z-10 pb-14 md:pb-20">
            <RevealOnScroll as="p" className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              {TYPE_LABEL[e.type]}
              {label ? ` · ${label}` : ""}
            </RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] text-white">
              {e.title}
            </SplitTextReveal>
            {meta && (
              <RevealOnScroll as="p" className="mt-5 text-sm text-white/70" delay={0.2}>
                {meta}
              </RevealOnScroll>
            )}
          </div>
        </section>
      ) : (
        /* Sin media: hero navy cinematográfico con el logo/nombre grande. */
        <section
          className="relative flex min-h-[60svh] items-end overflow-hidden border-b border-subtle"
          style={{ background: "radial-gradient(120% 120% at 75% 15%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
        >
          {logo && (
            <div aria-hidden className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 opacity-20 md:right-16 md:block">
              <Image src={logo} alt="" width={360} height={200} className="h-auto w-[min(34vw,360px)] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
            </div>
          )}
          <div className="wrap relative z-10 py-20 md:py-28">
            <RevealOnScroll as="p" className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-cyan">
              {TYPE_LABEL[e.type]}
              {label ? ` · ${label}` : ""}
            </RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.0] text-white">
              {e.title}
            </SplitTextReveal>
            {meta && (
              <RevealOnScroll as="p" className="mt-5 text-sm text-white/60" delay={0.2}>
                {meta}
              </RevealOnScroll>
            )}
          </div>
        </section>
      )}

      {/* ── CABECERA DE CASO: ficha + qué montamos, juntos y densos ── */}
      <Section className={cinematic ? undefined : "pt-0"}>
        <div className="flex flex-wrap gap-x-10 gap-y-6 border-b border-subtle pb-8">
          {facts.map((f) => (
            <div key={f.k} className="min-w-[7rem]">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-cyan-text">{f.k}</p>
              <p className="mt-1 font-round text-lg font-bold leading-tight text-text-primary md:text-xl">{f.v}</p>
            </div>
          ))}
        </div>

        {e.services && e.services.length > 0 && (
          <div className="mt-8">
            <p className="eyebrow mb-4">Qué montó Bonito</p>
            <StaggerGroup stagger={0.04} className="flex flex-wrap gap-2.5">
              {e.services.map((s) => (
                <span key={s} className="rounded-full border border-subtle bg-bg-tertiary px-4 py-1.5 text-sm font-semibold text-text-primary">
                  {s}
                </span>
              ))}
            </StaggerGroup>
          </div>
        )}
      </Section>

      {/* ── EL CASO: historia emparejada con imagen o panel de marca ── */}
      <Section className="pt-0">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <RevealOnScroll>
            <p className="eyebrow mb-4">El encargo</p>
            <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
              {e.body.length > 0 ? e.body.map((p, i) => <p key={i}>{p}</p>) : <p>{e.context}</p>}
            </div>
            <p className="eyebrow mb-3 mt-10">El resultado</p>
            <p className="statement text-[clamp(1.5rem,3vw,2.2rem)] leading-tight text-text-primary">{e.result}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12} className="md:sticky md:top-24">
            {storyImage ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle">
                <Image src={storyImage} alt={e.title} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
              </div>
            ) : (
              /* Panel de marca: logo grande sobre navy + el dato que mande. */
              <div
                className="flex aspect-[4/5] flex-col items-center justify-center gap-6 rounded-2xl p-10 text-center"
                style={{ background: "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
              >
                {logo ? (
                  <Image src={logo} alt={label ?? e.title} width={240} height={120} className="max-h-20 w-auto object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                ) : (
                  <span className="display text-3xl text-white">{label ?? "Bonito Sound"}</span>
                )}
                {e.count && (
                  <p className="font-round text-4xl font-bold text-white md:text-5xl">
                    {e.count}
                  </p>
                )}
              </div>
            )}
          </RevealOnScroll>
        </div>
      </Section>

      {/* ── MÍRALO: el vídeo del evento, reproducible de verdad (con sonido) ── */}
      {(e.video || e.youtubeId) && (
        <Section className="bg-bg-primary pt-0">
          <RevealOnScroll as="p" className="eyebrow mb-3">El vídeo lo cuenta mejor</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display mb-8 text-[clamp(1.8rem,4vw,3rem)]">
            Míralo.
          </SplitTextReveal>
          <RevealOnScroll delay={0.1}>
            {e.video ? (
              <R2Video src={e.video} poster={cover ?? undefined} ratio="16 / 9" />
            ) : (
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-subtle">
                <iframe
                  title={e.title}
                  src={`https://www.youtube-nocookie.com/embed/${e.youtubeId}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            )}
          </RevealOnScroll>
        </Section>
      )}

      {/* ── EN EL CARTEL + CITA ── */}
      {((e.lineup && e.lineup.length > 0) || (e.quote && e.quote.text && e.quote.author)) && (
        <Section className="pt-0">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {e.lineup && e.lineup.length > 0 && (
              <RevealOnScroll>
                <p className="eyebrow mb-5">En el cartel</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {e.lineup.map((name, i) => (
                    <span key={name} className="flex items-center gap-3 font-round text-2xl font-bold text-text-primary md:text-3xl">
                      {i > 0 && <span aria-hidden className="text-accent-cyan-text">·</span>}
                      {name}
                    </span>
                  ))}
                </div>
              </RevealOnScroll>
            )}
            {e.quote && e.quote.text && e.quote.author && (
              <RevealOnScroll delay={0.1} className="border-l-2 border-accent-cyan pl-6 md:pl-10">
                <p className="statement text-[clamp(1.4rem,3vw,2.1rem)] leading-tight text-text-primary">“{e.quote.text}”</p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-text-muted">— {e.quote.author}</p>
              </RevealOnScroll>
            )}
          </div>
        </Section>
      )}

      {/* ── GALERÍA (si hay) ── */}
      {e.gallery && e.gallery.length > 0 && (
        <Section className="pt-0">
          <RevealOnScroll as="p" className="eyebrow mb-8">Galería</RevealOnScroll>
          <StaggerGroup stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {e.gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-subtle">
                <Image src={src} alt={e.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* ── MÁS (relacionados) + CTA ── */}
      {related.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="mb-10 flex items-end justify-between gap-6">
            <p className="eyebrow">{MORE_TITLE[e.type] ?? "Más eventos"}</p>
            <Link href="/experiencias" className="link-underline text-sm text-text-secondary">Ver todos →</Link>
          </div>
          <StaggerGroup stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o) => (
              <EventoCard key={o.slug} evento={o} />
            ))}
          </StaggerGroup>
        </Section>
      )}

      <Section className={related.length > 0 ? "pt-0" : undefined}>
        <CtaBlock
          title="¿Montamos el tuyo?"
          desc="Cuéntanos qué tienes en la cabeza. Te decimos qué se puede hacer de verdad."
          href="/contacto"
          cta="Hablamos de tu evento →"
        />
      </Section>
    </>
  );
}
