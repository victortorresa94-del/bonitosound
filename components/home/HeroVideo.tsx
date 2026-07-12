"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type HeroVideoProps = {
  src: string;
  poster: string;
};

/**
 * Hero con vídeo (0711, editado por el cliente). Autoplay mudo en loop,
 * object-cover a pantalla completa, entrada con fade y salida con parallax
 * al hacer scroll. Respeta prefers-reduced-motion: no reproduce, muestra el
 * poster fijo. El poster carga al instante y evita parpadeo mientras baja el mp4.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!section || !wrap || !video) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduced } = ctx.conditions as { normal: boolean; reduced: boolean };

        if (reduced) {
          // Sin movimiento: dejamos el poster fijo, no reproducimos.
          video.pause();
          return;
        }

        video.play().catch(() => {
          /* autoplay puede fallar hasta interacción; el poster cubre el hueco */
        });

        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" }
        );

        const exit = ScrollTrigger.create({
          id: "bs-hero-exit",
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          // Parallax suave de salida. Sin fundido a 0 (antes "desaparecía").
          animation: gsap.to(wrap, { y: -60, ease: "none" }),
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
      aria-label="Bonito Sound"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-bg-primary"
    >
      <h1 className="sr-only">
        Bonito Sound — música, eventos para marcas, festival y tecnología del sector
      </h1>

      {/* Vídeo centrado a ~la mitad de la pantalla. El fondo del vídeo ya es el
          crema del sitio (horneado al recortar el negro), así que encaja sin
          recuadro ni blend: el personaje flota sobre el fondo. */}
      <div
        ref={wrapRef}
        className="relative z-10 aspect-video w-[94vw] max-h-[84svh] md:w-[58vw]"
        style={{ willChange: "transform, opacity" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full origin-center scale-[1.37] object-contain md:scale-100"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onEnded={(e) => {
            // Loop a prueba de balas: si algún navegador ignora `loop`, reanuda.
            const v = e.currentTarget;
            v.currentTime = 0;
            v.play().catch(() => {});
          }}
        />
      </div>

      <div className="absolute bottom-4 z-20 flex flex-col items-center gap-2">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Baja
        </span>
        <span className="scroll-cue-dark" aria-hidden="true" />
      </div>
    </section>
  );
}
