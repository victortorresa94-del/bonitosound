import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  SplitTextReveal,
  MagneticButton,
  FaqMotion,
  MarqueeLogoWall,
} from "@/components/motion";
import { distributionCatalog, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Distribución digital de música",
  description:
    "Distribución digital y editorial: tu música en Spotify, Apple Music y plataformas, bien hecha. ~20 artistas en catálogo.",
  alternates: { canonical: `${site.url}/records/distribucion` },
};

const faq = [
  {
    q: "¿Qué incluye la distribución de Bonito Sound?",
    a: "Subida y gestión de tu música en plataformas digitales (Spotify, Apple Music, etc.), metadatos correctos, control de lanzamientos y, si lo necesitas, gestión editorial de los derechos.",
  },
  {
    q: "¿Distribución y editorial es lo mismo?",
    a: "No. La distribución lleva las grabaciones a las plataformas. La editorial gestiona los derechos de autor de las canciones (composición). Son ingresos distintos y conviene tener las dos bien hechas.",
  },
  {
    q: "¿Puedo distribuir sin estar fichado en el sello?",
    a: "Sí. La distribución es un servicio independiente del sello. Muchos de los ~20 artistas del catálogo usan solo esta pieza.",
  },
];

export default function Distribucion() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Records · Distribución & Editorial</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Tu música en las plataformas. Bien.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Subir música es fácil. Subirla bien — metadatos, calendario,
              editorial — es lo que separa una carrera de un perfil.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={`mailto:${site.emails.booking}?subject=Distribución`}>
                  Distribuir con Bonito →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">En catálogo</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          ~20 artistas ya distribuyen con nosotros.
        </SplitTextReveal>
        <div className="mt-10">
          <MarqueeLogoWall items={distributionCatalog} dir="artistas" label="En catálogo" speed={35} />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8 max-w-3xl">
          <FaqMotion items={faq} />
        </div>
      </Section>
    </>
  );
}
