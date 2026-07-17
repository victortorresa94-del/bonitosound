import type { ReactNode } from "react";

// Verde oficial de Spotify. El de marca es #1DB954; #1ED760 es el hover vivo.
const SPOTIFY_GREEN = "#1DB954";

function SpotifyGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.213c3.809-.871 7.076-.496 9.712 1.114a.623.623 0 0 1 .207.856Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 1 1-.452-1.49c3.632-1.102 8.147-.568 11.232 1.327a.779.779 0 0 1 .257 1.072Zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
    </svg>
  );
}

type SpotifyButtonProps = {
  /** URL de Spotify (perfil, playlist, track…). */
  href: string;
  /** Texto del botón. Por defecto "Escuchar en Spotify". */
  children?: ReactNode;
  /** "solid" = pastilla verde (primario). "soft" = contorno verde sobre crema. */
  variant?: "solid" | "soft";
  size?: "sm" | "md";
  className?: string;
};

/**
 * Botón oficial de Spotify: pastilla verde de marca con el logo. Enlace externo
 * a nueva pestaña. Se usa en la ficha de artista y donde haya que mandar a
 * escuchar. Pensado para vivir sobre fondo crema/claro.
 */
export function SpotifyButton({
  href,
  children = "Escuchar en Spotify",
  variant = "solid",
  size = "md",
  className = "",
}: SpotifyButtonProps) {
  if (!href) return null;

  const sizing = size === "sm" ? "px-4 py-2 text-xs gap-2" : "px-6 py-3 text-sm gap-2.5";
  const base =
    "group inline-flex items-center rounded-full font-bold tracking-tight " +
    "transition-all duration-200 will-change-transform hover:-translate-y-0.5 " +
    "active:translate-y-0 active:scale-[0.98] focus-visible:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-offset-2";

  const skin =
    variant === "solid"
      ? "text-white shadow-[0_6px_18px_-6px_rgba(29,185,84,0.7)] hover:shadow-[0_10px_24px_-6px_rgba(29,185,84,0.8)]"
      : "bg-transparent";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizing} ${skin} ${className}`}
      style={
        variant === "solid"
          ? { backgroundColor: SPOTIFY_GREEN }
          : { color: "#0f7a37", border: `1.5px solid ${SPOTIFY_GREEN}` }
      }
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        <SpotifyGlyph size={size === "sm" ? 16 : 18} />
      </span>
      {children}
    </a>
  );
}
