import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content", "diario");

export type Post = {
  slug: string;
  /** Titular del artículo (H1 + <title>). */
  title: string;
  /** Meta description / entradilla. */
  description: string;
  /** Fecha ISO (YYYY-MM-DD). Ordena el listado. */
  date: string;
  /** Etiquetas para chips y contexto SEO. */
  tags?: string[];
  /** Autoría (por defecto Bonito Sound). */
  author?: string;
  /** Cluster de contenido al que apunta (pillar SEO interno). */
  cluster?: string;
  /** Página pillar con la que enlaza (interlinking SEO). */
  pillarHref?: string;
  /** FAQ del artículo → alimenta FAQPage schema + AIO. */
  faq?: { q: string; a: string }[];
  /** Si true, no se publica. */
  draft?: boolean;
  /** Cuerpo en bloques (párrafos, encabezados ## / ###, listas -). */
  body: string[];
};

export function getPosts(): Post[] {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".md") && !f.endsWith(".ca.md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(root, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        body: content
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean),
        ...(data as Omit<Post, "slug" | "body">),
      };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
