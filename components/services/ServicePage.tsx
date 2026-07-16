import type { ReactNode } from "react";
import { Section, Cta, JsonLd } from "@/components/ui";
import { FaqOpen } from "@/components/FaqOpen";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import type { Service } from "@/lib/services";
import { site } from "@/lib/site";

/**
 * Plantilla común de las 7 páginas de servicio (subproductos de Bonito).
 * Estructura: hero (PLACEHOLDER — Víctor lo reemplaza con su diseño) →
 * aspectos clave → caso/artistas (slot `caseSlot`) → FAQ → CTA de cierre.
 * El contenido viene de `lib/services.ts`; cada ruta pasa su `caseSlot`.
 */
export function ServicePage({
  service,
  caseSlot,
}: {
  service: Service;
  caseSlot?: ReactNode;
}) {
  const mailto = `mailto:${site.emails.booking}?subject=${encodeURIComponent(service.ctaSubject)}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${service.eyebrow} — Bonito Sound`,
          description: service.desc,
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

      {/* HERO placeholder — se sustituye por el diseño de Víctor. */}
      <section className="border-b border-subtle" data-hero-placeholder>
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Records · {service.eyebrow}
            </RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              {service.h1}
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              {service.desc}
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={mailto}>Hablamos →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Aspectos clave */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-8">
          Qué ponemos
        </RevealOnScroll>
        <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-3">
          {service.aspects.map((a) => (
            <div key={a.name} className="card flex flex-col">
              <h3 className="display text-xl">{a.name}</h3>
              <p className="mt-3 text-sm text-text-secondary">{a.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      {/* Caso / artistas (opcional, por página) */}
      {caseSlot}

      {/* FAQ */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-8">
          Preguntas frecuentes
        </RevealOnScroll>
        <FaqOpen items={service.faq} />
      </Section>

      {/* CTA de cierre */}
      <Section>
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            {service.cta.h2}
          </SplitTextReveal>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">{service.cta.desc}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <MagneticButton strength={0.5}>
              <Cta href={mailto}>Contactar →</Cta>
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
