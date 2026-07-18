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
 * Reel de Instagram embebido vía iframe oficial (`/embed`). No necesita
 * script de terceros ni token: el navegador del visitante lo carga directo
 * de Instagram. Portrait 9:16, pensado para la presentación de marca.
 * Pasa la URL o el shortcode del reel.
 */
export function InstagramReel({
  url,
  title = "Reel de Instagram",
}: {
  url: string;
  title?: string;
}) {
  const id = url.match(/\/(?:reel|p|tv)\/([\w-]+)/)?.[1] ?? "ig";
  // IMPORTANTE: Instagram ha bloqueado los embeds de terceros — los iframes
  // salen rotos ("el enlace es incorrecto o se ha suprimido") aunque el reel
  // sea público y válido. Así que NO incrustamos: pintamos una tarjeta navy que
  // enlaza al reel (siempre funciona). Para verlo INLINE, usar un .mp4 local.
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className="group relative mx-auto flex aspect-[9/16] w-full max-w-[300px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl p-6 text-center shadow-sm ring-1 ring-white/10 transition-transform duration-300 hover:scale-[1.02]"
      style={{ background: "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
          <defs>
            <linearGradient id={`igc-${id}`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="45%" stopColor="#DD2A7B" />
              <stop offset="80%" stopColor="#8134AF" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke={`url(#igc-${id})`} strokeWidth="1.9" />
          <circle cx="12" cy="12" r="4.2" stroke={`url(#igc-${id})`} strokeWidth="1.9" />
          <circle cx="17.2" cy="6.8" r="1.2" fill={`url(#igc-${id})`} />
        </svg>
      </span>
      <span className="font-round text-base font-bold text-white">Ver en Instagram</span>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 transition-colors group-hover:text-white">
        Abrir el reel
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </a>
  );
}

/**
 * Feed "En directo". Embebe posts concretos de Instagram vía oEmbed oficial
 * (no necesita API token). Pasa las URLs de los posts en `posts`.
 * Si la lista está vacía, cae a una rejilla que enlaza al perfil.
 *
 * Para feed dinámico de los últimos posts hace falta Instagram Graph API
 * con token de Meta Business — eso es v1.1.
 */
export function InstagramFeed({
  handle = "bonito_sound",
  posts = [],
  count = 6,
}: {
  handle?: string;
  posts?: string[];
  count?: number;
}) {
  if (posts.length === 0) {
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
              <span className="absolute inset-0 flex items-center justify-center text-xs text-text-muted transition-colors group-hover:text-accent-cyan">
                @{handle}
              </span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted">
          Para mostrar publicaciones reales: pega las URLs de los posts en{" "}
          <code>InstagramFeed posts={"{[…]}"}</code>.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((url) => {
        const id = url.match(/\/(?:p|reel)\/([\w-]+)/)?.[1];
        if (!id) return null;
        return (
          <blockquote
            key={id}
            className="instagram-media rounded-2xl border border-subtle bg-bg-tertiary"
            data-instgrm-permalink={`https://www.instagram.com/p/${id}/`}
            data-instgrm-version="14"
            style={{ minHeight: 420 }}
          >
            <a
              href={`https://www.instagram.com/p/${id}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 text-center text-sm text-text-muted hover:text-text-primary"
            >
              Ver publicación en Instagram →
            </a>
          </blockquote>
        );
      })}
      <script async src="https://www.instagram.com/embed.js"></script>
    </div>
  );
}
