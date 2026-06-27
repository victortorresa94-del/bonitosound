# knowledge/ — Biblioteca de conocimiento (Plan B)

Corpus de referencia destilado que **respalda** el núcleo de skills (`.claude/skills/`). Las skills dan el criterio operativo corto; estos documentos dan la profundidad y la fuente.

> Nota de entorno: el sandbox **bloquea `git clone` de repos externos** (el proxy solo permite el repo del proyecto), pero **sí permite fetch HTTPS de archivos sueltos** y WebSearch/WebFetch en vivo. Por eso el corpus se construye con (a) documentos densos destilados de los frameworks canónicos y (b) fetch puntual de índices útiles en `_sources/`. La parte "viva" la dan los comandos `/research-web` y `/audit-web`.

## Contenido
| Documento | Qué cubre | Respalda |
|---|---|---|
| `conversion-psychology.md` | Cialdini, señales de confianza, carga cognitiva | web-copy, bonito-voz |
| `ux-heuristics.md` | Las 10 heurísticas de Nielsen + checklist | web-ia-menu, web-ui-craft |
| `landing-anatomy.md` | StoryBrand + estructura de página que convierte | web-copy |
| `_sources/` | Índices externos traídos por fetch (awesome-lists, etc.) | inspiración/herramientas |

## Motores en vivo (Plan B)
- `/research-web <tema>` — investigación multi-fuente con verificación (skill deep-research). Trae inspiración y referencias frescas cuando se pidan.
- `/audit-web` — auditoría multi-agente de las 21 páginas por dimensiones (copy, IA, UX, visual, motion, conversión).

## Cómo crece
Cuando una decisión recurrente necesite respaldo, se añade un documento aquí y la skill correspondiente lo cita. El corpus es vivo: `/research-web` puede dejar su síntesis aquí.
