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
          animation: gsap.to(wrap, { y: -120, opacity: 0, ease: "none" }),
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

      {/* Halo radial que funde el fondo del vídeo con el del sitio. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, var(--bg-tertiary) 0%, var(--bg-primary) 65%)",
        }}
      />

      {/* Vídeo centrado a ~la mitad de la pantalla (16:9 completo, sin recorte). */}
      <div
        ref={wrapRef}
        className="relative z-10 aspect-video w-[86vw] max-h-[80svh] overflow-hidden rounded-xl md:w-[48vw]"
        style={{ willChange: "transform, opacity" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
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
