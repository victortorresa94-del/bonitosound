# Desplegar Bonito Sound en IONOS Deploy Now

Objetivo: **editar → `git push` → la web se actualiza sola**. Nunca más subir
archivos a mano por FTP. Así lo puede usar cualquiera (incluido Dani) con un
chat de IA apuntando al repo.

---

## Cómo funciona (en una frase)

Haces `push` a GitHub → IONOS Deploy Now lo detecta → compila el sitio
(`next build`, que con `output: "export"` genera la carpeta `out/` con HTML/CSS/JS
estáticos) → publica esos archivos en el hosting de IONOS. SSL y dominio, automáticos.

```
tú/Dani editáis  →  git push  →  GitHub Action (IONOS)  →  build  →  web online
```

---

## Setup inicial (SOLO UNA VEZ — lo haces tú en el panel de IONOS)

Necesita tu login de IONOS, por eso no lo puedo hacer yo. Pasos:

1. Entra en **IONOS → Deploy Now** (https://www.ionos.com/hosting/deploy-now) y
   pulsa **"Create project" / "Connect repository"**.
2. Autoriza **GitHub** y elige el repo **`victortorresa94-del/bonitosound`**.
   - Rama: para **probar** elige `deploy-now`. Para **producción** luego cambias a `main`.
3. IONOS detecta que es **Next.js**. Confirma la config del build:
   - **Build command:** `npm run build`
   - **Output / publish directory:** `out`
   - **Node version:** `20`
4. Le das a crear. IONOS **añade un workflow** (`.github/workflows/…yaml`) a tu
   repo → haz `git pull` en local para tenerlo.
5. El **primer deploy corre solo**. Al terminar te da una URL de prueba
   (`algo.ionos.space`). Ábrela y comprueba que todo se ve.
6. **Conectar el dominio** `bonitosound.com`: en Deploy Now → **Domains** →
   añade el dominio y sigue lo que te diga (apuntar los registros DNS en IONOS
   al proyecto). El **SSL se genera solo**.

> Cuando lo de prueba (`deploy-now`) esté OK, en Deploy Now cambia la rama a
> **`main`** para que producción se actualice con lo que ya trabajamos.

---

## El día a día (tú y Dani)

**Todo el contenido de la web vive en archivos de texto editables** (es el "CMS"):

| Qué cambiar | Archivo |
|---|---|
| Textos de la portada (titulares, frases) | `lib/home.ts` |
| Datos: teléfono, emails, dirección, marcas, artistas | `lib/site.ts` |
| Textos de las páginas de servicio | `lib/services.ts`, `lib/servicesDetail.ts` |
| Artículos del diario | `content/*.md` |
| Fichas de artista | `content/artistas/*.md` |
| Imágenes / vídeos | `public/img/…`, `public/video/…` |

**Para publicar un cambio:**
```bash
git add .
git commit -m "cambio X"
git push
```
En 1-2 minutos está online. Eso es todo.

### Para Dani (cero infraestructura)
1. Clona el repo: `git clone https://github.com/victortorresa94-del/bonitosound`
2. Ábrelo con **Claude Code** (o Antigravity, Cursor…) apuntando a esa carpeta.
3. Le dice en lenguaje natural qué cambiar ("cambia el teléfono", "reescribe el
   titular de la home") — la IA edita los archivos de arriba.
4. `git push` → online. Nunca toca servidores ni FTP.

---

## Qué SÍ y qué NO (por ser estático)

- ✅ Todas las páginas, imágenes, vídeos, animaciones, el player de música.
- ✅ Los **301** de las URLs viejas de WordPress (SEO) → están en `public/.htaccess`.
- ✅ El **formulario** funciona: abre un email preparado (`mailto:`), sin backend.
- ❌ **No hay servidor** (es la limitación de Deploy Now). Si algún día se quiere
   guardar los leads en una base de datos, login de usuarios, o algo con backend,
   habría que mover el hosting a uno con Node (Vercel/VPS) — el código está listo
   para ambos (basta quitar `output: "export"`).

---

## Notas técnicas (para quien toque el código)

- `next.config.mjs`: `output: "export"` + `images.unoptimized: true` (sin servidor
  no hay optimización de imágenes on-the-fly).
- Redirects: en `public/.htaccess` (Apache). Los de `next.config` no se aplican
  con export — se dejan ahí solo como referencia.
- `/contacto` y `/contratar` leen el `?a=<slug>` en **cliente** (no servidor),
  para poder ser estáticas.
- **Pendiente recomendado:** optimizar las imágenes de `public/img` (algunas
  pesan 1-2 MB) → la web irá aún más rápida.
