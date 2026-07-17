"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export type PlayerTrack = {
  title: string;
  /** mp3/m4a servible (preview de 30 s). */
  src: string;
};

/** Segundos que suena cada tema antes de encadenar al siguiente. */
const SNIPPET = 30;

/**
 * Reproductor de la ficha: un botón, y suena.
 *
 * Micro-mezcla: encadena ~30 s de cada tema y salta al siguiente, así en un
 * minuto te haces una idea del artista sin tocar nada. Sin popups ni embeds:
 * el audio va inline y el botón se convierte en el propio reproductor.
 */
export function ArtistPlayer({
  tracks,
  artistName,
}: {
  tracks: PlayerTrack[];
  artistName: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 dentro del fragmento

  const track = tracks[idx];

  // Al cambiar de tema mientras suena, seguimos sonando (encadenado).
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !playing) return;
    el.currentTime = 0;
    void el.play().catch(() => setPlaying(false));
  }, [idx, playing]);

  if (!tracks.length) return null;

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

  const onTime = () => {
    const el = audioRef.current;
    if (!el) return;
    setProgress(Math.min(el.currentTime / SNIPPET, 1));
    if (el.currentTime >= SNIPPET) setIdx((p) => (p + 1) % tracks.length);
  };

  return (
    <div className="inline-flex flex-col gap-2">
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar ${artistName}` : `Escuchar a ${artistName}`}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full py-2 pl-2 pr-6 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
        style={{ backgroundColor: CYAN, minWidth: 210 }}
      >
        {/* Progreso del fragmento: barrido sutil por detrás */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 transition-[width] duration-200 ease-linear"
          style={{
            width: playing ? `${progress * 100}%` : "0%",
            backgroundColor: "rgba(20,40,60,0.13)",
          }}
        />

        {/* Círculo play/pausa */}
        <span
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: NAVY }}
        >
          {playing ? (
            <svg width="13" height="15" viewBox="0 0 13 15" fill={CYAN} aria-hidden>
              <rect x="0" y="0" width="4.5" height="15" rx="1.2" />
              <rect x="8.5" y="0" width="4.5" height="15" rx="1.2" />
            </svg>
          ) : (
            <svg width="13" height="15" viewBox="0 0 13 15" fill={CYAN} aria-hidden className="ml-0.5">
              <path d="M0 0 L13 7.5 L0 15 Z" />
            </svg>
          )}
        </span>

        {/* Etiqueta: "Escuchar" o el tema que suena + ecualizador */}
        <span className="relative flex min-w-0 items-center gap-2.5">
          {playing && (
            <span aria-hidden className="flex h-4 items-end gap-[3px]">
              {[0, 1, 2, 3].map((b) => (
                <span
                  key={b}
                  className="w-[3px] origin-bottom rounded-full"
                  style={{
                    height: "100%",
                    backgroundColor: NAVY,
                    animation: `eq 0.9s ease-in-out ${b * 0.13}s infinite`,
                  }}
                />
              ))}
            </span>
          )}
          <span
            className="truncate font-round text-base font-bold"
            style={{ color: NAVY, maxWidth: 190 }}
          >
            {playing ? track.title : "Escuchar"}
          </span>
        </span>
      </button>

      {playing && tracks.length > 1 && (
        <span className="pl-3 text-xs text-text-muted">
          Mezcla de 30 s · {idx + 1}/{tracks.length}
        </span>
      )}

      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTime}
        onEnded={() => setIdx((p) => (p + 1) % tracks.length)}
        preload="none"
      />
    </div>
  );
}
