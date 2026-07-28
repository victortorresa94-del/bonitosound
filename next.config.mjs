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

      // WPML: prefijos de idioma viejos -> estructura plana en ES
      { source: "/ca/:path*", destination: "/:path*", statusCode: 301 },
      { source: "/es/:path*", destination: "/:path*", statusCode: 301 },
    ];
  },
};

export default nextConfig;
