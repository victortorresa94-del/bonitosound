"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HorizontalScrollerProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
};

export function HorizontalScroller({
  children,
  className = "",
  trackClassName = "",
}: HorizontalScrollerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px), (prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const conditions = ctx.conditions as { desktop: boolean; mobile: boolean };
        if (conditions.mobile) {
          track.style.overflowX = "auto";
          track.style.transform = "";
          return;
        }
        track.style.overflowX = "visible";

        const getDistance = () => track.scrollWidth - window.innerWidth + 80;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`relative ${className}`}>
      <div
        ref={trackRef}
        className={`flex gap-5 will-change-transform ${trackClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
