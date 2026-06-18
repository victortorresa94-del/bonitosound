import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Registro de plugins en cliente. DrawSVG, MorphSVG y demás vienen
// incluidos gratis con GSAP desde la 3.13 (abril 2025) — no requieren
// licencia de pago.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin);
}

export { gsap, ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin };
