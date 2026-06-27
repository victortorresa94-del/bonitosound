---
name: art-brief
description: Convierte una necesidad visual ("falta una foto de X", "no hay hero para nosotros") en un brief accionable — specs técnicas + dirección de arte + prompt de generación. Úsala cuando falten imágenes o haya que pedir/generar assets. Conoce la estética de Bonito y las rutas de public/img.
---

# Art brief — de "falta foto" a asset listo

## La estética de Bonito (constante en todos los assets)
- Paleta coherente con la web: crema cálido de fondo, acento cyan `#16b6d4`, warm `#ff5a1f` solo para Jaleo. Negro cálido, no negro puro.
- Tono: real, de sector, sin stock genérico. Mejor foto auténtica de un bolo/estudio/equipo que render impecable sin alma.
- Personas reales del roster/equipo cuando se pueda. Las ilustraciones (mascota superhéroe) son el recurso de marca, no fotos de banco.

## Qué incluye un brief (rellena los 5)
1. **Dónde va** (página + sección + componente). Ej: hero de `/nosotros`.
2. **Función** (¿qué tiene que comunicar o sentir el visitante?).
3. **Specs técnicas:**
   - Ratio y orientación (hero horizontal 16:9 o 21:9; card 4:3; retrato 3:4).
   - Resolución (hero ≥1600px ancho; thumbnails ≤800px).
   - Formato: AVIF/WebP (la web ya usa `next/image` con AVIF). Peso objetivo < 200KB tras optimizar con Sharp.
   - Ruta destino en `public/img/<categoría>/`.
4. **Dirección de arte:** luz, encuadre, color dominante, mood, qué SÍ y qué NO.
5. **Fuente:** foto real existente / shooting / generación IA (scripts en `scripts/generate-images.mjs` con gpt-image-1).

## Plantilla de prompt de generación (si es IA)
> [Sujeto concreto] en [contexto real del sector musical], [encuadre], [luz], paleta cálida crema con acento cyan sutil, estética editorial auténtica no-stock, [orientación y ratio]. Sin texto superpuesto, sin marcas de agua.

Ajusta siempre: coherencia con las fotos reales vecinas > impacto aislado.

## Huecos conocidos de Bonito (de CONTEXT.md, a fecha del brief)
- Heros pendientes: `/nosotros`, `/lab`, `/records`.
- Casos sin imagen: 3.
- Banco visual: ~28 imágenes pendientes.
Prioriza por impacto: primero lo que ve más gente (heros de páginas principales), luego detalle.

## Flujo recomendado
1. ¿Existe ya una foto real reutilizable en `public/img/`? Úsala antes de generar.
2. Si no, ¿se puede conseguir una real (equipo, bolo, estudio)? Mejor que IA.
3. Si toca generar: escribe el brief completo + prompt, genera con el script, optimiza con Sharp, coloca en la ruta y verifica que pega con las vecinas.
