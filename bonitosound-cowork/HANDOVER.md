# Bonito Sound — Handover de assets

Hola Víctor. Como en este Cowork ni GitHub MCP ni Claude in Chrome quedaron conectados, he hecho mi parte (investigar + preparar) y dejo tu parte (4 clics) en pasos claros. Tiempo estimado: **8 minutos** si todo va bien.

## Ficheros que te he dejado (junto a este HANDOVER.md)

| Fichero | Para qué sirve |
|---|---|
| `manifest.json` | Listado completo de URLs → slugs → carpetas destino (referencia) |
| `download-bonito-assets.ps1` | Script PowerShell que descarga las 38 imágenes a `public/img/` |
| `artistas-frontmatter-snippets.md` | Bloques a pegar en cada `content/artistas/*.md` |
| `page-tsx-snippet.tsx` | Bloque a pegar en `app/page.tsx` |
| `pr-comment.md` | Texto del comentario para el PR #1 |

## Paso 1 — Clona el repo en local (1 min)

Abre PowerShell:
```powershell
cd "$env:USERPROFILE\Desktop\Dev"
git clone https://github.com/victortorresa94-del/bonitosound.git
cd bonitosound
git checkout claude/bonito-sound-web-YDR54
```

## Paso 2 — Ejecuta el script de descarga (2 min)

Copia `download-bonito-assets.ps1` a la raíz del repo `bonitosound` (donde está `package.json`), y:
```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\download-bonito-assets.ps1
```

Verás líneas verdes `[OK]` por cada imagen. Las 38 imágenes acaban en:
- `public\img\marca\` (2)
- `public\img\artistas\` (10)
- `public\img\equipo\` (4)
- `public\img\marcas\` (13)
- `public\img\instituciones\` (9)

> Si alguna línea sale en rojo, dímelo — es muy probable que sea una URL que ha cambiado.

## Paso 3 — Edita los `.md` de artistas (3 min)

Abre `artistas-frontmatter-snippets.md` y, para cada artista, copia las 2-3 líneas (`image:`, `instagram:`, `reels:`) y pégalas en el frontmatter del `.md` correspondiente. Yo te he dejado las imágenes y los Instagrams confirmados; tú pegas los Reels que ya tengas en mente.

## Paso 4 — Edita `app/page.tsx` (1 min)

Abre `app/page.tsx`, busca la línea donde pone `<InstagramFeed />` (sobre la 225), y reemplázala por el bloque de `page-tsx-snippet.tsx`. Sustituye los 6 placeholders por las 6 URLs de los posts más recientes de @bonito_sound. Eso lo coges abriendo tú https://www.instagram.com/bonito_sound/ y copiando las URLs de los primeros 6 posts.

## Paso 5 — Commit y push (1 min)

```powershell
git add public/img content/artistas app/page.tsx
git commit -m "feat(content): fotos reales de artistas, equipo y logos de marca + IG handles"
git push
```

## Paso 6 — Comentar en el PR (30 seg)

Abre https://github.com/victortorresa94-del/bonitosound/pull/1, scroll abajo, copia/pega el contenido de `pr-comment.md`, "Comment".

---

# Pendientes que quedan en mi tintero (los listo otra vez)

1. **6 URLs de Instagram de @bonito_sound** — necesito que las pegues tú aquí en chat o que las pongas directamente en `app/page.tsx` en el paso 4.
2. **Reels por artista** — 2-3 por cada uno del roster (OTEM, Sa Pena, Nàtura, Dulze, Paule, Eva Calyza). Pégamelos cuando los tengas.
3. **OTEM**: ¿existe en Bonito Sound? Su ficha pública no aparece en bonitosound.com.
4. **Júlia Martín**: ¿incorporación nueva? La web no la lista.
5. **Le Souffle**: ¿tienes logo? Mi búsqueda solo encontró un restaurante con ese nombre en París.
6. **Distribución (10 artistas)**: si quieres fichas para todos, dímelo y rastreo `/artista/<slug>/` por cada uno en otra ronda.

Cuando me confirmes lo de arriba puedo cerrar todos los flecos.
