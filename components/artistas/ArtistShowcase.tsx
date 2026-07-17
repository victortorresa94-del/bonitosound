"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArtistPlayer, type PlayerTrack } from "./ArtistPlayer";
import { SpotifyButton } from "@/components/SpotifyButton";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export type ShowcaseArtist = {
  slug: string;
  name: string;
  genre: string;
  bioLine: string;
  image: string | null;
  isIllustration: boolean;
  spotifyUrl?: string;
  instagramUrl?: string;
  /** Temas de la micro-mezcla de 30 s que suena al darle a "Escuchar". */
  tracks?: PlayerTrack[];
};

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={NAVY} stroke="none" />
    </svg>
  );
}

/**
 * Showcase de artistas tipo carrusel (calcado del mockup): a un lado el nombre
 * en serif grande + género en cursiva cian + bio + enlaces, y al otro una
 * ilustración/foto grande. Navegable con las flechas. Cuando aterrice la
 * ilustración "dibujo" de cada artista sustituye a la foto sin tocar nada.
 */
export function ArtistShowcase({
  artists,
  startSlug,
}: {
  artists: ShowcaseArtist[];
  startSlug?: string;
}) {
  const router = useRouter();
  const [i, setI] = useState(() => {
    const idx = artists.findIndex((x) => x.slug === startSlug);
    return idx >= 0 ? idx : 0;
  });
  if (artists.length === 0) return null;
  const a = artists[i];
  const go = (d: number) => {
    const next = (i + d + artists.length) % artists.length;
    setI(next);
    // Navegación in-place: la URL refleja el artista actual sin recargar la
    // página ni perder el estado del carrusel.
    if (startSlug) router.replace(`/artistas/${artists[next].slug}`, { scroll: false });
  };
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto grid min-h-[78vh] max-w-6xl grid-cols-1 items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-10 md:py-10">
        {/* Texto */}
        <div key={`t-${a.slug}`} className="order-2 animate-[fadeIn_.5s_ease] md:order-1">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: CYAN }}>
            Artista · {pad(i + 1)} / {pad(artists.length)}
          </p>
          <Link href={`/artistas/${a.slug}`} className="inline-block transition-opacity hover:opacity-80">
            <h1 className="display leading-[0.95]" style={{ color: NAVY, fontSize: "clamp(3rem,8vw,6rem)" }}>
              {a.name}
            </h1>
          </Link>
          <p className="display italic" style={{ color: CYAN, fontSize: "clamp(1.4rem,3vw,2.2rem)" }}>
            {a.genre}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed md:text-lg" style={{ color: "#57544c" }}>
            {a.bioLine}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {a.spotifyUrl && (
              <SpotifyButton href={a.spotifyUrl} size="sm">
                Escuchar en Spotify
              </SpotifyButton>
            )}
            {a.instagramUrl && (
              <a
                href={a.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{ color: NAVY, borderColor: NAVY }}
              >
                <InstagramIcon /> Instagram
              </a>
            )}
          </div>

          {/* Play a la izquierda (el botón ES el reproductor: sin popups ni
              embeds), booking a la derecha. */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {a.tracks && a.tracks.length > 0 && (
              <ArtistPlayer
                key={a.slug}
                tracks={a.tracks}
                artistName={a.name}
              />
            )}
            <Link href={`/contratar?a=${a.slug}`} className="btn btn-primary">
              Contratar booking →
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button onClick={() => go(-1)} aria-label="Artista anterior" className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors hover:bg-black/5" style={{ borderColor: NAVY, color: NAVY }}>←</button>
            <button onClick={() => go(1)} aria-label="Siguiente artista" className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors hover:bg-black/5" style={{ borderColor: NAVY, color: NAVY }}>→</button>
            <span className="ml-2 text-sm text-text-muted">Desliza para ver más artistas</span>
          </div>
        </div>

        {/* Imagen — clic → ficha del artista */}
        <div className="order-1 md:order-2">
          <Link
            href={`/artistas/${a.slug}`}
            key={`i-${a.slug}`}
            className={`group relative mx-auto block aspect-[3/4] w-full max-w-md animate-[fadeIn_.5s_ease] ${a.isIllustration ? "" : "overflow-hidden rounded-2xl"}`}
            style={a.isIllustration ? undefined : { backgroundColor: "#ECE7D8" }}
          >
            {a.image ? (
              <Image
                src={a.image}
                alt={a.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className={`transition-transform duration-500 group-hover:scale-[1.03] ${a.isIllustration ? "object-contain" : "object-cover grayscale group-hover:grayscale-0"}`}
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center">
                <span className="display text-3xl" style={{ color: NAVY }}>{a.name}</span>
              </div>
            )}
            {!a.isIllustration && (
              <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-4 py-1.5 text-sm font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                Ver ficha →
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Puntos */}
      <div className="flex justify-center gap-2 pb-10">
        {artists.map((art, idx) => (
          <button
            key={art.slug}
            onClick={() => setI(idx)}
            aria-label={`Ir a ${art.name}`}
            className="h-2 rounded-full transition-all"
            style={{ width: idx === i ? 24 : 8, backgroundColor: idx === i ? CYAN : "rgba(20,40,60,0.25)" }}
          />
        ))}
      </div>
    </section>
  );
}
