---
name: web-ui-craft
description: Criterio de diseño visual (estilo Refactoring UI) aplicado a los design tokens reales de Bonito Sound. Úsala al maquetar o revisar UI: jerarquía, espaciado, tipografía, color, contraste, minimalismo. Referencia los tokens de app/globals.css y tailwind.config.ts.
---

# UI craft — diseño visual con criterio

## Los tokens reales (no inventar otros)
Definidos en `app/globals.css` (:root) y `tailwind.config.ts`. Úsalos, no metas colores/tamaños sueltos.

- **Fondos:** `--bg-primary #fbfaf6` (crema), `--bg-secondary #f4f1e9`, `--bg-tertiary #ece7d8`.
- **Acentos:** `--accent-cyan #16b6d4` (mascota), `--accent-warm #ff5a1f` (Jaleo), `--jaleo-red #e8351f`.
- **Texto:** `--text-primary #14110b`, `--text-secondary #57544c`, `--text-muted #8d897e`.
- **Tipo:** `--font-display` Zilla Slab (titulares), `--font-body` Geist (cuerpo).
- **Ancho:** `.wrap` max 1240px. **Borde:** `--border-subtle`.

## Principios (Refactoring UI destilado)
### Jerarquía
- La jerarquía no es solo tamaño de fuente. Usa **peso, color y espaciado** antes de agrandar.
- Texto secundario: baja el contraste (`--text-secondary`/`--text-muted`), no reduzcas tanto el tamaño.
- En una pantalla, **una sola cosa manda**. Si todo grita, nada se oye.

### Espaciado
- Empieza con MÁS espacio del que crees. El aire es lo que hace que algo parezca caro.
- Espaciado consistente (escala de Tailwind: 4px base). No mezcles 13px aquí y 17px allá.
- Agrupa por proximidad: lo relacionado, junto; lo distinto, separado. El espacio comunica relación.

### Tipografía
- Zilla Slab para titulares (display), Geist para cuerpo. No metas una tercera familia.
- Line-height generoso en cuerpo (1.5-1.7), ajustado en titulares grandes (0.95-1.1).
- Ancho de línea de lectura: 60-75 caracteres. Más ancho cansa.

### Color
- Fondo crema cálido, no blanco puro: ya da calidez. Respétalo.
- El acento (cyan/warm) es **acento**: úsalo con cuentagotas (un CTA, un dato, un detalle). Si lo pones en todo, deja de destacar.
- Contraste suficiente para accesibilidad (texto principal sobre fondo: AA mínimo).

### Minimalismo (el dolor del usuario)
- Quitar antes que añadir. Cada elemento debe justificar su existencia.
- Bordes y sombras: sutiles (`--border-subtle`). Nada de cajas con borde grueso por todas partes.
- Si dudas entre dos versiones, casi siempre gana la más simple.

## Checklist de revisión de una pantalla
- [ ] Una sola jerarquía clara: se ve qué es lo importante
- [ ] Espaciado consistente y generoso (nada apretado)
- [ ] Máximo 2 familias tipográficas (Zilla Slab + Geist)
- [ ] El acento se usa con moderación, no en todo
- [ ] Texto secundario diferenciado por color, no solo por tamaño
- [ ] Ancho de línea cómodo de leer
- [ ] Contraste accesible
- [ ] Nada decorativo que no aporte
