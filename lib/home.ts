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

/** Identidad metamórfica del logo Bonito Sound.
 *
 *  El logo se transforma a lo largo del scroll en distintos objetos
 *  musicales, manteniendo el lettering "BONITO SOUND" siempre presente.
 *  Cada forma se asocia (opcionalmente) a una escena de la narrativa.
 *
 *  Los SVGs se generan con scripts/vectorize-mascot.mjs y se sirven desde
 *  /public/img/marca/forma-<id>.svg. app/page.tsx los lee en server y los
 *  pasa inline al componente MetamorphicLogo.
 */
export type LogoForm = {
  /** id estable, coincide con el data-bs-forma del SVG */
  id: "superheroe" | "megafono" | "guitarra" | "bafle";
  /** ruta pública del SVG vectorizado */
  svgPath: string;
  /** id de la escena de la narrativa con la que se sincroniza el morph
   *  vía ScrollTrigger; null = inicial (hero). */
  triggerSceneId: string | null;
  /** descripción accesible (sr-only) cuando esta forma está activa */
  label: string;
};

export const logoForms: LogoForm[] = [
  {
    id: "superheroe",
    svgPath: "/img/marca/forma-superheroe.svg",
    triggerSceneId: null,
    label: "Bonito Sound — superhéroe",
  },
  {
    id: "megafono",
    svgPath: "/img/marca/forma-megafono.svg",
    triggerSceneId: "marcas",
    label: "Bonito Sound — megáfono (Marcas)",
  },
  {
    id: "guitarra",
    svgPath: "/img/marca/forma-guitarra.svg",
    triggerSceneId: "records",
    label: "Bonito Sound — guitarra (Records)",
  },
  {
    id: "bafle",
    svgPath: "/img/marca/forma-bafle.svg",
    triggerSceneId: "festival",
    label: "Bonito Sound — bafle (Festival)",
  },
];

/** Compat con código previo. */
export const heroMascot = {
  svgPath: logoForms[0].svgPath,
  label: "Bonito Sound",
};

// Para añadir/cambiar la mascota de una escena: deja un archivo en
// public/img/home/<id>.(png|jpg|webp…) y aparecerá solo (es el primer candidato).
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
      "Activaciones, eventos y experiencias de marca que la gente recuerda. Del brief al titular en seis semanas.",
    cta: { label: "Ver más", href: "/eventos" },
    mediaCandidates: [
      "/img/home/marcas.png",
      "/img/marca/heroe-megafono.jpeg",
      "/img/marca/superheroe-eventos.png",
      "/img/secciones/eventos.png",
    ],
  },
  {
    id: "giras",
    kicker: "Giras",
    statement: "Y las giras, las llenamos.",
    accent: "llenamos",
    support:
      "Producción, ruta y management de directo. De Antonio Orozco a Maldita Nerea: el escenario montado y el aforo lleno.",
    cta: { label: "Ver más", href: "/eventos/giras" },
    mediaCandidates: ["/img/home/giras.png", "/img/marca/superheroe-eventos.png"],
  },
  {
    id: "records",
    kicker: "Records",
    statement: "Ayudamos a artistas a despegar.",
    accent: "despegar",
    support:
      "Sello, booking, management, distribución y editorial. Todo lo que necesita una carrera para crecer, en un solo sitio.",
    cta: { label: "Ver más", href: "/records" },
    mediaCandidates: [
      "/img/home/records.png",
      "/img/marca/superheroe-records.png",
      "/img/secciones/records.png",
    ],
  },
  {
    id: "estudio",
    kicker: "Estudio y producción",
    statement: "Las canciones se cocinan aquí.",
    accent: "aquí",
    support:
      "Estudio de grabación, producción y desarrollo artístico. Del primer demo al máster listo para plataformas.",
    cta: { label: "Ver más", href: "/records/sello" },
    mediaCandidates: ["/img/home/estudio.png"],
  },
  {
    id: "marketing",
    kicker: "Marketing para artistas",
    statement: "Y que el lanzamiento no pase desapercibido.",
    accent: "no pase desapercibido",
    support:
      "Campañas de ads, estrategia de redes y lanzamientos de álbum y de evento. Cuando salga, se entera quien se tiene que enterar.",
    cta: { label: "Ver más", href: "/records" },
    mediaCandidates: ["/img/home/marketing.png", "/img/marca/heroe-volando.jpeg"],
  },
  {
    id: "tecnologia",
    kicker: "Tecnología",
    statement: "Y construimos lo que el sector no tiene.",
    accent: "no tiene",
    support:
      "Artiverse y Giraverse: el software que ordena una industria que sigue funcionando por WhatsApp.",
    cta: { label: "Ver más", href: "/lab" },
    mediaCandidates: ["/img/home/tecnologia.png", "/img/secciones/lab.png"],
  },
  {
    id: "festival",
    kicker: "Ah, y una cosa más",
    statement: "Tenemos un festival.",
    accent: "festival",
    support: "Jaleo Sound. Música española y latina en Ámsterdam.",
    cta: { label: "Ver más", href: "/jaleo-sound" },
    mediaCandidates: [
      "/img/home/festival.png",
      "/img/secciones/jaleo.png",
      "/img/jaleo/jaleo-01.jpg",
    ],
  },
  {
    id: "cierre",
    kicker: "Hablamos",
    statement: "¿Marca, artista o promotor?",
    accent: "Hablamos",
    support:
      "Treinta minutos. Tú cuentas qué necesitas, nosotros te decimos qué se puede hacer de verdad.",
    cta: { label: "Hablamos", href: "/contacto" },
  },
];
