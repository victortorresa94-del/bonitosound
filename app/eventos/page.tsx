import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import { YouTubeEmbed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
} from "@/components/motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eventos — Activaciones para marcas y giras",
  description:
    "Productora de eventos musicales: activaciones de marca y tour management. Del brief al titular, con un solo equipo.",
  alternates: { canonical: `${site.url}/eventos` },
};

export default function Eventos() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap grid gap-12 py-24 md:grid-cols-[1.2fr_1fr] md:items-center md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Eventos</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              Aquí está la pasta. Y el oficio.
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
                className="object-cover scale-110"
              />
            </ParallaxLayer>
          </div>
        </div>
      </section>

      <Section>
        <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-2">
          <Link href="/eventos/marcas" className="card group flex flex-col">
            <p className="eyebrow">Marcas</p>
            <h2 className="display mt-3 text-3xl">Eventos para marcas</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              Ballantine&apos;s, Pernod Ricard, Pepsico, Absolut. Activaciones,
              lanzamientos y experiencias culturales. Del brief al titular en 6
              semanas.
            </p>
            <span className="mt-6 text-text-secondary transition-colors group-hover:text-accent-cyan">Ver eventos para marcas →</span>
          </Link>

          <Link href="/eventos/giras" className="card group flex flex-col">
            <p className="eyebrow">Giras</p>
            <h2 className="display mt-3 text-3xl">Tour management</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              Road, tour y stage management. Hemos llevado a Albert Pla, Alfred
              García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo.
            </p>
            <span className="mt-6 text-text-secondary transition-colors group-hover:text-accent-cyan">Ver giras →</span>
          </Link>
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">En directo</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Final de gira en el Sant Jordi Club.
        </SplitTextReveal>
        <div className="mt-10 max-w-3xl">
          <YouTubeEmbed id="r47SP4OULcI" title="Final de Gira 1016 — Sant Jordi Club" />
        </div>
      </Section>

      <Section>
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
