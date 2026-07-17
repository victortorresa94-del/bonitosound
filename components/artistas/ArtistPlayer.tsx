"use client";

import { useRef, useState } from "react";

const NAVY = "#14283C";

/**
 * Botón REDONDO de "Escuchar" (propuesta 3): play invertido — fondo oscuro
 * (mismo navy que el resto de botones) e icono claro. Suena en vivo, sin
 * salir de la web ni popups (cableado como el player del home): reproduce la
 * canción del artista (`src`) o la de Bonito como fallback. Se pulsa y suena;
 * se vuelve a pulsar y pausa.
 */
export function ArtistPlayer({
  artistName,
  src,
}: {
  artistName: string;
  src: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar ${artistName}` : `Escuchar a ${artistName}`}
        title={`Escuchar a ${artistName}`}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: NAVY }}
      >
        {playing ? (
          <svg width="14" height="16" viewBox="0 0 13 15" fill="currentColor" aria-hidden>
            <rect x="0" y="0" width="4.5" height="15" rx="1.2" />
            <rect x="8.5" y="0" width="4.5" height="15" rx="1.2" />
          </svg>
        ) : (
          <svg width="14" height="16" viewBox="0 0 13 15" fill="currentColor" aria-hidden className="ml-0.5">
            <path d="M0 0 L13 7.5 L0 15 Z" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src={src} loop preload="none" onEnded={() => setPlaying(false)} />
    </>
  );
}
