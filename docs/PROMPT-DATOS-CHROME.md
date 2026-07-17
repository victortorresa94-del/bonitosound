# Prompt para Claude for Chrome — reunir TODO lo que hay en internet

> Objetivo: que Chrome recorra internet y saque **todo lo público y verificable**
> de cada artista y de Bonito Sound, para no quedarnos cortos. Devuelve los datos
> en el formato exacto de aquí → se pegan directos en el repo (`content/**`),
> nada de tocar código. **Regla de oro: NADA inventado.** Cada cifra o afirmación
> lleva su **fuente (URL)**. Si un dato no se confirma, se deja vacío y va a DUDAS.
>
> Trabaja por fases. Cada fase es un prompt independiente que puedes pegar.

---

## CONTEXTO (pégalo al principio de cualquier fase)

```
Bonito Sound es una agencia musical española (Sabadell). Estoy rellenando su web
y necesito reunir datos PÚBLICOS y VERIFICABLES de su roster de artistas y de la
propia agencia. Norma innegociable: no inventes nada. Toda cifra (oyentes,
seguidores, fechas, hitos) debe venir con su URL de fuente. Si dudas entre dos
artistas con el mismo nombre, NO lo pongas y anótalo en DUDAS. Devuelve SIEMPRE
en el formato exacto que te pido, listo para copiar.

Roster (slug — nombre — pista de a quién buscar):
- dulze — Dulze — indie pop / raíz flamenca. IG @duuuulze
- eva-calyza — Eva Calyza — pop / electrónica y folclore. IG @evacalyza. Álbum "MARCA DIVINA"
- natura — Nàtura — DJ / productora. IG @dj.natura
- pablo-rojo — Pablo Rojo — IG @pablorojomusic
- paule — Paule — IG @paulemusica
- sa-pena — Sa Pena — urbano valencià / pop + drum'n'bass. IG @sa_pena_
- fabian — Fabián D. Cuesta — indie pop/rock, cantautor. IG @fabiandcuesta
- alexdelion — AlexDeLion — IG @alexdelion___
- d-nacar — D Nácar — IG @d__nacar
- daniel-giro — Daniel Giró — IG @danielgiroserratosa
- egon-calle — Egon Calle — (falta IG, búscalo)
- hebe — Hebe — IG @hebe_xx4
- kanela — Kanela — IG @kanelaofficial
- kenai-white — Kenai White — cantautor y actor salmantino (trans, "Dos Vidas" TVE). IG @kenaiwhite
- marco-la-testa — Marco la Testa — IG @marco.la.testa
- rumba-menuda — Rumba Menuda — (falta IG, búscalo)
- otem — OTEM — (posible fichaje; verificar que existe y NO confundir con un OTEM francés)
- soylapau — Soylapau — verificar
- daniel-giro / 96grados / belbaka / egon-calle / overpulation / sotrac — verificar los que falten
```

---

## FASE 1 — FICHA COMPLETA por artista (todo lo público)

```
[PEGA EL CONTEXTO DE ARRIBA]

Para CADA artista, rellena TODOS los campos que puedas de esta ficha (deja vacío
lo que no confirmes). Devuelve un bloque por artista, encabezado con "### <slug>".

Cómo sacar cada dato:
- spotifyArtistId: open.spotify.com/artist/XXXX?... → el ID es "XXXX" (antes del "?").
- oyentes mensuales: el número "oyentes mensuales" que aparece en su perfil de Spotify (apúntalo con la fecha de hoy).
- lastTrackId: su ÚLTIMA canción publicada → open.spotify.com/track/YYYY → "YYYY".
- featuredTracks: sus 3 canciones más escuchadas (IDs de /track/).
- spotifyPlaylistId: si tiene una playlist propia o "This Is <artista>", su ID (open.spotify.com/playlist/ZZZZ).
- instagram: URL completa del perfil oficial + nº de seguidores (con fecha).
- tiktok: URL + seguidores, si tiene y es relevante.
- youtube: URL del canal + 3-4 IDs de vídeos oficiales (videoclips/directos). ID = lo de después de watch?v= o youtu.be/.
- generos: 1-3 etiquetas de su estilo.
- musicStyle: 1 frase describiendo su sonido (con tus palabras, a partir de lo que leas; marca la fuente).
- influences: artistas de referencia que él/ella cite en entrevistas (con fuente).
- bio: 2-3 párrafos de biografía a partir de fuentes públicas (prensa, su web, Wikipedia). Cita las fuentes; no copies textual largo.
- milestones: hitos VERIFICABLES con año → lanzamientos, giras, festivales donde tocó, premios, TV, prensa. Cada uno con su URL.
- firstConcert / lastConcert: si encuentras fecha + sala + ciudad de algún directo suyo (con fuente).
- fotos: 1-3 URLs de fotos de prensa suyas (de su web/prensa, no de terceros con copyright dudoso).
- prensa: 2-4 enlaces a artículos/entrevistas sobre el artista.

FORMATO DE SALIDA (uno por artista):

### dulze
spotifyArtistId: ""
oyentesMensuales: ""            # ej. "24.312 (17-jul-2026)"
lastTrackId: ""
featuredTracks: ["", "", ""]
spotifyPlaylistId: ""
instagram: "https://www.instagram.com/duuuulze/"
seguidoresIG: ""
tiktok: ""
youtubeCanal: ""
youtubeIds: ["", "", ""]
generos: ["", ""]
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
FUENTES: [lista de todas las URLs usadas para este artista]

(repite para los ~16 publicados y también para los draft: otem, 96grados,
belbaka, overpulation, sotrac, soylapau — de estos, todo lo que encuentres, que
queremos publicarlos).

Al final: sección "DUDAS" con lo que no hayas podido confirmar y por qué.
```

---

## FASE 2 — Noticias y prensa de Bonito Sound (para el blog)

```
[PEGA EL CONTEXTO]

1) Entra en https://bonitosound.com y busca su apartado de noticias/blog (hay
   ~4 entradas). Para CADA una:

### <titular exacto>
date: "AAAA-MM-DD"
imagen: "URL de la cabecera o 'sin imagen'"
fuente: "URL de la noticia"
---
<cuerpo ENTERO en párrafos, tal cual está publicado; no resumas>

2) Busca además menciones de prensa sobre BONITO SOUND en medios (no en su web):
   entrevistas, notas sobre Jaleo Sound, sobre Artiverse, fichajes, giras.
   Dame título + medio + fecha + URL de cada una (10-15 si las hay).
```

---

## FASE 3 — Instagram: los mejores reels de cada artista (el "currazo")

```
[PEGA EL CONTEXTO]

Para CADA artista, entra en su Instagram y localiza sus 3-4 REELS más potentes
(más reproducciones, o los que mejor muestran su directo/energía). Dame la URL
completa de cada reel. Prioriza calidad: mejor 3 buenos que 6 flojos.

### dulze
reels:
  - "https://www.instagram.com/reel/XXXX/"
  - "https://www.instagram.com/reel/YYYY/"
  - "https://www.instagram.com/reel/ZZZZ/"

(repite por artista; "SIN REELS" si no tiene).
```

---

## FASE 4 — Marca, eventos, Jaleo y verificación de enlaces

```
[PEGA EL CONTEXTO]

A) VERIFICA que estos enlaces existen y apuntan a lo correcto (dame el estado y,
   si cambió, la URL buena):
   - https://giraverse.es
   - https://artiverse.es
   - https://jaleosound.com
   - LinkedIn de Bonito Sound (busca el slug real de la company)
   - https://www.barcelona.cat/fabraicoats
   - https://www.redescena.net
   - https://www.catalunyacultura.cat

B) MEMBRESÍAS/ APOYOS — confirma con fuente pública si Bonito Sound aparece como
   miembro o apoyado por: UFI, SGAE, AGEDI, ARTE, AEDEM, European Music Council,
   Institut Ramon Llull, Plan de Recuperación UE, Ministerio de Cultura, Instituto
   Cervantes, Embajada de España en Holanda, AIE, Stadsdeel Amsterdam. Marca cada
   una: CONFIRMADA (+URL) / NO ENCONTRADA.

C) MARCAS CLIENTE — para cada marca con la que Bonito dice haber trabajado
   (Ballantine's, Pernod Ricard, Pepsico, Schweppes, Corona, Absolut, Font Vella,
   Four Roses, Seagram's, Monkey, Sainte Marguerite, Le Souffle, Universal,
   Gestmusic, Concert Studio, Global Talent Services, Sweet Bird, Código 1530,
   Lighthouse, Corre Lola Corre, Sr. Wilson): ¿hay algún caso/foto/nota pública
   del evento? Si sí, dame título + fecha + ciudad + artista + URL.

D) JALEO SOUND — dame: fechas y sede de las ediciones (2024/2025/2026), line-up
   de cada edición, y enlaces (web, prensa, tickets). Con fuente.

E) EQUIPO — datos públicos (LinkedIn/prensa) de Dani Boada, Manu Rojo, Xavi Julià,
   Cristina Soler, Víctor Torres: rol y una línea verificable. Solo lo público.
```

---

## Cómo lo integro yo (para que sepas por qué pido cada cosa)

| Dato | Campo en el repo | Qué activa en la web |
|---|---|---|
| spotifyArtistId | `spotifyArtistId` | botón Spotify real + embed del artista |
| lastTrackId / featuredTracks | idem | sección "Música destacada" con temas |
| oyentes/seguidores | `stats: [{value,label}]` | bloque "En números" |
| musicStyle / influences / generos | `musicStyle` / `influences` / `genre` | bloque "Su sonido" |
| bio | cuerpo del `.md` | biografía de la ficha |
| milestones | `milestones` | trayectoria |
| first/lastConcert | `firstConcert`/`lastConcert` | bloque "Directo" |
| youtubeIds | `youtubeIds` | vídeos intercalados |
| reels | `reels` | feed de reels |
| fotos | `public/img/artistas/<slug>` | foto de la ficha/roster |
| noticias | `content/diario/*.md` | posts del blog (SEO) |
| enlaces/membresías/marcas/Jaleo | `lib/site.ts` + páginas | credibilidad, casos, footer |

> Todo cae en su sitio sin tocar código. Pásame lo que saque Chrome (fase a fase
> o de golpe, como bloques de texto) y lo aplico.
