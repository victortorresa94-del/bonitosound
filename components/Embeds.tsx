import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
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
 * Vídeo de Vimeo embebido. Mismo patrón que YouTubeEmbed: iframe oficial, sin
 * script de terceros. Acepta la URL completa o solo el id numérico.
 */
export function VimeoEmbed({
  id,
  title = "Vídeo",
}: {
  id: string;
  title?: string;
}) {
  const vid = id.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? id;
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-subtle bg-black">
      <iframe
        title={title}
        src={`https://player.vimeo.com/video/${vid}?dnt=1`}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
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
  const id = url.match(/\/(?:reel|p|tv)\/([\w-]+)/)?.[1] ?? url;
  // Embed del reel: muestra la portada y se reproduce al hacer clic. Funciona
  // con reels de cuentas PÚBLICAS (como @bonito_sound). Si una cuenta es
  // privada o el reel no admite embed, Instagram muestra su error — en ese caso
  // la vía fiable es un .mp4 local. El iframe es más alto que el contenedor y el
  // overflow-hidden recorta la barra inferior fea (likes, "Ver más").
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        className="relative overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary shadow-sm"
        style={{ height: 520 }}
      >
        <iframe
          title={title}
          src={`https://www.instagram.com/reel/${id}/embed`}
          loading="lazy"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-x-0 top-0 w-full border-0"
          style={{ height: 640 }}
        />
      </div>
    </div>
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
  const locale = serverLocale();
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
              {tr(locale, "Ver publicación en Instagram →")}
            </a>
          </blockquote>
        );
      })}
      <script async src="https://www.instagram.com/embed.js"></script>
    </div>
  );
}
