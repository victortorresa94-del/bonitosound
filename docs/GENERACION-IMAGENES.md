# Generar imágenes "a todo trapo" (esquivando el bloqueo de CDN)

El problema NO es generar, es **descargar** el resultado: los CDN de imágenes (pikaso de Magnific,
etc.) están capados por la política de red del entorno. La solución que lo esquiva del todo:
**pedir la imagen en base64** para que venga dentro de la propia respuesta de la API — sin descargar
nada de ningún CDN.

---

## Opción A (RECOMENDADA): OpenAI `gpt-image-1` en base64

`gpt-image-1` devuelve la imagen como `b64_json` en el propio JSON. Se decodifica y se escribe al
repo directamente. Cero descargas de CDN.

### 1. Habilitar la clave
- En los ajustes del **entorno** de Claude Code (donde se configuran variables/secretos), añade:
  - `OPENAI_API_KEY = sk-...`
- Asegúrate de que la **política de red del entorno permita `api.openai.com`** (es un host de API
  normal, no un CDN de media — suele estar permitido; si tu política es "restringida a una lista",
  añádelo).
- Comprueba en la sesión: `echo ${OPENAI_API_KEY:0:7}` debe imprimir `sk-...`.

### 2. Generar desde texto (prompt puro)
```bash
curl -sS https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-image-1",
    "prompt": "Full-body illustrated portrait ... navy #14283C line-art, single cyan #16b6d4 accent, cream background, no text, vertical",
    "size": "1024x1536",
    "background": "transparent",
    "n": 1
  }' | jq -r '.data[0].b64_json' | base64 -d > public/img/artistas/ilustracion/SLUG.png
```

### 3. Generar CON PARECIDO (usar la foto real del artista como referencia)
Endpoint `edits` — le pasas la foto real y la convierte al estilo ilustración manteniendo la cara:
```bash
curl -sS https://api.openai.com/v1/images/edits \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F model="gpt-image-1" \
  -F "image[]=@public/img/artistas/eva-calyza.jpg" \
  -F size="1024x1536" \
  -F background="transparent" \
  -F prompt="Convierte a esta persona en un retrato ILUSTRADO de cuerpo entero, line-art cómic limpio, tinta navy #14283C, cel-shading plano con UN único acento cian/teal #16b6d4, luces crema, ropa urbana, editorial de artista musical, manteniendo el parecido de cara y pelo, sin texto, fondo transparente, vertical" \
  | jq -r '.data[0].b64_json' | base64 -d > public/img/artistas/ilustracion/eva-calyza.png
```

### 4. Verificar y subir
```bash
file public/img/artistas/ilustracion/eva-calyza.png   # debe decir "PNG image data"
git add public/img/artistas/ilustracion/ public/img/marcas/
git commit -m "assets: ilustraciones de artista + logos"
git push origin claude/bonito-sound-web-YDR54
```

**Tamaños válidos gpt-image-1:** `1024x1024`, `1024x1536` (vertical), `1536x1024` (horizontal), `auto`.
Para las ilustraciones de artista usa **`1024x1536`** (vertical). Para logos, `1024x1024`.

> Nota: el modelo de imágenes de OpenAI es **`gpt-image-1`** (no existe un "gpt image 2" como tal;
> si tu cuenta tiene un modelo de imagen más nuevo, cámbialo en el campo `"model"`).

---

## Opción B: fal.ai (funciona, pero devuelve URL)

fal.ai devuelve la imagen como **URL en `fal.media`**, así que hay que descargarla → vuelve a
depender de que la política de red permita ese host (mismo problema que teníamos). Solo si el
entorno tiene `fal.media` permitido.

### Habilitar
- Variable de entorno `FAL_KEY = ...` y permitir `fal.run` + `fal.media` en la política de red.

### Ejemplo (modelo de imagen, ej. flux)
```bash
# 1) lanzar generación
curl -sS https://fal.run/fal-ai/flux/dev \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"...","image_size":"portrait_16_9"}' > /tmp/out.json
# 2) descargar la URL resultante (SOLO si fal.media está permitido)
IMG=$(jq -r '.images[0].url' /tmp/out.json)
curl -sS "$IMG" -o public/img/artistas/ilustracion/SLUG.png
```

Si la descarga da 403, es la política de red: usa la Opción A (base64 de OpenAI), que no descarga nada.

---

## Resumen: cómo asegurarte de que puedes generar "a todo trapo"

1. **Clave**: `OPENAI_API_KEY` (o `FAL_KEY`) puesta como variable/secreto del entorno.
2. **Red**: la política del entorno debe permitir `api.openai.com` (Opción A) o `fal.media` (Opción B).
   La Opción A casi siempre funciona porque `api.openai.com` no es un CDN de media.
3. **Formato**: pide **base64** (`gpt-image-1` ya lo hace) → escribe el PNG directo al repo → commit → push.
4. Guía de QUÉ generar y DÓNDE guardarlo: `docs/CONTEXTO-GRAFICO.md`.
