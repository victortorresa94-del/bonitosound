"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { CursorState } from "./MotionContext";

type Props = {
  stateRef: React.MutableRefObject<CursorState>;
};

export function MagneticCursor({ stateRef }: Props) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("bs-cursor-active");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const applyState = (state: CursorState) => {
      const r = ring;
      if (!r) return;
      switch (state) {
        case "link":
        case "cta":
          gsap.to(r, { scale: 1.8, borderColor: "var(--accent-blue)", duration: 0.3 });
          break;
        case "text":
          gsap.to(r, { scale: 0.6, borderColor: "var(--text-primary)", duration: 0.3 });
          break;
        case "hidden":
          gsap.to(r, { opacity: 0, duration: 0.2 });
          gsap.to(dot, { opacity: 0, duration: 0.2 });
          break;
        default:
          gsap.to(r, { scale: 1, opacity: 1, borderColor: "var(--text-primary)", duration: 0.3 });
          gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    let lastState: CursorState = "default";
    const tick = () => {
      if (stateRef.current !== lastState) {
        lastState = stateRef.current;
        applyState(lastState);
      }
    };
    gsap.ticker.add(tick);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (!target) {
        stateRef.current = "default";
        return;
      }
      const explicit = target.getAttribute("data-cursor") as CursorState | null;
      if (explicit) {
        stateRef.current = explicit;
      } else {
        stateRef.current = "link";
      }
    };
    const onOut = () => {
      stateRef.current = "default";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onOut);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onOut);
      document.documentElement.classList.remove("bs-cursor-active");
    };
  }, [stateRef]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="bs-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border md:block"
        style={{ borderColor: "var(--text-primary)", mixBlendMode: "difference" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="bs-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white md:block"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
