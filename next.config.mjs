/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.bonitosound.com" },
      { protocol: "https", hostname: "**.scdn.co" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  // 301 desde URLs viejas de WordPress/WPML y atajos de marca.
  // Validar contra el sitemap real de WordPress en Fase 7 (§15) antes del go-live.
  async redirects() {
    return [
      // Atajos de marca / verticales del ecosistema
      { source: "/artiverse", destination: "/lab/artiverse", statusCode: 301 },
      { source: "/giraverse", destination: "/lab/giraverse", statusCode: 301 },
      { source: "/jaleo", destination: "/jaleo-sound", statusCode: 301 },
      { source: "/jaleosound", destination: "/jaleo-sound", statusCode: 301 },
      { source: "/festival", destination: "/jaleo-sound", statusCode: 301 },
      // Giras salió de /eventos a su propia página principal. Esta regla va
      // ANTES del comodín /eventos/:path* para que gane la específica.
      { source: "/eventos/giras", destination: "/giras", statusCode: 301 },
      // Las giras que tenían página bajo /experiencias ahora viven en /giras
      { source: "/experiencias/albert-pla", destination: "/giras/albert-pla-rumbagenarios", statusCode: 301 },
      { source: "/experiencias/anne-lukin", destination: "/giras/anne-lukin", statusCode: 301 },
      { source: "/experiencias/gira-1016", destination: "/giras/alfred-garcia-1016", statusCode: 301 },
      { source: "/eventos/albert-pla", destination: "/giras/albert-pla-rumbagenarios", statusCode: 301 },
      { source: "/eventos/anne-lukin", destination: "/giras/anne-lukin", statusCode: 301 },
      { source: "/eventos/gira-1016", destination: "/giras/alfred-garcia-1016", statusCode: 301 },
      // /eventos pasó a llamarse /experiencias (marcas, teatro y visuales).
      { source: "/eventos", destination: "/experiencias", statusCode: 301 },
      { source: "/eventos/:path*", destination: "/experiencias/:path*", statusCode: 301 },

      // Slugs típicos del WordPress anterior
      { source: "/home", destination: "/", statusCode: 301 },
      { source: "/inicio", destination: "/", statusCode: 301 },
      { source: "/quienes-somos", destination: "/nosotros", statusCode: 301 },
      { source: "/sobre-nosotros", destination: "/nosotros", statusCode: 301 },
      { source: "/equipo", destination: "/nosotros", statusCode: 301 },
      // Booking y Management salieron de /records (no son música grabada):
      // ahora viven en /booking y /management; redirigimos las URLs antiguas.
      { source: "/records/booking", destination: "/booking", statusCode: 301 },
      { source: "/records/management", destination: "/management", statusCode: 301 },
      { source: "/records/booking-management", destination: "/booking", statusCode: 301 },
      { source: "/sello", destination: "/records/sello", statusCode: 301 },
      { source: "/distribucion", destination: "/records/distribucion", statusCode: 301 },
      { source: "/roster", destination: "/artistas", statusCode: 301 },
      { source: "/contacto-2", destination: "/contacto", statusCode: 301 },
      { source: "/noticias", destination: "/diario", statusCode: 301 },
      { source: "/blog", destination: "/diario", statusCode: 301 },

      // WPML: prefijos de idioma viejos -> estructura plana en ES.
      // OJO: el /ca YA NO se redirige. Cuando se montó esto la web era solo en
      // castellano y /ca era basura heredada de WordPress; ahora /ca es la
      // versión catalana de verdad (la sirve middleware.ts por reescritura), y
      // dejar el 301 aquí se la comía antes de que el middleware actuase.
      { source: "/es/:path*", destination: "/:path*", statusCode: 301 },

      // ─────────────────────────────────────────────────────────────────
      // EL WORDPRESS DE VERDAD
      // Sacadas del sitemap real (bonitosound.com/sitemap.xml, 234 URLs,
      // generado el 12-08-2026). Son las que Google tiene indexadas hoy: cada
      // una sin destino es una visita que se pierde el día del cambio.
      //
      // Reparto por volumen: 100 en /agenda/<id>, 56 en /edicion/<slug>,
      // 22 en /artista/<slug>, 4 en /equipo/<slug> y el resto sueltas.
      // ─────────────────────────────────────────────────────────────────

      // Fichas de artista. Los slugs que CAMBIAN van primero: en Next gana la
      // primera regla que casa, así que si el comodín fuera antes, se comería
      // estas cuatro.
      { source: "/artista/dj-natura", destination: "/artistas/natura", statusCode: 301 },
      { source: "/artista/fabian-d-cuesta", destination: "/artistas/fabian", statusCode: 301 },
      // Overpopulation conserva su slug: el WordPress viejo lo tenia BIEN y era la
      // web nueva la que lo habia escrito mal ("Overpulation"). Corregido.
      // Estos cuatro ya no tienen ficha propia: al roster, que es lo más
      // cercano. Nunca al home a lo bruto — el que buscaba un artista sigue
      // aterrizando entre artistas.
      { source: "/artista/9zenit", destination: "/artistas", statusCode: 301 },
      { source: "/artista/idadeoia", destination: "/artistas", statusCode: 301 },
      { source: "/artista/paula-pinero", destination: "/artistas", statusCode: 301 },
      { source: "/artista/bemba-saoco", destination: "/giras", statusCode: 301 },
      // El resto conserva slug: /artista/dulze -> /artistas/dulze.
      { source: "/artista/:slug", destination: "/artistas/:slug", statusCode: 301 },

      // Equipo: la web nueva no tiene ficha por persona, todas viven en /nosotros.
      { source: "/equipo/:slug", destination: "/nosotros", statusCode: 301 },

      // Ediciones (los 56 lanzamientos del sello) -> la página de editorial,
      // que es donde se cuenta ese catálogo.
      { source: "/edicion", destination: "/records/editorial", statusCode: 301 },
      { source: "/edicion/:slug", destination: "/records/editorial", statusCode: 301 },

      // Agenda: eran 100 URLs con el ID numérico de WordPress
      // (/agenda/1270). Ese ID no significa nada en la web nueva, así que van
      // todas a la agenda.
      { source: "/agenda/:id", destination: "/agenda", statusCode: 301 },

      // Producciones pasó a ser un servicio dentro de Records.
      { source: "/producciones", destination: "/records/producciones", statusCode: 301 },

      // Legales. La web nueva junta privacidad y cookies en una sola página, y
      // no tiene declaración de accesibilidad: esa cae al aviso legal.
      { source: "/politica-privacidad", destination: "/privacidad", statusCode: 301 },
      { source: "/politica-de-cookies", destination: "/privacidad", statusCode: 301 },
      { source: "/declaracion-de-accesibilidad", destination: "/aviso-legal", statusCode: 301 },

      // Colaboraciones sueltas.
      { source: "/colaboracion/:slug", destination: "/artistas", statusCode: 301 },

      // Las ~30 noticias colgaban de la raíz, sin prefijo (/estamos-en-tik-tok),
      // así que NO se pueden capturar con un comodín sin tragarse también las
      // secciones nuevas. Van una a una, tal cual salen del sitemap.
      ...[
        "algo-que-debe-estar-roto-nueva-sorpresa-de-fabian-d-cuesta",
        "bonito-sound-en-el-12o-foro-europeo-de-la-musica-equidad-en-la-musica",
        "bonito-sound-presente-en-el-programa-impulsa-cultura",
        "bonito-sound-presente-en-las-jornadas-arc-2024",
        "d-nacar-y-su-nuevo-proyecto",
        "damos-la-bienvenida-a-ernest-prana",
        "el-apoyo-del-institut-ramon-llull-impulsa-la-internacionalizacion-de-natura-en-paises-bajos",
        "el-eclipse-de-eva-calyza-para-mi",
        "el-equipo-bonito-en-ise",
        "el-pablo-rojo-quintet-marxa-de-gira",
        "estamos-en-tik-tok",
        "hechodnacar-un-viatge-emocional-que-arriba-al-seu-final",
        "kenai-white-pasa-de-2-a-65k-escuchas-en-2-meses",
        "la-magia-de-laura-andres-en-bonito-sound",
        "la-nueva-propuesta-de-alexdelion",
        "llega-jaleo-sound-el-festival-que-te-hara-sentir-como-en-casa",
        "mayumana-spain-se-une-a-bonito-sound",
        "natura-en-el-cabro-rock",
        "nominados-en-los-premios-min",
        "nueva-musica-de-la-artista-eva-calyza",
        "nuevas-fechas-de-la-pianista-laura-andres",
        "rule-blanko-roto-se-unen-bajo-cero",
        "sa-pena-presenta-santuari",
        "somos-socios-de-arc",
      ].map((slug) => ({ source: `/${slug}`, destination: "/diario", statusCode: 301 })),

      // Restos del constructor de páginas de WordPress (Oxygen) y pruebas que
      // se colaron en el sitemap. No tienen equivalente porque nunca fueron
      // páginas de verdad.
      { source: "/manual", destination: "/", statusCode: 301 },
      { source: "/no-overlay-test", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
