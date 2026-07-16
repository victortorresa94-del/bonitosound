# Bonito Sound — Contexto gráfico y assets pendientes

> Documento interno para **generar los assets visuales** que faltan (ilustraciones de
> artistas, logos de marca, dibujitos de Records) desde una sesión paralela.
> Objetivo: que quien genere imágenes tenga TODO el contexto gráfico y las rutas
> exactas donde guardarlas, para que encajen sin retoques.

---

## 0. Cómo usar este doc (sesión de generación)

1. **Abre y MIRA las referencias visuales** (están en la raíz del repo) — son la biblia del estilo:
   - `1784215791497_openai-gen.png` → **página de artista** (Eva Calyza ilustrada). ← ESTILO CLAVE de ilustración.
   - `1784205337139_openai-gen.png` → roster de Records (fotos B/N, tono editorial).
   - `1784216262565_openai-gen.png` → **banner de logos** de marca del home.
   - `Edita-esta-imagen-aplicando-EXACTAMENTE.png` → mockup de la home/eventos (paleta y tono general).
2. Genera cada asset con el **método base64** (ver §6) y guárdalo en la RUTA EXACTA indicada.
3. `git add` + commit + push a la rama `claude/bonito-sound-web-YDR54`. El código ya está preparado
   para recoger los assets automáticamente (convención de rutas más abajo).

---

## 1. Qué es Bonito Sound

Agencia musical 360 (sello, booking, management, distribución, eventos de marca, marketing y
software propio). Tono de marca: **pro pero cercano, sin humo, con oficio**. Nada corporativo-frío,
nada de promesas vacías. La web es editorial, con carácter y con guiños "hechos a mano".

---

## 2. Línea gráfica (tokens EXACTOS)

### Color
| Token | Hex | Uso |
|---|---|---|
| Crema fondo | `#FBFAF6` | Fondo principal de casi todo |
| Crema 2 | `#F4F1E9` | Fondos de sección alternos |
| Crema 3 | `#ECE7D8` | Cards / placeholders |
| **Navy (texto/tinta)** | `#14283C` | Titulares, line-art, tinta de ilustración |
| Texto primario | `#14110B` | Cuerpo |
| Texto secundario | `#57544C` | Párrafos suaves |
| **Cian acento** | `#16b6d4` | Acentos, eyebrows, un único color de realce |
| Cian texto | `#0c7e93` | Cian sobre crema cuando necesita contraste AA |
| Naranja cálido | `#ff5a1f` | Uso muy puntual |
| Rojo Jaleo | `#e8351f` | Solo marca Jaleo Sound |

**Regla de oro del color:** navy + crema como base, y el **cian como ÚNICO acento**. Nada de
paletas multicolor. Las ilustraciones son navy line-art + cian como único color plano.

### Tipografía
- **Display / titulares:** `Zilla Slab` (slab serif tipo Clarendon). Es la fuente serif de
  "Eva Calyza" del mockup. Pesos 300–700.
- **Cuerpo:** Geist (grotesca neutra).
- **Redondeada (guiño):** `Fredoka` (500–700) — para hero de Records/Eventos, gestos juguetones.

### Tono visual / motion
- Editorial, aire generoso, asimetría con criterio.
- Detalles "a mano": subrayados ondulados, flechas dibujadas, estrellitas/chispas cian.
- Movimiento **contenido** (reveal on scroll, marquees suaves). Nada de animar por animar.

---

## 3. ⭐ ESTILO DE ILUSTRACIÓN DE ARTISTA (lo más importante)

Referencia exacta: **`1784215791497_openai-gen.png`** (ábrela y míralas). Eva Calyza aparece
como una **ilustración de cuerpo entero**, estilo cómic/manga limpio:

- **Line-art** de trazo firme en **navy `#14283C`**.
- **Sombreado plano (cel-shading)** con **un único color de realce: cian/teal `#16b6d4`** en
  distintas intensidades. Blancos y crema para las luces.
- Pose relajada y segura, ropa urbana/moderna, actitud editorial de artista musical.
- **Sin texto**, **sin fondo** (fondo transparente o crema `#FBFAF6`), encuadre **vertical**.
- Mucho detalle en cara (parecido real) y ropa; resto minimal.

### Prompt base (reutilizable para todos)
```
Full-body illustrated portrait of a music artist, clean comic/manga-influenced line-art,
confident relaxed pose. Deep navy (#14283C) linework, flat cel-shading using ONE single accent
color: cyan/teal (#16b6d4) in a few intensities, with cream/white highlights. Modern streetwear.
Editorial, minimal, high detail on face and clothing. NO text, transparent (or cream #FBFAF6)
background, vertical 2:3 framing.
```
**Parecido:** para cada artista, **usa su foto real como referencia de imagen** (image-to-image
o reference) para que la cara/pelo/estilo se parezcan. Las fotos están en `public/img/artistas/`.

### Tabla de ilustraciones a generar
Guardar como PNG (fondo transparente ideal) en: **`public/img/artistas/ilustracion/<slug>.png`**

| slug | Artista | Género (para vibe) | Foto ref (parecido) | Prioridad |
|---|---|---|---|---|
| `eva-calyza` | Eva Calyza | Pop mental / electrónica y folclore | `public/img/artistas/eva-calyza.jpg` | ALTA (booking) |
| `dulze` | Dulze | Indie pop / raíz flamenca | `public/img/artistas/dulze.png` | ALTA (booking) |
| `natura` | Nàtura | DJ / productora | `public/img/artistas/natura.jpg` | ALTA (booking) |
| `pablo-rojo` | Pablo Rojo | Funk / jazz | `public/img/artistas/pablo-rojo.jpg` | ALTA (booking) |
| `paule` | Paule | Cantautor / pop de autor | `public/img/artistas/paule.jpeg` | ALTA (booking) |
| `sa-pena` | Sa Pena | Urbano valencià / pop + dnb (DÚO, 2 personas) | `public/img/artistas/sa-pena.jpg` | ALTA (booking) |
| `otem` | OTEM | Urbano / pop alternativo | (sin foto) | MEDIA (booking) |
| `alexdelion` | AlexDeLion | Pop alternativo | `public/img/artistas/alexdelion.png` | MEDIA |
| `d-nacar` | D Nácar | Rap / urbano | `public/img/artistas/d-nacar.jpeg` | MEDIA |
| `hebe` | Hebe | Balada / pop | `public/img/artistas/hebe.jpeg` | MEDIA |
| `marco-la-testa` | Marco la Testa | Rap / urbano | `public/img/artistas/marco-la-testa.jpeg` | MEDIA |
| `kenai-white` | Kenai White | Pop urbano / cantautor | (sin foto) | BAJA |

> Los 7 de **booking** (ALTA) son los que salen en el carrusel showcase de `/artistas` — esos primero.

---

## 4. Logos de marca faltantes (banner del home)

Referencia: **`1784216262565_openai-gen.png`**. El banner "MARCAS QUE HAN SONADO CON NOSOTROS"
necesita estos logos, que **aún NO están** en el repo. Estilo: logo oficial de la marca, versión
**monocromo navy `#14283C` sobre transparente**, limpio, centrado, con aire.

Guardar como PNG transparente en: **`public/img/marcas/<slug>.png`**

| Marca | Ruta destino | Notas |
|---|---|---|
| Corona | `public/img/marcas/corona.png` | Wordmark con corona |
| Absolut | `public/img/marcas/absolut.png` | "ABSOLUT." wordmark |
| Seagram's | `public/img/marcas/seagrams.png` | Script wordmark |
| Monkey 47 | `public/img/marcas/monkey.png` | Mono + "MONKEY 47" |
| Sainte Marguerite | `public/img/marcas/sainte-marguerite.png` | Escudo/villa + texto |
| Le Souffle | `public/img/marcas/le-souffle.png` | Wordmark fino |

> **Ojo legal/parecido:** son marcas reales. Lo ideal es el **logo oficial** (vectorial) en navy.
> Si se generan, que sean fieles y en un solo color (navy) sobre transparente.

(Otras marcas del catálogo sin logo, prioridad baja: Código 1530 `codigo-1530.png`,
Lighthouse `lighthouse.png`, Corre Lola Corre `corre-lola-corre.png`, Sr. Wilson `sr-wilson.png`.)

---

## 5. Dibujitos de Records (iconos del hero)

El hero de `/records` usa iconos SVG hechos a mano (ticket, vinilo, contrato, globo, megáfono).
Funcionan, pero se pueden elevar a **ilustración "dibujo bonito"** (line-art navy + acento cian,
trazo tembloroso a mano, fondo transparente). Si sobra tiempo, generar como PNG/SVG en
`public/img/records/iconos/<nombre>.png`: `booking`, `sello`, `editorial`, `distribucion`, `marketing`.
Prioridad BAJA respecto a artistas y logos.

---

## 6. Método técnico recomendado (para generar "a todo trapo")

El bloqueo de esta web es **descargar** el resultado (los CDN de imágenes están capados por la
política de red). La forma de esquivarlo:

- ✅ **OpenAI `gpt-image-1` con salida base64 (`b64_json` / `response_format: "b64_json"`)**: la
  imagen vuelve como base64 en la propia respuesta JSON — **no hay que descargar de ningún CDN**.
  Se decodifica y se escribe el PNG directo al repo. Es el camino ideal.
- ⚠️ **fal.ai**: devuelve URLs en `fal.media` → habría que descargarlas (mismo problema de CDN,
  puede volver a fallar salvo que la política de red permita ese host).

Ver `docs/GENERACION-IMAGENES.md` para los comandos exactos y cómo habilitar las claves.

---

## 7. Convención de rutas (el código ya las recoge)

- Ilustración de artista: `public/img/artistas/ilustracion/<slug>.png` → la ficha y el showcase
  la usan automáticamente; si no existe, caen a la foto real. **Solo hay que dejar el PNG.**
- Foto de artista (fallback): `public/img/artistas/<slug>.<ext>`.
- Logo de marca: `public/img/marcas/<slug>.png` (slug = minúsculas, sin acentos ni apóstrofes,
  espacios→guiones. Ej. "Seagram's" → `seagrams`).
- El resolvedor de assets prueba extensiones svg/webp/png/jpg/jpeg/avif por ese orden.

**Integrar:** `git add public/img/... && git commit -m "assets: ilustraciones/logos" && git push origin claude/bonito-sound-web-YDR54`

---

## 8. Estado

### Hecho (código)
- Home: narrativa por escenas, banda de artistas (densificada), banda de logos, reel de presentación.
- `/eventos`: rediseño calcado (clúster, counts por marca, "más vídeos", muro de marcas, 250 eventos).
- `/records`: hero calcado (statement torcido + cadena de tags + Marketing NUEVO).
- Menú: Artistas · Eventos · Records · Universo · Nosotros. `/universo` (Artiverse, Giraverse, Jaleo).
- `/artistas`: **showcase carrusel EN CONSTRUCCIÓN** (usa fotos B/N de placeholder hasta que
  lleguen las ilustraciones).
- `/artistas/[slug]`: ficha rediseñada con hueco para la ilustración (fallback a foto).

### Pendiente (assets = esta guía)
- [ ] Ilustraciones de artista (§3) — 7 de booking primero.
- [ ] Logos de marca faltantes (§4) — 6 del banner.
- [ ] (Opcional) Dibujitos de Records (§5).
- [ ] Foto de Vic (`Vic bonito.png`) → ubicar en `/nosotros` cuando se diseñe.
