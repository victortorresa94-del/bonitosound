# Núcleo de skills de Bonito Sound

Criterio reutilizable para hacer (esta y cualquier) web bien, sin que haya que explicarlo cada vez. Destilado de frameworks consagrados (Refactoring UI, StoryBrand, heurísticas de Nielsen) y aterrizado en el repo real: tokens de `app/globals.css`, copy de `lib/home.ts`, voz de `CONTEXT.md`.

## Las skills
| Skill | Para qué | Cuándo se invoca |
|---|---|---|
| **bonito-team** | Panel de 10 diseñadores top para elevar una página a nivel máximo | Antes de rediseñar una página importante |
| **bonito-voz** | Voz de marca calibrada ("pro pero cercano", sin pasta): qué frases valen y cuáles chirrían | Antes de escribir/revisar CUALQUIER copy |
| **web-copy** | Estructura de página y fórmulas de copy que convierten | Al diseñar/escribir páginas |
| **web-ia-menu** | Arquitectura de info y diseño de menú/footer | Al ordenar navegación |
| **web-ui-craft** | Diseño visual con criterio sobre los tokens reales | Al maquetar/revisar UI |
| **web-motion** | Animación con criterio (anti sobre-animación) | Al añadir/revisar movimiento |
| **art-brief** | De "falta foto" a asset listo (specs + prompt) | Cuando falten imágenes |

> **¿Qué es `bonito-voz`?** Es la "biblia" del tono de la web: define cómo habla
> Bonito (directo, cercano, sin postureo ni hablar de dinero) y trae ejemplos
> reales de frases que funcionan vs. frases que chirrían. Sirve para que
> cualquier copy nuevo suene a Bonito sin tener que explicarlo cada vez.

## Comando
- `/audit-bonito [página]` — audita una página contra todas las skills y devuelve decisiones concretas.

## Calibración actual de la voz
**"Pro pero cercano"**: directo y honesto, descaro bajado un punto, **cero cifras de dinero en el copy público**. Se recalibra editando `bonito-voz/SKILL.md` si el negocio quiere más premium o más filo.

## Origen
Plan A del documento de planificación. Plan B (corpus externo en `knowledge/` + motor de investigación + auditoría multi-agente de las 21 páginas) se monta encima sin rehacer esto.
