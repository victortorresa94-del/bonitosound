export function SpotifyEmbed({
  type,
  id,
  height = 352,
  title = "Spotify",
}: {
  type: "playlist" | "artist" | "track" | "album";
  id: string;
  height?: number;
  title?: string;
}) {
  if (!id) return null;
  return (
    <iframe
      title={title}
      src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
      width="100%"
      height={height}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      className="rounded-2xl border border-subtle"
    />
  );
}

export function YouTubeEmbed({
  id,
  title = "Vídeo",
}: {
  id: string;
  title?: string;
}) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-subtle">
      <iframe
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

/**
 * Feed "En directo". v1: rejilla que enlaza a Instagram.
 * Cuando Júlia publica, este bloque se cablea a un widget/token de IG (v1.1).
 */
export function InstagramFeed({
  handle = "bonito_sound",
  count = 6,
}: {
  handle?: string;
  count?: number;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <a
            key={i}
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl border border-subtle bg-bg-tertiary"
            aria-label={`Ver @${handle} en Instagram`}
          >
            <span className="absolute inset-0 flex items-center justify-center text-xs text-text-muted transition-colors group-hover:text-accent-warm">
              @{handle}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
