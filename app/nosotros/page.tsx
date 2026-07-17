import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Heading, Cta } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  MarqueeLogoWall,
} from "@/components/motion";
import { R2Video } from "@/components/R2Video";
import { InstagramReel } from "@/components/Embeds";
import { findLogo, findAsset } from "@/lib/assets";
import { getPosts } from "@/lib/blog";
import { team, memberships, support, site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Nosotros — Quiénes están detrás de Bonito Sound",
  description:
    "El equipo de Bonito Sound en Sabadell. Miembros de UFI, SGAE, AGEDI, ARTE, AEDEM y European Music Council.",
  alternates: { canonical: `${site.url}/nosotros` },
};

export default function Nosotros() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      {/* Hero (mockup): eyebrow con contador + statement serif (2ª línea
          cian) + apoyo, y la ilustración del equipo a la derecha, sin card. */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-5">
              Nosotros · 01/04
            </RevealOnScroll>
            <RevealOnScroll
              as="h1"
              className="display leading-[1.02] text-[clamp(2.6rem,6.5vw,4.6rem)]"
            >
              <span style={{ color: NAVY }}>Somos la gente</span>
              <br />
              <span style={{ color: CYAN }}>del sector.</span>
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              delay={0.2}
              className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary"
            >
              Booking, management, sello y distribución. Una agencia musical
              que hace las cosas bonitas, sin postureo. Llevamos años metidos
              en esto porque nos gusta de verdad.
            </RevealOnScroll>
          </div>

          {(() => {
            const img = findAsset("heroes", "nosotros") ?? findLogo("heroes", "nosotros");
            return img ? (
              <RevealOnScroll delay={0.15} className="relative mx-auto aspect-square w-full max-w-lg">
                <Image
                  src={img}
                  alt="El equipo de Bonito Sound"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain"
                  priority
                />
              </RevealOnScroll>
            ) : null;
          })()}
        </div>
      </section>

      <Section>
        <RevealOnScroll className="max-w-2xl space-y-5 text-lg text-text-secondary">
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
      </Section>

      <Section className="bg-bg-primary">
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

      <Section className="bg-bg-primary">
        <RevealOnScroll>
          <MarqueeLogoWall items={memberships} dir="instituciones" label="Miembros activos de" speed={30} />
        </RevealOnScroll>
        <RevealOnScroll className="mt-12">
          <MarqueeLogoWall items={support} dir="apoyos" label="Con el apoyo de" speed={30} direction="right" />
        </RevealOnScroll>
      </Section>

      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">
          De cerca
        </RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display mb-10 text-[clamp(2rem,4.5vw,3.4rem)]">
          Quién lo lleva, contado por dentro.
        </SplitTextReveal>
        <div className="grid items-start gap-8 md:grid-cols-[1.4fr_0.6fr]">
          <RevealOnScroll>
            <R2Video src="entrevista-dani.mp4" ratio="16 / 9" />
            <p className="mt-4 text-sm text-text-muted">
              Entrevista a Dani, uno de los fundadores.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <InstagramReel
              url="https://www.instagram.com/reel/DCOfx1YKHsP/"
              title="Presentación de Bonito Sound"
            />
            <p className="mt-4 text-sm text-text-muted">
              El día a día, en Instagram.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {posts.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <RevealOnScroll as="p" className="eyebrow mb-4">
                Diario
              </RevealOnScroll>
              <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
                Lo que pensamos, escrito.
              </SplitTextReveal>
            </div>
            <RevealOnScroll delay={0.1}>
              <Link
                href="/diario"
                className="more-link"
              >
                Ver el diario <span className="arrow">→</span>
              </Link>
            </RevealOnScroll>
          </div>
          <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/diario/${p.slug}`}
                className="card group flex flex-col"
                data-cursor="link"
              >
                <p className="eyebrow mb-3">{p.cluster ?? "Diario"}</p>
                <h3 className="display text-xl leading-tight text-text-primary transition-colors group-hover:text-accent-cyan">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-text-secondary">{p.description}</p>
                <span className="mt-5 text-sm font-semibold text-accent-cyan">Leer →</span>
              </Link>
            ))}
          </StaggerGroup>
        </Section>
      )}

      <Section className="bg-bg-primary">
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
