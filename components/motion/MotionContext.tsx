"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export type CursorState = "default" | "text" | "link" | "cta" | "drag" | "hidden";

export type MotionContextValue = {
  lenis: Lenis | null;
  prefersReducedMotion: boolean;
  setCursor: (state: CursorState) => void;
};

export const MotionContext = createContext<MotionContextValue>({
  lenis: null,
  prefersReducedMotion: false,
  setCursor: () => {},
});

export function useMotion() {
  return useContext(MotionContext);
}

export function useLenis() {
  return useContext(MotionContext).lenis;
}
