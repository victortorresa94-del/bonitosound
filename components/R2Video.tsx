"use client";

import { useEffect, useRef, useState } from "react";
import { r2 } from "@/lib/site";

/**
 * Reproductor de vídeo autoalojado (Cloudflare R2 / URL externa). Autoplay
 * silenciado en bucle (política de navegadores) con botón para activar sonido.
 * `src` puede ser una clave R2 ("resumen-bonito.mp4") o una URL completa.
 * `start`: recorta los primeros segundos — arranca ahí y el bucle vuelve a ese
 * punto (no al 0), para saltarse intros/efectos raros del inicio.
 */
export function R2Video({
  src,
  poster,
  className = "",
  ratio = "16 / 9",
  rounded = true,
  loop = true,
  start = 0,
}: {
  src: string;
  poster?: string;
  className?: string;
  ratio?: string;
  rounded?: boolean;
  loop?: boolean;
  start?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Con `start`, gestionamos el loop a mano: al terminar (o si el navegador
  // salta al 0) volvemos al segundo `start`, nunca al principio.
  const nativeLoop = loop && start <= 0;

  useEffect(() => {
    const v = ref.current;
    if (!v || start <= 0) return;
    const seek = () => {
      try {
        if (Math.abs(v.currentTime - start) > 0.1 && v.currentTime < start) v.currentTime = start;
      } catch {}
    };
    const onLoaded = () => {
      try { v.currentTime = start; } catch {}
      v.play().catch(() => {});
    };
    const onEnded = () => {
      try { v.currentTime = start; } catch {}
      v.play().catch(() => {});
    };
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", seek);
    if (v.readyState >= 1) {
      try { v.currentTime = start; } catch {}
    }
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", seek);
    };
  }, [start, src]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.paused) v.play().catch(() => {});
    setMuted(v.muted);
  };

  const goFullscreen = () => {
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS Safari
  };

  return (
    <div
      className={`relative overflow-hidden bg-bg-tertiary shadow-sm ${
        rounded ? "rounded-2xl" : ""
      } ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={ref}
        src={r2(src)}
        poster={poster}
        muted
        loop={nativeLoop}
        autoPlay
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={goFullscreen}
          aria-label="Pantalla completa"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
