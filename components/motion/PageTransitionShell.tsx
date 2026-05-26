"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useLenis } from "./MotionContext";

type Props = {
  children: React.ReactNode;
};

export function PageTransitionShell({ children }: Props) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const firstRender = useRef(true);

  useEffect(() => {
    const curtain = curtainRef.current;
    const content = contentRef.current;
    if (!curtain || !content) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(curtain, { autoAlpha: 0 });
      gsap.set(content, { autoAlpha: 1 });
      return;
    }

    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(curtain, { autoAlpha: 0 });
      gsap.set(content, { autoAlpha: 1 });
      return;
    }

    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const tl = gsap.timeline();
    tl.set(content, { autoAlpha: 0, y: 24 })
      .set(curtain, { autoAlpha: 1, scaleY: 1, transformOrigin: "top" })
      .to(curtain, {
        scaleY: 0,
        duration: 0.7,
        ease: "expo.inOut",
        transformOrigin: "bottom",
      })
      .to(
        content,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [pathname, lenis]);

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998] bg-[var(--text-primary)]"
        style={{ transform: "scaleY(0)" }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
