"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export type RosterCardProps = {
  slug: string;
  name: string;
  genre: string;
  photo: string | null;
  /** mp4 propio (R2/local). Si está, manda sobre YouTube. */
  video?: string;
  /** ID del primer YouTube del artista (fallback si no hay mp4). */
  youtubeId?: string;
  aspect?: string;
  shift?: string;
};

/**
 * Tarjeta del roster: foto B/N que, al pasar el ratón por encima, se convierte
 * en el vídeo del artista (mudo, en bucle). Prioriza un mp4 propio; si no lo
 * hay, usa su primer YouTube. Sin vídeo, se comporta como la foto de siempre.
 * El vídeo es `pointer-events-none`: el clic sigue llevando a la ficha.
 */
export function RosterCard({
  slug,
  name,
  genre,
  photo,
  video,
  youtubeId,
  aspect = "aspect-[4/5]",
  shift = "",
}: RosterCardProps) {
  const [hover, setHover] = useState(false);
  const hasVideo = Boolean(video || youtubeId);

  return (
    <Link
      href={`/artistas/${slug}`}
      data-cursor="link"
      className={`group block ${shift}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative ${aspect} overflow-hidden rounded-[1.5rem] bg-bg-tertiary shadow-[0_1px_0_rgba(20,40,60,0.06)] ring-1 ring-black/5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_-18px_rgba(20,40,60,0.45)]`}
      >
        {photo && (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        )}

        {/* Hover → vídeo. Solo se monta al pasar el ratón (no carga 6 a la vez). */}
        {hover && video && (
          <video
            src={video}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 h-full w-full animate-[fadeIn_.4s_ease] object-cover"
          />
        )}
        {hover && !video && youtubeId && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden animate-[fadeIn_.5s_ease]">
            <iframe
              title={name}
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3`}
              allow="autoplay; encrypted-media"
              className="absolute left-1/2 top-1/2 aspect-video h-full -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}

        {/* Badge "reproducible": solo si hay vídeo, se desvanece al hacer hover. */}
        {hasVideo && (
          <span
            className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0"
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}

        {/* Cue clickable: flecha que aparece al hover. */}
        <span
          className="absolute right-4 top-4 grid h-9 w-9 translate-y-1 place-items-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ backgroundColor: CYAN, color: NAVY }}
          aria-hidden
        >
          →
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-round text-2xl font-bold md:text-3xl" style={{ color: NAVY }}>
          {name}
        </span>
      </div>
      <p className="mt-0.5 text-sm text-text-muted">{genre}</p>
    </Link>
  );
}
