import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
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

// Las tres piezas del universo. La imagen es el diseño completo (texto e
// ilustración van dentro); encima se incrusta el logo en el hueco reservado.
// Logos plug-and-play: si el archivo no está, el hueco queda limpio.
const BLOCKS = [
  {
    id: "artiverse",
    name: "Artiverse",
    shape: "square" as const,
    blurb: "software B2B en marcha",
    image: "/img/universo/artiverse.png",
    alt: "Artiverse — el sitio donde el sector deja de trabajar a ciegas. Plataforma B2B que conecta agencias, programadores y promotores.",
    logo: findAsset("universo", "logo-artiverse"),
    href: site.external.artiverse,
    hrefLabel: "Ir a Artiverse",
  },
  {
    id: "giraverse",
    name: "Giraverse",
    shape: "circle" as const,
    blurb: "software en desarrollo",
    image: "/img/universo/giraverse.png",
    alt: "Giraverse — la circulación de giras, ordenada. Lo que hoy se resuelve a base de llamadas y suerte, en desarrollo.",
    logo: findAsset("universo", "logo-giraverse"),
    href: undefined,
    hrefLabel: undefined,
  },
  {
    id: "jaleo",
    name: "Jaleo Sound",
    shape: "triangle" as const,
    blurb: "festival en Ámsterdam",
    image: "/img/universo/jaleo.png",
    alt: "Jaleo Sound — también tenemos un festival. Cultura española y latina en Ámsterdam, 11–12 septiembre 2026, Posthoornkerk.",
    logo: findAsset("marca", "jaleo-sound"),
    href: site.external.jaleo,
    hrefLabel: "jaleosound.com",
  },
];

function Shape({ shape }: { shape: "square" | "circle" | "triangle" }) {
  const common = { fill: "none", stroke: CYAN, strokeWidth: 2.4 };
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden className="mb-5">
      {shape === "square" && <rect x="8" y="8" width="36" height="36" rx="2" {...common} />}
      {shape === "circle" && <circle cx="26" cy="26" r="19" {...common} />}
      {shape === "triangle" && <path d="M26 7 L45 44 L7 44 Z" strokeLinejoin="round" {...common} />}
    </svg>
  );
}

export default function Universo() {
  return (
    <>
      {/* ── HERO (recreación de la imagen 1, tipografía de la web) ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-10 pt-20 md:pt-28">
          <RevealOnScroll as="p" className="mb-6 text-xs font-bold uppercase tracking-[0.25em]">
            <span style={{ color: CYAN }}>Universo Bonito · 01/04</span>
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
            que le faltan.
          </RevealOnScroll>

          {/* 3 bloques */}
          <StaggerGroup stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-3">
            {BLOCKS.map((b) => (
              <Link
                key={b.id}
                href={`#${b.id}`}
                className="group flex flex-col rounded-3xl border border-subtle bg-transparent p-7 transition-colors duration-300 hover:border-text-primary"
                data-cursor="link"
              >
                <Shape shape={b.shape} />
                <h2 className="display text-3xl" style={{ color: NAVY }}>
                  {b.name}
                </h2>
                <p className="mt-2 text-sm text-text-muted">{b.blurb}</p>
              </Link>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── LAS TRES PIEZAS (imágenes tal cual + logo incrustado) ── */}
      {BLOCKS.map((b) => (
        <section key={b.id} id={b.id} style={{ backgroundColor: "#FBFAF6" }} className="scroll-mt-24">
          <div className="wrap py-8 md:py-12">
            <RevealOnScroll className="relative mx-auto w-full max-w-3xl">
              <Image
                src={b.image}
                alt={b.alt}
                width={1024}
                height={1536}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full"
                priority={b.id === "artiverse"}
              />

              {/* Logo incrustado en el hueco reservado (arriba-izquierda). */}
              {b.logo && (
                <span className="absolute left-[4.5%] top-[3.5%] block h-[14%] w-[42%]">
                  <Image
                    src={b.logo}
                    alt={`Logo ${b.name}`}
                    fill
                    sizes="42vw"
                    className="object-contain object-left-top"
                  />
                </span>
              )}

              {/* Jaleo: el "¿Hablamos?" del diseño, clicable → contacto. */}
              {b.id === "jaleo" && (
                <Link
                  href="/contacto"
                  aria-label="Hablamos"
                  className="absolute left-[5%] top-[86%] block h-[7%] w-[36%]"
                  data-cursor="cta"
                />
              )}
            </RevealOnScroll>

            {/* Enlace real a la web del proyecto, cuando existe. */}
            {b.href && (
              <div className="mt-6 flex justify-center">
                <a href={b.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  {b.hrefLabel} →
                </a>
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
