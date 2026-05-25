"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCROLL } from "@/lib/motion";

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number;
  axis?: "y" | "x";
  as?: ElementType;
  className?: string;
};

export function ParallaxLayer({
  children,
  speed = 0.25,
  axis = "y",
  as: As = "div",
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
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

        const distance = speed * 100;
        const fromVars = axis === "y" ? { yPercent: distance } : { xPercent: distance };
        const toVars = axis === "y" ? { yPercent: -distance } : { xPercent: -distance };

        gsap.fromTo(el, fromVars, {
          ...toVars,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: SCROLL.parallaxStart,
            end: SCROLL.parallaxEnd,
            scrub: true,
          },
        });
      }
    );

    return () => mm.revert();
  }, [speed, axis]);

  const Tag = As as ElementType;
  return (
    <Tag ref={ref as never} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
