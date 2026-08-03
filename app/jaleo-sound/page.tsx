import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SpotifyEmbed, YouTubeEmbed } from "@/components/Embeds";
import { JsonLd } from "@/components/ui";
import { MarqueeRow } from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { site, support } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return {
  title: "Jaleo Sound — Festival de cultura española en Amsterdam",
  description:
    "Jaleo Sound: festival de cultura española y latina en Amsterdam. 11-12 de septiembre de 2026, Posthoornkerk Cultural Church.",
  alternates: alternatesFor(`/jaleo-sound`),
  };
}

// Line-up de la edición 2025 (verificado: jaleosound.com / spainculture.nl).
// Las confirmaciones de 2026 se añadirán cuando el festival las anuncie.
const lineup2025 = [
  { name: "Andrés Barrios", line: "Flamenco al piano. Km.0: de la raíz a lo contemporáneo." },
  { name: "Lucía Conde", line: "Nostalgia española + electrónica holandesa. Colectivo The Sun." },
  { name: "Grupo Puerto", line: "Jazz melódico afrolatino." },
  { name: "AlexAbril", line: "Dúo español de jazz-fusión. Disco REELAX." },
  { name: "Dúo Zambra", line: "Flamenco, danza española y electrónica." },
];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2c.6 5 .8 7.4 5 8-4.2.6-4.4 3-5 8-.6-5-.8-7.4-5-8 4.2-.6 4.4-3 5-8Z" fill="currentColor" />
    </svg>
  );
}

/** Galería automática plug-and-play: pinta lo que haya en /public/img/jaleo */
function listJaleoPhotos(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "img", "jaleo");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(png|webp|jpe?g|avif)$/i.test(f))
      .sort()
      .map((f) => `/img/jaleo/${f}`);
  } catch {
    return [];
  }
}

export default function JaleoSound() {
  const seccion = findAsset("secciones", "jaleo");
  const photos = listJaleoPhotos();

  return (
    <div className="text-white" style={{ background: "var(--jaleo-red)" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Festival",
          name: "Jaleo Sound",
          description: "Festival de cultura española y latina en Amsterdam.",
          startDate: "2026-09-11",
          endDate: "2026-09-12",
          location: {
            "@type": "Place",
            name: "Posthoornkerk Cultural Church",
            address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
          },
          organizer: { "@type": "Organization", name: site.legalName },
          url: site.external.jaleo,
        }}
      />

      {/* ───── HERO cartel pantalla completa ───── */}
      <section className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-28">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[44rem] w-[44rem] rounded-full opacity-40 blur-3xl" style={{ background: "#ff8a5c" }} />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[40rem] w-[40rem] rounded-full opacity-25 blur-3xl" style={{ background: "#fff" }} />
        <Star className="absolute left-[10%] top-32 h-12 w-12 text-white/25" />
        <Star className="absolute right-[16%] bottom-44 h-6 w-6 text-white/40" />

        <div className="wrap relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
            Festival propio · Cultura española y latina · Amsterdam
          </p>
        </div>

        <div className="relative">
          <h1 className="display px-2 text-center text-[clamp(4rem,22vw,20rem)] leading-[0.8] tracking-tighter">
            JALEO
          </h1>
          <h1 className="display px-2 text-center text-[clamp(4rem,22vw,20rem)] italic leading-[0.8] tracking-tighter text-white/90">
            SOUND
          </h1>
        </div>

        <div className="wrap relative grid gap-6 pb-12 md:grid-cols-3 md:items-end">
          <p className="max-w-md text-lg text-white/85 md:text-xl">
            No massive stages, no VIP fences, no nonsense. Just music, good taste, great food and people.
          </p>
          <div className="md:text-center">
            <p className="display text-4xl leading-none md:text-5xl">11–12 SEP</p>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">2026 · Posthoornkerk</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={site.external.jaleo} target="_blank" rel="noopener noreferrer" className="btn bg-white font-semibold text-[color:var(--jaleo-red)]">
              Entradas →
            </a>
            <a href={`${site.external.jaleo}/open-call`} target="_blank" rel="noopener noreferrer" className="btn border border-white/40 text-white">
              Open Call →
            </a>
          </div>
        </div>
      </section>

      {/* ───── Marquee tagline ───── */}
      <section className="border-y border-white/20 py-5">
        <MarqueeRow speed={50} gap="3rem">
          <span className="flex items-center gap-10 pr-10 text-[clamp(1.4rem,3.5vw,2.6rem)] font-semibold">
            <span className="display">Music</span><Star className="h-5 w-5" />
            <span className="display italic">Good taste</span><Star className="h-5 w-5" />
            <span className="display">Great food</span><Star className="h-5 w-5" />
            <span className="display italic">Good people</span><Star className="h-5 w-5" />
          </span>
        </MarqueeRow>
      </section>

      {/* ───── Galería de ediciones pasadas (plug-and-play) ─────
           Solo se renderiza si hay fotos en public/img/jaleo/. */}
      {photos.length > 0 && (
      <section className="border-b border-white/15 py-20 md:py-28">
        <div className="wrap mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Ediciones pasadas</p>
            <h2 className="display mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[0.95]">
              Esto es lo que pasó.
            </h2>
          </div>
          <a
            href={site.external.jaleo}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-semibold text-white underline underline-offset-4 hover:text-accent-warm-soft md:inline-block"
          >
            Ver más en jaleosound.com →
          </a>
        </div>

        <div className="wrap grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.slice(0, 8).map((p, i) => (
            <div
              key={p}
              className={`relative overflow-hidden rounded-2xl border border-white/20 ${
                i === 0 || i === 5 ? "aspect-[3/4] md:row-span-2 md:aspect-[3/5]" : "aspect-square"
              }`}
            >
              <Image
                src={p}
                alt=""
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ───── Vídeo (Sant Jordi Club) como muestra del directo Bonito ───── */}
      <section className="border-b border-white/15 py-20 md:py-28">
        <div className="wrap">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">El directo de Bonito</p>
          <h2 className="display mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[0.95]">
            Lo que montamos cuando nos dejan.
          </h2>
          <p className="mt-4 max-w-2xl text-white/80">
            Final de la Gira 1016 en el Sant Jordi Club de Barcelona. Producido
            por el mismo equipo que monta Jaleo cada septiembre en Amsterdam.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/20">
            <YouTubeEmbed id="r47SP4OULcI" title="Final Gira 1016 — Sant Jordi Club" />
          </div>
        </div>
      </section>

      {/* ───── Qué es ───── */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">El antídoto</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95]">
              Si estás cansado de shows sin vida, esto es lo tuyo.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Un festival de cultura española y latina en Amsterdam, hecho por
              la misma gente que mueve Bonito, con la misma falta de tonterías.
              Bring friends. Or make new ones.
            </p>
          </div>
          {seccion && (
            <div className="relative mx-auto aspect-square w-2/3 md:w-full">
              <Image src={seccion} alt="" fill sizes="(max-width:768px) 66vw, 40vw" className="object-contain brightness-0 invert" />
            </div>
          )}
        </div>
      </section>

      {/* ───── Edición 2025 ───── */}
      <section className="border-t border-white/20 py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9]">
              Así sonó 2025.
            </h2>
            <p className="max-w-sm text-sm text-white/70 md:text-right">
              11–12 de octubre de 2025, Posthoornkerk, dentro de los actos del
              750 aniversario de Amsterdam. Música, arte y gastronomía.
            </p>
          </div>
          <ul className="mt-12 divide-y divide-white/20 border-y border-white/20">
            {lineup2025.map((a, i) => (
              <li
                key={a.name}
                className="group flex flex-col gap-2 py-7 transition-colors hover:bg-white/5 md:flex-row md:items-center md:justify-between md:px-4"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-sm text-white/40">0{i + 1}</span>
                  <span className="display text-[clamp(2rem,6vw,4.5rem)] leading-none transition-transform duration-300 group-hover:translate-x-3">
                    {a.name}
                  </span>
                </div>
                <span className="text-sm text-white/70 md:pl-6">{a.line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/60">
            El cartel de la edición 2026 se anunciará en las próximas semanas
            en{" "}
            <a
              href={site.external.jaleo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              jaleosound.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* ───── Playlist ───── */}
      <section className="border-t border-white/20 py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">La banda sonora</p>
            <h2 className="display mt-4 text-[clamp(2.2rem,6vw,4rem)] leading-[0.95]">Suena así.</h2>
            <p className="mt-5 max-w-md text-lg text-white/80">
              La playlist oficial. Para entender el festival antes de pisar Amsterdam.
            </p>
            <a
              href={site.external.jaleo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-white underline underline-offset-4"
            >
              Más en jaleosound.com →
            </a>
          </div>
          <div className="rounded-2xl bg-black/15 p-2">
            <SpotifyEmbed type="playlist" id={site.external.spotifyJaleoPlaylistId} title="Playlist Jaleo Sound" />
          </div>
        </div>
      </section>

      {/* ───── Apoyos + cierre ───── */}
      <section className="border-t border-white/20 py-16">
        <div className="wrap">
          <p className="text-sm text-white/70">
            Con el apoyo del Instituto Cervantes, Embajada de España en Holanda, AIE y
            Stadsdeel Amsterdam. {support.join(" · ")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.external.jaleo} target="_blank" rel="noopener noreferrer" className="btn bg-white font-semibold text-[color:var(--jaleo-red)]">
              Web del festival →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
