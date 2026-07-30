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
import type { Radio, Track } from "@/lib/audio";
import { playTuningNoise } from "@/lib/radio-static";
import { FloatingPlayer } from "./FloatingPlayer";

/**
 * Player GLOBAL de la web. Vive en el layout raíz (que no se desmonta al
 * navegar), así la música no se corta al cambiar de página.
 *
 * Fuente: la Radio Bonito, UNA sesión continua mezclada tipo DJ (los temas se
 * solapan con crossfade). Por eso no hay "siguiente fichero": cambiar de
 * emisora es SALTAR EN EL TIEMPO dentro del mismo mp3, y el tema que suena se
 * deduce del `currentTime`. Así la mezcla se oye fluida y no cortada.
 *
 * Regla: cualquier vídeo CON sonido u otro audio (p. ej. "Escuchar a X" en una
 * ficha) pausa la música, para que nunca suenen dos cosas a la vez.
 */

/** La radio entra suave: es fondo, no protagonista. */
const VOLUMEN = 0.55;

type PlayerCtx = {
  playing: boolean;
  everStarted: boolean;
  isHome: boolean;
  /** Hay radio disponible. Si no, no se pinta reproductor. */
  hasTracks: boolean;
  /** "siguiente" disponible: con música arrancada y ≥2 temas. */
  canNext: boolean;
  /** Playlist de Bonito en Spotify (se abre en pestaña nueva). */
  spotifyUrl: string;
  /** Tema que suena ahora (para pintarlo en la radio). */
  current: Track | null;
  /** Índice del tema actual: la aguja del dial se coloca con esto. */
  index: number;
  /** Nº de temas: las "emisoras" del dial. */
  total: number;
  /** True mientras suena la ráfaga de sintonía entre tema y tema. */
  tuning: boolean;
  start: () => void;
  toggle: () => void;
  next: () => void;
  /** Salta a una emisora concreta del dial. */
  goTo: (i: number) => void;
};

const Ctx = createContext<PlayerCtx | null>(null);

export function usePlayer() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlayer debe usarse dentro de <PlayerProvider>");
  return c;
}

export function PlayerProvider({
  children,
  radio,
}: {
  children: ReactNode;
  radio: Radio | null;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const tracks = radio?.tracks ?? [];

  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [everStarted, setEverStarted] = useState(false);
  const [tuning, setTuning] = useState(false);

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

  /**
   * Cambiar de emisora = saltar al segundo donde entra ese tema. Va precedido
   * de la ráfaga de sintonía, pero el audio NO se para del todo: se baja el
   * volumen y se vuelve a subir, para que el salto también suene a mezcla.
   */
  const goTo = useCallback(
    (i: number) => {
      const a = audioRef.current;
      if (!a || tracks.length < 2) return;
      const destino = ((i % tracks.length) + tracks.length) % tracks.length;

      setTuning(true);
      const ms = playTuningNoise();
      a.volume = 0.12;

      window.setTimeout(() => {
        a.currentTime = tracks[destino].at;
        a.volume = VOLUMEN;
        a.play().catch(() => {});
        setIndex(destino);
        setEverStarted(true);
        setTuning(false);
      }, ms);
    },
    [tracks],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Estado play/pausa desde el propio audio.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = VOLUMEN;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, []);

  /**
   * El tema que suena se DEDUCE del tiempo, no de un temporizador: como es una
   * sesión continua, basta con mirar por qué segundo va. Así la aguja del dial
   * y el nombre siempre concuerdan con lo que de verdad se está oyendo, aunque
   * el usuario haya saltado a mano.
   */
  useEffect(() => {
    const a = audioRef.current;
    if (!a || tracks.length < 2) return;
    const onTime = () => {
      if (tuning) return;
      const t = a.currentTime;
      let i = 0;
      for (let n = 0; n < tracks.length; n++) if (t >= tracks[n].at) i = n;
      setIndex((prev) => (prev === i ? prev : i));
    };
    a.addEventListener("timeupdate", onTime);
    return () => a.removeEventListener("timeupdate", onTime);
  }, [tracks, tuning]);

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

  const hasTracks = tracks.length > 0;
  const canNext = everStarted && tracks.length > 1;

  return (
    <Ctx.Provider
      value={{
        playing,
        everStarted,
        isHome,
        hasTracks,
        canNext,
        spotifyUrl: site.external.spotifyBonitoPlaylist,
        current: tracks[index] ?? null,
        index,
        total: tracks.length,
        tuning,
        start,
        toggle,
        next,
        goTo,
      }}
    >
      {children}

      {/* Sin sesión generada no se pinta nada, para no dejar un botón muerto.
          La sesión va en bucle: al acabar vuelve a empezar sola. */}
      {radio && (
        <>
          <audio ref={audioRef} src={radio.src} loop preload="none" />
          <FloatingPlayer />
        </>
      )}
    </Ctx.Provider>
  );
}
