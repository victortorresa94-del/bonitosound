import type { MetadataRoute } from "next";
import { getArtists, getEventos, getGiraSlugs } from "@/lib/content";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/servicios",
    "/experiencias",
    "/experiencias/marcas",
    "/giras",
    "/clientes",
    "/records",
    "/booking",
    "/management",
    "/records/sello",
    "/records/editorial",
    "/records/distribucion",
    "/marketing",
    "/records/producciones",
    "/artistas",
    "/artistas/todos",
    "/universo",
    "/lab/artiverse",
    "/lab/giraverse",
    "/jaleo-sound",
    "/nosotros",
    "/contacto",
    // /agenda queda fuera del sitemap hasta que tenga contenido real —
    // páginas finas dañan calidad de dominio.
  ];

  const posts = getPosts();
  const blog = posts.length
    ? [
        { route: "/diario", priority: 0.6 },
        ...posts.map((p) => ({ route: `/diario/${p.slug}`, priority: 0.6 })),
      ]
    : [];

  const now = new Date();
  const base = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : r === "/experiencias/marcas" ? 0.9 : 0.7,
  }));

  const artists = getArtists().map((a) => ({
    url: `${site.url}/artistas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventos = getEventos().map((e) => ({
    url: `${site.url}/experiencias/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const girasDetalle = getGiraSlugs().map((slug) => ({
    url: `${site.url}/giras/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const diario = blog.map((b) => ({
    url: `${site.url}${b.route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: b.priority,
  }));

  const es = [...base, ...artists, ...eventos, ...girasDetalle, ...diario];

  // Cada URL, también en catalán, con su par de alternates: es la forma que
  // Google entiende de decir "son la misma página en dos idiomas".
  return es.flatMap((entrada) => {
    const ruta = entrada.url.slice(site.url.length);
    const urlCa = `${site.url}/ca${ruta}`;
    const languages = { es: entrada.url, ca: urlCa };
    return [
      { ...entrada, alternates: { languages } },
      { ...entrada, url: urlCa, alternates: { languages } },
    ];
  });
}
