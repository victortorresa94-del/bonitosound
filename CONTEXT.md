# CONTEXT — Bonito Sound Web (handoff exhaustivo entre sesiones de Claude Code)

> Documento de transferencia de contexto entre sesiones. Si vas a continuar el proyecto, **léelo entero** antes de tocar nada. Fecha de actualización: 24 may 2026.

---

## ÍNDICE

```
PARTE I    — RESUMEN
   1. TL;DR
   2. URLs y accesos
   3. Stack en una mirada

PARTE II   — ARQUITECTURA
   4. Estructura completa del repo
   5. Sistema de diseño
   6. Sitemap detallado por página
   7. Componentes (API de cada uno)

PARTE III  — DATA Y CONTENIDO
   8. lib/site.ts — fuente de verdad de datos
   9. Markdown CMS (artistas, casos, agenda)
  10. Mapping de slugs a carpetas /public/img/

PARTE IV   — SISTEMA DE ASSETS
  11. lib/assets.ts (plug-and-play)
  12. Imágenes generadas con gpt-image-1
  13. Imágenes reales scrapeadas
  14. Optimización con sharp
  15. Mockups de referencia
  16. Logo y personaje del héroe

PARTE V    — BRIEF MAESTRO INTERNALIZADO
  17. Posicionamiento y big idea
  18. Tres enemigos declarados (insight)
  19. Diagnóstico 3R de Risto
  20. Audiencias jerarquizadas
  21. Cinco verticales con detalle
  22. Reconocimientos institucionales
  23. Tono de voz: SÍ, NO, tests
  24. Lead magnets detallados

PARTE VI   — SEO Y AIO
  25. Clusters de contenido
  26. Schema.org por página
  27. Sitemap.xml
  28. Redirects 301
  29. OG image y favicon
  30. FAQ AIO patrón

PARTE VII  — OPERACIÓN
  31. Comandos npm
  32. Generación de imágenes paso a paso
  33. Descarga de assets reales
  34. Variables de entorno (seguridad)
  35. MCPs disponibles
  36. Smoke testing (puppeteer)
  37. Cómo desplegar a producción

PARTE VIII — HISTORIA Y DECISIONES
  38. Cronología de commits importantes
  39. Decisiones de diseño tomadas (con porqué)
  40. Cosas que probamos y descartamos
  41. Pivots de dirección
  42. Lecciones aprendidas

PARTE IX   — ROADMAP
  43. Sprint A: Cerrar imágenes
  44. Sprint B: Contenido humano
  45. Sprint C: Pulido v1.1
  46. Sprint D: Migración real
  47. Roadmap §15 del brief original (Fases 0-7)

PARTE X    — REFERENCIAS
  48. Glosario
  49. Cómo retomar paso a paso
  50. Troubleshooting común
  51. Cosas que NUNCA hacer
  52. Recetas: cómo añadir un artista, un caso, una página
  53. Contactos
```

---

# PARTE I — RESUMEN

## 1. TL;DR

**Qué**: rediseño completo de bonitosound.com en Next.js 14 + TypeScript + Tailwind. 17 rutas únicas + 6 fichas dinámicas de artista. **En producción**.

**Producto**: Bonito Sound, agencia musical en Sabadell (Barcelona). Cinco verticales en un ecosistema: Records (sello/booking/management/distribución), Eventos (activaciones de marca + giras), Jaleo Sound (festival propio en Amsterdam), Lab (Artiverse + Giraverse), Producciones.

**Cliente final**: Dani Boada (fundador, 30 años en la industria musical española).
**Interlocutor operativo**: Víctor Torres (Head of Marketing en Artiverse, socio operativo del proyecto).

**Estado a 24 may 2026**:
- ✅ Web completa construida y desplegada (sitemap §8 del brief al 100%).
- ✅ Sistema de diseño minimalista blanco aplicado.
- ✅ Logo oficial cableado en nav (AVIF).
- ✅ 38 fotos/logos reales descargados desde bonitosound.com (artistas, equipo, marcas, instituciones).
- ✅ 11 ilustraciones generadas con `gpt-image-1` (3 superhéroes, 4 secciones, 1 hero, 1 OG).
- ✅ 2 lead magnets interactivos funcionando (marcas + artistas).
- ✅ Schema.org JSON-LD por página, FAQ AIO, sitemap.xml dinámico, redirects 301 desde URLs WordPress viejas.
- ✅ PR #1 y #2 mergeados a `main` → Vercel producción.

**Pendiente crítico**:
- 3 heros (`nosotros`/`lab`/`records`), 3 casos y 28 imágenes de banco — pendientes de generar con gpt-image-1 (manifest+script ya listos).
- Logo Absolut Vodka (falló por rate limit Wikimedia — reintentar el .ps1).
- 6 URLs reales del feed de Instagram @bonito_sound para la home (necesita Víctor).
- 2-3 Reels de IG por artista del roster (necesita Víctor).
- Confirmaciones del brief: ¿existe OTEM?, ¿Júlia Martín vs equipo actual?, ¿Le Souffle es el restaurante de París?

## 2. URLs y accesos

| Recurso | URL |
|---|---|
| **Repo** | https://github.com/victortorresa94-del/bonitosound |
| **Producción (main)** | https://bonitosound.vercel.app |
| **Preview branch** | https://bonitosound-git-claude-bonito-5a3984-victors-projects-0b646b15.vercel.app |
| **Web actual a sustituir (WordPress)** | https://bonitosound.com |
| **Festival satélite** | https://jaleosound.com |
| **Hermana Lab (Artiverse)** | https://artiverse.es |
| **Instagram** | https://instagram.com/bonito_sound |
| **LinkedIn** | https://linkedin.com/company/bonito-sound |
| **TikTok Jaleo** | https://tiktok.com/@jaleo.sound |
| **YouTube Sant Jordi Club** | https://youtu.be/r47SP4OULcI |
| **Spotify playlist Jaleo** | https://open.spotify.com/playlist/2J24790mkalzNNsw4vFc2E |
| **Vercel project ID** | `prj_h3tv8ciNI4zhFknrGwNwaFhxwWoI` |
| **Vercel team slug** | `victors-projects-0b646b15` |

**Email Víctor**: `victortorresa94@gmail.com`

## 3. Stack en una mirada

```
Next.js 14.2.35 (App Router)
  └─ React 18.3.1
  └─ TypeScript 5.5+ estricto
  └─ Tailwind CSS 3.4 + CSS variables
  └─ next/font/google (Fraunces) + paquete geist (Geist Sans)

Markdown CMS
  └─ gray-matter 4.0 para parsear frontmatter
  └─ Sin headless CMS — todo en /content/*.md

Imágenes
  └─ next/image con AVIF/WebP nativos
  └─ unoptimized para AVIF de entrada (como el logo)
  └─ Optimización local con sharp (sólo dev)

Generación visual
  └─ OpenAI gpt-image-1 (manifest + script Node 22)
  └─ Fraunces variable axes SOFT/WONK/opsz para tipografía con carácter

Hosting
  └─ Vercel (Git integration auto-deploy)
  └─ Free tier hobby (suficiente para empezar)

Runtime
  └─ Node 22.22.2 (--env-file native, FormData/fetch nativos)

CI/CD
  └─ Auto-deploy en cada push a Vercel
  └─ Sin GitHub Actions personalizados aún
```

---

# PARTE II — ARQUITECTURA

## 4. Estructura completa del repo

```
bonitosound/
│
├── app/                                  Rutas Next.js (App Router)
│   ├── layout.tsx                        Root layout: fonts + JSON-LD Organization + Nav + Footer
│   ├── page.tsx                          Home (9 secciones)
│   ├── globals.css                       Variables CSS + clases Tailwind componentizadas
│   ├── sitemap.ts                        sitemap.xml dinámico
│   ├── robots.ts                         robots.txt
│   ├── not-found.tsx                     404
│   ├── opengraph-image.png               OG social (1536×1024 generada con gpt-image-1)
│   │
│   ├── eventos/page.tsx                  Índice eventos
│   ├── eventos/marcas/page.tsx           ★ LANDING B2B PRIORITARIA
│   ├── eventos/giras/page.tsx            Tour management
│   │
│   ├── records/page.tsx                  Índice records
│   ├── records/sello/page.tsx            Pillar SEO sello
│   ├── records/booking-management/page.tsx Pillar booking + mgmt
│   ├── records/distribucion/page.tsx     Pillar distribución
│   │
│   ├── artistas/page.tsx                 Roster (cards con foto)
│   ├── artistas/[slug]/page.tsx          Ficha individual dinámica
│   │
│   ├── lab/page.tsx                      Lab índice
│   ├── lab/artiverse/page.tsx            Pillar Artiverse
│   ├── lab/giraverse/page.tsx            Coming soon
│   │
│   ├── jaleo-sound/page.tsx              Festival (identidad roja propia)
│   ├── nosotros/page.tsx                 Equipo + membresías
│   ├── agenda/page.tsx                   Shows + Schema.org Event
│   ├── diario/page.tsx                   Blog (empty v1)
│   ├── contacto/page.tsx                 Form segmentado
│   ├── banco-visual/page.tsx             ★ Galería noindex de imágenes generadas
│   ├── aviso-legal/page.tsx              Legal
│   └── privacidad/page.tsx               Legal
│
├── components/
│   ├── Nav.tsx                           Header sticky con logo AVIF + nav + CTA "Hablamos"
│   ├── Footer.tsx                        Footer 4 columnas con sitemap + contacto
│   ├── Superhero.tsx                     Fallback automático SVG ↔ PNG generado
│   ├── LogoWall.tsx                      Detecta logo en /img/<dir>/ o cae a texto
│   ├── LeadMagnetBrands.tsx              Quiz interactivo de 4 pasos para marcas
│   ├── LeadMagnetArtists.tsx             Quiz de 6 preguntas con diagnóstico
│   ├── ContactForm.tsx                   Form segmentado por audiencia
│   ├── Embeds.tsx                        SpotifyEmbed, YouTubeEmbed, InstagramFeed (oEmbed)
│   └── ui.tsx                            Primitives: Section, Heading, Eyebrow, Cta, Faq, JsonLd
│
├── content/                              CMS Markdown
│   ├── artistas/
│   │   ├── dulze.md                      ✓ Booking. Image + IG
│   │   ├── eva-calyza.md                 ✓ Booking. Image + IG
│   │   ├── natura.md                     ✓ Booking. Image + IG
│   │   ├── otem.md                       ⚠ Booking. Pendiente confirmar
│   │   ├── paule.md                      ✓ Booking. Image + IG
│   │   └── sa-pena.md                    ✓ Booking. Image + IG
│   ├── casos/
│   │   ├── ballantines.md                Activación de marca
│   │   ├── pernod-ricard.md              Experiencia cultural
│   │   └── gira-1016.md                  Final Sant Jordi Club
│   └── agenda/
│       └── .gitkeep                      Cada show un .md (vacío en v1)
│
├── lib/
│   ├── site.ts                           Data central: nav, team, brands, memberships…
│   ├── content.ts                        getArtists/getArtist/getCases (gray-matter)
│   ├── agenda.ts                         getShows
│   └── assets.ts                         findAsset/findLogo/assetSlug (plug-and-play)
│
├── public/
│   ├── favicon.ico                       (no creado aún — Next genera de app/icon)
│   └── img/
│       ├── marca/                        ★ Brand assets
│       │   ├── logo-bonito.avif          Logo oficial (entrega de Víctor)
│       │   ├── logo-bonito.svg           Logo SVG blanco (de bonitosound.com)
│       │   ├── logo-bonito-color.svg     Logo SVG color (de bonitosound.com)
│       │   ├── logo-bonito.png           Variante PNG generada
│       │   ├── heroe-volando.jpeg        Personaje del héroe en pose vuelo
│       │   ├── heroe-megafono.jpeg       Personaje con megáfono
│       │   ├── mockup-01.png a 06.png    6 mockups del brief §14
│       │   ├── superheroe-home.png       ★ Generado gpt-image-1
│       │   ├── superheroe-records.png    ★ Generado
│       │   └── superheroe-eventos.png    ★ Generado
│       │
│       ├── artistas/
│       │   ├── alexdelion.png (162 KB)
│       │   ├── d-nacar.jpeg (277 KB)
│       │   ├── dulze.png (59 KB)
│       │   ├── eva-calyza.jpg (188 KB)
│       │   ├── hebe.jpeg (262 KB)
│       │   ├── marco-la-testa.jpeg (361 KB)
│       │   ├── natura.jpg (155 KB)
│       │   ├── pablo-rojo.jpg (156 KB)
│       │   ├── paule.jpeg (212 KB)
│       │   └── sa-pena.jpg (193 KB)
│       │
│       ├── equipo/
│       │   ├── dani-boada.jpg
│       │   ├── manu-rojo.jpg
│       │   ├── xavi-julia.jpg
│       │   └── cristina-soler.jpg
│       │
│       ├── marcas/                       Logos clientes (10 de bonitosound + 2 de Wikimedia)
│       │   ├── ballantines.png
│       │   ├── concert-studio.png
│       │   ├── font-vella.png
│       │   ├── four-roses.png
│       │   ├── gestmusic.png
│       │   ├── global-talent-services.png  (GTS)
│       │   ├── la-sucursal.png
│       │   ├── pepsico.svg                 ← Wikimedia
│       │   ├── pernod-ricard.svg           ← Wikimedia
│       │   ├── schweppes.png
│       │   ├── sweet-bird.png
│       │   ├── universal.png
│       │   └── [absolut.svg PENDIENTE — falló rate limit Wikimedia]
│       │
│       ├── instituciones/                Membresías
│       │   ├── ufi.png
│       │   ├── sgae.png
│       │   ├── agedi.png
│       │   ├── arte.png
│       │   ├── aedem.png
│       │   └── european-music-council.png
│       │
│       ├── apoyos/                       Programas que apoyan
│       │   ├── plan-de-recuperacion-ue.svg
│       │   ├── institut-ramon-llull.png
│       │   └── union-europea.svg
│       │
│       ├── giras/                        VACÍO — logos artistas de gira
│       ├── secciones/                    Iconos 4 verticales home (generados)
│       │   ├── eventos.png
│       │   ├── records.png
│       │   ├── lab.png
│       │   └── jaleo.png
│       │
│       ├── heros/                        Heros de página (generados)
│       │   └── eventos-marcas.png        (faltan: nosotros, lab, records)
│       │
│       ├── casos/                        VACÍO — cabeceras de case studies
│       └── banco/                        VACÍO — extras navegables en /banco-visual
│
├── references/ui-ux/                     ★ Mockups UI/UX de Víctor (10 PNGs)
│   ├── HERO.png                          Hero centrado con personaje grande
│   ├── Bonito Sound - Hero con Logo Original.png   Hero fresh con decoración
│   ├── Bonito Sound - Hero Alternativo Limpio.png  Hero con foto artista
│   ├── Bonito Sound - Roster Asimetrico Fresh.png  Roster en navy con cards
│   ├── Bonito Sound - Como Funciona On Brand.png   "Así de fácil" con blobs
│   ├── Bonito Sound - Agenda Balanceada.png        Agenda con motivos
│   ├── Bonito Sound - Agenda Eventos.png           Agenda fresh
│   ├── Bonito Sound - Perfil de Artista.png        Ficha de artista
│   ├── ChatGPT Image 5 may 2026, 23_44_35.png
│   └── ChatGPT Image 5 may 2026, 23_44_40.png
│
├── bonitosound-cowork/                   Output de la sesión Cowork
│   ├── HANDOVER.md                       Guía de 6 pasos de Cowork
│   ├── download-bonito-assets.ps1        Versión PowerShell del script bash
│   ├── manifest.json                     URLs reales → slugs (referencia)
│   ├── artistas-frontmatter-snippets.md  YAML para cada artista
│   ├── page-tsx-snippet.tsx              <InstagramFeed posts={…}/>
│   └── pr-comment.md
│
├── scripts/
│   ├── manifest.mjs                      ★ Manifest gpt-image-1: 43 entries
│   ├── generate-images.mjs               ★ Ejecutor OpenAI Images API
│   ├── download-bonito-assets.sh         Bash equivalente del .ps1
│   └── scrape-bonito.mjs                 Crawler (no usado — Cowork lo hizo)
│
├── CONTEXT.md                            ★ Este documento
├── .env.example                          Placeholders sin secrets
├── .gitignore                            Ignora .env*, .next, node_modules, etc.
├── .eslintrc.json                        extends next/core-web-vitals
├── next.config.mjs                       Image config + Redirects 301
├── tailwind.config.ts                    Colores vinculados a CSS vars
├── tsconfig.json                         Excluye bonitosound-cowork/, references/
├── postcss.config.mjs
├── package.json                          Scripts npm
└── package-lock.json
```

## 5. Sistema de diseño

### 5.1 Paleta completa (CSS variables en `app/globals.css`)

```css
:root {
  /* Backgrounds */
  --bg-primary:    #ffffff;             /* Blanco puro base */
  --bg-secondary:  #f6f5f1;             /* Off-white cálido (alterna secciones) */
  --bg-tertiary:   #efede7;             /* Beige claro (placeholders, cards bg) */

  /* Acentos */
  --accent-blue:        #1b6ee6;        /* Azul Bonito — primary action */
  --accent-blue-hover:  #1559c4;
  --accent-warm:        #ff5a1f;        /* Naranja — herencia Jaleo, MUY contenido */
  --accent-warm-soft:   #ffb47a;
  --jaleo-red:          #e8351f;        /* Sólo en /jaleo-sound, identidad propia */

  /* Texto */
  --text-primary:   #0b0f14;            /* Casi negro */
  --text-secondary: #51565f;            /* Gris medio */
  --text-muted:     #8b8f98;            /* Gris claro */

  /* Borders */
  --border-subtle:  rgba(11, 15, 20, 0.1);  /* Imperceptible casi */
}
```

**Paleta secundaria usada en prompts gpt-image-1 (no en CSS):**
- Navy `#0B1E2F` (cuerpo del héroe)
- Teal/turquesa `#1FB89A`
- Cream `#F8EFD8`
- Amber `#F5A623` (sólo en sol/badges)

### 5.2 Tipografía

```ts
// app/layout.tsx
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],   // Carácter playful pero editorial
});
```

```css
/* Uso */
.display { font-family: var(--font-display); font-weight: 600; }
body { font-family: var(--font-body); }    /* --font-body = var(--font-geist-sans) */
```

- **Fraunces variable**: usada en `<Heading>`, números grandes, eyebrows, citas. Los ejes `SOFT` y `WONK` le dan ese carácter "wonky/handwritten" sin perder editorial.
- **Geist Sans**: cuerpo limpio para todo lo demás.

### 5.3 Componentes utilitarios Tailwind

Definidos en `app/globals.css` dentro de `@layer components`:

```css
.wrap            /* mx-auto max-w-content (1240px) px-6 md:px-10 — wrapper estándar */
.eyebrow         /* text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue */
.display         /* Aplica font-display + tracking-tight */

.btn             /* pill, padding 6/3, transición */
.btn-primary     /* bg text-primary, text white, hover azul Bonito */
.btn-ghost       /* outline */

.card            /* rounded-2xl border bg-transparent p-7, hover oscurece borde */
.link-underline  /* underline animado bajo enlaces inline */

.stagger > *     /* Aplicado a contenedor: cada child con reveal-up + delay incremental */
```

### 5.4 Sistema de motion

- **Page-load**: `.stagger` aplica `reveal-up` (translate Y + fade) con delays 0.05s, 0.13s, 0.21s… en cascada.
- **Hover**: cards tienen `border-subtle → border-text-primary` en transition 300ms. Botones `translateY(-1px)`.
- **Sin sombras**: el sistema es plano. Profundidad por contraste de color y borde.
- **`prefers-reduced-motion`**: respetado — desactiva todas las animaciones y transiciones.

## 6. Sitemap detallado por página

### `/` Home (9 secciones, ver `app/page.tsx`)

1. **Hero**: titular "No hacemos eventos. Hacemos jaleo." + subtítulo + 2 CTAs ("Cuéntanos qué necesitas" / "Explorar el ecosistema") + Superhéroe estado "home" a la derecha.
2. **Lo que hacemos**: 4 cards verticales (Eventos, Records, Lab, Jaleo Sound). Cada una con icono de `secciones/<slug>.png` (o fallback Superhéroe).
3. **Marcas que nos eligen** (bg-secondary): titular "Sin grandes escenarios. Sin zonas VIP. Sin tonterías." + LogoWall de 17 marcas + CTA.
4. **Roster**: cards horizontales con scroll en mobile, grid en desktop. 6 artistas booking con foto + género.
5. **Jaleo Sound** (fondo rojo): bloque con identidad de Jaleo, 2 CTAs (web del festival, Open Call 2026).
6. **Lab** (bg-secondary): titular "El sector mueve carreras por WhatsApp" + Superhéroe + CTA.
7. **Nosotros**: 3 cards de equipo + LogoWall de membresías + LogoWall de apoyos.
8. **En directo** (bg-secondary): `<InstagramFeed>` (placeholder hasta tener URLs).
9. **Footer** (heredado del layout).

### `/eventos/marcas` ★ LA QUE VENDE

1. Hero con titular "Música que la gente recuerda. No decorado." + 2 CTAs + imagen hero a la derecha.
2. **"Diseña tu activación en 90 segundos"**: `<LeadMagnetBrands>` (4 preguntas).
3. **Casos** (bg-secondary): grid de 3 case studies (Ballantine's, Pernod Ricard, Gira 1016) con imagen + título + contexto + resultado.
4. **Servicios**: 3 cards (Brand Live, Brand Touring, Brand Sessions).
5. **Marcas** (bg-secondary): LogoWall.
6. **Por qué nosotros**: 4 razones numeradas.
7. **FAQ AIO** (bg-secondary): 4 preguntas con `<Faq>` collapsible + Schema.org `FAQPage`.
8. **CTA final**: bloque centrado con "¿Lo hablamos?".

Schema.org: `Service` + `FAQPage`.

### `/eventos/giras`

Hero + LogoWall de tourArtists (Albert Pla, Alfred García, etc.) + YouTubeEmbed Sant Jordi Club + FAQ.

### `/records`

Hero + `<LeadMagnetArtists>` quiz + Servicios (4: Booking Engine, Records 360, Editorial 360, Distribución) + Roster cards + LogoWall distributionCatalog + "Cómo trabajamos" (4 pasos) + FAQ + CTAs a sub-pillars.

### `/records/sello`, `/records/booking-management`, `/records/distribucion`

Pillar SEO. Cada uno con hero, 3 cards de propuesta, FAQ AIO y Schema.org FAQPage.

### `/artistas`

Hero + grid asimétrico de roster con foto + LogoWall distributionCatalog + CTA contactar booking.

### `/artistas/[slug]`

Generado dinámicamente con `generateStaticParams` desde `getArtists()`. Hero con foto + bio + (Spotify embed si hay spotifyArtistId) + reels (si los hay) + CTA mailto booking. Schema.org `MusicGroup`.

### `/lab`, `/lab/artiverse`, `/lab/giraverse`

- `/lab`: índice con 2 cards (Artiverse + Giraverse) + manifiesto tech.
- `/lab/artiverse`: pillar SEO, qué resuelve, FAQ.
- `/lab/giraverse`: coming soon con email capture (mailto por ahora).

### `/jaleo-sound` ★ Identidad propia

Fondo rojo Jaleo (`--jaleo-red`). Hero "Jaleo Sound" + 3 frases en cards blancas/translúcidas + CTAs (web, open call, entradas) + `<SpotifyEmbed>` playlist. Schema.org `Festival` con fechas 11-12 sep 2026 Posthoornkerk Amsterdam.

### `/nosotros`

Hero + bloque "Quiénes somos" con foto/imagen al lado + 4 cards de equipo (Dani, Manu, Xavi, Cristina) + LogoWall memberships + LogoWall support + CTA.

### `/agenda`

Hero + lista de shows (vacío en v1 → empty state con CTA booking). Cuando haya shows: Schema.org `Event` por show.

### `/diario`

Hero + empty state hacia Instagram.

### `/contacto`

Hero + `<ContactForm>` con selector de audiencia (Marca/Artista/Promotor/Prensa/Otro) + datos directos (dirección, teléfono, emails) + redes.

### `/banco-visual` (noindex)

Galería responsiva que lee `public/img/banco/` con `fs` y muestra todas las imágenes con su filename. Para revisar el banco generado fácilmente sin abrir el repo. `metadata.robots = { index: false, follow: false }`.

## 7. Componentes — API de cada uno

### `components/Nav.tsx` (client component)

```tsx
<Nav />
```

Header sticky con backdrop blur. Logo AVIF a 44px de alto (`logo-bonito.avif`, `unoptimized`). Nav items desde `lib/site.ts:nav`. CTA "Hablamos" → `/contacto`. Mobile menu hamburguesa colapsable.

### `components/Footer.tsx` (server component)

Grid de 4 columnas: brand+claim, "Qué hacemos" (5 links), "Bonito" (5 links), contacto (mails, teléfono, dirección, redes). Bottom strip con copyright + legal.

### `components/Superhero.tsx` (server component)

```tsx
<Superhero state="home" | "records" | "eventos" className="…" />
```

Si existe `public/img/marca/superheroe-{state}.png` lo usa con `<Image>`. Si no, dibuja un SVG inline (pez del logo + variaciones por estado: home neutro, records vinilo, eventos altavoz). El SVG es fallback cohesivo.

### `components/LogoWall.tsx` (server component)

```tsx
<LogoWall items={brands} dir="marcas" label="Marcas que nos eligen" />
```

Grid responsive (2/3/4/5 cols). Para cada item: si `findLogo(dir, name)` encuentra el archivo, pinta `<Image>` 160×48 con `object-contain`. Si no, cae a texto del name. Si `dir` no se pasa, siempre texto.

### `components/LeadMagnetBrands.tsx` (client component, "use client")

Quiz interactivo con 4 pasos:

1. Tipo de evento (Festival corporativo / Lanzamiento de producto / Fiesta privada / Gira de marca)
2. Asistentes (<200 / 200-1000 / 1000-5000 / 5000+)
3. Artista (Nacional grande / Emergente nacional / Internacional / Aún no lo sé)
4. Plazo (<1 mes / 1-3 meses / 3-6 meses / +6 meses)

Resultado: 3 ejemplos del portfolio + CTA mailto con el contexto pre-rellenado.

### `components/LeadMagnetArtists.tsx` (client component)

Quiz de 6 preguntas (single + multi + texto):

1. Stage de carrera (single)
2. Qué necesitas (multi)
3. Género (texto libre)
4. ¿Te autoproduces? (single)
5. Shows hechos este año (single)
6. Mayor cuello de botella (texto libre)

Resultado: diagnóstico personalizado por reglas (si needs incluye "Todo" → mensaje 1; si "Booking" → mensaje 2; etc.) + CTA mailto booking.

### `components/ContactForm.tsx` (client component)

Botones segmentación (Marca/Artista/Promotor/Prensa/Otro) → cambia el placeholder del textarea. Submit envía mailto al email correcto (booking si artista, general resto) con asunto y body pre-rellenados. Sin backend de momento — solo abre cliente de correo.

### `components/Embeds.tsx` (server components, excepto InstagramFeed)

```tsx
<SpotifyEmbed type="playlist|artist|track|album" id="…" height={352} title="…" />
<YouTubeEmbed id="…" title="…" />
<InstagramFeed handle="bonito_sound" posts={["url1","url2",…]} count={6} />
```

- `SpotifyEmbed` usa iframe `https://open.spotify.com/embed/`.
- `YouTubeEmbed` usa iframe `youtube-nocookie.com`.
- `InstagramFeed` — si `posts` está poblado, embebe con `instagram.com/embed.js` (oEmbed oficial, sin token). Si vacío, cae a grid placeholder enlazando al perfil.

### `components/ui.tsx`

Primitives:

```tsx
<Section id="…" className="…">…</Section>      // padding 20/28 vert + wrap interno
<Heading as="h1|h2|h3" className="…">…</Heading>  // tamaños clamp + .display
<Eyebrow>…</Eyebrow>                          // eyebrow style
<Cta href="…" variant="primary|ghost" external>…</Cta>  // botón
<Faq items={[{q, a}, …]} />                   // accordion <details>
<JsonLd data={schemaObject} />                // <script type="application/ld+json">
```

---

# PARTE III — DATA Y CONTENIDO

## 8. lib/site.ts — fuente de verdad

```ts
export const site = {
  name: "Bonito Sound",
  legalName: "Bonito Sound S.L.",
  cif: "B10805299",
  founded: 2022,
  url: "https://bonitosound.com",
  description: "El único ecosistema cultural integral del sector musical en España. Artistas, eventos para marcas, festival propio y la tecnología que conecta a toda la industria.",
  address: {
    street: "Carrer Tulancingo, 4",
    zip: "08206",
    city: "Sabadell",
    region: "Barcelona",
    country: "ES",
  },
  phone: "+34 656 865 545",
  emails: {
    general: "bonito@bonitosound.com",
    booking: "sonabonito@bonitosound.com",
  },
  social: {
    instagram: "https://instagram.com/bonito_sound",
    linkedin: "https://linkedin.com/company/bonito-sound",
  },
  external: {
    jaleo: "https://jaleosound.com",
    artiverse: "https://artiverse.es",
    youtubeSantJordi: "https://youtu.be/r47SP4OULcI",
    spotifyJaleoPlaylist: "https://open.spotify.com/playlist/2J24790mkalzNNsw4vFc2E",
    spotifyJaleoPlaylistId: "2J24790mkalzNNsw4vFc2E",
  },
};
```

### Nav

```ts
nav = [
  { label: "Eventos", href: "/eventos" },
  { label: "Records", href: "/records" },
  { label: "Lab", href: "/lab" },
  { label: "Jaleo Sound", href: "/jaleo-sound" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Agenda", href: "/agenda" },
]
```

### Equipo (actualizado a la web actual)

```ts
team = [
  { name: "Dani Boada",     role: "Fundador",      line: "30 años en la industria. Management, contratos, la llamada que cierra el bolo." },
  { name: "Manu Rojo",      role: "Cofundador",    line: "Project management, financiación y booking. Lleva a Eva Calyza de la mano." },
  { name: "Xavi Julià",     role: "Producción",    line: "El que hace que el deck se convierta en evento. Sin él, no hay escenario." },
  { name: "Cristina Soler", role: "Comunicación",  line: "La voz que coordina lo de fuera y lo de dentro. Si te llega, es porque ella lo manda." },
]
```

⚠ El brief original decía Júlia Martín en lugar de Xavi/Cristina. **CONFIRMAR con Víctor** si Júlia es nueva (5ª persona) o reemplaza.

### Memberships (UFI/SGAE/AGEDI/ARTE/AEDEM/EMC)

```ts
memberships = ["UFI", "SGAE", "AGEDI", "ARTE", "AEDEM", "European Music Council"]
```

### Support (apoyos institucionales)

```ts
support = [
  "Institut Ramon Llull",
  "Plan de Recuperación UE",
  "Ministerio de Cultura",
  "Instituto Cervantes",
  "Embajada de España en Holanda",
  "AIE",
  "Stadsdeel Amsterdam",
]
```

### Brands (17 marcas clientes)

```ts
brands = [
  "Ballantine's", "Pernod Ricard", "Pepsico", "Schweppes", "Absolut",
  "Font Vella", "Four Roses", "Le Souffle", "Universal", "Gestmusic",
  "Concert Studio", "GTS Global Talent Services", "Sweet Bird",
  "Código 1530", "Lighthouse", "Corre Lola Corre", "Sr. Wilson",
]
```

### Tour artists (7)

```ts
tourArtists = [
  "Albert Pla", "Alfred García", "Antonio Orozco", "Maldita Nerea",
  "Ruth Lorenzo", "Ramon Mirabet", "Efecto Pasillo",
]
```

### Distribution catalog (21 artistas)

```ts
distributionCatalog = [
  "Paule", "Dulze", "Sa Pena", "Soylapau", "Daniel Giró",
  "96Grados", "Pablo Rojo", "Nàtura", "Hebe", "Kanela",
  "Sotrac", "Belbaka", "Egon Calle", "Rumba Menuda", "Fabian",
  "Eva Calyza", "Kenai White", "Overpulation",
  "D Nácar", "AlexDeLion", "Marco la Testa",   // Añadidos desde web actual
]
```

## 9. Markdown CMS

### 9.1 Artistas (`content/artistas/*.md`)

Frontmatter shape:

```yaml
---
name: "Nàtura"                              # Display name
genre: "Pop català / Indie"                  # Género
tier: "booking"                              # "booking" | "distribucion"
spotifyArtistId: ""                          # ID Spotify para embed (vacío = no embed)
instagram: "https://www.instagram.com/dj.natura"
image: "/img/artistas/natura.jpg"            # Path o auto-detect via findAsset
reels:                                       # Array de URLs IG reels (opcional)
  - "https://www.instagram.com/reel/XXX1/"
---
Texto markdown libre. Cada `\n\n` se convierte en un párrafo de la bio.
```

Estado actual:
- **OTEM**: pendiente — `spotifyArtistId: "382ZStNMRpkdxhvwYgQRaU"` puesto, foto y handle IG pendiente.
- **Sa Pena**: `image: /img/artistas/sa-pena.jpg`, `instagram: https://www.instagram.com/sa_pena_`, reels pendiente.
- **Nàtura**: `image: /img/artistas/natura.jpg`, `instagram: https://www.instagram.com/dj.natura`, reels pendiente.
- **Dulze**: `image: /img/artistas/dulze.png`, `instagram: https://www.instagram.com/duuuulze`, reels pendiente.
- **Paule**: `image: /img/artistas/paule.jpeg`, `instagram: https://www.instagram.com/paulemusica`, reels pendiente.
- **Eva Calyza**: `image: /img/artistas/eva-calyza.jpg`, `instagram: https://www.instagram.com/evacalyza`, reels pendiente.

### 9.2 Casos (`content/casos/*.md`)

Frontmatter shape:

```yaml
---
brand: "Ballantine's"                        # Nombre de la marca
title: "Una activación de marca que la gente recuerda, no que aguanta"
context: "Activación con música en directo: del brief al evento."
result: "Producción end-to-end coordinada por un solo equipo."
year: "2023"
---
```

Actualmente hay 3: `ballantines.md`, `pernod-ricard.md`, `gira-1016.md`. Los resultados son cualitativos honestos (sin KPIs fabricados — regla del brief).

### 9.3 Agenda (`content/agenda/*.md`)

Frontmatter shape (uno por show):

```yaml
---
artist: "Nàtura"
date: "2026-06-14"                            # ISO date
city: "Barcelona"
venue: "Sala Apolo"
ticketsUrl: "https://..."                     # opcional
---
```

Lib `lib/agenda.ts:getShows()` filtra automáticamente shows futuros (date >= hoy) y los ordena por fecha. Vacío en v1 — empty state.

## 10. Mapping de slugs a carpetas /public/img/

Reglas para el sistema plug-and-play. **Si dropas un archivo aquí con el slug correcto, aparece en la web automáticamente.**

| Carpeta | Convención de slug | Quién lo lee | Ejemplo |
|---|---|---|---|
| `/img/marca/` | nombres específicos | Nav, Superhero | `logo-bonito.avif`, `superheroe-home.png` |
| `/img/artistas/` | slug del artista | Roster home, /artistas, /artistas/[slug] | `natura.jpg` |
| `/img/equipo/` | assetSlug(name) | /nosotros team grid | `dani-boada.jpg` |
| `/img/marcas/` | assetSlug(brandName) | LogoWall en home y eventos/marcas | `ballantines.png` |
| `/img/instituciones/` | assetSlug(name) | LogoWall en home y nosotros | `sgae.png` |
| `/img/apoyos/` | assetSlug(name) | LogoWall en home y nosotros | `institut-ramon-llull.png` |
| `/img/giras/` | assetSlug(name) | LogoWall en eventos/giras | `albert-pla.png` |
| `/img/secciones/` | slug del vertical | Home 4 cards | `eventos.png` |
| `/img/heros/` | slug de la página | Página correspondiente | `eventos-marcas.png` |
| `/img/casos/` | slug del .md | Cards en /eventos/marcas | `ballantines.png` |
| `/img/banco/` | cualquier slug descriptivo | /banco-visual lista todo | `heroe-saludando.png` |

Extensiones soportadas (en orden): `svg`, `webp`, `png`, `jpg`, `jpeg`, `avif`.

---

# PARTE IV — SISTEMA DE ASSETS

## 11. lib/assets.ts (plug-and-play)

```ts
// Convierte un nombre a slug filename-safe
assetSlug("Ballantine's")          → "ballantines"
assetSlug("Pernod Ricard")          → "pernod-ricard"
assetSlug("Júlia Martín")           → "julia-martin"
assetSlug("D Nácar")                → "d-nacar"

// Busca un archivo en /public/img/<dir>/<slug>.<ext>
// Prueba extensiones en orden: svg, webp, png, jpg, jpeg, avif
// Devuelve "/img/<dir>/<slug>.<ext>" o null
findAsset("artistas", "natura")     → "/img/artistas/natura.jpg"
findAsset("artistas", "inexistente") → null

// Igual que findAsset pero slugifica el name primero
findLogo("marcas", "Ballantine's")  → "/img/marcas/ballantines.png"
```

Uso en componente típico:

```tsx
const photo = a.image ?? findAsset("artistas", a.slug);
return photo ? <Image src={photo} … /> : null;
```

## 12. Imágenes generadas con gpt-image-1

### 12.1 Setup

- **Modelo**: `gpt-image-1` (OpenAI).
- **Endpoint**: `POST /v1/images/edits` (con refs) o `/v1/images/generations` (sin refs).
- **Quality**: `medium` para banco (~$0.04/img), `high` para OG (~$0.17/img).
- **Tamaños usados**: `1024x1024` (cuadrado), `1536x1024` (landscape para heros).
- **Background**: `transparent` para flexibilidad (PNG con alpha).
- **Auth**: `OPENAI_API_KEY` en `process.env`.

### 12.2 Manifest (`scripts/manifest.mjs`)

43 entries totales: 15 web + 28 banco.

Estructura de cada entry:

```js
{
  id: "superheroe-home",                          // ID para --only
  dest: "public/img/marca/superheroe-home.png",   // Output path
  prompt: "The Bonito Sound hero character …",     // Prompt limpio
  refs: ["heroVuelo", "heroMegafono", "logo"],    // Claves de REFS
  size: "1024x1024",
  quality: "medium",
  category: "web",                                 // "web" o "banco"
}
```

### 12.3 STYLE constant (concatenado a cada prompt)

```
Style requirement: Bonito Sound brand identity, exactly as in the provided reference mockups.
MANDATORY: pure flat white background (#FFFFFF). No vignette, no gradient backdrop, no stage lighting, no colored ambient, no photographic background — just clean flat white edge to edge.
Paleta: pure white background with dark navy blue (#0B1E2F) for typography and the hero character,
teal/turquoise (#1FB89A) for highlights and primary buttons, warm cream (#F8EFD8) for blob-shaped accents,
and a very sparing touch of warm amber (#F5A623) for tiny badges only.
Visual language: editorial, fresh, musical, slightly playful — NOT flat corporate.
Use confident continuous strokes, no shadows, no gradients, no photoreal textures.
Decorative motifs scattered like confetti at small scale: tiny stars, music notes, wavy lines, dots, swirls — always in light teal or light navy, never overwhelming the composition.
When the Bonito Sound hero character appears, preserve its iconic silhouette exactly as in the reference (navy body, teal head/cape, the lettering inside the body is part of the brand mark).
Generous negative space. Asymmetric, organic-feeling, never rigid or symmetric.
Do NOT invent additional brand text, taglines or wordmarks unless explicitly asked.
```

### 12.4 REFS (imágenes de referencia que se pasan a gpt-image-1)

```ts
REFS = {
  logo: "public/img/marca/logo-bonito.png",
  heroVuelo: "public/img/marca/heroe-volando.jpeg",
  heroMegafono: "public/img/marca/heroe-megafono.jpeg",
  mockupHero: "references/ui-ux/HERO.png",
  mockupHeroFresh: "references/ui-ux/Bonito Sound - Hero con Logo Original.png",
  mockupComoFunciona: "references/ui-ux/Bonito Sound - Como Funciona On Brand.png",
}
```

Grupos de refs reutilizables:
- `heroRefs`: `["heroVuelo", "heroMegafono", "logo"]` (para el personaje solo)
- `composedRefs`: `["heroVuelo", "logo", "mockupHero", "mockupHeroFresh"]` (heros narrativos)
- `sceneRefs`: `["heroMegafono", "mockupComoFunciona", "mockupHeroFresh"]` (secciones, casos)

### 12.5 Generadas hasta ahora (11)

| ID | Path | Estado |
|---|---|---|
| `superheroe-home` | `marca/superheroe-home.png` | ✅ |
| `superheroe-records` | `marca/superheroe-records.png` | ✅ |
| `superheroe-eventos` | `marca/superheroe-eventos.png` | ✅ |
| `seccion-eventos` | `secciones/eventos.png` | ✅ (mic con "ojos" raros — podría regenerar) |
| `seccion-records` | `secciones/records.png` | ✅ |
| `seccion-lab` | `secciones/lab.png` | ✅ |
| `seccion-jaleo` | `secciones/jaleo.png` | ✅ Excelente con sol naranja |
| `hero-eventos-marcas` | `heros/eventos-marcas.png` | ✅ Fondo blanco limpio |
| `opengraph` | `app/opengraph-image.png` | ✅ Personaje + script "Bonito Sound" |
| (Logo PNG variant generado por sesión paralela) | `marca/logo-bonito.png` | ✅ |

### 12.6 Pendientes de generar (32)

**Web (4)**:
- `hero-nosotros` (borrado por vignette, regenerar con prompt endurecido)
- `hero-lab` (borrado por vignette)
- `hero-records` (borrado por vignette)
- `caso-ballantines`, `caso-pernod-ricard`, `caso-gira-1016`

**Banco (28)**:
- 8 variantes del héroe: saludando, wifi, vinilo, micrófono, escenario, ordenador, viaje, jumping.
- 5 motivos abstractos: ondas, vinilo, micrófono, cassette, altavoz.
- 3 escenas evento: luces, crowd, soundcheck.
- 3 motivos Jaleo: paella, ola mediterránea, pájaro cantor.
- 2 motivos Lab: red de nodos, wifi.
- 4 personas silueteadas: grupo, dúo bailando, auriculares, multitud concierto.
- 3 fondos abstractos: azul suave, ola azul, círculos.

### 12.7 Ejecutar la generación

Requisitos:
1. `OPENAI_API_KEY` en `process.env` (no en el repo).
2. Red abierta a `api.openai.com` (este entorno la bloquea — **recrear entorno con policy abierta**).

```bash
npm run generate-images                                   # todas pendientes (idempotente)
npm run generate-images:local                             # carga .env.local
node scripts/generate-images.mjs --only=hero-nosotros --force   # una sola
node scripts/generate-images.mjs --category=banco                # solo banco
```

El script salta files que ya existen. Para regenerar uno: `--force` + `--only=<id>`.

## 13. Imágenes reales scrapeadas

### 13.1 Cómo se hizo (24 may 2026)

1. Víctor pidió: "extraer logos y fotos desde bonitosound.com".
2. Este entorno tenía red bloqueada → no se pudo scrapear desde aquí.
3. Víctor lanzó una sesión de **Cowork for Chrome** (extensión).
4. Cowork scrapeó bonitosound.com con web_fetch, identificó 35+ URLs y produjo:
   - `bonitosound-cowork/manifest.json` (URLs → slugs)
   - `bonitosound-cowork/download-bonito-assets.ps1` (Windows)
5. Yo (este Claude) generé `scripts/download-bonito-assets.sh` equivalente para Linux/Mac, con validación MIME para no guardar respuestas de proxy.
6. Víctor ejecutó el .ps1 en su PC Windows local → descargó 37 de 38 imágenes. Absolut falló por rate limit 429.
7. Commit + push del subdirectorio `public/img/`.
8. Yo optimicé las imágenes grandes con `sharp` (85.9 MB → 1.5 MB).

### 13.2 URLs origen (manifest.json)

```json
"marca": {
  "logo-bonito.svg":       "https://bonitosound.com/wp-content/uploads/2024/04/logo.svg",
  "logo-bonito-color.svg": "https://bonitosound.com/wp-content/uploads/2024/04/logo-1.svg"
},
"artistas": {
  "paule":           "https://bonitosound.com/wp-content/uploads/2025/11/image00001.jpeg",
  "sa-pena":         "https://bonitosound.com/wp-content/uploads/2024/10/FOTO-DE-GRUP-scaled.jpg",
  "natura":          "https://bonitosound.com/wp-content/uploads/2024/04/DJ-Natura-feat-scaled.jpg",
  "dulze":           "https://bonitosound.com/wp-content/uploads/2025/04/ps1.png",
  "eva-calyza":      "https://bonitosound.com/wp-content/uploads/2024/06/Eva-Calyza-2.jpg",
  "pablo-rojo":      "https://bonitosound.com/wp-content/uploads/2024/07/IMG_0251-scaled.jpg",
  "d-nacar":         "https://bonitosound.com/wp-content/uploads/2025/01/D-NACAR-scaled.jpeg",
  "alexdelion":      "https://bonitosound.com/wp-content/uploads/2025/01/Campeonato-cover.png",
  "marco-la-testa":  "https://bonitosound.com/wp-content/uploads/2025/01/Marco-la-Testa-scaled.jpeg",
  "hebe":            "https://bonitosound.com/wp-content/uploads/2025/01/IMG_5857-scaled-…"
},
"equipo": {
  "dani-boada":     "https://bonitosound.com/wp-content/uploads/2024/06/DANIEL_BOADA_BONITO_SOUND_…",
  "manu-rojo":      "https://bonitosound.com/wp-content/uploads/2024/06/manu_rojo_bonito_sound-copia.jpg",
  "xavi-julia":     "https://bonitosound.com/wp-content/uploads/2024/07/xavi_julia_bonito_sound-copia.jpg",
  "cristina-soler": "https://bonitosound.com/wp-content/uploads/2025/03/b819c45d-…"
},
"marcas": { /* 10 logos desde bonitosound.com */ },
"marcas-wikimedia": {
  "pernod-ricard":  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pernod_Ricard_2019.svg/…",
  "pepsico":        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/PepsiCo_logo_…",
  "absolut":        "https://upload.wikimedia.org/wikipedia/commons/9/94/Absolut_Vodka_logo.svg"  // PENDIENTE
},
"instituciones": { /* 9 logos UFI, SGAE, AGEDI, ARTE, AEDEM, EMC, Plan UE, Institut Llull, Unión Europea */ }
```

### 13.3 Cómo reintentar Absolut

En Windows:
```powershell
cd "C:\Users\Usuario\Desktop\Dev\2 - Bonito Sound\bonitosound"
git pull
.\bonitosound-cowork\download-bonito-assets.ps1
# Solo descargará lo que falte (idempotente)
git add public/img
git commit -m "Añade logo Absolut"
git push
```

En Mac/Linux:
```bash
bash scripts/download-bonito-assets.sh
git add public/img && git commit -m "fix" && git push
```

## 14. Optimización con sharp

Cuando imágenes >1MB aterrizan en el repo, optimizarlas antes de commitear. Pasos:

```bash
npm install --no-save sharp
node -e "
import sharp from 'sharp';
await sharp('public/img/artistas/<archivo>.png')
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/img/artistas/<archivo>.jpg');
"
```

Settings empíricos óptimos:
- **Artistas**: max width 1200px, JPEG quality 82 mozjpeg.
- **Equipo**: max width 900px, JPEG quality 82 mozjpeg.
- **Logos**: dejarlos como SVG cuando se pueda; PNG sólo si imprescindible.

GitHub avisa con archivos >50MB. Vercel falla con bundles muy grandes.

## 15. Mockups de referencia (`references/ui-ux/`)

10 PNGs subidos por Víctor el 24 may 2026. Reflejan el lenguaje visual real que Bonito quiere:

| Archivo | Lo que muestra |
|---|---|
| `HERO.png` | Personaje grande centrado-izquierda + texto a la derecha. Web blanca, nav minimal con script "Bonito Sand". |
| `Bonito Sound - Hero con Logo Original.png` | Hero fresh con script "BONITO Sound" arriba izquierda, headline "Tu evento merece buena música", artista en blob crema/teal, motivos decorativos (estrellas, notas, ondas) en azul. |
| `Bonito Sound - Hero Alternativo Limpio.png` | Layout más limpio: foto de artista mujer al piano + headline "Artistas que transforman tu escenario". |
| `Bonito Sound - Roster Asimetrico Fresh.png` | **Fondo navy oscuro**. Grid asimétrico con cards de tamaños distintos. Filtros chips (Todos/Pop/Jazz/Urbano/Cantaut). |
| `Bonito Sound - Como Funciona On Brand.png` | **Fondo navy**. Sección "Así de fácil" con 3 blobs orgánicos color crema con números 01/02/03 y emojis. |
| `Bonito Sound - Agenda Balanceada.png` | Agenda con cards de fechas, motivos decorativos. |
| `Bonito Sound - Agenda Eventos.png` | Agenda fresh con motivos. |
| `Bonito Sound - Perfil de Artista.png` | Ficha con foto + bio + próximas fechas + logos de festivales donde tocó. |
| 2× `ChatGPT Image …` | Iteraciones previas. |

**Aprendizajes del estilo target**:
- Mezcla blanco + navy oscuro según sección.
- Script lettering "Bonito Sound" (mano alzada) en azul.
- Paleta extendida: navy, teal, blanco, crema cálido, accentos amber.
- Motivos decorativos pequeños (estrellas, notas, ondas) como confetti.
- Blobs orgánicos asimétricos.
- Fotos reales de artistas en cards con blob.

Estos mockups están EXCLUIDOS de `tsconfig.json` (no son código) pero SÍ los lee el script de gpt-image-1 como referencia visual para garantizar cohesión.

## 16. Logo y personaje del héroe

Originales subidos por Víctor:
- `public/img/marca/logo-bonito.avif` — logo oficial, personaje volando con "BONITO SOUND" como cuerpo y capa fluyendo.
- `public/img/marca/heroe-volando.jpeg` — el mismo personaje en JPEG.
- `public/img/marca/heroe-megafono.jpeg` — personaje parado con megáfono.

Estos 3 son los que `gpt-image-1` recibe como referencia para generar variantes del personaje en otras poses.

**Por qué el AVIF y no el SVG en el nav**: el `logo-bonito.svg` que descargamos de bonitosound.com es la versión simplificada en línea (no el personaje completo). Para el nav usamos el AVIF original que es el personaje icónico completo.

---

# PARTE V — BRIEF MAESTRO INTERNALIZADO

## 17. Posicionamiento y big idea

### Frase ancla interna (no se publica tal cual)

> **El único ecosistema cultural integral del sector musical en España. Artistas, eventos para marcas, festival propio y la tecnología que conecta a toda la industria.**

### Insight ancla (justifica todo el proyecto)

> **La música no es una vertical. Es un sistema. Y los proyectos culturales que duran son los que tienen a alguien que entiende el sistema entero — no solo su trozo.**

### Big idea de marca

> **"Bonito Sound. Superhéroes culturales en un sector que opera por WhatsApp."**

El superhéroe NO es ornamental — representa el insight: el sector trabaja con herramientas del paleolítico, hace falta ser superhéroe para hacerlo funcionar.

## 18. Tres enemigos declarados (del brief §4.3)

1. **El modelo Excel + WhatsApp + favores**. El sector mueve cientos de millones con la sofisticación operativa de una pandilla de amigos. Insight que justifica Artiverse y Giraverse.
2. **Las agencias de una sola vertical**. Solo booking, solo sello, o solo eventos — dejan al artista o a la marca rebotando entre 5 proveedores para una misma necesidad.
3. **Las marcas que tratan la música como decoración**. El cliente que paga 80k por una activación y pide "algo con DJ" sin entender que la elección musical define la conversación cultural del evento.

## 19. Diagnóstico 3R de Risto (estado actual vs. objetivo)

- **Relevancia**: 7/10 para marcas, 4/10 para artistas → Objetivo: 8/9 ambos.
- **Resonancia**: 2/10. **Este es el agujero más grande**. Objetivo: 7/10.
- **Reputación**: 9/10. La sustancia existe — falta amplificarla.

**Diagnóstico**: Bonito tiene problema de **Resonancia**, no de Relevancia ni Reputación. La web no necesita vender más cosas — necesita producir el eco emocional que ahora no produce.

## 20. Audiencias jerarquizadas (orden de prioridad económica)

1. **Marcas y agencias de publicidad** (pagan 30k-150k por activación)
   - Brand managers, account directors, agencias creativas.
   - Entrada por: `/eventos/marcas`. Keywords: "agencia de eventos musicales", "activaciones de marca".

2. **Empresas / instituciones / ayuntamientos**
   - Departamentos de cultura, fundaciones, corporaciones.
   - Entrada por: `/eventos`, `/jaleo-sound`. Keywords: "productora de eventos musicales", "agencia eventos corporativos".

3. **Industria** (managers, salas, festivales)
   - Otros bookers, programadores, agencias internacionales.
   - Entrada por: `/lab/artiverse`, `/lab/giraverse` o referencia directa.

4. **Artistas emergentes** (importantes pero última prioridad económica)
   - Entrada por: `/records`, lead magnet quiz. Keywords: "agencia booking independiente", "sello discográfico".

5. **Público general / fans** (tráfico, no leads)
   - Entrada por: `/jaleo-sound`, ficha artista, marca. Se les redirige rápido.

**Implicación para la home**: marcas arriba (prioridad 1), artistas más abajo. Está implementado así.

## 21. Cinco verticales con detalle

### 21.1 Records — la línea de artistas

Sello discográfico + booking + management + distribución digital + editorial.

- **Roster booking & management (5 principales + Eva Calyza = 6)**: OTEM, Sa Pena, Nàtura, Dulze, Paule, Eva Calyza.
- **Catálogo distribución & editorial (~21 artistas)**: Paule, Dulze, Sa Pena, Soylapau, Daniel Giró, 96Grados, Pablo Rojo, Nàtura, Hebe, Kanela, Sotrac, Belbaka, Egon Calle, Rumba Menuda, Fabian, Eva Calyza, Kenai White, Overpulation, + D Nácar, AlexDeLion, Marco la Testa (estos 3 añadidos desde la web actual).

### 21.2 Eventos / Experiencias — la línea B2B (donde está la pasta)

Dos sublíneas:

- **Giras**: road management, tour management, stage management. Han trabajado con Albert Pla, Alfred García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo, Ramon Mirabet, Efecto Pasillo.
- **Marcas**: activaciones, eventos corporativos, experiencias culturales premium.
  - Clientes: Ballantine's, Pernod Ricard, Pepsico, Schweppes, Absolut, Font Vella, Four Roses, Le Souffle, Universal, Gestmusic, Concert Studio, GTS, Sweet Bird, Código 1530, Lighthouse, Corre Lola Corre, Sr. Wilson.

### 21.3 Jaleo Sound — el festival propio

Festival de cultura española y latina en Amsterdam.

- **2025**: Utrecht (10 oct) + Amsterdam (11-12 oct).
- **2026**: Amsterdam, 11-12 septiembre, en Posthoornkerk Cultural Church.
- Web propia: **jaleosound.com** (Wix). Se mantiene como satélite — no se absorbe.
- Apoyo institucional: Instituto Cervantes, Embajada España, AIE, Stadsdeel Amsterdam.
- Tagline: "No massive stages, no VIP fences, no nonsense. Just music, good taste, great food and people."

### 21.4 Lab — la línea tecnológica

- **Artiverse** (artiverse.es) — plataforma B2B que conecta agencias, programadores y promotores. 200+ usuarios.
- **Giraverse** — en desarrollo. Gestiona circulación de giras nacional e internacional.

### 21.5 Producciones — la columna operativa

Producción técnica, logística, dirección artística, coordinación. Es lo que permite a las otras 4 existir. No se vende como vertical separada — se integra en Eventos.

## 22. Reconocimientos institucionales

**Miembros activos de**: UFI · SGAE · AGEDI · ARTE · AEDEM · European Music Council

**Apoyos recibidos**:
- Institut Ramon Llull
- Plan de Recuperación UE
- Ministerio de Cultura
- Instituto Cervantes (para Jaleo)
- Embajada de España en Holanda (para Jaleo)
- AIE
- Stadsdeel Amsterdam (para Jaleo)

Este portfolio institucional **es el activo de credibilidad más infrautilizado** de Bonito. La web actual lo esconde. La nueva web lo pone en primera línea (sección "Nosotros" + footer).

## 23. Tono de voz: SÍ, NO, tests

### Heredamos la voz de Jaleo Sound

Jaleo ya tiene la voz canalla, divertida y directa que queremos para Bonito. La heredamos y traducimos al B2B/cultural de Bonito. Coherencia total del ecosistema.

Frases ancla de Jaleo:
- "No massive stages, no VIP fences, no nonsense."
- "Bring friends. Or make new ones."
- "If you're tired of overproduced shows and lifeless experiences, this is your antidote."

### Reglas operativas de copy

**SÍ:**
- Frases cortas. Como puñetazos.
- Verbos concretos: *montamos, llevamos, fichamos, gritamos, llamamos, abrimos, cerramos*.
- Sustantivos físicos: *escenario, micro, contrato, llamada, gira, vinilo*.
- Humor seco, no chistes. "En la música nadie te regala nada".
- Decir lo que otros no dirían: "El sector mueve carreras por WhatsApp".
- Primera persona del plural cuando hablamos de nosotros. Segunda del singular cuando hablamos al lector. Nunca tercera para "el cliente".

**NO** (lista negra):
- "En un mundo donde…". Prohibido.
- "Apasionados de la música". Todos lo dicen.
- "Transformamos / impulsamos / potenciamos / elevamos / catalizamos". Lista negra.
- "Soluciones integrales / 360º / a medida". Lista negra.
- Emojis en copy principal.
- Adjetivos vacíos: *innovador, único, líder, excepcional*.

### Test de validación de copy

1. **Test de sustitución (Risto)**: cambia "Bonito Sound" por "Lighthouse" o "Last Tour". Si el texto sigue funcionando igual → no estás construyendo marca, estás construyendo categoría.
2. **Test de caña (Víctor)**: ¿suena como algo que diría Dani tomando una caña con un colega del sector? Si sí, lo subes. Si suena a consultor en keynote, lo matas.
3. **Test de IA**: lee la frase en voz alta. Si suena como algo que escribiría ChatGPT en 2024, reescríbela.

## 24. Lead magnets detallados

### 24.1 `/eventos/marcas` — "Diseña tu activación en 90 segundos"

4 preguntas con cards visuales:

```
P1: ¿Qué tipo de evento quieres montar?
    → Festival corporativo / Lanzamiento de producto / Fiesta privada / Gira de marca

P2: ¿Cuántos asistentes esperáis?
    → <200 / 200-1000 / 1000-5000 / 5000+

P3: ¿Artista nacional o local?
    → Nacional grande / Emergente nacional / Internacional / Aún no lo sé

P4: ¿Cuándo lo necesitas listo?
    → <1 mes / 1-3 meses / 3-6 meses / +6 meses
```

**Resultado**: 3 ejemplos reales del portfolio que encajan con sus respuestas + CTA "Hablemos del tuyo" mailto con contexto pre-rellenado. **NO calcula precio. NO requiere email para usar.**

Justificación: el cliente B2B no quiere dar email para usarlo. La fricción es CERO. Solo se "convierte" si quiere contactar.

### 24.2 `/records` — "¿Encajas con Bonito?"

6-8 preguntas mezcladas (single, multi-select, texto):

```
P1: ¿Dónde estás en tu carrera?  [single]
    → Maqueta / Primer EP / Primer álbum / Segundo álbum / Desbordado

P2: ¿Qué necesitas?  [multi-select]
    → Sello / Booking / Management / Distribución / Todo / No lo sé

P3: ¿En qué género te mueves?  [texto libre]

P4: ¿Te autoproduces?  [single]
    → Sí, todo / Producción externa / Co-produce

P5: ¿Cuántos shows has hecho este año?  [single]
    → 0 / 1-5 / 5-15 / 15+

P6: ¿Cuál es tu mayor cuello de botella ahora?  [texto libre corto]
```

**Diagnóstico personalizado por reglas**:
- Si `needs` incluye "Todo" o tiene ≥3 selecciones → mensaje sobre ecosistema completo.
- Si `needs` incluye "Booking" → mensaje sobre falta de agenda.
- Si `needs` incluye "Distribución" → mensaje sobre plataformas.
- Si `stage` = "Maqueta" → mensaje sobre orientación temprana.
- Default → CTA llamada corta.

**CTA**: mailto a `sonabonito@bonitosound.com` con TODAS las respuestas en el body. Filtra leads cualificados.

---

# PARTE VI — SEO Y AIO

## 25. Clusters de contenido (§7 del brief)

| # | Cluster | Pillar | Keywords principales |
|---|---|---|---|
| 1 | Eventos para marcas (transaccional) | `/eventos/marcas` | "agencia de eventos musicales para marcas", "activaciones de marca con música España", "productora de eventos corporativos música" |
| 2 | Booking y management | `/records/booking-management` | "agencia de booking España", "agencia management musical independiente" |
| 3 | Sello, distribución, editorial | `/records/sello`, `/records/distribucion` | "sello discográfico independiente España" |
| 4 | Jaleo Sound (autoridad satélite) | `/jaleo-sound` | "festival música española Amsterdam" |
| 5 | Lab (autoridad marca + AIO) | `/lab`, `/lab/artiverse` | "Artiverse", "Giraverse", "software gestión música" |

Satélites futuros (no implementados aún): blog posts en `/diario` sobre temas relacionados.

## 26. Schema.org por página

Implementado en cada `page.tsx` con `<JsonLd>`:

| Página | Schemas |
|---|---|
| `layout.tsx` (raíz) | `Organization` con founder, member, address, sameAs |
| `/eventos/marcas` | `Service` + `FAQPage` (4 Q&A) |
| `/eventos/giras` | `FAQPage` (3 Q&A) |
| `/records` | `MusicGroup` ("Bonito Sound Records") + `FAQPage` (3 Q&A) |
| `/records/sello` | `FAQPage` (3 Q&A) |
| `/records/booking-management` | `FAQPage` (3 Q&A) |
| `/records/distribucion` | `FAQPage` (3 Q&A) |
| `/lab/artiverse` | `FAQPage` (3 Q&A) |
| `/lab/giraverse` | `FAQPage` (2 Q&A) |
| `/jaleo-sound` | `Festival` con startDate, endDate, location |
| `/artistas/[slug]` | `MusicGroup` por artista con genre, recordLabel, agent |
| `/agenda` | `Event` por show (cuando haya) |

## 27. sitemap.xml

Generado dinámicamente en `app/sitemap.ts`:

- Lista 17 rutas estáticas + N fichas de artista (dinámicas).
- Prioridades:
  - `/` → 1.0
  - `/eventos/marcas` → 0.9 (la que vende)
  - Resto → 0.7
  - Fichas artista → 0.6
- `lastModified` = momento del build.
- `changeFrequency` = "monthly".

URL: `/sitemap.xml` (auto-servido por Next).

## 28. Redirects 301

Definidos en `next.config.mjs`. Todos con `statusCode: 301` (literal, no 308 del default):

```js
// Atajos de marca del ecosistema
/artiverse        → /lab/artiverse
/giraverse        → /lab/giraverse
/jaleo            → /jaleo-sound
/jaleosound       → /jaleo-sound
/festival         → /jaleo-sound

// Slugs típicos del WordPress anterior
/home             → /
/inicio           → /
/quienes-somos    → /nosotros
/sobre-nosotros   → /nosotros
/equipo           → /nosotros
/servicios        → /eventos
/booking          → /records/booking-management
/management       → /records/booking-management
/sello            → /records/sello
/distribucion     → /records/distribucion
/roster           → /artistas
/contacto-2       → /contacto
/noticias         → /diario
/blog             → /diario

// WPML language prefixes (la web actual estaba en WordPress + WPML)
/ca/:path*        → /:path*
/es/:path*        → /:path*
```

⚠ **Validar contra el sitemap real de WordPress antes del go-live** (§16 del brief). Puede haber URLs viejas no contempladas.

## 29. OG image y favicon

- **OG image**: `app/opengraph-image.png` (1536×1024, generada con gpt-image-1). Next App Router la detecta automáticamente. Incluye personaje + script "Bonito Sound" sobre blanco.
- **Favicon**: no creado aún. Pendiente. Para crearlo: dropear `app/icon.png` (512×512) — Next lo usa automáticamente para favicon y apple-touch-icon.

## 30. FAQ AIO patrón

Estructura usada en cada página pillar para que Google AI Overviews / Perplexity / ChatGPT puedan extraer respuestas:

```tsx
const faq = [
  {
    q: "¿Cuánto cuesta producir un evento de marca?",
    a: "Depende del formato, el artista y la escala. Las activaciones de marca con música en directo suelen moverse entre 30.000 € y 150.000 €. No damos precio por una web: lo cerramos sobre tu brief real.",
  },
  // …
];

<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}} />

<Faq items={faq} />   // Versión visual collapsible
```

Reglas: respuestas **factuales y autocontenidas** (no requieren contexto del resto de la página). Suelen 2-4 frases. Sin marketing speak.

---

# PARTE VII — OPERACIÓN

## 31. Comandos npm

```bash
# Desarrollo
npm run dev                                  # http://localhost:3000
npm run build                                # producción
npm run start                                # servir build
npm run typecheck                            # tsc --noEmit
npm run lint                                 # next lint

# Generación de imágenes
npm run generate-images                      # todas pendientes (OPENAI_API_KEY en env)
npm run generate-images:local                # carga .env.local (Node --env-file)

# Filtros del script
node scripts/generate-images.mjs --only=<id> --force
node scripts/generate-images.mjs --category=web | banco
```

## 32. Generación de imágenes paso a paso

### Si tienes red abierta a `api.openai.com`

```bash
# 1. Confirmar entorno
echo $OPENAI_API_KEY    # debe tener una sk-... real
curl -sS -o /dev/null -w "%{http_code}" https://api.openai.com/v1/models -H "Authorization: Bearer $OPENAI_API_KEY"
# debe devolver 200

# 2. Pre-flight con 1 imagen barata
node scripts/generate-images.mjs --only=seccion-eventos --force

# 3. Revisar el resultado
# Abre public/img/secciones/eventos.png. Si encaja, sigue. Si no, ajusta el prompt.

# 4. Lanzar todas las pendientes
npm run generate-images

# 5. Inspección manual
# Abre /banco-visual en el preview de Vercel para ver todo el banco junto.

# 6. Si alguna no encaja, ajusta su prompt en scripts/manifest.mjs y relanza:
node scripts/generate-images.mjs --only=<id> --force

# 7. Commit y push
git add public/img app/opengraph-image.png
git commit -m "Genera imágenes restantes (heros + casos + banco)"
git push
```

### Si la red está bloqueada (caso actual)

Recrear el entorno de Claude Code on the web con network policy abierta. Documentación: https://code.claude.com/docs/en/claude-code-on-the-web

## 33. Descarga de assets reales

### Windows (PowerShell)

```powershell
cd "<ruta>\bonitosound"
git pull
Set-ExecutionPolicy -Scope Process Bypass -Force
.\bonitosound-cowork\download-bonito-assets.ps1
git add public/img
git commit -m "Descarga assets reales"
git push
```

### Mac/Linux

```bash
cd <ruta>/bonitosound
git pull
bash scripts/download-bonito-assets.sh
git add public/img
git commit -m "Descarga assets reales"
git push
```

Ambos scripts son **idempotentes** — saltan archivos que ya existen. Si Absolut falló por rate limit, basta re-ejecutar (esperar unos minutos primero).

## 34. Variables de entorno (seguridad)

### `.env.example` (commiteado, solo placeholders)

```bash
# Backend de formularios (Resend o Formspree). Decisión pendiente con Víctor.
NEXT_PUBLIC_FORM_ENDPOINT=
RESEND_API_KEY=

# Analytics — decisión Víctor (Vercel + Plausible o GA4)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=

# Generación de imágenes — uso build-time, NUNCA expuesto al navegador.
OPENAI_API_KEY=
```

### Reglas innegociables (repo público)

1. **`.env.example` se commitea** con valores VACÍOS. Es la plantilla.
2. **`.env.local` NO se commitea** (está en `.gitignore` vía `.env*` + `!.env.example`).
3. **`OPENAI_API_KEY` real va en**:
   - **Vercel**: variables de entorno del proyecto (encriptadas server-side). Pero **el script no se ejecuta en Vercel runtime** → no es necesario.
   - **Local**: `.env.local` con `OPENAI_API_KEY=sk-...`.
   - **Claude Code on the web**: variables del entorno (encriptadas, fuera del repo).
4. **Si una key real toca el repo aunque sea 1 segundo**: revocar inmediatamente, generar nueva. Los bots scrapean GitHub en minutos.

## 35. MCPs disponibles

Servidores MCP que han estado activos en la sesión:

| Servidor | ID prefix | Para qué |
|---|---|---|
| GitHub | `mcp__github__*` | PRs, issues, get_file_contents, list_branches, merge_pull_request, create_pull_request, list_commits |
| Vercel | `mcp__c9e148dd-…__*` | list_deployments, get_deployment_build_logs, web_fetch_vercel_url (salta sandbox), get_access_to_vercel_url |
| Google Drive | `mcp__feddd92d-…__*` | list_recent_files, search_files, download_file_content |
| Notion | `mcp__0d849eb9-…__*` | notion-search, notion-fetch, notion-create-pages |
| Gmail | `mcp__315cefd7-…__*` | search_threads, create_draft, label_message |
| ClickUp | `mcp__4e47244b-…__*` | create_task, get_workspace_hierarchy, etc. |
| Gamma | `mcp__6a87af9e-…__*` | generate, generate_from_template |
| HubSpot | `mcp__a3e4d488-…__*` | get_crm_objects, search_crm_objects |
| Bills/Finanzas | `mcp__ac63beae-…__*` | add_transaction, list_bills |
| Higgsfield/Freepik | `mcp__fb684b32-…__*` | generate_image, generate_video — **NO USAR, consume créditos de Víctor** |

**Importante**: el MCP de Higgsfield/Freepik (`fb684b32-…`) ofrece `generate_image` con modelos como `nano_banana_pro` y `soul_2`. **NO usarlo** salvo orden explícita — consume créditos de la suscripción de Víctor. El usuario quiere `gpt-image-1` de OpenAI vía script.

## 36. Smoke testing con puppeteer

Cuando hace falta verificar visualmente que el preview se ve bien (o capturar para enseñar):

```bash
# Instalar deps si no están
npm install --no-save @sparticuz/chromium puppeteer-core

# Levantar prod server en puerto local
npx next start -p 3300 >/tmp/srv.log 2>&1 &

# Script de captura
cat > _shoot.js <<'EOF'
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

(async () => {
  const exec = await chromium.executablePath();
  const browser = await puppeteer.launch({
    args: chromium.args, executablePath: exec, headless: "shell",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3300/", { waitUntil: "domcontentloaded", timeout: 45000 });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: "/tmp/shot.png", fullPage: true });
  await browser.close();
})();
EOF

node _shoot.js
rm _shoot.js
pkill -f "next start"
```

**Para fetch del Vercel preview real desde sandbox**: usar `mcp__c9e148dd-…__web_fetch_vercel_url` (salta el proxy de allowlist).

## 37. Cómo desplegar a producción

Flujo actual:

```
push a `claude/bonito-sound-web-YDR54`  → Vercel preview deploy automático
push a `main`                            → Vercel producción deploy automático
```

Para mergear feature → main: PR en GitHub → mergear → Vercel detecta push a main → deploy.

Comandos:

```bash
# Desde MCP de GitHub
mcp__github__create_pull_request(base="main", head="claude/bonito-sound-web-YDR54", …)
mcp__github__merge_pull_request(pullNumber=N, merge_method="merge")
```

Verificar estado del deploy:

```bash
mcp__c9e148dd-…__list_deployments(projectId="prj_h3tv8ciNI4zhFknrGwNwaFhxwWoI", teamId="victors-projects-0b646b15")
```

Cada deploy tiene `state`: `BUILDING`, `READY`, `ERROR`, `CANCELED`. Solo cuenta `READY`.

---

# PARTE VIII — HISTORIA Y DECISIONES

## 38. Cronología de commits importantes

```
0b549b6  Inicializa repositorio (rama main vacía)
3e32759  Construye la web completa de Bonito Sound (Next.js 14 + TS + Tailwind)
         → 17 rutas + fichas de artista dinámicas, todas estáticas (~96 kB JS)
         → CMS en Markdown editable sin tocar código
         → Superhéroe en 3 estados (home/records/eventos) por §10.5
         → Jaleo con identidad cromática propia; FAQ AIO + JSON-LD por página
ae550a4  Añade redirects 301 de URLs viejas (WordPress/WPML) y atajos de marca
b66538b  Vira el sistema de diseño a minimalismo con fondo blanco
         → PIVOT: de dark theme a light por petición de Víctor
         → Cambio de tipografía a Fraunces + Geist
174879b  Añade pipeline plug-and-play de assets (logos y fotos)
         → lib/assets.ts con findAsset/findLogo
         → LogoWall pinta <Image> si encuentra el logo, sino texto
f1c37d7  Add files via upload (Víctor: logo + héroe + 6 mockups del brief)
29deef1  Prepara tooling de generación de imágenes con OpenAI (gpt-image-1)
         → scripts/manifest.mjs con 43 entries
         → scripts/generate-images.mjs ejecutor
         → app/banco-visual route noindex
2328a74  Cablea slots de imagen en home, /eventos/marcas y /nosotros
8152b1e  Adopta imágenes generadas (sesión paralela) y refuerza prompts
         → 3 superhéroes + 4 secciones + 1 hero + 1 OG
         → Borradas 3 heros con vignette oscura para regenerar
79f1168  Cablea heros generados a /records y /lab
708d055  Usa el logo oficial en el header del nav
b6a383e  Logo oficial en nav (AVIF), scraper de bonitosound.com, IG por oEmbed
437e540  Add files via upload (Víctor: 10 mockups UI/UX en public/img/UI UX/)
eb89cd2  Afina manifest de imágenes con el lenguaje visual real (mockups UI/UX)
         → Mockups movidos a references/ui-ux/ (fuera de public)
         → STYLE reescrito con paleta real navy+blanco+teal+crema
         → Mockups conectados como refs de gpt-image-1
8a50d59  Aplica frontmatter de artistas con foto+IG, actualiza equipo, script bash
         → 5 .md de artistas con image: + instagram:
         → Equipo actualizado a web actual (Xavi + Cristina)
         → distributionCatalog amplía con D Nácar/AlexDeLion/Marco la Testa
8670094  Excluye bonitosound-cowork/ del typecheck
a81fe20  Add files via upload (Víctor: output de Cowork con manifest + .ps1)
323c231  Descarga fotos artistas, equipo y logos desde bonitosound.com
         → 37 imágenes desde bonitosound.com vía .ps1 en Windows
         → Falta solo Absolut (rate limit Wikimedia)
         → dulze.png: 63.75 MB (problemático)
ed29173  Optimiza imágenes de artistas y equipo (85.9 MB → 1.5 MB)
         → sharp con max width 1200/900, mozjpeg q=82
         → dulze.png: 63.75 MB → 58 KB
2335ce5  MERGE PR #1 a main → producción
5ec6476  Añade CONTEXT.md — handoff completo para sesiones nuevas
5f7560c  MERGE PR #2 a main → CONTEXT.md en raíz
```

## 39. Decisiones de diseño tomadas (con porqué)

### D1. Tipografía Opción B (Fraunces + Geist)

**Decisión**: Opción B del brief = open source, sin coste.
**Por qué**: Restricción §16 del brief — no contratar servicios de pago sin OK de Víctor. La Opción A (PP Editorial New + Söhne) tendría coste de licencia. Fraunces es expressiva (axes WONK/SOFT) y encaja con la sensación "fresh musical playful".

### D2. Sistema claro / blanco (vs el dark inicial)

**Decisión**: pivot completo a tema light con fondo blanco.
**Por qué**: petición explícita de Víctor: "No es el estilo que buscamos, queremos minimalismo, fondo blanco y tipografías divertidas". El sistema dark inicial estaba en línea con el brief literal pero Víctor lo encontró "aburrido". Pivot completo en commit `b66538b`.

### D3. gpt-image-1 (OpenAI) en vez de Freepik MCP

**Decisión**: usar OpenAI gpt-image-1 vía script.
**Por qué**: el MCP de Higgsfield/Freepik (`fb684b32-…`) consume créditos de la suscripción del usuario, lo que es coste. OpenAI con la API key del usuario es facturación directa, controlable. Más predecible y reutilizable.

### D4. Equipo público: Dani + Manu + Xavi + Cristina

**Decisión**: usar el equipo que muestra la web actual.
**Por qué**: el brief decía Júlia Martín, pero cuando Cowork scrapeó la web actual encontró Xavi Julià + Cristina Soler. Como la web actual es más fiable que el brief (que pudo estar desactualizado), usamos Xavi/Cristina. Júlia queda como ⚠ pendiente confirmar.

### D5. Distribución amplía con D Nácar, AlexDeLion, Marco la Testa

**Decisión**: añadir estos 3 al `distributionCatalog`.
**Por qué**: tenían foto en bonitosound.com, indicando que están en el roster. El brief no los mencionaba pero la web actual sí. Por consistencia con el contenido humano descargado.

### D6. Logo oficial AVIF en el nav (no SVG)

**Decisión**: usar `logo-bonito.avif` (el que subió Víctor) con `unoptimized`.
**Por qué**: el SVG descargado de bonitosound.com es la versión "tipográfica" simplificada (solo letras). El AVIF tiene el personaje completo icónico volando, que es lo que pidió Víctor. `unoptimized` porque Next/image no procesa AVIF de entrada para reoptimización.

### D7. Mockups UI/UX en `/references` (no en `/public`)

**Decisión**: mover de `public/img/UI UX/` a `references/ui-ux/` y excluir de tsconfig.
**Por qué**: estar en `/public` los servía públicamente en internet — innecesario y revelador. Como referencias del proceso, viven en `/references` (sí commiteadas, no servidas). Y `scripts/manifest.mjs` apunta ahí para usarlos como input de gpt-image-1.

### D8. PR a `main` con `merge` (no squash, no rebase)

**Decisión**: `merge_method: "merge"`.
**Por qué**: preserva el historial granular de commits (que es valioso para auditar la evolución del proyecto). Para PRs futuros con muchos commits pequeños podría usarse squash. Para este PR #1 mega-feature, merge convencional.

## 40. Cosas que probamos y descartamos

### ❌ Freepik MCP para generar imágenes

Probado al principio. Carga `media_upload` + `generate_image` con modelos `nano_banana_pro`/`soul_2`. **Funciona**, pero **consume créditos de Víctor**. Víctor pidió explícitamente usar gpt-image-1 (OpenAI) en su lugar. Borrado.

### ❌ Scraper de bonitosound.com desde sandbox

`scripts/scrape-bonito.mjs` — crawler Node hecho para scrapear la web actual. **No usado al final** porque el sandbox bloquea `bonitosound.com` (allowlist). Mantenemos el script por si en el futuro el sandbox tiene red abierta, pero el camino real fue Cowork for Chrome.

### ❌ Descargar assets desde el sandbox

Probado `curl` directo desde aquí — devuelve "Host not in allowlist" o 403. La policy de red bloquea hosts no whitelisted. Whitelisted: npm registry, GitHub, Google Fonts. Bloqueados: bonitosound.com, Wikimedia, openai.com, Vercel deploys preview.

### ❌ Vercel CLI deploy desde sandbox

Probado `npx vercel deploy` — pide login interactivo (browser). Sin token y sin reachability al login de Vercel desde el sandbox, no puede completar. La opción correcta: Vercel Git integration (auto-deploy en push). Ya está configurada.

### ❌ Buscar fotos de artistas en Internet abierto

Probado vía Cowork al principio. Decisión: NO buscar fotos sueltas de artistas en Internet (riesgo de derechos y de imágenes incorrectas). Solo descargamos lo que ya está publicado en bonitosound.com (son sus assets autorizados) o en el Instagram oficial (también suyo).

### ❌ Generar fotos AI de artistas

Descartado por regla. Los artistas son personas reales — sus fotos deben ser fotos reales con consentimiento, no AI generadas. Solo generamos ilustraciones del personaje del héroe y abstractas/decorativas.

## 41. Pivots de dirección

### Pivot 1: Diseño dark → light (commit `b66538b`)

Inicial: tema oscuro siguiendo el brief literal (negro azulado, azul Bonito, tipografía editorial sobre dark).
Pivot: light minimalista (blanco, Fraunces serif, mucho aire).
Trigger: Víctor — "queremos minimalismo, fondo blanco y tipografías divertidas".

### Pivot 2: Sin imágenes → con imágenes (commits `f1c37d7`, `437e540`, `323c231`)

Inicial: web pura sin imágenes (texto + SVG inline + placeholders).
Pivot: 38 imágenes reales + 11 generadas. El "look completo" cambió drásticamente.
Trigger: Víctor — "falta básicamente todas las páginas" (se refería a contenido visual, no a páginas faltantes).

### Pivot 3: gpt-image-1 con prompts genéricos → con refs visuales

Inicial: prompts solo con texto, esperando que `gpt-image-1` interpretara el estilo.
Pivot: prompts + refs visuales (logo, héroe, mockups UI/UX) → cohesión garantizada.
Trigger: tras ver los primeros heros con vignette oscura que no encajaban.

### Pivot 4: Júlia Martín → equipo real

Inicial: equipo según brief = Dani + Manu + Júlia.
Pivot: equipo según web actual = Dani + Manu + Xavi + Cristina.
Trigger: Cowork descubrió que la web actual no tiene a Júlia.

## 42. Lecciones aprendidas

1. **El "test de sustitución" funciona**: si reemplazas "Bonito Sound" por "Lighthouse" y el copy sigue funcionando, no es marca, es categoría. Aplica brutalmente.
2. **Plug-and-play assets** ahorra HORAS: que `findAsset` autodetecte por slug es la mejor decisión de arquitectura del proyecto.
3. **Optimizar imágenes ANTES de commitear** — un PNG de 64MB en repo público es una broma. `sharp` con `mozjpeg q=82` es el sweet spot.
4. **Las refs visuales en `gpt-image-1`** mejoran 10× la cohesión vs solo prompts.
5. **No invento URLs, copy ni KPIs**: si no tengo dato real, lo marco como pendiente. La web tiene "Roser Gamonal: rol pendiente" en lugar de inventarlo.
6. **Push a `main` solo con OK explícito**. PR feature → main con merge_pull_request del MCP de GitHub.
7. **Cowork for Chrome es la herramienta correcta para scrape** cuando este sandbox no llega. Le pasas un prompt detallado, opera el navegador del usuario con su sesión, produce manifest + scripts.

---

# PARTE IX — ROADMAP

## 43. Sprint A — Cerrar las imágenes

### A.1 Generar las 32 pendientes con gpt-image-1

**Prerequisitos**:
- Entorno Claude Code on the web con network policy abierta a `api.openai.com`.
- `OPENAI_API_KEY` configurada en env vars del entorno.

**Comandos**:
```bash
npm run generate-images                 # genera todas las que faltan
git add public/img app/opengraph-image.png
git commit -m "Genera heros, casos y banco visual"
git push
```

Estimado: 5-10 minutos. Coste: $3-8.

### A.2 Reintentar Absolut

```powershell
# Windows
.\bonitosound-cowork\download-bonito-assets.ps1
git add public/img/marcas/absolut.svg
git commit -m "Logo Absolut"
git push
```

### A.3 Fotos faltantes catálogo distribución

Artistas en `distributionCatalog` sin foto: Soylapau, Daniel Giró, 96Grados, Kanela, Sotrac, Belbaka, Egon Calle, Rumba Menuda, Fabian, Kenai White, Overpulation.

Opciones:
- Si están en bonitosound.com: añadir URLs al `download-bonito-assets.sh` y re-ejecutar.
- Si no: pedir a Víctor que las recolecte (o búsqueda en su Spotify/Instagram con consentimiento).

### A.4 Logos artistas de gira

Albert Pla, Alfred García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo, Ramon Mirabet, Efecto Pasillo. Estos son artistas externos — sus logos suelen estar en sus webs/Spotify. Pedir a Víctor o buscar.

## 44. Sprint B — Contenido humano

### B.1 Confirmaciones del brief

- **OTEM**: ¿es fichaje nuevo aún sin publicar?
- **Júlia Martín**: ¿se añade como 5ª al equipo? ¿O reemplaza a Xavi/Cristina?
- **Le Souffle**: ¿el restaurante de París? ¿Otro?

### B.2 Instagram

- **6 URLs de @bonito_sound**: pegarlas en `app/page.tsx` reemplazando `<InstagramFeed />` por `<InstagramFeed posts={[…]} />`.
- **2-3 Reels por artista** del roster: pegar en frontmatter `reels:` de cada `.md`.

### B.3 Spotify

Spotify IDs por artista (campo `spotifyArtistId:` en cada `.md`). Buscar en open.spotify.com cada artista, copiar el ID del URL `/artist/<ID>`.

OTEM ya tiene: `382ZStNMRpkdxhvwYgQRaU`.

## 45. Sprint C — Pulido v1.1

- **InstagramFeed dinámico**: cablear con Meta Business API + token para auto-update del feed (no posts manuales).
- **Vídeo del héroe morfeando**: Víctor lo está generando aparte. Cuando esté: `public/video/heroe.mp4` + `<video autoPlay muted loop playsInline>` en el hero de home.
- **Backend de formularios**: Resend o Formspree. Sin esto, los formularios solo abren cliente de correo (mailto).
- **Analytics**: Vercel + Plausible o GA4 (decisión Víctor).
- **Newsletter**: Buttondown/Beehiiv si Víctor + Dani confirman compromiso editorial.
- **Llenar `/diario`**: 2-3 publicaciones iniciales sobre fichajes, eventos.
- **Revisión jurídica**: `/aviso-legal` y `/privacidad` placeholder hasta revisión.
- **Lighthouse audit ≥95**: Pilar 1 técnico del brief. Cuando todo el contenido esté, correr Lighthouse y optimizar lo que baje.
- **Favicon**: crear `app/icon.png` (512×512, basado en pez del logo).

## 46. Sprint D — Migración real (go-live)

- **Validar redirects 301** contra el sitemap real de WordPress. Listar todas las URLs que tenía la web vieja (vía sitemap.xml o crawler), comprobar que cada una mapea a una URL nueva válida vía `next.config.mjs:redirects`.
- **Conectar dominio bonitosound.com a Vercel**: DNS apunte. Vercel emite cert SSL.
- **Submit sitemap a Search Console**: `bonitosound.com/sitemap.xml`.
- **Migrar Analytics** si había en WordPress.
- **Go-live formal**: Víctor + Dani aprueban → switch DNS → bonitosound.com sirve la nueva web.

## 47. Roadmap §15 del brief original (Fases 0-7)

Fases del brief Vs. estado actual:

- **Fase 0** — Cierre decisiones con Víctor (§17 del brief) → ✅ Mayoría tomadas.
- **Fase 1** — Research y recopilación → ✅ Hecho (vía Cowork).
- **Fase 2** — Copy refinado por página → ✅ Hecho.
- **Fase 3** — Sistema de diseño finalizado → ✅ Hecho.
- **Fase 4** — Scaffolding técnico → ✅ Hecho (Next.js + Vercel).
- **Fase 5** — Construcción → ✅ Hecho (web entera).
- **Fase 6** — QA y revisión → ⏳ Pendiente (Lighthouse, mobile real, panel UX).
- **Fase 7** — Go live → ⏳ Pendiente (DNS, redirects, Search Console).

---

# PARTE X — REFERENCIAS

## 48. Glosario

- **Brief maestro**: documento .md de 32k que subió Víctor inicialmente. Toda la info estratégica del proyecto.
- **Big idea**: "Superhéroes culturales en un sector que opera por WhatsApp."
- **Test de sustitución (Risto)**: cambiar "Bonito Sound" por otro nombre — si funciona, el copy es genérico.
- **Verticales**: las 5 líneas de negocio (Records, Eventos, Jaleo, Lab, Producciones).
- **Roster booking**: 6 artistas que Bonito lleva en booking + management (OTEM, Sa Pena, Nàtura, Dulze, Paule, Eva Calyza).
- **Catálogo distribución**: ~21 artistas que distribuyen con Bonito (incluye roster + extras).
- **Tour artists**: artistas externos a los que Bonito ha llevado de gira (Albert Pla, Maldita Nerea, etc.).
- **Lead magnet**: módulo interactivo que captura leads (los 2 quizzes).
- **AIO**: AI Overviews / búsqueda generativa. Optimización para que IAs (Google AI, Perplexity, ChatGPT) extraigan respuestas de FAQs.
- **Slug**: nombre filename-safe en minúsculas con guiones (`pernod-ricard`).
- **Plug-and-play assets**: filosofía de `lib/assets.ts` — drop file con slug correcto → aparece solo en web.
- **Cowork for Chrome**: extensión de navegador que automatiza el navegador del usuario. La usamos para scrapear bonitosound.com.

## 49. Cómo retomar (paso a paso)

**Al abrir sesión nueva de Claude Code on the web sobre este repo:**

1. **Lee `CONTEXT.md`** entero (este archivo). 10 minutos.
2. Mira el último commit y orientarse:
   ```bash
   git log --oneline | head -15
   git status
   ```
3. Comprueba que compila:
   ```bash
   npm install
   npm run typecheck && npm run build
   ```
4. Si Víctor pide algo, busca en §43-46 (roadmap) si ya está mapeado.
5. Si vas a generar imágenes:
   - `echo $OPENAI_API_KEY` debe tener valor.
   - `curl -sS -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models` debe ser 200.
   - Si 403 → network policy bloqueada → recrear entorno con policy abierta.
6. Si vas a editar páginas:
   - Respeta el tono (§23 — lista negra).
   - Sistema de diseño (§5).
   - `npm run typecheck && npm run lint && npm run build` antes de commit.
7. **NUNCA commit directo a `main`** (salvo correcciones triviales con OK Víctor). Trabaja en `claude/bonito-sound-web-YDR54` o rama nueva, abre PR, mergea.

## 50. Troubleshooting común

### "Host not in allowlist" / 403 al usar curl/fetch

El sandbox bloquea hosts no whitelisted. Soluciones:
- Si es `api.openai.com`: recrear el entorno con network policy abierta.
- Si es `bonitosound.com` o Wikimedia: usar Cowork for Chrome (extensión) o ejecutar en local.
- Si es un Vercel deploy: usar `mcp__c9e148dd-…__web_fetch_vercel_url` (salta el proxy).

### Logo del nav se ve raro

El AVIF de `logo-bonito.avif` es el oficial completo. Si se ve mal, verifica:
- `<Image>` tiene `unoptimized` prop (Next no procesa AVIF de entrada).
- `width` y `height` proporcionales al aspect ratio real del personaje.
- `className="h-X w-auto"` para que la altura mande.

### Build falla con TypeScript

Si el error viene de `bonitosound-cowork/`, `references/` o `scraped/` — esas carpetas DEBEN estar en `tsconfig.json:exclude`. Verifica que están.

### Imágenes muy grandes commiteadas

GitHub avisa con >50MB. Si una se cuela:
1. Optimizarla con sharp ANTES de commitear (ver §14).
2. Si ya está en historial, hay opciones (rewrite history con BFG) pero suelen ser destructivas. Pregunta antes.

### Cambios no se ven en el preview de Vercel

1. Verifica que el push llegó: `git log origin/<rama> --oneline | head`.
2. Verifica que Vercel ha terminado: `mcp__c9e148dd-…__list_deployments` — busca `state: "READY"` con el sha esperado.
3. Hard refresh del browser (Cmd+Shift+R) o incógnito.
4. Si sigue mal: revisa logs del build con `mcp__c9e148dd-…__get_deployment_build_logs`.

### El feed de Instagram no muestra posts

El `<InstagramFeed>` actual usa oEmbed con `embed.js`. Si no muestra:
- Verificar que `posts={[…]}` tiene URLs válidas en formato `https://www.instagram.com/p/<id>/`.
- Esperar 1-2 segundos para que `embed.js` cargue.
- Probar en incógnito (Instagram puede bloquear si tienes mucha actividad sospechosa en tu sesión).

## 51. Cosas que NUNCA hacer

1. ❌ **NUNCA committear API keys reales** en ningún archivo, ni siquiera en `.env.example` (que se commitea).
2. ❌ **NUNCA push a `main` sin PR** (salvo correcciones triviales con OK Víctor).
3. ❌ **NUNCA inventar copy que pase el test de sustitución de Risto** (si funciona con otro nombre, está mal).
4. ❌ **NUNCA usar palabras de la lista negra**: "transformamos", "elevamos", "potenciamos", "soluciones integrales", "innovador", "líder", "en un mundo donde…".
5. ❌ **NUNCA inventar KPIs falsos** en casos de marca. Mejor "Producción end-to-end coordinada por un solo equipo" que "+47% engagement".
6. ❌ **NUNCA generar fotos AI de personas reales** (artistas, equipo). Solo ilustraciones del personaje del héroe.
7. ❌ **NUNCA usar el MCP de Freepik/Higgsfield** para generar imágenes (consume créditos de Víctor).
8. ❌ **NUNCA subir fotos de terceros sin verificar permisos**. Solo bonitosound.com (sus assets) o @bonito_sound (su IG).
9. ❌ **NUNCA borrar archivos sin pedir confirmación** — preserva el trabajo del usuario.
10. ❌ **NUNCA commit imágenes >5MB sin optimizarlas primero** con sharp.

## 52. Recetas: cómo añadir cosas

### Añadir un artista nuevo al roster

1. **Crear** `content/artistas/<slug>.md`:
   ```yaml
   ---
   name: "Nombre Artista"
   genre: "Género"
   tier: "booking"
   spotifyArtistId: ""
   instagram: ""
   image: ""
   reels: []
   ---
   Bio en tono canalla. 2-3 párrafos.
   ```
2. **Dropear foto** en `public/img/artistas/<slug>.jpg` (optimizar antes con sharp si >500KB).
3. (Opcional) Si el slug coincide con `assetSlug(name)` de `distributionCatalog`, ya aparece en LogoWall. Si no, añadir al `distributionCatalog` en `lib/site.ts`.
4. Build + commit + push.
5. La ficha automática estará en `/artistas/<slug>` (gracias a `generateStaticParams`).

### Añadir un caso de estudio

1. **Crear** `content/casos/<slug>.md`:
   ```yaml
   ---
   brand: "Nombre Marca"
   title: "Titular del caso"
   context: "Qué se hizo"
   result: "Resultado cualitativo (no KPIs fabricados)"
   year: "2024"
   ---
   ```
2. **Dropear cabecera** en `public/img/casos/<slug>.png` (generada con `gpt-image-1` o foto real con permisos).
3. Aparece automáticamente en el grid de casos de `/eventos/marcas`.

### Añadir una página nueva

1. Crear `app/<ruta>/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import { Section, Heading, Eyebrow, Cta, Faq, JsonLd } from "@/components/ui";
   import { site } from "@/lib/site";

   export const metadata: Metadata = {
     title: "Título",
     description: "…",
     alternates: { canonical: `${site.url}/<ruta>` },
   };

   export default function MiPagina() {
     return (
       <>
         <section className="border-b border-subtle">
           <div className="wrap py-24 md:py-32">
             …
           </div>
         </section>
       </>
     );
   }
   ```
2. (Opcional) Añadir al `nav` en `lib/site.ts` si va en menú principal.
3. (Opcional) Añadir al `sitemap.ts` para que aparezca en sitemap.xml.

### Añadir un redirect 301

Editar `next.config.mjs`:
```js
{ source: "/url-vieja", destination: "/url-nueva", statusCode: 301 }
```

### Cambiar copy de una sección

Edita directamente el `page.tsx` correspondiente. Mantén:
- Tono canalla (§23).
- Verbos concretos.
- Sin lista negra.
- Si añades una FAQ, mete también el Schema.org `FAQPage`.

## 53. Contactos

| Persona | Rol | Contacto |
|---|---|---|
| Víctor Torres | Head of Marketing Artiverse, socio operativo | victortorresa94@gmail.com |
| Dani Boada | Fundador Bonito Sound | A través de Víctor |
| Manu Rojo | Cofundador, project + booking | A través de Víctor |

**Aprobación del go-live final** = Víctor + Dani. La web NO se publica en bonitosound.com sin esa pasada.

---

## Fin del documento

Este documento se actualiza cuando hay decisiones nuevas o cambios estructurales. Si te encuentras algo que contradice esto, **pregunta antes de moverlo**. El proyecto es bastante denso y muchas decisiones tienen contexto que no es obvio del código.

**Última actualización**: 24 may 2026. Última sesión Claude: claude-opus-4-7[1m] con context window 1M.
