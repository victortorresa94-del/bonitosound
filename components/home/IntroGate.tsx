"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/motion/MotionContext";

/**
 * Gate de entrada de la home. Overlay a pantalla completa con un CTA central
 * "Escúchanos": hasta que no se pulsa, el scroll está bloqueado y el hero queda
 * tapado. Al pulsar, arranca el estribillo de "Bonito" (Jarabe de Palo) — audio
 * nativo, el fragmento 0:46–1:49 del original en loop — se funde el overlay y
 * se libera el scroll → la canción suena con el vídeo.
 *
 * <audio> nativo en vez de un embed externo: arranque instantáneo y fiable con
 * el gesto del clic, loop real del fragmento, sin límite de 30s de preview.
 */
const AUDIO_SRC = "/audio/bonito.m4a";
const AUDIO_FALLBACK = "/audio/bonito.mp3";

export function IntroGate() {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Portal a document.body: el gate NO puede vivir dentro del wrapper de
  // PageTransitionShell (se anima con opacity+transform y rompería el overlay).
  useEffect(() => setMounted(true), []);

  // Bloqueo de scroll mientras el gate está arriba.
  useEffect(() => {
    if (entered) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered, lenis]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  const enter = (withMusic: boolean) => {
    if (withMusic) {
      audioRef.current?.play().catch(() => {});
    }
    setLeaving(true);
    lenis?.start();
    document.body.style.overflow = "";
    window.setTimeout(() => setEntered(true), 700);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={AUDIO_SRC} type="audio/mp4" />
        <source src={AUDIO_FALLBACK} type="audio/mpeg" />
      </audio>

      {/* Pastilla flotante de control, solo tras entrar. */}
      {entered && (
        <div className="fixed bottom-5 left-5 z-40 print:hidden">
          <button
            onClick={toggle}
            aria-pressed={playing}
            className="flex items-center gap-2.5 rounded-full border border-subtle bg-bg-primary/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-colors hover:bg-bg-primary"
          >
            <span className="flex h-5 items-end gap-[3px]" aria-hidden>
              {[0.4, 0.9, 0.6].map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] origin-bottom rounded-full bg-accent-cyan"
                  style={{
                    height: `${h * 100}%`,
                    animation: playing ? `eq 0.9s ease-in-out infinite ${i * 0.15}s` : "none",
                  }}
                />
              ))}
            </span>
            <span className="text-sm font-medium text-text-primary">
              {playing ? "Suena bonito" : "La canción de Bonito"}
            </span>
          </button>
        </div>
      )}

      {/* Overlay del gate */}
      {!entered && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary px-6 text-center transition-opacity duration-700 ${
            leaving ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/marca/logo-bonito-color.svg"
            alt="Bonito Sound"
            className="mb-14 h-20 w-auto"
          />
          <button
            onClick={() => enter(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-text-primary px-9 py-4 text-bg-primary shadow-xl transition-transform hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-lg font-semibold tracking-wide">Dale al play</span>
          </button>
          <button
            onClick={() => enter(false)}
            className="mt-7 text-sm text-text-muted underline-offset-4 transition-colors hover:text-text-secondary hover:underline"
          >
            Entrar sin sonido
          </button>
        </div>
      )}
    </>,
    document.body
  );
}
