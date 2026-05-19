import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
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
          <div className="stagger max-w-3xl">
            <Eyebrow>Records · Booking & Management</Eyebrow>
            <Heading as="h1">Agenda de verdad. No promesas.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              30 años llamando a salas, festivales y promotores. Sabemos qué
              artista funciona dónde — y te lo decimos antes, no después.
            </p>
            <div className="mt-9">
              <Cta href={`mailto:${site.emails.booking}?subject=Booking`}>
                Hablemos de fechas →
              </Cta>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>Booking Engine + Management</Eyebrow>
        <Heading>Una cosa lleva a la otra.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
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
