"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionContext, type CursorState } from "./MotionContext";
import { MagneticCursor } from "./MagneticCursor";
import { LENIS_OPTS } from "@/lib/motion";

export function MotionProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cursorStateRef = useRef<CursorState>("default");

  const setCursor = useCallback((state: CursorState) => {
    cursorStateRef.current = state;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduced = () => setPrefersReducedMotion(mq.matches);
    updateReduced();
    mq.addEventListener("change", updateReduced);

    let lenisInstance: Lenis | null = null;
    let rafId = 0;
    let onScroll: (() => void) | null = null;

    if (!mq.matches) {
      lenisInstance = new Lenis(LENIS_OPTS);
      onScroll = () => ScrollTrigger.update();
      lenisInstance.on("scroll", onScroll);

      gsap.ticker.add((time) => {
        lenisInstance?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      setLenis(lenisInstance);
    }

    return () => {
      mq.removeEventListener("change", updateReduced);
      if (lenisInstance) {
        if (onScroll) lenisInstance.off("scroll", onScroll);
        lenisInstance.destroy();
      }
      if (rafId) cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <MotionContext.Provider value={{ lenis, prefersReducedMotion, setCursor }}>
      {!prefersReducedMotion && <MagneticCursor stateRef={cursorStateRef} />}
      {children}
    </MotionContext.Provider>
  );
}
