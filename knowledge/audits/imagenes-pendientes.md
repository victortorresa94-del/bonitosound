# Imágenes pendientes — mapa accionable (fotos reales)

> Solo **fotos reales** (eventos, artistas, festival, logos de marca). Los dibujos
> del superhéroe / mascota los genera el cliente aparte, no están aquí.
>
> **Por qué este doc y no las imágenes ya puestas:** el entorno de desarrollo
> tiene la red bloqueada — `bonitosound.com` da 403, `web.archive.org` no está en
> la allowlist, OpenAI está bloqueado y Higgsfield está sin créditos. Desde aquí
> **no se puede ni extraer ni generar**. Este mapa deja el trabajo listo para
> ejecutar en cuanto se desbloquee (ver "Cómo desbloquear").

## Specs comunes (skill art-brief)
- Formato final: AVIF o WebP (la web ya sirve con `next/image` en AVIF). Peso < 200 KB tras optimizar con `sharp` (ya está en devDependencies).
- Nombre de fichero = `assetSlug(nombre)`: minúsculas, sin acentos, guiones. Ej. `Ballantine's` → `ballantines`.
- Colocar en `public/img/<categoría>/` y aparece sola (el código resuelve por slug con `findAsset`/`findLogo`).

---

## 1 · Logos de marca (6) — `public/img/marcas/`
Faltan 6 de las 17 del array `brands` (lib/site.ts). Fuente: newsroom/press-kit oficial de cada marca o la sección de marcas de la web actual.

| Fichero | Marca | Nota |
|---|---|---|
| `absolut.svg` (o .png) | Absolut | Logo vectorial oficial preferible |
| `le-souffle.png` | Le Souffle | |
| `codigo-1530.png` | Código 1530 | Tequila Código 1530 |
| `lighthouse.png` | Lighthouse | |
| `corre-lola-corre.png` | Corre Lola Corre | Productora |
| `sr-wilson.png` | Sr. Wilson | |

Specs logo: PNG/SVG con fondo transparente, ~160×48 px de caja, monocromo o color plano. Si falta, hoy sale el nombre en texto (fallback), así que no rompe nada — solo se ve menos pro.

## 2 · Casos / eventos reales (3) — `public/img/casos/`
Carpeta **vacía**. Los 3 casos existen en texto (`content/casos/*.md`) pero sin foto quedan como tarjeta genérica. Estas son **fotos de eventos reales** → solo las tiene el cliente (o la web/archivo antiguos). **No se deben generar con IA**: serían documentación falsa de eventos reales.

| Fichero | Caso | Qué foto |
|---|---|---|
| `ballantines.jpg` | Ballantine's (2023) | Activación de marca con música en directo — foto del evento |
| `pernod-ricard.jpg` | Pernod Ricard | Evento/activación real |
| `gira-1016.jpg` | Gira 1016 | Directo de la gira |

Specs: 16:9 u 4:3, ≥1600 px ancho, editorial, con vida (público, escenario, luz real). AVIF/WebP < 200 KB.

## 3 · Heros de sección (3) — `public/img/heroes/`
Referenciados en código y **no existen**: `findAsset("heroes", "lab")`, `findAsset("heroes", "records")`, `findLogo("heroes", "nosotros")`. (El de `eventos-marcas` sí existe.)

| Fichero | Página | Qué foto real (no dibujo) |
|---|---|---|
| `nosotros.jpg` | `/nosotros` | **Foto real del equipo o de la oficina de Sabadell.** Señal de confianza fuerte. |
| `records.jpg` | `/records` | Estudio de grabación / sesión real |
| `lab.jpg` | `/lab` | Pantallas/producto/oficina tech — real, sobrio |

Specs: horizontal 16:9 o 21:9, ≥1600 px, coherente con el crema de la web. AVIF/WebP.

## 4 · Fotos de artista (puntuales) — `public/img/artistas/`
Casi completo (10 presentes). Pendientes de los publicados: `otem.*` y `kenai-white.*` (hoy en draft / sin foto). Retrato 3:4, ≥800 px.

## 5 · Festival Jaleo (opcional) — `public/img/jaleo/`
Ya hay 10 fotos → la galería funciona. Añadir más solo si se quieren más ediciones (ROADMAP 1.8).

---

## Cómo desbloquear (para poder ejecutar esto)
Hoy no se puede hacer desde el sandbox. Dos caminos:

1. **Ejecutar en local** (tu portátil, con red abierta): `node scripts/scrape-bonito.mjs` descarga todo lo de la web actual a `/scraped/` + `manifest.json`. Luego se mueven los ficheros útiles a las carpetas de arriba y se optimizan con `sharp`.
2. **Abrir la red del entorno**: añadir a la allowlist de egress del entorno `bonitosound.com` (y opcionalmente `web.archive.org`, `logo.clearbit.com`, `upload.wikimedia.org`) y recargar créditos de Higgsfield si se quiere generar los heros de sección. Con eso, en una sesión futura lo hago yo entero. (Config de red del entorno: https://code.claude.com/docs/en/claude-code-on-the-web)

## Qué NO generar con IA
- Fotos de casos/eventos reales y de artistas reales → sería documentación falsa. Solo material auténtico del cliente o de la web/archivo.
- Sí es legítimo generar imágenes **atmosféricas/decorativas** genéricas (un directo, un estudio) para los heros de sección `lab`/`records`, siempre que no se presenten como un evento concreto real.
