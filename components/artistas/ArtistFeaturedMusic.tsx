import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { SpotifyEmbed } from "@/components/Embeds";

/**
 * Bloque "Escúchale" = un único banner de Spotify a dos columnas:
 *  - Izquierda: el reproductor grande del artista (todas sus canciones).
 *  - Derecha: lo último que ha sacado + temas destacados (mini-embeds).
 * El seguir en redes vive en el bloque de redes, no aquí. Si el artista no
 * tiene nada en Spotify, el bloque no se pinta.
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

  if (!last && featured.length === 0 && !playlist && !artist) return null;

  // Reproductor grande de la izquierda: el perfil de artista (sus canciones),
  // o la playlist, o —si solo hay eso— el último tema.
  const big = artist
    ? { type: "artist" as const, id: artist }
    : playlist
    ? { type: "playlist" as const, id: playlist }
    : last
    ? { type: "track" as const, id: last }
    : null;

  const hasRight = Boolean((last && big?.type !== "track") || featured.length > 0 || (playlist && artist));

  return (
    <Section id="escuchale" className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow">Escúchale</RevealOnScroll>
      <h2 className="sr-only">La música de {name}</h2>
      <RevealOnScroll as="h3" delay={0.05} className="mt-2 display text-3xl leading-tight text-text-primary md:text-4xl">
        Todas sus canciones.
      </RevealOnScroll>

      <div className={`mt-8 grid gap-6 ${hasRight ? "md:grid-cols-2 md:items-start md:gap-8" : "max-w-3xl"}`}>
        {/* IZQUIERDA — reproductor grande */}
        {big && (
          <RevealOnScroll as="div" className="w-full">
            <SpotifyEmbed type={big.type} id={big.id} height={big.type === "track" ? 352 : 420} title={`${name} en Spotify`} />
            {artist && (
              <a
                href={`https://open.spotify.com/artist/${artist}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: "#1DB954" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.78.78 0 1 1-.452-1.492c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 0 1 .255 1.072Zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.542-1.79c3.533-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
                </svg>
                Abrir en Spotify
              </a>
            )}
          </RevealOnScroll>
        )}

        {/* DERECHA — último + destacados, en compacto (80px) y pegados: un
            listado, no tarjetas con hueco muerto debajo. */}
        {hasRight && (
          <RevealOnScroll as="div" delay={0.1} className="space-y-6">
            {last && big?.type !== "track" && (
              <div>
                <h4 className="mb-2.5 font-round text-sm font-bold uppercase tracking-[0.14em] text-text-muted">Lo último que ha sacado</h4>
                <SpotifyEmbed type="track" id={last} height={80} title={`Último tema de ${name}`} />
              </div>
            )}
            {featured.length > 0 && (
              <div>
                <h4 className="mb-2.5 font-round text-sm font-bold uppercase tracking-[0.14em] text-text-muted">Temas destacados</h4>
                <StaggerGroup stagger={0.05} className="space-y-2">
                  {featured.map((id, i) => (
                    <SpotifyEmbed key={id} type="track" id={id} height={80} title={`Tema destacado ${i + 1} de ${name}`} />
                  ))}
                </StaggerGroup>
              </div>
            )}
            {playlist && artist && (
              <div>
                <h4 className="mb-2.5 font-round text-sm font-bold uppercase tracking-[0.14em] text-text-muted">Su playlist</h4>
                <SpotifyEmbed type="playlist" id={playlist} height={352} title={`Playlist de ${name}`} />
              </div>
            )}
          </RevealOnScroll>
        )}
      </div>
    </Section>
  );
}
