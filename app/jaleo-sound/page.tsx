import type { Metadata } from "next";
import { SpotifyEmbed } from "@/components/Embeds";
import { JsonLd } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
} from "@/components/motion";
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
          <RevealOnScroll as="p" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Festival propio · Amsterdam
          </RevealOnScroll>
          <SplitTextReveal
            as="h1"
            split="chars"
            stagger={0.035}
            y={60}
            className="display mt-5 text-[clamp(2.6rem,8vw,6rem)]"
          >
            Jaleo Sound
          </SplitTextReveal>
          <RevealOnScroll as="p" className="mt-7 max-w-2xl text-xl text-white/90" delay={0.3}>
            No massive stages, no VIP fences, no nonsense. Just music, good
            taste, great food and people.
          </RevealOnScroll>
          <RevealOnScroll className="mt-10 flex flex-wrap gap-4" delay={0.45}>
            <MagneticButton strength={0.35}>
              <a
                href={site.external.jaleo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white font-semibold text-[color:var(--jaleo-red)]"
              >
                Web del festival →
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <a
                href={`${site.external.jaleo}/open-call`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/40 text-white"
              >
                Open Call artistas →
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <a
                href={site.external.jaleo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/40 text-white"
              >
                Comprar entradas →
              </a>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <StaggerGroup stagger={0.12} className="wrap grid gap-8 md:grid-cols-3">
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
              className="rounded-2xl border border-white/20 bg-white/5 p-7 transition-colors hover:bg-white/10"
            >
              <h2 className="display text-2xl">{t}</h2>
              <p className="mt-3 text-white/80">{d}</p>
            </div>
          ))}
        </StaggerGroup>
      </section>

      {/* Line-up — verificar edición/confirmaciones 2026 con el equipo antes de publicar */}
      <section className="pb-4">
        <div className="wrap">
          <RevealOnScroll as="p" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            Line-up
          </RevealOnScroll>
          <SplitTextReveal
            as="h2"
            split="lines"
            className="display mt-4 mb-8 text-3xl"
          >
            Quién suena en Jaleo.
          </SplitTextReveal>
          <StaggerGroup stagger={0.1} className="grid gap-6 md:grid-cols-3">
            {[
              [
                "Lucía Conde",
                "Residente del colectivo The Sun. Junta la nostalgia española, el sonido latino y la escena electrónica holandesa.",
              ],
              [
                "Andrés Barrios — Km.0",
                "Un viaje que transforma el flamenco desde la raíz hacia lo contemporáneo, con el piano como voz y brújula.",
              ],
              [
                "Sofía Peters",
                "Indie-pop hispano-neerlandés: ganchos pop con un poso de melancolía indie.",
              ],
            ].map(([n, d]) => (
              <div
                key={n}
                className="rounded-2xl border border-white/20 bg-white/5 p-7 transition-colors hover:bg-white/10"
              >
                <h3 className="display text-xl">{n}</h3>
                <p className="mt-3 text-white/80">{d}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="py-20 md:pb-24 md:pt-16">
        <div className="wrap">
          <RevealOnScroll as="p" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
            La banda sonora
          </RevealOnScroll>
          <SplitTextReveal
            as="h2"
            split="lines"
            className="display mt-4 mb-8 text-3xl"
          >
            Playlist oficial de Jaleo.
          </SplitTextReveal>
          <RevealOnScroll className="max-w-3xl" delay={0.2}>
            <SpotifyEmbed
              type="playlist"
              id={site.external.spotifyJaleoPlaylistId}
              title="Playlist Jaleo Sound"
            />
          </RevealOnScroll>
          <RevealOnScroll as="p" className="mt-12 text-sm text-white/70">
            Con el apoyo de {support.join(" · ")}.
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
