import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  tier: "booking" | "distribucion";
  spotifyArtistId?: string;
  instagram?: string;
  image?: string;
  bio: string[];
  reels?: string[];
  /** Hitos verificables: año + frase corta. Si está vacío no se pinta nada.
   *  Ej. frontmatter:
   *    milestones:
   *      - { year: "2025", text: "Gira nacional Qué Fantasía Tour, 6 ciudades" }
   *      - { year: "2024", text: "Primer EP 'Gatea'" }                       */
  milestones?: { year: string; text: string }[];
};

export type CaseStudy = {
  slug: string;
  brand: string;
  title: string;
  context: string;
  result: string;
  year: string;
};

function readDir(dir: string) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".md"));
}

export function getArtists(): Artist[] {
  return readDir("artistas")
    .map((file) => {
      const raw = fs.readFileSync(path.join(root, "artistas", file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        bio: content
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean),
        ...(data as Omit<Artist, "slug" | "bio">),
      };
    })
    .sort((a, b) => (a.tier === b.tier ? 0 : a.tier === "booking" ? -1 : 1));
}

export function getArtist(slug: string): Artist | undefined {
  return getArtists().find((a) => a.slug === slug);
}

export function getCases(): CaseStudy[] {
  return readDir("casos")
    .map((file) => {
      const raw = fs.readFileSync(path.join(root, "casos", file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        ...(data as Omit<CaseStudy, "slug">),
      };
    })
    .sort((a, b) => b.year.localeCompare(a.year));
}
