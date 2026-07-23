import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import { CtaBlock } from "@/components/CtaBlock";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Giras — Producción y dirección de giras de artistas | Bonito Sound",
  description:
    "Producción técnica, logística, road management y dirección de giras. Coordinamos cada detalle, de la planificación previa al desmontaje final. Giras de Albert Pla, Alfred García, Dulze, Nàtura y muchos más.",
  alternates: { canonical: `${site.url}/giras` },
};

const NAVY = "#14283C";

/**
 * Giras que ha llevado Bonito Sound, de lo más actual hacia atrás. Cada tarjeta
 * lleva un hueco de foto (fallback navy con la inicial mientras no haya imagen).
 * Datos verificados por Víctor (nº de conciertos = prueba, no dinero).
 */
type Gira = { artist: string; tour: string; years: string; shows?: string };

const giras: Gira[] = [
  { artist: "Albert Pla", tour: "No quiero hablar de mí pero yo", years: "2026–2027", shows: "+40 fechas previstas" },
  { artist: "Dulze", tour: "Qué fantasía", years: "2026", shows: "8 fechas" },
  { artist: "Alfred García", tour: "T'estimo és te quiero", years: "2025–2026", shows: "+50 conciertos" },
  { artist: "Nàtura", tour: "Gira DJ", years: "2023–2026", shows: "+250 conciertos" },
  { artist: "Albert Pla", tour: "Rumbagenarios", years: "2024–2025", shows: "+40 conciertos" },
  { artist: "Ernest Prana", tour: "Torno a casa", years: "2025", shows: "12 conciertos" },
  { artist: "Laura Andrés", tour: "Gira Zero", years: "2025", shows: "+20 conciertos" },
  { artist: "Eva Calyza", tour: "Marca Divina", years: "2024–2025", shows: "+15 conciertos" },
  { artist: "Alfred García", tour: "Gira Acústica", years: "2023–2024", shows: "+20 conciertos" },
  { artist: "Pablo Rojo", tour: "On Tour in Spain (desde Ámsterdam)", years: "2025", shows: "+8 actuaciones" },
  { artist: "Egon Calle", tour: "Gira Invierno", years: "2024", shows: "6 conciertos" },
  { artist: "Ramón Mirabet", tour: "Free", years: "2022–2023", shows: "+30 conciertos" },
  { artist: "Vicente García", tour: "Gira en España", years: "2022", shows: "8 conciertos" },
  { artist: "Ruth Lorenzo", tour: "Gira", years: "2022" },
  { artist: "Bemba Saoco", tour: "Gira", years: "2022" },
  { artist: "Anne Lukin", tour: "Gira", years: "2021–2022", shows: "+20 conciertos" },
  { artist: "Ramón Mirabet", tour: "Gira del Mar", years: "2021", shows: "+12 conciertos" },
  { artist: "Nerea Rodríguez", tour: "Doble o Nada Tour", years: "2021", shows: "+15 conciertos" },
  { artist: "Fabián", tour: "Gira Acústica", years: "2021", shows: "+10 conciertos" },
  { artist: "Alfred García", tour: "Gira 1016", years: "2019–2021", shows: "+40 conciertos" },
];

function GiraCard({ g }: { g: Gira }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-subtle p-5 transition-colors duration-300 hover:border-text-primary/25">
      {/* Hueco de foto (fallback navy con la inicial hasta que haya imagen). */}
      <span
        className="grid h-14 w-14 shrink-0 place-items-center rounded-xl font-round text-lg font-bold text-white"
        style={{ backgroundColor: NAVY }}
        aria-hidden
      >
        {g.artist.charAt(0)}
      </span>
      <div className="min-w-0">
        <h3 className="display text-lg leading-tight text-text-primary">{g.artist}</h3>
        <p className="mt-0.5 text-sm text-text-secondary">
          <span className="italic">«{g.tour}»</span>
        </p>
        <p className="mt-1 font-mono text-xs tabular-nums text-text-muted">
          {g.years}
          {g.shows ? ` · ${g.shows}` : ""}
        </p>
      </div>
    </div>
  );
}

export default function Giras() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Producción y dirección de giras musicales",
          provider: { "@type": "Organization", name: site.legalName },
          areaServed: "ES",
          description: metadata.description,
        }}
      />

      {/* Hero */}
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Giras</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Una gira no se improvisa. Se lleva.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary" delay={0.2}>
              Producción técnica, logística, road management y dirección de giras.
              Coordinamos cada detalle, desde la planificación previa hasta el
              desmontaje final, porque sabemos que la diferencia entre un buen
              concierto y una gran producción está en los detalles.
            </RevealOnScroll>
            <RevealOnScroll className="mt-9" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href="/contacto">Cuéntanos tu gira →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Listado de giras */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Lo que hemos llevado</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Giras Bonitas.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-4 max-w-2xl text-text-secondary" delay={0.15}>
          Contratación, gestión, logística, técnica, asesoramiento y producción.
          De lo más reciente hacia atrás.
        </RevealOnScroll>
        <StaggerGroup stagger={0.05} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {giras.map((g, i) => (
            <GiraCard key={`${g.artist}-${g.tour}-${i}`} g={g} />
          ))}
        </StaggerGroup>
      </Section>

      {/* CTA de cierre */}
      <Section>
        <CtaBlock
          title="¿Tienes una gira que mover?"
          desc="Cuéntanos las fechas y el proyecto. Te decimos cómo la montamos y por dónde empezaríamos."
          href="/contacto"
          cta="Cuéntanos tu gira →"
        />
      </Section>
    </>
  );
}
