# CONTEXT — Bonito Sound Web (handoff entre sesiones de Claude Code)

> Este documento es la fuente de verdad para retomar el proyecto en una sesión nueva. Léelo entero antes de tocar nada. Última actualización: 24 may 2026.

---

## 1. TL;DR (lee esto primero)

**Qué**: rediseño completo de bonitosound.com en Next.js 14 + TypeScript + Tailwind. Web de 17 rutas únicas + 6 fichas dinámicas de artista, ya en producción.

**Producto**: agencia musical Bonito Sound (Sabadell). Cinco verticales en un ecosistema: Records (sello/booking/management/distribución), Eventos (activaciones de marca + giras), Jaleo Sound (festival propio en Amsterdam), Lab (Artiverse + Giraverse), Producciones.

**Cliente final**: Dani Boada (fundador). **Interlocutor operativo**: Víctor Torres (Head of Marketing, Artiverse).

**Brief maestro**: existió como `briefbonitosoundmaestro.md` (subido al primer chat por Víctor). Toda la info clave del brief está internalizada en este documento; no es indispensable para retomar.

**Estado**:
- ✅ Web completa construida y en producción (sitemap §8 del brief al 100%).
- ✅ Sistema de diseño minimalista blanco aplicado.
- ✅ Logo oficial cableado en nav, AVIF.
- ✅ 38 fotos/logos reales descargados desde bonitosound.com (artistas, equipo, marcas, instituciones).
- ✅ 11 ilustraciones generadas con gpt-image-1 (superhéroes, secciones, hero eventos/marcas, OG).
- ✅ 2 lead magnets interactivos funcionando (marcas + artistas).
- ✅ Schema.org JSON-LD por página, FAQ AIO, sitemap.xml dinámico, redirects 301 desde URLs WordPress viejas.
- ✅ PR #1 mergeado a `main` → Vercel producción.

**Pendiente principal**:
- 3 heros (`nosotros`/`lab`/`records`), 3 casos, 28 imágenes del banco visual — generar con gpt-image-1.
- Logo Absolut (falló por rate limit Wikimedia — reintentar el .ps1).
- 6 URLs del feed de @bonito_sound para la home (necesita Víctor).
- Reels de IG por artista del roster (necesita Víctor).
- Confirmaciones del brief: OTEM existe, Júlia Martín vs equipo actual, Le Souffle, etc.

---

## 2. URLs y accesos

| Recurso | URL |
|---|---|
| Repo | https://github.com/victortorresa94-del/bonitosound |
| Producción (main) | https://bonitosound.vercel.app |
| Preview activo del PR | https://bonitosound-git-claude-bonito-5a3984-victors-projects-0b646b15.vercel.app |
| Web actual (WordPress, a sustituir) | https://bonitosound.com |
| Festival satélite | https://jaleosound.com |
| Hermana Lab | https://artiverse.es |
| Instagram | https://instagram.com/bonito_sound |
| Vercel project ID | `prj_h3tv8ciNI4zhFknrGwNwaFhxwWoI` |
| Vercel team slug | `victors-projects-0b646b15` |

**Email Víctor**: victortorresa94@gmail.com

---

## 3. Ramas y PRs

| Rama | Estado | Para qué |
|---|---|---|
| `main` | Producción. Mergeado el PR #1 (sha `2335ce5`). | Lo que ve el mundo. |
| `claude/bonito-sound-web-YDR54` | Rama principal de trabajo. Vive activa. | Cambios diarios. |
| `claude/pensive-bardeen-S1fO5` | Sesión paralela que generó imágenes vía gpt-image-1. | Histórica — los assets ya están en la rama principal. |

PR #1 (mergeado) llevó toda la web a main. Para próximos cambios: PR sobre `claude/bonito-sound-web-YDR54` y luego mergear a `main`, o directos a `main` si son pequeños.

---

## 4. Stack técnico

- **Framework**: Next.js 14.2.35 (App Router) + TypeScript estricto.
- **Estilos**: Tailwind CSS + CSS variables (`app/globals.css`).
- **Tipografía**:
  - Display: **Fraunces** variable (axes `SOFT` + `WONK` + `opsz`) — serif con carácter (vía `next/font/google`).
  - Body: **Geist Sans** (paquete `geist`).
  - Decisión: Opción B del brief (open source, sin coste).
- **CMS**: Markdown con `gray-matter`. Sin headless CMS — cada artista/caso/show es un `.md` editable.
- **Imágenes**: `next/image` con AVIF/WebP. `unoptimized` solo para AVIF de entrada.
- **Motion**: animaciones CSS en `globals.css` (`stagger`, `reveal-up`, `fade-in`). `prefers-reduced-motion` respetado.
- **Hosting**: Vercel (Git integration auto-deploy).
- **Node**: 22 (usamos `--env-file` nativo, FormData/fetch nativos para script de OpenAI).
- **Image gen runtime**: `sharp` (solo dev, no en producción) para optimizar al commitear.

---

## 5. Estructura del repo

```
bonitosound/
├── app/                          Rutas Next.js (App Router)
│   ├── eventos/{marcas,giras}/
│   ├── records/{sello,booking-management,distribucion}/
│   ├── artistas/{[slug]/}        Ficha dinámica
│   ├── lab/{artiverse,giraverse}/
│   ├── jaleo-sound/              Identidad roja propia
│   ├── nosotros/                 Equipo + membresías
│   ├── agenda/                   Schema.org Event
│   ├── diario/                   Vacío v1
│   ├── contacto/                 Form segmentado
│   ├── banco-visual/             Galería noindex de extras generados
│   ├── aviso-legal/  privacidad/
│   ├── opengraph-image.png       OG social (1536×1024, generada)
│   ├── globals.css               Variables + componentes Tailwind
│   ├── layout.tsx                Fonts + JSON-LD Organization
│   ├── page.tsx                  Home (9 secciones)
│   ├── not-found.tsx             404
│   ├── robots.ts  sitemap.ts     Metadata routes
│
├── components/
│   ├── Nav.tsx                   Header con logo AVIF oficial
│   ├── Footer.tsx
│   ├── Superhero.tsx             Fallback SVG ↔ PNG generado por estado
│   ├── LogoWall.tsx              Detecta logo en /public/img/<dir>/, sino texto
│   ├── LeadMagnetBrands.tsx      Quiz interactivo /eventos/marcas
│   ├── LeadMagnetArtists.tsx     Quiz interactivo /records
│   ├── ContactForm.tsx           Form segmentado (Marca/Artista/Promotor/…)
│   ├── Embeds.tsx                YouTube, Spotify, InstagramFeed (oEmbed)
│   ├── ui.tsx                    Section, Heading, Cta, Faq, JsonLd, Eyebrow
│
├── content/                      CMS Markdown
│   ├── artistas/                 .md por artista (slug = nombre fichero)
│   ├── casos/                    Ballantine's, Pernod Ricard, Gira 1016
│   ├── agenda/                   Empty .gitkeep (cada show un .md)
│
├── lib/
│   ├── site.ts                   Data central: nav, team, brands, memberships,
│   │                             support, distributionCatalog, tourArtists
│   ├── content.ts                getArtists/getArtist/getCases (gray-matter)
│   ├── agenda.ts                 getShows
│   ├── assets.ts                 findAsset(dir, slug), findLogo(dir, name),
│                                 assetSlug(name) — sistema plug-and-play
│
├── public/img/                   Todos los assets visuales
│   ├── marca/                    logo + héroe + mockups del brief + superhéroes
│   │                             generados (superheroe-{home,records,eventos}.png)
│   ├── artistas/                 Fotos reales descargadas (10 + faltan ~13)
│   ├── equipo/                   Dani, Manu, Xavi, Cristina (jpg)
│   ├── marcas/                   Logos marcas clientes (13, falta Absolut)
│   ├── instituciones/            UFI/SGAE/AGEDI/ARTE/AEDEM/EMC
│   ├── apoyos/                   Plan Recup. UE, Institut Llull, Unión Europea
│   ├── giras/                    Por hacer (logos artistas de gira)
│   ├── secciones/                4 iconos generados (eventos/records/lab/jaleo)
│   ├── heros/                    1 hero generado (eventos-marcas). Faltan 3.
│   ├── casos/                    Vacío. Faltan 3.
│   ├── banco/                    Extras navegables en /banco-visual. Vacío.
│
├── scripts/
│   ├── manifest.mjs              43 entries para gpt-image-1 con prompts + refs
│   ├── generate-images.mjs       Ejecutor que llama a OpenAI Images API
│   ├── download-bonito-assets.sh Bash: descarga 38 imágenes reales (Mac/Linux)
│   └── scrape-bonito.mjs         Crawler de bonitosound.com (no usado al final)
│
├── references/ui-ux/             10 mockups UI/UX de Víctor (estilo target)
│                                 Excluidos de tsconfig — solo referencia visual.
│
├── bonitosound-cowork/           Output de la sesión de Cowork:
│   ├── HANDOVER.md               Guía de 6 pasos
│   ├── download-bonito-assets.ps1 Versión PowerShell del .sh
│   ├── manifest.json             URLs reales → slugs
│   ├── artistas-frontmatter-snippets.md  YAML por artista
│   ├── page-tsx-snippet.tsx      <InstagramFeed posts={...}/> con placeholders
│   └── pr-comment.md
│
├── .env.example                  Placeholder de OPENAI_API_KEY (NUNCA real key)
├── .gitignore                    .env* ignorado salvo .env.example
├── next.config.mjs               Redirects 301 + Image config
├── tailwind.config.ts            Colores vinculados a CSS vars
├── tsconfig.json                 Excluye node_modules, bonitosound-cowork,
│                                 references, scraped
└── package.json                  Scripts npm
```

---

## 6. Sistema de diseño

### Paleta (CSS variables en `app/globals.css`)

```css
--bg-primary:     #ffffff   /* Blanco base */
--bg-secondary:   #f6f5f1   /* Off-white cálido */
--bg-tertiary:   #efede7   /* Beige claro para placeholders */

--accent-blue:        #1b6ee6   /* Azul Bonito — primary action */
--accent-blue-hover:  #1559c4
--accent-warm:        #ff5a1f   /* Naranja cálido — herencia Jaleo. Muy contenido */
--accent-warm-soft:   #ffb47a
--jaleo-red:          #e8351f   /* Solo en /jaleo-sound, identidad propia */

--text-primary:    #0b0f14   /* Casi negro */
--text-secondary:  #51565f
--text-muted:      #8b8f98

--border-subtle:   rgba(11,15,20,0.1)   /* Bordes finos imperceptibles */
```

Paleta secundaria mencionada en prompts gpt-image-1 (teal + cream):
- Teal: `#1FB89A`
- Cream: `#F8EFD8`
- Amber: `#F5A623`

### Tipografía

```css
.display { font-family: var(--font-display) }   /* Fraunces, axes SOFT/WONK/opsz */
body     { font-family: var(--font-body) }     /* Geist Sans */
```

Display Fraunces se usa en `<Heading>`, `<h1>`, eyebrows, números grandes. Body Geist en todo lo demás.

### Componentes utilitarios (Tailwind)

```css
.wrap         /* mx-auto max-w-content (1240px) px-6 md:px-10 */
.eyebrow      /* texto pequeño en mayúsculas tracking-[0.2em] azul */
.btn          /* pill */
.btn-primary  /* fondo text-primary, hover azul */
.btn-ghost    /* outline */
.card         /* borde fino, transparente, hover oscurece borde */
.link-underline /* underline animado al hover */
.stagger > *  /* reveal-up con animation-delay incremental */
```

### Filosofía

Editorial musical fresca, minimalista pero con vida. Mucho aire, bordes finos. Mezcla blanco + bloques navy/jaleo según sección. Decoración tipo confetti (estrellas, notas, ondas) en las ilustraciones generadas. No corporativo plano.

---

## 7. Sitemap completo (§8 del brief — 100% implementado)

| Ruta | Tipo | Notas |
|---|---|---|
| `/` | Home | 9 secciones, hero con superhéroe, marcas, roster, Jaleo, Lab, equipo, IG |
| `/eventos` | Índice | Marcas + giras + vídeo gira 1016 |
| `/eventos/marcas` | Pillar B2B ⭐ | Lead magnet 4 preguntas, casos, servicios, FAQ AIO. **La que vende.** |
| `/eventos/giras` | Pillar tour mgmt | Logos artistas + YouTube embed + FAQ |
| `/records` | Índice | Lead magnet quiz 6 preguntas, servicios, roster, distribución, FAQ |
| `/records/sello` | Pillar SEO | FAQ AIO |
| `/records/booking-management` | Pillar SEO | Booking Engine + Management |
| `/records/distribucion` | Pillar SEO | Catálogo + FAQ |
| `/artistas` | Roster | Cards con foto, link a ficha |
| `/artistas/[slug]` | Ficha dinámica | 6 fichas: otem, sa-pena, natura, dulze, paule, eva-calyza |
| `/lab` | Lab índice | Artiverse + Giraverse |
| `/lab/artiverse` | Pillar SEO Artiverse | FAQ + CTA |
| `/lab/giraverse` | Coming soon | Email capture |
| `/jaleo-sound` | Festival | **Identidad roja propia** + Spotify playlist embed |
| `/nosotros` | Equipo + membresías | 4 personas con foto, logos institucionales |
| `/agenda` | Próximos shows | Empty state + Schema.org Event preparado |
| `/diario` | Blog | Empty state v1 |
| `/contacto` | Form segmentado | Marca/Artista/Promotor/Prensa/Otro |
| `/banco-visual` | **noindex** | Galería de imágenes generadas para revisión |
| `/aviso-legal`, `/privacidad` | Legal | Placeholder hasta revisión jurídica |
| `/sitemap.xml` | Generado | 23 URLs (incluye fichas dinámicas) |
| `/robots.txt` | Generado | Permite todo salvo legal |

**Redirects 301** (`next.config.mjs`): atajos de marca (`/artiverse` → `/lab/artiverse`), slugs WordPress viejos (`/quienes-somos`, `/booking`, `/sello`…), prefijos WPML `/ca/*` y `/es/*` flat.

---

## 8. Sistema de assets plug-and-play (CLAVE)

### Cómo funciona

`lib/assets.ts` exporta:

```ts
assetSlug(name: string) → string   // "Ballantine's" → "ballantines"
findAsset(dir, slug) → string | null   // detecta /public/img/<dir>/<slug>.{svg,webp,png,jpg,jpeg,avif}
findLogo(dir, name) → string | null    // slugifica el name antes de buscar
```

### Componentes que lo consumen

- **LogoWall** (`components/LogoWall.tsx`): si encuentra el logo lo pinta como `<Image>`, sino texto fallback. Usado en marcas, instituciones, apoyos, distributionCatalog, tourArtists.
- **Superhero** (`components/Superhero.tsx`): si existe PNG `marca/superheroe-{state}.png` lo usa, sino dibuja SVG inline.
- **Páginas con findAsset directo**: home (verticales secciones), `/eventos/marcas` (hero + casos), `/nosotros` (hero + equipo), `/records` (hero), `/lab` (hero), `/artistas/[slug]` (foto), `/artistas` (roster grid).

### Convención de carpetas y slugs

| Carpeta | Slugs esperados | Cómo se generan |
|---|---|---|
| `/img/marca/` | `logo-bonito.{svg,avif,png}`, `superheroe-{home,records,eventos}.png`, `heroe-volando.jpeg`, `heroe-megafono.jpeg`, `mockup-01..06.png` | Reales + generados |
| `/img/artistas/` | `<slug>.<ext>` = slug del .md (otem, sa-pena, natura, dulze, paule, eva-calyza) + catálogo distribución | Reales (descarga) |
| `/img/equipo/` | `dani-boada.jpg`, `manu-rojo.jpg`, `xavi-julia.jpg`, `cristina-soler.jpg` | Reales |
| `/img/marcas/` | `ballantines.png`, `pernod-ricard.svg`, `pepsico.svg`, `absolut.svg`, `schweppes.png`, etc. | Reales |
| `/img/instituciones/` | `ufi.png`, `sgae.png`, etc. | Reales |
| `/img/apoyos/` | `plan-de-recuperacion-ue.svg`, `institut-ramon-llull.png`, `union-europea.svg` | Reales |
| `/img/secciones/` | `eventos.png`, `records.png`, `lab.png`, `jaleo.png` | Generadas |
| `/img/heros/` | `eventos-marcas.png`, `nosotros.png`, `lab.png`, `records.png` | Generadas |
| `/img/casos/` | `ballantines.png`, `pernod-ricard.png`, `gira-1016.png` (slug del .md) | Generadas |
| `/img/banco/` | Cualquier extra navegable en `/banco-visual` | Generadas |
| `/img/giras/` | `albert-pla.png`, `alfred-garcia.png`, etc. | Por hacer |

**Regla de oro**: drop el fichero con el slug correcto en la carpeta correcta → aparece solo en la web sin tocar código.

---

## 9. Imágenes generadas con gpt-image-1

### Setup

- Script: `scripts/generate-images.mjs` (lee `OPENAI_API_KEY` de `process.env`).
- Manifest: `scripts/manifest.mjs` con 43 entries (15 web + 28 banco).
- Cada prompt pasa como referencias visuales: el logo (`logo-bonito.avif`), los héroes (`heroe-volando.jpeg`, `heroe-megafono.jpeg`) y los mockups UI/UX de Víctor — para cohesión.
- Endpoint usado: `POST /v1/images/edits` con multipart (cuando hay refs) o `/v1/images/generations` (cuando no).
- `STYLE` constant en `manifest.mjs` con la paleta exacta y "MANDATORY: pure flat white background, NO vignette" tras corregir 3 heros que salían con dark vignette.

### Generadas hasta ahora (11)

- `marca/superheroe-{home,records,eventos}.png`
- `secciones/{eventos,records,lab,jaleo}.png`
- `heros/eventos-marcas.png`
- `app/opengraph-image.png`
- (`marca/logo-bonito.png` la generó la sesión paralela como variante PNG)

### Pendientes de generar (32)

3 heros (`nosotros`/`lab`/`records` — fueron borrados por vignette, hay que regenerar con prompts ya endurecidos)
+ 3 casos (`ballantines`/`pernod-ricard`/`gira-1016`)
+ 28 banco (variantes de héroe en distintas poses, motivos abstractos, gente disfrutando música como silueta, jaleo gastro, lab tech, fondos para CTAs)

### Para retomar la generación

Requisitos:
1. `OPENAI_API_KEY` en `process.env` (en el entorno de Claude Code on the web) o en `.env.local` local.
2. Red abierta a `api.openai.com` (este entorno por defecto la bloquea; **hay que recrear el entorno con network policy abierta**).

Comandos:
```bash
npm run generate-images                       # todas las que faltan (idempotente)
npm run generate-images -- --only=hero-nosotros --force   # una sola, forzando
npm run generate-images -- --category=banco               # solo banco
```

Modelo: `gpt-image-1`. Quality medium (≈$0.04/img) para banco, high para OG.

---

## 10. Imágenes reales (descargadas desde bonitosound.com)

### Origen

Cowork (extensión de Chrome con web fetch) scrapeó bonitosound.com y produjo el output en `bonitosound-cowork/`:
- `manifest.json` con 38 URLs reales → slugs.
- `download-bonito-assets.ps1` (Windows) y mi versión bash `scripts/download-bonito-assets.sh` (Linux/Mac).

Víctor lo ejecutó en su PC Windows. Las 38 imágenes están en producción.

### Optimización

Se descargaron crudas (algunas de 64 MB). Las optimicé con `sharp`:
- Width max 1200px artistas / 900px equipo.
- JPEG mozjpeg quality 82, WebP quality 82.
- Total: **85.9 MB → 1.5 MB**.

Si en el futuro caen imágenes nuevas grandes, optimízalas igual antes de commitear.

### Pendiente

- **Absolut**: falló por rate limit Wikimedia (429). Reintentar el .ps1 — pillará solo esa URL (es idempotente).
- **Logos de marcas que no estaban en bonitosound.com**: pueden añadirse de Wikimedia Commons si faltan (Le Souffle, etc.).
- **Fotos artistas catálogo distribución**: Soylapau, Daniel Giró, 96Grados, Kanela, Sotrac, Belbaka, Egon Calle, Rumba Menuda, Fabian, Kenai White, Overpulation — algunos en bonitosound.com, otros no.
- **Logos artistas de gira** (Albert Pla, Alfred García, Antonio Orozco, Maldita Nerea, Ruth Lorenzo, Ramon Mirabet, Efecto Pasillo).

---

## 11. Data central (`lib/site.ts`)

```ts
site = { name, legalName, cif: "B10805299", founded: 2022, url, description,
         address (Carrer Tulancingo 4, 08206 Sabadell, Barcelona),
         phone "+34 656 865 545",
         emails { general: "bonito@bonitosound.com", booking: "sonabonito@bonitosound.com" },
         social, external (jaleo, artiverse, youtubeSantJordi, spotifyJaleoPlaylist) }

nav   = [Eventos, Records, Lab, Jaleo Sound, Nosotros, Agenda]

team  = [
  { Dani Boada, Fundador, ... },
  { Manu Rojo, Cofundador, ... },
  { Xavi Julià, Producción, ... },        ← actualizado según web actual
  { Cristina Soler, Comunicación, ... },  ← actualizado según web actual
]   ⚠ El brief decía Júlia Martín en lugar de Xavi/Cristina. CONFIRMAR.

memberships = [UFI, SGAE, AGEDI, ARTE, AEDEM, European Music Council]
support     = [Institut Ramon Llull, Plan de Recuperación UE, Ministerio Cultura,
               Instituto Cervantes, Embajada España Holanda, AIE, Stadsdeel Amsterdam]
brands      = [17 marcas: Ballantine's, Pernod Ricard, Pepsico, Schweppes, Absolut,
               Font Vella, Four Roses, Le Souffle, Universal, Gestmusic, Concert
               Studio, GTS Global Talent Services, Sweet Bird, Código 1530,
               Lighthouse, Corre Lola Corre, Sr. Wilson]
tourArtists = [Albert Pla, Alfred García, Antonio Orozco, Maldita Nerea,
               Ruth Lorenzo, Ramon Mirabet, Efecto Pasillo]
distributionCatalog = [21 artistas, incluye nuevos D Nácar, AlexDeLion,
                       Marco la Testa añadidos desde la web actual]
```

---

## 12. Brief maestro — esencias

(Si necesitas más detalle, el brief original es enorme — pero esto cubre el 90%.)

### Posicionamiento

> *"El único ecosistema cultural integral del sector musical en España. Artistas, eventos para marcas, festival propio y la tecnología que conecta a toda la industria."*

**Big idea**: "Bonito Sound. Superhéroes culturales en un sector que opera por WhatsApp."

### Tono de voz (§5 del brief)

**Heredado de Jaleo Sound** — canalla, divertido, directo. Frases ancla:
- "No massive stages, no VIP fences, no nonsense. Just music, good taste, great food and people."
- "En la música nadie te regala nada."
- "El sector mueve carreras por WhatsApp."

**SÍ**: frases cortas como puñetazos, verbos concretos (montamos, llevamos, fichamos), humor seco, decir lo que otros no dirían, 1ª persona del plural.

**NO** (lista negra): "En un mundo donde…", "apasionados de la música", "transformamos/impulsamos/elevamos/catalizamos", "soluciones 360º/integrales", emojis, adjetivos vacíos.

**Test obligatorio**: si sustituyes "Bonito Sound" por "Lighthouse" o "Last Tour" y el texto sigue funcionando, NO estás construyendo marca. Reescribe.

### Audiencias (orden de prioridad económica)

1. **Marcas y agencias de publicidad** (pagan 30k-150k por activación) → entrada `/eventos/marcas`
2. **Empresas/instituciones/ayuntamientos**
3. **Industria** (managers, salas, festivales) → entrada `/lab/artiverse`
4. **Artistas emergentes** → entrada `/records`
5. **Público general / fans** → entrada `/jaleo-sound` o ficha artista

### Verticales (§3 del brief)

1. **Records** — sello + booking + management + distribución + editorial. Roster booking: OTEM, Sa Pena, Nàtura, Dulze, Paule, Eva Calyza.
2. **Eventos** — activaciones marca (Ballantine's, Pernod Ricard, etc.) + giras (Albert Pla, Antonio Orozco, etc.).
3. **Jaleo Sound** — festival cultura española en Amsterdam (11-12 sep 2026, Posthoornkerk).
4. **Lab** — Artiverse (200+ usuarios B2B) + Giraverse (en desarrollo).
5. **Producciones** — columna técnica que sostiene las otras 4.

---

## 13. Decisiones tomadas (no las revertir sin hablar)

1. **Tipografía Opción B** (Fraunces + Geist, open source) — confirmado por Víctor.
2. **Sistema claro / blanco** — pivot desde el dark inicial. Víctor pidió "minimalismo blanco, fondo blanco, tipografía divertida".
3. **Estilo de ilustración**: "el logo y el personaje del héroe mandan"; azul/blanco; naranja muy contenido; mucho aire.
4. **gpt-image-1 (OpenAI)** como motor de imagen, NO Freepik/Higgsfield (consume créditos de suscripción del usuario).
5. **Equipo público**: Dani + Manu + Xavi + Cristina (lo que muestra la web actual). Júlia Martín del brief queda pendiente.
6. **Distribución amplía con D Nácar, AlexDeLion, Marco la Testa** (vistos en la web actual, no en el brief).
7. **Vercel Git integration** activa → push a main = deploy producción automático.
8. **Network policy del entorno Claude Code on the web**: la actual bloquea bonitosound.com, OpenAI, Wikimedia. Para regenerar imágenes hay que recrear el entorno con red abierta.

---

## 14. Comandos clave

```bash
# Desarrollo
npm run dev                     # http://localhost:3000
npm run build                   # producción
npm run start                   # servir build
npm run typecheck               # tsc --noEmit
npm run lint                    # next lint

# Generación de imágenes (necesita OPENAI_API_KEY + red abierta)
npm run generate-images                                    # todas pendientes
npm run generate-images:local                              # carga .env.local
npm run generate-images -- --only=hero-nosotros --force    # una sola, forzar
npm run generate-images -- --category=banco                # subset

# Descarga de imágenes reales
bash scripts/download-bonito-assets.sh                     # Linux/Mac
.\bonitosound-cowork\download-bonito-assets.ps1            # Windows

# Optimizar imágenes grandes (instalar sharp aparte: npm i --no-save sharp)
# (no hay script automatizado — hazlo en un .mjs ad-hoc cuando entren imágenes >1MB)
```

---

## 15. Variables de entorno

`.env.example` (commiteado, solo placeholders):

```bash
NEXT_PUBLIC_FORM_ENDPOINT=
RESEND_API_KEY=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
OPENAI_API_KEY=
```

**Reglas críticas**:
- `.env.example` se commitea con valores VACÍOS.
- `OPENAI_API_KEY` real va en:
  - **Local**: `.env.local` (gitignored).
  - **Entorno Claude Code on the web**: variables de entorno del entorno (encriptadas).
- NUNCA committear la key real. Repo es público → exposición = key quemada → revocar.

---

## 16. Lead magnets (§11 del brief)

### `/eventos/marcas` → "Diseña tu activación en 90 segundos"

4 preguntas (cards): tipo de evento, asistentes, artista nacional/local, plazo. Resultado: 3 ejemplos del portfolio + CTA mailto. **No pide email para usar**. Componente: `components/LeadMagnetBrands.tsx`.

### `/records` → "¿Encajas con Bonito?"

Quiz de 6 preguntas (single + multi + texto): stage de carrera, qué necesita, género, autoproducción, shows hechos, cuello de botella. Resultado: diagnóstico personalizado + CTA. Componente: `components/LeadMagnetArtists.tsx`.

---

## 17. SEO/AIO (§7 del brief)

### Clusters de contenido

1. **Eventos para marcas** (transaccional, pillar `/eventos/marcas`).
2. **Booking & management** (pillar `/records/booking-management`).
3. **Sello/distribución** (pillar `/records/sello`).
4. **Jaleo Sound** (autoridad satélite, mini-landing `/jaleo-sound`).
5. **Lab** (autoridad marca + AIO, pillar `/lab`).

### Por página

- `metadata` con `title`, `description`, `alternates.canonical`, OG.
- **Schema.org JSON-LD** vía `<JsonLd>` component:
  - `Organization` en `layout.tsx` (raíz).
  - `Service` en `/eventos/marcas`.
  - `MusicGroup` en `/records` y `/artistas/[slug]`.
  - `Festival` en `/jaleo-sound`.
  - `Event` en `/agenda` (cuando haya shows).
  - `FAQPage` en cualquier página con FAQ.
- **Bloques FAQ factuales** para extracción AI (Google AI Overviews, Perplexity).

### Sitemap.xml

Dinámico vía `app/sitemap.ts`. 23 URLs incluyendo fichas de artista. Update lastMod en cada build.

### Redirects 301

En `next.config.mjs`. Cubre slugs WordPress viejos + WPML language prefixes + atajos de marca.

---

## 18. Pendientes (roadmap inmediato)

### Sprint A — Cerrar las imágenes

- [ ] Generar 32 imágenes restantes con gpt-image-1 (3 heros + 3 casos + 28 banco)
- [ ] Descargar Absolut logo (reintentar .ps1 en Windows)
- [ ] Conseguir fotos del catálogo de distribución que faltan
- [ ] Conseguir logos de marcas que no están en bonitosound.com (Le Souffle, Pepsico/Schweppes verificar, etc.)
- [ ] Conseguir logos de artistas de gira (tourArtists)

### Sprint B — Contenido humano

- [ ] **Confirmar OTEM**: tiene perfil Spotify (66 oyentes), no tiene ficha en bonitosound.com. ¿Fichaje nuevo? ¿Quitar?
- [ ] **Confirmar Júlia Martín** vs el equipo actual (Dani/Manu/Xavi/Cristina). ¿5ª persona? ¿Reemplaza?
- [ ] **Confirmar Le Souffle**: solo aparece como restaurante París. ¿Es esa marca?
- [ ] **6 URLs del feed @bonito_sound** para cablear `<InstagramFeed posts={[…]}/>` en home.
- [ ] **2-3 Reels por artista del roster** (campo `reels:` en cada `content/artistas/<slug>.md`).
- [ ] **Spotify IDs por artista** (campo `spotifyArtistId:` en cada `.md`) para que el embed de Spotify funcione en las fichas.

### Sprint C — Pulido / v1.1

- [ ] Cablear `<InstagramFeed>` con widget Meta API (token Business) para auto-update.
- [ ] Vídeo del héroe morfeando en hero de home (Víctor lo estaba generando aparte).
- [ ] Backend de formularios (Resend o Formspree) — decisión Víctor.
- [ ] Analytics (Vercel + Plausible o GA4) — decisión Víctor.
- [ ] Newsletter (Buttondown/Beehiiv) si Víctor + Dani confirman.
- [ ] Llenado de `/diario` con 2-3 publicaciones iniciales.
- [ ] Revisión jurídica de `/aviso-legal` y `/privacidad`.
- [ ] Lighthouse audit ≥95 en todas las páginas (Pilar 1 técnico del brief).

### Sprint D — Migración real

- [ ] Validar redirects 301 contra sitemap real WordPress antes de cortar el DNS.
- [ ] Conectar dominio bonitosound.com a Vercel (DNS).
- [ ] Submit sitemap a Search Console.
- [ ] Migración de Analytics si había en WordPress.

---

## 19. Gotchas y particularidades

1. **Network policy del entorno actual**: bloquea bonitosound.com, api.openai.com, Wikimedia. Para ejecutar `npm run generate-images` o `bash scripts/download-bonito-assets.sh` desde aquí — no funciona. **Hay que recrear el entorno con network policy abierta** (al crear nueva sesión Claude Code on the web, elegir la option más permisiva).

2. **Mockups UI/UX en `references/ui-ux/`**: 10 PNGs de Víctor. NO están en `/public/img/` (no se sirven en internet), pero SÍ se commitean. El script de gpt-image-1 los carga como refs para mantener cohesión visual.

3. **`bonitosound-cowork/` carpeta**: output del scrape de Cowork. `tsconfig.json` la excluye para que el `.tsx` placeholder no rompa typecheck.

4. **Imágenes grandes**: GitHub avisa con >50MB. Si caen, optimizar con sharp ANTES de commitear (ver §10).

5. **AVIF en `next/image`**: pasar `unoptimized` para que Next no falle al procesar AVIF de entrada (como el logo). PNG/JPG/WebP normal.

6. **`Superhero` component**: tiene fallback automático SVG ↔ PNG. Si dropas `public/img/marca/superheroe-{state}.png` automáticamente usa el PNG. Si lo quitas, vuelve al SVG inline (cohesivo con el logo pero más simple).

7. **Reglas del agente** (heredadas del primer Claude):
   - Tono canalla del brief, no corporativo.
   - Lista negra de palabras (ver §12 arriba).
   - No inventar KPIs falsos en casos de marca.
   - No subir secrets jamás (`.env.example` placeholders).
   - No mergear a main sin permiso del usuario (ya hecho una vez con OK explícito).
   - Captura screenshots desde el preview cuando algo es dudoso (puppeteer + sparticuz/chromium funciona en este entorno).

8. **Cómo verifico desde aquí que Vercel sirve algo**: `mcp__c9e148dd-...__web_fetch_vercel_url` (el fetch del MCP de Vercel salta el sandbox y llega al deploy real).

9. **Cómo verifico estado de deploys**: `mcp__c9e148dd-...__list_deployments` con `projectId=prj_h3tv8ciNI4zhFknrGwNwaFhxwWoI` y `teamId=victors-projects-0b646b15`.

---

## 20. Cómo retomar (qué hacer en la sesión nueva)

1. **Lee este documento entero** (5 min). Es la fuente de verdad.
2. `git status && git log --oneline -10` — confirma dónde estás.
3. `npm install && npm run build` — confirma que todo compila.
4. Si Víctor pide algo, lee primero las secciones relevantes (§17 pendientes te dice qué falta de cada bloque).
5. Si vas a generar imágenes:
   - Confirma que `OPENAI_API_KEY` esté en `process.env` (`echo $OPENAI_API_KEY`).
   - Confirma red abierta a OpenAI (`curl -sS -m 8 -o /dev/null -w "%{http_code}" https://api.openai.com/v1/models` debería ser 401 o 200 — no 403).
   - Si la red está bloqueada, **el usuario tiene que recrear el entorno** con policy abierta.
6. Si vas a editar páginas: respeta el tono, evita lista negra del brief, sigue el sistema de diseño (`globals.css`).
7. Antes de commit: `npm run typecheck && npm run lint && npm run build`.
8. Commit en `claude/bonito-sound-web-YDR54` (o crea rama nueva si es feature gorda). NO commitear directo a `main` salvo correcciones triviales.

---

## 21. Contacto / interlocutores

| Persona | Rol | Cómo contactar |
|---|---|---|
| Víctor Torres | Head of Marketing Artiverse, socio operativo | victortorresa94@gmail.com |
| Dani Boada | Fundador Bonito Sound | A través de Víctor |
| Manu Rojo | Cofundador | A través de Víctor |

**Aprobación del go-live final** = Víctor + Dani. La web no se publica en bonitosound.com sin esa pasada.

---

**Fin.** Este documento se actualiza cuando hay decisiones nuevas, no quincenalmente. Si te encuentras algo que contradice esto, pregunta antes de moverlo.
