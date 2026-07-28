"use client";

import { usePlayer } from "./PlayerProvider";

const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREMA = "#f3ead6";

/**
 * La Radio Bonito: el panel que se despliega sobre el botón flotante, abajo a
 * la derecha, en TODAS las páginas. Una radio vieja en miniatura que va
 * sintonizando los temas de los artistas de la casa: 10 s de cada uno, con su
 * ráfaga de sintonía al cambiar y la aguja moviéndose de emisora a emisora.
 *
 * No se pinta si no hay temas: sin música, una radio dibujada es un adorno
 * muerto. Y va en el mismo contenedor fixed que FloatingPlayer, así que no
 * añade otro elemento flotante compitiendo por la esquina.
 */
export function RadioBonito({ onClose }: { onClose: () => void }) {
  const { current, index, total, tuning, playing, goTo } = usePlayer();

  return (
    <div
      className="w-[17.5rem] rounded-2xl p-3.5 shadow-[0_18px_50px_rgba(20,40,60,0.28)]"
      style={{ backgroundColor: NAVY }}
      role="region"
      aria-label="Radio Bonito"
    >
      {/* Cabecera: marca + cerrar. */}
      <div className="mb-2.5 flex items-center justify-between">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/45">
          Radio Bonito
        </p>
        <button
          onClick={onClose}
          aria-label="Cerrar la radio"
          className="grid h-5 w-5 place-items-center rounded-full text-white/45 transition-colors hover:text-white"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
            <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* El dial. */}
      <div className="relative h-10 overflow-hidden rounded-md px-2.5" style={{ backgroundColor: CREMA }}>
        <div className="absolute inset-x-2.5 top-0 flex h-full items-center">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Emisora ${i + 1}`}
              title={`Emisora ${i + 1}`}
              className="flex h-full flex-1 items-center justify-center"
            >
              <span
                className="block w-px transition-all duration-300"
                style={{
                  height: i === index ? "58%" : "30%",
                  backgroundColor: i === index ? CYAN : "rgba(20,40,60,0.3)",
                }}
              />
            </button>
          ))}
        </div>

        {/* La aguja vive en el MISMO contenedor que las marcas para que los
            porcentajes midan sobre el mismo ancho y caiga clavada. */}
        <div className="pointer-events-none absolute inset-x-2.5 top-1 bottom-1">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 w-[2.5px] -translate-x-1/2 rounded-full transition-[left] duration-700 ease-out"
            style={{
              left: `${((index + 0.5) / Math.max(total, 1)) * 100}%`,
              backgroundColor: "#c8452f",
            }}
          />
        </div>
      </div>

      {/* Qué suena. Altura fija para que el panel no dé saltos al cambiar. */}
      <div className="mt-2.5 flex min-h-[2.6rem] items-center justify-between gap-3">
        <div className="min-w-0">
          {tuning ? (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">
              sintonizando…
            </p>
          ) : (
            <>
              <p className="truncate font-round text-sm font-bold leading-tight text-white">
                {current?.title}
              </p>
              {current?.artist && (
                <p className="truncate text-xs text-white/50">{current.artist}</p>
              )}
            </>
          )}
        </div>

        {/* Rejilla del altavoz: se mueve solo cuando de verdad está sonando. */}
        <div className="flex shrink-0 items-end gap-[2px]" aria-hidden>
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="block w-[2.5px] rounded-full"
              style={{
                height: playing && !tuning ? "0.85rem" : "0.25rem",
                transformOrigin: "bottom",
                backgroundColor: "rgba(255,255,255,0.22)",
                animation:
                  playing && !tuning
                    ? `eq ${0.7 + (i % 4) * 0.18}s ease-in-out ${i * 0.05}s infinite`
                    : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
