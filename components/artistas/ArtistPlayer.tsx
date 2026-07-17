"use client";

import { useRef, useState } from "react";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Botón "Escuchar a X" de la ficha: un botón, y suena — en vivo, sin salir de
 * la web y sin popups (cableado igual que el player del home). Reproduce la
 * canción del artista (`src`), o la de Bonito Sound como fallback. El botón ES
 * el reproductor: se pone a sonar y muestra un ecualizador; se vuelve a pulsar
 * y pausa. Estilo oscuro, a juego con el diseño de la ficha.
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
  const first = artistName.split(" ")[0];

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      // El clic ES el gesto que el navegador exige para dar sonido.
      void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar ${artistName}` : `Escuchar a ${artistName}`}
        className="group flex w-full items-center gap-3 rounded-full py-2 pl-2 pr-5 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        style={{ backgroundColor: NAVY }}
      >
        {/* Círculo play/pausa */}
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: CYAN }}
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 13 15" fill="#fff" aria-hidden>
              <rect x="0" y="0" width="4.5" height="15" rx="1.2" />
              <rect x="8.5" y="0" width="4.5" height="15" rx="1.2" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 13 15" fill="#fff" aria-hidden className="ml-0.5">
              <path d="M0 0 L13 7.5 L0 15 Z" />
            </svg>
          )}
        </span>

        {playing && (
          <span aria-hidden className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2, 3].map((b) => (
              <span
                key={b}
                className="w-[3px] origin-bottom rounded-full"
                style={{
                  height: "100%",
                  backgroundColor: CYAN,
                  animation: `eq 0.9s ease-in-out ${b * 0.13}s infinite`,
                }}
              />
            ))}
          </span>
        )}

        <span className="truncate font-round text-base font-bold text-white">
          {playing ? "Sonando…" : `Escuchar a ${first}`}
        </span>
      </button>

      <audio ref={audioRef} src={src} loop preload="none" onEnded={() => setPlaying(false)} />
    </>
  );
}
