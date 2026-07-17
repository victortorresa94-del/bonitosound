# Cowork: sacar links + info + reels de los artistas

> Pega esto en una tarea de **Cowork / Claude en tu PC** (que tiene navegador y
> puede buscar). Objetivo: rellenar la ficha de cada artista con datos REALES.
> Nada inventado: si un dato no se encuentra con certeza, se deja vacío.

## Contexto para el modelo
La web de Bonito Sound tiene una ficha por artista en `content/artistas/<slug>.md`.
Cada ficha admite estos campos en el frontmatter (todos opcionales salvo name/genre/tier):

```
name, genre, tier ("booking"|"distribucion"),
spotifyArtistId,        # ID del perfil de Spotify (el hash tras /artist/)
spotifyPlaylistId,      # playlist propia si la hay
instagram,              # URL completa del perfil
youtubeIds: []          # IDs de 2-3 vídeos/clips clave (lo de tras v=)
reels: []               # 3-6 URLs de posts/reels de Instagram (directos, backstage)
stats: []               # {label, value} ej. oyentes mensuales, seguidores
firstConcert, lastConcert, milestones, musicStyle, influences, forWho
```
Bio: va en el cuerpo del .md (2-3 párrafos), después del frontmatter.

## Artistas y qué falta
**Sin ficha completa (crear/rellenar):** soylapau, daniel-giro, 96grados, kanela,
sotrac, belbaka, egon-calle, rumba-menuda, fabian, overpulation.
**Sin foto:** kenai-white, otem (+ los 10 de arriba).
**Sin YouTube (solo tienen 2):** todos menos eva-calyza y natura.
**Todos:** verificar/añadir reels clave.

## Qué buscar por cada artista (en este orden de fiabilidad)
1. **Spotify**: busca el artista en open.spotify.com. Copia el ID del perfil
   (`open.spotify.com/artist/XXXX` → XXXX). ⚠️ Confirma que es EL artista de Bonito
   (español/emergente, no un homónimo). Si hay duda, déjalo vacío.
2. **Instagram**: el @ oficial (URL completa).
3. **YouTube**: 2-3 IDs de vídeos suyos (videoclip, directo, sesión).
4. **Reels/posts**: 3-6 URLs de Instagram con directos/backstage/lanzamientos.
5. **Género** (1 línea) y **bio** (2-3 frases, tono cercano, sin inventar hitos).

## Formato de salida (para que se pegue directo)
Para cada artista, devuelve el bloque de frontmatter + bio listo para
`content/artistas/<slug>.md`, así:
```
---
name: "Soylapau"
genre: "..."
tier: "distribucion"
spotifyArtistId: "..."      # o quita la línea si no seguro
instagram: "https://instagram.com/..."
youtubeIds: ["...", "..."]
reels: ["https://instagram.com/p/...", "..."]
---
Bio de 2-3 frases…
```
Y una nota final con los artistas donde no encontraste algo con certeza.

## Foto
Aparte: por cada artista consigue una foto (vertical, buena) y guárdala como
`public/img/artistas/<slug>.jpg`. La web la coge sola.
</content>
