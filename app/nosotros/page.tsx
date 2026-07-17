import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
import { R2Video } from "@/components/R2Video";
import { CtaBlock } from "@/components/CtaBlock";
import { InstagramReel } from "@/components/Embeds";
import { findLogo, findAsset } from "@/lib/assets";
import { getPosts } from "@/lib/blog";
import { team, memberships, support, supportPending, site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Nosotros — Quiénes están detrás de Bonito Sound",
  description:
    "El equipo de Bonito Sound en Sabadell: 30 años de oficio, +150 lanzamientos desde 2022, 250 eventos. Dani Boada y la gente que lo lleva.",
  alternates: { canonical: `${site.url}/nosotros` },
};

// Números reales (nada inventado): fundación, sello, eventos.
const STATS = [
  { n: "30", l: ["años", "de oficio"] },
  { n: "2022", l: ["montamos", "Bonito"] },
  { n: "+150", l: ["lanzamientos", "desde 2022"] },
  { n: "250", l: ["eventos", "realizados"] },
];

// Artistas con los que Dani ha trabajado en su carrera (a algunos los
// descubrió). Es su trayectoria de 30 años, NO producciones de Bonito Sound.
const DANI_ARTISTS = [
  "Antonio Orozco",
  "Maldita Nerea",
  "Efecto Pasillo",
  "Ruth Lorenzo",
  "Alfred García",
  "Ramon Mirabet",
  "Albert Pla",
];

// Lo que firmas con nosotros (principios, sin cifras). Recuperado de Records.
const PRINCIPIOS = [
  { t: "Pacto antes de empezar", d: "Lo que prometemos en la primera llamada acaba por escrito antes del primer movimiento. Cero acuerdos verbales que luego nadie recuerda." },
  { t: "Exclusividad solo donde aporta", d: "Si te llevamos en booking no te obligamos a fichar también el sello. Cada servicio se contrata y se justifica por separado." },
  { t: "Salida ordenada", d: "Si la cosa no va, se acaba sin pelea. Plazo de aviso corto, devolución de lo que es tuyo, y a otra cosa." },
  { t: "Tu música, tus másters", d: "Lo que produzcamos juntos se acuerda en el papel: a quién pertenece, durante cuánto y cómo revierte. Sin ambigüedad." },
  { t: "Sin cláusulas trampa", d: "Nada de obligar a sacar X canciones al año ni a cubrir gastos imposibles. Si hay que renegociar, se renegocia." },
  { t: "Cuentas claras", d: "Liquidaciones a tiempo y trimestrales. Si una plataforma se retrasa, te lo decimos." },
];

const INSTITUCIONES = [
  ["Fabra i Coats", "Proyecto residente 2025 de la fábrica de creación del Ajuntament de Barcelona."],
  ["Redescena", "Compañía inscrita en la Red Española de Teatros, Auditorios, Circuitos y Festivales."],
  ["Fundació Catalunya Cultura", "Proyecto acompañado por la fundación que conecta cultura y empresa en Catalunya."],
];

/** Logo del banner navy. Los logos de instituciones son blancos (y los de
 *  apoyo, mezcla) → los normalizamos todos a blanco con un filtro para que se
 *  vean SIEMPRE, limpios y uniformes, sobre el fondo oscuro. Si falta el logo,
 *  cae a un chip con el nombre. */
function LogoChip({ dir, name }: { dir: string; name: string }) {
  const src = findLogo(dir, name);
  if (src) {
    return (
      <div className="flex h-16 items-center justify-center px-2 md:h-20 md:px-4">
        <Image
          src={src}
          alt={name}
          width={170}
          height={52}
          className="h-9 w-auto max-w-[160px] object-contain opacity-90 transition-opacity hover:opacity-100 md:h-11"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    );
  }
  return (
    <div className="flex h-16 items-center justify-center rounded-xl border border-white/25 px-5 md:h-20 md:px-7">
      <span className="text-center text-sm font-semibold text-white/85">{name}</span>
    </div>
  );
}

export default function Nosotros() {
  const posts = getPosts().slice(0, 3);
  const heroImg = findAsset("heroes", "nosotros") ?? findLogo("heroes", "nosotros");
  const daniPhoto = findLogo("equipo", "Dani Boada");

  // Apoyos: los que tienen logo van como logo; los que no, más pequeños y abajo.
  const apoyoAll = [...support, ...supportPending];
  const apoyoConLogo = apoyoAll.filter((n) => findLogo("apoyos", n));
  const apoyoSinLogo = apoyoAll.filter((n) => !findLogo("apoyos", n));

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-5">
              Qué somos
            </RevealOnScroll>
            <RevealOnScroll as="h1" className="display leading-[1.02] text-[clamp(2.6rem,6.5vw,4.6rem)]">
              <span style={{ color: NAVY }}>Somos la gente</span>
              <br />
              <span style={{ color: CYAN }}>del sector.</span>
            </RevealOnScroll>
            <RevealOnScroll as="p" delay={0.2} className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              Booking, management, sello, distribución y eventos. Una agencia
              musical joven con treinta años de oficio detrás. Hacemos las cosas
              bonitas, sin postureo, porque nos gusta de verdad.
            </RevealOnScroll>
          </div>
          {heroImg ? (
            <RevealOnScroll delay={0.15} className="relative mx-auto aspect-square w-full max-w-lg">
              <Image src={heroImg} alt="El equipo de Bonito Sound" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-contain" priority />
            </RevealOnScroll>
          ) : null}
        </div>
      </section>

      {/* ── HISTORIA (a todo el ancho: lead grande + cuerpo) ── */}
      <Section>
        <div className="grid items-start gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
          <RevealOnScroll as="h2" className="display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08]">
            <span style={{ color: NAVY }}>Bonito Sound se monta en 2022 en Sabadell. </span>
            <span style={{ color: CYAN }}>La empresa es joven; el oficio, no.</span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12} className="space-y-5 text-lg leading-relaxed text-text-secondary">
            <p>
              Dani lleva treinta años en la industria musical española. Treinta
              años dan para ver de todo: sobre todo, para ver lo que no funciona y
              por qué nadie lo arregla.
            </p>
            <p>
              Montamos Bonito para arreglarlo, juntando bajo un mismo techo lo que
              el sector te hace montar con cinco proveedores.
            </p>
            <p>
              Somos pocos, hacemos mucho y cogemos el teléfono. No damos keynote:
              montamos lo que se ve en el escenario.
            </p>
          </RevealOnScroll>
        </div>
      </Section>

      {/* ── NÚMEROS ── */}
      <Section className="bg-bg-primary">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.n}>
              <p className="font-round font-bold leading-none" style={{ color: NAVY, fontSize: "clamp(2.6rem,6vw,4.4rem)" }}>{s.n}</p>
              <p className="mt-2 text-sm font-semibold uppercase leading-tight tracking-wide" style={{ color: NAVY }}>
                {s.l[0]}<br />{s.l[1]}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EL DÍA A DÍA (IG) — subido ── */}
      <Section>
        <div className="grid items-center gap-8 md:grid-cols-[1fr_0.5fr]">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">El día a día</RevealOnScroll>
            <SplitTextReveal as="h2" split="lines" className="display text-[clamp(1.8rem,4vw,3rem)]">
              Lo que montamos, semana a semana.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-5 max-w-md text-text-secondary" delay={0.15}>
              Lo de dentro está en Instagram: directos, backstage y lo que va cayendo.
            </RevealOnScroll>
            <RevealOnScroll className="mt-7" delay={0.25}>
              <MagneticButton strength={0.35}>
                <Cta href={site.social.instagram} external>Síguenos en Instagram →</Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <InstagramReel url="https://www.instagram.com/reel/DCOfx1YKHsP/" title="Presentación de Bonito Sound" />
          </RevealOnScroll>
        </div>
      </Section>

      {/* ── EQUIPO ── */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">El equipo</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Gente con nombre y teléfono.
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mx-auto mt-14 flex flex-wrap justify-center gap-x-8 gap-y-12">
          {team.map((p) => {
            const photo = findLogo("equipo", p.name);
            return (
              <div key={p.name} className="group w-[45%] max-w-[230px] sm:w-[230px]">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-bg-tertiary">
                  {photo && (
                    <Image src={photo} alt={p.name} fill sizes="(max-width: 640px) 45vw, 230px" className="object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
                <h3 className="display text-2xl leading-tight">{p.name}</h3>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">{p.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{p.line}</p>
              </div>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* ── DANI, EL CEO — bajado. Nombres a lo ancho, destacados ── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">Dani Boada · Fundador</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display mb-10 text-[clamp(2rem,4.5vw,3.4rem)]">
          Treinta años. Y sigue cogiendo el teléfono.
        </SplitTextReveal>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <RevealOnScroll className="space-y-5">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-bg-tertiary">
              {daniPhoto && (
                <Image src={daniPhoto} alt="Dani Boada" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
              )}
            </div>
            <p className="text-lg leading-relaxed text-text-secondary">
              Management, contratos y la llamada que cierra el bolo. En treinta
              años en la industria, Dani ha trabajado con —y descubierto a—
              artistas que hoy llenan estadios. Ese oficio es lo que hay detrás de
              cada decisión de Bonito.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <R2Video src="entrevista-dani.mp4" ratio="16 / 9" />
            <p className="mt-4 text-sm text-text-muted">La entrevista a Dani, sin guion.</p>
          </RevealOnScroll>
        </div>

        {/* Nombres a lo ancho: los artistas de su carrera, destacados. */}
        <RevealOnScroll className="mt-14 border-t border-subtle pt-9">
          <p className="eyebrow mb-6">Ha trabajado con — y descubierto a —</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-round font-bold leading-none" style={{ color: NAVY }}>
            {DANI_ARTISTS.map((name, i) => (
              <span key={name} className="flex items-center whitespace-nowrap text-[clamp(1.5rem,3.4vw,2.6rem)]">
                {i > 0 && <span className="mr-8" style={{ color: CYAN }} aria-hidden>·</span>}
                {name}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* ── LO QUE FIRMAS ── */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">Cómo trabajamos</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          Lo que firmas con nosotros.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-6 max-w-2xl text-text-secondary" delay={0.15}>
          En este sector, demasiados artistas descubren la letra pequeña cuando
          ya es tarde. Con nosotros no hay letra pequeña. Los números se hablan;
          los principios, aquí.
        </RevealOnScroll>
        <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-2">
          {PRINCIPIOS.map((p) => (
            <div key={p.t} className="card">
              <h3 className="display text-xl">{p.t}</h3>
              <p className="mt-3 text-text-secondary">{p.d}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── EL SECTOR NOS CONOCE (cards) ── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">El sector nos conoce</RevealOnScroll>
        <StaggerGroup stagger={0.1} className="grid gap-6 md:grid-cols-3">
          {INSTITUCIONES.map(([t, d]) => (
            <div key={t} className="card">
              <h3 className="display text-xl">{t}</h3>
              <p className="mt-3 text-sm text-text-secondary">{d}</p>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── BANNER NAVY: LOGOS (visibles sobre chip blanco) ── */}
      <section className="w-full" style={{ backgroundColor: NAVY }}>
        <div className="wrap py-16 md:py-24">
          <RevealOnScroll as="p" className="mb-3 text-xs font-bold uppercase tracking-[0.22em]" >
            <span style={{ color: CYAN }}>Respaldo institucional</span>
          </RevealOnScroll>
          <SplitTextReveal as="h2" split="lines" className="display text-white text-[clamp(1.9rem,4.5vw,3.2rem)]">
            Con quién estamos.
          </SplitTextReveal>

          <p className="mb-5 mt-12 text-xs font-bold uppercase tracking-[0.18em] text-white/55">
            Miembros activos de
          </p>
          <StaggerGroup stagger={0.05} className="flex flex-wrap gap-3 md:gap-4">
            {memberships.map((name) => (
              <LogoChip key={name} dir="instituciones" name={name} />
            ))}
          </StaggerGroup>

          <p className="mb-5 mt-12 text-xs font-bold uppercase tracking-[0.18em] text-white/55">
            Con el apoyo de
          </p>
          <StaggerGroup stagger={0.05} className="flex flex-wrap gap-3 md:gap-4">
            {apoyoConLogo.map((name) => (
              <LogoChip key={name} dir="apoyos" name={name} />
            ))}
          </StaggerGroup>
          {apoyoSinLogo.length > 0 && (
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/45">
              También con el apoyo de {apoyoSinLogo.join(" · ")}.
            </p>
          )}
        </div>
      </section>

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
              <Link href="/diario" className="more-link">
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

      {/* ── CTA ── */}
      <Section>
        <CtaBlock
          title="¿Hablamos?"
          desc="Cuéntanos qué tienes en la cabeza. Te contestamos nosotros, no un bot."
          href="/contacto"
          cta="Hablamos →"
        />
      </Section>
    </>
  );
}
