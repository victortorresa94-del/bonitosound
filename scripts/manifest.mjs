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
  logo: "public/img/marca/logo-bonito.png",
  heroVuelo: "public/img/marca/heroe-volando.jpeg",
  heroMegafono: "public/img/marca/heroe-megafono.jpeg",
  // Mockups del estilo real de la web (referencias UI/UX de Víctor):
  mockupHero: "references/ui-ux/HERO.png",
  mockupHeroFresh: "references/ui-ux/Bonito Sound - Hero con Logo Original.png",
  mockupComoFunciona: "references/ui-ux/Bonito Sound - Como Funciona On Brand.png",
};

export const STYLE = [
  "Style requirement: Bonito Sound brand identity, exactly as in the provided reference mockups.",
  "Paleta: pure white background with dark navy blue (#0B1E2F) for typography and the hero character,",
  "teal/turquoise (#1FB89A) for highlights and primary buttons, warm cream (#F8EFD8) for blob-shaped accents,",
  "and a very sparing touch of warm amber (#F5A623) for tiny badges only.",
  "Visual language: editorial, fresh, musical, slightly playful — NOT flat corporate.",
  "Use confident continuous strokes, no shadows, no gradients, no photoreal textures.",
  "Decorative motifs scattered like confetti at small scale: tiny stars, music notes,",
  "wavy lines, dots, swirls — always in light teal or light navy, never overwhelming the composition.",
  "When the Bonito Sound hero character appears, preserve its iconic silhouette exactly as in the reference",
  "(navy body, teal head/cape, the lettering inside the body is part of the brand mark).",
  "Generous negative space. Asymmetric, organic-feeling, never rigid or symmetric.",
  "Do NOT invent additional brand text, taglines or wordmarks unless explicitly asked.",
].join(" ");

const heroRefs = ["heroVuelo", "heroMegafono", "logo"];
const composedRefs = ["heroVuelo", "logo", "mockupHero", "mockupHeroFresh"];
const sceneRefs = ["heroMegafono", "mockupComoFunciona", "mockupHeroFresh"];

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
    prompt: "Small editorial icon-illustration: a vertical microphone with two stage lights above and a soft wavy line beside it, scattered tiny stars and dots around. Composition in navy and teal on white. No characters.",
    refs: sceneRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-records", dest: "public/img/secciones/records.png",
    prompt: "Small editorial icon-illustration: a stylized vinyl record with two curling sound waves and tiny scattered music notes nearby. Navy and teal on white. No characters.",
    refs: sceneRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-lab", dest: "public/img/secciones/lab.png",
    prompt: "Small editorial icon-illustration: a constellation of five dots connected by hand-drawn lines, a central wifi-style emanation, tiny stars around. Navy and teal on white. No characters.",
    refs: sceneRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "seccion-jaleo", dest: "public/img/secciones/jaleo.png",
    prompt: "Small editorial icon-illustration symbolic of a Mediterranean festival in Amsterdam: a stylized sun with rays, two drifting music notes and a tiny fish silhouette. Navy and teal on white. A subtle warm amber (#F5A623) accent inside the sun is allowed.",
    refs: sceneRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "hero-eventos-marcas", dest: "public/img/heroes/eventos-marcas.png",
    prompt: "Wide editorial composition: the Bonito Sound hero character at the mic on a stylized stage with two stage lights above and a draped curtain. Around them, decorative motifs scattered like confetti — tiny stars, music notes, wavy lines. Navy character on white background, teal accents.",
    refs: composedRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "hero-nosotros", dest: "public/img/heroes/nosotros.png",
    prompt: "Wide editorial composition: three Bonito Sound hero figures standing together in different welcoming poses (waving, hands on hips, arms crossed). Group portrait energy with tiny decorative motifs (stars, dots, a wavy underline) scattered around them. White background, navy figures, teal highlights. No real human faces — pure stylized silhouettes following the reference exactly.",
    refs: composedRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "hero-records", dest: "public/img/heroes/records.png",
    prompt: "Wide editorial composition: a recording studio scene with a large vintage microphone in the foreground, mixing console outline, a vinyl record. The Bonito Sound hero character is small in the background. Scattered decorative motifs (notes, dots). Navy and teal on white.",
    refs: composedRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "hero-lab", dest: "public/img/heroes/lab.png",
    prompt: "Wide editorial composition: the Bonito Sound hero in a 'connecting' pose with abstract wifi-style arcs and a constellation network spreading from one hand. Scattered tiny decorative motifs (dots, stars). Navy and teal on white background.",
    refs: composedRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "caso-ballantines", dest: "public/img/casos/ballantines.png",
    prompt: "Symbolic editorial composition for a premium spirits brand activation with live music: a stylized whisky bottle silhouette, two intersecting sound waves and a small stage outline. Scattered tiny stars and notes. No real logos, no brand names, no text. Navy and teal on white.",
    refs: sceneRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "caso-pernod-ricard", dest: "public/img/casos/pernod-ricard.png",
    prompt: "Symbolic editorial composition for a cultural premium brand experience: a stylized cocktail glass, a small turntable and a few music notes drifting. Scattered tiny dots and a wavy underline. No real logos, no text. Navy and teal on white.",
    refs: sceneRefs, size: "1024x1024", quality: "medium", category: "web" },

  { id: "caso-gira-1016", dest: "public/img/casos/gira-1016.png",
    prompt: "Symbolic editorial composition of a music tour reaching its final arena show: a tour van outline at the bottom-left, a stadium silhouette with stage lights at the back, a flowing road connecting them, scattered tiny stars. No text. Navy and teal on white.",
    refs: sceneRefs, size: "1536x1024", quality: "medium", category: "web" },

  { id: "opengraph", dest: "app/opengraph-image.png",
    prompt: "Wide social-share composition for the Bonito Sound website. Left side: the Bonito Sound hero character in a confident pose (exactly as in the reference, navy + teal). Right side: the handwritten script wordmark 'Bonito Sound' in navy blue (as in the reference mockups). Scattered tiny decorative motifs (stars, notes, dots) across the background. Pure white background, generous margins.",
    refs: composedRefs, size: "1536x1024", quality: "high", category: "web" },

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
