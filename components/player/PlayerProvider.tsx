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
 * navegar), así la música no se corta al cambiar de página.
 *
 * Fuente: una playlist PROPIA (audios en /public/audio). Empieza por la canción
 * de Bonito; "siguiente" avanza por el resto (cuando haya). Nada de Spotify: su
 * embed obliga a mostrar el banner de marca.
 *
 * Regla: cualquier vídeo CON sonido u otro audio (p. ej. "Escuchar a X" en una
 * ficha) pausa la música, para que nunca suenen dos cosas a la vez.
 */

type PlayerCtx = {
  playing: boolean;
  everStarted: boolean;
  isHome: boolean;
  /** Hay al menos un tema (con licencia) en la playlist. Si no, no hay player. */
  hasTracks: boolean;
  /** "siguiente" disponible: fuera del home, con música arrancada y ≥2 temas. */
  canNext: boolean;
  /** Playlist de Bonito en Spotify (se abre en pestaña nueva). */
  spotifyUrl: string;
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

export function PlayerProvider({
  children,
  playlist,
}: {
  children: ReactNode;
  playlist: string[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const audioRef = useRef<HTMLAudioElement>(null);
  const idxRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [everStarted, setEverStarted] = useState(false);

  const start = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setEverStarted(true);
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
      setEverStarted(true);
    } else {
      a.pause();
    }
  }, []);

  const next = useCallback(() => {
    const a = audioRef.current;
    if (!a || playlist.length < 2) return;
    idxRef.current = (idxRef.current + 1) % playlist.length;
    a.src = playlist[idxRef.current];
    a.load();
    a.play().catch(() => {});
    setEverStarted(true);
  }, [playlist]);

  // Estado play/pausa desde el propio audio.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  // Con varios temas, al acabar uno salta al siguiente (con uno solo, loop).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded = () => {
      if (playlist.length > 1) next();
    };
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, [next, playlist.length]);

  // Cualquier otro media CON sonido pausa la música (los vídeos mudos de la web
  // no la tocan). 'play' no burbujea → captura.
  useEffect(() => {
    const onMediaPlay = (e: Event) => {
      const t = e.target;
      if (t === audioRef.current) return;
      const isVideo = t instanceof HTMLVideoElement;
      const isAudio = t instanceof HTMLAudioElement;
      if (!isVideo && !isAudio) return;
      if (isVideo && (t.muted || t.volume === 0)) return;
      audioRef.current?.pause();
    };
    document.addEventListener("play", onMediaPlay, true);
    return () => document.removeEventListener("play", onMediaPlay, true);
  }, []);

  const hasTracks = playlist.length > 0;
  const canNext = everStarted && !isHome && playlist.length > 1;

  return (
    <Ctx.Provider
      value={{
        playing,
        everStarted,
        isHome,
        hasTracks,
        canNext,
        spotifyUrl: site.external.spotifyBonitoPlaylist,
        start,
        toggle,
        next,
      }}
    >
      {children}

      {/* Reproductor solo si hay algún tema (con licencia) en la playlist:
          sin canción no se pinta nada, para no dejar un botón muerto. */}
      {hasTracks && (
        <>
          <audio ref={audioRef} src={playlist[0]} loop={playlist.length < 2} preload="none" />
          <FloatingPlayer />
        </>
      )}
    </Ctx.Provider>
  );
}
