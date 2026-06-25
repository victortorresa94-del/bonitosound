"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type HeroVideoProps = {
  src: string;
  poster?: string;
};

/** Hero con vídeo real (ej. salida de Higgsfield / fal.ai). Reproduce
 *  loop muted playsInline; respeta `prefers-reduced-motion` mostrando el
 *  primer frame congelado. Tiene parallax de salida idéntico a HeroAlive
 *  para que la transición a la primera escena sea consistente. */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

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

      {/* Halo radial sutil para fundir el fondo del vídeo (crema IA) con el
          fondo de la sección. Evita el "cuadrado" cuando el vídeo es 9:16. */}
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
        {/* Wrapper con aspect 9:16 — el vídeo es vertical y debe verse
            entero, no recortado. Limitamos altura para respiro vertical. */}
        <div className="relative aspect-[9/16] h-[88svh] max-h-[88svh] max-w-full">
          <video
            ref={videoRef}
            src={src}
            poster={poster ?? "/img/marca/superheroe-home.png"}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            className="absolute inset-0 h-full w-full object-contain"
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
