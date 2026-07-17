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
  /** "cover" (llena el cuadro, recorta bordes) o "contain" (se ve entero, con
   *  aire alrededor). Usa "contain" para logos/wordmarks anchos que no deben
   *  recortarse. Por defecto "cover" (encaja con las figuras del hero). */
  fit?: "cover" | "contain";
  /** Tamaño de la caja. "lg"/"xl" para escenas donde el media debe pesar más. */
  size?: "md" | "lg" | "xl";
  /** Segundo en el que ARRANCA el loop (para saltarse una intro). En segundos. */
  loopStart?: number;
  /** Segundo en el que TERMINA el loop y vuelve a `loopStart`. En segundos.
   *  Junto con `loopStart` define la ventana que se reproduce en bucle (p.ej.
   *  el tramo del tocadiscos, sin el resto del morph). */
  loopEnd?: number;
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
  fit = "cover",
  size = "md",
  loopStart,
  loopEnd,
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

  // Loop de ventana: reproduce solo el tramo [loopStart, loopEnd] en bucle
  // (p.ej. el tocadiscos ya formado, sin el resto del morph). Al llegar a
  // loopEnd —o al acabar el vídeo— vuelve a loopStart, nunca al 0.
  useEffect(() => {
    if (!useVideo || (loopStart == null && loopEnd == null)) return;
    const video = videoRef.current;
    if (!video) return;
    const from = loopStart ?? 0;
    const seekToStart = () => {
      video.currentTime = from;
      video.play().catch(() => {});
    };
    // Colocar el fotograma inicial en cuanto haya metadatos.
    const onMeta = () => {
      if (video.currentTime < from) video.currentTime = from;
    };
    if (video.readyState >= 1) onMeta();
    const onTime = () => {
      if (loopEnd != null && video.currentTime >= loopEnd) seekToStart();
      else if (video.currentTime < from - 0.05) video.currentTime = from;
    };
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", seekToStart);
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", seekToStart);
    };
  }, [useVideo, loopStart, loopEnd]);

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
      className={`relative mx-auto aspect-square w-full ${
        size === "xl"
          ? "max-w-[24rem] sm:max-w-lg md:max-w-2xl"
          : size === "lg"
            ? "max-w-[22rem] sm:max-w-md md:max-w-xl"
            : "max-w-[17rem] sm:max-w-sm md:max-w-md"
      } ${className}`}
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
            loop={loopStart == null && loopEnd == null}
            playsInline
            autoPlay
            preload="auto"
            aria-label={alt}
            className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            loading="eager"
            sizes={sizes}
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        )}
      </div>
    </div>
  );
}
