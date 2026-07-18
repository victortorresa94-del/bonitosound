# Prompt para Claude for Chrome — research exhaustivo con anclas

> Objetivo: que Chrome saque **todo lo público y verificable** de cada artista y
> de Bonito Sound, SIN perderse entre homónimos. Para eso, cada artista lleva sus
> **ANCLAS** (perfil de Spotify exacto, Instagram, nombre real, ciudad, temas
> conocidos): Chrome debe **partir de esas anclas**, no de una búsqueda a ciegas.
>
> Formato de salida = el que se pide en cada fase, listo para pegar en el repo.
> **Regla de oro: NADA inventado. Toda cifra/afirmación con su URL de fuente.**
> Lo que no se confirme, vacío y a "DUDAS".

---

## 0. CONTEXTO (pégalo al inicio de CUALQUIER fase)

```
Bonito Sound es una agencia musical española con sede en Sabadell (Barcelona):
sello, booking, management, distribución y eventos. Estoy rellenando su web y
necesito datos PÚBLICOS y VERIFICABLES de su roster y de la agencia.

INNEGOCIABLE:
- No inventes NADA. Cada dato (oyentes, seguidores, fechas, hitos) con su URL.
- Usa las ANCLAS de cada artista para asegurarte de que es LA persona correcta.
  Hay muchos homónimos: si el perfil que encuentras no cuadra con las anclas
  (ciudad, género, temas, Instagram), NO lo uses y anótalo en DUDAS.
- Devuelve SIEMPRE en el formato exacto que te pido.
```

---

## 1. ANCLAS POR ARTISTA (el mapa para no perderse)

> Para cada artista: parte del **perfil de Spotify** (ya es el correcto) y del
> **Instagram**. Los que ponen "FALTA Spotify" son los que hay que encontrar —
> úsalos con el nombre real + ciudad + temas para dar con el perfil bueno.

**PUBLICADOS (16):**

- **dulze — Dulze** · Indie pop / raíz flamenca · IG https://www.instagram.com/duuuulze/
  Es **María Lorenzo, de Chipiona (Cádiz)**. EP "GATEA", single "Verde aceituna", gira "Qué Fantasía Tour".
  ⚠️ FALTA Spotify → búscalo por "Dulze Verde aceituna" o "Dulze GATEA" (NO cualquier "Dulze").

- **eva-calyza — Eva Calyza** · Pop mental / electrónica + folclore · Spotify https://open.spotify.com/artist/6rUgNfaBgUk0WCQbNafgKh · IG https://www.instagram.com/evacalyza/
  Álbum "MARCA DIVINA" (2025), EP "afilá", single "La Tarara". Andaluza.

- **natura — Nàtura** · DJ / productora · Spotify https://open.spotify.com/artist/07Epl3n2QMYOUTYqZNfj3F · IG https://www.instagram.com/dj.natura/
  Hard techno + escena urbana catalana. Sets en Share Festival, Festiuet, FiM.

- **pablo-rojo — Pablo Rojo** · Funk / jazz · Spotify https://open.spotify.com/artist/3oEmG4GjzHpKvCYYMvad67 · IG https://www.instagram.com/pablorojomusic
  Base en Ámsterdam.

- **paule — Paule** · Cantautor / pop de autor · Spotify https://open.spotify.com/artist/79qGj0n6B3skao1b5Ojt2V · IG https://www.instagram.com/paulemusica/

- **sa-pena — Sa Pena** · Urbano valencià / pop + drum'n'bass · IG https://www.instagram.com/sa_pena_
  De **La Safor**, cantan en valencià, proyecto entre primos. Singles "FCK PENA", "Tot Canvia". **Finalistas Sona9 2023**.
  ⚠️ FALTA Spotify → búscalo por "Sa Pena Tot Canvia" o "Sa Pena Sona9".

- **fabian — Fabián D. Cuesta** · Indie pop/rock, cantautor · Spotify https://open.spotify.com/artist/3NOAlABNpDcz4WxKSiBTh7 · IG https://www.instagram.com/fabiandcuesta/
  De León, +15 años independiente, 6 discos + 1 EP.

- **alexdelion — AlexDeLion** · Pop alternativo · Spotify https://open.spotify.com/artist/5gvO2O6bXDd05O5nV1seng · IG https://www.instagram.com/alexdelion___/

- **d-nacar — D Nácar** · Rap / urbano · Spotify https://open.spotify.com/artist/5KYVUnPDSlv6g86mQ0EBsp · IG https://www.instagram.com/d__nacar/
  Sabadell. "1 Feeling (Remix)" con Marco la Testa.

- **daniel-giro — Daniel Giró** · Jazz · Spotify https://open.spotify.com/artist/6OlVyNGO5XzLb6YsKOHJHm · IG https://www.instagram.com/danielgiroserratosa/
  De Sabadell, lidera su propia orquesta.

- **egon-calle — Egon Calle** · Flamenco fusión / soul / indie / electrónica · Spotify https://open.spotify.com/artist/73GXtlzsrh32dnAiAO2xpO
  De **El Masnou**. EP "Las Flores Cortadas" (2022). Singles "Que te castiguen", "De Menos", "Llegar a España".
  ⚠️ FALTA Instagram → búscalo.

- **hebe — Hebe** · Balada / pop · Spotify https://open.spotify.com/artist/5IAbHdlZ1RfltWFYdNaWAO · IG https://www.instagram.com/hebe_xx4/
  Poca huella pública; céntrate en Spotify.

- **kanela — Kanela** · Reggaetón + pop + house · Spotify https://open.spotify.com/artist/2IqxZH8QxR7KJ0C6JH5i39 · IG https://www.instagram.com/kanelaofficial/
  Nacida en Santiago de Chile, criada en Suecia.

- **kenai-white — Kenai White** · Pop urbano / cantautor · IG https://www.instagram.com/kenaiwhite/
  Cantautor, productor y **actor de Salamanca**. Serie "Dos Vidas" (TVE). Single "Soy Trans". **Tiene Wikipedia**.
  ⚠️ FALTA Spotify → búscalo por "Kenai White" (confírmalo con la Wikipedia).

- **marco-la-testa — Marco la Testa** · Rap / urbano · Spotify https://open.spotify.com/artist/3thnuvOXFSGGF5CRjxlqCQ · IG https://www.instagram.com/marco.la.testa/
  "1 Feeling (Remix)" con D Nácar.

- **rumba-menuda — Rumba Menuda** · Música infantil / rumba catalana · Spotify https://open.spotify.com/artist/6TRII33dajYbLquqNZsxOr
  Espectáculos infantiles. ⚠️ FALTA Instagram → búscalo.

**EN DRAFT (6) — verificar antes de publicar, ojo con homónimos:**

- **96grados — 96Grados** · ⚠️ el homónimo mexicano NO es el correcto. Busca el ligado a Bonito Sound / Sabadell.
- **belbaka — Belbaka** · sin rastro claro; posible variación de escritura del nombre.
- **otem — OTEM** · posible **Aleix Otem (Mollet del Vallès)** — confirmar. **NO** confundir con un OTEM francés.
- **overpulation — Overpulation** · sin rastro con ese nombre exacto; posible variación.
- **sotrac — Sotrac** · existe banda **Sotrac (Llagostera, Girona)** — confirmar si es la de la agencia.
- **soylapau — Soylapau** · pista: **Paula Giberga / "La Pau"** — validar.

---

## FASE 1 — FICHA COMPLETA por artista

```
[PEGA EL CONTEXTO (§0) + LAS ANCLAS del artista/s que trabajes (§1)]

Para CADA artista, PARTIENDO de su ancla (Spotify + Instagram), rellena TODOS los
campos que puedas. Deja vacío lo que no confirmes. Un bloque por artista.

Cómo sacar cada dato:
- spotifyArtistId: en la URL del perfil, la parte después de /artist/ y antes del "?".
- oyentesMensuales: el número "oyentes mensuales" del perfil de Spotify (con fecha de hoy).
- lastTrackId: su ÚLTIMA canción → open.spotify.com/track/YYYY → "YYYY".
- featuredTracks: sus 3 temas más escuchados (IDs de /track/).
- spotifyPlaylistId: si tiene playlist propia o "This Is <artista>" (ID de /playlist/).
- instagram: URL del perfil + nº seguidores (con fecha). tiktok: URL + seguidores si tiene.
- youtube: canal + 3-4 IDs de vídeos oficiales (ID tras watch?v= o youtu.be/).
- generos, musicStyle (1 frase), influences (con fuente), bio (2-3 párrafos con fuentes).
- milestones: hitos con año + fuente (lanzamientos, giras, festivales, premios, TV, prensa).
- firstConcert / lastConcert: fecha + sala + ciudad (con fuente) si los hay.
- fotos: 1-3 URLs de fotos de prensa suyas. prensa: 2-4 enlaces a artículos/entrevistas.

FORMATO (uno por artista, encabezado "### <slug>"):

### dulze
spotifyArtistId: ""
oyentesMensuales: ""
lastTrackId: ""
featuredTracks: ["", "", ""]
spotifyPlaylistId: ""
instagram: "https://www.instagram.com/duuuulze/"
seguidoresIG: ""
tiktok: ""
youtubeCanal: ""
youtubeIds: ["", "", ""]
generos: ["indie pop", "raíz flamenca"]
musicStyle: ""
influences: ["", ""]
bio: |
  Párrafo 1…
  Párrafo 2…
milestones:
  - { year: "", text: "", fuente: "" }
firstConcert: { date: "", venue: "", city: "", fuente: "" }
lastConcert:  { date: "", venue: "", city: "", fuente: "" }
fotos: ["", ""]
prensa: ["", ""]
FUENTES: [todas las URLs usadas]

Al final: "DUDAS" con lo no confirmado y por qué.
```

---

## FASE 1B — IMÁGENES de cada artista (recolecta de fotos)

```
[PEGA EL CONTEXTO (§0) + LAS ANCLAS (§1) de los artistas que trabajes]

Para CADA artista, recopila 3-6 FOTOS suyas de la mejor calidad posible, SIEMPRE
de la persona correcta (usa las anclas). Fuentes por orden de preferencia:
1) Su web oficial / press kit / dossier de prensa.
2) Su Spotify (foto de artista) y su Instagram (fotos de prensa/directo, no memes).
3) Medios/prensa con foto suya acreditada.
Evita: fotos borrosas, con marca de agua ajena, capturas, o de terceros con
copyright dudoso. Si una foto tiene autor/crédito, anótalo.

Para cada foto dame: URL DIRECTA a la imagen (que termine en .jpg/.png/.webp si
puede), orientación (vertical/horizontal/cuadrada), resolución aprox y fuente.

⭐ FOTO PRINCIPAL (la de la ficha y el roster) — muy importante:
- VERTICAL (retrato), cara o medio cuerpo, buena resolución (≥1000 px de ancho).
- Que quede bien en BLANCO Y NEGRO (la web las muestra en B/N y a color al pasar
  el ratón), fondo no recargado.
- Márcala con "★".

Formato por artista:

### dulze
principal: "★ https://…/foto.jpg  (vertical, ~1200x1600, fuente: web oficial)"
galeria:
  - "https://…/foto2.jpg  (horizontal, prensa, autor: …)"
  - "https://…/foto3.jpg  (vertical, Instagram)"
FUENTES: [todas las URLs]

Si puedes DESCARGAR las imágenes, nómbralas así y pásamelas:
  <slug>.jpg           → la principal (ej. dulze.jpg)
  <slug>-2.jpg, -3.jpg → galería
Si no puedes descargarlas, con las URLs directas me vale.
```

Haz esto sobre todo para los que **NO tienen buena foto** o ninguna, pero recoge
para todos (mejor tener galería). Los `draft` (OTEM, 96Grados, Belbaka,
Overpulation, Sotrac, Soylapau): solo si confirmas que es la persona correcta.

---

## FASE 2 — Noticias y prensa de Bonito Sound (para el blog)

```
[PEGA §0]

1) Entra en https://bonitosound.com → apartado de noticias/blog (~4 entradas).
   Para CADA una:

### <titular exacto>
date: "AAAA-MM-DD"
imagen: "URL de cabecera o 'sin imagen'"
fuente: "URL de la noticia"
---
<cuerpo ENTERO en párrafos, tal cual; no resumas>

2) Busca menciones de prensa sobre BONITO SOUND, JALEO SOUND y ARTIVERSE en
   medios (no en su web): entrevistas, fichajes, giras, festival. Dame título +
   medio + fecha + URL (10-15 si las hay).
```

---

## FASE 3 — Los mejores reels de Instagram por artista

```
[PEGA §0 + las ANCLAS de Instagram de §1]

Para CADA artista, entra en SU Instagram (el de las anclas, no otro) y localiza
sus 3-4 REELS más potentes (más reproducciones o mejor directo/energía). URL
completa de cada reel. Mejor 3 buenos que 6 flojos.

### dulze
reels:
  - "https://www.instagram.com/reel/XXXX/"
  - "https://www.instagram.com/reel/YYYY/"
(repite; "SIN REELS" si no tiene)
```

---

## FASE 4 — Marca, eventos, Jaleo y verificación de enlaces

```
[PEGA §0]

A) VERIFICA estos enlaces (estado + URL correcta si cambió):
   giraverse.es · artiverse.es · jaleosound.com · LinkedIn de Bonito Sound
   (slug real) · barcelona.cat/fabraicoats · redescena.net · catalunyacultura.cat

B) MEMBRESÍAS/APOYOS — confirma con fuente si Bonito Sound es miembro/está apoyado
   por: UFI, SGAE, AGEDI, ARTE, AEDEM, European Music Council, Institut Ramon
   Llull, Plan de Recuperación UE, Ministerio de Cultura, Instituto Cervantes,
   Embajada de España en Holanda, AIE, Stadsdeel Amsterdam. CONFIRMADA(+URL)/NO.

C) MARCAS CLIENTE — para Ballantine's, Pernod Ricard, Pepsico, Schweppes, Corona,
   Absolut, Font Vella, Four Roses, Seagram's, Monkey, Sainte Marguerite, Le
   Souffle, Universal, Gestmusic, Concert Studio, Global Talent Services, Sweet
   Bird, Código 1530, Lighthouse, Corre Lola Corre, Sr. Wilson: ¿hay caso/foto/
   nota pública del evento con Bonito? Si sí: título + fecha + ciudad + artista + URL.

D) JALEO SOUND — fechas y sede de las ediciones (2024/2025/2026), line-up de cada
   una, y enlaces (web, prensa, tickets). Con fuente.

E) EQUIPO — datos públicos (LinkedIn/prensa) de Dani Boada, Manu Rojo, Xavi Julià,
   Cristina Soler, Víctor Torres: rol + una línea verificable. Solo lo público.
```

---

## Cómo lo integro yo (por qué pido cada cosa)

| Dato | Campo en el repo | Qué activa en la web |
|---|---|---|
| spotifyArtistId | `spotifyArtistId` | botón Spotify real + embed |
| lastTrackId / featuredTracks | idem | sección "Música destacada" |
| oyentes/seguidores | `stats: [{value,label}]` | bloque "En números" |
| musicStyle / influences / generos | `musicStyle`/`influences`/`genre` | bloque "Su sonido" |
| bio | cuerpo del `.md` | biografía de la ficha |
| milestones | `milestones` | trayectoria |
| first/lastConcert | `firstConcert`/`lastConcert` | bloque "Directo" |
| youtubeIds | `youtubeIds` | vídeos |
| reels | `reels` | feed de reels |
| foto principal | `public/img/artistas/<slug>.jpg` | foto de la ficha y del roster (B/N → color al hover) |
| galería | `content/artistas/<slug>.md` → `gallery: [...]` | bloque de galería de la ficha |
| noticias | `content/diario/*.md` | posts del blog (SEO) |
| enlaces/membresías/marcas/Jaleo | `lib/site.ts` + páginas | credibilidad, casos, footer |

> Todo cae en su sitio sin tocar código. Pásame lo que saque Chrome (por fases o
> de golpe, en bloques de texto) y lo aplico.
