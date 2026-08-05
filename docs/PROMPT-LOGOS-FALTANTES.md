# Prompt para sacar los logos que faltan en toda la web

Pensado para pegar tal cual en una sesión de Claude Code nueva, con permisos
más abiertos que la de hoy (necesita `WebSearch`/`WebFetch` sin restricción y
poder escribir en `public/img/`). Generado el 2026-08-04 a partir del estado
real del repo (`git log` → `70b5ae7`).

---

## El prompt

```
Trabaja en el repo de Bonito Sound (rama main). Faltan 122 logos en la web:
empresas, ayuntamientos, asociaciones y proveedores que han confiado en
Bonito Sound, más 3 logos de obras de teatro. Tu tarea es encontrarlos y
subirlos, uno a uno, con criterio.

1. Empieza ejecutando `node scripts/check-logos.mjs` — te da la lista EXACTA
   y actualizada de lo que falta, agrupado por categoría, con el nombre de
   fichero exacto que espera cada uno (el slug ya calculado). No confíes en
   ninguna lista que veas en otro sitio (puede haberse quedado desfasada):
   la fuente de verdad es ese script, que lee lib/site.ts en vivo.

2. Para cada nombre que falte:
   - Busca su logo OFICIAL: la web propia de la entidad, su kit de prensa/
     marca, o su perfil oficial verificado en redes. Nunca un resultado de
     imágenes sueltas sin verificar de dónde sale.
   - Si es una empresa/marca/festival/agencia: casi siempre tiene página de
     prensa o "brand assets" con el logo en PNG/SVG transparente.
   - Si es un ayuntamiento catalán/español: el escudo oficial suele estar en
     su web institucional o en Wikipedia/Viquipèdia (ficha del municipio,
     con licencia de dominio público al ser un escudo oficial).
   - Si es una asociación pequeña, local o juvenil (la mayoría de
     ASOCIACIONES lo son): es muy probable que NO tenga un logo indexado en
     internet. No pasa nada — se salta y se anota en el informe final. NUNCA
     se dibuja o inventa un logo para rellenar el hueco: la regla del repo es
     que si no hay dato real, el bloque no se pinta (aquí: el nombre se
     queda en texto, que es el fallback que ya existe).
   - Descarta cualquier resultado que parezca una versión pirata, con
     marcas de agua, de mala resolución o de un fan-art no oficial.

3. Guarda el fichero en la carpeta y con el nombre EXACTO que indique el
   script (columna de la izquierda), dentro de public/img/<categoría>/.
   Formato: SVG si lo hay; si no, PNG con fondo transparente; si el logo NO
   tiene versión transparente, un JPG está bien (el sitio ya sabe adaptarse:
   ver el patrón "chip blanco" en components/services/cases.tsx si hace
   falta para los que solo estén en JPG).

4. Cuando termines una categoría, vuelve a correr
   `node scripts/check-logos.mjs` para comprobar que ha bajado el recuento
   y no te has equivocado de nombre de fichero.

5. Además de lo que cubre el script, faltan estos 3, que van en una carpeta
   aparte (no están en lib/site.ts, sino en el array TEATRO de
   components/eventos/TeatroYVisuales.tsx):
   - public/img/teatro/dumbo.png       ← el musical "Dumbo" (gira 2023)
   - public/img/teatro/el-rey-leon.png ← "El Rey León" (musical/gira 2022)
   - public/img/teatro/pinocho.png     ← "Pinocho" (gira 2022)
   Son producciones teatrales infantiles con gira en España — busca el logo
   oficial de la producción concreta (no un logo genérico de Disney u otro
   estudio si la producción es de una compañía de teatro distinta).

6. También falta la carpeta public/img/plataformas/ (Spotify, Apple Music,
   YouTube Music, Amazon Music, Deezer, Tidal, Instagram, TikTok, Shazam) —
   son marcas mundiales con brand kit público, deberían ser las más rápidas
   de las 122. Nombres exactos: revisa distributionPlatforms en lib/site.ts
   y aplica la misma regla de slug (minúsculas, sin acentos, espacios→guión).

7. Cuando acabes, entrega un informe corto: cuántos conseguiste, cuántos se
   quedaron sin logo (con el nombre exacto, para que Bonito los busque en su
   archivo si los tiene) y si tuviste que corregir algún nombre de fichero
   respecto al que calculó el script (avísalo — puede indicar un nombre real
   con una grafía distinta a la de lib/site.ts, que convendría corregir ahí
   también).

NO toques public/img/giras/ ni public/img/artistas-dani/: esas carpetas son
fotos reales de los propios eventos y artistas de Bonito, no logos de
empresas — no se pueden sacar de una búsqueda genérica en internet sin
arriesgar usar la foto de otro evento. Eso lo aporta Dani desde su archivo.
```

---

## Contexto para quien lea esto (no hace falta pegarlo en el prompt)

Estado en el momento de escribir esto (`node scripts/check-logos.mjs`):

| Categoría | Puestos | Faltan |
|---|---|---|
| Marcas | 16/27 | 11 |
| Agencias y festivales | 1/30 | 29 |
| Ayuntamientos | 0/36 | 36 |
| Asociaciones e instituciones | 0/30 | 30 |
| Proveedores | 0/12 | 12 |
| Instituciones (membresías) | 5/5 | 0 ✓ |
| Apoyos | 4/8 | 4 |
| **Total** | **26/148** | **122** |

Más los 3 de teatro y los 8 de plataformas (no los cuenta el script, están
en otro sitio del código) → **133 logos** en total si se hace todo de una vez.

Es intencionadamente un trabajo de búsqueda web extenso (decenas de
ayuntamientos pequeños, asociaciones locales…), por eso Víctor pidió un
prompt para una sesión aparte en vez de intentarlo dentro de esta: aquí no
tenía sentido gastar el turno de hoy en 130 búsquedas una a una.
