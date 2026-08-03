import { CtaBlock } from "@/components/CtaBlock";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Faq, JsonLd, Cta } from "@/components/ui";
import { RevealOnScroll, MagneticButton } from "@/components/motion";
import { PostBody } from "@/components/blog/PostBody";
import { getPost, getPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
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

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  const url = `${site.url}/diario/${p.slug}`;
  return {
    title: p.title,
    description: p.description,
    alternates: alternatesFor(`/diario/${p.slug}`),
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      url,
      publishedTime: p.date,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();

  const url = `${site.url}/diario/${p.slug}`;
  const author = p.author ?? site.name;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.date,
          author: { "@type": "Organization", name: author, url: site.url },
          publisher: {
            "@type": "Organization",
            name: site.legalName,
            url: site.url,
          },
          mainEntityOfPage: url,
          inLanguage: "es-ES",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Blog", item: `${site.url}/diario` },
            { "@type": "ListItem", position: 2, name: p.title, item: url },
          ],
        }}
      />
      {p.faq && p.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      {/* Cabecera del artículo */}
      <section className="border-b border-subtle">
        <div className="wrap py-16 md:py-24">
          <Link
            href="/diario"
            className="text-sm font-semibold text-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            ← Blog
          </Link>
          <div className="mt-8 max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              {p.cluster ?? "Blog"} · {fmtDate(p.date)}
            </RevealOnScroll>
            <RevealOnScroll
              as="h1"
              delay={0.05}
              className="display text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.02]"
            >
              {p.title}
            </RevealOnScroll>
            <RevealOnScroll as="p" delay={0.12} className="mt-6 text-lg text-text-secondary md:text-xl">
              {p.description}
            </RevealOnScroll>
            {p.tags && p.tags.length > 0 && (
              <RevealOnScroll delay={0.18} className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-subtle px-3 py-1 text-xs font-semibold text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </RevealOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <Section>
        <PostBody blocks={p.body} />
      </Section>

      {/* FAQ del artículo */}
      {p.faq && p.faq.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="mx-auto max-w-2xl">
            <RevealOnScroll as="p" className="eyebrow mb-8">
              Preguntas frecuentes
            </RevealOnScroll>
            <Faq items={p.faq} />
          </div>
        </Section>
      )}

      {/* CTA al pillar relacionado */}
      <Section>
        <CtaBlock
          title="¿Hablamos de lo tuyo?"
          desc="Si esto te ha sonado a algo que necesitas, cuéntanoslo. Te respondemos nosotros, no un bot."
          href="/contacto"
          cta="Hablamos →"
          secondary={
            p.pillarHref ? (
              <Link href={p.pillarHref} className="underline-offset-4 hover:text-accent-cyan hover:underline">
                Ver más →
              </Link>
            ) : undefined
          }
        />
      </Section>
    </>
  );
}
