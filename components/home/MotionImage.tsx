"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type MotionPreset = "kenburns" | "pulse" | "glow" | "parallax";

type MotionImageProps = {
  src: string;
  alt: string;
  preset?: MotionPreset;
  sizes?: string;
  className?: string;
};

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

/** Wrapper sobre `next/image` (o `<video>` si la src termina en .mp4/.webm)
 *  que aplica un preset de movimiento al hacer scroll para que cada escena
 *  tenga su propio carácter visual. Respeta `prefers-reduced-motion: reduce`
 *  mostrando la imagen estática o el vídeo pausado. */
export function MotionImage({
  src,
  alt,
  preset = "kenburns",
  sizes = "(max-width: 768px) 80vw, 40vw",
  className = "",
}: MotionImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const useVideo = isVideo(src);

  // Vídeo: solo reproduce mientras está en viewport, para no quemar batería
  // en móvil ni encolar 8 fetches simultáneos al cargar la home.
  useEffect(() => {
    if (!useVideo) return;
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [useVideo]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

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

        const triggers: ScrollTrigger[] = [];

        if (preset === "kenburns") {
          // Zoom lento + pan vertical mientras la escena está en viewport.
          const tween = gsap.fromTo(
            inner,
            { scale: 1, yPercent: 2 },
            {
              scale: 1.08,
              yPercent: -2,
              ease: "none",
            }
          );
          triggers.push(
            ScrollTrigger.create({
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              animation: tween,
            })
          );
        }

        if (preset === "pulse" || preset === "glow") {
          // Entrada limpia (sin loop perpetuo): el preset es para reveal,
          // no para distraer en bucle. Awwwards minimal = movimiento
          // narrativo, no decorativo.
          gsap.fromTo(
            inner,
            { opacity: 0, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: wrap, start: "top 80%" },
            }
          );

          // Variante kenburns muy sutil mientras está en viewport: zoom
          // lento ligado al scroll. Sin yoyo continuo.
          const kb = gsap.fromTo(
            inner,
            { scale: 1 },
            { scale: 1.04, ease: "none" }
          );
          triggers.push(
            ScrollTrigger.create({
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              animation: kb,
            })
          );
        }

        if (preset === "parallax") {
          const tween = gsap.fromTo(
            inner,
            { yPercent: 12 },
            { yPercent: -12, ease: "none" }
          );
          triggers.push(
            ScrollTrigger.create({
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              animation: tween,
            })
          );
        }

        return () => {
          triggers.forEach((t) => t.kill());
          gsap.killTweensOf(inner);
        };
      }
    );

    return () => mm.revert();
  }, [preset]);

  return (
    <div
      ref={wrapRef}
      className={`relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden ${className}`}
    >
      <div
        ref={innerRef}
        className="absolute inset-0"
        style={{ willChange: "transform, opacity" }}
      >
        {useVideo ? (
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            loading="lazy"
            sizes={sizes}
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}
