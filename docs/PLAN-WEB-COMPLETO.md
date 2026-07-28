# Bonito Sound · Web — Plan maestro de cambios (v2)

> Documento de trabajo de Víctor + Sesión B. Combina las **3 fuentes**: reunión con
> Dani (23/07, notas Gemini), el PDF **"cambios web"** y los **apuntes de voz** de Víctor.
> Es NUESTRO plan para hacerlo todo de una tirada (excepto el material que envía Dani).
> **Aún no se codifica**: primero cerrar alcance y orden.

**Responsable:** `[B]` Sesión B (Claude) · `[V]` Víctor · `[D]` Dani
**Estado:** ✅ se puede ya · ⏳ espera material de Dani · 🎨 requiere Aura MCP (generar/editar) · ❓ decisión

**Reglas duras:** Cero cifras de dinero en la web (los precios de la reunión son internos). Nº de conciertos / "+300 obras" / años **sí** valen. Género neutro. Nada inventado.

---

## 0. DECISIONES YA CERRADAS (respuestas de Víctor)

- **Sección de marcas → se llama "EXPERIENCIAS"** (la actual `/eventos` se convierte en Experiencias).
- **"GIRAS" = página NUEVA e independiente**, principal en el menú (portfolio de giras). NO es el renombre de "producciones".
- **"Producciones"** sigue siendo un **servicio** (dentro de ¿Qué hacemos?), pero reenfocado a **producción de giras de artistas** (hay que rehacerlo entero).
- **"Sello" → "records"** en todas partes.
- Frase del marquee del home → **"Artistas con los que trabajamos"**.
- **Numeración `0X/09`**: decisión rápida (ver §12, recomendación: quitar).
- Idiomas: **castellano + catalán** (inglés no).

---

## 1. ESTRUCTURA / MENÚ

- [x] `[B]` ✅ Menú: **¿Qué hacemos? · Artistas · Giras · Experiencias · Universo Bonito · Qué somos · Hablamos**. *(Nota: URL de Experiencias sigue en `/eventos`; el rename a `/experiencias` va con el bloque 3.)*
  - `Eventos` → **Experiencias**. Añadir **Giras** como página propia.
- [x] `[B]` ✅ **Eliminada la página vieja de giras** `app/eventos/giras` + redirect 301 → `/giras`. Banner 5 del home, footer y sitemap ya apuntan a **/giras**. Nueva `/giras` creada (versión funcional; diseño fino con Aura en §4).

---

## 2. HOME / LANDING

- [x] `[B]` ✅ **Quitada la numeración `0X/09`** de los banners.
- [x] `[B]` ✅ Marquee → frase **"Artistas con los que trabajamos"**. *(Meter más artistas —Albert Pla, Alfred García, etc.— queda pendiente de nombres/fotos → §7/§9.)*
- [x] `[B]` ✅ **Enlaces de banners:** "marcas suenen" → Experiencias (/eventos) · "artistas despegar" → **/servicios** (antes /records) · banner 5 → **/giras**.
- [x] `[B]` ✅ **Scroll cue "Baja" responsive**: centrado + safe-area, visible en todas las pantallas.
- [x] `[B]` ✅ **Bloque institucional** bajo "Llevamos la música a todas partes" (franja navy discreta, logos que ya hay, **AEDEM fuera**). Pendiente `[B/V]`: buscar **ARC** y **PROMUSICAE**.
- [ ] `[B]` ⏳ **Muro de marcas**: añadir logos de marcas/agencias/artistas que faltan. Los NOMBRES los pasa Dani; los LOGOS los buscamos nosotros (Señor Wilson, Corre Lola, GTS, etc.).
- [x] `[B]` ✅ No alargar más el home (respetado).

---

## 3. EXPERIENCIAS  *(antes "Eventos" — marcas · teatro · mapping)*

- [x] `[B]` ✅ **Ruta renombrada** `/eventos` → **`/experiencias`** (+ redirects 301 de `/eventos` y `/eventos/:path*`). Hero: "EVENTOS" → **"EXPERIENCIAS"**.
- [x] `[B]` ✅ Texto bajo "Hacemos que las marcas suenen" (+ *"Porque una marca no solo debe verse. Debe vivirse."*).
- [x] `[B]` ✅ **Fuera las giras y directos de artista**: Experiencias filtra a `type === "marca"` (12 marcas). Las 3 giras y 2 directos ya no salen aquí.
- [x] `[B]` ✅ Bloque **Teatro**: Dumbo (verano 2023, 8), El Rey León (verano 2022, 8), Pinocho (invierno 2022, 3).
- [x] `[B]` ✅ Bloque **Mapping / espectáculos visuales**: texto puesto + fallback navy con carácter. ⏳ **fotos/vídeos de mapping = Dani** (se enchufan en `public/img/experiencias/mapping.*`).
- [x] `[B]` ✅ CTA de cierre → **"¿Quieres crear un evento?"** (antes "¿Marca o gira?").
- [ ] `[B]` 🎨 **Vídeo resumen al inicio** (~30 s, mix de eventos): **BLOQUEADO** por el montaje de Aura (ver §13). El hueco está listo para enchufarlo.
- [ ] `[B]` **CAMBIO estructural pendiente: una página por MARCA** (hoy sigue habiendo una por evento en `app/experiencias/[slug]`). Dentro de cada marca: nº de eventos + vídeo/imagen. Necesita decidir agrupación (Corona tiene varios eventos, etc.).
- [ ] `[B]` **Mover las páginas de gira/directo**: `/experiencias/albert-pla`, `/anne-lukin`, `/gira-1016`, `/natura`, `/dani-directo` siguen generándose bajo Experiencias aunque ya no se enlacen. Deben pasar a **/giras/[slug]** (va con §4).
- [ ] `[D]` ⏳ Más marcas (hoy solo bebidas), **agencias musicales y empresas** — nombres.

---

## 4. GIRAS  *(página NUEVA — de las más importantes)*  🎨

- [~] `[B]` **v1 funcional creada** (`/giras`): leyenda, "Giras Bonitas", listado cronológico real con nº de conciertos, tarjetas con hueco de foto (fallback navy). **FALTA el estudio de diseño de verdad** (abajo).
- [ ] `[B]` 🎨 **DEDICAR UN BUEN ESTUDIO DE DISEÑO** a esta página (es de las más importantes): tiene que ser **impactante**, al nivel del resto, no solo nombres/fotos/vídeos. Diseñarla con **Aura MCP** (lienzo "Bonito Sound / diseños") y pasarla a código.
- [ ] `[B]` ⏳ **VÍDEOS**: ahora mismo `/giras` **no tiene ni un vídeo**. Conseguir/embeber vídeos de las giras de artistas (YouTube/links — los sacamos nosotros) y páginas de gira por artista con sus vídeos.
- [x] `[B]` ✅ **Sacar las giras/artistas de Experiencias**: la página de eventos ya no incluye giras (el showcase de artistas se retira en el rework de Experiencias, §3).
- [ ] `[B]` ✅ Leyenda: *"Producción técnica, logística, road management y dirección de giras. Coordinamos cada detalle, desde la planificación previa hasta el desmontaje final, porque sabemos que la diferencia entre un buen concierto y una gran producción está en los detalles."*
- [ ] `[B]` ✅ Título **"LO QUE HEMOS LLEVADO"**; subtítulo → **"Giras Bonitas"** (contratación/booking, gestión, logística, técnica, asesoramiento, producción…).
- [ ] `[B]` ✅/⏳ **Listado cronológico de giras** (actual → atrás), foto en vez de recuadro (foto = ⏳). Datos confirmados (PDF):

  | Artista | Gira | Años | Conciertos |
  |---|---|---|---|
  | Albert Pla | "No quiero hablar de mí pero yo" | 2026–2027 | +40 previstas |
  | Dulze | "Qué fantasía" | 2026 | 8 |
  | Alfred García | "T'estimo és te quiero" | 2025–2026 | +50 |
  | Alfred García | Gira Acústica | 2023–2024 | +20 |
  | Alfred García | Gira 1016 | 2019–2021 | +40 |
  | Nàtura | Gira DJ | 2023–2026 | +250 |
  | Albert Pla | Rumbagenarios | 2024–2025 | +40 |
  | Ernest Prana | "Torno a casa" | prim–ver 2025 | 12 |
  | Laura Andrés | Gira Zero | prim–ver 2025 | +20 |
  | Eva Calyza | "Marca Divina" | 2024–2025 | +15 |
  | Pablo Rojo | On Tour in Spain (desde Ámsterdam) | abr 2025 | +8 |
  | Egon Calle | Gira Invierno | 2024 | 6 |
  | Vicente García | Gira en España | verano 2022 | 8 |
  | Nerea Rodríguez | "Doble o Nada Tour" | 2021 | +15 |
  | Anne Lukin | Gira | 2021–2022 | +20 |
  | Fabián | Gira Acústica | 2021 | +10 |
  | Ramón Mirabet | "Gira del Mar" | 2021 | +12 |
  | Ramón Mirabet | "Free" | 2022–2023 | +30 |
  | Ruth Lorenzo | Gira | 2022 | — |
  | Bemba Saoco | Gira (fundacional) | 2022 | — |

- [ ] `[B]` ✅ 3 bloques: listado de artistas · vídeos de conciertos · servicios logísticos.
- [ ] `[B]` 🎨 **Páginas de gira por artista dentro de /giras** (ej. Albert Pla, Alfred García): banner dedicado → página con más vídeos, números, etc. **El botón de Alfred/Albert en /artistas dirige AQUÍ**, no a un perfil. (§8)

---

## 5. SERVICIOS (¿Qué hacemos?) — records · editorial · distribución · booking · management · marketing · producciones

Etiquetas: **records** (no "sello"), editorial, distribución, marketing, booking, management, **producciones (= producción de giras)**.

### 5.1 Records (servicio)
- [ ] `[B]` ✅ Quitar "+150 lanzamientos + 6 lanzamientos sin cover/link". Poner un **pop-up grande de Spotify con la playlist de Bonito** (la que ya tuvimos, en repo) que **ocupe el banner**.

### 5.2 Editorial
- [ ] `[B]` ✅ Mencionar **"más de 300 obras (canciones) donde somos editorial"**.

### 5.3 Distribución
- [ ] `[B]` ✅ Cambiar el título feo **"Donde se escucha música, estás."** (`cases.tsx:179`) por algo más **rollo bonito / callejero**.
- [ ] `[B]` ✅ Quitar sección "ya distribuyen con nosotros" → dejar solo cifras.
- [ ] `[B/V]` ❓ **Logos** dentro de distribución (plataformas/DSPs). ¿Los busco yo en internet o me pasas los links? *(pregunta abierta)*

### 5.4 Booking
- [ ] `[B]` ✅ Poner los artistas correctos: **Dulze · Sa Pena · Nàtura · Paule** (hoy hay otros).

### 5.5 Management
- [ ] `[B]` ✅ **Quitar "a Eva Calyza la lleva Manu"** (ni Manu ni Eva: Eva ya no está en management). Revisar en la conversación quién sí/no. **Confirmado en reunión:** fuera de booking/management → **Fabián Cuesta y Eva Calyza**. Management actual → **Dulze, Nàtura**.
- [ ] `[B]` ✅ Banner de management: poner a **Nàtura**; cambiar el título "a mano" (suena raro) por otro.

### 5.6 Producciones (= producción de giras) — **REHACER ENTERA** 🎨
- [ ] `[B]` ✅ **Cliente ideal**: artista/manager que busca empresa que le **produzca la gira** (no estudio, no marcas). Replantear toda la página + **plan de trabajo** + landing mucho mejor en información.
- [ ] `[B]` ✅ **Quitar textos que no aplican**: "concepto y dirección artística", "el artista que encaja" (eso es de marcas; en giras no buscamos artista, producimos alrededor del artista) y todo lo de producción musical de estudio (grabación/mezcla/máster).
- [ ] `[B]` ✅ **Bloques "qué hacemos"**: mantener los 4 buenos (**producción técnica · escenario · logística · coordinación integral**) + **crear 2 nuevos**.
- [ ] `[B]` ✅ **Proceso "del brief al evento"** (rescatado de la reunión): **producción previa con promotores → hojas de ruta → road management y transporte → el evento en vivo** (escenario + luces).
- [ ] `[B]` ✅ **Texto de abajo**: hoy muy largo (no da tiempo a leerlo) → **frase de 2 líneas máximo**.
- [ ] `[B]` 🎨 **Nuevo dibujo** (el de fuera): la mesa de mezclas no representa producciones grandes de giras → generar uno nuevo con **Aura MCP**, mismo estilo.
- [ ] `[B]` ⏳/🎨 **Vídeos de abajo**: quitar los de marcas, poner los de **artistas a los que hacemos producción de giras** (hoy Alfred García y Albert Pla; más luego). Buscar links/vídeos.
- [ ] `[B]` ⏳ Artistas concretos por banner de cada servicio (Víctor los especificará).

---

## 6. ARTISTAS / ROSTER

- [ ] `[B]` ✅ **6 perfiles principales** en /artistas ("Artistas con el rollo bonito"), con la **relación** mostrada minimalista:
  | Artista | Relación | Perfil |
  |---|---|---|
  | **Dulze** | management · records · editorial · booking | perfil completo |
  | **Nàtura** | management · records · editorial · booking | perfil completo |
  | **Paule** | booking | perfil completo |
  | **Sa Pena** | records · booking | perfil completo |
  | **Alfred García** | producción de giras | **sin perfil** → botón lleva a su página en /giras |
  | **Albert Pla** | producción técnica de giras | **sin perfil** → botón lleva a su página en /giras |
- [ ] `[B]` ✅ **Quitar de booking/management: Fabián Cuesta y Eva Calyza**.
- [ ] `[B]` ✅ **No todos tienen perfil**: los que ya no trabajan / no hacen música → se mencionan (foto + leyenda) pero **sin perfil**. Varios cambios en el roster (según la conversación).
- [ ] `[B]` ✅ **Distinguir 2 ejes** (con estrategia):
  - **Actuales (bajo contrato)** → sí en /artistas. **Pasados/colaboraciones** → NO en /artistas (no se pueden contratar), pero sí en **/giras, Qué somos, marquee home, vídeos de producciones**.
  - **Famosos vs no famosos** → los famosos se destacan **con mimo** (giras, qué somos, "ha trabajado con"), sin ponerlos por todas partes ni enlazar perfil si ya no están (p. ej. no página de Antonio Orozco).

---

## 7. LISTA MAESTRA DE ARTISTAS *(para no perder a nadie)*

> Recopilación de reunión + PDF + apuntes. Ubicar cada uno donde corresponda.

- **Roster actual Bonito (perfil):** Dulze, Nàtura, Paule, Sa Pena. *(Alfred García y Albert Pla = principales pero sin perfil → /giras.)*
- **Producción de giras (Bonito):** Alfred García, Albert Pla (+ los que aparezcan en la lista de giras §4).
- **"Ha trabajado con" (Qué somos, 8 nombres):** Fabián, Vicente García, Anne Lukin, Laura Andrés, Nerea Rodríguez (+ los existentes para cuadrar 8).
- **Famosos / prestigio (con mimo):** Antonio Orozco, Vicente García (Grammy), Maldita Nerea, Ruth Lorenzo, Iván Ferreiro, Amaya, Efecto Pasillo, Ramón Mirabet, Nerea Rodríguez, Anne Lukin.
- **Históricos / inactivos (mención sin perfil):** Rumba Menuda, Sotrac, Bemba Saoco, Egon Calle, Ernest Prana, Laura Andrés, Pablo Rojo, Eva Calyza (ex-management).
- **A INVESTIGAR:** `[B]` **Fabián** — Dani lo menciona mucho ("un crack"), no está claro si trabajan con él ahora. **Tarea: investigar quién es y su relación**; luego decidir si va en "ha trabajado con". Sin fotos → material pendiente.

---

## 8. QUÉ SOMOS

- [ ] `[B]` ✅ **Historia "¿De dónde venimos?"** — texto nuevo:
  > *"Nuestra historia empieza sobre los escenarios. Antes de producir conciertos, los vivimos como músicos y artistas. Esa experiencia nos permite entender las necesidades de cada proyecto desde dentro. Desde finales de los años 90 hemos acompañado el crecimiento de numerosos artistas y trabajado junto a agencias y profesionales del sector, colaborando en el desarrollo de proyectos como Antonio Orozco, Dani Flaco, Efecto Pasillo, Maldita Nerea, Fabián, 91 Suite y muchos otros."*
- [ ] `[B]` 🎨 **Foto del equipo (la de arriba "Ya somos la gente del sector")**: hoy son personas random. Generar una **igual de estilo pero con los avatares/dibujos del equipo real** (los dibujos ya están abajo) → **dibujo combinado del equipo** con Aura MCP.
- [ ] `[B]` ⏳ **Equipo**: quitar **Xavier Julià**. Añadir **Quim** (sube canciones a plataformas) y **una colaboradora nueva** (nombre por confirmar; producciones de marca/road mgmt). **Equilibrar el banner** (uno más). **Cristina Solé → "Operaciones"**. Fotos/nombres = ⏳ Dani.
- [ ] `[B]` ✅ **Quitar "y descubierto a"**. Dejar solo **"Ha trabajado con"** y añadir los nuevos (Vicente García, etc.).

---

## 9. JALEO SOUND

- [ ] `[B]` ✅ En **Universo Bonito**, el link a Jaleo Sound (hoy a una página interna) → **dirigir directo a la web externa oficial de Jaleo Sound**.
- [ ] `[B]` ⏳ (si se mantiene sección) logo Jaleo + **vídeo oficial edición 2025**.

---

## 10. IDIOMAS

- [ ] `[B]` ✅ **Selector de idioma arriba** + traducir toda la web a **catalán** (castellano + catalán).

---

## 11. REPRODUCTOR · "RADIO BONITO"

- [ ] `[B]` ✅ Botón/reproductor **personalizado sin pop-up de Spotify** (el player ya está montado, desconectado).
- [ ] `[B]` 🎨💡 **Concepto "Radio vieja"**: ilustración tipo radio antigua que **sintoniza** (ruidito de sintonización al cambiar de tema, dial que se mueve de emisora a emisora). Mix ~20 temas, ~10 s cada uno. Diseñar interacción + arte (Aura).
- [ ] `[D]` ⏳ Canciones con derechos (mín. 5) de artistas Bonito → `public/audio/playlist/`.

---

## 12. NUMERACIÓN `0X/09` — mi recomendación

**Quitarla.** Es un contador **sin etiqueta** → el cerebro no sabe qué es (le pasó a Dani y a terceros) = carga cognitiva sin recompensa clara. El supuesto beneficio (orientación "cuánto queda") no compensa la confusión en banners de marca. Si más adelante queremos dar sensación de progreso, mejor una **barra sutil sin números**. → Propongo eliminar.

---

## 13. AURA MCP · IMÁGENES / VÍDEO / DISEÑO 🎨🔎

- [ ] `[B]` 🔎 **Explorar el MCP de Aura Studio** (ya conectado): acceder al **lienzo "Bonito Sound / diseños"** (imágenes + diseños de todas las páginas). Ver si puedo **leer/descargar assets** e incrustarlos en la web; y **diseñar las páginas nuevas** (giras, gira de artista) desde ahí → pasar a código.
- [ ] `[B]` 🔎 Si no puedo incrustar directo → **decir a Víctor qué necesita la app de Aura** (export/URL pública/almacenamiento tipo Firebase).
- [ ] `[B]` 🎨 Encargos concretos con Aura: **vídeo experiencias 30 s** (§3) · **dibujo nuevo de producciones** (§5.6) · **foto/dibujo combinado del equipo** (§8) · **diseño de /giras y página de gira** (§4).

### Aura — estado y aprendizajes (sesión 28/07)
- ✅ **Aura conecta y VEO los diseños** del lienzo "Bonito Sound" (proyecto `R01qvgskRzo110Qt7HLW`). Mockups por página: nosotros, records, universo, eventos-artistas, servicios, contacto. **NO hay mockup de Giras ni Experiencias**.
- ✅ **Generé 2 mockups** (Giras y Experiencias) → buenas referencias de estructura (gpt-image-2 escribe el texto en garabato, pero el layout vale).
- ✅ **Montaje de vídeo funciona** (Aura ensambla N clips, ~0,05€).
- ⛔ **Bloqueo para editar NUESTRO material**: los clips de eventos se sirven locales (`/video/eventos/*.mp4`) y el R2 `pub-…r2.dev` da **403** → fal no puede descargarlos. **Necesita una URL pública** (deploy público sin protección, o bucket público / que Aura permita subir el clip local). → decisión de Víctor.
- ⚠️ **Lyria (música)** dio falso positivo de moderación con un prompt inocuo → reintentar con otro prompt/modelo.
- Los assets que genera Aura quedan en **URLs firebase públicas** → la web desplegada SÍ podría cargarlas directamente.

### Diagnóstico final del montaje de vídeo (28/07)
- ❌ Mi 403 inicial era **el proxy del sandbox**, no la web (`connect_rejected — policy denial`). Los vídeos **SÍ son públicos**.
- Evidencia: con la URL de R2 fal dice `422 Could not download`; con la de Vercel dice `500 Internal server error` → **fal sí descarga los ficheros**, lo que falla es el **compose (ffmpeg)**.
- El proyecto Vercel **no tiene dominio propio** conectado (solo `bonitosound.vercel.app` + alias de equipo) → `bonitosound.com` todavía no es esta web.

### 🐞 BUG confirmado: Aura sustituye el modelo en silencio
- Pedí `model: "gpt-image-2"` en los 2 mockups y Aura generó con **`flux-dev`** (queda registrado así en el asset). Por eso el texto salió en garabato: flux-dev es malo con tipografía; gpt-image-2 la clava (el mockup antiguo de Servicios, hecho con gpt-image-2, tiene el texto perfecto).
- **Causa**: con `projectId`, `onBrand` es `true` por defecto → inyecta referencias del lienzo → la generación pasa a modo edición con referencias (flux/kontext) y **se pierde el modelo pedido**. Poniendo `onBrand: false` sí usa gpt-image-2.
- Contradice la propia regla del MCP: *"Nunca sustituyas parámetros en silencio"*.
- **Fix sugerido**: (a) respetar `model` aunque haya refs, o (b) avisar en la respuesta ("onBrand activó refs → modelo cambiado a X"), o (c) que `onBrand` inyecte solo texto de estilo (paleta/tono) y NO imágenes de referencia cuando el modelo pedido no soporta refs.

### Backlog para la app de Aura (por prioridad)
0. **No cambiar el modelo en silencio** (ver bug arriba) — el más importante: rompe la confianza en el resultado y quema dinero.
1. **Ingesta de material propio** (el gap gordo): `aura_import_media({url})` y `aura_request_upload/finalize` (como Higgsfield `media_upload`/`media_import_url` o Magnific `creations_request_upload`). Así se puede editar material del usuario sin depender de dónde viva.
2. **Normalizar clips antes de concatenar** (mismo codec/fps/resolución/pix_fmt): `ffmpeg concat` exige uniformidad; sin eso, montar clips heterogéneos revienta con 500.
3. **Preflight sin coste**: `dryRun:true` o `aura_check_media({urls})` (HEAD + content-type). Hoy cada fallo cuesta ~0,05€.
4. **Errores accionables** en `assemble_video`: el hint actual habla de *keyframes* y *regenerar el modelo* (eso es de generación, no de montaje) → despista.
5. **`textTracks`** (cartelas/subtítulos quemados): hoy confirmado roto (422). Necesario para un reel de marca.
6. **Transiciones y trim reales**: `crossfade` y `trimStartSec` marcados experimentales/no verificados.
7. **Música con fallback**: Lyria dio falso positivo de moderación con un prompt inocuo → reintento automático con ElevenLabs Music o parámetro `musicModel`.
8. (menor) **Mezcla de audio**: sin control de volumen/ducking música vs audio de clips.

### Backlog para la web (no bloqueante)
- **Host de assets estable** (R2 bien configurado o Vercel Blob): hoy hay ~48 MB de vídeo dentro de git y las URLs dependen del deploy.
- **Conectar bonitosound.com** al proyecto de Vercel cuando se publique.

---

## 14. TAREAS DE DANI  *(solo lo que depende de él — una tarea por línea)*

**NOMBRES** *(los logos ya los buscamos nosotros; Dani solo da los nombres):*
- [ ] Nombres de los **artistas de Bonito que faltan** (a añadir) **+ la relación de cada uno** (management / booking / records / editorial / producción).
- [ ] Nombres de las **marcas** con las que se ha trabajado que faltan.
- [ ] Nombres de las **agencias** (booking, management, etc.) con/para las que se ha trabajado.

**FOTOS:**
- [ ] Las **fotos que enseñó hoy** (material histórico de giras / trabajando en directo).
- [ ] Fotos de los **6 artistas del roster**.
- [ ] Fotos de los artistas de **"ha trabajado con"**.
- [ ] Fotos del **equipo nuevo**: Quim y la colaboradora nueva (+ sus roles).

**VÍDEOS:**
- [ ] Vídeos de **mapping / espectáculos visuales**.
- [ ] **Vídeo oficial de Jaleo Sound** (edición 2025).

**MÚSICA:**
- [ ] **Canciones con derechos** (mín. 5) de artistas de Bonito → carpeta Drive.

---

### NO es tarea de Dani (lo hacemos nosotros)
- **Logos institucionales** → ya en el repo (falta buscar ARC + PROMUSICAE).
- **Logos de marcas y artistas** → los buscamos nosotros con los nombres que dé Dani.
- **Vídeos de artistas/giras** (para /giras y producciones) → los sacamos nosotros (YouTube/links).
- **Material/vídeos de Paule** → ✅ ya descargados hoy por Víctor.

---

## 15. FUERA DE LA WEB *(no bloquea)*
- Artiverse (reactivar, panel de noticias/licitaciones, freemium), automatización RRSS (sept.), festival Jaleo Ámsterdam.

---

## 16. PREGUNTAS ABIERTAS
1. §5.3 **Logos de distribución**: ¿los busco yo en internet o me pasas los links?
2. §8 Nombre de la **colaboradora nueva** del equipo (¿es "Pau"? el PDF puso "Pau" como road/producciones de marca).
3. **Orden de ataque**: propongo empezar por el **bloque "sin material"** (menú+Giras link, quitar 0X/09, enlaces banners, textos de Experiencias/Historia/Records/Editorial/Distribución/Booking/Management, scroll cue) mientras Dani reúne material y yo exploro Aura para las páginas nuevas y los assets. ¿OK?

> Pendiente de Víctor: artistas concretos por banner de servicio, lista institucional exacta, nombres del equipo. Se sigue ampliando.
