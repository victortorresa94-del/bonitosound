import type { Metadata } from "next";
import Link from "next/link";
import {
  RevealOnScroll,
  StaggerGroup,
} from "@/components/motion";
import { RosterCard } from "@/components/artistas/RosterCard";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { distributionCatalog, site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Artistas — el roster de Bonito Sound",
  description:
    "A estos los llevamos nosotros: booking, management y sello. Pocos artistas, bien llevados, más un catálogo de distribución de ~20 nombres.",
  alternates: { canonical: `${site.url}/artistas` },
};

// Orden del mockup + tratamiento asimétrico por posición (aspecto + desplazamiento).
const ORDER = ["dulze", "eva-calyza", "natura", "pablo-rojo", "paule", "sa-pena"];
const LAYOUT: Record<string, { aspect: string; shift: string }> = {
  dulze: { aspect: "aspect-[4/5]", shift: "" },
  "eva-calyza": { aspect: "aspect-[4/5]", shift: "md:mt-16" },
  natura: { aspect: "aspect-[3/4]", shift: "md:-mt-2" },
  "pablo-rojo": { aspect: "aspect-[4/5]", shift: "" },
  paule: { aspect: "aspect-[4/5]", shift: "md:mt-16" },
  "sa-pena": { aspect: "aspect-[5/4]", shift: "md:-mt-2" },
};

export default function Artistas() {
  const all = getArtists();
  const booking = all
    .filter((a) => a.tier === "booking")
    .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-4 pt-20 md:pt-28">
          <RevealOnScroll
            as="h1"
            className="display leading-[0.95] text-[clamp(2.8rem,8.5vw,6.4rem)]"
          >
            <span style={{ color: NAVY }}>
              Artistas con
              <br />
              el rollo{" "}
            </span>
            <span style={{ color: CYAN }}>bonito</span>
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            delay={0.2}
            className="mt-4 text-lg font-medium text-[#14283C]"
          >
            Booking · Management · Sello
          </RevealOnScroll>
        </div>
      </section>

      {/* ── ROSTER asimétrico B/N ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-16 pt-8 md:pb-24">
          <StaggerGroup
            stagger={0.08}
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3"
          >
            {booking.map((a) => {
              const l = LAYOUT[a.slug] ?? { aspect: "aspect-[4/5]", shift: "" };
              return (
                <RosterCard
                  key={a.slug}
                  slug={a.slug}
                  name={a.name}
                  genre={a.genre}
                  photo={a.image ?? findAsset("artistas", a.slug)}
                  video={a.video}
                  youtubeId={a.youtubeIds?.[0]}
                  aspect={l.aspect}
                  shift={l.shift}
                />
              );
            })}
          </StaggerGroup>
          <RevealOnScroll className="mt-10 flex justify-end">
            <Link
              href="/artistas/todos"
              className="group inline-flex items-center gap-2 text-lg font-semibold"
              style={{ color: CYAN }}
            >
              Roster completo
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Divisor cian dibujado a mano ── */}
      <div className="wrap" aria-hidden>
        <svg
          className="h-5 w-full"
          viewBox="0 0 1200 20"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 12 C 120 2, 220 2, 340 11 S 560 20, 680 10 S 900 1, 1020 11 S 1160 18, 1200 9"
            stroke={CYAN}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── CATÁLOGO DE DISTRIBUCIÓN ── */}
      <section id="catalogo" style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <RevealOnScroll
              as="h2"
              className="font-round text-[clamp(2.2rem,5.5vw,3.8rem)] font-bold leading-[0.95] text-[#14283C]"
            >
              Catálogo de
              <br />
              distribución
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              delay={0.1}
              className="text-right text-lg leading-snug text-text-secondary"
            >
              ~20 artistas,
              <br />
              una distribuidora.
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            delay={0.15}
            className="font-round mt-10 text-[clamp(1.3rem,3.1vw,2.1rem)] font-semibold leading-[1.7] text-[#14283C]"
          >
            {distributionCatalog.map((n, i) => (
              <span key={n} className="whitespace-nowrap">
                {i > 0 && (
                  <span className="mx-3 font-bold" style={{ color: CYAN }}>
                    ·
                  </span>
                )}
                {n}
              </span>
            ))}
          </RevealOnScroll>

          <RevealOnScroll
            delay={0.2}
            className="mt-12 flex items-start gap-3 border-t border-subtle pt-6"
          >
            <span className="mt-0.5 text-lg font-bold" style={{ color: CYAN }}>
              *
            </span>
            <p className="max-w-2xl text-text-secondary">
              Entre ellos,{" "}
              <span className="font-medium italic" style={{ color: NAVY }}>
                Kenai White
              </span>{" "}
              — cantautor y actor salmantino con discografía propia.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
