"use client";

import { useEffect, useRef, Children, cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";
import { gsap } from "@/lib/gsap";

type MarqueeRowProps = {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
};

export function MarqueeRow({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gap = "3rem",
}: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const firstHalf = track.firstElementChild as HTMLElement | null;
    if (!firstHalf) return;
    const halfWidth = firstHalf.scrollWidth;
    if (halfWidth === 0) return;

    const duration = halfWidth / speed;
    const dir = direction === "left" ? -1 : 1;

    gsap.set(track, { xPercent: 0 });
    tweenRef.current = gsap.to(track, {
      xPercent: dir * -50,
      duration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed, direction]);

  const onEnter = () => {
    if (pauseOnHover) tweenRef.current?.pause();
  };
  const onLeave = () => {
    if (pauseOnHover) tweenRef.current?.resume();
  };

  const items = Children.toArray(children);
  const half = (
    <div className="flex shrink-0 items-center" style={{ gap }}>
      {items.map((child, i) =>
        isValidElement(child) ? cloneElement(child, { key: `m-${i}` }) : child
      )}
    </div>
  );
  const halfClone = (
    <div className="flex shrink-0 items-center" aria-hidden="true" style={{ gap }}>
      {items.map((child, i) =>
        isValidElement(child) ? cloneElement(child, { key: `c-${i}` }) : child
      )}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div ref={trackRef} className="flex w-max items-center" style={{ gap }}>
        {half}
        {halfClone}
      </div>
    </div>
  );
}
