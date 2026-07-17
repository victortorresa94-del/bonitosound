"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useLenis } from "./MotionContext";

type Props = {
  children: React.ReactNode;
};

// Una ruta de ficha de artista: /artistas/<slug> (no /artistas ni /artistas/todos).
const isArtistSlug = (p: string) =>
  /^\/artistas\/[^/]+$/.test(p) && !p.endsWith("/todos");

export function PageTransitionShell({ children }: Props) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const prev = prevPath.current;
    prevPath.current = pathname;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Primer render o reduce-motion: contenido visible, sin animar.
    if (prev === null || reduce) {
      gsap.set(content, { autoAlpha: 1, y: 0 });
      return;
    }

    // Cambio entre fichas de artista: el carrusel ya hace su propio fundido
    // in-place. No forzamos scroll ni transición de página (era lo que hacía
    // el salto raro). Dejamos el contenido tal cual.
    if (isArtistSlug(prev) && isArtistSlug(pathname)) {
      gsap.set(content, { autoAlpha: 1, y: 0 });
      return;
    }

    // Navegación normal: arriba del todo + fundido suave (sin cortina negra).
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const tween = gsap.fromTo(
      content,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    return () => {
      tween.kill();
    };
  }, [pathname, lenis]);

  return <div ref={contentRef}>{children}</div>;
}
