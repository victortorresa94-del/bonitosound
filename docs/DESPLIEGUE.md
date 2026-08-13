# Poner la web nueva en marcha (y no romper la vieja)

Guía de despliegue de bonitosound.com. Escrita para hacerla de arriba abajo en
una tarde, en el orden en que está.

---

## Resumen en tres frases

1. **El dominio se queda en IONOS.** No hay que mover el dominio ni el correo:
   solo se cambian dos registros DNS al final del todo.
2. **La web se aloja en Vercel**, no en el hosting de WordPress de IONOS. Es
   gratis para este tamaño y es el sitio donde Next.js funciona sin tocar nada.
3. **Dani edita desde una pantalla web**, sin GitHub y sin código, con Keystatic
   (paso 6). Escribe, le da a guardar y la web se actualiza sola.

---

## Por qué NO al hosting actual de IONOS

El hosting donde vive el WordPress es **PHP + ficheros estáticos**. Esta web es
**Next.js con servidor**: hay un `middleware.ts` que reescribe `/ca/...` para
servir el catalán sin duplicar 35 páginas, hay páginas que se renderizan en
servidor y hay optimización de imágenes en tiempo real.

Metida ahí tal cual, **no arranca**. Habría que exportarla a estático y, al
hacerlo, se cae el catalán (el middleware desaparece) y las imágenes dejan de
optimizarse. Sería rehacer una parte del trabajo para acabar con una web peor.

Alternativas reales, por si las quieres comparar:

| Dónde | Coste | Funciona tal cual | Mantenimiento |
|---|---|---|---|
| **Vercel** ← recomendado | 0 € en Hobby | Sí, es la casa de Next.js | Ninguno |
| IONOS Deploy Now | desde ~5 €/mes | Sí, con Node | Poco |
| VPS de IONOS | desde ~10 €/mes | Sí, montándolo tú | Tuyo: nginx, pm2, SSL, actualizaciones |
| Hosting WordPress actual | ya pagado | **No** | — |

Con Vercel el dominio sigue siendo tuyo y sigue en IONOS. Vercel solo sirve las
páginas.

---

## Paso 1 · Copia de seguridad del WordPress (antes de nada)

Aunque la web actual no te guste, **no se borra hasta dentro de un mes**. Y
antes de tocar nada, tres copias:

1. **Copia completa desde IONOS**
   Panel de IONOS → *Hosting* → tu paquete → *Copias de seguridad*. Descarga la
   copia del día a tu ordenador. Ahí va todo: ficheros + base de datos.

2. **Exportar el contenido desde WordPress**
   `wp-admin` → *Herramientas* → *Exportar* → **Todo el contenido** → descargar.
   Sale un `.xml` con entradas, páginas y menús. Pesa poco y se lee con
   cualquier editor: es tu red de seguridad para recuperar un texto suelto.

3. **Bajarte los medios**
   `wp-admin` → *Medios* → o por FTP la carpeta `wp-content/uploads/`. Son las
   fotos y PDFs que subisteis en su día. Guárdalo en el Drive junto a lo de Dani.

Guarda las tres cosas en una carpeta con la fecha. **No canceles el hosting de
IONOS**: mientras el WordPress siga en pie, siempre se puede volver atrás
cambiando el DNS.

---

## Paso 2 · Apuntar TODAS las URLs de la web vieja

Esto es lo que evita perder el Google que ya tienes. Cada URL antigua que quede
sin destino nuevo es una visita perdida.

1. Abre `https://bonitosound.com/sitemap_index.xml` (o `/sitemap.xml`, o
   `/wp-sitemap.xml` — WordPress usa uno de los tres) y copia la lista entera.
2. En **Google Search Console** → *Páginas* → exporta las URLs indexadas.
3. Junta las dos listas y quita duplicados.

Con esa lista, cada URL vieja necesita una de estas dos cosas:

- **Existe algo equivalente** → una redirección 301.
- **No existe nada equivalente** → 301 a la sección más parecida (nunca al home
  a lo bruto, y nunca dejarla en 404).

Las redirecciones se escriben en `next.config.mjs`, en el bloque `redirects()`.
Ya hay unas cuantas puestas de antes; se añaden al final del array:

```js
{ source: "/la-url-vieja", destination: "/la-nueva", statusCode: 301 },
```

**Pásame la lista y las escribo yo de una tacada.** Es el paso que más se
descuida y el que más caro sale.

---

## Paso 3 · Subir el código a GitHub

Ya está: el repo es `victortorresa94-del/bonitosound` y todo el trabajo está en
la rama `claude/bonito-sound-web-YDR54`. Antes de desplegar hay que **fusionarla
a `main`**, que es la rama que Vercel va a publicar.

---

## Paso 4 · Conectar Vercel

1. Entra en [vercel.com](https://vercel.com) y regístrate **con la cuenta de
   GitHub** (así ve el repo directamente).
2. *Add New…* → *Project* → elige `bonitosound` → *Import*.
3. No toques nada de la configuración: Vercel detecta Next.js solo.
4. *Deploy*. Tarda un par de minutos.
5. Te da una URL tipo `bonitosound-xxxx.vercel.app`. **Esa es la web nueva,
   funcionando, sin haber tocado el dominio.**

Enséñasela a Dani por ahí. Todo lo que haya que corregir se corrige mientras la
web vieja sigue en pie y nadie se entera.

A partir de aquí, **cada vez que se suba un cambio a `main`, Vercel lo publica
solo**. No hay que volver a entrar aquí nunca.

---

## Paso 5 · Cambiar el DNS en IONOS (el momento del salto)

Cuando la de `.vercel.app` esté aprobada:

1. En Vercel: *Project* → *Settings* → *Domains* → añade `bonitosound.com` y
   `www.bonitosound.com`. Vercel te dirá exactamente qué dos registros poner.
2. En IONOS: *Dominios y SSL* → `bonitosound.com` → *DNS*.
3. Cambia estos dos (los valores exactos te los da Vercel en el paso 1):

   | Tipo | Nombre | Valor |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

4. **No toques los registros `MX` ni los `TXT`.** Son el correo. Si los borras,
   dejáis de recibir emails en `bonito@bonitosound.com`. Es el error clásico.
5. El cambio tarda entre 10 minutos y 2 horas en verse en todas partes.
6. El certificado HTTPS lo emite Vercel solo, gratis, en cuanto detecta el DNS.

**Truco para dormir tranquilo:** haz el cambio un martes por la mañana, no un
viernes por la tarde. Si algo va mal, se vuelve a los valores viejos de IONOS y
en dos horas está el WordPress de vuelta.

---

## Paso 6 · Que Dani pueda editar sin tocar código

Esta es la parte que hay que decidir. El contenido de la web (los textos de las
giras, las fichas de artistas, las bios) está en ficheros de texto dentro del
repo, en `content/`. Hoy se editan escribiendo. Para que Dani no tenga que:

### Recomendación: **Keystatic**

Es un panel de administración que se instala **dentro de la propia web**. Dani
entra en `bonitosound.com/keystatic`, se identifica con GitHub, y ve formularios:
título, año, número de conciertos, foto, texto. Le da a guardar y Vercel publica
en dos minutos.

- Gratis, sin servidor aparte y sin base de datos.
- El contenido sigue siendo ficheros del repo: si un día se abandona Keystatic,
  no se pierde nada.
- Se configura en un rato — **es lo siguiente que hago si me dices que sí.**

### Alternativas

- **Sanity / Contentful**: más potentes, con base de datos y roles. Gratis hasta
  cierto uso. Es más de lo que hace falta aquí y ata el contenido a un tercero.
- **Dejarlo como está**: los cambios los hacéis pidiéndolos. Vale si son pocos y
  espaciados.

---

## Paso 7 · El día después

- **Google Search Console**: da de alta el dominio otra vez y manda el sitemap
  nuevo → `https://bonitosound.com/sitemap.xml`.
- **Comprueba 15 URLs viejas a mano**: pégalas en el navegador y mira que caen
  donde deben.
- **Deja el WordPress un mes** antes de cancelar nada. Cuesta poco y es el único
  seguro que tienes.
- **Analítica**: si el WordPress tenía Google Analytics o Meta Pixel, hay que
  volver a ponerlo aquí. Dime los IDs y lo enchufo.

---

## Lo que necesito de ti para cerrar esto

| # | Qué |
|---|---|
| 1 | La lista de URLs del sitemap viejo (paso 2) → escribo las redirecciones |
| 2 | ¿Monto Keystatic para Dani? (paso 6) |
| 3 | Los IDs de Analytics / Pixel, si los había |
| 4 | Acceso a Vercel, o lo creas tú con GitHub y me dices cuándo está |
