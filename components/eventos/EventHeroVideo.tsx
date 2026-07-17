"use client";

import { useRef, useState } from "react";

/**
 * Vídeo del hero de evento con fallback de marca. Si el vídeo aún no está
 * subido a R2 (o falla), en vez de un rectángulo negro roto se muestra un
 * degradado navy con el nombre del evento — se ve intencional, no roto.
 * En cuanto el vídeo carga, lo cubre.
 *
 * `sound`: muestra un botón de altavoz para activar el audio (por defecto el
 * vídeo va mudo y sin control, como fondo de hero de evento).
 */
export function EventHeroVideo({
  src,
  poster,
  label,
  sound = false,
}: {
  src: string;
  poster?: string;
  label?: string;
  sound?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.paused) v.play().catch(() => {});
    setMuted(v.muted);
  };

  return (
    <>
      {/* Fallback de marca (siempre detrás). */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 45%, #0d1a29 100%)",
        }}
      />
      {(failed || !src) && label && (
        <div aria-hidden className="absolute inset-0 flex items-center justify-center p-8">
          <span className="font-round text-4xl font-bold text-white/10 md:text-7xl">
            {label}
          </span>
        </div>
      )}
      {src && !failed && (
        <video
          ref={ref}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      )}

      {/* Botón de sonido (solo si sound=true). */}
      {sound && src && !failed && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
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
      )}
    </>
  );
}
