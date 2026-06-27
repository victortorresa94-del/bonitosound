# Núcleo de skills de Bonito Sound

Criterio reutilizable para hacer (esta y cualquier) web bien, sin que haya que explicarlo cada vez. Destilado de frameworks consagrados (Refactoring UI, StoryBrand, heurísticas de Nielsen) y aterrizado en el repo real: tokens de `app/globals.css`, copy de `lib/home.ts`, voz de `CONTEXT.md`.

## Las skills
| Skill | Para qué | Cuándo se invoca |
|---|---|---|
| **bonito-voz** | Voz de marca calibrada ("pro pero cercano", sin pasta) | Antes de escribir/revisar CUALQUIER copy |
| **web-copy** | Estructura de página y fórmulas de copy que convierten | Al diseñar/escribir páginas |
| **web-ia-menu** | Arquitectura de info y diseño de menú/footer | Al ordenar navegación |
| **web-ui-craft** | Diseño visual con criterio sobre los tokens reales | Al maquetar/revisar UI |
| **web-motion** | Animación con criterio (anti sobre-animación) | Al añadir/revisar movimiento |
| **art-brief** | De "falta foto" a asset listo (specs + prompt) | Cuando falten imágenes |

## Comando
- `/audit-bonito [página]` — audita una página contra todas las skills y devuelve decisiones concretas.

## Calibración actual de la voz
**"Pro pero cercano"**: directo y honesto, descaro bajado un punto, **cero cifras de dinero en el copy público**. Se recalibra editando `bonito-voz/SKILL.md` si el negocio quiere más premium o más filo.

## Origen
Plan A del documento de planificación. Plan B (corpus externo en `knowledge/` + motor de investigación + auditoría multi-agente de las 21 páginas) se monta encima sin rehacer esto.
