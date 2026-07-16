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
  /** Titular provisional del hero (Víctor lo reemplaza con su diseño). */
  h1: string;
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
    path: "/records/booking",
    eyebrow: "Booking",
    h1: "Fechas de verdad. No promesas.",
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
    ],
    cta: { h2: "¿Quieres una fecha?", desc: "Cuéntanos qué buscas y para cuándo. Te decimos qué encaja de verdad." },
  },

  management: {
    slug: "management",
    path: "/records/management",
    eyebrow: "Management",
    h1: "Una carrera, llevada a mano.",
    desc: "Gestionamos la carrera del artista de principio a fin: estrategia, calendario y las decisiones que importan.",
    ctaSubject: "Management",
    aspects: [
      { name: "Estrategia con criterio", desc: "Qué sale, cuándo y por qué. Decidimos el siguiente paso con argumentos, no con prisas." },
      { name: "A mano", desc: "Aquí no hay artistas de primera y de segunda. A Eva Calyza la lleva Manu personalmente; así trabajamos con todos." },
      { name: "Un solo interlocutor", desc: "Booking, sello y distribución hablan entre sí porque están en la misma casa. El artista no va rebotando." },
    ],
    faq: [
      { q: "¿En qué se diferencia del booking?", a: "El booking cierra fechas. El management lleva la carrera entera: estrategia, lanzamientos, equipo y decisiones a medio plazo." },
      { q: "¿Hace falta estar en el sello?", a: "No es obligatorio, pero cuando management, sello y distribución van juntos, todo encaja mejor." },
      { q: "¿Con cuántos artistas trabajáis?", a: "Con pocos, a propósito. Llevar bien una carrera pide tiempo y cabeza, no un catálogo enorme." },
    ],
    cta: { h2: "¿Hablamos de tu carrera?", desc: "Cuéntanos dónde estás y a dónde quieres llegar. Te decimos cómo lo haríamos." },
  },

  sello: {
    slug: "sello",
    path: "/records/sello",
    eyebrow: "Sello",
    h1: "Del máster a la calle, con criterio.",
    desc: "Producimos, publicamos y empujamos. Trabajamos pocos proyectos y los trabajamos en serio.",
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
    ],
    cta: { h2: "¿Tu música rinde lo que debería?", desc: "Cuéntanos qué tienes publicado y le echamos un ojo." },
  },

  distribucion: {
    slug: "distribucion",
    path: "/records/distribucion",
    eyebrow: "Distribución",
    h1: "Tu música en las plataformas. Bien.",
    desc: "Llevamos tu música a todas las plataformas y nos ocupamos de que llegue como toca. Ya distribuyen unos veinte artistas con nosotros.",
    ctaSubject: "Distribución",
    aspects: [
      { name: "A todas partes", desc: "Spotify, Apple Music, YouTube y las demás. Tu música donde tiene que estar, con los metadatos en orden." },
      { name: "Con seguimiento", desc: "No es subir y olvidarse. Miramos cómo se mueve y cuándo tiene sentido apoyar un lanzamiento." },
      { name: "Parte del sistema", desc: "Si además estás en sello o management, la distribución trabaja con el resto. No vas por libre." },
    ],
    faq: [
      { q: "¿Distribuís a artistas de fuera del sello?", a: "Sí. La distribución es un servicio independiente; no hace falta estar fichado en el sello." },
      { q: "¿A qué plataformas llegáis?", a: "A las principales del mundo: Spotify, Apple Music, Amazon, YouTube Music, Deezer y demás." },
      { q: "¿Puedo distribuir y llevar el resto por mi cuenta?", a: "Claro. Contratas solo la distribución si es lo que necesitas." },
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
    ],
    cta: { h2: "¿Tienes algo que sacar?", desc: "Cuéntanos qué lanzas y cuándo. Te decimos qué se puede hacer de verdad y por dónde empezar." },
  },

  producciones: {
    slug: "producciones",
    path: "/records/producciones",
    eyebrow: "Producciones",
    h1: "Del brief al evento. Con un solo equipo.",
    desc: "Producimos eventos con música en directo: activaciones de marca y directos de artista. Más de 250 eventos, 58 marcas.",
    ctaSubject: "Producciones y eventos",
    aspects: [
      { name: "Concepto y dirección", desc: "Cogemos tu brief y lo convertimos en un evento con sentido: qué artista, qué formato, qué momento." },
      { name: "Producción técnica", desc: "Lo que prometemos en el deck, lo montamos. Sonido, escenario y logística, con equipo propio." },
      { name: "El artista que encaja", desc: "Tenemos roster propio y agenda en toda la industria. Elegimos al que va con tu marca y tu público." },
    ],
    faq: [
      { q: "¿Cuánto cuesta producir un evento?", a: "Depende del formato, el artista y la escala — no hay dos iguales. Lo cerramos sobre tu brief real, hablándolo." },
      { q: "¿Solo hacéis eventos de marca?", a: "No. Montamos activaciones para marcas y también giras y directos de artistas. Puedes ver los casos en la sección de eventos." },
      { q: "¿Tengo que traer yo el artista?", a: "No hace falta. Elegimos al que encaja con tu marca; si ya tienes uno en mente, también trabajamos con él." },
    ],
    cta: { h2: "¿Montamos el tuyo?", desc: "Cuéntanos qué tienes en la cabeza. Te decimos qué se puede hacer de verdad." },
  },
};

export const serviceList = Object.values(services);
