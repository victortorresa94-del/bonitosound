import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * Memoria de traducción: catalán indexado POR LA FRASE CASTELLANA.
 *
 * Por qué así y no con claves inventadas ("giras.hero.titulo"): el copy de la
 * web son cientos de frases sueltas repartidas por las páginas. Con claves
 * habría que bautizarlas una a una, el código quedaría ilegible (no se ve lo
 * que pone la página) y cualquier retoque de copy obligaría a ir a dos sitios.
 * Indexando por la frase original, el castellano SIGUE VIÉNDOSE en el JSX —
 * que es donde se escribe y se revisa— y aquí solo vive su equivalente.
 *
 * Regla: si una frase no está traducida, sale en castellano. Nunca un hueco.
 *
 * ⚠️ Limitación asumida: si la misma frase castellana necesitara dos catalanes
 * distintos según el contexto, esto no lo distingue. No pasa hoy; si pasara,
 * esa frase concreta se saca a lib/i18n.ts con clave propia.
 */
const CA: Record<string, string> = {
  // ── Giras ──
  "Producción y dirección de giras": "Producció i direcció de gires",
  "Una gira no se improvisa. Se lleva.": "Una gira no s'improvisa. Es porta.",
  "Una gira no se improvisa. Se lleva. Coordinamos cada detalle, desde la planificación previa hasta el desmontaje final, porque la diferencia entre un buen concierto y una gran producción está en los detalles.":
    "Una gira no s'improvisa. Es porta. Coordinem cada detall, des de la planificació prèvia fins al desmuntatge final, perquè la diferència entre un bon concert i una gran producció és en els detalls.",
  "Producción técnica, logística y road management": "Producció tècnica, logística i road management",
  "Cuéntanos tu gira →": "Explica'ns la teva gira →",
  "¿Tienes una gira que mover?": "Tens una gira per moure?",
  "Cuéntanos las fechas y el proyecto. Te decimos cómo la montamos y por dónde empezaríamos.":
    "Explica'ns les dates i el projecte. Et diem com la muntem i per on començaríem.",
  "Giras Bonitas.": "Gires Bonites.",
  "Ver la gira →": "Veure la gira →",
  "Conciertos": "Concerts",
  "Giras": "Gires",
  "Artistas": "Artistes",
  "La ruta": "La ruta",
  "Las giras": "Les gires",
  "Qué ponemos en una gira": "Què hi posem, en una gira",
  "conciertos": "concerts",
  "Ver la gira": "Veure la gira",
  "Producción técnica": "Producció tècnica",
  "Logística": "Logística",
  "Road management": "Road management",
  "Coordinación integral": "Coordinació integral",

  // ── Artistas ──
  "El roster": "El roster",
  "A quién llevamos": "A qui portem",
  "Roster completo": "Roster complet",
  "Ver la ficha": "Veure la fitxa",
  "Booking": "Booking",
  "Management": "Management",
  "Sello": "Segell",
  "Distribución": "Distribució",
  "Editorial": "Editorial",
  "Escuchar": "Escoltar",

  // ── Experiencias ──
  "Eventos para marcas": "Esdeveniments per a marques",
  "Diseñamos experiencias musicales que conectan marcas, artistas y personas.":
    "Dissenyem experiències musicals que connecten marques, artistes i persones.",
  "Eventos de marca": "Esdeveniments de marca",
  "Hacemos que las marcas suenen.": "Fem que les marques sonin.",
  "Creamos y producimos experiencias de marca donde la música, las artes en vivo y el entretenimiento se convierten en herramientas para conectar con el público. Participamos en todo el proceso creativo o ejecutamos proyectos ya diseñados, coordinando artistas, producción y equipos técnicos para hacer realidad cada evento.":
    "Creem i produïm experiències de marca on la música, les arts en viu i l'entreteniment esdevenen eines per connectar amb el públic. Participem en tot el procés creatiu o executem projectes ja dissenyats, coordinant artistes, producció i equips tècnics per fer realitat cada esdeveniment.",
  "Porque una marca no solo debe verse. Debe vivirse.":
    "Perquè una marca no només s'ha de veure. S'ha de viure.",
  "Eventos": "Esdeveniments",
  "realizados": "realitzats",
  "Marcas": "Marques",
  "que han confiado": "que hi han confiat",
  "Artistas con los que": "Artistes amb qui",
  "hemos colaborado": "hem col·laborat",
  "Marcas que han confiado": "Marques que hi han confiat",
  "Ver la experiencia →": "Veure l'experiència →",
  "Evento de marca": "Esdeveniment de marca",
  "Han confiado en nosotros": "Hi han confiat",
  "No todo es música": "No tot és música",
  "espectáculos visuales.": "espectacles visuals.",
  "Especialistas en producción de mapping, instalaciones de luz y experiencias visuales para eventos y marcas. Transformamos fachadas, espacios urbanos y escenarios en espectáculos únicos mediante tecnología, creatividad e innovación.":
    "Especialistes en producció de mapping, instal·lacions de llum i experiències visuals per a esdeveniments i marques. Transformem façanes, espais urbans i escenaris en espectacles únics mitjançant tecnologia, creativitat i innovació.",
  "Míralo en movimiento": "Mira-ho en moviment",
  "Mapping": "Mapping",
  "Proyección de mapping en una fachada": "Projecció de mapping en una façana",
  "Mapping y espectáculos visuales": "Mapping i espectacles visuals",
  "No organizamos eventos.": "No organitzem esdeveniments.",
  "Creamos momentos que suenan bonito.": "Creem moments que sonen bonic.",
  "Cuéntanoslo.": "Explica'ns-ho.",
  "Hablemos →": "Parlem-ne →",
  "¿Quieres crear un evento? Hablemos": "Vols crear un esdeveniment? Parlem-ne",
  "Quitar el sonido": "Treure el so",
  "Poner el sonido": "Posar el so",
  "Ver los eventos": "Veure els esdeveniments",
  "Teatro y espectáculos visuales": "Teatre i espectacles visuals",
  "El vídeo lo cuenta mejor": "El vídeo ho explica millor",

  // ── Qué somos ──
  "El equipo": "L'equip",
  "Ha trabajado con": "Ha treballat amb",
  "Quiénes somos": "Qui som",
  "Dónde estamos": "On som",

  // ── Contacto y CTA ──
  "Hablamos": "Parlem",
  "Cuéntanos qué tienes en la cabeza.": "Explica'ns què tens al cap.",
  "Escríbenos": "Escriu-nos",
  "Llámanos": "Truca'ns",
  "Preguntas frecuentes": "Preguntes freqüents",
  "Qué hacemos": "Què fem",
  "Cómo trabajamos": "Com treballem",
  "Qué ponemos": "Què hi posem",
  "Casos": "Casos",
  "Playlist de Bonito Sound": "Playlist de Bonito Sound",
};

/**
 * Devuelve la frase en el idioma pedido. En castellano devuelve la propia
 * frase, así que se puede envolver cualquier literal sin condicionales.
 */
export function tr(locale: Locale, es: string): string {
  if (locale === DEFAULT_LOCALE) return es;
  return CA[es] ?? es;
}
