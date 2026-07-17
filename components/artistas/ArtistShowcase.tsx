"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArtistPlayer } from "./ArtistPlayer";

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
  /** Canción que reproduce el botón "Escuchar a X" (audio del artista o el de
   *  Bonito como fallback). */
  audioSrc?: string;
};

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
  const touchStart = useRef<{ x: number; y: number } | null>(null);
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

  // Swipe horizontal (móvil): deslizar izquierda = siguiente, derecha = anterior.
  // Solo actúa si el gesto es claramente horizontal, para no robar el scroll.
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section
      className="relative touch-pan-y overflow-hidden"
      style={{ backgroundColor: "#FBFAF6" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
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

          {/* Propuesta 3: tres botones redondos (Play invertido + Spotify +
              Instagram) y "Contratar booking" en pill cian. Play invertido =
              fondo oscuro (mismo navy que el resto); Spotify e Instagram con
              borde. Los tres salen SIEMPRE; sin link real, caen a una búsqueda
              del artista (se sustituye por el link directo en cuanto esté). */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ArtistPlayer key={a.slug} artistName={a.name} src={a.audioSrc ?? "/audio/bonito.mp3"} />

            <a
              href={a.spotifyUrl ?? `https://open.spotify.com/search/${encodeURIComponent(a.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Escuchar a ${a.name} en Spotify`}
              title="Escuchar en Spotify"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 transition-transform duration-200 hover:scale-105"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.213c3.809-.871 7.076-.496 9.712 1.114a.623.623 0 0 1 .207.856Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 1 1-.452-1.49c3.632-1.102 8.147-.568 11.232 1.327a.779.779 0 0 1 .257 1.072Zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
              </svg>
            </a>

            <a
              href={a.instagramUrl ?? `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(a.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${a.name}`}
              title="Instagram"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 transition-transform duration-200 hover:scale-105"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <Link
              href={`/contacto?a=${a.slug}`}
              className="ml-1 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: CYAN }}
            >
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
