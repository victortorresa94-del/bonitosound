# Plantillas de eventos y artistas — cómo se ingiere contenido nuevo

Sistema montado para que subir los ~20 vídeos de eventos y ampliar las fichas
de artista sea mecánico: un fichero + un vídeo/foto por entrada, sin tocar código.

## Eventos

**Ruta pública:** `/eventos/<slug>` (plantilla en `app/eventos/[slug]/page.tsx`).
**Rejilla "top":** todos los eventos aparecen en `/eventos` (sección "Lo hemos
montado", componente `EventoCard`) y los de `type: "marca"` también en
`/eventos/marcas` ("Casos").

**Para añadir un evento nuevo:**
1. Crea `content/eventos/<slug>.md` con este frontmatter:
   ```yaml
   ---
   title: "Título del evento"
   type: "marca"      # "marca" | "gira" | "festival" | "showcase"
   brand: "Nombre de la marca"     # si aplica
   artist: "Nombre del artista"    # si aplica
   year: "2024"
   location: "Sala X, Ciudad"      # opcional
   video: "/video/eventos/<slug>.mp4"   # si hay vídeo propio
   youtubeId: "xxxxxxxxxxx"             # alternativa si el vídeo está en YouTube
   gallery:                              # fotos extra, opcional
     - "/img/eventos/<slug>-1.jpg"
     - "/img/eventos/<slug>-2.jpg"
   context: "Resumen corto (1-2 frases) — sale en la tarjeta de la rejilla."
   result: "El resultado/impacto — sale en la página individual."
   ---
   Párrafos largos opcionales aquí (markdown), para más detalle en la
   página individual. Si se deja vacío, la página usa `context`.
   ```
2. Si hay vídeo propio: colócalo en `public/video/eventos/<slug>.mp4`
   (recomendado: H.264, recortado/optimizado — mismo pipeline que los vídeos
   del home; avisa y lo proceso).
3. Si hay foto de portada (poster o evento sin vídeo): `public/img/eventos/<slug>.jpg`
   (aparece sola, sin tocar código — `findAsset("eventos", slug)`).

**Los 3 eventos reales ya migrados:** `ballantines`, `pernod-ricard` (marca),
`gira-1016` (gira de Alfred García, con el YouTube real ya embebido).

## Artistas

**Ruta pública:** `/artistas/<slug>` (plantilla en `app/artistas/[slug]/page.tsx`,
ya existía — ahora enriquecida).

**Campos nuevos disponibles en el frontmatter** (`content/artistas/<slug>.md`),
todos opcionales — cada sección solo se pinta si hay datos:

```yaml
---
name: "..."
genre: "..."
tier: "booking"
spotifyArtistId: "..."       # ya existía
spotifyPlaylistId: "..."     # NUEVO: playlist propia del artista
instagram: "https://instagram.com/..."
image: "/img/artistas/<slug>.jpg"
gallery:                      # NUEVO: fotos extra (galería en grid 2x4)
  - "/img/artistas/<slug>-1.jpg"
  - "/img/artistas/<slug>-2.jpg"
reels:                        # ya existía, ahora SÍ se renderiza (antes no se usaba)
  - "https://www.instagram.com/reel/XXXXX/"
youtubeIds:                   # NUEVO: vídeos de YouTube (directos, videoclips)
  - "xxxxxxxxxxx"
milestones: [...]             # ya existía
---
Bio en párrafos (markdown), como siempre.
```

Orden de la página: hero (foto+nombre) → bio + Spotify (artista/playlist) →
galería de fotos → reels de Instagram ("En directo") → vídeos de YouTube →
trayectoria (milestones) → volver al roster.

## Nota sobre Instagram

`InstagramFeed`/reels usa el embed oficial de Instagram (oEmbed, sin token).
Necesita URLs de posts/reels concretos — no hay forma de traer "los últimos
posts" automáticamente sin la Instagram Graph API + token de Meta Business
(fuera de alcance ahora mismo).
