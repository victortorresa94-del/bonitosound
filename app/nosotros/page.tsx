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
import { EventHeroVideo } from "@/components/eventos/EventHeroVideo";
import { CtaBlock } from "@/components/CtaBlock";
import { InstagramReel } from "@/components/Embeds";
import { ServiceIcon, type IconName } from "@/components/services/ServiceIcon";
import { findLogo, findAsset } from "@/lib/assets";
import { DaniGaleria } from "@/components/nosotros/DaniGaleria";
import { getPosts } from "@/lib/blog";
import { team, memberships, support, supportPending, site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { paginaCa } from "@/lib/content-i18n";
import { tr } from "@/lib/copy-ca";
import { postCa } from "@/lib/content-md-ca";
import { localePath } from "@/lib/i18n";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function generateMetadata(): Metadata {
  // En catalán manda la traducción; si faltara, se queda el castellano.
  const trad = serverLocale() === "ca" ? paginaCa("nosotros") : undefined;
  return {
  title: trad?.title ?? "Nosotros — Quiénes están detrás de Bonito Sound",
  description:
    trad?.desc ?? "El equipo de Bonito Sound en Sabadell: 30 años de oficio, +150 lanzamientos desde 2022, 250 eventos. Dani Boada y la gente que lo lleva.",
  alternates: alternatesFor(`/nosotros`),
  };
}

// Tiles del banner de Instagram. Vídeos verticales LOCALES (formato reel 9:16,
// mudos en bucle) + el reel de IG que pasó Víctor como embed. Cris hablando
// solo vive AQUÍ (fuera de eventos). Para que el reel de IG quede idéntico a
// los locales, basta bajar su .mp4 a /public/video/nosotros/ y cambiar su tile
// a { kind: "video", src: "…" }.
type DiaTile =
  | { kind: "video"; src: string; label: string }
  | { kind: "reel"; url: string };

const DIA_A_DIA_TILES: DiaTile[] = [
  { kind: "video", src: "/video/nosotros/cris.mp4", label: "Cris" },
  { kind: "video", src: "/video/home/top-bonito.mp4", label: "Bonito Sound" },
  { kind: "video", src: "/video/eventos/natura.mp4", label: "Nàtura" },
  { kind: "video", src: "/video/eventos/corona.mp4", label: "Corona" },
];

// Números reales (nada inventado): fundación, sello, eventos.
const STATS = [
  { n: "30", l: ["años", "de oficio"] },
  { n: "2022", l: ["montamos", "Bonito"] },
  { n: "+150", l: ["lanzamientos", "desde 2022"] },
  { n: "250", l: ["eventos", "realizados"] },
];

// Artistas con los que Dani ha trabajado en su carrera (a algunos los
// descubrió). Es su trayectoria de 30 años, NO producciones de Bonito Sound.
// Si algún día hay foto/logo en /img/artistas-dani/<slug>, la tarjeta la pinta.
const DANI_ARTISTS = [
  "Antonio Orozco",
  "Maldita Nerea",
  "Efecto Pasillo",
  "Ruth Lorenzo",
  "Alfred García",
  "Ramon Mirabet",
  "Albert Pla",
];

// Lo que firmas con nosotros (principios, sin cifras). Cada uno con su icono.
const PRINCIPIOS: { t: string; d: string; icon: IconName }[] = [
  { t: "Pacto antes de empezar", icon: "management", d: "Lo que prometemos en la primera llamada acaba por escrito antes del primer movimiento. Cero acuerdos verbales que luego nadie recuerda." },
  { t: "Exclusividad solo donde aporta", icon: "estrategia", d: "Si te llevamos en booking no te obligamos a fichar también el sello. Cada servicio se contrata y se justifica por separado." },
  { t: "Salida ordenada", icon: "calendario", d: "Si la cosa no va, se acaba sin pelea. Plazo de aviso corto, devolución de lo que es tuyo, y a otra cosa." },
  { t: "Tu música, tus másters", icon: "disco", d: "Lo que produzcamos juntos se acuerda en el papel: a quién pertenece, durante cuánto y cómo revierte. Sin ambigüedad." },
  { t: "Sin cláusulas trampa", icon: "derechos", d: "Nada de obligar a sacar X canciones al año ni a cubrir gastos imposibles. Si hay que renegociar, se renegocia." },
  { t: "Cuentas claras", icon: "crecimiento", d: "Liquidaciones a tiempo y trimestrales. Si una plataforma se retrasa, te lo decimos." },
];

// El sector nos conoce → tarjetas con enlace a la web de cada institución.
// URLs oficiales; confirmar con Víctor si alguna cambia de dominio.
const INSTITUCIONES: { t: string; d: string; url: string }[] = [
  { t: "Fabra i Coats", url: "https://www.barcelona.cat/fabraicoats", d: "Proyecto residente 2025 de la fábrica de creación del Ajuntament de Barcelona." },
  { t: "Redescena", url: "https://www.redescena.net", d: "Compañía inscrita en la Red Española de Teatros, Auditorios, Circuitos y Festivales." },
  { t: "Fundació Catalunya Cultura", url: "https://www.catalunyacultura.cat", d: "Proyecto acompañado por la fundación que conecta cultura y empresa en Catalunya." },
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

/** Tarjeta de artista de la trayectoria de Dani. Si hay foto/logo en
 *  /img/artistas-dani/<slug>, se pinta; si no, iniciales sobre navy (limpio,
 *  de galería) + el nombre debajo. Se puede subir la imagen cuando la haya. */
function DaniArtistCard({ name }: { name: string }) {
  const img = findLogo("artistas-dani", name);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="group overflow-hidden rounded-2xl border border-subtle bg-bg-primary">
      <div
        className="relative aspect-square overflow-hidden"
        style={{ background: "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
      >
        {img ? (
          <Image src={img} alt={name} fill sizes="(max-width: 640px) 45vw, 220px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <span className="font-round text-4xl font-bold text-white/15 md:text-5xl">{initials}</span>
            <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full" style={{ backgroundColor: CYAN }} />
          </div>
        )}
      </div>
      <div className="px-3 py-3">
        <h3 className="display text-sm leading-tight md:text-base">{name}</h3>
      </div>
    </div>
  );
}

export default function Nosotros() {
  const locale = serverLocale();
  const posts = getPosts().slice(0, 3).map((x) => postCa(x, locale));
  const heroImg = findAsset("heroes", "nosotros") ?? findLogo("heroes", "nosotros");

  // Apoyos: los que tienen logo van como logo; los que no, más pequeños y abajo.
  const apoyoAll = [...support, ...supportPending];
  const apoyoConLogo = apoyoAll.filter((n) => findLogo("apoyos", n));
  const apoyoSinLogo = apoyoAll.filter((n) => !findLogo("apoyos", n));

  // WhatsApp a partir del teléfono real de Bonito (sin inventar número).
  const waLink = `https://wa.me/${site.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("¡Hola Bonito! Os escribo desde la web.")}`;

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-5">
              {tr(locale, "Qué somos")}
            </RevealOnScroll>
            <RevealOnScroll as="h1" className="display leading-[1.02] text-[clamp(2.6rem,6.5vw,4.6rem)]">
              <span style={{ color: NAVY }}>{tr(locale, "Somos la gente")}</span>
              <br />
              <span style={{ color: CYAN }}>{tr(locale, "del sector.")}</span>
            </RevealOnScroll>
            <RevealOnScroll as="p" delay={0.2} className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              {tr(locale, "Booking, management, sello, distribución y eventos. Una agencia musical joven con treinta años de oficio detrás. Hacemos las cosas bonitas, sin postureo, porque nos gusta de verdad.")}
            </RevealOnScroll>
          </div>
          {heroImg ? (
            <RevealOnScroll delay={0.15} className="relative mx-auto aspect-square w-full max-w-lg">
              <Image src={heroImg} alt={tr(locale, "El equipo de Bonito Sound")} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-contain" priority />
            </RevealOnScroll>
          ) : null}
        </div>
      </section>

      {/* ── NÚMEROS (2º banner) ── */}
      <Section className="bg-bg-primary">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.n}>
              <p className="font-round font-bold leading-none" style={{ color: NAVY, fontSize: "clamp(2.6rem,6vw,4.4rem)" }}>{s.n}</p>
              <p className="mt-2 text-sm font-semibold uppercase leading-tight tracking-wide" style={{ color: NAVY }}>
                {tr(locale, s.l[0])}<br />{tr(locale, s.l[1])}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── HISTORIA + VÍDEO (combinados: se lee mientras se ve) ── */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <RevealOnScroll as="h2" className="display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.08]">
              <span style={{ color: NAVY }}>{tr(locale, "Bonito Sound se monta en 2022 en Sabadell. ")}</span>
              <span style={{ color: CYAN }}>{tr(locale, "La empresa es joven; el oficio, no.")}</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.12} className="mt-7 space-y-5 text-lg leading-relaxed text-text-secondary">
              <p>
                {tr(locale, "Dani lleva treinta años en la industria musical española. Treinta años dan para ver de todo: sobre todo, para ver lo que no funciona y por qué nadie lo arregla.")}
              </p>
              <p>
                {tr(locale, "Montamos Bonito para arreglarlo, juntando bajo un mismo techo lo que el sector te hace montar con cinco proveedores.")}
              </p>
              <p>
                {tr(locale, "Somos pocos, hacemos mucho y cogemos el teléfono. No damos keynote: montamos lo que se ve en el escenario.")}
              </p>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15} className="mx-auto w-full max-w-[360px] md:max-w-none">
            <InstagramReel url="https://www.instagram.com/reel/DCOfx1YKHsP/" title={tr(locale, "Presentación de Bonito Sound")} />
          </RevealOnScroll>
        </div>
      </Section>

      {/* ── EQUIPO ── */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">{tr(locale, "El equipo")}</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          {tr(locale, "Gente con nombre y teléfono.")}
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mx-auto mt-14 grid grid-cols-1 justify-items-center gap-y-10 lg:grid-cols-5 lg:justify-items-stretch lg:gap-x-8 lg:gap-y-12">
          {team.map((p) => {
            const illustration = findLogo("equipo/ilustracion", p.name);
            const photo = findLogo("equipo", p.name);
            const image = illustration ?? photo;
            return (
              <div key={p.name} className="group w-full max-w-[240px] lg:max-w-none">
                <div
                  className={`relative mb-5 aspect-[4/5] ${illustration ? "" : "overflow-hidden rounded-2xl bg-bg-tertiary"}`}
                >
                  {image && (
                    <Image
                      src={image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 240px, 20vw"
                      className={`transition-transform duration-700 group-hover:scale-105 ${illustration ? "object-contain" : "object-cover grayscale"}`}
                    />
                  )}
                </div>
                <h3 className="display text-2xl leading-tight">{p.name}</h3>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-text-muted">{tr(locale, p.role)}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{tr(locale, p.line)}</p>
              </div>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* ── BANNER INSTAGRAM: el día a día (vídeos verticales locales, no embeds) ── */}
      <Section>
        <RevealOnScroll className="overflow-hidden rounded-3xl border border-subtle bg-bg-tertiary px-6 py-10 md:px-12 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_0.45fr]">
            <div>
              <p className="eyebrow mb-4">{tr(locale, "El día a día")}</p>
              <SplitTextReveal as="h2" split="lines" className="display text-[clamp(1.8rem,4vw,3rem)]">
                {tr(locale, "Lo que montamos, semana a semana.")}
              </SplitTextReveal>
              <p className="mt-5 max-w-md text-text-secondary">
                {tr(locale, "Directos, backstage y lo que va cayendo. Como el vídeo de Cris: así trabajamos. Hay mucho más de esto ahí dentro.")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <MagneticButton strength={0.35}>
                  <Cta href={site.social.instagram} external>{tr(locale, "Míranos en Instagram →")}</Cta>
                </MagneticButton>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-subtle px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary/30"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#25D366]" fill="currentColor" aria-hidden>
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.09c-.24.68-1.42 1.32-1.96 1.36-.5.05-1.14.07-1.84-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.57-.36.76-.36l.55.01c.18.01.41-.07.64.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.28.55-.57.53-.28.9-.14.16-.29.37-.42.49-.14.14-.28.29-.12.57.16.29.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.29.36-.24.61-.14.24.09 1.55.73 1.82.86.27.14.45.2.51.31.07.12.07.66-.17 1.34Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="relative mx-auto hidden aspect-square w-full max-w-[220px] md:block">
              <Image src="/img/marca/banner-instagram.png" alt="" fill sizes="220px" className="object-contain" aria-hidden />
            </div>
          </div>

          {/* Vídeos verticales locales (marco reel) + el reel de IG. Scroll
              horizontal con snap en móvil; fila centrada en escritorio. */}
          <StaggerGroup
            stagger={0.1}
            className="mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 md:mt-12 md:justify-center md:gap-6 md:overflow-visible"
          >
            {DIA_A_DIA_TILES.map((t) =>
              t.kind === "video" ? (
                <div
                  key={t.src}
                  className="relative aspect-[9/16] w-[58vw] max-w-[220px] shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:w-[42vw] md:w-[200px]"
                >
                  <EventHeroVideo src={t.src} label={t.label} />
                </div>
              ) : (
                <div key={t.url} className="w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-[280px]">
                  <InstagramReel url={t.url} title={tr(locale, "Reel de Bonito Sound")} />
                </div>
              ),
            )}
          </StaggerGroup>
        </RevealOnScroll>
      </Section>

      {/* ── DANI, EL FUNDADOR — rediseñado: dimensiones equilibradas + tarjetas ── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">{tr(locale, "Dani Boada · Fundador")}</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display mb-10 text-[clamp(2rem,4.5vw,3.4rem)]">
          {tr(locale, "Treinta años en esto. Y sigue al teléfono.")}
        </SplitTextReveal>

        {/* Entrevista (vertical, local, con sonido) a la IZQUIERDA en formato
            reel; experiencia a la DERECHA. Dos columnas equilibradas. */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <RevealOnScroll className="mx-auto w-full max-w-[300px] md:order-1">
            <R2Video src="/video/nosotros/entrevista-dani.mp4" ratio="9 / 16" />
            <p className="mt-4 text-center text-sm text-text-muted">{tr(locale, "La entrevista a Dani, sin guion.")}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="space-y-5 text-base leading-relaxed text-text-secondary md:order-2 md:text-lg">
            <p>
              {tr(locale, "Management, contratos y la llamada que cierra el bolo: ese es el día a día de Dani. En treinta años en la industria ha llevado a artistas que hoy llenan estadios.")}
            </p>
            <p>
              {tr(locale, "Empezó donde se aprende de verdad: cargando y montando. Backliner, producción técnica y dirección de giras por toda España, de sala en sala y de furgoneta en furgoneta. También producción en televisión, en")}{" "}
              <em>Tu Cara Me Suena</em>
              {tr(locale, ". Nada de lo que pide hoy a un equipo es algo que no haya hecho antes él.")}
            </p>
            <p>
              {tr(locale, "Ha visto de todo lo que se puede ver en este oficio: lo que funciona, lo que no, y por qué. Ese recorrido es lo que hay detrás de cada decisión que tomamos en Bonito.")}
            </p>
          </RevealOnScroll>
        </div>

        {/* Su archivo: las fotos justifican lo que cuenta el texto. */}
        <DaniGaleria />

        {/* Tarjetas de los artistas de su trayectoria (en condiciones). */}
        <RevealOnScroll className="mt-14 border-t border-subtle pt-10">
          <p className="eyebrow mb-7">{tr(locale, "Ha trabajado con")}</p>
          <StaggerGroup stagger={0.06} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {DANI_ARTISTS.map((name) => (
              <DaniArtistCard key={name} name={name} />
            ))}
          </StaggerGroup>
        </RevealOnScroll>
      </Section>

      {/* ── LO QUE FIRMAS (con iconos) ── */}
      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">{tr(locale, "Cómo trabajamos")}</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
          {tr(locale, "Lo que firmas con nosotros.")}
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-6 max-w-2xl text-text-secondary" delay={0.15}>
          {tr(locale, "En este sector, demasiados artistas descubren la letra pequeña cuando ya es tarde. Con nosotros no hay letra pequeña. Los números se hablan; los principios, aquí.")}
        </RevealOnScroll>
        <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-2">
          {PRINCIPIOS.map((p) => (
            <div key={p.t} className="card flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "rgba(22,182,212,0.1)", color: NAVY }}>
                <ServiceIcon name={p.icon} />
              </span>
              <div>
                <h3 className="display text-xl">{tr(locale, p.t)}</h3>
                <p className="mt-2 text-text-secondary">{tr(locale, p.d)}</p>
              </div>
            </div>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── EL SECTOR NOS CONOCE (tarjetas con enlace) ── */}
      <Section>
        <RevealOnScroll as="p" className="eyebrow mb-4">{tr(locale, "El sector nos conoce")}</RevealOnScroll>
        <SplitTextReveal as="h2" split="lines" className="display text-[clamp(1.8rem,4vw,3rem)]">
          {tr(locale, "Programas e instituciones con las que andamos.")}
        </SplitTextReveal>
        <StaggerGroup stagger={0.1} className="mt-12 grid gap-6 md:grid-cols-3">
          {INSTITUCIONES.map((inst) => (
            <a
              key={inst.t}
              href={inst.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex flex-col"
            >
              <h3 className="display text-xl text-text-primary transition-colors group-hover:text-accent-cyan">{inst.t}</h3>
              <p className="mt-3 flex-1 text-sm text-text-secondary">{tr(locale, inst.d)}</p>
              <span className="mt-5 text-sm font-semibold text-accent-cyan">
                {tr(locale, "Ver")} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </StaggerGroup>
      </Section>

      {/* ── BANNER NAVY: LOGOS (sin los títulos sobrantes) ── */}
      <section className="w-full" style={{ backgroundColor: NAVY }}>
        <div className="wrap py-16 md:py-24">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/55">
            {tr(locale, "Miembros activos de")}
          </p>
          <StaggerGroup stagger={0.05} className="flex flex-wrap gap-3 md:gap-4">
            {memberships.map((name) => (
              <LogoChip key={name} dir="instituciones" name={name} />
            ))}
          </StaggerGroup>

          <p className="mb-5 mt-12 text-xs font-bold uppercase tracking-[0.18em] text-white/55">
            {tr(locale, "Con el apoyo de")}
          </p>
          <StaggerGroup stagger={0.05} className="flex flex-wrap gap-3 md:gap-4">
            {apoyoConLogo.map((name) => (
              <LogoChip key={name} dir="apoyos" name={name} />
            ))}
          </StaggerGroup>
          {apoyoSinLogo.length > 0 && (
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/45">
              {tr(locale, "También con el apoyo de")} {apoyoSinLogo.join(" · ")}.
            </p>
          )}
        </div>
      </section>

      {posts.length > 0 && (
        <Section className="bg-bg-primary">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <RevealOnScroll as="p" className="eyebrow mb-4">
                Blog
              </RevealOnScroll>
              <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
                {tr(locale, "Lo que pensamos, escrito.")}
              </SplitTextReveal>
            </div>
            <RevealOnScroll delay={0.1}>
              <Link href={localePath("/diario", locale)} className="more-link">
                {tr(locale, "Ver el blog")} <span className="arrow">→</span>
              </Link>
            </RevealOnScroll>
          </div>
          <StaggerGroup stagger={0.08} className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={localePath(`/diario/${p.slug}`, locale)}
                className="card group flex flex-col"
                data-cursor="link"
              >
                <p className="eyebrow mb-3">{p.cluster ?? "Blog"}</p>
                <h3 className="display text-xl leading-tight text-text-primary transition-colors group-hover:text-accent-cyan">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-text-secondary">{p.description}</p>
                <span className="mt-5 text-sm font-semibold text-accent-cyan">{tr(locale, "Leer →")}</span>
              </Link>
            ))}
          </StaggerGroup>
        </Section>
      )}

      {/* ── CTA ── */}
      <Section>
        <CtaBlock
          title={tr(locale, "¿Hablamos?")}
          desc={tr(locale, "Cuéntanos qué tienes en la cabeza. Te contestamos nosotros, no un bot.")}
          href={localePath("/contacto", locale)}
        />
      </Section>
    </>
  );
}
