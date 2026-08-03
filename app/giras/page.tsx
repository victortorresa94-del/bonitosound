import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import { RevealOnScroll, MagneticButton } from "@/components/motion";
import { GirasHero } from "@/components/giras/GirasHero";
import { GirasRuta } from "@/components/giras/GirasRuta";
import { GirasNumeros } from "@/components/giras/GirasNumeros";
import { GirasVideos } from "@/components/giras/GirasVideos";
import { giras } from "@/lib/giras";
import { getGiraSlugs } from "@/lib/content";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return {
  title: "Giras — Producción y dirección de giras de artistas | Bonito Sound",
  description:
    "Producción técnica, logística, road management y dirección de giras. Coordinamos cada detalle, de la planificación previa al desmontaje final. Giras de Albert Pla, Alfred García, Dulze, Nàtura y muchos más.",
  alternates: alternatesFor(`/giras`),
  };
}

export default function Giras() {
  return (
    <div style={{ backgroundColor: "#FBFAF6" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Producción y dirección de giras musicales",
          provider: { "@type": "Organization", name: site.legalName },
          areaServed: "ES",
          description: generateMetadata().description,
        }}
      />

      {/* GIRAS gigante en outline + la carretera cian. */}
      <GirasHero />

      {/* Statement + CTA, bajo el hero. */}
      <Section className="!py-10 md:!py-14">
        <div className="max-w-3xl">
          <RevealOnScroll
            as="p"
            className="statement text-[clamp(1.4rem,3.2vw,2.3rem)] leading-tight text-text-primary"
          >
            Una gira no se improvisa. Se lleva. Coordinamos cada detalle, desde la
            planificación previa hasta el desmontaje final, porque la diferencia
            entre un buen concierto y una gran producción está en los detalles.
          </RevealOnScroll>
          <RevealOnScroll className="mt-8" delay={0.15}>
            <MagneticButton strength={0.35}>
              <Cta href="/contacto">Cuéntanos tu gira →</Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </Section>

      {/* La ruta: las giras colgando de la carretera. */}
      <GirasRuta giras={giras} conPagina={getGiraSlugs()} />

      {/* Las giras que tienen vídeo, aquí mismo (sin entrar en ficha). */}
      <GirasVideos giras={giras} />

      {/* Los números que convencen a quien contrata. */}
      <GirasNumeros />

      {/* Cierre. */}
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
