import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta, JsonLd } from "@/components/ui";
import { RevealOnScroll, StaggerGroup, SplitTextReveal, MagneticButton } from "@/components/motion";
import { getEvento, getEventos } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";

const TYPE_LABEL = {
  marca: "Evento de marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
} as const;

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

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: e.title,
          startDate: e.year,
          location: e.location
            ? { "@type": "Place", name: e.location }
            : undefined,
          organizer: { "@type": "Organization", name: site.legalName },
          performer: e.artist ? { "@type": "PerformingGroup", name: e.artist } : undefined,
        }}
      />

      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              {TYPE_LABEL[e.type]}
              {label ? ` · ${label}` : ""}
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display text-[clamp(2.4rem,6vw,4.6rem)]"
            >
              {e.title}
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-6 text-lg text-text-secondary" delay={0.15}>
              {e.context}
            </RevealOnScroll>
            {(e.location || e.year) && (
              <RevealOnScroll
                as="p"
                className="mt-4 text-sm text-text-muted"
                delay={0.2}
              >
                {[e.location, e.year].filter(Boolean).join(" · ")}
              </RevealOnScroll>
            )}
          </div>
        </div>
      </section>

      {(e.video || e.youtubeId || cover) && (
        <Section>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
            {e.video ? (
              <video
                src={e.video}
                poster={cover ?? undefined}
                controls
                playsInline
                className="h-full w-full object-cover"
              />
            ) : e.youtubeId ? (
              <iframe
                title={e.title}
                src={`https://www.youtube-nocookie.com/embed/${e.youtubeId}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : cover ? (
              <Image
                src={cover}
                alt={e.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            ) : null}
          </div>
        </Section>
      )}

      <Section className={e.video || e.youtubeId || cover ? "pt-0" : undefined}>
        <div className="grid gap-12 md:grid-cols-2">
          <RevealOnScroll className="max-w-xl space-y-5 text-lg text-text-secondary">
            {e.body.length > 0 ? (
              e.body.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>{e.context}</p>
            )}
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="eyebrow mb-3">Resultado</p>
            <p className="text-lg text-text-secondary">{e.result}</p>
          </RevealOnScroll>
        </div>

        {e.gallery && e.gallery.length > 0 && (
          <StaggerGroup stagger={0.08} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {e.gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-subtle"
              >
                <Image src={src} alt={e.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </StaggerGroup>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-subtle pt-10">
          <Link href="/eventos" className="link-underline text-sm text-text-secondary">
            ← Todos los eventos
          </Link>
          <MagneticButton strength={0.35}>
            <Cta href="/contacto">Hablamos de tu evento →</Cta>
          </MagneticButton>
        </div>
      </Section>
    </>
  );
}
