# BACKLOG WEB — TODO lo que falta (checklist completo)

> Leyenda: ✅ hecho · 🟢 Sesión B (Claude) puede hacerlo ya · 🎨 gpt-image + sesión local ·
> 📋 necesita datos/decisión de Víctor · ⏳ en curso.
> Diseño: pasar cada página por bonito-super-team + bonito-team + bonito-voz.

## HOME
- [x] ✅ Banner de artistas (loop continuo).
- [x] ✅ Vídeo tocadiscos (solo tocadiscos, 1,5s) — 📋 falta confirmar seg exacto.
- [x] ✅ Vídeo marketing (arranca seg 3).
- [x] ✅ Vídeo hero (+12%, subido).
- [x] ✅ Copy del CTA final.
- [ ] 🎨 Nuevo **banner de logos de marca** (diseño).
- [ ] 🎨 Rediseño **visual** del banner de artistas (el loop ya está; falta el diseño nuevo).

## ¿QUÉ HACEMOS? / SERVICIOS (7 subproductos)
- [x] ✅ Estructura de las 7 páginas (aspectos + caso + FAQ + CTA).
- [ ] 🎨 **Heros de las 7** (los diseña Víctor y me los pasa).
- [ ] 🎨 Nuevo **banner de servicios** ("foto con 7 servicios").
- [ ] 🟢 Sección **"Nuestras ediciones"** (editoriales/lanzamientos de Bonito).
- [ ] 🟢 **Botón de Spotify** — hacerlo bien.
- [ ] 📋🟢 **Links de listas de Spotify** por servicio (Víctor pasa playlists).
- [ ] 🟢 Pulir "experiencias/artistas" y CTA de cada servicio.

## ARTISTAS
- [x] ✅ /artistas/todos (roster completo) + 10 fichas stub + Instagram 11/12.
- [x] ✅ Ficha de artista (experiencia — la montó la sesión local).
- [ ] 🎨 **Diseño de la página de artista** (gpt-image).
- [ ] 🟢 **Hover en foto de artista → reproduce su vídeo** (necesita vídeos por artista).
- [ ] 🟢 Tipo de **título** de artistas · barra de nombres · SEO.
- [ ] 🟢 **Botón de Spotify** de la ficha.
- [ ] 🟢 Roster completo "guay" (pulir diseño).
- [x] ✅ **Datos de los 22 artistas integrados** desde Drive/Cowork (Spotify, IG,
  YouTube, género, bio verificados vía bonitosound.com). Fuera todo el demo
  inventado (stats/playerTracks/conciertos falsos, youtubeIds rickroll).
- [ ] 📋 **6 artistas en `draft`** (sin identidad confirmada): otem, soylapau,
  96grados, sotrac, belbaka, overpulation → Víctor confirma Spotify/IG y quito draft.
- [ ] 📋 **Fotos** (proxy bloquea bonitosound.com — bajar a mano a `public/img/artistas/<slug>.jpg`):
  kanela `…/2024/07/Kanela_1.jpg` · daniel-giro `…/2024/07/Foto-Piano-scaled.jpg` ·
  egon-calle `…/2024/07/egon-calle.jpg` · fabian `…/2024/04/FABIAN_D_CUESTA_©Juan_Marigorta.jpg` ·
  kenai-white `…/2024/07/IMG_5735.jpg` · rumba-menuda (captura, mejor otra).
- [ ] 📋 **Reels** de Instagram: 0/22 (IG no se indexa; sacar a mano por perfil).

## EVENTOS
- [x] ✅ Títulos sin cifras · tipografía banner "no organizamos" → hero · banner de giras/artistas.
- [x] ✅ **WS2: estructura de la página de evento** — campos opcionales en el .md
  (se pintan solo si están, nada inventado):
    ```
    services: ["Producción integral", "Booking del cartel", "Sonido"]   # chips "Qué montamos"
    lineup: ["Artista 1", "Artista 2"]                                    # "En el cartel"
    capacity: "1.200 personas"                                            # aforo (SIN dinero)
    quote: { text: "…", author: "Nombre, Marca" }                         # cita de cliente
    ```
    Ejemplo real puesto en `corona.md`. Falta 📋 que Víctor rellene el resto.
- [ ] 🟢 **WS3: reescribir copys "de IA"** en TODOS los .md de evento (romper "X no Y", cierres-aforismo, "lo que no se ve").
- [ ] 🟢 Combinar logos + centrar · spacing · subtítulo de eventos.
- [ ] 🟢 Revisar **el vídeo que "no le va"** (¿cuál es?).
- [ ] 🟢 2 tipos de evento (marca / artista) bien diferenciados (banner giras ya suma).
- [ ] 🎨 Faltan **3 logos**: Monkey, Sainte Marguerite, Le Souffle.
- [ ] 📋 Confirmar **producciones reales de artistas** (para ampliar el banner de giras).
- [ ] 📋 **Editoriales** de Bonito (extraer de bonitosound.es).

## UNIVERSO BONITO
- [x] ✅ Página base (Artiverse, Giraverse, Jaleo).
- [ ] 🎨 Diseño Jaleo.
- [ ] 🟢/📋 Artistas · datos (Spotify, IG) · frontmatter · ediciones.

## NOSOTROS / QUÉ SOMOS
- [x] ✅ Reconstruida (historia, números, banner de Dani + vídeo + trayectoria, equipo, "lo que firmas", instituciones, día a día).
- [ ] 🟢 Pulir aún más (super-team) · foto de Dani/equipo mejor si hace falta.

## JALEO SOUND
- [ ] 🎨 Diseño de la página.

## CONTACTO
- [ ] 🎨 Diseño de la página de contacto.
- [ ] 🟢 Formulario nuevo.

## TRANSVERSAL
- [ ] 🟢 **Revisar TODO en móviles** (responsive).
- [ ] 🟢 FAQ + SEO por página (la sesión local ya hizo bastante).
- [ ] 📋 Conectar **bonitosound.com a Vercel**.
- [ ] 📋 Activar **public access de R2** (para que se vean los vídeos).
- [ ] 🎨 Generar: 3 logos + ilustraciones de artista.
- [ ] 📋 Extraer contenido de **bonitosound.es**.

---
### Lo que la Sesión B puede atacar YA (sin bloquear)
1. WS2 — estructura de la página de evento.
2. WS3 — reescribir copys de los .md de evento (romper cadencia IA).
3. Botón de Spotify (servicios + ficha).
4. "Nuestras ediciones" en servicios.
5. Combinar logos + centrar + spacing en eventos.
6. Hover-vídeo en fotos de artista (cuando haya vídeos).
7. Repaso responsive.
8. Pulir Nosotros y roster completo.
</content>
