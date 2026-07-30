"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePlayer } from "./PlayerProvider";
import { RadioBonito } from "./RadioBonito";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/** Radio vieja en miniatura: cuerpo, dial y antena. */
function RadioIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 10h16v9H4z" strokeLinejoin="round" />
      <path d="M7 6.5l7-3" strokeLinecap="round" />
      <path d="M7 13.5h6" strokeLinecap="round" />
      <circle cx="16.5" cy="14.5" r="1.6" />
    </svg>
  );
}

/** Play blanco clásico. */
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Pausa "bonito": dos barras redondeadas, ligeramente torcidas — con carácter,
 *  no la pausa cuadrada de siempre. */
function PauseBonito() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <rect x="6" y="4.5" width="4.2" height="15" rx="2.1" transform="rotate(-5 8.1 12)" />
      <rect x="13.8" y="4.5" width="4.2" height="15" rx="2.1" transform="rotate(5 15.9 12)" />
    </svg>
  );
}

/** Siguiente, minimalista. */
function NextIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5 5l9 7-9 7z" />
      <rect x="16" y="5" width="3" height="14" rx="1.5" />
    </svg>
  );
}

/** Logo de Spotify. */
function SpotifyIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.213c3.809-.871 7.076-.496 9.712 1.114a.623.623 0 0 1 .207.856Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 1 1-.452-1.49c3.632-1.102 8.147-.568 11.232 1.327a.779.779 0 0 1 .257 1.072Zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
    </svg>
  );
}

export function FloatingPlayer() {
  const { playing, everStarted, isHome, canNext, spotifyUrl, total, start, toggle, next } = usePlayer();
  const [revealed, setRevealed] = useState(false);
  // La radio arranca ABIERTA: es una pieza de la web, no un widget escondido
  // detrás de un botón. Se puede cerrar y volver a abrir con el iconito.
  const [radioOpen, setRadioOpen] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const shownOnce = useRef(false);

  // Revelado:
  //  - Home: aparece al bajar del hero (~3ª sección) y se queda.
  //  - Otras páginas: aparece en cuanto entras.
  useEffect(() => {
    if (!isHome) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    shownOnce.current = false;
    const threshold = () => window.innerHeight * 1.8;
    const onScroll = () => {
      if (window.scrollY > threshold()) {
        setRevealed(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Entrada "con vida": aparece con un pop elástico + un pequeño meneo, como los
  // dibujos del home. Respeta reduced-motion (solo fade).
  useEffect(() => {
    if (!revealed || shownOnce.current) return;
    const el = wrapRef.current;
    if (!el) return;
    shownOnce.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { opacity: 0, scale: 0, y: 24, rotate: -12 },
      { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.7, ease: "elastic.out(1, 0.55)" },
    ).to(el, { rotate: 6, duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut" }, "-=0.15");
  }, [revealed]);

  if (!revealed) return null;

  const label = playing ? "Pausar la música" : everStarted ? "Reanudar la música" : "Poner música";
  const onMain = () => (everStarted ? toggle() : start());

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 opacity-0 print:hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* La radio, desplegada sobre los botones. Solo con ≥2 temas: con uno
          solo no hay emisoras que sintonizar y sobra el dial. */}
      {radioOpen && total > 1 && <RadioBonito onClose={() => setRadioOpen(false)} />}

      <div className="flex items-center gap-2">
      {/* Abrir/cerrar la radio. */}
      {total > 1 && (
        <button
          type="button"
          onClick={() => setRadioOpen((v) => !v)}
          aria-label={radioOpen ? "Cerrar la radio" : "Abrir la Radio Bonito"}
          aria-expanded={radioOpen}
          title="Radio Bonito"
          className="grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 hover:scale-110"
          style={{
            borderColor: radioOpen ? CYAN : "rgba(20,40,60,0.25)",
            color: radioOpen ? CYAN : NAVY,
            background: "rgba(251,250,246,0.85)",
            backdropFilter: "blur(6px)",
          }}
        >
          <RadioIcon />
        </button>
      )}

      {/* Siguiente tema propio (solo si hay ≥2 en la playlist local). */}
      {canNext && (
        <button
          type="button"
          onClick={next}
          aria-label="Siguiente tema"
          title="Siguiente"
          className="grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 hover:scale-110"
          style={{
            borderColor: "rgba(20,40,60,0.25)",
            color: NAVY,
            background: "rgba(251,250,246,0.85)",
            backdropFilter: "blur(6px)",
          }}
        >
          <NextIcon />
        </button>
      )}

      {/* Fuera del home: la playlist de artistas de Bonito en Spotify. Enlace
          limpio (el embed de Spotify obliga a mostrar su banner de marca). */}
      {!isHome && (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="La playlist de Bonito en Spotify"
          title="La playlist de Bonito en Spotify"
          className="grid h-9 w-9 place-items-center rounded-full transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "#1DB954", color: "#fff" }}
        >
          <SpotifyIcon />
        </a>
      )}

      {/* Botón principal: negro, redondo, play/pausa. */}
      <button
        type="button"
        onClick={onMain}
        aria-label={label}
        aria-pressed={playing}
        title={label}
        className="relative grid h-[52px] w-[52px] place-items-center rounded-full shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: NAVY }}
      >
        {playing ? <PauseBonito /> : <PlayIcon />}

        {/* Anillo-ecualizador con vida cuando suena. */}
        {playing && (
          <span className="pointer-events-none absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-[2px]" aria-hidden>
            {[0.5, 1, 0.7].map((h, i) => (
              <span
                key={i}
                className="w-[2.5px] rounded-full"
                style={{
                  height: 8 * h,
                  backgroundColor: "#16b6d4",
                  animation: `eq 0.9s ease-in-out infinite ${i * 0.15}s`,
                }}
              />
            ))}
          </span>
        )}
      </button>
      </div>
    </div>
  );
}
