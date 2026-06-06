"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type HeroVideoProps = {
  src: string;
  poster: string | null;
  label: string;
};

/**
 * Escena 1 — Hero. La mascota en vídeo, centrada y a tamaño natural (el vídeo es
 * vertical 3:4; NO se recorta a pantalla completa, respira sobre el crema).
 *
 * El vídeo viene con fondo blanco: con mix-blend-mode:multiply el blanco se funde
 * con el crema de la página y solo queda la mascota. Si más adelante se re-renderiza
 * el vídeo directamente sobre el crema (#f7f4ed), el multiply sigue siendo inocuo.
 *
 * Decorativo: no bloquea interacción ni mete layout shift. Con prefers-reduced-motion
 * mostramos el póster estático.
 */
export function HeroVideo({ src, poster, label }: HeroVideoProps) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const tryPlay = () => v.play().catch(() => {});
    if (v.readyState >= 2) {
      setReady(true);
      tryPlay();
    }
  }, [reduced]);

  const mediaClass =
    "h-[68svh] max-h-[760px] w-auto max-w-[88vw] object-contain [mix-blend-mode:multiply]";

  return (
    <section
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-bg-primary"
      aria-label={label}
    >
      {/* Título accesible invisible: estructura semántica (h1) sin tapar el vídeo. */}
      <h1 className="sr-only">
        {label} — el ecosistema cultural integral del sector musical
      </h1>

      {reduced ? (
        poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" aria-hidden="true" className={mediaClass} />
        ) : null
      ) : (
        <video
          ref={videoRef}
          className={`${mediaClass} transition-opacity duration-700 ${
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

      {/* Cue de scroll — sobre crema, en tinta oscura. Solo con movimiento permitido. */}
      {!reduced && (
        <div className="absolute bottom-9 flex flex-col items-center gap-3">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
            Baja
          </span>
          <span className="scroll-cue-dark" aria-hidden="true" />
        </div>
      )}
    </section>
  );
}
