import type { Metadata } from "next";
import Image from "next/image";
import { Section, Heading, Cta } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
  MarqueeLogoWall,
} from "@/components/motion";
import { findLogo } from "@/lib/assets";
import { team, memberships, support, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros — Quiénes están detrás de Bonito Sound",
  description:
    "El equipo de Bonito Sound en Sabadell. Miembros de UFI, SGAE, AGEDI, ARTE, AEDEM y European Music Council.",
  alternates: { canonical: `${site.url}/nosotros` },
};

export default function Nosotros() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Nosotros
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              Gente del sector. Cansada del sector.
            </SplitTextReveal>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <RevealOnScroll className="space-y-5 text-lg text-text-secondary">
            <p>
              Bonito Sound se monta en 2022 en Sabadell. No para hacer una
              agencia más: para hacer la que faltaba.
            </p>
            <p>
              Treinta años en la industria dan para ver de todo. Sobre todo,
              para ver lo que no funciona y por qué nadie lo arregla. Nosotros
              lo arreglamos.
            </p>
            <p>
              Somos pocos, hacemos mucho y cogemos el teléfono. Si buscas una
              consultora con keynote, esta no es tu web.
            </p>
          </RevealOnScroll>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
            {(() => {
              const img = findLogo("heroes", "nosotros");
              return img ? (
                <ParallaxLayer speed={0.2} className="absolute inset-0">
                  <Image
                    src={img}
                    alt="El equipo de Bonito Sound"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-110"
                  />
                </ParallaxLayer>
              ) : null;
            })()}
          </div>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Equipo</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Tres personas con nombre y teléfono.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((p) => {
            const photo = findLogo("equipo", p.name);
            return (
              <div key={p.name} className="card">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="display text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-accent-warm">{p.role}</p>
                <p className="mt-3 text-sm text-text-secondary">{p.line}</p>
              </div>
            );
          })}
        </StaggerGroup>
        <p className="mt-6 text-sm text-text-muted">
          Roser Gamonal y Júlia Martín: pendiente confirmar incorporación al
          equipo público con Dani Boada (§17 del brief).
        </p>
      </Section>

      <Section>
        <RevealOnScroll>
          <MarqueeLogoWall items={memberships} dir="instituciones" label="Miembros activos de" speed={30} />
        </RevealOnScroll>
        <RevealOnScroll className="mt-12">
          <MarqueeLogoWall items={support} dir="apoyos" label="Con el apoyo de" speed={30} direction="right" />
        </RevealOnScroll>
      </Section>

      <Section className="bg-bg-secondary">
        <RevealOnScroll className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Hablamos?</Heading>
          <div className="mt-8 flex justify-center">
            <MagneticButton strength={0.5}>
              <Cta href="/contacto">Hablamos →</Cta>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
