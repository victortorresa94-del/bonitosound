import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Registro de plugins en cliente. DrawSVGPlugin viene incluido gratis con
// GSAP desde la 3.13 (abril 2025) — no requiere licencia de pago.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

export { gsap, ScrollTrigger, DrawSVGPlugin };
