---
description: Audita una página de Bonito Sound contra el núcleo de skills (voz, copy, IA/menú, UI, motion) y devuelve un informe de decisiones concretas.
---

Audita la página o componente indicado en `$ARGUMENTS` (si no se indica, la home: `app/page.tsx` + `lib/home.ts`).

Carga y aplica el criterio de estas skills del repo (`.claude/skills/`): **bonito-voz**, **web-copy**, **web-ia-menu**, **web-ui-craft**, **web-motion**. Léelas antes de empezar.

Para la página objetivo, produce un informe con esta estructura, siempre con **decisiones concretas, no teoría**:

1. **Voz** — frases que chirrían (cítalas) + reescritura propuesta. Marca cualquier mención a dinero/precio para eliminar.
2. **Copy/estructura** — ¿el orden de bloques convierte? ¿falta prueba, proceso o CTA? Qué mover o añadir.
3. **IA/navegación** — si aplica al menú/footer: agrupación, etiquetas, exceso de opciones.
4. **UI** — jerarquía, espaciado, uso del acento, minimalismo. Qué quitar.
5. **Motion** — animaciones sin trabajo claro o que compiten. Qué simplificar.
6. **Assets** — qué imágenes faltan o no pegan (deriva a la skill art-brief).

Cierra con una **lista priorizada** (alto/medio/bajo impacto) de cambios accionables. No edites nada salvo que se te pida explícitamente — primero el informe.
