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
              Bonito Sound se monta en 2022 en Sabadell. La empresa es
              joven; el oficio, no — Dani lleva treinta años en la industria
              musical española.
            </p>
            <p>
              Esos treinta años dan para ver de todo: sobre todo, para ver lo
              que no funciona y por qué nadie lo arregla. Montamos Bonito
              para arreglarlo.
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
          Gente con nombre y teléfono.
        </SplitTextReveal>
        <StaggerGroup
          stagger={0.1}
          className="mx-auto mt-14 flex flex-wrap justify-center gap-x-8 gap-y-12"
        >
          {team.map((p) => {
            const photo = findLogo("equipo", p.name);
            return (
              <div key={p.name} className="group w-[45%] max-w-[230px] sm:w-[230px]">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 45vw, 230px"
                      className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="display text-2xl leading-tight">{p.name}</h3>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                  {p.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {p.line}
                </p>
              </div>
            );
          })}
        </StaggerGroup>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Dónde estamos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          El sector nos conoce.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            [
              "Fabra i Coats",
              "Proyecto residente 2025 de la fábrica de creación del Ajuntament de Barcelona.",
            ],
            [
              "Redescena",
              "Compañía inscrita en la Red Española de Teatros, Auditorios, Circuitos y Festivales.",
            ],
            [
              "Fundació Catalunya Cultura",
              "Proyecto acompañado por la fundación que conecta cultura y empresa en Catalunya.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="card">
              <h3 className="display text-xl">{t}</h3>
              <p className="mt-3 text-sm text-text-secondary">{d}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-secondary">
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
