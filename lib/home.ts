/**
 * Contenido editable de la HOME narrativa.
 *
 * Esto es el "CMS" de la portada: cambiando el copy de aquí se cambia la web
 * sin tocar componentes. Una escena = una pantalla del scroll. Una idea por
 * escena. El orden de este array es el orden del scroll.
 *
 * Dirección de voz (no negociable): directo, sin palabrería, con understatement.
 * Si una frase la podría firmar otra agencia, no está terminada.
 */

export type HomeScene = {
  /** id estable (sirve para anclas y para buscar el vídeo/imagen de la escena) */
  id: string;
  /** etiqueta corta sobre el titular (el "stem" tipo Hello Monday: "We make…") */
  kicker: string;
  /** el titular grande, en una o dos líneas. El alma de la escena. */
  statement: string;
  /** parte del titular que se tiñe del acento (debe existir dentro de statement) */
  accent?: string;
  /** frase de apoyo, una sola. */
  support: string;
  /** CTA discreto "ver más" */
  cta?: { label: string; href: string };
  /**
   * media de la escena (la mascota transformada). Se resuelve en el servidor:
   * se prueban estos candidatos en /public y se usa el primero que exista.
   * El vídeo del hero va aparte (heroVideo).
   */
  mediaCandidates?: string[];
};

/** Vídeo del hero (escena 1). Mascota a pantalla completa, autoplay/loop/muted. */
export const heroVideo = {
  src: "/video/hero-mascota.mp4",
  /** póster opcional: si existe en /public se usa como primer fotograma */
  posterCandidates: [
    "/img/marca/superheroe-home.png",
    "/img/heroes/eventos-marcas.png",
  ],
  /** texto solo para lectores de pantalla: el vídeo es decorativo */
  label: "Bonito Sound",
};

export const scenes: HomeScene[] = [
  {
    id: "que-es",
    kicker: "Qué es esto",
    statement: "En la música, casi todo se sigue gestionando por WhatsApp.",
    accent: "WhatsApp",
    support:
      "Nosotros hacemos que pase como merece. Del primer brief al último bolo.",
  },
  {
    id: "marcas",
    kicker: "Marcas",
    statement: "Hacemos que las marcas suenen.",
    accent: "suenen",
    support:
      "Activaciones, giras y eventos que la gente recuerda. Del brief al titular en seis semanas.",
    cta: { label: "Ver más", href: "/eventos" },
    mediaCandidates: [
      "/img/marca/heroe-megafono.jpeg",
      "/img/marca/superheroe-eventos.png",
      "/img/secciones/eventos.png",
    ],
  },
  {
    id: "artistas",
    kicker: "Artistas",
    statement: "Ayudamos a artistas a despegar.",
    accent: "despegar",
    support:
      "Sello, booking, management y distribución. Todo lo que necesita una carrera para crecer, en un solo sitio.",
    cta: { label: "Ver más", href: "/records" },
    mediaCandidates: [
      "/img/marca/superheroe-records.png",
      "/img/secciones/records.png",
    ],
  },
  {
    id: "tecnologia",
    kicker: "Tecnología",
    statement: "Y construimos lo que el sector no tiene.",
    accent: "no tiene",
    support:
      "Artiverse y Giraverse: el software que ordena una industria que sigue funcionando por WhatsApp.",
    cta: { label: "Ver más", href: "/lab" },
    mediaCandidates: ["/img/secciones/lab.png"],
  },
  {
    id: "festival",
    kicker: "Ah, y una cosa más",
    statement: "Tenemos un festival.",
    accent: "festival",
    support: "Jaleo Sound. Música española y latina en Ámsterdam.",
    cta: { label: "Ver más", href: "/jaleo-sound" },
    mediaCandidates: ["/img/secciones/jaleo.png", "/img/jaleo/jaleo-01.jpg"],
  },
  {
    id: "cierre",
    kicker: "Hablamos",
    statement: "¿Marca, artista o promotor?",
    accent: "Hablamos",
    support:
      "Treinta minutos. Tú cuentas qué necesitas, nosotros te decimos qué se puede hacer de verdad.",
    cta: { label: "Hablamos", href: "/contacto" },
    mediaCandidates: ["/img/marca/heroe-volando.jpeg"],
  },
];
