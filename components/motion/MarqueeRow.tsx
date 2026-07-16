"use client";

import { useEffect, useRef, Children, cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type MarqueeRowProps = {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
};

/**
 * Marquee horizontal en bucle CONTINUO (nunca se queda en blanco).
 * Renderiza el contenido dos veces en UNA sola fila con gap uniforme y anima
 * por la anchura exacta de un set (en píxeles): cuando el segundo set llega a
 * donde empezaba el primero, reinicia sin salto ni hueco. Repite el contenido
 * lo suficiente (desde quien lo llama) para cubrir pantallas anchas.
 */
export function MarqueeRow({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = "3rem",
}: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let tween: gsap.core.Tween | null = null;
    // Medir tras el layout (rAF) para que scrollWidth sea correcto.
    const raf = requestAnimationFrame(() => {
      const styles = getComputedStyle(track);
      const gapPx = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      // Contenido duplicado exacto → un set = (total + un gap) / 2. Ese gap de
      // más es el que separa el último ítem del set A del primero del set B.
      const setWidth = (track.scrollWidth + gapPx) / 2;
      if (setWidth <= 0) return;
      const dir = direction === "left" ? -1 : 1;
      gsap.set(track, { x: 0 });
      tween = gsap.to(track, {
        x: dir * -setWidth,
        duration: setWidth / speed,
        ease: "none",
        repeat: -1,
      });
      tweenRef.current = tween;
    });

    return () => {
      cancelAnimationFrame(raf);
      tween?.kill();
      tweenRef.current = null;
    };
  }, [speed, direction, children]);

  const onEnter = () => {
    if (pauseOnHover) tweenRef.current?.pause();
  };
  const onLeave = () => {
    if (pauseOnHover) tweenRef.current?.resume();
  };

  const items = Children.toArray(children);
  const render = (prefix: string) =>
    items.map((child, i) =>
      isValidElement(child) ? cloneElement(child, { key: `${prefix}-${i}` }) : child
    );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Una sola fila: los dos sets como hijos directos → gap uniforme. */}
      <div ref={trackRef} className="flex w-max flex-nowrap items-center" style={{ gap }}>
        {render("a")}
        {render("b")}
      </div>
    </div>
  );
}
