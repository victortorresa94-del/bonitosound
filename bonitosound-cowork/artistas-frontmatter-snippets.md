# Snippets de frontmatter para `content/artistas/*.md`

Cómo usarlo: en GitHub, abre cada `.md` listado, clica el lápiz, **dentro del frontmatter `---` … `---`** añade los campos `image`, `instagram` y, si los tienes, `reels`. Guarda con commit message *"Frontmatter: foto + IG de <artista>"*.

> **IMPORTANTE: las URLs de Reels deben venir de ti.** No puedo extraerlas porque no tengo acceso a tu sesión de Instagram (mira el bloque "Pendiente del usuario" al final).

---

## `content/artistas/paule.md`
```yaml
image: /img/artistas/paule.jpeg
instagram: https://www.instagram.com/paulemusica
reels:
  - # pega aquí URL de Reel 1
  - # pega aquí URL de Reel 2
```

## `content/artistas/sa-pena.md`
```yaml
image: /img/artistas/sa-pena.jpg
instagram: https://www.instagram.com/sa_pena_
reels:
  - # pega aquí URL de Reel 1
  - # pega aquí URL de Reel 2
```

## `content/artistas/natura.md`
```yaml
image: /img/artistas/natura.jpg
instagram: https://www.instagram.com/dj.natura
reels:
  - # pega aquí URL de Reel 1
  - # pega aquí URL de Reel 2
```

## `content/artistas/dulze.md`
```yaml
image: /img/artistas/dulze.png
instagram: https://www.instagram.com/duuuulze
reels:
  - # pega aquí URL de Reel 1
  - # pega aquí URL de Reel 2
```

## `content/artistas/eva-calyza.md`
```yaml
image: /img/artistas/eva-calyza.jpg
instagram: https://www.instagram.com/evacalyza
reels:
  - # pega aquí URL de Reel 1
  - # pega aquí URL de Reel 2
```

## `content/artistas/otem.md` *(ojo: este artista NO tiene ficha en bonitosound.com — confirma con Dani Boada antes de publicar)*
```yaml
image: # FALTA — confirmar foto con la agencia
instagram: # FALTA — confirmar handle con la agencia
spotify: https://open.spotify.com/artist/382ZStNMRpkdxhvwYgQRaU
reels:
  - # pega aquí URL de Reel 1
```

---

## Distribución (no son booking pero los listaste)

## `content/artistas/pablo-rojo.md`
```yaml
image: /img/artistas/pablo-rojo.jpg
instagram: # confirmar handle — búsqueda no devolvió uno claro
```

## `content/artistas/d-nacar.md`
```yaml
image: /img/artistas/d-nacar.jpeg
instagram: # confirmar handle
```

## `content/artistas/alexdelion.md`
```yaml
image: /img/artistas/alexdelion.png
instagram: # confirmar handle
```

## `content/artistas/marco-la-testa.md`
```yaml
image: /img/artistas/marco-la-testa.jpeg
instagram: # confirmar handle
```

## `content/artistas/hebe.md`
```yaml
image: /img/artistas/hebe.jpeg
instagram: # confirmar handle
```

## `content/artistas/kenai-white.md`
```yaml
image: # FALTA — su foto de ficha en bonitosound no la he capturado. Si quieres la añado a una segunda iteración.
instagram: https://www.instagram.com/kenaiwhite
tiktok: https://www.tiktok.com/@kenaiwhite
```

---

# Pendiente del usuario

Antes de cerrar esto necesito que me pegues aquí en el chat:

1. **Las 6 URLs de los posts más recientes de @bonito_sound** (formato `https://www.instagram.com/p/XXX/` o `/reel/XXX/`). Abre tu Instagram, ve a https://www.instagram.com/bonito_sound/, copia las 6 primeras.
2. **2-3 Reels por artista del roster** (OTEM, Sa Pena, Nàtura, Dulze, Paule, Eva Calyza). Si no tienes tiempo, basta con que me confirmes qué artistas quieres priorizar y yo dejo los demás como "TODO" en el PR.
3. **Confirmaciones sobre dudas** (te las dejo en el comentario del PR pero te las recuerdo):
   - ¿OTEM existe como artista de Bonito Sound o quito su entrada?
   - ¿Júlia Martín ha entrado a equipo? La web aún muestra Xavi Julià y Cristina Soler.
   - Marcas Pernod Ricard / PepsiCo / Absolut: ya tengo logos genéricos de Wikimedia. ¿Vale o quieres los versiones específicas de las campañas?
   - Le Souffle: no aparece como restaurante en Barcelona en mi búsqueda. ¿Tienes el logo?
