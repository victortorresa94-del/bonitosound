import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { FaqOpen } from "@/components/FaqOpen";
import {
  ServiceFeatures,
  type ServiceFeature,
} from "@/components/servicios/ServiceFeatures";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketing musical para artistas — ads y lanzamientos",
  description:
    "Campañas de ads, estrategia de redes y lanzamientos de álbum y de evento para artistas. Cuando salga, se entera quien se tiene que enterar.",
  alternates: { canonical: `${site.url}/marketing` },
};

// Características del servicio (textos del mockup). La 3ª va en blob cian.
const features: ServiceFeature[] = [
  {
    icon: "megafono",
    title: "Ads",
    text: "Configuramos y optimizamos la campaña en cada plataforma. Presupuesto, targeting, creatividades.",
  },
  {
    icon: "claqueta",
    title: "Material",
    text: "Vídeos, cortes verticales, artes para cada formato. Listos para pautar.",
  },
  {
    icon: "moneda",
    title: "Inversión propia",
    text: "Cuando creemos en el lanzamiento, ponemos nosotros parte del presupuesto de ads.",
    highlight: true,
  },
];

const faq = [
  {
    q: "¿Hace falta ser artista del sello para contratar marketing?",
    a: "No. El marketing es un servicio independiente: llevamos campañas de artistas que no están fichados en Records. Lo que pedimos es tener música o evento de verdad detrás.",
  },
  {
    q: "¿Qué presupuesto de ads necesito?",
    a: "Según el objetivo (oyentes, entradas, territorio) y lo que tengas encima de la mesa. Montamos el plan sobre tu lanzamiento real y te decimos qué mueve la aguja y qué no. Lo concreto lo hablamos.",
  },
  {
    q: "¿En qué se diferencia de una agencia de marketing normal?",
    a: "En que venimos del sector musical. Sabemos cómo se mueve un lanzamiento, qué mide de verdad una carrera y cómo se llena una sala. No aprendemos tu industria sobre la marcha.",
  },
];

export default function Marketing() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Marketing musical para artistas",
          provider: { "@type": "Organization", name: site.legalName },
          areaServed: "ES",
          description: metadata.description,
        }}
      />
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

      {/* Hero: tipografía del home (.display / Zilla Slab) con UNA palabra en
          cian, y aire de sobra. El titular es provisional — Víctor lo cambiará. */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-8 pt-24 md:pb-12 md:pt-32">
          <RevealOnScroll as="p" className="eyebrow mb-6">
            Records · Marketing
          </RevealOnScroll>
          <h1 className="display max-w-[16ch] text-[clamp(2.8rem,7.5vw,6rem)] leading-[0.98] text-[#14283C]">
            Campañas que{" "}
            <span className="text-[#16b6d4]">lanzan</span>.<br />
            No que acompañan.
          </h1>
          <RevealOnScroll
            as="p"
            delay={0.15}
            className="mt-8 max-w-[52ch] text-lg leading-relaxed text-text-secondary md:text-xl"
          >
            Ads para el lanzamiento de tu single o álbum en Spotify, YouTube,
            Instagram y TikTok. Del guion del vídeo a la campaña corriendo.
            A veces ponemos nosotros la inversión.
          </RevealOnScroll>
          <RevealOnScroll className="mt-10" delay={0.25}>
            <MagneticButton strength={0.35}>
              <Cta
                href={`mailto:${site.emails.general}?subject=${encodeURIComponent("Marketing para artistas")}`}
              >
                Hablemos de tu lanzamiento →
              </Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Qué hacemos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Tres piezas, un mismo objetivo.
        </SplitTextReveal>
        <RevealOnScroll className="mt-12" delay={0.15}>
          <ServiceFeatures features={features} />
        </RevealOnScroll>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8">
          <FaqOpen items={faq} />
        </div>
      </Section>

      <Section>
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            ¿Tienes algo que sacar?
          </SplitTextReveal>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            Cuéntanos qué lanzas y cuándo. Te decimos qué se puede hacer de
            verdad y por dónde empezar.
          </p>
          <div className="mt-8 flex justify-center">
            <MagneticButton strength={0.5}>
              <Cta href={`mailto:${site.emails.general}?subject=${encodeURIComponent("Marketing para artistas")}`}>
                Hablamos →
              </Cta>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
