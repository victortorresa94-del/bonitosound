"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, DrawSVGPlugin } from "@/lib/gsap";

type HeroDrawingProps = {
  /** SVG inline serializado (string). Lo provee el padre (server component)
   *  leyendo public/img/marca/superheroe-vector.svg, para que el cliente lo
   *  pueda inyectar con dangerouslySetInnerHTML y GSAP target paths. */
  svgMarkup: string;
  /** Texto del h1 sr-only para accesibilidad. El SVG es decorativo. */
  label: string;
};

/**
 * Hero animado: el superhéroe se pinta solo (trazo → relleno) y luego entra
 * en un loop sutil. Patrón GSAP DrawSVGPlugin + matchMedia para reduced-motion.
 *
 * Estados encadenados (timeline maestra):
 *   1. Trazo (drawSVG 0% → 100%) con stagger por path, mientras los paths
 *      tienen stroke = su color y fill-opacity = 0.
 *   2. Relleno: fill-opacity 0 → 1, stroke-width → 0 (las siluetas se solidifican).
 *   3. Idle: respiración muy sutil de todo el SVG, en bucle infinito.
 *
 * En prefers-reduced-motion: salto al estado final estático sin animar.
 */
export function HeroDrawing({ svgMarkup, label }: HeroDrawingProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  // Asegura que DrawSVGPlugin se referencia (no tree-shake). El registro real
  // vive en lib/gsap.ts.
  void DrawSVGPlugin;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const svg = stage.querySelector<SVGSVGElement>("svg[data-bs-mascot]");
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement>("path");
    if (paths.length === 0) return;

    // Marca el SVG como "ready" (la regla CSS deja de forzar fill-opacity:0).
    svg.setAttribute("data-stage", "ready");

    const mm = gsap.matchMedia();

    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const { reduced } = ctx.conditions as {
          normal: boolean;
          reduced: boolean;
        };

        if (reduced) {
          // Estado final estático.
          gsap.set(paths, {
            fillOpacity: 1,
            strokeOpacity: 0,
            strokeWidth: 0,
          });
          return;
        }

        // Preparación: cada path lleva stroke = su color (heredado del <g>
        // padre vía currentColor), fill-opacity 0 al inicio para que solo se
        // vea la línea trazándose.
        gsap.set(paths, {
          fill: "currentColor",
          stroke: "currentColor",
          strokeWidth: 1.2,
          fillOpacity: 0,
          strokeOpacity: 1,
        });

        const tl = gsap.timeline();

        // 1 · Trazo (drawSVG 0 → 100%) por path con stagger.
        // 136 paths → stagger 0.008s = 1.1s totales; cada path se dibuja en ~0.6s.
        tl.from(paths, {
          drawSVG: 0,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.008,
        });

        // 2 · Relleno: el fill sube y el stroke desaparece.
        tl.to(
          paths,
          {
            fillOpacity: 1,
            strokeWidth: 0,
            strokeOpacity: 0,
            duration: 0.45,
            ease: "power1.out",
          },
          "-=0.25"
        );

        // 3 · Idle: respiración muy sutil de todo el SVG.
        tl.to(
          svg,
          {
            scale: 1.012,
            transformOrigin: "50% 90%",
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "+=0.1"
        );

        return () => {
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, [svgMarkup]);

  return (
    <section
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-bg-primary"
      aria-label={label}
    >
      <h1 className="sr-only">
        {label} — el ecosistema cultural integral del sector musical
      </h1>

      <div
        ref={stageRef}
        className="flex h-[68svh] max-h-[760px] w-auto max-w-[88vw] items-center justify-center [&_svg]:h-full [&_svg]:w-auto"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />

      {/* Cue de scroll — reutilizamos la utilidad oscura sobre crema. */}
      <div className="absolute bottom-9 flex flex-col items-center gap-3">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Baja
        </span>
        <span className="scroll-cue-dark" aria-hidden="true" />
      </div>
    </section>
  );
}
