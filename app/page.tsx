import Link from "next/link";
import Image from "next/image";
import { Section, Heading, Cta } from "@/components/ui";
import { Superhero } from "@/components/Superhero";
import { InstagramFeed } from "@/components/Embeds";
import {
  RevealOnScroll,
  StaggerGroup,
  MagneticButton,
  SplitTextReveal,
  ParallaxLayer,
  MarqueeRow,
  MarqueeLogoWall,
  HorizontalScroller,
  JaleoColorBurst,
  HeroCanvas,
} from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { brands, memberships, support, team } from "@/lib/site";

const verticals = [
  {
    title: "Eventos",
    slug: "eventos",
    href: "/eventos",
    kicker: "B2B · donde está la pasta",
    desc: "Activaciones para marcas y giras. Del brief al titular en 6 semanas.",
    state: "eventos" as const,
    feature: true,
  },
  {
    title: "Records",
    slug: "records",
    href: "/records",
    kicker: "Sello + booking",
    desc: "Management, distribución y editorial. Todo bajo el mismo techo.",
    state: "records" as const,
  },
  {
    title: "Lab",
    slug: "lab",
    href: "/lab",
    kicker: "Tecnología",
    desc: "Artiverse y Giraverse. El software que el sector no tiene.",
    state: "home" as const,
  },
  {
    title: "Jaleo Sound",
    slug: "jaleo",
    href: "/jaleo-sound",
    kicker: "Festival propio",
    desc: "Cultura española y latina en Amsterdam. Por qué no.",
    state: "home" as const,
  },
];

const stats = [
  { n: "30", suffix: " años", label: "en la industria musical española" },
  { n: "17", suffix: "", label: "marcas premium nos han llamado" },
  { n: "200", suffix: "+", label: "usuarios usan Artiverse" },
  { n: "5", suffix: "", label: "verticales, un solo ecosistema" },
];

export default function Home() {
  const roster = getArtists()
    .filter((a) => a.tier === "booking")
    .slice(0, 6);

  return (
    <>
      {/* ───────────────────────── 1. HERO full-bleed WebGL ───────────────────────── */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <HeroCanvas className="absolute inset-0 -z-10 h-full w-full" />
        {/* Velo para legibilidad del texto sobre el shader */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-primary/40 via-bg-primary/10 to-bg-primary/70" />

        <div className="wrap grid w-full items-center gap-10 py-28 md:grid-cols-[1.35fr_0.65fr]">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-5">
              El único ecosistema cultural integral del sector
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="chars"
              stagger={0.018}
              y={60}
              className="display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92]"
            >
              No hacemos eventos.
            </SplitTextReveal>
            <SplitTextReveal
              as="h1"
              split="chars"
              stagger={0.02}
              y={60}
              className="display text-[clamp(3rem,9vw,7.5rem)] leading-[0.92]"
            >
              Hacemos jaleo.
            </SplitTextReveal>
            <RevealOnScroll
              delay={0.4}
              as="p"
              className="mt-8 max-w-lg text-lg text-text-secondary md:text-xl"
            >
              En la música nadie te regala nada. Llevamos 30 años en la
              industria. Hace tres montamos Bonito Sound para hacerlo como hay
              que hacerlo.
            </RevealOnScroll>
            <RevealOnScroll delay={0.55} className="mt-10 flex flex-wrap gap-4">
              <MagneticButton strength={0.4}>
                <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Cta href="/records" variant="ghost">
                  Explorar el ecosistema
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>

          <ParallaxLayer speed={0.18} className="hidden justify-self-center md:block">
            <Superhero state="home" className="h-72 w-72 lg:h-96 lg:w-96" />
          </ParallaxLayer>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-text-muted">
          scroll
        </div>
      </section>

      {/* ───────────────────────── 2. MANIFIESTO marquee ───────────────────────── */}
      <section className="border-y border-subtle bg-text-primary py-6 text-bg-primary md:py-8">
        <MarqueeRow speed={60} gap="4rem">
          <span className="flex items-center gap-16 pr-16 text-[clamp(1.6rem,4vw,3rem)] font-semibold tracking-tight">
            <span className="display">La música no es una vertical</span>
            <span className="text-accent-warm">·</span>
            <span className="display italic">Es un sistema</span>
            <span className="text-accent-warm">·</span>
            <span className="display">La música no es una vertical</span>
            <span className="text-accent-warm">·</span>
            <span className="display italic">Es un sistema</span>
            <span className="text-accent-warm">·</span>
          </span>
        </MarqueeRow>
      </section>

      {/* ───────────────────────── 3. VERTICALES bento asimétrico ───────────────────────── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Lo que hacemos
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Cuatro líneas. Un solo equipo que entiende el sistema entero.
        </SplitTextReveal>

        <StaggerGroup
          stagger={0.1}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2"
        >
          {verticals.map((v) => {
            const img = findAsset("secciones", v.slug);
            const feature = v.feature;
            return (
              <Link
                key={v.href}
                href={v.href}
                data-cursor="link"
                className={`card group relative flex flex-col justify-between overflow-hidden ${
                  feature
                    ? "md:col-span-2 md:row-span-2 md:p-10"
                    : "md:col-span-1"
                }`}
              >
                <div className="relative z-10">
                  <p className="eyebrow mb-3 !text-accent-warm">{v.kicker}</p>
                  <h3
                    className={`display ${feature ? "text-4xl md:text-6xl" : "text-2xl"}`}
                  >
                    {v.title}
                  </h3>
                  <p
                    className={`mt-3 text-text-secondary ${feature ? "max-w-md text-lg" : "text-sm"}`}
                  >
                    {v.desc}
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent-blue">
                    Ver →
                  </span>
                  {img ? (
                    <Image
                      src={img}
                      alt=""
                      width={feature ? 120 : 56}
                      height={feature ? 120 : 56}
                      className={`${feature ? "h-28 w-28" : "h-14 w-14"} object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                    />
                  ) : (
                    <Superhero
                      state={v.state}
                      className={`${feature ? "h-28 w-28" : "h-14 w-14"} opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100`}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* ───────────────────────── 4. STATS ───────────────────────── */}
      <Section className="border-y border-subtle bg-bg-secondary">
        <StaggerGroup
          stagger={0.12}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-[clamp(2.8rem,7vw,5rem)] leading-none text-text-primary">
                {s.n}
                <span className="text-accent-warm">{s.suffix}</span>
              </p>
              <p className="mt-3 text-sm text-text-secondary">{s.label}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      {/* ───────────────────────── 5. MARCAS B2B ───────────────────────── */}
      <Section>
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
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
          </div>
          <RevealOnScroll as="p" className="text-text-secondary md:pb-2" delay={0.15}>
            Producimos activaciones para Ballantine&apos;s, Pernod Ricard,
            Pepsico, Schweppes, Absolut, Universal y Gestmusic. Cuando una marca
            quiere música que la gente recuerde — no decorado — nos llaman.
          </RevealOnScroll>
        </div>
        <RevealOnScroll className="mt-12" delay={0.2}>
          <MarqueeLogoWall items={brands} dir="marcas" speed={40} />
        </RevealOnScroll>
        <RevealOnScroll className="mt-10" delay={0.3}>
          <MagneticButton strength={0.35}>
            <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
          </MagneticButton>
        </RevealOnScroll>
      </Section>

      {/* ───────────────────────── 6. ROSTER scroll horizontal ───────────────────────── */}
      <section className="border-t border-subtle py-20 md:py-28">
        <div className="wrap">
          <RevealOnScroll as="p" className="eyebrow mb-4">
            Roster
          </RevealOnScroll>
          <SplitTextReveal
            as="h2"
            split="lines"
            className="display max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)]"
          >
            Artistas que no necesitan que les expliquemos quiénes son.
          </SplitTextReveal>
        </div>

        <HorizontalScroller className="mt-12">
          {roster.map((a) => {
            const photo = a.image ?? findAsset("artistas", a.slug);
            return (
              <Link
                key={a.slug}
                href={`/artistas/${a.slug}`}
                data-cursor="link"
                className="group relative block h-[60vh] w-[78vw] shrink-0 overflow-hidden rounded-3xl border border-subtle bg-bg-tertiary sm:w-[44vw] md:h-[68vh] md:w-[34vw] lg:w-[26vw]"
              >
                {photo && (
                  <Image
                    src={photo}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 78vw, 26vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    {a.genre}
                  </p>
                  <p className="display mt-1 text-4xl text-white">{a.name}</p>
                  <span className="mt-3 inline-block translate-y-2 text-sm text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/90">
                    Ver ficha →
                  </span>
                </div>
              </Link>
            );
          })}
        </HorizontalScroller>

        <div className="wrap mt-10">
          <MagneticButton strength={0.25}>
            <Cta href="/artistas" variant="ghost">
              Roster completo →
            </Cta>
          </MagneticButton>
        </div>
      </section>

      {/* ───────────────────────── 7. JALEO color burst ───────────────────────── */}
      <JaleoColorBurst />

      {/* ───────────────────────── 8. LAB ───────────────────────── */}
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

      {/* ───────────────────────── 9. QUIÉNES SOMOS ───────────────────────── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Quiénes somos
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Gente del sector. Cansada del sector.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => {
            const photo = findAsset("equipo", p.name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
            return (
              <div key={p.name} className="card">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 22vw"
                      className="object-cover"
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

      {/* ───────────────────────── 10. EN DIRECTO ───────────────────────── */}
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

      {/* ───────────────────────── 11. CTA final ───────────────────────── */}
      <Section className="border-t border-subtle">
        <RevealOnScroll className="relative overflow-hidden rounded-[2rem] border border-subtle bg-text-primary px-8 py-16 text-center text-bg-primary md:py-24">
          <Heading className="mx-auto max-w-3xl !text-bg-primary">
            ¿Marca, artista o promotor? Hablamos.
          </Heading>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Una llamada de 30 minutos. Tú cuentas qué necesitas, nosotros te
            decimos qué se puede hacer de verdad.
          </p>
          <div className="mt-9 flex justify-center">
            <MagneticButton strength={0.4}>
              <Link
                href="/contacto"
                className="btn bg-bg-primary font-semibold text-text-primary"
              >
                Hablamos →
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
