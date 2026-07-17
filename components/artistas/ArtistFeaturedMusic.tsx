import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { SpotifyEmbed } from "@/components/Embeds";
import { SpotifyButton } from "@/components/SpotifyButton";

/**
 * Bloque "Escúchale" de la ficha de artista: lo último que ha sacado,
 * temas destacados, su playlist y su perfil.
 * Todo condicional: el padre pasa solo lo que tiene.
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
  // Los ids vienen del frontmatter: limpiamos espacios para no pintar embeds rotos.
  const last = lastTrackId?.trim();
  const playlist = spotifyPlaylistId?.trim();
  const artist = spotifyArtistId?.trim();

  // Sin duplicados (evita keys repetidas) y sin repetir el tema que ya suena arriba.
  const featured = Array.from(
    new Set((featuredTrackIds ?? []).map((id) => id?.trim()).filter(Boolean) as string[])
  ).filter((id) => id !== last);

  // Sin nada que sonar, el bloque no existe.
  if (!last && featured.length === 0 && !playlist && !artist) return null;

  // El perfil se lleva el embed grande solo si es lo único que hay.
  // Si ya suena algo, basta con un enlace para seguirle (menos peso, mismo objetivo).
  const onlyArtist = Boolean(artist) && !last && featured.length === 0 && !playlist;

  return (
    <Section id="escuchale" className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow">
        Escúchale
      </RevealOnScroll>

      {/* Titular oculto: da jerarquía sin repetir el nombre del hero. */}
      <h2 className="sr-only">La música de {name}</h2>

      {/* space-y se encarga de los huecos: los bloques ausentes no dejan aire muerto. */}
      <div className="mt-8 space-y-14 md:space-y-20">
        {/* Lo último: el gancho, arriba del todo. */}
        {last ? (
          <div>
            <RevealOnScroll
              as="h3"
              className="display text-3xl text-text-primary md:text-4xl"
            >
              Lo último que ha sacado
            </RevealOnScroll>
            <RevealOnScroll as="div" className="mt-6 max-w-2xl" delay={0.1}>
              <SpotifyEmbed
                type="track"
                id={last}
                height={152}
                title={`Último tema de ${name}`}
              />
            </RevealOnScroll>
          </div>
        ) : null}

        {/* Temas destacados */}
        {featured.length > 0 ? (
          <div>
            <RevealOnScroll
              as="h3"
              className="display text-2xl text-text-primary md:text-3xl"
            >
              Temas destacados
            </RevealOnScroll>
            <StaggerGroup stagger={0.08} className="mt-6 grid gap-4 md:grid-cols-2">
              {featured.map((id, i) => (
                <SpotifyEmbed
                  key={id}
                  type="track"
                  id={id}
                  height={152}
                  title={`Tema destacado ${i + 1} de ${name}`}
                />
              ))}
            </StaggerGroup>
          </div>
        ) : null}

        {/* Su playlist */}
        {playlist ? (
          <div>
            <RevealOnScroll
              as="h3"
              className="display text-2xl text-text-primary md:text-3xl"
            >
              Su playlist
            </RevealOnScroll>
            <RevealOnScroll as="div" className="mt-6" delay={0.1}>
              <SpotifyEmbed
                type="playlist"
                id={playlist}
                height={352}
                title={`Playlist de ${name}`}
              />
            </RevealOnScroll>
          </div>
        ) : null}

        {/* Su perfil: embed entero si no hay nada más; si no, enlace para seguirle. */}
        {artist ? (
          <RevealOnScroll as="div" className="max-w-2xl" delay={0.1}>
            {onlyArtist ? (
              <SpotifyEmbed
                type="artist"
                id={artist}
                title={`${name} en Spotify`}
              />
            ) : (
              <SpotifyButton href={`https://open.spotify.com/artist/${artist}`}>
                Síguele en Spotify
              </SpotifyButton>
            )}
          </RevealOnScroll>
        ) : null}
      </div>
    </Section>
  );
}
