import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { SpotifyEmbed } from "@/components/Embeds";

/** Glyph de Spotify (verde de marca). */
function SpotifyGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1DB954" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.78.78 0 1 1-.452-1.492c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 0 1 .255 1.072Zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.542-1.79c3.533-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
    </svg>
  );
}

/** Glyph de Instagram (degradado real de la marca). */
function IgGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ig-fm" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="45%" stopColor="#DD2A7B" />
          <stop offset="80%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-fm)" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-fm)" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="url(#ig-fm)" />
    </svg>
  );
}

function PlatformPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full border border-subtle bg-bg-secondary px-6 py-3 text-sm font-bold text-text-primary transition-transform duration-200 hover:scale-[1.04] hover:border-text-primary/25"
    >
      {children}
    </a>
  );
}

/**
 * Bloque "Escúchale" de la ficha de artista. Módulo principal a dos columnas
 * (título + botonera de plataformas · reproductor), y debajo lo que tenga
 * de más (temas destacados, playlist). Todo condicional: si el artista solo
 * tiene su perfil de Spotify o su Instagram, igual se ve un bloque en condiciones.
 */
export function ArtistFeaturedMusic({
  name,
  lastTrackId,
  featuredTrackIds,
  spotifyArtistId,
  spotifyPlaylistId,
  instagram,
}: {
  name: string;
  lastTrackId?: string;
  featuredTrackIds?: string[];
  spotifyArtistId?: string;
  spotifyPlaylistId?: string;
  instagram?: string;
}) {
  const last = lastTrackId?.trim();
  const playlist = spotifyPlaylistId?.trim();
  const artist = spotifyArtistId?.trim();
  const ig = instagram?.trim();

  const featured = Array.from(
    new Set((featuredTrackIds ?? []).map((id) => id?.trim()).filter(Boolean) as string[])
  ).filter((id) => id !== last);

  // Sin nada que enseñar (ni música ni redes), el bloque no existe.
  if (!last && featured.length === 0 && !playlist && !artist && !ig) return null;

  const hasPills = Boolean(artist || ig);
  const primaryEmbed = last
    ? { type: "track" as const, id: last, height: 152 }
    : artist
    ? { type: "artist" as const, id: artist, height: 352 }
    : null;

  return (
    <Section id="escuchale" className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow">Escúchale</RevealOnScroll>
      <h2 className="sr-only">La música de {name}</h2>

      {/* Módulo principal: escucha + síguele donde quieras. */}
      {(primaryEmbed || hasPills) && (
        <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <RevealOnScroll>
            <h3 className="display text-3xl leading-tight text-text-primary md:text-4xl">
              {last ? "Lo último que ha sacado" : "Dale al play."}
            </h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-text-secondary">
              Escúchale y, si te engancha, síguele donde escuches música.
            </p>
            {hasPills && (
              <div className="mt-7 flex flex-wrap gap-3">
                {artist && (
                  <PlatformPill href={`https://open.spotify.com/artist/${artist}`}>
                    <SpotifyGlyph /> Spotify
                  </PlatformPill>
                )}
                {ig && (
                  <PlatformPill href={ig}>
                    <IgGlyph /> Instagram
                  </PlatformPill>
                )}
              </div>
            )}
          </RevealOnScroll>

          {primaryEmbed && (
            <RevealOnScroll delay={0.1} className="w-full">
              <SpotifyEmbed
                type={primaryEmbed.type}
                id={primaryEmbed.id}
                height={primaryEmbed.height}
                title={`${name} en Spotify`}
              />
            </RevealOnScroll>
          )}
        </div>
      )}

      {/* Lo que tenga de más. */}
      {(featured.length > 0 || playlist) && (
        <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
          {featured.length > 0 && (
            <div>
              <RevealOnScroll as="h3" className="display text-2xl text-text-primary md:text-3xl">
                Temas destacados
              </RevealOnScroll>
              <StaggerGroup stagger={0.08} className="mt-6 grid gap-4 md:grid-cols-2">
                {featured.map((id, i) => (
                  <SpotifyEmbed key={id} type="track" id={id} height={152} title={`Tema destacado ${i + 1} de ${name}`} />
                ))}
              </StaggerGroup>
            </div>
          )}
          {playlist && (
            <div>
              <RevealOnScroll as="h3" className="display text-2xl text-text-primary md:text-3xl">
                Su playlist
              </RevealOnScroll>
              <RevealOnScroll as="div" className="mt-6" delay={0.1}>
                <SpotifyEmbed type="playlist" id={playlist} height={352} title={`Playlist de ${name}`} />
              </RevealOnScroll>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
