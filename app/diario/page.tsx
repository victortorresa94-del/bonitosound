import type { Metadata } from "next";
import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import { RevealOnScroll, SplitTextReveal, MagneticButton, StaggerGroup } from "@/components/motion";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const posts = getPosts();

export function generateMetadata(): Metadata {
  return {
  title: "Blog — Bonito Sound",
  description:
    "El blog de Bonito Sound: cómo funciona la industria de la música por dentro, booking, sellos, distribución y eventos de marca. Sin postureo.",
  alternates: alternatesFor(`/diario`),
  // Se indexa solo cuando hay al menos un artículo real.
  robots: posts.length > 0 ? undefined : { index: false, follow: true },
  };
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Diario() {
  const locale = serverLocale();
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Blog
            </RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              {tr(locale, "Lo que va pasando, sin postureo.")}
            </SplitTextReveal>
            <RevealOnScroll as="p" delay={0.2} className="mt-6 max-w-2xl text-lg text-text-secondary">
              Cómo funciona esto por dentro: booking, sellos, distribución,
              eventos de marca. Lo que nos gustaría que alguien nos hubiera
              contado cuando empezamos.
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {posts.length > 0 ? (
        <Section>
          <StaggerGroup stagger={0.06} className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/diario/${p.slug}`}
                className="card group flex flex-col justify-between"
                data-cursor="link"
              >
                <div>
                  <p className="eyebrow mb-3">
                    {p.cluster ?? "Blog"} · {fmtDate(p.date)}
                  </p>
                  <h2 className="display text-[clamp(1.4rem,3vw,2rem)] leading-tight text-text-primary transition-colors group-hover:text-accent-cyan">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-text-secondary">{p.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full border border-subtle px-3 py-1 text-xs font-semibold text-text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-accent-cyan transition-transform group-hover:translate-x-1">
                    {tr(locale, "Leer →")}
                  </span>
                </div>
              </Link>
            ))}
          </StaggerGroup>
        </Section>
      ) : (
        <Section>
          <div className="rounded-3xl border border-subtle bg-bg-primary p-12 text-center">
            <SplitTextReveal as="h3" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
              {tr(locale, "Todavía no hemos escrito nada aquí.")}
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mx-auto mt-4 max-w-lg text-text-secondary" delay={0.2}>
              El blog se llena cuando hay algo que contar de verdad. Mientras
              tanto, lo que se cuece está en Instagram.
            </RevealOnScroll>
            <RevealOnScroll className="mt-8 flex justify-center" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={site.social.instagram}>Ver @bonito_sound →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </Section>
      )}
    </>
  );
}
