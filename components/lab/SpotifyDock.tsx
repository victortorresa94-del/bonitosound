"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PRUEBA — Reproductor de Spotify "acoplable".
 *
 * Idea: arranca CENTRADO y grande con un CTA propio ("Dale al play"); al pulsarlo
 * empieza a sonar (vía la IFrame API oficial de Spotify, con licencia de Spotify)
 * y el reproductor se desliza a una esquina abajo-derecha en formato pequeño,
 * SIN dejar de sonar (el iframe nunca se desmonta: solo se mueve con transform).
 *
 * Legal: usa el embed oficial de Spotify, así que los derechos los cubre Spotify.
 * No alojamos ningún audio. La pega: Spotify obliga a mostrar SU reproductor
 * (no se puede esconder del todo ni elegir el trozo), pero al menos se controla
 * desde nuestro botón y no es intrusivo.
 *
 * Nota: el script de Spotify es externo; en el sandbox no carga, pero en el
 * deploy (Vercel) sí. Cambia PLAYLIST_URI por la playlist/canción que quieras.
 */

// Playlist de artistas de Bonito (de lib/site.ts). Admite también
// "spotify:track:..." o "spotify:album:..." si prefieres una sola canción.
const PLAYLIST_URI = "spotify:playlist:2lxa6r7k0dthpANWR9wRWs";

export function SpotifyDock() {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<{ play?: () => void; togglePlay?: () => void } | null>(null);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const w = window as unknown as {
      SpotifyIframeApi?: unknown;
      onSpotifyIframeApiReady?: (api: unknown) => void;
    };

    const build = (IFrameAPI: {
      createController: (
        el: HTMLElement,
        opts: Record<string, unknown>,
        cb: (c: unknown) => void,
      ) => void;
    }) => {
      if (!hostRef.current || controllerRef.current) return;
      IFrameAPI.createController(
        hostRef.current,
        { uri: PLAYLIST_URI, width: "100%", height: 152, theme: "dark" },
        (controller) => {
          controllerRef.current = controller as typeof controllerRef.current;
          setReady(true);
        },
      );
    };

    if (w.SpotifyIframeApi) {
      build(w.SpotifyIframeApi as Parameters<typeof build>[0]);
    } else {
      w.onSpotifyIframeApiReady = (api) => {
        w.SpotifyIframeApi = api;
        build(api as Parameters<typeof build>[0]);
      };
      if (!document.getElementById("spotify-iframe-api")) {
        const s = document.createElement("script");
        s.id = "spotify-iframe-api";
        s.src = "https://open.spotify.com/embed/iframe-api/v1";
        s.async = true;
        document.body.appendChild(s);
      }
    }
  }, []);

  const handlePlay = () => {
    setStarted(true);
    controllerRef.current?.play?.();
    // Deja ver el arranque en el centro un instante y luego lo acopla.
    window.setTimeout(() => setDocked(true), 1100);
  };

  // Un único contenedor fijo anclado abajo-derecha. En modo "centro" se levanta
  // al medio de la pantalla con un transform (así la animación es suave y el
  // iframe no se remonta).
  const centerTransform =
    "translate(calc(-50vw + 50% + 20px), calc(-50vh + 50% + 20px)) scale(1.06)";

  return (
    <div
      className="fixed bottom-5 right-5 z-50 w-[min(92vw,360px)] print:hidden"
      style={{
        transform: docked ? "translate(0,0) scale(1)" : centerTransform,
        transition: "transform 750ms cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10"
        style={{ backgroundColor: "#14283C" }}
      >
        {/* Host del embed de Spotify (siempre montado). */}
        <div ref={hostRef} />

        {/* Antes de arrancar: tapamos el reproductor con NUESTRO CTA. */}
        {!started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
            <button
              type="button"
              onClick={handlePlay}
              disabled={!ready}
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: "#16b6d4", color: "#08222f" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              {ready ? "Dale al play" : "Cargando…"}
            </button>
            <span className="text-xs text-white/60">La música de Bonito</span>
          </div>
        )}

        {/* Ya sonando y aún centrado: pista visual de que se va a acoplar. */}
        {started && !docked && (
          <span className="pointer-events-none absolute right-3 top-3 text-[0.65rem] font-semibold uppercase tracking-wider text-white/50">
            Sonando…
          </span>
        )}
      </div>
    </div>
  );
}
