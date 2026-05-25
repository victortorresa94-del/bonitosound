export const EASE = {
  outExpo: "expo.out",
  inOutExpo: "expo.inOut",
  outQuart: "power4.out",
  outBack: "back.out(1.2)",
  outElastic: "elastic.out(1, 0.4)",
  linear: "none",
  cssOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const DURATION = {
  reveal: 0.8,
  fastReveal: 0.5,
  splitChar: 0.7,
  splitLine: 1.0,
  pageTransition: 0.7,
  cursorFollow: 0.25,
  magnetic: 0.6,
} as const;

export const SCROLL = {
  defaultStart: "top 85%",
  splitStart: "top 80%",
  parallaxStart: "top bottom",
  parallaxEnd: "bottom top",
} as const;

export const LENIS_OPTS = {
  duration: 1.1,
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
} as const;
