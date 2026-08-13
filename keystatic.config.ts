import { config, fields, collection } from "@keystatic/core";

/**
 * KEYSTATIC — el panel para que Dani edite sin tocar código.
 *
 * Vive en /keystatic. Por debajo NO hay base de datos: escribe los mismos
 * ficheros markdown de content/ que ya lee la web. Si algún día se quita
 * Keystatic, no se pierde nada — los ficheros siguen ahí.
 *
 * ── Dos modos ──
 * · `local`: escribe directamente en el disco. Solo sirve en desarrollo
 *   (`npm run dev`), porque en Vercel el disco es de solo lectura.
 * · `github`: hace commit al repositorio a través de una GitHub App, con un
 *   selector de rama en la propia interfaz. Es el modo bueno.
 *
 * El modo lo decide la variable de entorno, no una constante escrita a mano:
 * así el mismo código funciona en local y en producción sin tocarlo. Mientras
 * no existan las variables de la GitHub App, cae a `local` y no rompe nada.
 * El paso a paso para crearlas está en docs/KEYSTATIC.md.
 *
 * ── Por qué `branchPrefix` ──
 * Obliga a que todo lo que se edite desde el panel vaya a una rama `edita/…`,
 * NUNCA directamente a main. Dani guarda → sale una rama → Vercel publica esa
 * rama en una URL de previsualización → Víctor la mira y la fusiona. Es
 * exactamente lo que pidió: que se vea antes de que entre.
 *
 * ── Qué NO se toca desde aquí ──
 * Los datos duros que confirmó Dani (años y nº de conciertos de cada gira)
 * viven en lib/giras.ts, no en markdown. No están en el panel a propósito: son
 * la fuente de verdad de la sección y no deben cambiarse por accidente al
 * retocar un texto.
 */

const modoGithub = Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID);

const storage = modoGithub
  ? ({
      kind: "github" as const,
      repo: { owner: "victortorresa94-del", name: "bonitosound" },
      branchPrefix: "edita/",
    })
  : ({ kind: "local" as const });

/** Campo de texto largo reutilizable: el cuerpo del artículo o de la ficha. */
const cuerpo = fields.markdoc.inline({
  label: "Texto",
  description: "El cuerpo. Un párrafo por bloque; se pinta tal cual en la web.",
});

export default config({
  storage,
  ui: {
    brand: { name: "Bonito Sound" },
    navigation: {
      Contenido: ["giras", "artistas", "diario"],
    },
  },
  collections: {
    giras: collection({
      label: "Giras",
      path: "content/giras/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Título de la página",
            description: "Ej.: «Producción y tour management de la gira de Anne Lukin».",
            validation: { isRequired: true },
          },
          slug: {
            label: "Slug",
            description:
              "TIENE que coincidir con el slug de la gira en lib/giras.ts, si no la página no encuentra sus datos.",
          },
        }),
        artist: fields.text({ label: "Artista", validation: { isRequired: true } }),
        type: fields.select({
          label: "Tipo",
          options: [
            { label: "Gira", value: "gira" },
            { label: "Festival", value: "festival" },
            { label: "Showcase", value: "showcase" },
          ],
          defaultValue: "gira",
        }),
        year: fields.text({
          label: "Año",
          description: "Solo el año, en texto. Ej.: «2022».",
          validation: { isRequired: true },
        }),
        location: fields.text({ label: "Dónde", description: "Opcional. Ej.: «España»." }),
        context: fields.text({
          label: "Entradilla",
          description: "Una o dos frases. Es lo que se lee bajo el titular y en Google.",
          multiline: true,
          validation: { isRequired: true },
        }),
        services: fields.array(fields.text({ label: "Servicio" }), {
          label: "Qué pusimos",
          description: "Ej.: «Producción técnica», «Tour management». Solo si es real.",
          itemLabel: (p) => p.value,
        }),
        lineup: fields.array(fields.text({ label: "Nombre" }), {
          label: "Line-up",
          itemLabel: (p) => p.value,
        }),
        result: fields.text({ label: "Cierre", description: "La frase que remata el relato.", multiline: true }),
        youtubeId: fields.text({
          label: "ID de YouTube",
          description: "Solo el id, no la URL entera. Ej.: «r47SP4OULcI».",
        }),
        videoUrl: fields.text({ label: "Vídeo (nombre de fichero)", description: "Ej.: «anne-lukin.mp4»." }),
        content: cuerpo,
      },
    }),

    artistas: collection({
      label: "Artistas",
      path: "content/artistas/*",
      slugField: "name",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        name: fields.slug({
          name: { label: "Nombre", validation: { isRequired: true } },
          slug: { label: "Slug", description: "El de la URL: /artistas/<slug>." },
        }),
        genre: fields.text({ label: "Género", description: "Ej.: «Indie pop / Raíz flamenca»." }),
        tier: fields.select({
          label: "Relación",
          options: [
            { label: "Booking", value: "booking" },
            { label: "Distribución", value: "distribucion" },
          ],
          defaultValue: "booking",
        }),
        services: fields.array(fields.text({ label: "Servicio" }), {
          label: "Qué le llevamos",
          description: "Booking, Management, Records, Editorial…",
          itemLabel: (p) => p.value,
        }),
        spotifyArtistId: fields.text({ label: "ID de artista en Spotify" }),
        instagram: fields.url({ label: "Instagram" }),
        image: fields.text({
          label: "Foto",
          description: "Ruta dentro de public. Ej.: «/img/artistas/dulze.png».",
        }),
        musicStyle: fields.text({ label: "Cómo suena", multiline: true }),
        forWho: fields.text({ label: "Para quién", multiline: true }),
        milestones: fields.array(
          fields.object({
            year: fields.text({ label: "Año" }),
            text: fields.text({ label: "Qué pasó" }),
          }),
          { label: "Hitos", itemLabel: (p) => `${p.fields.year.value} · ${p.fields.text.value}` },
        ),
        content: cuerpo,
      },
    }),

    diario: collection({
      label: "Diario",
      path: "content/diario/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Titular", validation: { isRequired: true } },
          slug: { label: "Slug", description: "El de la URL: /diario/<slug>." },
        }),
        description: fields.text({
          label: "Entradilla",
          description: "Lo que sale en Google y en el listado. Dos líneas.",
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({ label: "Fecha", validation: { isRequired: true } }),
        author: fields.text({ label: "Firma", defaultValue: "Bonito Sound" }),
        tags: fields.array(fields.text({ label: "Etiqueta" }), {
          label: "Etiquetas",
          itemLabel: (p) => p.value,
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: "Pregunta" }),
            a: fields.text({ label: "Respuesta", multiline: true }),
          }),
          { label: "Preguntas frecuentes", itemLabel: (p) => p.fields.q.value },
        ),
        content: cuerpo,
      },
    }),
  },
});
