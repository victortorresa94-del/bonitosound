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

      <div
        ref={wrapRef}
        className="relative flex h-[100svh] w-full items-center justify-center"
        style={{ willChange: "transform, opacity" }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute bottom-9 flex flex-col items-center gap-3">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Baja
        </span>
        <span className="scroll-cue-dark" aria-hidden="true" />
      </div>
    </section>
  );
}
