"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/motion/MotionContext";

/**
 * Gate de entrada de la home. Overlay a pantalla completa con un CTA central
 * "Escúchanos": hasta que no se pulsa, el scroll está bloqueado y el hero queda
 * tapado. Al pulsar, arranca "Bonito" (Jarabe de Palo) vía la Spotify IFrame API
 * (el clic es el gesto que los navegadores exigen para reproducir sonido),
 * se funde el overlay y se libera el scroll → la canción suena con el vídeo.
 *
 * El host del reproductor queda montado siempre (colapsado, no display:none) para
 * que el audio no se corte; tras entrar, una pastilla flotante lo controla.
 */
const TRACK_URI = "spotify:track:5FiB1uNoGZE4PenzZd7Imu"; // Bonito — Jarabe de Palo

type Controller = { play: () => void; pause: () => void } | null;

export function IntroGate() {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  // Portal a document.body: el gate NO puede vivir dentro del wrapper de
  // PageTransitionShell (se anima con opacity+transform y rompería el overlay).
  useEffect(() => setMounted(true), []);
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<Controller>(null);

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

  // Controlador de Spotify (IFrame API) para el track de Bonito.
  useEffect(() => {
    const w = window as unknown as {
      onSpotifyIframeApiReady?: (api: unknown) => void;
      __spIframeApi?: unknown;
    };
    function init(api: {
      createController: (
        el: HTMLElement,
        opts: Record<string, unknown>,
        cb: (c: Controller) => void
      ) => void;
    }) {
      if (!hostRef.current || controllerRef.current) return;
      api.createController(
        hostRef.current,
        { uri: TRACK_URI, width: "100%", height: 152 },
        (c) => {
          controllerRef.current = c;
        }
      );
    }
    if (w.__spIframeApi) {
      init(w.__spIframeApi as Parameters<typeof init>[0]);
    } else {
      w.onSpotifyIframeApiReady = (api) => {
        w.__spIframeApi = api;
        init(api as Parameters<typeof init>[0]);
      };
      if (!document.getElementById("sp-iframe-api")) {
        const s = document.createElement("script");
        s.id = "sp-iframe-api";
        s.src = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.body.appendChild(s);
      }
    }
  }, []);

  const enter = (withMusic: boolean) => {
    if (withMusic) {
      try {
        controllerRef.current?.play();
      } catch {
        /* si el navegador lo bloquea, la pastilla queda para darle al play */
      }
    }
    setLeaving(true);
    lenis?.start();
    document.body.style.overflow = "";
    window.setTimeout(() => setEntered(true), 700);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Reproductor: montado siempre (colapsado no lo para). Pastilla tras entrar. */}
      <div className="fixed bottom-5 left-5 z-40 print:hidden">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open
              ? "mb-2 w-[min(340px,calc(100vw-2.5rem))] opacity-100"
              : "h-0 w-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-subtle bg-bg-primary p-2 shadow-xl">
            <div ref={hostRef} />
          </div>
        </div>
        {entered && (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center gap-2.5 rounded-full border border-subtle bg-bg-primary/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-colors hover:bg-bg-primary"
          >
            <span className="flex h-5 items-end gap-[3px]" aria-hidden>
              {[0.4, 0.9, 0.6].map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] origin-bottom rounded-full bg-accent-cyan"
                  style={{ height: `${h * 100}%`, animation: `eq 0.9s ease-in-out infinite ${i * 0.15}s` }}
                />
              ))}
            </span>
            <span className="text-sm font-medium text-text-primary">La canción de Bonito</span>
          </button>
        )}
      </div>

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
            className="mb-12 h-20 w-auto"
          />
          <p className="eyebrow mb-6">Ponte los cascos</p>
          <button
            onClick={() => enter(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-text-primary px-9 py-4 text-bg-primary shadow-xl transition-transform hover:scale-105"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="text-lg font-semibold tracking-wide">Escúchanos</span>
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
