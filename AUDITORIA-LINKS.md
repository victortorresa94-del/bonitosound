# AUDITORIA LINKS — Bonito Sound

> Auditoría de enlaces, botones y medios (Spotify / YouTube / Instagram) de toda
> la web. Pensada para arreglar desde otra sesión: cada punto lleva **archivo:línea**
> cuando hay algo que tocar. Fecha: 17-jul-2026. Rama `main`.
>
> Leyenda: ✅ ok · ⚠️ funciona pero mejorable · ❌ roto / falta dato.

---

## 0. LO PRIORITARIO (arreglar primero)

| # | Qué | Dónde | Acción |
|---|---|---|---|
| P1 | **Universo → tarjeta "Jaleo Sound" enlaza a la página INTERNA** `/jaleo-sound`, debería ir a la **web de Jaleo** | `app/universo/page.tsx:54` (`href: "/jaleo-sound"`, `external:false`) | Cambiar a `href: site.external.jaleo` (`https://jaleosound.com`) y `external: true` (como Artiverse/Giraverse). |
| P2 | **Dulze y Sa Pena (roster booking) sin Spotify** → su botón "Spotify" cae a una **búsqueda**, no a su perfil | `content/artistas/dulze.md`, `content/artistas/sa-pena.md` (falta `spotifyArtistId`) | Añadir `spotifyArtistId` real. Igual con `kenai-white`. |
| P3 | **Ningún artista tiene `lastTrackId` ni `featuredTracks`** → la sección "Música destacada" de la ficha sale vacía para todos | `content/artistas/*.md` | Añadir IDs de canción de Spotify (no del artista) para poblar los embeds de temas. |
| P4 | **"Escuchar a X" suena la canción de Bonito para TODOS** (no hay audio propio de artistas) | `public/audio/artistas/<slug>.mp3` no existe para nadie | Subir mp3/preview por artista → el botón lo coge solo (`lib/assets.ts:findArtistAudio`). |

---

## 1. RUTAS QUE EXISTEN (páginas)

```
/  /agenda  /artistas  /artistas/[slug]  /artistas/todos  /aviso-legal
/banco-visual  /contacto  /contratar  /diario  /diario/[slug]  /eventos
/eventos/[slug]  /eventos/giras  /eventos/marcas  /jaleo-sound  /lab
/lab/artiverse  /lab/giraverse  /marketing  /nosotros  /privacidad  /records
/records/booking  /records/booking-management  /records/distribucion
/records/editorial  /records/management  /records/marketing
/records/producciones  /records/sello  /servicios  /universo
```

**Ojo — posible redundancia:** existen a la vez `/records/booking`, `/records/management` **y** `/records/booking-management`. La `RecordsHero` enlaza "Booking Engine" a `/records/booking-management` (`components/records/RecordsHero.tsx:66`) y el índice de records también (`app/records/page.tsx:220`). Decidir si `booking-management` se queda o redirige a `/records/booking` para no duplicar.

---

## 2. ENLACES INTERNOS — todos resuelven ✅

Destinos usados en la web (todos apuntan a rutas que existen):
`/` · `/artistas` · `/artistas/[slug]` · `/artistas/todos` · `/aviso-legal` ·
`/contacto` · `/contacto?a=<slug>` · `/diario` · `/diario/[slug]` · `/eventos` ·
`/eventos/[slug]` · `/jaleo-sound` · `/nosotros` · `/privacidad` ·
`/records/booking-management` · `/records/distribucion` · `/records/sello` ·
`/servicios` · `/universo`.

- **Nav** (`lib/site.ts:nav`): `/servicios` · `/artistas` · `/eventos` · `/universo` · `/nosotros` → todas ✅.
- **Footer** (`components/Footer.tsx`): `/eventos/marcas` · `/eventos/giras` · `/records` · `/artistas` · `/universo` · `/nosotros` · `/jaleo-sound` · `/diario` · `/contacto` · `/aviso-legal` · `/privacidad` → todas ✅.
- **/contratar** redirige a `/contacto` (formulario único, con `?a=<slug>` si viene de un artista) → ✅ (`app/contratar/page.tsx`).

No se encontró ningún `href="#"` ni botón con `onClick` vacío (nada muerto por ese lado).

---

## 3. ENLACES EXTERNOS

| URL | Uso | Estado |
|---|---|---|
| `https://jaleosound.com` | Jaleo (footer, jaleo-sound) | ✅ marca |
| `https://artiverse.es` | Universo / Lab | ✅ marca |
| `https://giraverse.es` | Universo | ⚠️ verificar que el dominio esté activo/apunte |
| `https://instagram.com/bonito_sound` | redes | ✅ |
| `https://linkedin.com/company/bonito-sound` | redes | ⚠️ verificar el slug de LinkedIn |
| `https://youtu.be/r47SP4OULcI` | Sant Jordi (eventos/giras + evento gira-1016) | ✅ |
| `https://open.spotify.com/playlist/2lxa6r7k0dthpANWR9wRWs` | Player flotante → playlist de Bonito | ✅ (real) |
| `https://open.spotify.com/playlist/2J24790mkalzNNsw4vFc2E` | Jaleo playlist | ✅ |
| `https://www.barcelona.cat/fabraicoats` | Nosotros (instituciones) | ⚠️ verificar URL exacta |
| `https://www.redescena.net` | Nosotros | ⚠️ verificar |
| `https://www.catalunyacultura.cat` | Nosotros | ⚠️ verificar |
| `https://bonitosound.com` | canonical/SEO | ✅ |

Embeds (iframes) usados: Spotify (`open.spotify.com/embed/...`), YouTube (`youtube-nocookie.com/embed/...`), Instagram (`instagram.com/.../embed`). Funcionan cuando el ID existe.

---

## 4. BOTONES — qué hace cada uno

### Home (`/`)
- **"Dale al play"** (hero) → arranca la canción de Bonito en el player global. ✅
- **Botón flotante** (abajo-dcha): play/pausa de la música. Aparece al bajar del hero. ✅

### Ficha de artista (`/artistas/[slug]` · `components/artistas/ArtistShowcase.tsx`)
- **"Escuchar a X"** (`ArtistPlayer`) → reproduce audio. ⚠️ Hoy suena la **canción de Bonito** para todos (no hay audio propio, ver P4).
- **Spotify** (`:128`) → `spotifyUrl` del artista, o **búsqueda** `open.spotify.com/search/<nombre>` si no tiene `spotifyArtistId`. ⚠️ Cae a búsqueda en: **Dulze, Sa Pena, Kenai White**.
- **Instagram** (`:142`) → IG del artista, o **búsqueda** de IG si no tiene. ⚠️ Cae a búsqueda en: **Egon Calle, Rumba Menuda**.
- **"Contratar booking →"** → `/contacto?a=<slug>` (formulario precargado). ✅
- **Flechas / teclado / swipe** → recorren TODOS los artistas (orden único). ✅
- **Cierre (`ArtistCTA`)**: "Contratar a X" → `/contacto?a=<slug>` ✅ · "Síguele en Instagram" (si hay IG) ✅ · "Ver todo el roster" → `/artistas/todos` ✅.

### Universo (`/universo`)
- **Artiverse** → `https://artiverse.es` ✅ · **Giraverse** → `https://giraverse.es` ✅ · **Jaleo Sound** → `/jaleo-sound` ❌ (**debería ser `jaleosound.com`**, ver P1).
- **"Hablamos"** → `/contacto` ✅.

### Player flotante (global)
- **Play/Pausa** ✅ · **Botón Spotify** (fuera del home) → playlist real de Bonito ✅ · **"Siguiente"** propio → solo aparece si hay ≥2 audios en `/public/audio/playlist/` (hoy no, así que no sale).

### Formularios
- **`/contacto`** y **quizzes** (`LeadMagnetBrands`, `LeadMagnetArtists`) → hoy terminan en **`mailto:`** (no hay backend). ⚠️ Funciona, pero se pierde el lead si no completa el salto al correo. Pendiente conectar Resend/Formspree (`.env.example` ya lo prevé).

---

## 5. ARTISTAS — Spotify / YouTube / Instagram / audio

Solo publicados (los `draft` no salen en la web). ★ = roster destacado de `/artistas`.

| Artista | Spotify | YouTube | Instagram | Audio propio | Reels |
|---|---|---|---|---|---|
| Dulze ★ | ❌ (→búsqueda) | ✅ (1) | ✅ | ❌ | ❌ |
| Eva Calyza ★ | ✅ | ✅ (3) | ✅ | ❌ | ❌ |
| Nàtura ★ | ✅ | ✅ (3) | ✅ | ❌ | ❌ |
| Pablo Rojo ★ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Paule ★ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Sa Pena ★ | ❌ (→búsqueda) | ❌ | ✅ | ❌ | ❌ |
| Fabián D. Cuesta | ✅ | ✅ (3) | ✅ | ❌ | ❌ |
| AlexDeLion | ✅ | ❌ | ✅ | ❌ | ❌ |
| D Nácar | ✅ | ❌ | ✅ | ❌ | ❌ |
| Daniel Giró | ✅ | ❌ | ✅ | ❌ | ❌ |
| Egon Calle | ✅ | ✅ (1) | ❌ (→búsqueda) | ❌ | ❌ |
| Hebe | ✅ | ❌ | ✅ | ❌ | ❌ |
| Kanela | ✅ | ✅ (3) | ✅ | ❌ | ❌ |
| Kenai White | ❌ (→búsqueda) | ❌ | ✅ | ❌ | ❌ |
| Marco la Testa | ✅ | ❌ | ✅ | ❌ | ❌ |
| Rumba Menuda | ✅ | ✅ (1) | ❌ (→búsqueda) | ❌ | ❌ |

**Sin publicar (draft, no aparecen):** 96Grados, Belbaka, OTEM, Overpulation, Sotrac, Soylapau — sin datos. Para publicarlos: quitar `draft: true` + rellenar Spotify/IG/foto.

**Resumen artistas:**
- **Falta Spotify (`spotifyArtistId`):** Dulze, Sa Pena, Kenai White. → botón a búsqueda.
- **Falta Instagram:** Egon Calle, Rumba Menuda. → botón a búsqueda.
- **Sin YouTube (`youtubeIds`):** AlexDeLion, D Nácar, Daniel Giró, Hebe, Kenai White, Marco la Testa, Pablo Rojo, Paule, Sa Pena.
- **Nadie** tiene `lastTrackId`, `featuredTracks`, `reels` ni audio propio → esos bloques salen vacíos / genéricos para todos.

---

## 6. EVENTOS — vídeo

Los vídeos viven en R2 (`videoUrl`) o YouTube. Los que no tienen, muestran el fallback navy (intencional).

- **Con vídeo (R2):** albert-pla, anne-lukin, chateau, corona, cris, dani-directo, font-vella, four-roses, natura, pepsi, schweppes, tequila-codigo.
- **Con YouTube:** gira-1016 (`r47SP4OULcI`, Sant Jordi).
- **Sin vídeo (fallback navy):** ballantines, monkey, pernod-ricard, sainte-marguerite, seagrams. → subir `videoUrl` cuando haya material.

---

## 7. ACCIONES CONCRETAS (checklist para arreglar)

- [ ] **P1** — `app/universo/page.tsx:54`: Jaleo Sound → `site.external.jaleo` + `external:true`.
- [ ] **P2** — `spotifyArtistId` real en `dulze.md`, `sa-pena.md`, `kenai-white.md`.
- [ ] Instagram en `egon-calle.md`, `rumba-menuda.md`.
- [ ] **P3/P4** — `lastTrackId`/`featuredTracks` por artista + subir audios a `public/audio/artistas/<slug>.mp3` (y/o `public/audio/playlist/` para el "siguiente" del player).
- [ ] Decidir `booking-management` vs `booking`/`management` (redundancia de rutas).
- [ ] Verificar dominios externos marcados ⚠️: giraverse.es, LinkedIn, Fabra i Coats, Redescena, Catalunya Cultura.
- [ ] Vídeo de eventos sin material: ballantines, monkey, pernod-ricard, sainte-marguerite, seagrams.
- [ ] (Negocio) Conectar backend de formularios (hoy `mailto:`).
- [ ] YouTube por artista donde falte (9 artistas) si se quiere el feed de vídeos.

---

_Generado tras revisar `app/`, `components/`, `lib/` y `content/`. Todos los
enlaces internos resuelven; no hay botones muertos. Lo accionable es sobre todo
**datos que faltan** (Spotify/YouTube/IG/audio por artista) y el **enlace de
Jaleo en Universo**._
