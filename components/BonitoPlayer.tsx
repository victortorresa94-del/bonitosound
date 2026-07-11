"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reproductor de "Bonito" (Jarabe de Palo). Objetivo: que al entrar en la web
 * suene la canción. Los navegadores bloquean el autoplay con sonido al cargar,
 * así que arranca en el PRIMER gesto del usuario (clic/scroll/tecla) — lo que
 * ocurre casi al instante. Usa la Spotify IFrame API para controlar el play
 * sin depender del botón del embed. Pastilla flotante para pausar/reanudar.
 *
 * El iframe vive fuera de pantalla (montado siempre) para que el audio no se
 * corte al no mostrar el embed. Nunca fuerza sonido sin interacción previa.
 */
const TRACK_URI = "spotify:track:5FiB1uNoGZE4PenzZd7Imu"; // Bonito — Jarabe de Palo

export function BonitoPlayer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{ play: () => void; pause: () => void } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const w = window as unknown as {
      onSpotifyIframeApiReady?: (api: unknown) => void;
      __spotifyIframeApi?: unknown;
    };

    let started = false;
    const gestureEvents = ["pointerdown", "keydown", "scroll", "touchstart"];

    function armAutostart(controller: { play: () => void }) {
      const start = () => {
        if (started) return;
        started = true;
        try {
          controller.play();
        } catch {
          /* el navegador puede requerir otro gesto; el usuario tiene la pastilla */
        }
        gestureEvents.forEach((ev) => window.removeEventListener(ev, start));
      };
      gestureEvents.forEach((ev) =>
        window.addEventListener(ev, start, { passive: true })
      );
    }

    function init(IFrameAPI: {
      createController: (
        el: HTMLElement,
        opts: Record<string, unknown>,
        cb: (c: {
          play: () => void;
          pause: () => void;
          addListener: (e: string, cb: (d: { data: { isPaused: boolean } }) => void) => void;
        }) => void
      ) => void;
    }) {
      if (!hostRef.current) return;
      IFrameAPI.createController(
        hostRef.current,
        { uri: TRACK_URI, width: "100%", height: 80 },
        (controller) => {
          controllerRef.current = controller;
          setReady(true);
          controller.addListener("playback_update", (e) => {
            setPlaying(!e.data.isPaused);
          });
          armAutostart(controller);
        }
      );
    }

    if (w.__spotifyIframeApi) {
      init(w.__spotifyIframeApi as Parameters<typeof init>[0]);
    } else {
      w.onSpotifyIframeApiReady = (api) => {
        w.__spotifyIframeApi = api;
        init(api as Parameters<typeof init>[0]);
      };
      if (!document.getElementById("spotify-iframe-api")) {
        const s = document.createElement("script");
        s.id = "spotify-iframe-api";
        s.src = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.body.appendChild(s);
      }
    }

    return () => {
      gestureEvents.forEach((ev) => window.removeEventListener(ev, () => {}));
    };
  }, [dismissed]);

  if (dismissed) return null;

  const toggle = () => {
    const c = controllerRef.current;
    if (!c) return;
    if (playing) c.pause();
    else c.play();
  };

  return (
    <>
      {/* Host del iframe de Spotify: montado siempre, fuera de pantalla, para
          que el audio no se corte. No usar display:none (pararía el sonido). */}
      <div
        aria-hidden
        style={{ position: "fixed", left: "-9999px", bottom: 0, width: 320, height: 80 }}
      >
        <div ref={hostRef} />
      </div>

      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-1.5 print:hidden">
        <button
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? "Pausar Bonito" : "Reproducir Bonito"}
          className="group flex items-center gap-2.5 rounded-full border border-subtle bg-bg-primary/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-colors hover:bg-bg-primary disabled:opacity-60"
        >
          <span className="flex h-5 items-end gap-[3px]" aria-hidden>
            {[0.4, 0.9, 0.6].map((h, i) => (
              <span
                key={i}
                className="w-[3px] origin-bottom rounded-full bg-accent-cyan"
                style={{
                  height: `${h * 100}%`,
                  animation: playing
                    ? `eq 0.9s ease-in-out infinite ${i * 0.15}s`
                    : "none",
                }}
              />
            ))}
          </span>
          <span className="text-sm font-medium text-text-primary">
            {playing ? "Suena bonito" : "Dale al play"}
          </span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Cerrar reproductor"
          className="rounded-full border border-subtle bg-bg-primary/90 px-2.5 py-2.5 text-text-muted shadow-lg backdrop-blur-md transition-colors hover:text-text-primary"
        >
          ✕
        </button>
      </div>
    </>
  );
}
