import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { r2 } from "./site";

const root = path.join(process.cwd(), "content");

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  tier: "booking" | "distribucion";
  /** Servicios de Bonito que usa este artista (plug-and-play, para el desglose
   *  por servicio en /artistas/todos). Valores libres, ej:
   *    services: ["Booking", "Management", "Sello"]
   *  Si no está, el artista solo aparece en su grupo por `tier`. Nada inventado. */
  services?: string[];
  spotifyArtistId?: string;
  /** Playlist propia del artista (si difiere de su perfil de artista). */
  spotifyPlaylistId?: string;
  instagram?: string;
  image?: string;
  /** Stats para la cabecera de la ficha (texto libre, ej. "+18k oyentes
   *  mensuales" / "+9k seguidores"). Solo se pintan si están puestos — no se
   *  inventan cifras. */
  listeners?: string;
  followers?: string;
  /** ── Ficha-experiencia (todo opcional: el bloque solo se pinta si hay dato) ──
   *  Nada inventado: si no está en el frontmatter, la sección no aparece. */
  /** Números para el bloque "En números". Ej:
   *    stats:
   *      - { value: "22k", label: "oyentes/mes en Spotify" }
   *      - { value: "18k", label: "seguidores en Instagram" } */
  stats?: { value: string; label: string }[];
  /** Descripción de su sonido (bloque "Su sonido"). */
  musicStyle?: string;
  /** Influencias / referencias (chips). */
  influences?: string[];
  /** "Para quien…" — a quién le habla su música. */
  forWho?: string;
  /** ID de Spotify de su última canción publicada (embed destacado). */
  lastTrackId?: string;
  /** IDs de Spotify de temas destacados. */
  featuredTracks?: string[];
  /** Primer y último concierto (prueba de directo). */
  firstConcert?: { date?: string; venue?: string; city?: string };
  lastConcert?: { date?: string; venue?: string; city?: string };
  /** Fotos adicionales para la galería de la ficha (rutas en /public). */
  gallery?: string[];
  bio: string[];
  /** URLs de posts/reels de Instagram (conciertos, backstage…). */
  reels?: string[];
  /** IDs de vídeos de YouTube (directos, videoclips, backstage…). */
  youtubeIds?: string[];
  /** Hitos verificables: año + frase corta. Si está vacío no se pinta nada.
   *  Ej. frontmatter:
   *    milestones:
   *      - { year: "2025", text: "Gira nacional Qué Fantasía Tour, 6 ciudades" }
   *      - { year: "2024", text: "Primer EP 'Gatea'" }                       */
  milestones?: { year: string; text: string }[];
  /** Si true, la ficha no se publica: se excluye del roster y de las rutas
   *  estáticas. Para artistas cuyos datos aún no están confirmados. */
  draft?: boolean;
};

export type Evento = {
  slug: string;
  title: string;
  /** Marca del evento (activaciones, festivales de marca…). Opcional. */
  brand?: string;
  /** Artista protagonista (giras, showcases…). Opcional. */
  artist?: string;
  /** Tipo de evento — define el tratamiento visual en /eventos. */
  type: "marca" | "gira" | "festival" | "showcase";
  year: string;
  location?: string;
  /** Nº de eventos hechos para esta marca (ej. "+80 eventos"). Opcional. */
  count?: string;
  /** Vídeo propio en /public/video/eventos/<slug>.mp4 (prioridad sobre YouTube). */
  video?: string;
  /** URL externa del vídeo (Cloudflare R2, Bunny, IONOS…). Independiente del
   *  hosting: la misma URL sirve en dev (Vercel) y en producción (IONOS). */
  videoUrl?: string;
  /** ID de YouTube si el vídeo vive ahí en vez de autoalojado. */
  youtubeId?: string;
  /** Fotos adicionales para la galería de la página del evento. */
  gallery?: string[];
  context: string;
  result: string;
  /** Párrafos largos opcionales (cuerpo markdown) para la página individual. */
  body: string[];
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
    .filter((a) => !a.draft)
    .sort((a, b) => (a.tier === b.tier ? 0 : a.tier === "booking" ? -1 : 1));
}

export function getArtist(slug: string): Artist | undefined {
  return getArtists().find((a) => a.slug === slug);
}

/** Ruta del vídeo autoalojado del evento si existe en /public (o null). */
function resolveEventoVideo(slug: string): string | undefined {
  const rel = `/video/eventos/${slug}.mp4`;
  const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
  return fs.existsSync(abs) ? rel : undefined;
}

export function getEventos(): Evento[] {
  return readDir("eventos")
    .map((file) => {
      const raw = fs.readFileSync(path.join(root, "eventos", file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      const fm = data as Omit<Evento, "slug" | "body">;
      return {
        slug,
        body: content
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean),
        ...fm,
        // El vídeo se resuelve por prioridad: archivo local en /public →
        // ruta forzada en frontmatter → URL externa (R2/Bunny/IONOS). Así el
        // <video> nunca queda roto y el mismo `videoUrl` sirve en dev y prod.
        video: resolveEventoVideo(slug) ?? fm.video ?? (fm.videoUrl ? r2(fm.videoUrl) : undefined),
      };
    })
    .sort((a, b) => b.year.localeCompare(a.year));
}

export function getEvento(slug: string): Evento | undefined {
  return getEventos().find((e) => e.slug === slug);
}
