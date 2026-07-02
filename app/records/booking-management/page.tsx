import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { FaqOpen } from "@/components/FaqOpen";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agencia de booking y management musical independiente",
  description:
    "Agencia de booking en España y management musical independiente. Agenda real, no promesas: te ponemos donde tienes que estar.",
  alternates: { canonical: `${site.url}/records/booking-management` },
};

const faq = [
  {
    q: "¿Cuál es la diferencia entre booking y management?",
    a: "El booking consigue y cierra conciertos: contacta salas, festivales y promotores y negocia cachés. El management gestiona la carrera entera del artista: estrategia, equipo, decisiones y representación. Bonito hace las dos cosas, coordinadas.",
  },
  {
    q: "¿Cómo elijo agencia de booking?",
    a: "Mira tres cosas: si tienen agenda real (no contactos sueltos), si te dicen la verdad cuando no hay encaje, y si la persona que te ficha es la que luego coge el teléfono. En Bonito las tres son sí.",
  },
  {
    q: "¿Hacéis booking de artistas que no lleváis en management?",
    a: "Sí. Se puede contratar solo el Booking Engine sin firmar management. Lo que no hacemos es prometer fechas que no podemos cerrar.",
  },
];

export default function BookingManagement() {
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
            <RevealOnScroll as="p" className="eyebrow mb-4">Records · Booking & Management</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Agenda de verdad. No promesas.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Tres décadas de oficio llamando a salas, festivales y
              promotores. Sabemos qué artista funciona dónde — y te lo
              decimos antes, no después.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={`mailto:${site.emails.booking}?subject=Booking`}>
                  Hablemos de fechas →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Booking Engine + Management</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Una cosa lleva a la otra.
        </SplitTextReveal>
        <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card">
            <h3 className="display text-2xl">Booking Engine</h3>
            <p className="mt-3 text-text-secondary">
              Conciertos cerrados, no prometidos. Salas, festivales,
              corporativo. Negociación, contrato y plaza.
            </p>
          </div>
          <div className="card">
            <h3 className="display text-2xl">Management</h3>
            <p className="mt-3 text-text-secondary">
              Tu carrera, ordenada. Estrategia, equipo, decisiones. Alguien que
              ve el sistema entero, no solo el próximo bolo.
            </p>
          </div>
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">A quién llevamos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Pocos, y bien llevados.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-6 max-w-2xl text-text-secondary" delay={0.15}>
          Dulze de gira nacional con el Qué Fantasía Tour, Eva Calyza con su
          primer álbum, Sa Pena y Nàtura en directo. No coleccionamos
          artistas: llevamos a los que podemos llevar como hay que llevarlos.
        </RevealOnScroll>
        <RevealOnScroll className="mt-8" delay={0.25}>
          <MagneticButton strength={0.3}>
            <Cta href="/artistas" variant="ghost">
              Ver el roster →
            </Cta>
          </MagneticButton>
        </RevealOnScroll>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Preguntas frecuentes</RevealOnScroll>
        <div className="mt-8">
          <FaqOpen items={faq} />
        </div>
      </Section>
    </>
  );
}
