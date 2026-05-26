"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";
import { gsap } from "@/lib/gsap";
import { DURATION, EASE, SCROLL } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  as?: ElementType;
  className?: string;
};

export function RevealOnScroll({
  children,
  y = 28,
  opacity = 0,
  duration = DURATION.reveal,
  delay = 0,
  start = SCROLL.defaultStart,
  once = true,
  as: As = "div",
  className = "",
}: RevealProps) {
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
        if (conditions.reduced) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { opacity, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: EASE.outExpo,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: once ? "play none none none" : "play none none reverse",
            },
          }
        );
      }
    );

    return () => mm.revert();
  }, [y, opacity, duration, delay, start, once]);

  const Tag = As as ElementType;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
