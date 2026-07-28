"use client";

import { usePlayer } from "./PlayerProvider";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * La Radio Bonito: una radio vieja dibujada en SVG que sintoniza los temas de
 * los artistas de la casa. Cada tema suena 10 s y salta solo al siguiente, con
 * su ráfaga de sintonía en medio y la aguja moviéndose de emisora a emisora.
 *
 * Si no hay temas en /public/audio/playlist/ no se pinta NADA: sin música, una
 * radio dibujada es un adorno muerto. En cuanto se suba el primer mp3 aparece.
 *
 * Convive con FloatingPlayer: esta es la pieza grande (home) y el flotante
 * sigue siendo el control persistente al navegar.
 */
export function RadioBonito() {
  const { hasTracks, playing, tuning, current, index, total, start, toggle, goTo } = usePlayer();

  if (!hasTracks) return null;

  // Las emisoras son columnas de igual ancho, así que el centro de la nº i cae
  // en (i + 0,5) / total. La aguja tiene que ir exactamente ahí.
  const aguja = ((index + 0.5) / Math.max(total, 1)) * 100;

  return (
    <section className="wrap py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        {/* ── La radio ── */}
        <div className="mx-auto w-full max-w-[26rem]">
          <div
            className="relative rounded-[1.6rem] p-5 shadow-[0_18px_50px_rgba(20,40,60,0.22)]"
            style={{ backgroundColor: NAVY }}
          >
            {/* Dial */}
            <div className="relative h-16 overflow-hidden rounded-lg bg-[#f3ead6] px-3">
              {/* Marcas de emisora: una por tema. */}
              <div className="absolute inset-x-3 top-0 flex h-full items-center justify-between">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Emisora ${i + 1}`}
                    className="group flex h-full flex-1 items-center justify-center"
                  >
                    <span
                      className="block w-px transition-all duration-300"
                      style={{
                        height: i === index ? "60%" : "34%",
                        backgroundColor: i === index ? CYAN : "rgba(20,40,60,0.28)",
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* La aguja. Vive en el MISMO contenedor que las marcas (inset-x-3)
                  para que los porcentajes midan sobre el mismo ancho y caiga
                  clavada sobre la emisora. */}
              <div className="pointer-events-none absolute inset-x-3 top-1.5 bottom-1.5">
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full transition-[left] duration-700 ease-out"
                  style={{ left: `${aguja}%`, backgroundColor: "#c8452f" }}
                />
              </div>
            </div>

            {/* Qué suena */}
            <div className="mt-4 min-h-[3.2rem]">
              {tuning ? (
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  sintonizando…
                </p>
              ) : (
                <>
                  <p className="font-round text-lg font-bold leading-tight text-white">
                    {current?.title}
                  </p>
                  {current?.artist && (
                    <p className="mt-0.5 text-sm text-white/55">{current.artist}</p>
                  )}
                </>
              )}
            </div>

            {/* Rejilla del altavoz (ecualizador) + botón de encendido. */}
            <div className="mt-5 flex items-end justify-between gap-4">
              <div className="flex flex-1 items-end gap-[3px]" aria-hidden>
                {Array.from({ length: 22 }).map((_, i) => (
                  <span
                    key={i}
                    className="block flex-1 rounded-sm"
                    style={{
                      height: playing && !tuning ? "1.6rem" : "0.5rem",
                      transformOrigin: "bottom",
                      backgroundColor: "rgba(255,255,255,0.16)",
                      animation:
                        playing && !tuning
                          ? `eq ${0.7 + (i % 5) * 0.16}s ease-in-out ${i * 0.04}s infinite`
                          : undefined,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={playing ? toggle : start}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
                style={{ backgroundColor: CYAN }}
                aria-label={playing ? "Pausar la radio" : "Encender la radio"}
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={NAVY} aria-hidden>
                    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={NAVY} aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── El texto ── */}
        <div>
          <p className="eyebrow mb-4">Radio Bonito</p>
          <h2 className="display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.05]" style={{ color: NAVY }}>
            Diez segundos de cada uno.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary">
            Un trozo de cada artista de la casa, uno detrás de otro, como quien
            va pasando emisoras. Dale al play y déjala puesta.
          </p>
          <p className="mt-4 text-sm text-text-muted">
            {total} {total === 1 ? "tema" : "temas"} · toca el dial para saltar
          </p>
        </div>
      </div>
    </section>
  );
}
