"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type HeroVideoProps = {
  src: string;
  poster: string | null;
  label: string;
};

/**
 * Escena 1 — Hero. La mascota en vídeo, a pantalla completa.
 * Autoplay, bucle, silenciado. Decorativo: no bloquea interacción ni mete layout
 * shift (el contenedor reserva el alto). Con prefers-reduced-motion mostramos el
 * póster estático en vez del vídeo. Capa de contraste abajo para el cue/legibilidad.
 */
export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    // Algunos navegadores necesitan un play() explícito tras montar.
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) {
      setReady(true);
      tryPlay();
    }
  }, [reduced]);

  return (
    <section
      className="relative flex h-[100svh] w-full items-end justify-center overflow-hidden bg-bg-tertiary"
      aria-label={label}
    >
      {/* Título accesible invisible: da estructura semántica (h1) sin tapar el vídeo. */}
      <h1 className="sr-only">
        {label} — el ecosistema cultural integral del sector musical
      </h1>

      {reduced ? (
        poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null
      ) : (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          poster={poster ?? undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedData={() => setReady(true)}
        />
      )}

      {/* Velo de contraste: gradiente sutil abajo para el cue y para no “lavar” el pie. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
      />

      {/* Cue de scroll — solo con movimiento permitido. */}
      {!reduced && (
        <div className="relative z-10 mb-10 flex flex-col items-center gap-3">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/80">
            Baja
          </span>
          <span className="scroll-cue" aria-hidden="true" />
        </div>
      )}
    </section>
  );
}
