"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin } from "@/lib/gsap";
import type { ParsedForm } from "@/lib/svg-form";

export type FormData = ParsedForm & {
  id: string;
  triggerSceneId: string | null;
  label: string;
};

type MetamorphicLogoProps = {
  forms: FormData[];
};

/** Identidad metamórfica de Bonito Sound: el logo se "pinta solo" al cargar
 *  (superhéroe) y se transforma a lo largo del scroll en megáfono → guitarra
 *  → bafle, sincronizado con las secciones de la narrativa.
 *
 *  Cada forma viene PRE-PARSEADA del servidor (lib/svg-form.ts) — el cliente
 *  solo orquesta la animación, sin DOMParser ni FOUC.
 *
 *  Técnica:
 *    - Un único <svg> con:
 *      • <path id="bs-silhouette"> que MorphSVG transforma entre las d's
 *        de cada forma (continuum visual subyacente, opacidad baja).
 *      • <g data-form="ID"> por cada forma con su shape + lettering ya
 *        serializados desde el server. Solo el activo es opacity 1.
 *    - Draw-on inicial de la forma 0 con DrawSVG + stagger.
 *    - ScrollTrigger ligado a `#scene-<triggerSceneId>` dispara el morph
 *      hacia la siguiente forma con scrub.
 */
export function MetamorphicLogo({ forms }: MetamorphicLogoProps) {
  void DrawSVGPlugin;
  void MorphSVGPlugin;
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || forms.length === 0) return;
    const root = stage.querySelector<SVGSVGElement>("svg[data-bs-metamorphic]");
    if (!root) return;

    const sil = root.querySelector<SVGPathElement>("#bs-silhouette");
    if (!sil) return;

    // Estado inicial: silueta con la d de la forma 0; todos los grupos
    // ocultos excepto el activo.
    sil.setAttribute("d", forms[0].silhouetteD);
    const groups = Array.from(
      root.querySelectorAll<SVGGElement>("[data-form]")
    );
    gsap.set(groups, { opacity: 0 });
    gsap.set(groups[0], { opacity: 1 });
    root.setAttribute("data-stage", "ready");

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
          // Estado final estático: forma activa pintada, sin transición.
          const allPaths = root.querySelectorAll<SVGPathElement>(
            "[data-form] path"
          );
          gsap.set(allPaths, { fillOpacity: 1, strokeWidth: 0 });
          return;
        }

        // 1 · Draw-on inicial de la forma 0 (superhéroe).
        const initialPaths = groups[0].querySelectorAll<SVGPathElement>(
          "path"
        );
        gsap.set(initialPaths, {
          stroke: "currentColor",
          strokeWidth: 1.3,
          fillOpacity: 0,
          strokeOpacity: 1,
        });
        const intro = gsap.timeline();
        intro
          .from(initialPaths, {
            drawSVG: 0,
            duration: 0.55,
            ease: "power2.inOut",
            stagger: 0.012,
          })
          .to(initialPaths, {
            fillOpacity: 1,
            strokeWidth: 0,
            strokeOpacity: 0,
            duration: 0.4,
            ease: "power1.out",
          });

        // 2 · Idle: respiración muy sutil del SVG entero.
        const idle = gsap.to(root, {
          scale: 1.012,
          transformOrigin: "50% 60%",
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });
        intro.add(() => idle.play(), "+=0.15");

        // 3 · Morphs por scroll. Cada forma (>=1) se asocia a un trigger
        //     #scene-<triggerSceneId>. Pintamos sus paths para que MorphSVG
        //     no haga estallar nada y aparezcan ya rellenos al crossfade.
        for (let i = 1; i < forms.length; i++) {
          const f = forms[i];
          if (!f.triggerSceneId) continue;
          const target = `#scene-${f.triggerSceneId}`;
          if (!document.querySelector(target)) continue;

          const fromIdx = i - 1;
          const toIdx = i;
          const toPaths = groups[toIdx].querySelectorAll<SVGPathElement>(
            "path"
          );
          gsap.set(toPaths, { fillOpacity: 1, strokeWidth: 0 });

          const tween = gsap.timeline({ paused: true });
          tween
            .to(sil, {
              morphSVG: forms[toIdx].silhouetteD,
              duration: 1.1,
              ease: "power2.inOut",
            })
            .to(
              groups[fromIdx],
              { opacity: 0, duration: 0.55, ease: "power2.out" },
              0
            )
            .to(
              groups[toIdx],
              { opacity: 1, duration: 0.55, ease: "power2.in" },
              0.4
            );

          ScrollTrigger.create({
            trigger: target,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.6,
            onEnter: () => setActiveIdx(toIdx),
            onLeaveBack: () => setActiveIdx(fromIdx),
            animation: tween,
          });
        }

        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger?.id?.startsWith("scene-")) st.kill();
          });
          idle.kill();
          intro.kill();
        };
      }
    );

    return () => mm.revert();
  }, [forms]);

  const viewBox = forms[0]?.viewBox || "0 0 1086 1448";

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
        className="flex h-[72svh] max-h-[820px] w-auto max-w-[92vw] items-center justify-center"
      >
        <svg
          data-bs-metamorphic="true"
          aria-hidden="true"
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          fill="currentColor"
          className="h-full w-auto"
        >
          {/* Silueta morphable: opacity 0 (es continuum subyacente). */}
          <path
            id="bs-silhouette"
            style={{ color: "var(--text-primary)" }}
            opacity={0}
            d={forms[0]?.silhouetteD || ""}
          />
          {forms.map((f, i) => (
            <g
              key={f.id}
              data-form={f.id}
              // Opacity inline para evitar FOUC: en SSR solo la forma 0 se
              // ve; tras hidratar, GSAP toma el control y reescribe estas
              // propiedades en cada cambio de scroll.
              opacity={i === 0 ? 1 : 0}
              dangerouslySetInnerHTML={{
                __html:
                  `<g style="${f.shapeStyle}">${f.shapeInner}</g>` +
                  `<g style="${f.letteringStyle}">${f.letteringInner}</g>`,
              }}
            />
          ))}
        </svg>
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
