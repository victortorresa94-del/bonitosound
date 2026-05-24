import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
import { LogoWall } from "@/components/LogoWall";
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
          <div className="stagger max-w-3xl">
            <Eyebrow>Records · Distribución & Editorial</Eyebrow>
            <Heading as="h1">Tu música en las plataformas. Bien.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Subir música es fácil. Subirla bien — metadatos, calendario,
              editorial — es lo que separa una carrera de un perfil.
            </p>
            <div className="mt-9">
              <Cta href={`mailto:${site.emails.booking}?subject=Distribución`}>
                Distribuir con Bonito →
              </Cta>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>En catálogo</Eyebrow>
        <Heading>~20 artistas ya distribuyen con nosotros.</Heading>
        <div className="mt-10">
          <LogoWall items={distributionCatalog} dir="artistas" />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Preguntas frecuentes</Eyebrow>
        <div className="mt-8 max-w-3xl">
          <Faq items={faq} />
        </div>
      </Section>
    </>
  );
}
