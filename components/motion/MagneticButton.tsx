"use client";

import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";
import { gsap } from "gsap";
import { DURATION, EASE } from "@/lib/motion";

type MagneticButtonProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: ElementType;
};

export function MagneticButton({
  children,
  strength = 0.4,
  className = "",
  as: As = "span",
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const xTo = gsap.quickTo(inner, "x", { duration: DURATION.magnetic, ease: EASE.outElastic });
    const yTo = gsap.quickTo(inner, "y", { duration: DURATION.magnetic, ease: EASE.outElastic });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      xTo((e.clientX - cx) * strength);
      yTo((e.clientY - cy) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const Tag = As as ElementType;
  return (
    <Tag ref={wrapRef as never} className={`inline-block ${className}`}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </Tag>
  );
}
