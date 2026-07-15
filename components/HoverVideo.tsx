"use client";

/**
 * Vídeo que reproduce en hover y se pausa al salir. Aislado como client
 * component para que EventoCard (server) pueda resolver assets con fs y solo
 * la parte interactiva viva en el cliente.
 */
export function HoverVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  return (
    <video
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
      onMouseLeave={(e) => {
        e.currentTarget.pause();
        e.currentTarget.currentTime = 0;
      }}
    />
  );
}
