# Prompt para Claude for Chrome — reunir los datos que faltan

> Copia el bloque de la fase que quieras y pégalo en Claude for Chrome. Devuelve
> los datos en el formato exacto que se pide para poder pegarlos directos en el
> repo (`content/artistas/*.md`, blog, etc.). Basado en `AUDITORIA-LINKS.md`.

---

## FASE 1 — Datos por artista (Spotify · Instagram · YouTube · temas)

```
Eres mi asistente de research. Estoy montando la web de una agencia musical
(Bonito Sound) y necesito reunir datos públicos de cada artista de su roster.
Para CADA artista de la lista, busca en Spotify, Instagram y YouTube y devuélveme
un bloque YAML EXACTO como el del ejemplo (respeta los nombres de campo). Si un
dato no lo encuentras con seguridad, déjalo vacío y anótalo en "DUDAS" al final.
NO te inventes IDs ni handles: solo datos verificados del artista correcto
(cuidado con homónimos).

Cómo sacar cada dato:
- spotifyArtistId: entra en el perfil del artista en open.spotify.com. La URL es
  open.spotify.com/artist/XXXXXXXX?... → el ID es la parte "XXXXXXXX" (antes del "?").
- lastTrackId: su ÚLTIMA canción publicada. Abre la canción en Spotify:
  open.spotify.com/track/YYYYYYYY → el ID es "YYYYYYYY".
- featuredTracks: sus 2-3 canciones más escuchadas/emblemáticas (mismos IDs de /track/).
- instagram: la URL completa de su perfil oficial (https://www.instagram.com/xxxx/).
- youtubeIds: 2-4 vídeos oficiales suyos (videoclips o directos). De cada vídeo,
  el ID es lo que va después de "watch?v=" o de "youtu.be/".

Artistas (slug — nombre — lo que YA tengo, verifícalo también):
- dulze — Dulze — FALTA spotifyArtistId. IG: instagram.com/duuuulze
- eva-calyza — Eva Calyza — spotify: 6rUgNfaB... (verifica) · IG: /evacalyza
- natura — Nàtura (DJ/productora) — spotify: 07Epl3n2... · IG: /dj.natura
- pablo-rojo — Pablo Rojo — spotify: 3oEmG4Gj... · IG: /pablorojomusic
- paule — Paule — spotify: 79qGj0n6... · IG: /paulemusica
- sa-pena — Sa Pena (urbano valencià) — FALTA spotifyArtistId. IG: /sa_pena_
- fabian — Fabián D. Cuesta — spotify: 3NOAlABN... · IG: /fabiandcuesta
- alexdelion — AlexDeLion — spotify: 5gvO2O6b... · IG: /alexdelion___
- d-nacar — D Nácar — spotify: 5KYVUnPD... · IG: /d__nacar
- daniel-giro — Daniel Giró — spotify: 6OlVyNGO... · IG: /danielgiroserratosa
- egon-calle — Egon Calle — spotify: 73GXtlzs... · FALTA Instagram
- hebe — Hebe — spotify: 5IAbHdlZ... · IG: /hebe_xx4
- kanela — Kanela — spotify: 2IqxZH8Q... · IG: /kanelaofficial
- kenai-white — Kenai White (cantautor/actor salmantino) — FALTA spotifyArtistId. IG: /kenaiwhite
- marco-la-testa — Marco la Testa — spotify: 3thnuvOX... · IG: /marco.la.testa
- rumba-menuda — Rumba Menuda — spotify: 6TRII33d... · FALTA Instagram

Formato de salida (un bloque por artista, encabezado con el slug):

### dulze
spotifyArtistId: "XXXXXXXXXXXXXXXXXXXXXX"
instagram: "https://www.instagram.com/duuuulze/"
lastTrackId: "YYYYYYYYYYYYYYYYYYYYYY"
featuredTracks: ["id1", "id2", "id3"]
youtubeIds: ["videoId1", "videoId2", "videoId3"]

(repite para cada artista)

Al final, una sección "DUDAS" con lo que no hayas podido confirmar.
```

---

## FASE 2 — Noticias de bonitosound.com (para el blog)

```
Entra en https://bonitosound.com y busca su apartado de noticias/blog (hay unas
4 entradas). Para CADA noticia devuélveme un bloque como este, con el texto
COMPLETO reescrito en párrafos (sin recortar), la fecha real y la URL de la
imagen de cabecera si la hay:

### <titular>
date: "AAAA-MM-DD"
imagen: "https://bonitosound.com/....jpg"   (o "sin imagen")
fuente: "https://bonitosound.com/...."       (URL de la noticia)
---
<cuerpo entero de la noticia, en párrafos, tal cual está publicado>

No resumas ni inventes: copia lo que hay. Si una noticia enlaza a algo (un
lanzamiento, un evento), incluye ese enlace.
```

---

## FASE 3 — Instagram: los mejores reels de cada artista (el "currazo")

```
Para CADA artista de la lista de la FASE 1, entra en su perfil de Instagram y
localiza sus 3-4 REELS (vídeos) más potentes: los de más reproducciones o los
que mejor muestran su directo/energía. Dame la URL completa de cada reel.

Formato:

### dulze
reels:
  - "https://www.instagram.com/reel/XXXXXXXXX/"
  - "https://www.instagram.com/reel/YYYYYYYYY/"
  - "https://www.instagram.com/reel/ZZZZZZZZZ/"

(repite por artista). Si un artista no tiene reels claros, ponlo en "SIN REELS".
Prioriza calidad sobre cantidad: mejor 3 buenos que 6 flojos.
```

---

## Cómo lo integro yo

- **Fase 1** → pego cada bloque en `content/artistas/<slug>.md` (frontmatter).
  Los botones de Spotify/IG dejan de caer a búsqueda y la sección de música se
  puebla con los temas.
- **Fase 2** → creo un post por noticia en `content/diario/*.md` (mismo sistema
  del blog, con su SEO). Las noticias conviven con los 4 artículos SEO ya hechos.
- **Fase 3** → pego los `reels:` en cada `.md`; la ficha muestra el feed de reels.

> Nada de esto necesita tocar código: son datos que caen en su sitio (plug-and-play).
```
