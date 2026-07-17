"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePlayer } from "./PlayerProvider";

const NAVY = "#14283C";

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

export function FloatingPlayer() {
  const { status, playing, everStarted, isHome, canNext, start, toggle, next } = usePlayer();
  const [revealed, setRevealed] = useState(false);
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
  const onMain = () => (status === "idle" ? start() : toggle());

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 opacity-0 print:hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Siguiente (solo fuera del home, cuando ya hay música). Minimalista. */}
      {canNext && (
        <button
          type="button"
          onClick={next}
          aria-label="Siguiente — playlist de Bonito"
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
  );
}
