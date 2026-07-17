"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { FloatingPlayer } from "./FloatingPlayer";

/**
 * Player GLOBAL de la web. Vive en el layout raíz (que no se desmonta al
 * navegar), así la canción de Bonito no se corta al cambiar de página.
 *
 * Fuentes:
 *  - "bonito": la canción de Bonito (HTML5 audio, en loop). Es lo primero que
 *    suena (se activa desde el hero del home).
 *  - "spotify": la playlist de artistas de Bonito, vía el IFrame API de Spotify.
 *    Se activa con "siguiente" una vez has salido del home.
 *
 * Reglas:
 *  - Cualquier vídeo CON sonido que se reproduzca pausa la música (los vídeos
 *    mudos de la web —hover, hero— no la tocan).
 */

type Status = "idle" | "bonito" | "spotify";

type PlayerCtx = {
  status: Status;
  playing: boolean;
  everStarted: boolean;
  isHome: boolean;
  /** "siguiente" disponible: fuera del home y con música ya arrancada. */
  canNext: boolean;
  start: () => void;
  toggle: () => void;
  next: () => void;
};

const Ctx = createContext<PlayerCtx | null>(null);

export function usePlayer() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlayer debe usarse dentro de <PlayerProvider>");
  return c;
}

const AUDIO_SRC = "/audio/bonito.m4a";
const AUDIO_FALLBACK = "/audio/bonito.mp3";
const PLAYLIST_URI = `spotify:playlist:${site.external.spotifyBonitoPlaylistId}`;

// Tipos mínimos del IFrame API de Spotify (sin @types).
type SpotifyController = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  loadUri: (uri: string) => void;
  addListener: (ev: string, cb: (e: { data: { isPaused: boolean } }) => void) => void;
};

export function PlayerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const audioRef = useRef<HTMLAudioElement>(null);
  const spotifyElRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const spotifyLoading = useRef(false);

  const [status, setStatus] = useState<Status>("idle");
  const [playing, setPlaying] = useState(false);
  const [everStarted, setEverStarted] = useState(false);

  // ── Carga perezosa del IFrame API de Spotify + creación del controller ──
  // Se dispara en cuanto arranca la música (gesto del usuario), para que al
  // pulsar "siguiente" el play() ocurra dentro de un gesto y el navegador lo
  // permita (autoplay).
  const ensureSpotify = useCallback(() => {
    if (controllerRef.current || spotifyLoading.current) return;
    if (!site.external.spotifyBonitoPlaylistId) return;
    spotifyLoading.current = true;

    const build = () => {
      const w = window as unknown as {
        SpotifyIframeApi?: { createController: (...a: unknown[]) => void };
      };
      const api = w.SpotifyIframeApi;
      const el = spotifyElRef.current;
      if (!api || !el) return;
      api.createController(
        el,
        { uri: PLAYLIST_URI, width: "100%", height: 80 },
        (controller: SpotifyController) => {
          controllerRef.current = controller;
          controller.addListener("playback_update", (e) => {
            // Solo refleja estado cuando la fuente activa es Spotify.
            setPlaying((prev) => {
              const el2 = spotifyElRef.current;
              const active = el2?.dataset.active === "1";
              return active ? !e.data.isPaused : prev;
            });
          });
        },
      );
    };

    const wReady = window as unknown as { onSpotifyIframeApiReady?: (api: unknown) => void };
    if ((window as unknown as { SpotifyIframeApi?: unknown }).SpotifyIframeApi) {
      build();
    } else {
      wReady.onSpotifyIframeApiReady = (api) => {
        (window as unknown as { SpotifyIframeApi?: unknown }).SpotifyIframeApi = api;
        build();
      };
      const s = document.createElement("script");
      s.src = "https://open.spotify.com/embed/iframe-api/v1";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  // ── Acciones ──
  const start = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    // Salir de Spotify si estaba activo.
    if (spotifyElRef.current) spotifyElRef.current.dataset.active = "0";
    controllerRef.current?.pause();
    a.play().catch(() => {});
    setStatus("bonito");
    setEverStarted(true);
    ensureSpotify();
  }, [ensureSpotify]);

  const toggle = useCallback(() => {
    if (status === "spotify") {
      controllerRef.current?.togglePlay();
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
      setStatus("bonito");
      setEverStarted(true);
    } else {
      a.pause();
    }
  }, [status]);

  const next = useCallback(() => {
    // De la canción de Bonito → playlist de Spotify (nuestros artistas).
    const a = audioRef.current;
    a?.pause();
    ensureSpotify();
    if (spotifyElRef.current) spotifyElRef.current.dataset.active = "1";
    setStatus("spotify");
    setEverStarted(true);
    // play() dentro del gesto → autoplay permitido. Si el controller aún no
    // está listo, quedará cargado y el usuario lo arranca desde el propio embed.
    try {
      controllerRef.current?.play();
    } catch {
      /* noop */
    }
  }, [ensureSpotify]);

  // ── Estado "playing" desde el audio de Bonito ──
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => {
      if (spotifyElRef.current?.dataset.active !== "1") setPlaying(true);
    };
    const onPause = () => {
      if (spotifyElRef.current?.dataset.active !== "1") setPlaying(false);
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  // ── Cualquier otro media CON sonido pausa la música ──
  // Un vídeo con audio (no los mudos de la web) o cualquier otro <audio> (p. ej.
  // "Escuchar a X" en una ficha) hace que la música de fondo se calle, para que
  // nunca suenen dos cosas a la vez.
  useEffect(() => {
    const onMediaPlay = (e: Event) => {
      const t = e.target;
      if (t === audioRef.current) return; // nuestra propia música
      const isVideo = t instanceof HTMLVideoElement;
      const isAudio = t instanceof HTMLAudioElement;
      if (!isVideo && !isAudio) return;
      if (isVideo && (t.muted || t.volume === 0)) return; // vídeos mudos no molestan
      audioRef.current?.pause();
      if (spotifyElRef.current?.dataset.active === "1") controllerRef.current?.pause();
    };
    // 'play' no burbujea → captura.
    document.addEventListener("play", onMediaPlay, true);
    return () => document.removeEventListener("play", onMediaPlay, true);
  }, []);

  const canNext = everStarted && !isHome && Boolean(site.external.spotifyBonitoPlaylistId);

  return (
    <Ctx.Provider value={{ status, playing, everStarted, isHome, canNext, start, toggle, next }}>
      {children}

      {/* Audio persistente de Bonito. */}
      <audio ref={audioRef} loop preload="none">
        <source src={AUDIO_SRC} type="audio/mp4" />
        <source src={AUDIO_FALLBACK} type="audio/mpeg" />
      </audio>

      {/* Contenedor del embed de Spotify (se muestra al pasar a "spotify"). */}
      <div
        aria-hidden={status !== "spotify"}
        className="fixed bottom-24 right-5 z-40 w-[320px] max-w-[86vw] overflow-hidden rounded-2xl shadow-2xl transition-all duration-300"
        style={{
          opacity: status === "spotify" ? 1 : 0,
          transform: status === "spotify" ? "translateY(0)" : "translateY(12px)",
          pointerEvents: status === "spotify" ? "auto" : "none",
        }}
      >
        <div ref={spotifyElRef} />
      </div>

      <FloatingPlayer />
    </Ctx.Provider>
  );
}
