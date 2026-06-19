"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Hero del home con varias capas de movimiento sobre una imagen estática
 *  para que el personaje se perciba vivo sin necesidad de Lottie ni vídeo:
 *
 *    - Levitación vertical (bob)
 *    - Tilt sutil desfasado (sensación de planeo)
 *    - Wiggle periódico cada ~8 s (lee como "saludo del cuerpo")
 *    - Glow respiratorio (drop-shadow pulsa)
 *    - Cape sway vía filtro SVG `#hero-displace` (lo monta HeroDisplaceFilter)
 *    - Parallax de salida al hacer scroll a la primera escena
 *
 *  Respeta `prefers-reduced-motion: reduce`: deja el `<img>` estático.
 */
export function HeroAlive() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!section || !wrap || !img) return;

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
          gsap.set(wrap, { opacity: 1, scale: 1, y: 0, rotate: 0 });
          return;
        }

        // 1 · Entrada
        gsap.fromTo(
          wrap,
          { opacity: 0, scale: 0.88, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );

        // 2 · Bob vertical infinito
        gsap.to(img, {
          y: -14,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // 3 · Tilt desfasado del bob para que parezca planeo
        gsap.to(img, {
          rotate: 2,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.6,
        });

        // 4 · Glow respiratorio (filter compuesto con el displacement)
        const breath = gsap.to(img, {
          "--hero-glow": 18,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // 5 · Wiggle periódico cada 8 s — "el personaje se anima de golpe"
        const wiggleTl = gsap.timeline({ repeat: -1, repeatDelay: 6 });
        wiggleTl
          .to(img, {
            rotate: "+=6",
            scale: 1.04,
            duration: 0.35,
            ease: "back.out(2)",
          })
          .to(img, {
            rotate: "-=10",
            duration: 0.28,
            ease: "sine.inOut",
          })
          .to(img, {
            rotate: "+=4",
            scale: 1,
            duration: 0.45,
            ease: "elastic.out(1, 0.5)",
          });

        // 6 · Parallax de salida — el hero se va con el scroll
        const exitTrigger = ScrollTrigger.create({
          id: "bs-hero-exit",
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          animation: gsap.to(wrap, {
            y: -120,
            opacity: 0,
            scale: 0.94,
            ease: "none",
          }),
        });

        return () => {
          breath.kill();
          wiggleTl.kill();
          exitTrigger.kill();
          gsap.killTweensOf([wrap, img]);
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Bonito Sound — superhéroe"
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      <h1 className="sr-only">
        Bonito Sound — el ecosistema cultural integral del sector musical
      </h1>

      <div
        ref={wrapRef}
        className="relative flex h-[72svh] max-h-[820px] w-full max-w-[92vw] items-center justify-center"
        style={{ willChange: "transform, opacity" }}
      >
        <div
          ref={imgRef}
          className="relative h-full w-auto"
          style={{
            ["--hero-glow" as string]: "10",
            filter:
              "url(#hero-displace) drop-shadow(0 calc(var(--hero-glow) * 1px) calc(var(--hero-glow) * 2px) rgba(22, 182, 212, 0.18))",
            willChange: "transform, filter",
          }}
        >
          <Image
            src="/img/marca/superheroe-home.png"
            alt=""
            width={820}
            height={820}
            priority
            className="h-full w-auto select-none"
            draggable={false}
          />
        </div>
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
