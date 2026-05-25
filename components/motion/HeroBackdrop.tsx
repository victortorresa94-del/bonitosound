"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SuperheroSvg } from "@/components/SuperheroSvg";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => null }
);

type Props = {
  className?: string;
};

export function HeroBackdrop({ className = "" }: Props) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const lowEnd =
      typeof navigator !== "undefined" &&
      (navigator.hardwareConcurrency ?? 8) < 4;
    if (reduced || touch || lowEnd) {
      setShouldRender(false);
      return;
    }
    setShouldRender(true);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {shouldRender ? (
        <HeroCanvas className="absolute inset-0" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <SuperheroSvg state="home" className="w-2/3 max-w-sm" />
        </div>
      )}
    </div>
  );
}
