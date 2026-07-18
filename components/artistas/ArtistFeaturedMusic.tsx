import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { SpotifyEmbed } from "@/components/Embeds";

/**
 * Bloque "Escúchale" de la ficha de artista: un BANNER de Spotify con sus
 * canciones (embed de artista, o su último tema arriba), y debajo lo que tenga
 * de más (temas destacados, playlist). El seguir en Instagram ya vive en el
 * hero y en el player flotante, así que aquí no se repite: esto es solo música.
 * Si el artista aún no tiene nada en Spotify, el bloque no se pinta.
 */
export function ArtistFeaturedMusic({
  name,
  lastTrackId,
  featuredTrackIds,
  spotifyArtistId,
  spotifyPlaylistId,
}: {
  name: string;
  lastTrackId?: string;
  featuredTrackIds?: string[];
  spotifyArtistId?: string;
  spotifyPlaylistId?: string;
}) {
  const last = lastTrackId?.trim();
  const playlist = spotifyPlaylistId?.trim();
  const artist = spotifyArtistId?.trim();

  const featured = Array.from(
    new Set((featuredTrackIds ?? []).map((id) => id?.trim()).filter(Boolean) as string[])
  ).filter((id) => id !== last);

  // Sin nada que sonar en Spotify, el bloque no existe (nada de dejar un botón
  // de "seguir" suelto: eso ya está arriba).
  if (!last && featured.length === 0 && !playlist && !artist) return null;

  return (
    <Section id="escuchale" className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow">Escúchale</RevealOnScroll>
      <h2 className="sr-only">La música de {name}</h2>

      <RevealOnScroll as="h3" className="mt-2 display text-3xl leading-tight text-text-primary md:text-4xl">
        {last ? "Lo último que ha sacado" : `Las canciones de ${name}`}
      </RevealOnScroll>

      {/* Banner de Spotify: su último tema (si hay) + sus canciones. */}
      <div className="mt-7 max-w-3xl space-y-4">
        {last && (
          <RevealOnScroll as="div" delay={0.05}>
            <SpotifyEmbed type="track" id={last} height={152} title={`Último tema de ${name}`} />
          </RevealOnScroll>
        )}
        {artist && (
          <RevealOnScroll as="div" delay={0.1}>
            <SpotifyEmbed type="artist" id={artist} height={380} title={`${name} en Spotify`} />
          </RevealOnScroll>
        )}
      </div>

      {artist && (
        <RevealOnScroll className="mt-6" delay={0.15}>
          <a
            href={`https://open.spotify.com/artist/${artist}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold"
            style={{ color: "#1DB954" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.78.78 0 1 1-.452-1.492c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 0 1 .255 1.072Zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.542-1.79c3.533-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
            </svg>
            Abrir en Spotify
          </a>
        </RevealOnScroll>
      )}

      {/* Lo que tenga de más. */}
      {(featured.length > 0 || playlist) && (
        <div className="mt-14 space-y-14 md:mt-20 md:space-y-20">
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
