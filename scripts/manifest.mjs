// Manifiesto de imágenes a generar con gpt-image-1.
// Una sola fuente de verdad. La consume scripts/generate-images.mjs.
//
// Estructura:
//   id        identificador estable (filtrable con --only)
//   dest      ruta destino relativa al proyecto
//   prompt    prompt limpio; el STYLE se concatena dentro del script
//   refs      claves de REFS que se mandan a /images/edits como referencia visual
//   size      "1024x1024" | "1024x1536" | "1536x1024" | "auto"
//   quality   "low" | "medium" | "high" | "auto"
//   category  "web" (slot fijo del sitio) | "banco" (extras navegables)

export const REFS = {
  logo: "public/img/marca/logo-bonito.avif",
  heroVuelo: "public/img/marca/heroe-volando.jpeg",
  heroMegafono: "public/img/marca/heroe-megafono.jpeg",
};

export const STYLE = [
  "Style requirement: Bonito Sound brand identity.",
  "Flat editorial illustration in the EXACT visual language of the provided reference images of the hero character:",
  "dark navy blue and medium teal-blue on a pure white background,",
  "confident continuous strokes, no shadows, no gradients, no textures, no realism.",
  "Keep the iconic silhouette and energy of the hero whenever the character appears.",
  "Minimalist composition with generous negative space.",
  "A very rare, tiny accent of warm orange (#FF5A1F) is allowed only when explicitly requested — never dominant.",
  "Lettering inside the hero body is part of the brand mark only:",
  "do NOT invent additional text in derivative illustrations.",
].join(" ");

const heroRefs = ["heroVuelo", "heroMegafono", "logo"];

export const manifest = [
  // ─────────────────────────── WEB SLOTS (15) ───────────────────────────

  { id: "superheroe-home", dest: "public/img/marca/superheroe-home.png",
    prompt: "The Bonito Sound hero character standing in a confident, welcoming, slightly heroic neutral pose, facing slightly to the right. Keep the silhouette clean: no lettering inside the body. Single character centered on a pure white background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "superheroe-records", dest: "public/img/marca/superheroe-records.png",
    prompt: "The Bonito Sound hero character spinning a vinyl record on one hand like a DJ, mid-motion, energy and joy. No lettering inside the body. Single character centered on a pure white background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "superheroe-eventos", dest: "public/img/marca/superheroe-eventos.png",
    prompt: "The Bonito Sound hero character holding a vintage megaphone, dynamic stance, capa flowing. No lettering inside the body. Single character centered on a pure white background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-eventos", dest: "public/img/secciones/eventos.png",
    prompt: "Editorial line illustration: a vertical microphone on a stand, two simple stage lights above, and a sound wave drifting to the side. White background, no characters.",
    refs: ["heroMegafono"], size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-records", dest: "public/img/secciones/records.png",
    prompt: "Editorial line illustration: a vinyl record being played with two flowing sound waves coming out of it. White background, no characters.",
    refs: ["heroMegafono"], size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-lab", dest: "public/img/secciones/lab.png",
    prompt: "Editorial line illustration: a network constellation — five dots connected by clean lines, with one central wifi-style emanation. White background, no characters.",
    refs: ["heroMegafono"], size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-jaleo", dest: "public/img/secciones/jaleo.png",
    prompt: "Editorial line illustration symbolic of a Spanish-Mediterranean festival in Amsterdam: a stylized sun, drifting music notes and a small fish silhouette. White background. A subtle warm orange (#FF5A1F) accent is allowed only on the sun.",
    refs: ["heroMegafono"], size: "1024x1024", quality: "medium", category: "web" },

  { id: "hero-eventos-marcas", dest: "public/img/heroes/eventos-marcas.png",
    prompt: "Wide editorial illustration: a brand activation scene — a modular stage outline with a draped curtain, a single performer (use the Bonito Sound hero silhouette) at the mic, lights above. Line work, white background.",
    refs: heroRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "hero-nosotros", dest: "public/img/heroes/nosotros.png",
    prompt: "Wide editorial illustration: three Bonito Sound hero figures standing together in different welcoming poses (waving, hands in pockets, arms crossed). Group portrait energy. Line work, white background. No real faces — pure stylized silhouettes following the reference style.",
    refs: heroRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "hero-records", dest: "public/img/heroes/records.png",
    prompt: "Wide editorial illustration: a recording studio scene — large vintage microphone, mixing console outline, a vinyl record on the side, a small hero silhouette in the background. Line work, white background.",
    refs: ["heroMegafono"], size: "1536x1024", quality: "medium", category: "web" },

  { id: "hero-lab", dest: "public/img/heroes/lab.png",
    prompt: "Wide editorial illustration: the Bonito Sound hero in a 'connecting' pose with abstract wifi-style arcs and network lines spreading from them across the composition. Line work, white background.",
    refs: heroRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "caso-ballantines", dest: "public/img/casos/ballantines.png",
    prompt: "Symbolic editorial illustration of a premium spirits brand activation with live music: a stylized whisky bottle outline, two intersecting sound waves and a stage outline. No real logos, no brand names, no text. Line work, white background.",
    refs: ["heroMegafono"], size: "1024x1024", quality: "medium", category: "web" },

  { id: "caso-pernod-ricard", dest: "public/img/casos/pernod-ricard.png",
    prompt: "Symbolic editorial illustration of a cultural premium brand experience with curated music: a stylized cocktail glass, a turntable and abstract music notes. No real logos, no text. Line work, white background.",
    refs: ["heroMegafono"], size: "1024x1024", quality: "medium", category: "web" },

  { id: "caso-gira-1016", dest: "public/img/casos/gira-1016.png",
    prompt: "Symbolic editorial illustration of a music tour reaching its final arena show: a tour van outline at the bottom-left, a stadium silhouette with stage lights at the back, and a flowing road connecting them. No text. Line work, white background.",
    refs: ["heroMegafono"], size: "1536x1024", quality: "medium", category: "web" },

  { id: "opengraph", dest: "app/opengraph-image.png",
    prompt: "Social-share composition for the website 'Bonito Sound'. Centered-left: the Bonito Sound hero character in a confident pose (exactly as in the reference). Centered-right: the clean wordmark 'Bonito.Sound' in a friendly serif typeface, with a single accent dot in medium blue. White background, generous margins, wide aspect.",
    refs: ["heroVuelo", "logo"], size: "1536x1024", quality: "high", category: "web" },

  // ─────────────────────────── BANCO VISUAL (28) ───────────────────────────

  { id: "banco-heroe-saludando", dest: "public/img/banco/heroe-saludando.png",
    prompt: "Bonito Sound hero character waving 'hola' with a slight smile, friendly relaxed stance. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-wifi", dest: "public/img/banco/heroe-wifi.png",
    prompt: "Bonito Sound hero character with one hand raised, emitting three concentric wifi-style arcs. Connection and tech energy. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-vinilo", dest: "public/img/banco/heroe-vinilo.png",
    prompt: "Bonito Sound hero character spinning a vinyl record on one finger, DJ mode. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-microfono", dest: "public/img/banco/heroe-microfono.png",
    prompt: "Bonito Sound hero character singing into a classic vintage microphone, eyes closed, capa flowing. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-escenario", dest: "public/img/banco/heroe-escenario.png",
    prompt: "Bonito Sound hero character on a small stage with arms raised, an abstract crowd silhouette below. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-ordenador", dest: "public/img/banco/heroe-ordenador.png",
    prompt: "Bonito Sound hero character working on a laptop, calm and focused, capa over the chair. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-viaje", dest: "public/img/banco/heroe-viaje.png",
    prompt: "Bonito Sound hero character with a small suitcase, ready to travel for a tour. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-heroe-jumping", dest: "public/img/banco/heroe-jumping.png",
    prompt: "Bonito Sound hero character mid-jump in pure joy, capa flowing dramatically. White background.",
    refs: heroRefs, size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-motivo-ondas", dest: "public/img/banco/motivo-ondas.png",
    prompt: "Abstract motif: three concentric sound waves expanding outward from a small dot at the center. Pure line illustration, no characters. White background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-motivo-vinilo", dest: "public/img/banco/motivo-vinilo.png",
    prompt: "Abstract motif: a stylized vinyl record seen from above with grooves and a centered label. Line illustration. White background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-motivo-microfono", dest: "public/img/banco/motivo-microfono.png",
    prompt: "Abstract motif: a vintage condenser microphone front view, with subtle radial lines suggesting sound. Line illustration. White background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-motivo-cassette", dest: "public/img/banco/motivo-cassette.png",
    prompt: "Abstract motif: a stylized audio cassette tape with a thin tape line drifting out and curling. Line illustration. White background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-motivo-altavoz", dest: "public/img/banco/motivo-altavoz.png",
    prompt: "Abstract motif: a single tall speaker stack emitting two waves of sound to the side. Line illustration. White background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-evento-luces", dest: "public/img/banco/evento-luces.png",
    prompt: "Stage scene: a lighting rig above and three light beams converging downward onto an empty stage. Line work, white background, no characters.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-evento-crowd", dest: "public/img/banco/evento-crowd.png",
    prompt: "Concert crowd viewed from behind: a dense field of stylized silhouettes with arms raised toward an unseen stage. Line illustration, white background.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-evento-soundcheck", dest: "public/img/banco/evento-soundcheck.png",
    prompt: "Empty stage during sound check: a microphone stand, a guitar on a stand, a monitor speaker and cables coiled on the floor. Line illustration, white background.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-jaleo-paella", dest: "public/img/banco/jaleo-paella.png",
    prompt: "Symbolic illustration of food and music together: a paella pan from above with two music notes drifting up from it. Line work, white background. A subtle warm orange (#FF5A1F) accent is allowed only inside the paella pan.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-jaleo-ola", dest: "public/img/banco/jaleo-ola.png",
    prompt: "A clean Mediterranean wave with a small sun above it. Line work, white background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-jaleo-pajaro", dest: "public/img/banco/jaleo-pajaro.png",
    prompt: "A stylized small bird singing, with two music notes leaving its beak. Line work, white background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-lab-red", dest: "public/img/banco/lab-red.png",
    prompt: "Abstract network: dots and connecting lines forming a constellation, with a central larger node. Line work, white background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-lab-wifi", dest: "public/img/banco/lab-wifi.png",
    prompt: "A wifi-style emanation of three arcs from a single point at the bottom. Line work, white background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-personas-grupo", dest: "public/img/banco/personas-grupo.png",
    prompt: "Group of three abstract stylized people enjoying music together. NO recognizable faces — minimal silhouettes, gestures of joy. Line work, white background.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-personas-duo", dest: "public/img/banco/personas-duo.png",
    prompt: "Two abstract stylized people dancing together. Silhouettes only, no recognizable faces. Line work, white background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-personas-auriculares", dest: "public/img/banco/personas-auriculares.png",
    prompt: "A single abstract stylized person wearing oversized headphones, head slightly tilted, enjoying music. Silhouette/line work, no detailed face. White background.",
    refs: [], size: "1024x1024", quality: "medium", category: "banco" },

  { id: "banco-personas-multitud", dest: "public/img/banco/personas-multitud.png",
    prompt: "Concert crowd: dozens of stylized silhouette heads facing the same direction toward an unseen stage. Line work, white background.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-bg-azul-suave", dest: "public/img/banco/bg-azul-suave.png",
    prompt: "Clean abstract background: a single very soft wave shape in light blue across the bottom third of an otherwise pure white composition. Minimalist. No characters, no objects.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-bg-ola-azul", dest: "public/img/banco/bg-ola-azul.png",
    prompt: "Clean abstract background: two flowing curve lines in two shades of blue on white. Composed elegantly. No text, no characters.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },

  { id: "banco-bg-circulos", dest: "public/img/banco/bg-circulos.png",
    prompt: "Clean abstract background: large concentric circles in light blue at the edge of the composition, leaving central white space for content. Minimalist, no characters.",
    refs: [], size: "1536x1024", quality: "medium", category: "banco" },
];
