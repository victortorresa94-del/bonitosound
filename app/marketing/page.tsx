import { CtaBlock } from "@/components/CtaBlock";
import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
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

const CYAN = "#16b6d4";

// Características del servicio (con los iconos dibujados que ya tiene la página).
// La de "Inversión propia" va como blob cian (el gancho).
const features: ServiceFeature[] = [
  {
    icon: "megafono",
    title: "Ads",
    text: "Configuramos y optimizamos la campaña en cada plataforma. Presupuesto, targeting, creatividades.",
  },
  {
    icon: "globo",
    title: "Estrategia de redes",
    text: "Qué contar, cuándo y en qué formato. Calendario alineado con tus lanzamientos, no publicar por publicar.",
  },
  {
    icon: "moneda",
    title: "Inversión propia",
    text: "Cuando creemos en el lanzamiento, ponemos nosotros parte del presupuesto de ads.",
    highlight: true,
  },
  {
    icon: "claqueta",
    title: "Material y contenido",
    text: "Vídeos, cortes verticales y artes para cada formato. Listos para pautar.",
  },
  {
    icon: "vinilo",
    title: "Lanzamientos",
    text: "Plan de salida para un single, un álbum o un evento: teaser, día de estreno y sostenimiento.",
  },
  {
    icon: "ticket",
    title: "Vender entradas",
    text: "Igual que movemos un single, montamos campañas para llenar un directo o dar empujón a un evento.",
  },
];

// Cómo montamos una campaña (proceso, mismo nivel que las otras páginas).
const proceso = [
  { title: "El objetivo", desc: "Oyentes, entradas, territorio. Sobre lo que tengas de verdad encima de la mesa." },
  { title: "El material", desc: "Vídeos, cortes verticales y artes para cada formato, listos para pautar." },
  { title: "La campaña", desc: "Configuramos, pauteamos y optimizamos en cada plataforma." },
  { title: "El seguimiento", desc: "Medimos lo que mueve la aguja y ajustamos mientras corre." },
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

      {/* Intro con garabato cian (el "rollo" Bonito, como el resto de servicios). */}
      <Section>
        <RevealOnScroll as="p" className="statement mx-auto max-w-4xl text-center text-[clamp(1.5rem,3.4vw,2.5rem)] leading-tight text-text-primary">
          Un buen lanzamiento no es suerte: es un plan corriendo en cada plataforma
          el día que toca. Y venimos del sector — sabemos qué mueve oyentes y qué
          llena una sala.
        </RevealOnScroll>
        <RevealOnScroll className="mx-auto mt-7 w-40" delay={0.15}>
          <svg viewBox="0 0 160 16" fill="none" aria-hidden className="h-4 w-full">
            <path d="M3 9 C 28 2, 52 2, 78 9 S 128 15, 157 6" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
          </svg>
        </RevealOnScroll>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Qué hacemos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Todo lo que movemos.
        </SplitTextReveal>
        <RevealOnScroll className="mt-12" delay={0.15}>
          <ServiceFeatures features={features} />
        </RevealOnScroll>
      </Section>

      {/* Proceso */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-10">Cómo montamos una campaña</RevealOnScroll>
        <StaggerGroup stagger={0.08} className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {proceso.map((p, i) => (
            <div key={p.title}>
              <span className="font-round text-5xl font-bold leading-none" style={{ color: CYAN }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 display text-xl leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.desc}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8">
          <FaqOpen items={faq} />
        </div>
      </Section>

      <Section>
        <CtaBlock
          title="¿Tienes algo que sacar?"
          desc="Cuéntanos qué lanzas y cuándo. Te decimos qué se puede hacer de verdad y por dónde empezar."
          href={`mailto:${site.emails.general}?subject=${encodeURIComponent("Marketing para artistas")}`}
          cta="Hablamos →"
        />
      </Section>
    </>
  );
}
