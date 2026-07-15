import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import { EventoCard } from "@/components/EventoCard";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
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

const stats = [
  { n: "106", label: "producciones con marcas y artistas" },
  { n: "58", label: "contrataciones de artistas" },
  { n: "53", label: "referencias discográficas" },
];

export default function Eventos() {
  const eventos = getEventos();
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap grid gap-12 py-24 md:grid-cols-[1.2fr_1fr] md:items-center md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Eventos</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Eventos que se recuerdan. Giras que se llenan.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Dos cosas: producimos activaciones para marcas que quieren música
              que se recuerde, y llevamos giras de principio a fin. Las dos con
              el mismo equipo que las monta.
            </RevealOnScroll>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-subtle">
            <ParallaxLayer speed={0.2} className="absolute inset-0">
              <Image
                src="/img/heroes/eventos-marcas.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="scale-110 object-cover"
              />
            </ParallaxLayer>
          </div>
        </div>
      </section>

      {/* Números: sustancia inmediata, dato duro (marketing musical + Dani). */}
      <section className="border-b border-subtle">
        <div className="wrap grid gap-10 py-16 sm:grid-cols-3 md:py-20">
          {stats.map((s) => (
            <RevealOnScroll key={s.label} className="text-center sm:text-left">
              <p className="display text-[clamp(3rem,7vw,5rem)] leading-none text-accent-cyan">
                {s.n}
              </p>
              <p className="mt-3 text-sm text-text-secondary">{s.label}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* El trabajo, uno por uno. Se llena solo con cada .md + su vídeo. */}
      {eventos.length > 0 && (
        <Section>
          <RevealOnScroll as="p" className="eyebrow mb-4">Lo hemos montado</RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
            Eventos y giras, uno por uno.
          </SplitTextReveal>
          <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventos.map((e) => (
              <EventoCard key={e.slug} evento={e} />
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* Las dos patas del servicio: icono + texto + "Saber más". */}
      <Section className={eventos.length > 0 ? "pt-0" : undefined}>
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
