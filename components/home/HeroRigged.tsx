"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Hero rigeado: el superhéroe BONITO SOUND volando, animado por partes.
 *
 *  El cuerpo + tipografía es un PNG estático (el logo es la marca, no se
 *  trocea). Lo que se mueve por separado:
 *    - Capa  (overlay con clip, gira desde el hombro)
 *    - Pelo  (overlay con clip, dance)
 *    - Speed lines  (SVG dibujado a mano, translateX + opacity twinkle)
 *    - Cuerpo entero  (bob + tilt + saludo periódico)
 *
 *  Respeta prefers-reduced-motion. */
export function HeroRigged() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const capeRef = useRef<HTMLImageElement>(null);
  const hairRef = useRef<HTMLImageElement>(null);
  const fistRef = useRef<HTMLImageElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);
  const sparklesRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const body = bodyRef.current;
    const cape = capeRef.current;
    const hair = hairRef.current;
    const fist = fistRef.current;
    const lines = linesRef.current;
    const sparkles = sparklesRef.current;
    if (!section || !wrap || !body) return;

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
        if (reduced) return;

        // 1 · Entrada del hero entero
        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.92, y: 32 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        // 2 · Levitación del cuerpo entero (cuerpo + lettering + boots)
        gsap.to(body, {
          yPercent: -3,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(body, {
          rotate: 1.2,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "60% 50%",
        });

        // 3 · Capa: sway independiente desde el hombro (lado derecho de la cape)
        if (cape) {
          gsap.set(cape, { transformOrigin: "75% 25%" });
          gsap.to(cape, {
            rotate: -6,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.to(cape, {
            scaleY: 1.06,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // 4 · Pelo-llama: skew + scaleY ondulante
        if (hair) {
          gsap.set(hair, { transformOrigin: "50% 100%" });
          gsap.to(hair, {
            skewX: 6,
            scaleY: 1.12,
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // 5 · Puño extendido: pulse hacia adelante
        if (fist) {
          gsap.set(fist, { transformOrigin: "30% 50%" });
          gsap.to(fist, {
            scale: 1.04,
            x: 6,
            duration: 1.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        // 6 · Speed lines: translateX ondulante por línea
        if (lines) {
          const lineEls = lines.querySelectorAll<SVGLineElement>("line");
          lineEls.forEach((l, i) => {
            gsap.to(l, {
              attr: { x1: `-=${20 + i * 6}`, x2: `-=${20 + i * 6}` },
              opacity: 0.1,
              duration: 0.8 + Math.random() * 0.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: Math.random() * 1.2,
            });
          });
        }

        // 7 · Sparkles alrededor del puño: twinkle
        if (sparkles) {
          const sparkEls = sparkles.querySelectorAll<SVGElement>("[data-sparkle]");
          sparkEls.forEach((s) => {
            gsap.fromTo(
              s,
              { opacity: 0, scale: 0.6 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.9 + Math.random() * 0.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2,
              }
            );
          });
        }

        // 8 · Burst de "saludo" cada 7 s: el personaje pulsa
        const burst = gsap.timeline({ repeat: -1, repeatDelay: 5.5 });
        burst
          .to(wrap, { scale: 1.04, duration: 0.35, ease: "back.out(2)" })
          .to(wrap, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.5)" });

        // 9 · Parallax de salida con el scroll
        const exit = ScrollTrigger.create({
          id: "bs-hero-exit",
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          animation: gsap.to(wrap, {
            y: -140,
            opacity: 0,
            scale: 0.94,
            ease: "none",
          }),
        });

        return () => {
          burst.kill();
          exit.kill();
          gsap.killTweensOf([wrap, body, cape, hair, fist].filter(Boolean));
        };
      }
    );

    return () => mm.revert();
  }, []);

  // Speed lines (drawn como SVG: navy lines a la izquierda de la cape)
  const speedLines = (
    <svg
      ref={linesRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#14252e" strokeWidth="0.5" strokeLinecap="round" opacity="0.7">
        <line x1="6"  y1="58" x2="22" y2="58" />
        <line x1="2"  y1="66" x2="20" y2="66" />
        <line x1="8"  y1="72" x2="26" y2="72" />
        <line x1="0"  y1="78" x2="18" y2="78" />
        <line x1="5"  y1="84" x2="24" y2="84" />
        <line x1="10" y1="90" x2="28" y2="90" />
      </g>
    </svg>
  );

  // Sparkles alrededor del puño
  const sparkles = (
    <svg
      ref={sparklesRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g fill="#16b6d4">
        <circle data-sparkle cx="84" cy="10" r="1.1" />
        <circle data-sparkle cx="91" cy="16" r="0.7" />
        <circle data-sparkle cx="88" cy="22" r="0.9" />
        <circle data-sparkle cx="94" cy="9"  r="0.5" />
        <circle data-sparkle cx="80" cy="18" r="0.6" />
      </g>
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Bonito Sound — superhéroe volando"
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      <h1 className="sr-only">
        Bonito Sound — el ecosistema cultural integral del sector musical
      </h1>

      <div
        ref={wrapRef}
        className="relative mx-auto flex w-[min(78vw,1100px)] items-center justify-center"
        style={{ willChange: "transform, opacity", aspectRatio: "861/551" }}
      >
        {/* Stack absoluto: speed lines (detrás) → base → cape overlay → pelo → puño → sparkles */}
        {speedLines}

        <div
          ref={bodyRef}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          {/* Base: el personaje entero (PNG con fondo transparente). Las
              overlays animadas se montan encima de la misma posición. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/marca/superheroe-volando-rig.png"
            alt=""
            draggable={false}
            className="h-full w-full select-none object-contain"
          />

          {/* Capa animada: overlay con la zona de la cape recortada */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={capeRef}
            src="/img/marca/superheroe-rig-cape.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain"
            style={{ willChange: "transform" }}
          />

          {/* Pelo-llama animado */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={hairRef}
            src="/img/marca/superheroe-rig-hair.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain"
            style={{ willChange: "transform" }}
          />

          {/* Puño extendido animado */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={fistRef}
            src="/img/marca/superheroe-rig-fist.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain"
            style={{ willChange: "transform" }}
          />
        </div>

        {sparkles}
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
