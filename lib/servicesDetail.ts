import type { IconName } from "@/components/services/ServiceIcon";
import { giras } from "@/lib/giras";

// Contenido PROFUNDO de cada página de servicio (aditivo sobre lib/services.ts).
// Todo con voz bonito, sin cifras de dinero, nada inventado. Cada bloque se
// pinta solo si está — así se enriquece servicio a servicio sin tocar el layout.

export type WhatWeDo = { icon: IconName; title: string; desc: string };
export type ProcessStep = { title: string; desc: string };
export type Stat = { n: string; l: string };

export type ServiceDetail = {
  /** Statement de apertura, bajo el hero. */
  intro?: string;
  /** "Qué hacemos" desglosado, con icono por bloque. El corazón de la landing. */
  whatWeDo?: WhatWeDo[];
  whatWeDoTitle?: string;
  /** Cómo trabajamos, paso a paso. */
  process?: ProcessStep[];
  processTitle?: string;
  /** Números reales para la banda de prueba social. */
  stats?: Stat[];
  /** Slugs de eventos (con vídeo) a mostrar como casos. */
  caseVideos?: string[];
  caseVideosTitle?: string;
  /** Slugs de artistas a destacar. */
  artistSlugs?: string[];
  artistsTitle?: string;
  /** Muro de marcas (producciones/marketing). */
  showBrands?: boolean;
  /** Playlist de Spotify a incrustar a lo ancho, en vez de la banda de números. */
  spotifyPlaylistId?: string;
  spotifyPlaylistTitle?: string;
  /** Slugs de gira (lib/giras.ts) a enlazar como casos: van a /giras/[slug]. */
  giraSlugs?: string[];
  giraSlugsTitle?: string;
};

export const serviceDetail: Record<string, ServiceDetail> = {
  producciones: {
    // Esta página es SOLO producción de giras de artista. Ni eventos de marca
    // (eso es /experiencias) ni producción musical de estudio (eso es records).
    // Quien entra aquí es un artista o su manager buscando quien le lleve la gira.
    intro:
      "Una gira son veinte noches distintas que tienen que salir igual de bien. Nosotros ponemos todo lo que hay alrededor del artista —técnica, escenario, transporte y coordinación— para que él solo tenga que subirse y tocar.",
    whatWeDoTitle: "Qué ponemos en una gira",
    whatWeDo: [
      { icon: "mixer", title: "Producción técnica", desc: "Sonido, backline, monitores, microfonía y la ingeniería del directo. Con equipo propio, para que suene igual de bien en cada plaza." },
      { icon: "escenario", title: "Escenario y luces", desc: "Montaje de escenario, iluminación y puesta en escena. Lo mismo en un teatro que en un festival, adaptado a lo que da cada sala." },
      { icon: "logistica", title: "Logística y transporte", desc: "Furgonetas, tiempos, permisos y el plan B. Que el equipo y la banda estén donde tienen que estar, a la hora que tienen que estar." },
      { icon: "calendario", title: "Coordinación integral", desc: "Un solo interlocutor de la primera llamada al desmontaje. Nadie rebotando entre cinco proveedores; una persona que responde." },
      { icon: "brief", title: "Avance con promotores y salas", desc: "Hablamos con cada promotor antes de llegar: qué hay en la sala, qué falta, qué horarios hay. Los problemas se resuelven por teléfono, no en el load-in." },
      { icon: "management", title: "Road management", desc: "Alguien de los nuestros en la carretera con la gira: cuadrar el día, resolver lo que salga y que el artista no tenga que ocuparse de nada." },
    ],
    processTitle: "Cómo se lleva una gira",
    process: [
      { title: "Producción previa", desc: "Avance con promotores y salas plaza a plaza: qué equipo hay, qué llevamos nosotros y qué horarios maneja cada una." },
      { title: "Hojas de ruta", desc: "Cada fecha documentada: tiempos, contactos, accesos, catering y transporte. Todo el mundo sabe qué pasa y cuándo." },
      { title: "Road y transporte", desc: "Salimos a carretera con la gira. Equipo, banda y material moviéndose según lo previsto, con quien resuelve al lado." },
      { title: "El directo", desc: "Montaje, prueba de sonido, show y desmontaje. Y a la mañana siguiente, la plaza que toca." },
    ],
    // Cifras reales, calculadas desde lib/giras.ts para que no se queden viejas.
    stats: [
      { n: `${giras.length}`, l: "giras llevadas" },
      { n: `${new Set(giras.map((g) => g.artist)).size}`, l: "artistas de gira" },
      { n: "30", l: "años de oficio" },
    ],
    // Las giras con página propia: enlazan a /giras/[slug] en vez de repetir
    // aquí el contenido. Fuera los vídeos de marcas, que son de /experiencias.
    giraSlugsTitle: "Giras que hemos llevado",
    giraSlugs: ["albert-pla-rumbagenarios", "alfred-garcia-1016", "anne-lukin"],
    showBrands: false,
  },

  booking: {
    intro:
      "Cerrar un bolo no es mandar un dossier y esperar. Es saber qué sala, qué fecha y qué cartel encajan, y tener a quién llamar. Eso es lo que ponemos.",
    whatWeDoTitle: "Qué ponemos",
    whatWeDo: [
      { icon: "calendario", title: "Agenda real", desc: "Sabemos qué salas y festivales encajan con cada artista, y en qué fecha. No disparamos a todo a ver qué cae." },
      { icon: "management", title: "Trato directo", desc: "Hablas con quien lleva al artista, no con un buzón. Treinta años de contactos en la industria detrás de cada llamada." },
      { icon: "mixer", title: "El directo montado", desc: "Cerramos la fecha y montamos lo que hace falta para que salga: producción, técnica y logística." },
      { icon: "plataformas", title: "Dentro y fuera", desc: "Giras nacionales e internacionales. Tenemos artistas con base fuera de España y sabemos moverlos." },
    ],
    processTitle: "Cómo cerramos una fecha",
    process: [
      { title: "Escuchamos el proyecto", desc: "Dónde está el artista, qué directo tiene y hacia dónde quiere ir." },
      { title: "Trazamos la ruta", desc: "Qué salas y festivales tienen sentido, en qué fechas y en qué orden." },
      { title: "Cerramos y negociamos", desc: "Llamamos, cuadramos condiciones y aseguramos la fecha." },
      { title: "Montamos el directo", desc: "Producción, técnica y road para que el artista solo tenga que subir al escenario." },
    ],
    // Los artistas los pinta el RosterGridCase de la página (dinámico, todo el
    // roster de booking) — no los duplicamos aquí.
    caseVideosTitle: "Directos y giras que hemos montado",
    caseVideos: ["natura", "alfred-garcia-1016"],
  },

  management: {
    intro:
      "El booking cierra fechas; el management lleva la carrera entera. Estrategia, calendario y las decisiones que importan a medio plazo — con alguien que tiene la foto completa.",
    whatWeDoTitle: "Qué llevamos",
    whatWeDo: [
      { icon: "estrategia", title: "Estrategia con criterio", desc: "Qué sale, cuándo y por qué. Decidimos el siguiente paso con argumentos, no con prisas." },
      { icon: "management", title: "A mano", desc: "Aquí no hay artistas de primera y de segunda: a cada artista lo lleva una persona con nombre, que coge el teléfono." },
      { icon: "calendario", title: "Calendario ordenado", desc: "Lanzamientos, bolos y contenido en un mismo plan, para que no choquen entre sí." },
      { icon: "disco", title: "Todo en la misma casa", desc: "Booking, sello y distribución hablan entre sí porque están bajo el mismo techo. El artista no va rebotando." },
    ],
    processTitle: "Cómo entramos",
    process: [
      { title: "Foto completa", desc: "Vemos dónde estás: música, directo, números y equipo." },
      { title: "Plan a medio plazo", desc: "Ordenamos lanzamientos, bolos y decisiones en un calendario con sentido." },
      { title: "Ejecución", desc: "Lo movemos con el resto de la casa: sello, distribución, booking." },
      { title: "Revisión", desc: "Miramos qué funciona y ajustamos. La carrera es larga; se lleva, no se improvisa." },
    ],
  },

  sello: {
    intro:
      "Producimos, publicamos y empujamos la música de nuestros artistas asumiendo parte del riesgo. Pocos proyectos, en serio: del primer demo al máster listo para plataformas.",
    whatWeDoTitle: "Qué hacemos",
    whatWeDo: [
      { icon: "disco", title: "Producción propia", desc: "Del primer demo al máster. El álbum MARCA DIVINA de Eva Calyza salió de aquí." },
      { icon: "direccion", title: "Criterio", desc: "Te decimos qué single sale y por qué. Con argumentos, no con corazonadas." },
      { icon: "crecimiento", title: "Empuje", desc: "Publicar es el minuto uno. Sabemos qué hacer al día siguiente para que la canción llegue." },
      { icon: "distribucion", title: "Un sistema, no un cajón", desc: "Sello, booking y distribución trabajan juntos. No sueltas la música y a ver qué pasa." },
    ],
    processTitle: "Del máster a la calle",
    process: [
      { title: "Escuchamos", desc: "Nos mandas lo que tienes. Si encaja y hay ganas por las dos partes, seguimos." },
      { title: "Producimos", desc: "Del demo al máster, decidiendo repertorio y calendario contigo." },
      { title: "Publicamos", desc: "Sacamos con los metadatos y la estrategia en orden, no a lo loco." },
      { title: "Empujamos", desc: "Ads, playlists, directo. Movemos la canción con el resto de la casa." },
    ],
    // Fuera la banda de "+150 lanzamientos": lo que convence aquí es poder
    // escuchar lo que sacamos, no un número. El banner lo ocupa la playlist.
    spotifyPlaylistId: "2lxa6r7k0dthpANWR9wRWs",
    spotifyPlaylistTitle: "Escucha lo que sacamos",
  },

  editorial: {
    intro:
      "La parte menos vistosa y de las más importantes: los derechos de autor de tus canciones. Registrarlos, seguir sus usos y asegurar que cada uno genere lo que debe.",
    whatWeDoTitle: "Qué gestionamos",
    whatWeDo: [
      { icon: "derechos", title: "Registro en orden", desc: "Tus obras registradas y bien documentadas, para que nada se pierda por el camino." },
      { icon: "crecimiento", title: "Que rinda", desc: "Seguimos los usos de tu música y nos ocupamos de que cada uno genere lo que tiene que generar." },
      { icon: "sync", title: "Sincronizaciones", desc: "Tu música en anuncios, series o eventos cuando encaja. Una vía más para que suene y rinda." },
      { icon: "estrategia", title: "Seguimiento", desc: "No es registrar y olvidar. Vigilamos que los derechos acaben donde tienen que acabar." },
    ],
    processTitle: "Cómo lo llevamos",
    process: [
      { title: "Registramos", desc: "Damos de alta tus obras y las documentamos: autoría, splits, todo en su sitio." },
      { title: "Vigilamos", desc: "Seguimos dónde suena tu música y qué usos genera, aquí y fuera." },
      { title: "Cobramos lo que toca", desc: "Nos aseguramos de que cada uso te llegue, sin que nada se pierda por el camino." },
      { title: "Buscamos syncs", desc: "Cuando aparece una oportunidad en anuncio, serie o evento, la gestionamos entera." },
    ],
    stats: [{ n: "+300", l: "obras donde somos editorial" }],
  },

  distribucion: {
    intro:
      "Llevamos tu música a todas las plataformas con los metadatos en orden, para que se pueda escuchar, encontrar y pagar como toca. Subir la canción es el minuto uno; distribuir bien es todo lo demás.",
    whatWeDoTitle: "Qué hacemos",
    whatWeDo: [
      { icon: "distribucion", title: "A todas partes", desc: "Spotify, Apple Music, YouTube, Amazon, Deezer y las demás. Tu música donde tiene que estar." },
      { icon: "plataformas", title: "Metadatos en orden", desc: "Título, autoría, ISRC, créditos. Bien puestos, para que te encuentren y los derechos no acaben donde no deben." },
      { icon: "crecimiento", title: "Con seguimiento", desc: "No es subir y olvidarse. Miramos cómo se mueve y cuándo tiene sentido apoyar un lanzamiento." },
      { icon: "disco", title: "Parte del sistema", desc: "Si además estás en sello o management, la distribución trabaja con el resto. No vas por libre." },
    ],
    processTitle: "Del archivo a las plataformas",
    process: [
      { title: "Preparamos el lanzamiento", desc: "Audio, metadatos, ISRC, créditos y portada. Todo en regla antes de subir." },
      { title: "Entregamos con margen", desc: "Con semanas de antelación, para dar tiempo a las plataformas y optar a listas editoriales." },
      { title: "Publicamos en todas", desc: "Spotify, Apple Music, YouTube, Amazon, Deezer y las demás, a la vez." },
      { title: "Seguimos el dato", desc: "Miramos cómo se mueve y cuándo tiene sentido apoyarlo con marketing." },
    ],
  },

  marketing: {
    intro:
      "Ads, estrategia de redes y planes de lanzamiento para artistas y eventos. Venimos del sector musical: sabemos cómo se mueve un lanzamiento y cómo se llena una sala. No lo aprendemos sobre la marcha.",
    whatWeDoTitle: "Qué hacemos",
    whatWeDo: [
      { icon: "megafono", title: "Ads y paid media", desc: "Campañas en Meta, TikTok y YouTube para mover oyentes y vender entradas. Medimos escuchas nuevas y entradas vendidas." },
      { icon: "direccion", title: "Contenido y redes", desc: "Qué contar, cuándo y en qué formato. Calendario alineado con tus lanzamientos, no publicar por publicar." },
      { icon: "crecimiento", title: "Lanzamientos", desc: "Plan de salida para un single, un álbum o un evento: teaser, día de estreno y sostenimiento." },
      { icon: "entrada", title: "Vender entradas", desc: "Igual que movemos un single, montamos campañas para llenar un directo o dar empujón a un evento." },
    ],
    processTitle: "Cómo montamos una campaña",
    process: [
      { title: "El objetivo", desc: "Oyentes, entradas, territorio. Sobre lo que tengas de verdad encima de la mesa." },
      { title: "El material", desc: "Vídeos, cortes verticales y artes para cada formato, listos para pautar." },
      { title: "La campaña", desc: "Configuramos, pauteamos y optimizamos en cada plataforma." },
      { title: "El seguimiento", desc: "Medimos lo que mueve la aguja y ajustamos mientras corre." },
    ],
  },
};
