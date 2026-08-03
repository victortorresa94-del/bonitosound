import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import { FaqOpen } from "@/components/FaqOpen";
import { EventoCard } from "@/components/EventoCard";
import { SpotifyEmbed } from "@/components/Embeds";
import { giras as girasData } from "@/lib/giras";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import type { Service } from "@/lib/services";
import { serviceDetail } from "@/lib/servicesDetail";
import { getEventos, getGiras, getArtists } from "@/lib/content";
import { findAsset, findLogo } from "@/lib/assets";
import { brands, site } from "@/lib/site";
import { serverLocale } from "@/lib/locale-server";
import { localePath, t } from "@/lib/i18n";
import { servicioCa } from "@/lib/content-i18n";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/** Ilustración de hero (grabado navy+cian), plug-and-play desde
 *  /public/img/servicios/heroes/<slug>.png. Si no está, el hero va a una columna. */
function heroIllo(slug: string): string | null {
  const rel = `/img/servicios/heroes/${slug}.png`;
  const abs = path.join(process.cwd(), "public", rel.slice(1));
  return fs.existsSync(abs) ? rel : null;
}

/**
 * Plantilla común de las 7 páginas de servicio. Landing con profundidad:
 * hero → intro → "qué hacemos" (con iconos) → proceso → caso (slot) →
 * casos en vídeo → artistas → números → marcas → FAQ → CTA. Cada bloque se
 * pinta SOLO si hay datos (lib/services.ts + lib/servicesDetail.ts).
 */
export function ServicePage({
  service,
  caseSlot,
}: {
  service: Service;
  caseSlot?: ReactNode;
}) {
  // En catalán se sustituye la cabecera (rótulo, titular y entradilla). Lo que
  // aún no esté traducido se queda en castellano en vez de desaparecer.
  const locale = serverLocale();
  const trad = locale === "ca" ? servicioCa(service.slug) : undefined;
  const eyebrow = trad?.eyebrow ?? service.eyebrow;
  const h1 = trad?.h1 ?? service.h1;
  const h1Cyan = trad ? trad.h1Cyan : service.h1Cyan;
  const desc = trad?.desc ?? service.desc;

  const mailto = `mailto:${site.emails.booking}?subject=${encodeURIComponent(service.ctaSubject)}`;
  const illo = heroIllo(service.slug);
  const d = serviceDetail[service.slug] ?? {};

  // Los casos pueden ser eventos de marca o giras (viven en carpetas distintas).
  const caseEventos = d.caseVideos
    ? d.caseVideos
        .map((s) => getEventos().find((e) => e.slug === s) ?? getGiras().find((g) => g.slug === s))
        .filter(Boolean)
    : [];
  // Giras a destacar: los datos duros salen de lib/giras.ts, y la tarjeta
  // enlaza a /giras/[slug]. Si un slug no existe, se cae solo.
  const giraCases = (d.giraSlugs ?? []).flatMap((s) => {
    const g = girasData.find((x) => x.slug === s);
    return g ? [g] : [];
  });

  const caseArtists = d.artistSlugs
    ? d.artistSlugs
        .map((s) => {
          const a = getArtists().find((x) => x.slug === s);
          return a ? { ...a, photo: a.image ?? findAsset("artistas", a.slug) } : null;
        })
        .filter((a): a is NonNullable<typeof a> => Boolean(a && a.photo))
    : [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${eyebrow} — Bonito Sound`,
          description: desc,
          provider: { "@type": "Organization", name: site.legalName },
          areaServed: "ES",
          url: `${site.url}${service.path}`,
          mainEntityOfPage: {
            "@type": "FAQPage",
            mainEntity: service.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        }}
      />

      {/* HERO */}
      <section className="border-b border-subtle">
        <div className={`wrap grid items-center gap-10 py-16 md:py-24 ${illo ? "md:grid-cols-[1.05fr_0.95fr]" : ""}`}>
          <div className={illo ? "" : "max-w-3xl"}>
            <RevealOnScroll as="p" className="eyebrow mb-4">{eyebrow}</RevealOnScroll>
            {h1Cyan && h1.includes(h1Cyan) ? (
              <RevealOnScroll as="h1" className="display text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.02]">
                {h1.slice(0, h1.indexOf(h1Cyan))}
                <span style={{ color: CYAN }}>{h1Cyan}</span>
                {h1.slice(h1.indexOf(h1Cyan) + h1Cyan.length)}
              </RevealOnScroll>
            ) : (
              <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
                {h1}
              </SplitTextReveal>
            )}
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>{desc}</RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}><Cta href={mailto}>{t(locale, "cta.hablamos")} →</Cta></MagneticButton>
            </RevealOnScroll>
          </div>
          {illo && (
            <RevealOnScroll className="order-first md:order-none" delay={0.15}>
              <Image src={illo} alt="" width={720} height={620} priority className="mx-auto h-auto w-full max-w-[440px] object-contain md:max-w-[480px]" />
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* QUÉ HACEMOS — con iconos, JUSTO tras el hero (o fallback simple).
          El grid se adapta: 4 items → una sola línea (sin hueco cojo); 6 → dos
          filas de tres. */}
      {d.whatWeDo ? (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-10">{tr(locale, d.whatWeDoTitle ?? "Qué hacemos")}</RevealOnScroll>
          <StaggerGroup
            stagger={0.07}
            className={`grid gap-6 sm:grid-cols-2 ${d.whatWeDo.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
          >
            {d.whatWeDo.map((w) => (
              <div key={w.title} className="card group flex flex-col transition-transform duration-300 hover:-translate-y-1">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-cyan/10 transition-all duration-300 group-hover:-rotate-6 group-hover:bg-accent-cyan/20" style={{ color: NAVY }}>
                  <ServiceIcon name={w.icon} className="transition-transform duration-300 group-hover:scale-110" />
                </span>
                <h3 className="display text-xl leading-tight">{tr(locale, w.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{tr(locale, w.desc)}</p>
              </div>
            ))}
          </StaggerGroup>
        </Section>
      ) : (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-8">{tr(locale, "Qué ponemos")}</RevealOnScroll>
          <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-3">
            {service.aspects.map((a) => (
              <div key={a.name} className="card flex flex-col">
                <h3 className="display text-xl">{tr(locale, a.name)}</h3>
                <p className="mt-3 text-sm text-text-secondary">{tr(locale, a.desc)}</p>
              </div>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* FRASE — el statement va DEBAJO de los iconos (queda mejor que suelto
          justo tras el hero). Con su garabato cian (el "rollo" Bonito). */}
      {d.intro && (
        <Section>
          <RevealOnScroll as="p" className="statement mx-auto max-w-4xl text-center text-[clamp(1.5rem,3.4vw,2.5rem)] leading-tight text-text-primary">
            {tr(locale, d.intro)}
          </RevealOnScroll>
          <RevealOnScroll className="mx-auto mt-7 w-40" delay={0.15}>
            <svg viewBox="0 0 160 16" fill="none" aria-hidden className="h-4 w-full">
              <path d="M3 9 C 28 2, 52 2, 78 9 S 128 15, 157 6" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </RevealOnScroll>
        </Section>
      )}

      {/* PROCESO — pasos numerados. */}
      {d.process && (
        <Section>
          <RevealOnScroll as="p" className="eyebrow mb-10">{tr(locale, d.processTitle ?? "Cómo trabajamos")}</RevealOnScroll>
          <StaggerGroup stagger={0.08} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {d.process.map((p, i) => (
              <div key={p.title} className="relative">
                <span className="font-round text-5xl font-bold leading-none" style={{ color: CYAN }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 display text-xl leading-tight">{tr(locale, p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{tr(locale, p.desc)}</p>
              </div>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* Caso destacado por página (slot: artista + Spotify, ediciones…). */}
      {caseSlot}

      {/* GIRAS REALES — para producción de giras. Enlazan a /giras/[slug], que
          es donde vive el relato completo: no se duplica aquí. */}
      {giraCases.length > 0 && (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-3">
            {tr(locale, d.giraSlugsTitle ?? "Giras")}
          </RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display mb-10 text-[clamp(1.8rem,4vw,3rem)]">
            {tr(locale, "Lo hemos llevado. No lo contamos.")}
          </SplitTextReveal>
          <StaggerGroup stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {giraCases.map((g) => (
              <Link
                key={g.slug}
                href={`/giras/${g.slug}`}
                className="group rounded-2xl border border-subtle p-6 transition-colors duration-300 hover:border-text-primary/25"
              >
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
                  {g.artist}
                </p>
                <h3 className="display mt-1.5 text-xl leading-tight" style={{ color: NAVY }}>
                  {g.tour}
                </h3>
                <p className="mt-2 font-mono text-xs tabular-nums text-text-muted">
                  {[g.years ?? g.year, g.shows].filter(Boolean).join(" · ")}
                </p>
                <span
                  className="mt-4 inline-block text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: CYAN }}
                >
                  {tr(locale, "Ver la gira →")}
                </span>
              </Link>
            ))}
          </StaggerGroup>
          <RevealOnScroll className="mt-10">
            <Link href="/giras" className="link-underline text-sm font-semibold" style={{ color: CYAN }}>
              {tr(locale, "Todas las giras →")}
            </Link>
          </RevealOnScroll>
        </Section>
      )}

      {/* CASOS EN VÍDEO — eventos reales. */}
      {caseEventos.length > 0 && (
        <Section className="bg-bg-primary">
          <RevealOnScroll as="p" className="eyebrow mb-3">{tr(locale, d.caseVideosTitle ?? "Casos")}</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display mb-10 text-[clamp(1.8rem,4vw,3rem)]">
            {tr(locale, "Lo hemos montado. No lo contamos.")}
          </SplitTextReveal>
          <StaggerGroup stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseEventos.map((e) => (
              <EventoCard key={e!.slug} evento={e!} />
            ))}
          </StaggerGroup>
          <RevealOnScroll className="mt-10">
            <Link href="/experiencias" className="link-underline text-sm font-semibold" style={{ color: CYAN }}>
              {tr(locale, "Ver todos los eventos →")}
            </Link>
          </RevealOnScroll>
        </Section>
      )}

      {/* ARTISTAS destacados. */}
      {caseArtists.length > 0 && (
        <Section>
          <RevealOnScroll as="p" className="eyebrow mb-8">{tr(locale, d.artistsTitle ?? "A quién llevamos")}</RevealOnScroll>
          <StaggerGroup stagger={0.06} className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {caseArtists.map((a) => (
              <Link key={a.slug} href={localePath(`/artistas/${a.slug}`, locale)} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  <Image src={a.photo!} alt={a.name} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3">
                    <span className="font-round text-base font-bold text-white">{a.name}</span>
                  </span>
                </div>
              </Link>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* PRUEBA SOCIAL — con marcas: banda navy con números (blancos) + muro de
          logos normalizados a blanco (visibles sí o sí), un solo bloque fuerte.
          Sin marcas: banda de números sobre crema. */}
      {d.showBrands ? (
        <section className="w-full" style={{ backgroundColor: NAVY }}>
          <div className="wrap py-16 md:py-24">
            {d.stats && d.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 pb-12 md:grid-cols-4">
                {d.stats.map((s) => (
                  <div key={s.l}>
                    <p className="font-round font-bold leading-none text-white" style={{ fontSize: "clamp(2.6rem,6vw,4.4rem)" }}>{s.n}</p>
                    <p className="mt-2 text-sm font-semibold uppercase leading-tight tracking-wide text-white/60">{tr(locale, s.l)}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>{tr(locale, "Marcas que han confiado")}</p>
              <Link href="/experiencias" className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline">Ver los eventos →</Link>
            </div>
            <StaggerGroup stagger={0.04} className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              {brands
                .map((b) => ({ b, src: findLogo("marcas", b) }))
                // Solo logos de verdad (fuera las fotos .jpg de monkey/sainte);
                // cada uno en chip blanco → se ve en su color, sea el que sea.
                .filter((x) => x.src && !/\.jpe?g$/i.test(x.src))
                .map(({ b, src }) => (
                  <div key={b} className="flex h-16 items-center justify-center rounded-xl bg-white px-5 md:h-[4.5rem] md:px-7">
                    <Image src={src!} alt={b} width={150} height={44} className="h-7 w-auto max-w-[130px] object-contain md:h-9" />
                  </div>
                ))}
            </StaggerGroup>
          </div>
        </section>
      ) : d.spotifyPlaylistId ? (
        /* En records la prueba no es un número, es poder darle al play: la
           playlist ocupa el banner entero. */
        <Section className="bg-bg-primary">
          {d.spotifyPlaylistTitle && (
            <RevealOnScroll as="p" className="eyebrow mb-6">
              {tr(locale, d.spotifyPlaylistTitle)}
            </RevealOnScroll>
          )}
          <RevealOnScroll delay={0.08}>
            <SpotifyEmbed
              type="playlist"
              id={d.spotifyPlaylistId}
              height={420}
              title={d.spotifyPlaylistTitle ?? "Playlist de Bonito Sound"}
            />
          </RevealOnScroll>
        </Section>
      ) : d.stats && d.stats.length > 0 ? (
        <Section className="bg-bg-primary">
          <div className={`grid gap-x-8 gap-y-10 ${d.stats.length === 1 ? "" : "grid-cols-2 md:grid-cols-4"}`}>
            {d.stats.map((s) => (
              <div key={s.l}>
                <p className="font-round font-bold leading-none" style={{ color: NAVY, fontSize: "clamp(2.6rem,6vw,4.4rem)" }}>{s.n}</p>
                <p className="mt-2 text-sm font-semibold uppercase leading-tight tracking-wide" style={{ color: NAVY }}>{tr(locale, s.l)}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* CTA de contacto — justo ANTES de las FAQ (cierra la venta y deja las
          dudas para el final). */}
      <Section>
        <CtaBlock
          title={tr(locale, service.cta.h2)}
          desc={tr(locale, service.cta.desc)}
          href={localePath("/contacto", locale)}
        />
      </Section>

      {/* FAQ (cierre de la página) */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-8">{tr(locale, "Preguntas frecuentes")}</RevealOnScroll>
        <FaqOpen items={service.faq.map((f) => ({ ...f, q: tr(locale, f.q), a: tr(locale, f.a) }))} />
      </Section>
    </>
  );
}
