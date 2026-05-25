"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type StickySceneProps = {
  children: ReactNode | ((progress: number) => ReactNode);
  pinDuration?: string;
  className?: string;
};

export function StickyScene({
  children,
  pinDuration = "+=120%",
  className = "",
}: StickySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        reduced: "(prefers-reduced-motion: reduce), (max-width: 767px)",
      },
      (ctx) => {
        const conditions = ctx.conditions as { normal: boolean; reduced: boolean };
        if (conditions.reduced) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: pinDuration,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => setProgress(self.progress),
        });

        return () => trigger.kill();
      }
    );

    return () => mm.revert();
  }, [pinDuration]);

  return (
    <div ref={ref} className={className}>
      {typeof children === "function" ? children(progress) : children}
    </div>
  );
}
