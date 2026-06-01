"use client";

import { useLayoutEffect, useRef } from "react";
import type { ElementType } from "react";
import { gsap } from "@/lib/gsap";
import SplitType from "split-type";
import { DURATION, EASE, SCROLL } from "@/lib/motion";

type SplitMode = "chars" | "words" | "lines";

type SplitTextRevealProps = {
  children: string;
  as?: ElementType;
  split?: SplitMode;
  stagger?: number;
  duration?: number;
  start?: string;
  y?: number;
  className?: string;
  delay?: number;
};

export function SplitTextReveal({
  children,
  as: As = "h1",
  split = "lines",
  stagger = 0.04,
  duration = DURATION.splitLine,
  start = SCROLL.splitStart,
  y = 100,
  className = "",
  delay = 0,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const conditions = ctx.conditions as { normal: boolean; reduced: boolean };
        if (conditions.reduced) return;

        const typesMap: Record<SplitMode, "chars" | "words" | "lines"> = {
          chars: "chars",
          words: "words",
          lines: "lines",
        };
        const types = typesMap[split];

        const splitInstance = new SplitType(el as HTMLElement, {
          types,
          lineClass: "bs-split-line",
          wordClass: "bs-split-word",
          charClass: "bs-split-char",
        });

        const targets = (splitInstance[types] ?? []) as HTMLElement[];
        if (targets.length === 0) return;

        if (split === "lines") {
          targets.forEach((line) => {
            line.style.overflow = "hidden";
            line.style.display = "block";
          });
        }

        gsap.set(targets, { yPercent: split === "lines" ? 100 : 0, y: split === "lines" ? 0 : y, opacity: 0 });
        gsap.to(targets, {
          yPercent: 0,
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: EASE.outExpo,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });

        // Failsafe: si por lo que sea el ScrollTrigger no dispara (Lenis no
        // sincronizado, fuentes tardías, refresh fallido…), forzamos el texto
        // a visible para que NUNCA quede un titular invisible.
        const failsafe = window.setTimeout(() => {
          gsap.set(targets, { opacity: 1, y: 0, yPercent: 0, clearProps: "transform" });
        }, 1600);

        return () => {
          window.clearTimeout(failsafe);
          splitInstance.revert();
        };
      }
    );

    return () => mm.revert();
  }, [children, split, stagger, duration, start, y, delay]);

  const Tag = As as ElementType;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
