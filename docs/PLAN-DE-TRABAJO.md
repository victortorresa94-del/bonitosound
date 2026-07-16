# PLAN DE TRABAJO / HANDOFF — Web Bonito Sound

> **Doc vivo. Fuente única de verdad del estado + handoff entre sesiones.**
> Lo leen las dos sesiones de Claude y Víctor. Se actualiza **después de cada
> tanda** con avances. Objetivo: **terminar la web esta noche** (16-jul-2026).
> No es plan de meses — checklist de sprint + contexto rápido.
>
> Complementa a `CONTEXT.md` (handoff exhaustivo histórico) y `ROADMAP.md`
> (pendientes antiguos). Si algo choca, **manda este doc**.

---

## 0. HANDOFF RÁPIDO — leer al empezar una sesión nueva

**Repo / git**
- Ruta local: `C:\Users\Usuario\Desktop\Dev\2 - Bonito Sound\bonitosound`
- Rama de trabajo: `claude/bonito-sound-web-YDR54`, pero **empujamos directo a
  `main`** (Víctor lo autorizó esta noche; `main` despliega a producción en
  Vercel → `bonitosound.vercel.app`). Flujo por tanda: commit → `git fetch` →
  si `main` divergió, `git merge origin/main` y resolver → `npm run build` para
  verificar → `git push origin HEAD:main`.
- **Dos sesiones en paralelo** sobre el MISMO working tree:
  - **PRINCIPAL** (esta): páginas, diseño, contenido, dirección de arte, fichas,
    assets, deploys.
  - **SECUNDARIA** ("frontend de atrás"): fontanería, componentes base, técnica.
  - Ya hemos **chocado 2× en `app/artistas/*`** → resuelto con `git checkout
    --ours` (quedarse con la versión de la sesión principal). Si ves marcadores
    de conflicto `<<<<<<<` al compilar, es esto.

**Entorno Windows (gotchas importantes)**
- El Windows **intercepta HTTPS (proxy TLS)**: `curl` falla con
  `CRYPT_E_NO_REVOCATION_CHECK`. `jq` **no está instalado**. Para cualquier cosa
  con red (fuentes de Google en el build, API de OpenAI) usar **Node** con
  `NODE_OPTIONS=--use-system-ca` (o `node --use-system-ca ...`).
- Build/preview: `NODE_OPTIONS=--use-system-ca npm run build` / `npm run start`.
- **Preview**: hay entrada `bonito` (puerto 3010) en `C:\.claude\launch.json`,
  pero `preview_start` por nombre **falla** por el espacio en "C:\Program Files".
  Workaround: `NODE_OPTIONS=--use-system-ca npm run start -- -p 3010` en bash
  background, y luego `preview_start {url:"http://localhost:3010/..."}` +
  `read_page`. **Los screenshots dan timeout** (animaciones continuas: cursor
  custom, marquees, GSAP) → verificar con `read_page`/`javascript_tool`, no con
  captura.

**Clave OpenAI**
- Está en `.env.local` (gitignored, NO commitear). Válida. Se cargó desde
  `…\Assets Web\claves.env.txt`. Correr scripts con
  `node --use-system-ca --env-file=.env.local ...`.
- ⚠️ Víctor **genera él las ilustraciones** ahora — NO auto-generar sin que lo
  pida. (Receta que funcionó por si acaso: gpt-image-1 `/images/edits` con la
  foto del artista + `natura.png` como ancla de estilo, fondo **crema sólido**
  #FBFAF6, paleta estricta navy #14283C + único cian #16b6d4 + crema.)

**Sistema de diseño (tokens)**
- Navy `#14283C` · Cian acento `#16b6d4` (único acento) · Crema fondo `#FBFAF6`.
- **Fuente de titulares del home = `.display` (Zilla Slab serif)**. Úsala en los
  headers grandes (Records, Nosotros, Artistas) con **una palabra en cian** de
  acento (ej. "el sistema", "del sector", "bonito"). `font-round` = Fredoka
  (para tags de la cascada de Records y la lista del catálogo).
- Voz de marca: ver `.claude/skills/bonito-voz`. Reglas: **cero cifras de dinero**
  en copy, nada inventado (KPIs/URLs), test de sustitución de Risto, y **género
  neutro** (hay "elles" en el roster → "Escucha su música", "Síguele", no "la/lo").

**Assets / mockups de Víctor**
- Carpeta: `C:\Users\Usuario\Desktop\⚡ Aether Labs\0 - Proyectos\Artiverse &
  bonito\Bonito Sound\Assets Web`. Contiene: `Hero sistema.png` (Records),
  `Hero nosotros.png`, `Hero Sellos.png` (sello), `Campañas marketing.png`
  (marketing), y `Artistas/` con ilustraciones. Víctor irá dejando más ahí.
- Sistema plug-and-play (`lib/assets.ts`): dropear un PNG con el slug correcto en
  `public/img/<dir>/` y aparece solo. Ilustración de artista →
  `public/img/artistas/ilustracion/<slug>.png` (si no existe, cae a la foto).

**Quitar fondo a ilustraciones** (arte plano)
- **Flood-fill con `sharp`** en local (NO usar MCP Freepik/Higgsfield — gasta
  créditos de Víctor). Rellena desde el borde con alpha graduado → respeta los
  blancos interiores (cara/ropa). El script fue temporal (borrado); recrear en
  `scripts/_bgremove.mjs` si hace falta (está descrito en el historial de chat).

---

## 1. ✅ HECHO (sprint de hoy)
- ✅ `/artistas`: roster B/N asimétrico "Artistas con el rollo **bonito**" (fuente
  del home + cian) + catálogo de distribución (tipografía redondeada). Calcado
  del mockup. "Roster completo →" bajo el roster.
- ✅ **Records hero**: serif del home, "**el sistema**" cian, cascada de tags.
- ✅ **Nosotros hero**: "Somos la gente / **del sector**" + ilustración de equipo
  recortada del mockup real.
- ✅ **Ficha de artista** = carrusel `ArtistShowcase` (flechas recorren el roster
  sin salir, URL sincronizada, copy neutro, Spotify/IG en `text-sm`, CTA booking).
- ✅ Ilustración **sin recuadro** (flota) + **fondo eliminado** (Natura, flood-fill).
- ✅ Logos de marca a **navy monocromo** (11) + banner de logos más pequeño +
  3 nuevos (Absolut, Corona, Seagram's).

## 2. 🔄 EN CURSO / SIGUIENTE (lo gordo de esta noche)
**Ficha de artista como EXPERIENCIA** — "un field donde quedarse a explorar y
conocer al artista", que al propio artista le mole. Reúne y ordena su universo
(IG, YouTube, Spotify) como el sistema que hay detrás de esas redes. Bloques a
construir (el carrusel/hero se queda, se toca poco):
- Bio rica y con carácter (más larga, mucha info del artista).
- **Números en plataformas** (oyentes mensuales, seguidores, views).
- **Última canción** publicada · canción(es) **destacada(s)**.
- **Último concierto** · **primer concierto** (hitos con fecha/sala/ciudad).
- **Reels sueltos** de Instagram.
- **Vídeos de YouTube intercalados** con publicaciones (entretenido de ver).
- Próximos shows si los hay.
> Antes de diseñarla a fondo, Víctor quiere definir el **equipo de expertos +
> buyer personas** (neurociencia/consumo, producto web-app, sector musical,
> marca) y los distintos perfiles que entran (artista, quien contrata artista,
> marca que contrata a Bonito, fan). Se diseña con esa lente. → crear
> `docs/EQUIPO-Y-PERSONAS.md` (pendiente; Víctor lo pidió y luego pasará a modo
> plan). Complementa a la skill `.claude/skills/bonito-team` (11 diseñadores).

## 3. ⬜ PENDIENTE (priorizado)
1. ⬜ Definir **equipo de expertos + buyer personas** (doc) — *primero*, es la lente.
2. ⬜ **Ficha de artista experiencia** (bloques de arriba). Necesita datos reales.
3. ⬜ **Página Records completa** (es grande) — falta el diseño completo de Víctor.
4. ⬜ Página **Sello** (`Hero Sellos.png`) y **Marketing** (`Campañas marketing.png`).
5. ⬜ Evaluar el bloque combinado Spotify+IG de la otra sesión (¿lo absorbe la
   experiencia nueva?).
6. ⬜ **Quitar fondo** a ilustraciones nuevas — **BAJA prioridad, al final**
   (técnica ya montada, es rápido).
7. ⬜ **Más artistas** por poner (Víctor irá subiendo fotos/ilustraciones).

## 4. ⏸ BLOQUEADO (necesito de Víctor)
- ⏸ Ilustración **suelta y correcta** de **Eva Calyza** y **Sa Pena** — las que
  subió eran el mockup entero (Eva) y un grupo de 6 (Sa Pena); retiradas → ahora
  usan su foto real. Solo **Natura** es una ilustración limpia buena.
- ⏸ **Datos reales por artista** para la experiencia: nº en plataformas, fecha
  del último/primer concierto, canciones destacadas, URLs de reels y de YouTube.
  (El tipo `Artist` en `lib/content.ts` ya tiene campos `listeners`/`followers`;
  añadir los que falten al frontmatter de `content/artistas/*.md`.)
- ⏸ Logos nicho: Monkey 47, Sainte Marguerite, Le Souffle, Código 1530,
  Lighthouse, Corre Lola Corre, Sr. Wilson.
- ⏸ Diseño completo de la página **Records**.

## 5. Ficheros clave
- `components/artistas/ArtistShowcase.tsx` — carrusel de la ficha (client).
- `app/artistas/[slug]/page.tsx` — ficha: usa el carrusel + secciones (música,
  bio, galería, reels, vídeos, hitos, otros).
- `app/artistas/page.tsx` — parrilla roster + catálogo distribución.
- `components/records/RecordsHero.tsx` — hero de Records.
- `app/nosotros/page.tsx` — hero + equipo.
- `lib/content.ts` — tipo `Artist` (+ `getArtists`), `Evento`. `lib/assets.ts` —
  `findAsset` plug-and-play. `lib/site.ts` — datos (team, brands, catálogo…).

## 6. Log de decisiones (por qué)
- `/artistas` = **parrilla estática** de los 6 de booking + lista de distribución
  (mockup de Víctor), NO el carrusel de "todos juntos" que hizo la otra sesión.
  El carrusel va en la **ficha individual**.
- Headers grandes → **serif del home** (Zilla Slab) + palabra cian, no Fredoka.
- Ilustraciones: fondo transparente (flood-fill), sin recuadro, `object-contain`.
