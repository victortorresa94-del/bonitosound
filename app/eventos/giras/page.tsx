import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import { YouTubeEmbed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  FaqMotion,
} from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tour management — Giras de principio a fin",
  description:
    "Road, tour y stage management. Del management de Anne Lukin y Nerea Rodríguez al cierre de la Gira 1016 de Alfred García en el Sant Jordi Club.",
  alternates: { canonical: `${site.url}/eventos/giras` },
};

const cases = [
  {
    artist: "Alfred García — Gira 1016",
    detail:
      "Cerramos la gira del disco 1016 en el Sant Jordi Club de Barcelona, tras unos 40 conciertos por toda España. Road, tour y stage management de principio a fin.",
  },
  {
    artist: "Anne Lukin",
    detail:
      "Management de la artista pamplonesa surgida de OT: su álbum Al día siguiente y temas que superan los 15 millones de reproducciones.",
  },
  {
    artist: "Nerea Rodríguez",
    detail:
      "Management y desarrollo, con EP producido junto a Sweet Bird y Sony Music Publishing. Carrera llevada a mano, no en piloto automático.",
  },
];

const faq = [
  {
    q: "¿Qué incluye el tour management de Bonito Sound?",
    a: "Road management, tour management y stage management: logística, rutas, equipo, producción técnica y coordinación en plaza. De la primera furgoneta al desmontaje del último bolo.",
  },
  {
    q: "¿Lleváis giras de artistas que no son del roster?",
    a: "Sí. El tour management es un servicio: no hace falta estar fichado por Bonito para que llevemos tu gira.",
  },
];

export default function Giras() {
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
        <div className="wrap grid gap-12 py-24 md:grid-cols-[1.2fr_1fr] md:items-center md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Giras</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Una gira no se improvisa. Se lleva.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Road, tour y stage management. La parte que no se ve desde el
              público y que decide si la gira sale o se cae.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href="/contacto">Cuéntanos tu gira →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-subtle">
            <video
              src="/video/home/giras.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Lo que hemos llevado</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Giras y carreras que sostenemos nosotros.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {cases.map((c) => (
            <div key={c.artist} className="card flex flex-col">
              <h3 className="display text-xl">{c.artist}</h3>
              <p className="mt-3 flex-1 text-text-secondary">{c.detail}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">El vídeo lo cuenta mejor</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Final de la Gira 1016 en el Sant Jordi Club.
        </SplitTextReveal>
        <div className="mt-10 max-w-3xl">
          <YouTubeEmbed id="r47SP4OULcI" title="Final de la Gira 1016 — Alfred García" />
        </div>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo que se pregunta antes de firmar.
        </SplitTextReveal>
        <div className="mt-10 max-w-3xl">
          <FaqMotion items={faq} />
        </div>
      </Section>
    </>
  );
}
