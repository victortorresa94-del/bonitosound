---
description: Auditoría multi-agente de TODA la web de Bonito Sound (las 21 páginas) por dimensiones, con informe priorizado.
---

Lanza una auditoría completa del sitio. Esto consume varios agentes — confirma con el usuario antes si no lo ha pedido explícitamente.

Alcance: todas las rutas bajo `app/` (home, eventos + subpáginas, records + subpáginas, lab + subpáginas, artistas, nosotros, contacto, jaleo-sound, agenda, diario, legales).

Orquestación recomendada (patrón pipeline, ver herramienta Workflow):
- **Fase 1 — Inventario:** lista las páginas reales y su contenido (lib/, content/, componentes).
- **Fase 2 — Auditoría por dimensión, una página a la vez en paralelo:** cada página se evalúa contra el núcleo de skills:
  - **Voz** (bonito-voz): frases que chirrían, menciones a dinero.
  - **Copy/estructura** (web-copy, landing-anatomy): orden de bloques, prueba, proceso, CTA.
  - **IA/navegación** (web-ia-menu): coherencia con el menú global.
  - **UI** (web-ui-craft): jerarquía, espaciado, acento, minimalismo.
  - **Motion** (web-motion): animaciones sin trabajo claro.
  - **Assets** (art-brief): imágenes que faltan o no pegan.
- **Fase 3 — Síntesis:** dedup de hallazgos repetidos entre páginas (problemas sistémicos vs. puntuales) y **lista priorizada global** (alto/medio/bajo impacto) con esfuerzo estimado.

Entregable: un informe en `knowledge/audits/audit-<fecha>.md` y un resumen ejecutivo en el chat. No edites código en la auditoría: primero el diagnóstico, luego decidimos qué tocar.
