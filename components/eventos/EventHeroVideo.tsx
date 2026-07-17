"use client";

import { useState } from "react";

/**
 * Vídeo del hero de evento con fallback de marca. Si el vídeo aún no está
 * subido a R2 (o falla), en vez de un rectángulo negro roto se muestra un
 * degradado navy con el nombre del evento — se ve intencional, no roto.
 * En cuanto el vídeo carga, lo cubre.
 */
export function EventHeroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label?: string;
}) {
  const [failed, setFailed] = useState(false);

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
    </>
  );
}
