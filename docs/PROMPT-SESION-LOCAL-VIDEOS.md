# Prompt para la sesión local — subir los vídeos de evento

> Pégale esto tal cual a la sesión local (la que tiene los vídeos en el PC y red).

---

Tienes los vídeos de los eventos en este PC. La web ya está preparada para
mostrarlos: en `content/eventos/<slug>.md` cada evento tiene `videoUrl` y la web
resuelve por prioridad **archivo local en `public/video/eventos/<slug>.mp4` →
`videoUrl` (base externa)**. Objetivo: que se vean los vídeos. Elige UNA vía.

## Mapeo nombre del PC → slug (renombra a esto)
| Vídeo (nombre aprox. en el PC) | Renómbralo a |
|---|---|
| Evento corona … 2025 | `corona.mp4` |
| Bolo Sweppes / Swepes / Evento swepes top (elige el mejor) | `schweppes.mp4` |
| fontvella 30 eventos / Fontvella | `font-vella.mp4` |
| four roses 20 eventos | `four-roses.mp4` |
| Chateau | `chateau.mp4` |
| Tequila codigo + 20 eventos | `tequila-codigo.mp4` |
| eventod pepsi | `pepsi.mp4` |
| Natura | `natura.mp4` |
| Producción … gira Anne Lukin | `anne-lukin.mp4` |
| Evento montado / Concierto / Video Albert pla (elige el mejor) | `albert-pla.mp4` |
| Bolo Dani CEO tocando | `dani-directo.mp4` |
| Cris | `cris.mp4` |
| Entrevista Dani | `entrevista-dani.mp4` (banner de Nosotros) |

(Opcional, para el hover del roster: copia `natura.mp4` también a
`public/video/artistas/natura.mp4`.)

## Comprime primero (recomendado, para web y para no petar límites)
Deja cada vídeo ligero (≈720p, H.264, ~5–15 MB). Con ffmpeg:
```bash
ffmpeg -i "ENTRADA.mp4" -vf "scale=-2:720" -c:v libx264 -crf 26 -preset veryfast -c:a aac -b:a 128k -movflags +faststart "corona.mp4"
```
`+faststart` hace que empiecen a reproducir sin descargar entero. Repite por cada vídeo con su slug de salida.

---

## Vía A — al repo (la más rápida, sin tokens ni dominios)
El límite de 25 MB es solo del **subidor web** de GitHub. Por **git de consola**
el límite es 100 MB por archivo, así que esto funciona:
```bash
# copia los .mp4 ya renombrados a la carpeta del proyecto
cp corona.mp4 schweppes.mp4 font-vella.mp4 four-roses.mp4 chateau.mp4 \
   tequila-codigo.mp4 pepsi.mp4 natura.mp4 anne-lukin.mp4 albert-pla.mp4 \
   dani-directo.mp4 cris.mp4  public/video/eventos/
cp entrevista-dani.mp4 public/video/nosotros/ 2>/dev/null || true

git add public/video
git commit -m "Vídeos de evento (local) — se sirven desde /public"
git push
```
Como la web prioriza el archivo local, se ven en cuanto despliega Vercel. Cero
config. (Si algún vídeo pasa de ~100 MB, comprímelo con el ffmpeg de arriba.)

## Vía B — Vercel Blob (repo limpio, si prefieres no meter binarios en git)
Ya está el script `scripts/upload-to-blob.mjs` y la web lee la base de un env.
```bash
npm i @vercel/blob
vercel env pull                     # trae BLOB_READ_WRITE_TOKEN a .env.local
mkdir -p videos-blob
mv corona.mp4 schweppes.mp4 … videos-blob/   # los .mp4 renombrados a su slug
node scripts/upload-to-blob.mjs
```
El script sube con nombres limpios (`addRandomSuffix:false`) e imprime la **BASE**.
Ponla en Vercel → Settings → Environment Variables como **`NEXT_PUBLIC_VIDEO_BASE`**
(sin barra final) y redesplega. Los `videoUrl: "corona.mp4"` resolverán a esa base.

---

## Comprobar
Abre `/eventos` y una ficha de evento: los vídeos deben reproducirse (autoplay,
mudo, en bucle, sin controles). En "Eventos para artistas", Albert Pla y Anne
Lukin ya no salen en navy, sino con su vídeo.
