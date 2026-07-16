import type { MetadataRoute } from "next";
import { getArtists, getEventos } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/eventos",
    "/eventos/marcas",
    "/eventos/giras",
    "/records",
    "/records/booking",
    "/records/management",
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
    // /agenda y /diario quedan fuera del sitemap hasta que tengan
    // contenido real — páginas finas dañan calidad de dominio.
  ];

  const now = new Date();
  const base = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : r === "/eventos/marcas" ? 0.9 : 0.7,
  }));

  const artists = getArtists().map((a) => ({
    url: `${site.url}/artistas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const eventos = getEventos().map((e) => ({
    url: `${site.url}/eventos/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...base, ...artists, ...eventos];
}
