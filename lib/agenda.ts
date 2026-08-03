import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Show = {
  slug: string;
  artist: string;
  date: string;
  city: string;
  venue: string;
  ticketsUrl?: string;
};

const dir = path.join(process.cwd(), "content", "agenda");

export function getShows(): Show[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.endsWith(".ca.md"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.md$/, ""),
        ...(data as Omit<Show, "slug">),
      };
    })
    .filter((s) => new Date(s.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => a.date.localeCompare(b.date));
}
