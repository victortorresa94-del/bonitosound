"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { ParsedForm } from "@/lib/svg-form";

export type FormData = ParsedForm & {
  id: string;
  triggerSceneId: string | null;
  label: string;
};

type MetamorphicLogoProps = {
  forms: FormData[];
};

/** Identidad metamórfica de Bonito Sound. El logo aparece, vive (flota +
 *  saluda con un wobble cálido) y se transforma con el scroll en megáfono
 *  → guitarra → bafle, encadenado a las escenas de la narrativa.
 *
 *  Implementación: cada forma es su PROPIO <svg> apilado en absoluto con
 *  su viewBox nativo (sin morph entre coords que no encajan). El cruce de
 *  formas es un crossfade animado con GSAP core + ScrollTrigger — sin
 *  plugins de pago (DrawSVG/MorphSVG no eran fiables en este entorno).
 *
 *  Movimiento siempre activo:
 *    - Entrada: scale + fade del SVG.
 *    - Loop: pequeño bob vertical + wobble (saludo) infinito (yoyo).
 *    - Scroll: la forma actual "vuela" (sube + rota + se desvanece) y la
 *      siguiente entra desde abajo con su propio bob.
 */
export function MetamorphicLogo({ forms }: MetamorphicLogoProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || forms.length === 0) return;
    const svgs = Array.from(
      stage.querySelectorAll<SVGSVGElement>("svg[data-bs-form]")
    );
    if (svgs.length === 0) return;

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

        // Estado inicial: todas ocultas excepto la 0.
        gsap.set(svgs, { opacity: 0, scale: 1, yPercent: 0, rotation: 0 });
        gsap.set(svgs[0], { opacity: 1 });

        if (reduced) return;

        // 1 · Entrada: la primera forma escala + entra.
        gsap.fromTo(
          svgs[0],
          { scale: 0.85, opacity: 0, yPercent: 4 },
          {
            scale: 1,
            opacity: 1,
            yPercent: 0,
            duration: 1.1,
            ease: "power3.out",
          }
        );

        // 2 · Loop infinito: bob vertical + wobble (saludo cálido).
        //     Cada forma activa adquiere el mismo idle al activarse.
        const startIdle = (el: SVGSVGElement) => {
          gsap.killTweensOf(el, "yPercent,rotation,scale");
          gsap.to(el, {
            yPercent: -2.6,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.to(el, {
            rotation: 3.2,
            transformOrigin: "50% 80%",
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.to(el, {
            scale: 1.018,
            transformOrigin: "50% 60%",
            duration: 3.1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        };
        startIdle(svgs[0]);

        // 3 · Transformaciones con scroll. Cada forma >=1 se asocia a un
        //     #scene-<triggerSceneId>: la anterior vuela hacia arriba +
        //     rota y se desvanece; la nueva entra desde abajo con bob.
        for (let i = 1; i < forms.length; i++) {
          const f = forms[i];
          if (!f.triggerSceneId) continue;
          const target = `#scene-${f.triggerSceneId}`;
          if (!document.querySelector(target)) continue;

          const fromIdx = i - 1;
          const toIdx = i;
          const fromSvg = svgs[fromIdx];
          const toSvg = svgs[toIdx];

          const tl = gsap.timeline({ paused: true });
          tl.to(
            fromSvg,
            {
              yPercent: -28,
              rotation: -8,
              scale: 0.7,
              opacity: 0,
              transformOrigin: "50% 50%",
              duration: 1,
              ease: "power2.in",
            },
            0
          ).fromTo(
            toSvg,
            { yPercent: 26, scale: 0.85, opacity: 0, rotation: 6 },
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1,
              ease: "power2.out",
            },
            0.15
          );

          ScrollTrigger.create({
            id: `bs-morph-${f.id}`,
            trigger: target,
            start: "top 75%",
            end: "top 25%",
            scrub: 0.8,
            animation: tl,
            onEnter: () => {
              setActiveIdx(toIdx);
              startIdle(toSvg);
            },
            onLeaveBack: () => {
              setActiveIdx(fromIdx);
              startIdle(fromSvg);
            },
          });
        }

        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (
              typeof st.vars?.id === "string" &&
              st.vars.id.startsWith("bs-morph-")
            ) {
              st.kill();
            }
          });
          svgs.forEach((s) => gsap.killTweensOf(s));
        };
      }
    );

    return () => mm.revert();
  }, [forms]);

  return (
    <section
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-bg-primary"
      aria-label={forms[activeIdx]?.label || "Bonito Sound"}
    >
      <h1 className="sr-only">
        {forms[activeIdx]?.label || "Bonito Sound"} — el ecosistema cultural
        integral del sector musical
      </h1>

      <div
        ref={stageRef}
        className="relative flex h-[72svh] max-h-[820px] w-full max-w-[92vw] items-center justify-center"
      >
        {forms.map((f, i) => (
          <svg
            key={f.id}
            data-bs-form={f.id}
            aria-hidden="true"
            viewBox={f.viewBox}
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
            // Cada forma stackeada: posición absoluta, centro-centro.
            // La forma 0 visible en SSR para evitar FOUC; el resto a 0.
            style={{ opacity: i === 0 ? 1 : 0, willChange: "transform, opacity" }}
            className="absolute inset-0 m-auto h-full w-auto max-w-full"
            dangerouslySetInnerHTML={{
              __html:
                `<g style="${f.shapeStyle}">${f.shapeInner}</g>` +
                `<g style="${f.letteringStyle}">${f.letteringInner}</g>`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-9 flex flex-col items-center gap-3">
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-text-muted">
          Baja
        </span>
        <span className="scroll-cue-dark" aria-hidden="true" />
      </div>
    </section>
  );
}
