"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  /** ID de Spotify del tema que suena al darle a "Escuchar". */
  trackId?: string;
};

function SpotifyIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={NAVY} aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.213c3.809-.871 7.076-.496 9.712 1.114a.623.623 0 0 1 .207.856Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 1 1-.452-1.49c3.632-1.102 8.147-.568 11.232 1.327a.779.779 0 0 1 .257 1.072Zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
    </svg>
  );
}

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
  // El reproductor se cierra al cambiar de artista: no se queda sonando el
  // tema de otro mientras miras a este.
  const [playing, setPlaying] = useState(false);
  if (artists.length === 0) return null;
  const a = artists[i];
  const go = (d: number) => {
    const next = (i + d + artists.length) % artists.length;
    setI(next);
    setPlaying(false);
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

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            {a.spotifyUrl && (
              <a href={a.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: NAVY }}>
                <SpotifyIcon /> Escucha su música en Spotify
              </a>
            )}
            {a.instagramUrl && (
              <a href={a.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70" style={{ color: NAVY }}>
                <InstagramIcon /> Síguele en Instagram
              </a>
            )}
          </div>

          {/* Play primero (que suene nada más llegar), booking a la derecha.
              El navegador exige un gesto para el audio: ese gesto es este clic,
              así que el iframe se monta ya con autoplay y suena. */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            {a.trackId && !playing && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: CYAN }}
                aria-label={`Escuchar a ${a.name}`}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-full transition-transform group-hover:scale-105"
                  style={{ backgroundColor: NAVY }}
                >
                  <svg width="14" height="16" viewBox="0 0 14 16" fill={CYAN} aria-hidden>
                    <path d="M0 0 L14 8 L0 16 Z" />
                  </svg>
                </span>
                <span className="font-round text-base font-bold" style={{ color: NAVY }}>
                  Escuchar
                </span>
              </button>
            )}
            <Link href={`/contratar/${a.slug}`} className="btn btn-primary">
              Contratar booking →
            </Link>
          </div>

          {/* Reproductor: aparece al darle a Escuchar y arranca solo. */}
          {a.trackId && playing && (
            <div className="mt-5 max-w-md">
              <iframe
                title={`${a.name} sonando`}
                src={`https://open.spotify.com/embed/track/${a.trackId}?utm_source=generator&theme=0&autoplay=1`}
                width="100%"
                height={152}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-2xl border border-subtle"
              />
            </div>
          )}

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
