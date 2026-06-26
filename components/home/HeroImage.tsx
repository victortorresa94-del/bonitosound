"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type HeroImageProps = {
  src: string;
  alt?: string;
};

/** Hero con imagen estática del superhéroe. Entrada con fade+scale,
 *  flotación sutil en loop y parallax de salida al hacer scroll.
 *  Respeta prefers-reduced-motion (imagen quieta, sin animación). */
export function HeroImage({ src, alt = "Bonito Sound" }: HeroImageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const floatEl = floatRef.current;
    if (!section || !wrap || !floatEl) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduced } = ctx.conditions as {
          normal: boolean;
          reduced: boolean;
        };
        if (reduced) return;

        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        );

        // Flotación continua suave del personaje.
        gsap.to(floatEl, {
          y: -16,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        const exit = ScrollTrigger.create({
          id: "bs-hero-exit",
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          animation: gsap.to(wrap, {
            y: -120,
            opacity: 0,
            scale: 0.94,
            ease: "none",
          }),
        });

        return () => {
          exit.kill();
          gsap.killTweensOf(wrap);
          gsap.killTweensOf(floatEl);
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Bonito Sound — superhéroe"
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      <h1 className="sr-only">
        Bonito Sound — el ecosistema cultural integral del sector musical
      </h1>

      {/* Halo radial que funde el fondo de la imagen con el del sitio. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, var(--bg-tertiary) 0%, var(--bg-primary) 60%)",
        }}
      />

      <div
        ref={wrapRef}
        className="relative z-10 flex h-[100svh] w-full items-center justify-center"
        style={{ willChange: "transform, opacity" }}
      >
        <div
          ref={floatRef}
          className="relative aspect-square h-[78svh] max-h-[78svh] max-w-full will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 70vh"
            className="object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      <div className="absolute bottom-9 z-20 flex flex-col items-center gap-3">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Baja
        </span>
        <span className="scroll-cue-dark" aria-hidden="true" />
      </div>
    </section>
  );
}
