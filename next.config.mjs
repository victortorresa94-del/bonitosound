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

      // Slugs típicos del WordPress anterior
      { source: "/home", destination: "/", statusCode: 301 },
      { source: "/inicio", destination: "/", statusCode: 301 },
      { source: "/quienes-somos", destination: "/nosotros", statusCode: 301 },
      { source: "/sobre-nosotros", destination: "/nosotros", statusCode: 301 },
      { source: "/equipo", destination: "/nosotros", statusCode: 301 },
      { source: "/servicios", destination: "/eventos", statusCode: 301 },
      { source: "/booking", destination: "/records/booking-management", statusCode: 301 },
      { source: "/management", destination: "/records/booking-management", statusCode: 301 },
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
