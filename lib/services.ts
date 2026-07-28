// Contenido de las 7 páginas de servicio (subproductos de Bonito).
// El HERO lo diseña Víctor y se pasa aparte; aquí va el cuerpo: aspectos,
// FAQ y CTA. Copy con voz bonito, sin cifras de dinero, nada inventado.

export type ServiceAspect = { name: string; desc: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Ruta completa (para canonical / links). */
  path: string;
  eyebrow: string;
  /** Titular del hero. */
  h1: string;
  /** Trozo del h1 que va en cian (opcional; debe ser subcadena literal de h1). */
  h1Cyan?: string;
  desc: string;
  /** Asunto del mailto de contacto. */
  ctaSubject: string;
  aspects: ServiceAspect[];
  faq: ServiceFaq[];
  /** Bloque CTA de cierre. */
  cta: { h2: string; desc: string };
};

export const services: Record<string, Service> = {
  booking: {
    slug: "booking",
    path: "/booking",
    eyebrow: "Booking",
    h1: "Cerramos la fecha y montamos el directo.",
    h1Cyan: "montamos el directo.",
    desc: "Contratamos y cerramos los directos de nuestros artistas. Agenda real, con quien coge el teléfono.",
    ctaSubject: "Booking",
    aspects: [
      { name: "Agenda con nombre", desc: "Sabemos qué salas, qué festivales y qué fechas encajan con cada artista. No mandamos un dossier y a ver qué pasa." },
      { name: "Trato directo", desc: "Hablas con quien lleva al artista, no con un buzón. Treinta años de contactos en la industria detrás de cada llamada." },
      { name: "El directo montado", desc: "Cerramos la fecha y montamos lo que hace falta para que salga: producción, técnica y logística." },
    ],
    faq: [
      { q: "¿A quién lleváis en booking?", a: "A los artistas de nuestro roster. Pocos, para poder llevarlos bien. Los ves en el roster completo." },
      { q: "¿Contratáis artistas de fuera de Bonito?", a: "Para eventos y giras sí trabajamos con artistas de terceros. Para booking de agencia, llevamos a los nuestros." },
      { q: "¿Trabajáis fuera de España?", a: "Sí. Hemos movido giras nacionales e internacionales; tenemos artistas con base fuera." },
      { q: "¿Qué hace exactamente una agencia de booking musical?", a: "Contrata y cierra los directos de sus artistas: busca las salas y festivales que encajan, negocia las condiciones y coordina que la fecha salga adelante. Trabaja la agenda real, no promesas." },
      { q: "¿Qué necesitáis para empezar a moveros con las fechas de un artista?", a: "Saber dónde está el proyecto, qué directo tiene montado y hacia dónde quiere ir. Con eso vemos qué salas y festivales tienen sentido y empezamos a llamar." },
      { q: "¿Cuánto se tarda en cerrar un bolo?", a: "Depende de la sala, la fecha y la agenda del artista. Lo importante es empezar con margen: cuanto antes se mueve, más opciones hay. A última hora se trabaja con lo que quede libre." },
    ],
    cta: { h2: "¿Quieres una fecha?", desc: "Cuéntanos qué buscas y para cuándo. Te decimos qué encaja de verdad." },
  },

  management: {
    slug: "management",
    path: "/management",
    eyebrow: "Management",
    h1: "Una carrera, llevada a mano.",
    desc: "Gestionamos la carrera del artista de principio a fin: estrategia, calendario y las decisiones que importan.",
    ctaSubject: "Management",
    aspects: [
      { name: "Estrategia con criterio", desc: "Qué sale, cuándo y por qué. Decidimos el siguiente paso con argumentos, no con prisas." },
      { name: "A mano", desc: "Aquí no hay artistas de primera y de segunda: a cada artista lo lleva una persona con nombre, que coge el teléfono." },
      { name: "Un solo interlocutor", desc: "Booking, sello y distribución hablan entre sí porque están en la misma casa. El artista no va rebotando." },
    ],
    faq: [
      { q: "¿En qué se diferencia del booking?", a: "El booking cierra fechas. El management lleva la carrera entera: estrategia, lanzamientos, equipo y decisiones a medio plazo." },
      { q: "¿Hace falta estar en el sello?", a: "No es obligatorio, pero cuando management, sello y distribución van juntos, todo encaja mejor." },
      { q: "¿Con cuántos artistas trabajáis?", a: "Con pocos, a propósito. Llevar bien una carrera pide tiempo y cabeza, no un catálogo enorme." },
      { q: "¿Qué hace exactamente un manager musical?", a: "Lleva la carrera del artista: define la estrategia, ordena el calendario de lanzamientos, coordina al equipo y toma —con el artista— las decisiones que importan a medio plazo. Es quien tiene la foto completa." },
      { q: "¿A partir de qué momento de mi carrera necesito management?", a: "Cuando dejas de poder con todo tú solo: cuando las decisiones, los lanzamientos y los bolos empiezan a chocar entre sí. Ahí tener a alguien que ordene el sistema te cambia el día a día." },
    ],
    cta: { h2: "¿Hablamos de tu carrera?", desc: "Cuéntanos dónde estás y a dónde quieres llegar. Te decimos cómo lo haríamos." },
  },

  sello: {
    slug: "sello",
    path: "/records/sello",
    eyebrow: "Sello",
    h1: "Tu música, bien cuidada.",
    h1Cyan: "bien cuidada.",
    desc: "Editamos, producimos y distribuimos. Del máster a las plataformas, con criterio y sin prisas. Records 360: sello, editorial y distribución en un mismo sitio.",
    ctaSubject: "Sello",
    aspects: [
      { name: "Criterio", desc: "Te decimos qué single sale y por qué. Con argumentos, no con corazonadas." },
      { name: "Producción propia", desc: "Del primer demo al máster listo para plataformas. El álbum MARCA DIVINA de Eva Calyza salió de aquí." },
      { name: "Un sistema, no un cajón", desc: "Sello, booking y distribución trabajan juntos. Publicamos y sabemos qué hacer al día siguiente." },
    ],
    faq: [
      { q: "¿Qué hace exactamente un sello independiente?", a: "Produce, publica y empuja la música de sus artistas asumiendo parte del riesgo, sin depender de una multinacional. Decide repertorio, calendario y estrategia junto al artista." },
      { q: "¿Sois un sello o una distribuidora?", a: "Las dos cosas, separadas. El sello asume proyecto y riesgo; la distribución es un servicio para llevar tu música a plataformas. Contratas lo que necesites." },
      { q: "¿Trabajáis con artistas que ya tienen música publicada?", a: "Sí. No hace falta empezar de cero: revisamos lo que tienes y decidimos juntos qué relanzar y qué construir nuevo." },
      { q: "¿Cómo se ficha por un sello independiente?", a: "Empieza por que escuchemos lo que tienes. Si el proyecto encaja y hay ganas por las dos partes, hablamos de cómo trabajarlo. No hay fórmula mágica ni casting masivo: trabajamos pocos proyectos y en serio." },
      { q: "¿Qué géneros lleváis en el sello?", a: "No nos casamos con una etiqueta: nos fijamos en que el proyecto tenga algo que contar y recorrido. Puedes ver a quién llevamos en el roster completo." },
    ],
    cta: { h2: "¿Tienes música?", desc: "Mándanosla. Si encaja, te decimos cómo la sacaríamos." },
  },

  editorial: {
    slug: "editorial",
    path: "/records/editorial",
    eyebrow: "Editorial",
    h1: "Que cada uso de tu música se cobre.",
    desc: "La parte menos vistosa y de las más importantes: derechos, registro y que la música rinda donde suene.",
    ctaSubject: "Editorial",
    aspects: [
      { name: "Registro en orden", desc: "Tus obras registradas y bien documentadas, para que nada se pierda por el camino." },
      { name: "Que rinda", desc: "Seguimos los usos de tu música y nos ocupamos de que cada uno genere lo que tiene que generar." },
      { name: "Sincronizaciones", desc: "Tu música en anuncios, series o eventos cuando encaja. Una vía más para que suene y rinda." },
    ],
    faq: [
      { q: "¿Qué es la gestión editorial?", a: "Es ocuparse de los derechos de autor de las canciones: registrarlas, seguir sus usos y asegurar que generen lo que deben. Va aparte de la grabación." },
      { q: "¿Necesito estar en el sello para la editorial?", a: "No. Es un servicio independiente; puedes tener editorial con nosotros aunque publiques por tu cuenta." },
      { q: "¿Y las sincronizaciones?", a: "Cuando surge una oportunidad de sync que encaja con el artista, la gestionamos de principio a fin." },
      { q: "¿Qué diferencia hay entre editorial y sello?", a: "El sello se ocupa de la grabación: producir, publicar y empujar tus canciones. La editorial se ocupa de la obra: los derechos de autor, su registro y que cada uso genere lo que debe. Son dos cosas distintas y puedes tener una sin la otra." },
      { q: "¿Necesito registrar mis canciones si ya están en Spotify?", a: "Sí. Estar en plataformas no es lo mismo que tener la obra registrada y los derechos en orden. Una cosa es que tu canción suene; otra, que cada uso se documente y se cobre donde toca." },
    ],
    cta: { h2: "¿Tu música rinde lo que debería?", desc: "Cuéntanos qué tienes publicado y le echamos un ojo." },
  },

  distribucion: {
    slug: "distribucion",
    path: "/records/distribucion",
    eyebrow: "Distribución",
    h1: "Llevamos tu música a todo el mundo.",
    h1Cyan: "a todo el mundo.",
    desc: "Distribuimos tu música en Spotify, Apple Music, YouTube y las demás, con los metadatos en orden y gente del sector detrás. Ya distribuyen unos veinte artistas con nosotros.",
    ctaSubject: "Distribución",
    aspects: [
      { name: "A todas partes", desc: "Spotify, Apple Music, YouTube y las demás. Tu música donde tiene que estar, con los metadatos en orden." },
      { name: "Con seguimiento", desc: "No es subir y olvidarse. Miramos cómo se mueve y cuándo tiene sentido apoyar un lanzamiento." },
      { name: "Parte del sistema", desc: "Si además estás en sello o management, la distribución trabaja con el resto. No vas por libre." },
    ],
    faq: [
      { q: "¿Distribuís a artistas de fuera del sello?", a: "Sí. La distribución es un servicio independiente; no hace falta estar fichado en el sello." },
      { q: "¿A qué plataformas llegáis?", a: "A las principales del mundo: Spotify, Apple Music, Amazon Music, YouTube Music, Deezer, Tidal y las tiendas y redes donde se escucha música." },
      { q: "¿Cuánto cuesta distribuir mi música?", a: "Depende de lo que necesites: un lanzamiento suelto o todo tu catálogo. Lo cerramos contigo antes de subir nada, sin letra pequeña y sin sorpresas. Lo concreto lo hablamos en la primera llamada." },
      { q: "¿Me quedo con los derechos de mi música?", a: "Sí. Distribuir no es firmar por un sello: tu música sigue siendo tuya. Nosotros la llevamos a las plataformas y nos ocupamos de que todo esté en orden." },
      { q: "¿Puedo distribuir y llevar el resto por mi cuenta?", a: "Claro. Contratas solo la distribución si es lo que necesitas." },
      { q: "¿Qué es la distribución digital de música?", a: "Es el servicio que lleva tu música a las plataformas de streaming y descarga con los metadatos en orden, para que se pueda escuchar, encontrar y pagar correctamente. Subir la canción es el minuto uno; distribuir bien es todo lo que hay alrededor." },
      { q: "¿Cuánto tarda mi música en aparecer en Spotify?", a: "Conviene entregar el lanzamiento con margen, unas semanas antes de la fecha. Así da tiempo a que las plataformas lo procesen y a optar a listas editoriales, que casi siempre piden antelación." },
      { q: "¿Por qué son importantes los metadatos?", a: "Porque son la ficha de tu canción: título, autoría, ISRC, créditos. Si están mal, no te encuentran y los derechos pueden acabar en el sitio equivocado. Si están bien, las plataformas te entienden y te colocan donde debes estar." },
    ],
    cta: { h2: "¿Listo para publicar?", desc: "Cuéntanos qué vas a sacar y te decimos cómo lo distribuiríamos." },
  },

  marketing: {
    slug: "marketing",
    path: "/records/marketing",
    eyebrow: "Marketing",
    h1: "Que el lanzamiento no pase desapercibido.",
    desc: "Ads, estrategia de redes y planes de lanzamiento para artistas y eventos. Venimos del sector, no lo aprendemos sobre la marcha.",
    ctaSubject: "Marketing para artistas",
    aspects: [
      { name: "Ads y paid media", desc: "Campañas en Meta, TikTok y YouTube para mover oyentes y vender entradas. Medimos lo que importa: escuchas nuevas y entradas vendidas." },
      { name: "Estrategia de redes", desc: "Qué contar, cuándo y en qué formato. Calendario alineado con tus lanzamientos, no publicar por publicar." },
      { name: "Lanzamientos", desc: "Plan de salida para un single, un álbum o un evento: teaser, día de estreno y sostenimiento." },
    ],
    faq: [
      { q: "¿Hace falta ser artista del sello para contratar marketing?", a: "No. El marketing es un servicio independiente: llevamos campañas de artistas que no están fichados en Records. Lo que pedimos es tener música o evento de verdad detrás." },
      { q: "¿Cómo planteáis la inversión en ads?", a: "Según el objetivo (oyentes, entradas, territorio) y lo que tengas encima de la mesa. Te decimos qué mueve la aguja y qué no, sobre tu lanzamiento real. Lo concreto lo hablamos." },
      { q: "¿En qué se diferencia de una agencia normal?", a: "En que venimos del sector musical. Sabemos cómo se mueve un lanzamiento y cómo se llena una sala. No aprendemos tu industria sobre la marcha." },
      { q: "¿Qué incluye una campaña de marketing musical?", a: "Depende del objetivo, pero suele mezclar ads (Meta, TikTok, YouTube), estrategia de contenido para redes y un plan de lanzamiento con su día de estreno y su sostenimiento. Lo montamos sobre lo que tengas de verdad encima de la mesa." },
      { q: "¿Podéis promocionar un concierto o solo lanzamientos?", a: "Las dos cosas. Igual que movemos un single o un álbum, montamos campañas para vender entradas de un directo o dar empujón a un evento." },
    ],
    cta: { h2: "¿Tienes algo que sacar?", desc: "Cuéntanos qué lanzas y cuándo. Te decimos qué se puede hacer de verdad y por dónde empezar." },
  },

  producciones: {
    slug: "producciones",
    path: "/records/producciones",
    eyebrow: "Producción de giras",
    h1: "Tú tocas. De lo demás nos ocupamos nosotros.",
    desc: "Producción técnica, escenario, logística y coordinación de giras de artista. Plaza a plaza, de la producción previa al desmontaje.",
    ctaSubject: "Producción de gira",
    aspects: [
      { name: "Producción técnica", desc: "Sonido, backline, monitores y la ingeniería del directo. Con equipo propio, para que suene igual en cada plaza." },
      { name: "Logística y road", desc: "Transporte, tiempos, permisos y el plan B. Road management plaza a plaza." },
      { name: "Un solo interlocutor", desc: "De la producción previa al desmontaje habla siempre con la misma persona. Nadie rebotando entre proveedores." },
    ],
    faq: [
      { q: "¿Qué incluye producir una gira?", a: "La parte que no se ve: avance con promotores y salas, hojas de ruta, técnica, backline, escenario, transporte y road management. Lo que hace falta para que el artista solo tenga que tocar." },
      { q: "¿Trabajáis con el equipo del artista?", a: "Sí. Si ya hay técnico de sonido, tour manager o banda, nos acoplamos. Si no lo hay, lo ponemos nosotros." },
      { q: "¿Hace falta tener toda la gira cerrada?", a: "No. Podemos entrar con las fechas ya cerradas o antes, ayudando a ordenar la ruta para que la gira se sostenga." },
      { q: "¿Solo giras grandes?", a: "No. Hemos llevado giras de más de cuarenta fechas y también rutas de ocho. Lo que cambia es el tamaño del equipo, no cómo se trabaja." },
      { q: "¿Trabajáis en toda España?", a: "Sí. Tenemos base en Sabadell (Barcelona) y movemos giras por todo el país; también hemos trabajado fuera." },
      { q: "¿Esto es lo mismo que producir mi disco?", a: "No. Aquí hablamos de producción de gira: el directo. La producción musical de estudio va por otro lado, en records." },
    ],
    cta: { h2: "¿Tienes una gira que mover?", desc: "Cuéntanos las fechas y el proyecto. Te decimos cómo la montamos y por dónde empezaríamos." },
  },
};

export const serviceList = Object.values(services);
