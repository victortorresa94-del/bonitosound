import type { Metadata } from "next";
import Image from "next/image";
import { SpotifyEmbed } from "@/components/Embeds";
import { JsonLd } from "@/components/ui";
import { MarqueeRow } from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { site, support } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jaleo Sound — Festival de cultura española en Amsterdam",
  description:
    "Jaleo Sound: festival de cultura española y latina en Amsterdam. 11-12 de septiembre de 2026, Posthoornkerk Cultural Church.",
  alternates: { canonical: `${site.url}/jaleo-sound` },
};

const lineup = [
  { name: "Lucía Conde", line: "Nostalgia española + electrónica holandesa.", tag: "Live" },
  { name: "Andrés Barrios", line: "Flamenco al piano, contemporáneo. Km.0.", tag: "Live" },
  { name: "Sofía Peters", line: "Indie-pop hispano-neerlandés.", tag: "Live" },
  { name: "+ TBA", line: "Más artistas por anunciar.", tag: "Soon" },
];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2c.6 5 .8 7.4 5 8-4.2.6-4.4 3-5 8-.6-5-.8-7.4-5-8 4.2-.6 4.4-3 5-8Z" fill="currentColor" />
    </svg>
  );
}

export default function JaleoSound() {
  const seccion = findAsset("secciones", "jaleo");

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

      {/* ───── HERO a pantalla completa (Dekmantel-tier) ───── */}
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

        {/* Título gigante */}
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
            No massive stages, no VIP fences, no nonsense. Just music, good
            taste, great food and people.
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

      {/* ───── Line-up grande ───── */}
      <section className="border-t border-white/20 py-24 md:py-32">
        <div className="wrap">
          <div className="flex items-end justify-between">
            <h2 className="display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9]">Line-up</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Edición 2026</p>
          </div>
          <ul className="mt-12 divide-y divide-white/20 border-y border-white/20">
            {lineup.map((a, i) => (
              <li key={a.name} className="group flex flex-col gap-2 py-7 transition-colors hover:bg-white/5 md:flex-row md:items-center md:justify-between md:px-4">
                <div className="flex items-baseline gap-5">
                  <span className="text-sm text-white/40">0{i + 1}</span>
                  <span className="display text-[clamp(2rem,6vw,4.5rem)] leading-none transition-transform duration-300 group-hover:translate-x-3">
                    {a.name}
                  </span>
                </div>
                <div className="flex items-center gap-6 md:pl-6">
                  <span className="text-sm text-white/70">{a.line}</span>
                  <span className="shrink-0 rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
                    {a.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
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
            Con el apoyo de Instituto Cervantes, Embajada de España, AIE y
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
