"use client";

import { useEffect, useRef } from "react";

/** Filtro SVG global que da "vida" a la imagen del hero: un displacement
 *  muy sutil cuya baseFrequency oscila con el tiempo, lo que provoca un
 *  shimmer en los bordes — muy visible en la capa, casi invisible en la
 *  cara. El filtro se aplica al hero vía CSS `filter: url(#hero-displace)`.
 *
 *  Implementación: SMIL `<animate>` sobre `baseFrequency` y `scale` —
 *  corre nativo en el navegador a 60 fps sin pasar por React/JS. Se
 *  desactiva en `prefers-reduced-motion: reduce` retirando el filtro
 *  del DOM. */
export function HeroDisplaceFilter() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const svg = ref.current;
      if (!svg) return;
      svg.style.display = mq.matches ? "none" : "block";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id="hero-displace">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves={2}
            seed={4}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="9s"
              values="0.010 0.016; 0.018 0.022; 0.010 0.016"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={6}
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              dur="5s"
              values="5; 8; 5"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
}
