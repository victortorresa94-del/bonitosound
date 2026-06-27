---
name: web-motion
description: Animación web con criterio (antídoto a la sobre-animación). Úsala al añadir o revisar movimiento: scroll, hero, transiciones, hover. Da reglas de contención, propósito, rendimiento y accesibilidad. El stack es GSAP + Framer Motion + Lenis (ver lib/gsap.ts, lib/motion.ts).
---

# Web motion — movimiento con criterio

## La regla madre: el movimiento tiene que tener un trabajo
Cada animación responde a una de estas razones, o se quita:
1. **Guiar la atención** (reveal al hacer scroll: aparece lo que toca leer ahora).
2. **Dar feedback** (hover, click, estado de carga: el sistema responde).
3. **Dar continuidad** (transición entre páginas/estados: el usuario no se pierde).
4. **Dar carácter** (un detalle de marca, UNO, no diez).

Si una animación no hace ninguna de las cuatro → fuera. **El hero sobre-animado (capa + pelo + puño + levitación + tilt + saludo) falla aquí: cinco movimientos compitiendo, ninguno con trabajo claro.** Mejor uno bueno que cinco a la vez.

## Reglas de contención
- **Una pantalla, un protagonista de movimiento.** No animes cinco cosas simultáneas pidiendo atención.
- **Sutil gana.** Desplazamientos cortos (10-24px), escalas pequeñas (1.0-1.05), opacidades. Lo exagerado cansa a la segunda visita.
- **Rápido en interacción, calmado en ambiente.** Hover/click: 150-250ms. Reveal/ambiente: 0.5-0.9s.
- **Easing con intención:** entradas con `outExpo`/`outQuart` (ya en `lib/motion.ts`). Nada de lineal salvo loops continuos.
- **Para los loops infinitos:** que sean lentos y casi imperceptibles, o no los pongas. Un loop rápido y obvio es lo que hace que una web canse.

## Rendimiento
- Anima solo `transform` y `opacity` (compositor, no layout). Evita animar `width`, `top`, `left`, `box-shadow`.
- Respeta el presupuesto de 60fps. En móvil, menos es más: desactiva efectos pesados (displacement, canvas 3D) bajo `(max-width: 640px)` si bajan de 30fps.
- `will-change` con moderación, solo en lo que de verdad se mueve.

## Accesibilidad (obligatorio)
- `prefers-reduced-motion: reduce` → todo el movimiento ambiental se detiene; el contenido se ve estático y nítido. Ya hay hook `usePrefersReducedMotion` y media query en `globals.css`: úsalos.
- El contenido nunca depende del movimiento para entenderse. Si se quita la animación, la web sigue funcionando.

## Checklist antes de hacer commit de una animación
- [ ] Tiene un trabajo claro (guiar / feedback / continuidad / carácter)
- [ ] No compite con otras 3 animaciones en la misma pantalla
- [ ] Es sutil (desplazamiento/escala pequeños)
- [ ] Solo anima transform/opacity
- [ ] Funciona a 60fps, también en móvil
- [ ] Respeta prefers-reduced-motion
- [ ] No cansa a la segunda vez que la ves
