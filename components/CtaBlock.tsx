import type { ReactNode } from "react";
import Link from "next/link";
import { RevealOnScroll, SplitTextReveal, MagneticButton } from "@/components/motion";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Bloque de CTA de Bonito: fondo navy con un acento cian dibujado a mano, en
 * vez de la caja crema sosa de antes. Reutilizable en toda la web (cierres de
 * página de evento, servicios, nosotros…). Un solo protagonista: el botón.
 */
export function CtaBlock({
  title,
  desc,
  href,
  cta = "Hablamos →",
  secondary,
}: {
  title: string;
  desc?: string;
  href: string;
  cta?: string;
  /** Enlace secundario opcional (p.ej. un teléfono) bajo el botón. */
  secondary?: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] px-7 py-16 text-center md:px-16 md:py-24"
      style={{ backgroundColor: NAVY }}
    >
      {/* Acentos cian: glow suave + garabatos hand-drawn (el "rollo" Bonito). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: CYAN }}
      />
      <svg aria-hidden className="pointer-events-none absolute left-6 top-6 h-12 w-12 opacity-80 md:left-10 md:top-9" viewBox="0 0 48 48" fill="none">
        <path d="M24 4 L27 18 L42 14 L30 25 L39 40 L24 31 L9 40 L18 25 L6 14 L21 18 Z" stroke={CYAN} strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute bottom-7 right-8 h-10 w-24 opacity-80 md:bottom-10 md:right-14" viewBox="0 0 96 32" fill="none">
        <path d="M2 20 C 24 4, 44 4, 60 18 C 70 26, 82 26, 94 10" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M94 10 l-12 0 M94 10 l-4 11" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div className="relative z-10">
        <SplitTextReveal as="h2" split="lines" className="display text-white text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
          {title}
        </SplitTextReveal>
        {desc && (
          <RevealOnScroll as="p" className="mx-auto mt-5 max-w-xl text-white/70" delay={0.12}>
            {desc}
          </RevealOnScroll>
        )}
        <RevealOnScroll className="mt-9 flex flex-col items-center gap-4" delay={0.2}>
          <MagneticButton strength={0.4}>
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform duration-200 hover:scale-[1.03]"
              style={{ backgroundColor: CYAN, color: NAVY }}
            >
              {cta}
            </Link>
          </MagneticButton>
          {secondary && <div className="text-sm text-white/60">{secondary}</div>}
        </RevealOnScroll>
      </div>
    </div>
  );
}
