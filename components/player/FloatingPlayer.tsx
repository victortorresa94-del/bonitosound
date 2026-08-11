"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePlayer } from "./PlayerProvider";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";
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

/**
 * El reproductor flotante.
 *
 * A la IZQUIERDA: la derecha es por donde se pasa el pulgar al hacer scroll en
 * móvil, y ahí el botón estorbaba.
 *
 * Un solo botón, play/pausa. Antes había hasta cinco (radio, siguiente,
 * Spotify, play y el de cerrar del panel) para algo que es un detalle de la
 * casa, no una aplicación de música. Cambiar de emisora sigue estando, pero
 * dentro del dial de la radio, que es su sitio.
 *
 * La radio se despliega sola y SE CIERRA AL DARLE AL PLAY: ha cumplido su
 * función —enseñarse— y a partir de ahí estorba. Se vuelve a abrir con el
 * iconito de radio, que solo aparece cuando está cerrada.
 */
export function FloatingPlayer() {
  const { playing, everStarted, isHome, total, start, toggle } = usePlayer();
  const locale = useLocale();
  const [revealed, setRevealed] = useState(false);
  const [radioOpen, setRadioOpen] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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

  // Entrada del conjunto: entra deslizándose DESDE EL BORDE IZQUIERDO, como si
  // hubiera estado ahí fuera esperando. Respeta reduced-motion (solo fade).
  useEffect(() => {
    if (!revealed || shownOnce.current) return;
    const el = wrapRef.current;
    if (!el) return;
    shownOnce.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, x: -140, rotate: -8 },
      { opacity: 1, x: 0, rotate: 0, duration: 0.85, ease: "elastic.out(1, 0.62)" },
    );
  }, [revealed]);

  // La radio entra y sale por el borde izquierdo, no aparece y desaparece de
  // golpe. Al cerrarse hay que esperar a la animación antes de desmontarla,
  // de ahí el onComplete.
  const cerrarRadio = () => {
    const p = panelRef.current;
    if (!p || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRadioOpen(false);
      return;
    }
    gsap.to(p, {
      opacity: 0,
      x: -120,
      scale: 0.9,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setRadioOpen(false),
    });
  };

  useEffect(() => {
    const p = panelRef.current;
    if (!radioOpen || !p) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      p,
      { opacity: 0, x: -110, scale: 0.92 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
    );
  }, [radioOpen]);

  if (!revealed) return null;

  const label = t(locale, playing ? "radio.pausar" : everStarted ? "radio.reanudar" : "radio.poner");

  // Al arrancar la música la radio se retira: ya se ha lucido.
  const onMain = () => {
    if (!everStarted) {
      start();
      if (radioOpen) cerrarRadio();
      return;
    }
    toggle();
  };

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-3.5 left-3.5 z-50 flex flex-col items-start gap-2 opacity-0 print:hidden sm:bottom-5 sm:left-5 sm:gap-2.5"
      style={{ willChange: "transform, opacity" }}
    >
      {/* La radio, desplegada sobre el botón. Solo con ≥2 temas: con uno solo
          no hay emisoras que sintonizar y sobra el dial. */}
      {radioOpen && total > 1 && (
        <div ref={panelRef} style={{ willChange: "transform, opacity" }}>
          <RadioBonito onClose={cerrarRadio} />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Botón principal: play/pausa. Es el único control de fuera. */}
        <button
          type="button"
          onClick={onMain}
          aria-label={label}
          aria-pressed={playing}
          title={label}
          className="relative grid h-11 w-11 place-items-center rounded-full shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-[52px] sm:w-[52px]"
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
                    backgroundColor: CYAN,
                    animation: `eq 0.9s ease-in-out infinite ${i * 0.15}s`,
                  }}
                />
              ))}
            </span>
          )}
        </button>

        {/* Volver a abrir la radio. Solo cuando está cerrada: si está abierta
            ya tiene su propia aspa y tener los dos botones sobra. */}
        {!radioOpen && total > 1 && (
          <button
            type="button"
            onClick={() => setRadioOpen(true)}
            aria-label={t(locale, "radio.abrir")}
            title={t(locale, "radio.titulo")}
            className="grid h-9 w-9 place-items-center rounded-full border transition-all duration-200 hover:scale-110"
            style={{
              borderColor: "rgba(20,40,60,0.25)",
              color: NAVY,
              background: "rgba(251,250,246,0.85)",
              backdropFilter: "blur(6px)",
            }}
          >
            <RadioIcon />
          </button>
        )}
      </div>
    </div>
  );
}
