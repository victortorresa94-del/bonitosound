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

import type { MotionPreset } from "@/components/home/MotionImage";

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
   */
  mediaCandidates?: string[];
  /** Preset de movimiento aplicado al media en scroll (ver MotionImage). */
  motionPreset?: MotionPreset;
};

// Para añadir/cambiar la mascota de una escena: deja un archivo en
// public/img/home/<id>.(png|jpg|webp…) y aparecerá solo (es el primer candidato).
export const scenes: HomeScene[] = [
  {
    id: "que-es",
    kicker: "Qué es esto",
    statement: "Llevamos la música a todas partes.",
    accent: "todas partes",
    support:
      "Da igual si es con un cantante, un evento, una grabación o difusión. La cosa es hacerlo bonito.",
    mediaCandidates: ["/video/home/furgoneta.mp4", "/video/home/que-es.mp4", "/img/home/que-es.webp"],
  },
  {
    id: "marcas",
    kicker: "Marcas",
    statement: "Hacemos que las marcas suenen.",
    accent: "suenen",
    support:
      "Activaciones, eventos y experiencias de marca que la gente recuerda. Del brief al titular en seis semanas.",
    cta: { label: "Ver más", href: "/eventos" },
    motionPreset: "glow",
    mediaCandidates: [
      "/video/home/marcas.mp4", "/img/home/marcas.webp",
      "/img/marca/heroe-megafono.jpeg",
      "/img/marca/superheroe-eventos.png",
      "/img/secciones/eventos.png",
    ],
  },
  {
    id: "records",
    kicker: "Records",
    statement: "Ayudamos a artistas a despegar.",
    accent: "despegar",
    support:
      "Sello, booking, management, distribución y editorial. Todo lo que necesita una carrera para crecer, en un solo sitio.",
    cta: { label: "Ver más", href: "/records" },
    motionPreset: "kenburns",
    mediaCandidates: [
      "/video/home/records.mp4", "/img/home/records.webp",
      "/img/marca/superheroe-records.png",
      "/img/secciones/records.png",
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
    motionPreset: "parallax",
    mediaCandidates: ["/video/home/giras.mp4", "/img/home/giras.webp", "/img/marca/superheroe-eventos.png"],
  },
  {
    id: "marketing",
    kicker: "Marketing para artistas",
    statement: "Y que el lanzamiento no pase desapercibido.",
    accent: "no pase desapercibido",
    support:
      "Campañas de ads, estrategia de redes y lanzamientos de álbum y de evento. Cuando salga, se entera quien se tiene que enterar.",
    cta: { label: "Ver más", href: "/marketing" },
    motionPreset: "pulse",
    mediaCandidates: ["/video/home/marketing.mp4", "/img/home/marketing.webp", "/img/marca/heroe-volando.jpeg"],
  },
  {
    id: "tecnologia",
    kicker: "Tecnología",
    statement: "También construimos las herramientas que haga falta.",
    accent: "las herramientas que haga falta",
    support: "Hacemos webs, software, y tenemos nuestra propia app: Artiverse.",
    cta: { label: "Ver más", href: "/universo" },
    mediaCandidates: ["/video/home/tecnologia.mp4", "/img/home/tecnologia.webp", "/img/secciones/lab.png"],
  },
  {
    id: "festival",
    kicker: "Ah, y una cosa más",
    statement: "Tenemos un festival.",
    accent: "festival",
    support: "Jaleo Sound. Música española y latina en Ámsterdam.",
    cta: { label: "Ver más", href: "/jaleo-sound" },
    motionPreset: "parallax",
    mediaCandidates: [
      "/img/marca/jaleo-sound.png",
      "/img/secciones/jaleo.png",
      "/img/jaleo/jaleo-01.jpg",
    ],
  },
  {
    id: "cierre",
    kicker: "Hablamos",
    statement: "Marca, artista o sala. Cuéntanos qué tienes en mente.",
    accent: "qué tienes en mente",
    support:
      "Treinta minutos. Tú cuentas qué necesitas, nosotros te decimos qué se puede hacer de verdad.",
    cta: { label: "¿Hablamos?", href: "/contacto" },
    mediaCandidates: ["/video/home/cierre.mp4", "/img/home/cierre.webp"],
  },
];
