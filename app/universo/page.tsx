import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll, StaggerGroup, MagneticButton } from "@/components/motion";
import { Cta } from "@/components/ui";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
import { localePath } from "@/lib/i18n";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function generateMetadata(): Metadata {
  return {
  title: "Universo Bonito — Artiverse, Giraverse y Jaleo Sound",
  description:
    "Lo que Bonito construye por su cuenta: Artiverse conecta el sector, Giraverse ordena las giras y Jaleo Sound lleva la cultura española a Ámsterdam.",
  alternates: alternatesFor(`/universo`),
  };
}

// Las tres cosas que Bonito ha creado: dos apps y un festival. Cada tarjeta
// lleva su logo y enlaza a su sitio (Jaleo, a su página interna).
// logoH: altura en px del logo, tuneada por logo para EQUILIBRARLOS ópticamente
// (Giraverse es un wordmark pesado y ancho → va más bajo; Jaleo es cuadrado →
// va más alto). El ancho sale del ratio real de cada archivo.
const BLOCKS = [
  {
    name: "Artiverse",
    status: "Software B2B · en marcha",
    desc: "La plataforma que conecta agencias, programadores y promotores. Donde el sector deja de trabajar a ciegas y las fechas se cierran con datos, no a base de WhatsApp.",
    logo: findAsset("universo", "logo-artiverse"),
    logoH: 30,
    ratio: 639 / 138,
    href: site.external.artiverse,
    linkLabel: "artiverse.es",
    external: true,
  },
  {
    name: "Giraverse",
    status: "Software · en desarrollo",
    desc: "La circulación de giras, ordenada. Lo que hoy se resuelve con llamadas y suerte —qué artista pasa por dónde y cuándo— convertido en software. En desarrollo.",
    logo: findAsset("universo", "logo-giraverse"),
    logoH: 22,
    ratio: 7391 / 965,
    href: "https://giraverse.es",
    linkLabel: "giraverse.es",
    external: true,
  },
  {
    name: "Jaleo Sound",
    status: "Festival propio · Ámsterdam",
    desc: "Nuestro festival de cultura española y latina en Ámsterdam. Sin escenarios enormes ni zonas VIP: buena música, buena comida y buena gente. 11–12 sep 2026.",
    logo: findAsset("marca", "jaleo-sound"),
    logoH: 44,
    ratio: 1000 / 561,
    // Va a la web oficial del festival, no a la página interna: es un proyecto
    // con vida propia y su sitio está más actualizado que cualquier resumen.
    href: "https://jaleosound.com",
    linkLabel: "El festival",
    external: true,
  },
];

function Card({ b }: { b: (typeof BLOCKS)[number] }) {
  const locale = serverLocale();
  const inner = (
    <>
      {/* Fila de logo con altura común: los logos se centran en ella, así los
          tres pesan lo mismo aunque cada archivo tenga proporciones distintas. */}
      <div className="flex h-14 items-center">
        {b.logo ? (
          <Image
            src={b.logo}
            alt={b.name}
            height={b.logoH}
            width={Math.round(b.logoH * b.ratio)}
            className="w-auto"
            style={{ height: b.logoH }}
          />
        ) : (
          <span className="display text-2xl" style={{ color: NAVY }}>
            {b.name}
          </span>
        )}
      </div>
      <h2 className="sr-only">{b.name}</h2>

      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: CYAN }}>
        {tr(locale, b.status)}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">{tr(locale, b.desc)}</p>

      <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: NAVY }}>
        {tr(locale, b.linkLabel)}
        <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: CYAN }}>
          →
        </span>
      </span>
    </>
  );

  const cls =
    "group flex flex-col rounded-3xl border border-subtle bg-transparent p-7 transition-colors duration-300 hover:border-text-primary";

  return b.external ? (
    <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor="link">
      {inner}
    </a>
  ) : (
    <Link href={b.href} className={cls} data-cursor="link">
      {inner}
    </Link>
  );
}

export default function Universo() {
  const locale = serverLocale();
  return (
    <>
      {/* ── HERO (recreación de la imagen 1, tipografía de la web) ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
          <RevealOnScroll as="p" className="mb-6 text-xs font-bold uppercase tracking-[0.25em]">
            <span style={{ color: CYAN }}>{tr(locale, "Universo Bonito")}</span>
          </RevealOnScroll>
          <RevealOnScroll
            as="h1"
            delay={0.05}
            className="display leading-[0.98] text-[clamp(2.6rem,8vw,5.6rem)]"
          >
            <span style={{ color: NAVY }}>{tr(locale, "No esperamos a que el sector se arregle solo. ")}</span>
            <span style={{ color: CYAN }}>{tr(locale, "Lo construimos.")}</span>
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            delay={0.12}
            className="mt-7 max-w-xl text-lg text-text-secondary md:text-xl"
          >
            {tr(locale, "Cuando entiendes el sistema entero, también le das las herramientas que le faltan. Dos apps y un festival, hechos por nosotros.")}
          </RevealOnScroll>

          {/* 3 bloques con logo + descripción + enlace */}
          <StaggerGroup stagger={0.1} className="mt-14 grid gap-5 md:grid-cols-3">
            {BLOCKS.map((b) => (
              <Card key={b.name} b={b} />
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── CIERRE ── */}
      <section style={{ backgroundColor: "#FBFAF6" }} className="border-t border-subtle">
        <div className="wrap py-20 md:py-28">
          <RevealOnScroll
            as="h2"
            className="display max-w-3xl text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05]"
          >
            <span style={{ color: NAVY }}>
              {tr(locale, "Entender el sistema entero también significa construir lo que le falta.")}
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="mt-9">
            <MagneticButton strength={0.4}>
              <Cta href={localePath("/contacto", locale)}>{tr(locale, "Hablamos")} →</Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
