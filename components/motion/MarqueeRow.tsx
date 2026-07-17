"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";

type MarqueeRowProps = {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
};

/**
 * Marquee horizontal en bucle CONTINUO — imposible que se quede en blanco.
 *
 * El contenido se renderiza DOS veces en una sola fila con gap uniforme y el
 * track se anima con CSS puro desplazando `translateX(-50%)`: como el contenido
 * está duplicado exacto, al -50% el segundo set queda EXACTAMENTE donde
 * empezaba el primero → reinicio sin salto ni hueco. No depende de medir el
 * DOM ni de que carguen las imágenes: la posición siempre cuadra.
 *
 * La medición en píxeles solo ajusta la DURACIÓN (para una velocidad constante
 * en px/seg); si falla, se usa una duración por defecto. Un fallo de medición
 * cambiaría la velocidad, nunca dejaría hueco.
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
  // Duración inicial estimada para que arranque ya (sin flash/hueco); se afina
  // tras medir. 60s es un valor razonable para cualquier fila.
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      // scrollWidth = dos sets + gaps. Un set = mitad ancho aprox. Distancia
      // real recorrida en el -50% = scrollWidth/2. Velocidad constante px/seg.
      const half = track.scrollWidth / 2;
      if (half > 0) setDuration(half / Math.max(speed, 1));
    };

    // Medir tras el layout y de nuevo al cargar imágenes (por si cambian anchos).
    const raf = requestAnimationFrame(measure);
    const imgs = Array.from(track.querySelectorAll("img"));
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    return () => cancelAnimationFrame(raf);
  }, [speed, children]);

  const animName = direction === "left" ? "marquee-x" : "marquee-x-reverse";

  const items = Children.toArray(children);
  const render = (prefix: string) =>
    items.map((child, i) =>
      isValidElement(child) ? cloneElement(child, { key: `${prefix}-${i}` }) : child
    );

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className={`flex w-max flex-nowrap items-center motion-reduce:animate-none ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          gap,
          animation: `${animName} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {render("a")}
        {render("b")}
      </div>
    </div>
  );
}
