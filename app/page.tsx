import Link from "next/link";
import Image from "next/image";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { Superhero } from "@/components/Superhero";
import { InstagramFeed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  MagneticButton,
  SplitTextReveal,
  ParallaxLayer,
  MarqueeLogoWall,
  JaleoColorBurst,
} from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { brands, memberships, support, team } from "@/lib/site";

const verticals = [
  {
    title: "Eventos",
    slug: "eventos",
    href: "/eventos",
    desc: "Activaciones para marcas y giras. Del brief al titular.",
    state: "eventos" as const,
  },
  {
    title: "Records",
    slug: "records",
    href: "/records",
    desc: "Sello, booking, management, distribución y editorial.",
    state: "records" as const,
  },
  {
    title: "Lab",
    slug: "lab",
    href: "/lab",
    desc: "Artiverse y Giraverse. El software que el sector no tiene.",
    state: "home" as const,
  },
  {
    title: "Jaleo Sound",
    slug: "jaleo",
    href: "/jaleo-sound",
    desc: "Festival propio de cultura española en Amsterdam.",
    state: "home" as const,
  },
];

export default function Home() {
  const roster = getArtists()
    .filter((a) => a.tier === "booking")
    .slice(0, 6);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="wrap grid items-center gap-12 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">
              El único ecosistema cultural integral del sector
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              {"No hacemos eventos. Hacemos jaleo."}
            </SplitTextReveal>
            <RevealOnScroll delay={0.2} as="p" className="mt-7 max-w-xl text-lg text-text-secondary">
              En la música nadie te regala nada. Llevamos 30 años en la
              industria. Hace tres montamos Bonito Sound para hacerlo como hay
              que hacerlo.
            </RevealOnScroll>
            <RevealOnScroll delay={0.35} className="mt-9 flex flex-wrap gap-4">
              <MagneticButton strength={0.35}>
                <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Cta href="/records" variant="ghost">
                  Explorar el ecosistema
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
          <ParallaxLayer speed={0.15} className="mx-auto w-2/3 max-w-sm md:w-full">
            <Superhero state="home" className="w-full animate-fade-in" />
          </ParallaxLayer>
        </div>
      </section>

      {/* 2. Lo que hacemos */}
      <Section className="border-t border-subtle">
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Lo que hacemos
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          La música no es una vertical. Es un sistema.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-5 max-w-2xl text-text-secondary" delay={0.15}>
          Y los proyectos culturales que duran son los que tienen a alguien que
          entiende el sistema entero — no solo su trozo.
        </RevealOnScroll>
        <StaggerGroup
          stagger={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {verticals.map((v) => {
            const img = findAsset("secciones", v.slug);
            return (
              <Link key={v.href} href={v.href} className="card group" data-cursor="link">
                {img ? (
                  <div className="relative mb-5 h-16 w-16">
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain transition-opacity group-hover:opacity-100"
                    />
                  </div>
                ) : (
                  <Superhero
                    state={v.state}
                    className="mb-5 h-16 w-16 opacity-80 transition-opacity group-hover:opacity-100"
                  />
                )}
                <h3 className="display text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{v.desc}</p>
                <span className="mt-4 inline-block text-sm text-accent-warm">
                  Ver →
                </span>
              </Link>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* 3. Marcas que nos eligen — prioridad B2B */}
      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Marcas que nos eligen
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Sin grandes escenarios. Sin zonas VIP. Sin tonterías.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-5 max-w-2xl text-text-secondary" delay={0.15}>
          Producimos activaciones para Ballantine&apos;s, Pernod Ricard,
          Pepsico, Schweppes, Absolut, Universal y Gestmusic. Cuando una marca
          quiere un evento con música que la gente recuerde — no decorado
          musical — nos llaman.
        </RevealOnScroll>
        <RevealOnScroll className="mt-10" delay={0.25}>
          <MarqueeLogoWall items={brands} dir="marcas" speed={40} />
        </RevealOnScroll>
        <RevealOnScroll className="mt-10" delay={0.35}>
          <MagneticButton strength={0.35}>
            <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
          </MagneticButton>
        </RevealOnScroll>
      </Section>

      {/* 4. Roster */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Roster
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Cinco artistas que no necesitan que les expliquemos quiénes son.
        </SplitTextReveal>
        <StaggerGroup
          stagger={0.08}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6"
        >
          {roster.map((a) => {
            const photo = a.image ?? findAsset("artistas", a.slug);
            return (
              <Link
                key={a.slug}
                href={`/artistas/${a.slug}`}
                className="group min-w-[60vw] sm:min-w-[40vw] md:min-w-0"
                data-cursor="link"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={a.name}
                      fill
                      sizes="(max-width: 768px) 60vw, 16vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-5">
                    <span className="display text-2xl text-white">{a.name}</span>
                  </span>
                </div>
                <p className="mt-3 text-sm text-text-muted">{a.genre}</p>
              </Link>
            );
          })}
        </StaggerGroup>
        <RevealOnScroll className="mt-10">
          <MagneticButton strength={0.25}>
            <Cta href="/artistas" variant="ghost">
              Roster completo →
            </Cta>
          </MagneticButton>
        </RevealOnScroll>
      </Section>

      {/* 5. Jaleo Sound — color burst sticky scene */}
      <JaleoColorBurst />

      {/* 6. Lab */}
      <Section className="bg-bg-secondary">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Lab
            </RevealOnScroll>
            <SplitTextReveal
              as="h2"
              split="lines"
              className="display text-[clamp(2rem,4.5vw,3.4rem)]"
            >
              El sector mueve carreras por WhatsApp. Nos parece flipante.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-5 max-w-2xl text-text-secondary" delay={0.15}>
              Por eso construimos software. Artiverse conecta agencias,
              programadores y promotores — 200+ usuarios. Giraverse llega para
              ordenar la circulación de giras.
            </RevealOnScroll>
            <RevealOnScroll className="mt-8" delay={0.25}>
              <MagneticButton strength={0.3}>
                <Cta href="/lab" variant="ghost">
                  Conocer el Lab →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
          <ParallaxLayer speed={0.3} className="hidden md:block">
            <Superhero state="home" className="h-40 w-40" />
          </ParallaxLayer>
        </div>
      </Section>

      {/* 7. Quiénes somos */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Quiénes somos
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Tres socios, un sistema, cero humo.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((p) => (
            <div key={p.name} className="card">
              <h3 className="display text-xl">{p.name}</h3>
              <p className="mt-1 text-sm text-accent-warm">{p.role}</p>
              <p className="mt-3 text-sm text-text-secondary">{p.line}</p>
            </div>
          ))}
        </StaggerGroup>
        <RevealOnScroll className="mt-12">
          <MarqueeLogoWall
            items={memberships}
            dir="instituciones"
            label="Miembros activos de"
            speed={30}
          />
        </RevealOnScroll>
        <RevealOnScroll className="mt-10">
          <MarqueeLogoWall
            items={support}
            dir="apoyos"
            label="Con el apoyo de"
            speed={30}
            direction="right"
          />
        </RevealOnScroll>
      </Section>

      {/* 8. En directo */}
      <Section className="bg-bg-secondary">
        <RevealOnScroll as="p" className="eyebrow mb-4">
          En directo
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Lo que se cuece, según Instagram.
        </SplitTextReveal>
        <RevealOnScroll className="mt-10">
          <InstagramFeed />
        </RevealOnScroll>
      </Section>
    </>
  );
}
