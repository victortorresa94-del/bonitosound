import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta, JsonLd } from "@/components/ui";
import { EventoCard } from "@/components/EventoCard";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { getEvento, getEventos } from "@/lib/content";
import { findAsset, findLogo } from "@/lib/assets";
import { site } from "@/lib/site";

const TYPE_LABEL = {
  marca: "Evento de marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
} as const;

/** Clip de la mascota que acompaña cada tipo — guiño de marca. */
const TYPE_CLIP: Record<string, string> = {
  marca: "/video/home/marcas.mp4",
  gira: "/video/home/giras.mp4",
  festival: "/video/home/cierre.mp4",
  showcase: "/video/home/records.mp4",
};

export function generateStaticParams() {
  return getEventos().map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getEvento(params.slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.context,
    alternates: { canonical: `${site.url}/eventos/${e.slug}` },
  };
}

export default function EventoPage({ params }: { params: { slug: string } }) {
  const e = getEvento(params.slug);
  if (!e) notFound();

  const cover = findAsset("eventos", e.slug);
  const label = e.brand ?? e.artist;
  const logo = e.brand ? findLogo("marcas", e.brand) : null;
  const meta = [e.location, e.year].filter(Boolean).join(" · ");
  const cinematic = Boolean(e.video || cover);

  const others = getEventos()
    .filter((x) => x.slug !== e.slug)
    .slice(0, 3);

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

      {cinematic ? (
        /* Hero cinematográfico: media a sangre + degradado + título encima. */
        <section className="relative flex h-[78svh] min-h-[520px] items-end overflow-hidden border-b border-subtle bg-text-primary">
          {e.video ? (
            <video
              src={e.video}
              poster={cover ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
          ) : cover ? (
            <Image
              src={cover}
              alt={e.title}
              fill
              sizes="100vw"
              className="object-cover opacity-90"
              priority
            />
          ) : null}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
          />
          <div className="wrap relative z-10 pb-14 md:pb-20">
            <RevealOnScroll as="p" className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              {TYPE_LABEL[e.type]}
              {label ? ` · ${label}` : ""}
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] text-white"
            >
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
        /* Sin media aún: hero editorial en crema con el logo de marca grande. */
        <section className="border-b border-subtle">
          <div className="wrap grid items-center gap-10 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
            <div>
              <RevealOnScroll as="p" className="eyebrow mb-4">
                {TYPE_LABEL[e.type]}
                {label ? ` · ${label}` : ""}
              </RevealOnScroll>
              <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.4rem,6vw,4.6rem)]">
                {e.title}
              </SplitTextReveal>
              {meta && (
                <RevealOnScroll as="p" className="mt-5 text-sm text-text-muted" delay={0.2}>
                  {meta}
                </RevealOnScroll>
              )}
            </div>
            <div className="flex items-center justify-center rounded-2xl border border-subtle bg-bg-tertiary p-12">
              {logo ? (
                <Image src={logo} alt={e.brand ?? e.title} width={280} height={140} className="max-h-24 w-auto object-contain" />
              ) : (
                <span className="display text-3xl text-text-muted">{label ?? "Bonito Sound"}</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* El encargo / El resultado. */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <RevealOnScroll>
            <p className="eyebrow mb-4">El encargo</p>
            <div className="space-y-5 text-lg leading-relaxed text-text-secondary">
              {e.body.length > 0 ? e.body.map((p, i) => <p key={i}>{p}</p>) : <p>{e.context}</p>}
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <p className="eyebrow mb-4">El resultado</p>
            <p className="statement text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-text-primary">
              {e.result}
            </p>
            {/* Guiño de marca: clip del tipo de evento. */}
            <div aria-hidden className="mt-10 hidden aspect-video w-44 opacity-90 md:block">
              <video
                src={TYPE_CLIP[e.type] ?? "/video/home/que-es.mp4"}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Vídeo en YouTube (si el hero no lo era ya). */}
      {e.youtubeId && !e.video && (
        <Section className="bg-bg-primary pt-0">
          <RevealOnScroll as="p" className="eyebrow mb-8">
            El vídeo lo cuenta mejor
          </RevealOnScroll>
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
        </Section>
      )}

      {e.gallery && e.gallery.length > 0 && (
        <Section className="pt-0">
          <RevealOnScroll as="p" className="eyebrow mb-8">
            Galería
          </RevealOnScroll>
          <StaggerGroup stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {e.gallery.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-subtle">
                <Image src={src} alt={e.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* Otros eventos + CTA: sin callejón sin salida. */}
      {others.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="mb-10 flex items-end justify-between gap-6">
            <p className="eyebrow">Más eventos</p>
            <Link href="/eventos" className="link-underline text-sm text-text-secondary">
              Ver todos →
            </Link>
          </div>
          <StaggerGroup stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <EventoCard key={o.slug} evento={o} />
            ))}
          </StaggerGroup>
        </Section>
      )}

      <Section className={others.length > 0 ? "pt-0" : undefined}>
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            ¿Montamos el tuyo?
          </SplitTextReveal>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Cuéntanos qué tienes en la cabeza. Te decimos qué se puede hacer de verdad.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton strength={0.4}>
              <Cta href="/contacto">Hablamos de tu evento →</Cta>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
