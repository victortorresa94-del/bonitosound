import type { Metadata } from "next";
import { SpotifyEmbed } from "@/components/Embeds";
import { JsonLd } from "@/components/ui";
import { site, support } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jaleo Sound — Festival de cultura española en Amsterdam",
  description:
    "Jaleo Sound: festival de cultura española y latina en Amsterdam. 11-12 de septiembre de 2026, Posthoornkerk Cultural Church.",
  alternates: { canonical: `${site.url}/jaleo-sound` },
};

export default function JaleoSound() {
  return (
    <div style={{ background: "var(--jaleo-red)", color: "#fff" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Festival",
          name: "Jaleo Sound",
          description:
            "Festival de cultura española y latina en Amsterdam.",
          startDate: "2026-09-11",
          endDate: "2026-09-12",
          location: {
            "@type": "Place",
            name: "Posthoornkerk Cultural Church",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Amsterdam",
              addressCountry: "NL",
            },
          },
          organizer: { "@type": "Organization", name: site.legalName },
          url: site.external.jaleo,
        }}
      />

      <section className="border-b border-white/15">
        <div className="wrap py-24 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Festival propio · Amsterdam
          </p>
          <h1 className="display mt-5 text-[clamp(2.6rem,8vw,6rem)]">
            Jaleo Sound
          </h1>
          <p className="mt-7 max-w-2xl text-xl text-white/90">
            No massive stages, no VIP fences, no nonsense. Just music, good
            taste, great food and people.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={site.external.jaleo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white font-semibold text-[color:var(--jaleo-red)]"
            >
              Web del festival →
            </a>
            <a
              href={`${site.external.jaleo}/open-call`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/40 text-white"
            >
              Open Call artistas →
            </a>
            <a
              href={site.external.jaleo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/40 text-white"
            >
              Comprar entradas →
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="wrap grid gap-8 md:grid-cols-3">
          {[
            [
              "Qué es",
              "Un festival de cultura española y latina en Amsterdam. Hecho por la misma gente que mueve Bonito, con la misma falta de tonterías.",
            ],
            [
              "Si estás cansado",
              "Si estás cansado de shows sobreproducidos y experiencias sin vida, esto es tu antídoto. Bring friends. Or make new ones.",
            ],
            [
              "Próxima edición",
              "11-12 de septiembre de 2026. Amsterdam, Posthoornkerk Cultural Church. La de 2025 pasó por Utrecht y Amsterdam.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/20 bg-white/5 p-7"
            >
              <h2 className="display text-2xl">{t}</h2>
              <p className="mt-3 text-white/80">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            La banda sonora
          </p>
          <h2 className="display mt-4 mb-8 text-3xl">
            Playlist oficial de Jaleo.
          </h2>
          <div className="max-w-3xl">
            <SpotifyEmbed
              type="playlist"
              id={site.external.spotifyJaleoPlaylistId}
              title="Playlist Jaleo Sound"
            />
          </div>
          <p className="mt-12 text-sm text-white/70">
            Con el apoyo de {support.join(" · ")}.
          </p>
        </div>
      </section>
    </div>
  );
}
