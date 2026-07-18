/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // IONOS Deploy Now solo sirve estático (sin runtime Node) → export estático.
  // Produce /out con HTML/CSS/JS/imágenes listos para publicar.
  output: "export",

  images: {
    // Sin servidor no hay optimización on-the-fly; se sirven tal cual.
    // (Las imágenes pesadas se pre-optimizan en el repo.)
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.bonitosound.com" },
      { protocol: "https", hostname: "**.scdn.co" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },

  // 301 desde URLs viejas de WordPress/WPML y atajos de marca.
  // ⚠ Con output:"export" estos NO se aplican (requieren servidor) → están
  // portados a .deploy-now/config.yaml, que es quien los ejecuta en IONOS.
  // Se dejan aquí como fuente de verdad / por si se vuelve a SSR.
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
