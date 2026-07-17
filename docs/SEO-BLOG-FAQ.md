# Estrategia SEO — Blog (/diario) + FAQs

> Doc vivo. Creado en la sesión del 16-jul-2026 junto al formulario de
> contratación y la página de roster completo. Voz: `.claude/skills/bonito-voz`
> (enrollado y alegre, frases cortas, cero cifras de dinero, nada inventado,
> género neutro). No reescribir copy que lleva otra sesión: aquí solo **se
> añade** (artículos nuevos y preguntas nuevas).

---

## 1. Cómo está montado (infra)

- **Blog**: `content/diario/*.md` (frontmatter + markdown ligero). Lo leen
  `lib/blog.ts` (`getPosts`/`getPost`), el listado `app/diario/page.tsx` y la
  ficha `app/diario/[slug]/page.tsx`. Render del cuerpo: `components/blog/PostBody.tsx`
  (soporta `##`, `###`, listas `-`, citas `>`, **negrita**).
- **Indexación**: `/diario` se auto-indexa cuando hay ≥1 artículo; los posts
  entran solos al `app/sitemap.ts`. Enlace interno desde el footer.
- **Schema por artículo**: `Article` + `BreadcrumbList` + `FAQPage` (si el post
  trae `faq:` en el frontmatter). Interlinking al pillar vía `pillarHref`.
- **FAQs de servicio**: `lib/services.ts` → `ServicePage.tsx` ya mapea cada
  `faq` a `FAQPage`. **Añadir una pregunta = aparece en web y en schema**, sin
  tocar nada más.

### Plantilla de artículo (`content/diario/<slug>.md`)
```yaml
---
title: "Titular con la keyword principal, en voz bonito"
description: "Meta description / entradilla (≤160 car.)."
date: "2026-06-18"          # ISO, ordena el listado
author: "Bonito Sound"
cluster: "Eventos para marcas"   # pillar SEO interno
pillarHref: "/eventos/marcas"    # a dónde enlaza el CTA
tags: ["Eventos de marca", "Booking"]
faq:                              # opcional → FAQPage + AIO
  - q: "Pregunta long-tail"
    a: "Respuesta autocontenida, 2-4 frases, sin marketing."
---
Cuerpo en markdown ligero. `## Encabezados` para estructura semántica.
```

---

## 2. Clusters de contenido (pillar → artículos)

| Cluster | Pillar | Keywords de cabecera |
|---|---|---|
| Eventos para marcas | `/eventos/marcas` | contratar artista para evento, activación musical de marca, música en directo para eventos |
| Booking & management | `/records/booking`, `/records/management` | agencia de booking España, qué hace un manager musical |
| Sello & distribución & editorial | `/records/sello`, `/records/distribucion`, `/records/editorial` | sello discográfico independiente, distribución digital de música, gestión editorial derechos |
| Jaleo Sound (satélite) | `/jaleo-sound` | festival música española Amsterdam |
| Lab (autoridad) | `/lab/artiverse` | software gestión de giras, Artiverse |

---

## 3. Artículos publicados (este sprint)

1. **Cómo contratar un artista para el evento de tu marca** → `/eventos/marcas`
2. **Qué hace un sello discográfico independiente (y qué no)** → `/records/sello`
3. **Distribución digital: cómo llega tu canción a Spotify** → `/records/distribucion`
4. **Booking musical: cómo se cierra una fecha de verdad** → `/records/booking`

Todos con FAQ (FAQPage) y CTA al pillar + `/contacto`.

## 4. Calendario propuesto (siguientes)

Ideas evergreen, sin inventar datos de Bonito (cuando toque un caso real, se
apoya en material que dé el cliente):

- **Qué hace un manager musical y cuándo lo necesitas** → `/records/management`
- **Editorial musical: qué es y por qué tu música no rinde lo que debería** → `/records/editorial`
- **Cómo se monta una activación de marca con música (paso a paso)** → `/eventos/marcas`
- **Gira de artista: qué es el tour/road/stage management** → `/eventos/giras`
- **Cómo promocionar el lanzamiento de un single sin tirar el dinero** → `/records/marketing`
- **Llevar música española fuera: el caso Jaleo Sound** → `/jaleo-sound`

Cadencia realista: 1-2 al mes. Mejor pocos y buenos que rellenar (regla de la
casa). Cada artículo enlaza a su pillar y, cuando encaje, a otro artículo.

---

## 5. FAQs — qué se ha ampliado

Se han **añadido** (sin tocar las existentes) preguntas long-tail a los 7
servicios en `lib/services.ts`:

- **Booking** +3 · **Management** +2 · **Sello** +2 · **Editorial** +2 ·
  **Distribución** +3 · **Marketing** +2 · **Producciones** +3.

Criterio de las nuevas: definicionales ("¿qué es…?", "¿qué hace…?") para AIO y
búsquedas informativas, y de decisión ("¿cuándo necesito…?", "¿cuánto tarda…?").
Respuestas autocontenidas, sin cifras de dinero, sin inventar servicios.

### Pendiente / recomendado (no hecho para no pisar a la otra sesión)
- Añadir 2-3 FAQ a `/eventos/marcas` (es la landing B2B prioritaria) y a
  `/eventos/giras`. Están inline en el `page.tsx` (copy de otra sesión) →
  coordinar antes de tocar.
- Cuando `/agenda` tenga contenido, mismos pasos que `/diario`.

---

## 6. Pendiente de assets — ilustración del formulario

La página `/contratar` usa `components/artistas/BookingScene.tsx`:
hoy pinta un SVG de marca (teléfono + notas). Es **plug-and-play**: en cuanto
exista `public/img/marca/contratar-scene.(png|webp|svg)`, se usa esa y el SVG
desaparece solo.

Para generar la ilustración con OpenAI (gpt-image-1) **en local** — el entorno
de Claude Code on the web bloquea `api.openai.com` por política de egress:

```bash
# La key va SOLO en .env.local (gitignored). Nunca en el repo.
node --env-file=.env.local scripts/generate-contratar-scene.mjs
git add public/img/marca/contratar-scene.png
git commit -m "Ilustración del formulario de contratación"
```

⚠️ La key que se compartió por chat hay que considerarla comprometida: **rótala**
en el panel de OpenAI y guarda la nueva solo en `.env.local`.
