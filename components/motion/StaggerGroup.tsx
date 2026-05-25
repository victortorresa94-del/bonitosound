"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, SCROLL } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  selector?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
  as?: ElementType;
  className?: string;
};

export function StaggerGroup({
  children,
  selector = ":scope > *",
  stagger = 0.08,
  y = 28,
  duration = DURATION.reveal,
  start = SCROLL.defaultStart,
  as: As = "div",
  className = "",
}: StaggerGroupProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const conditions = ctx.conditions as { normal: boolean; reduced: boolean };
        if (conditions.reduced) {
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap.set(items, { opacity: 0, y });
        ScrollTrigger.batch(items, {
          start,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: EASE.outExpo,
              overwrite: true,
            }),
          once: true,
        });
      }
    );

    return () => mm.revert();
  }, [selector, stagger, y, duration, start]);

  const Tag = As as ElementType;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
