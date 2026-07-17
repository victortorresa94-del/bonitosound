import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll, StaggerGroup, MagneticButton } from "@/components/motion";
import { Cta } from "@/components/ui";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Universo Bonito — Artiverse, Giraverse y Jaleo Sound",
  description:
    "Lo que Bonito construye por su cuenta: Artiverse conecta el sector, Giraverse ordena las giras y Jaleo Sound lleva la cultura española a Ámsterdam.",
  alternates: { canonical: `${site.url}/universo` },
};

// Las tres cosas que Bonito ha creado: dos apps y un festival. Cada tarjeta
// lleva su logo y enlaza a su sitio (Jaleo, a su página interna).
const BLOCKS = [
  {
    name: "Artiverse",
    blurb: "software B2B en marcha",
    logo: findAsset("universo", "logo-artiverse"),
    href: site.external.artiverse,
    linkLabel: "artiverse.es",
    external: true,
  },
  {
    name: "Giraverse",
    blurb: "software en desarrollo",
    logo: findAsset("universo", "logo-giraverse"),
    href: "https://giraverse.es",
    linkLabel: "giraverse.es",
    external: true,
  },
  {
    name: "Jaleo Sound",
    blurb: "festival en Ámsterdam",
    logo: findAsset("marca", "jaleo-sound"),
    href: "/jaleo-sound",
    linkLabel: "El festival",
    external: false,
  },
];

function Card({ b }: { b: (typeof BLOCKS)[number] }) {
  const inner = (
    <>
      {/* Logo (el propio wordmark hace de título). */}
      <div className="relative h-12 w-full">
        {b.logo ? (
          <Image
            src={b.logo}
            alt={b.name}
            fill
            sizes="(max-width: 640px) 80vw, 320px"
            className="object-contain object-left"
          />
        ) : (
          <span className="display text-2xl" style={{ color: NAVY }}>
            {b.name}
          </span>
        )}
      </div>
      <h2 className="sr-only">{b.name}</h2>
      <p className="mt-5 text-sm text-text-muted">{b.blurb}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: CYAN }}>
        {b.linkLabel}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
  return (
    <>
      {/* ── HERO (recreación de la imagen 1, tipografía de la web) ── */}
      <section style={{ backgroundColor: "#FDF8F0" }}>
        <div className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
          <RevealOnScroll as="p" className="mb-6 text-xs font-bold uppercase tracking-[0.25em]">
            <span style={{ color: CYAN }}>Universo Bonito</span>
          </RevealOnScroll>
          <RevealOnScroll
            as="h1"
            delay={0.05}
            className="display leading-[0.98] text-[clamp(2.6rem,8vw,5.6rem)]"
          >
            <span style={{ color: NAVY }}>No esperamos a que el sector se arregle solo. </span>
            <span style={{ color: CYAN }}>Lo construimos.</span>
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            delay={0.12}
            className="mt-7 max-w-xl text-lg text-text-secondary md:text-xl"
          >
            Cuando entiendes el sistema entero, también le das las herramientas
            que le faltan. Dos apps y un festival, hechos por nosotros.
          </RevealOnScroll>

          {/* 3 bloques con logo + enlace */}
          <StaggerGroup stagger={0.1} className="mt-14 grid gap-5 sm:grid-cols-3">
            {BLOCKS.map((b) => (
              <Card key={b.name} b={b} />
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── CIERRE ── */}
      <section style={{ backgroundColor: "#FDF8F0" }} className="border-t border-subtle">
        <div className="wrap py-20 md:py-28">
          <RevealOnScroll
            as="h2"
            className="display max-w-3xl text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05]"
          >
            <span style={{ color: NAVY }}>
              Entender el sistema entero también significa construir lo que le falta.
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} className="mt-9">
            <MagneticButton strength={0.4}>
              <Cta href="/contacto">Hablamos →</Cta>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
