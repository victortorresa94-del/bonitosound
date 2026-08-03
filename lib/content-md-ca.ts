import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import type { Artist, Evento } from "@/lib/content";

/**
 * Traducción del CONTENIDO en markdown (fichas de artista, giras y eventos).
 *
 * Cómo funciona: junto a `content/artistas/dulze.md` puede vivir un
 * `content/artistas/dulze.ca.md` con SOLO lo que cambia en catalán —el cuerpo
 * y los campos de texto libre—. Se superpone sobre el original; lo que el
 * fichero catalán no traiga, se queda en castellano.
 *
 * Por qué así y no un `.md` catalán completo: los datos duros (Spotify, IDs de
 * YouTube, fotos, redes, fechas) son los mismos en los dos idiomas. Duplicarlos
 * significaría que cualquier cambio hay que hacerlo dos veces y que tarde o
 * temprano las dos copias dejan de coincidir.
 *
 * Los nombres propios NO se traducen: ni el del artista, ni el título de una
 * gira, ni el de una canción.
 */

const root = path.join(process.cwd(), "content");

/** Lee la superposición catalana de una ficha, si existe. */
function overlay(dir: string, slug: string): { data: Record<string, unknown>; body: string } | null {
  const abs = path.join(root, dir, `${slug}.ca.md`);
  if (!fs.existsSync(abs)) return null;
  const { data, content } = matter(fs.readFileSync(abs, "utf8"));
  return { data: data as Record<string, unknown>, body: content };
}

/** Trocea el cuerpo en párrafos, igual que hace lib/content.ts. */
function parrafos(body: string): string[] {
  return body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

/** Aplica la traducción catalana a una ficha de artista. */
export function artistaCa(a: Artist, locale: Locale): Artist {
  if (locale === DEFAULT_LOCALE) return a;
  const o = overlay("artistas", a.slug);
  if (!o) return a;
  const d = o.data;
  const bio = parrafos(o.body);
  return {
    ...a,
    ...(d.genre ? { genre: d.genre as string } : {}),
    ...(d.services ? { services: d.services as string[] } : {}),
    ...(d.musicStyle ? { musicStyle: d.musicStyle as string } : {}),
    ...(d.milestones ? { milestones: d.milestones as Artist["milestones"] } : {}),
    ...(d.stats ? { stats: d.stats as Artist["stats"] } : {}),
    ...(d.extras ? { extras: d.extras as Artist["extras"] } : {}),
    ...(bio.length ? { bio } : {}),
  };
}

/** Aplica la traducción catalana a un evento o una gira. */
export function eventoCa(e: Evento, locale: Locale, dir: "eventos" | "giras"): Evento {
  if (locale === DEFAULT_LOCALE) return e;
  const o = overlay(dir, e.slug);
  if (!o) return e;
  const d = o.data;
  const body = parrafos(o.body);
  return {
    ...e,
    ...(d.title ? { title: d.title as string } : {}),
    ...(d.location ? { location: d.location as string } : {}),
    ...(d.context ? { context: d.context as string } : {}),
    ...(d.result ? { result: d.result as string } : {}),
    ...(d.services ? { services: d.services as string[] } : {}),
    ...(d.count ? { count: d.count as string } : {}),
    ...(d.quote ? { quote: d.quote as Evento["quote"] } : {}),
    ...(body.length ? { body } : {}),
  };
}

/** Aplica la traducción catalana a un artículo del diario. */
export function postCa<T extends { slug: string; title: string; description: string; body: string[]; faq?: { q: string; a: string }[]; cluster?: string; tags?: string[] }>(
  p: T,
  locale: Locale,
): T {
  if (locale === DEFAULT_LOCALE) return p;
  const o = overlay("diario", p.slug);
  if (!o) return p;
  const d = o.data;
  const body = parrafos(o.body);
  return {
    ...p,
    ...(d.title ? { title: d.title as string } : {}),
    ...(d.description ? { description: d.description as string } : {}),
    ...(d.cluster ? { cluster: d.cluster as string } : {}),
    ...(d.tags ? { tags: d.tags as string[] } : {}),
    ...(d.faq ? { faq: d.faq as { q: string; a: string }[] } : {}),
    ...(body.length ? { body } : {}),
  };
}
