"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type HeroVideoProps = {
  src: string;
  poster: string;
};

const AUDIO_SRC = "/audio/bonito.m4a";
const AUDIO_FALLBACK = "/audio/bonito.mp3";

/**
 * Hero con vídeo (0711, editado por el cliente). Autoplay mudo en loop,
 * object-cover a pantalla completa, entrada con fade y salida con parallax
 * al hacer scroll. Respeta prefers-reduced-motion: no reproduce, muestra el
 * poster fijo. El poster carga al instante y evita parpadeo mientras baja el mp4.
 *
 * El audio ("Bonito" de Jarabe de Palo) es opcional y NO bloquea nada: un CTA
 * centrado en el hero lo activa, pero el scroll siempre está libre — el
 * visitante puede bajar sin darle al play. Tras activarlo, una pastilla
 * flotante controla el play/pause.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

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

  const startAudio = () => {
    setStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Bonito Sound"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-bg-primary"
    >
      <h1 className="sr-only">
        Bonito Sound — música, eventos para marcas, festival y tecnología del sector
      </h1>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={AUDIO_SRC} type="audio/mp4" />
        <source src={AUDIO_FALLBACK} type="audio/mpeg" />
      </audio>

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

      {/* CTA de audio: centrado en el hero, no bloquea nada — el scroll
          funciona igual con o sin pulsarlo. */}
      {!started && (
        <div className="absolute inset-x-0 bottom-[14%] z-20 flex justify-center px-6">
          <button
            onClick={startAudio}
            className="group inline-flex items-center gap-3 rounded-full bg-text-primary px-7 py-3.5 text-bg-primary shadow-xl transition-transform hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-sm font-semibold tracking-wide">Dale al play</span>
          </button>
        </div>
      )}

      {started && (
        <div className="fixed bottom-5 left-5 z-40 print:hidden">
          <button
            onClick={toggleAudio}
            aria-pressed={playing}
            className="flex items-center gap-2.5 rounded-full border border-subtle bg-bg-primary/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-colors hover:bg-bg-primary"
          >
            <span className="flex h-5 items-end gap-[3px]" aria-hidden>
              {[0.4, 0.9, 0.6].map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] origin-bottom rounded-full bg-accent-cyan"
                  style={{
                    height: `${h * 100}%`,
                    animation: playing ? `eq 0.9s ease-in-out infinite ${i * 0.15}s` : "none",
                  }}
                />
              ))}
            </span>
            <span className="text-sm font-medium text-text-primary">
              {playing ? "Suena bonito" : "La canción de Bonito"}
            </span>
          </button>
        </div>
      )}

      <div className="absolute bottom-4 z-20 flex flex-col items-center gap-2">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Baja
        </span>
        <span className="scroll-cue-dark" aria-hidden="true" />
      </div>
    </section>
  );
}
