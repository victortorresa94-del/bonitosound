import type { Metadata } from "next";
import { Section, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import { RevealOnScroll, SplitTextReveal } from "@/components/motion";
import { LogoGrid } from "@/components/trusted/LogoGrid";
import { trustedBy, site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
import { localePath } from "@/lib/i18n";

export function generateMetadata(): Metadata {
  return {
  title: "Clientes — Han confiado en hacerlo bonito",
  description:
    "Marcas, agencias, festivales, ayuntamientos y asociaciones para las que ha trabajado Bonito Sound.",
  alternates: alternatesFor(`/clientes`),
  };
}

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export default function Clientes() {
  const locale = serverLocale();
  // Los proveedores NO son clientes: van aparte, al final.
  const clientes = trustedBy.filter((c) => c.id !== "proveedores");
  const proveedores = trustedBy.find((c) => c.id === "proveedores");
  const total = clientes.reduce((n, c) => n + c.items.length, 0);

  return (
    <div style={{ backgroundColor: "#FBFAF6" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.legalName,
          url: `${site.url}/clientes`,
          description: generateMetadata().description,
        }}
      />

      {/* Hero */}
      <section className="border-b border-subtle">
        <div className="wrap py-20 md:py-28">
          <RevealOnScroll as="p" className="eyebrow mb-4">
            {tr(locale, "Clientes")}
          </RevealOnScroll>
          <SplitTextReveal
            as="h1"
            split="lines"
            className="display max-w-4xl text-[clamp(2.2rem,6vw,4.4rem)] leading-[1.03]"
          >
            {tr(locale, "Han confiado en hacerlo bonito.")}
          </SplitTextReveal>
          <RevealOnScroll
            as="p"
            delay={0.15}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary"
          >
            {tr(locale, "Marcas, agencias, festivales, ayuntamientos y asociaciones para las que hemos trabajado desde que empezamos.")}{" "}
            {total} {tr(locale, "en total.")}
          </RevealOnScroll>
        </div>
      </section>

      {/* Índice: con esta cantidad de logos, sin índice esto es un scroll infinito. */}
      <nav
        aria-label={tr(locale, "Categorías")}
        className="sticky top-0 z-30 border-b border-subtle backdrop-blur"
        style={{ backgroundColor: "rgba(251,250,246,0.9)" }}
      >
        <div className="wrap flex flex-wrap gap-x-6 gap-y-2 py-4">
          {clientes.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="text-sm font-semibold text-text-secondary transition-colors hover:text-accent-cyan"
            >
              {tr(locale, c.label)}{" "}
              <span className="font-mono text-xs tabular-nums text-text-muted">
                {c.items.length}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {clientes.map((c) => (
        <Section key={c.id} id={c.id}>
          <RevealOnScroll className="mb-8 flex flex-wrap items-baseline gap-x-4">
            <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)]" style={{ color: NAVY }}>
              {tr(locale, c.label)}
            </h2>
            <span className="font-round text-xl font-bold" style={{ color: CYAN }}>
              {c.items.length}
            </span>
          </RevealOnScroll>
          <LogoGrid dir={c.dir} items={c.items} layout={c.layout} />
        </Section>
      ))}

      {/* Proveedores: quien nos da servicio, no quien nos contrata. */}
      {proveedores && (
        <Section className="bg-bg-primary" id="proveedores">
          <RevealOnScroll as="p" className="eyebrow mb-3">
            {tr(locale, proveedores.label)}
          </RevealOnScroll>
          <RevealOnScroll as="p" delay={0.05} className="mb-8 max-w-xl text-text-secondary">
            {tr(locale, "Los que ponen la técnica, la logística y el músculo para que cada proyecto salga.")}
          </RevealOnScroll>
          <LogoGrid dir={proveedores.dir} items={proveedores.items} />
        </Section>
      )}

      <Section>
        <CtaBlock
          title={tr(locale, "¿Sumamos tu marca a la lista?")}
          desc={tr(locale, "Cuéntanos qué tienes en mente y te decimos cómo lo montaríamos.")}
          href={localePath("/contacto", locale)}
        />
      </Section>
    </div>
  );
}
