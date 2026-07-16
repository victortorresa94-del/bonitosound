import type { Metadata } from "next";
import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import { EventoCard } from "@/components/EventoCard";
import { EventosHero } from "@/components/eventos/EventosHero";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  MarqueeLogoWall,
} from "@/components/motion";
import { getEventos } from "@/lib/content";
import { brands, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eventos — Activaciones para marcas y giras",
  description:
    "Productora de eventos musicales: activaciones de marca y tour management. Del brief al titular, con un solo equipo.",
  alternates: { canonical: `${site.url}/eventos` },
};

export default function Eventos() {
  const eventos = getEventos();
  const marcas = eventos.filter((e) => e.type === "marca");
  const giras = eventos.filter((e) => e.type !== "marca");
  return (
    <>
      {/* NUEVO diseño roto/asimétrico — Hero + Stats (mockup validado). */}
      <EventosHero />

      {/* El trabajo, uno por uno. Separado por pata: marcas / giras. Cada
          sección se llena sola con sus .md y aparece solo si hay contenido. */}
      {marcas.length > 0 && (
        <Section>
          <RevealOnScroll as="p" className="eyebrow mb-4">Marcas que hemos sonado</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            Activaciones, una por una.
          </SplitTextReveal>
          <StaggerGroup stagger={0.06} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marcas.map((e) => (
              <EventoCard key={e.slug} evento={e} />
            ))}
          </StaggerGroup>
        </Section>
      )}

      {giras.length > 0 && (
        <Section className={marcas.length > 0 ? "pt-0" : undefined}>
          <RevealOnScroll as="p" className="eyebrow mb-4">Giras y directos</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            Artistas llevados de verdad.
          </SplitTextReveal>
          <StaggerGroup stagger={0.06} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giras.map((e) => (
              <EventoCard key={e.slug} evento={e} />
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* Las dos patas del servicio: icono + texto + "Saber más". */}
      <Section className="pt-0">
        <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-2">
          {[
            {
              href: "/eventos/marcas",
              icon: "/img/eventos/marcas.svg",
              title: "Eventos para marcas",
              text: "Creamos experiencias que conectan marcas con personas a través de la música y la cultura.",
            },
            {
              href: "/eventos/giras",
              icon: "/img/eventos/tour.svg",
              title: "Tour management",
              text: "Nos encargamos de que todo funcione dentro y fuera del escenario. Tú solo concéntrate en la música.",
            },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="card group flex items-center gap-6 md:gap-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.icon}
                alt=""
                aria-hidden
                className="h-24 w-24 shrink-0 transition-transform duration-500 group-hover:scale-105 md:h-28 md:w-28"
              />
              <div>
                <h2 className="display text-2xl md:text-[1.7rem]">{c.title}</h2>
                <p className="mt-2 text-text-secondary">{c.text}</p>
                <span className="mt-5 inline-flex items-center rounded-full border border-accent-cyan px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent-cyan transition-colors group-hover:bg-accent-cyan group-hover:text-white">
                  Saber más
                </span>
              </div>
            </Link>
          ))}
        </StaggerGroup>
      </Section>

      {/* Marcas que han confiado (prueba social). */}
      <Section className="bg-bg-primary pt-0">
        <RevealOnScroll as="p" className="eyebrow mb-8">
          Marcas que han sonado con nosotros
        </RevealOnScroll>
        <MarqueeLogoWall items={brands} dir="marcas" speed={42} />
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            ¿Marca o gira?
          </SplitTextReveal>
          <RevealOnScroll as="p" className="mx-auto mt-4 max-w-xl text-text-secondary" delay={0.2}>
            Cuéntanos qué necesitas. Te decimos qué se puede hacer de verdad.
          </RevealOnScroll>
          <RevealOnScroll className="mt-8 flex justify-center" delay={0.35}>
            <MagneticButton strength={0.35}>
              <Cta href="/contacto">Hablamos →</Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </Section>
    </>
  );
}
