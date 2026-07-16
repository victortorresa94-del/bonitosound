"use client";

import { useRef, useState } from "react";
import { r2 } from "@/lib/site";

/**
 * Reproductor de vídeo autoalojado (Cloudflare R2 / URL externa). Autoplay
 * silenciado en bucle (política de navegadores) con botón para activar sonido.
 * `src` puede ser una clave R2 ("resumen-bonito.mp4") o una URL completa.
 */
export function R2Video({
  src,
  poster,
  className = "",
  ratio = "16 / 9",
  rounded = true,
  loop = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  ratio?: string;
  rounded?: boolean;
  loop?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.paused) v.play().catch(() => {});
    setMuted(v.muted);
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
        loop={loop}
        autoPlay
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Activar sonido" : "Silenciar"}
        className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
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
    </div>
  );
}
