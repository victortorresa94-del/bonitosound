"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * Vídeo que solo se carga y reproduce cuando entra en el viewport, y se pausa
 * al salir. `preload="none"` evita pedir el archivo hasta que toca — clave con
 * URLs de R2 (r2.dev) que Cloudflare limita si pides muchos vídeos a la vez.
 */
export function LazyVideo({
  src,
  poster,
  className = "",
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2, rootMargin: "200px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      style={style}
    />
  );
}
