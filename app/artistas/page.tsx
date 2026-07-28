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

/**
 * Los 6 del roster (decisión de Dani, reunión 23/07): los que queremos que se
 * contraten. Cuatro de booking y dos de producción de giras.
 *
 * Alfred García y Albert Pla NO tienen ficha de artista: no están en el roster
 * de Bonito, les producimos las giras. Por eso su tarjeta lleva a su página de
 * gira y sus datos van aquí, no en /content/artistas.
 *
 * Fuera de esta parrilla: Eva Calyza y Fabián (ya no están en booking ni
 * management) y Pablo Rojo. Siguen en el roster completo y en distribución.
 */
type RosterEntry = {
  slug: string;
  relation: string;
  aspect: string;
  shift: string;
  /** Solo para los que no tienen ficha (Alfred, Albert). */
  external?: { name: string; genre: string; href: string; photoDir: string };
};

const ROSTER: RosterEntry[] = [
  { slug: "dulze", relation: "Management · Records · Booking", aspect: "aspect-[4/5]", shift: "" },
  { slug: "natura", relation: "Management · Records · Booking", aspect: "aspect-[3/4]", shift: "md:mt-16" },
  {
    slug: "alfred-garcia",
    relation: "Producción de giras",
    aspect: "aspect-[4/5]",
    shift: "md:-mt-2",
    external: {
      name: "Alfred García",
      genre: "Producción y dirección de gira",
      href: "/giras/alfred-garcia-1016",
      photoDir: "artistas-dani",
    },
  },
  { slug: "paule", relation: "Booking", aspect: "aspect-[4/5]", shift: "" },
  { slug: "sa-pena", relation: "Records · Booking", aspect: "aspect-[5/4]", shift: "md:mt-16" },
  {
    slug: "albert-pla",
    relation: "Producción técnica de giras",
    aspect: "aspect-[4/5]",
    shift: "md:-mt-2",
    external: {
      name: "Albert Pla",
      genre: "Producción técnica y logística",
      href: "/giras/albert-pla-rumbagenarios",
      photoDir: "artistas-dani",
    },
  },
];

export default function Artistas() {
  const all = getArtists();
  // Parrilla curada del mockup (por slug, no por tier): estos 6 son el roster
  // de /artistas —Dulze incluida—, cada uno con su layout asimétrico. El `tier`
  // sigue mandando en /artistas/todos y en la ficha; aquí la selección es fija
  // para que la cuadrícula quede como el diseño, sin huecos por foto que falte.
  const bySlug = new Map(all.map((a) => [a.slug, a] as const));
  // Cada entrada se resuelve contra su ficha; las externas (Alfred, Albert)
  // traen sus propios datos y apuntan a su página de gira.
  const roster = ROSTER.map((r) => {
    if (r.external) {
      return {
        ...r,
        name: r.external.name,
        genre: r.external.genre,
        href: r.external.href,
        photo: findAsset(r.external.photoDir, r.slug),
      };
    }
    const a = bySlug.get(r.slug);
    if (!a) return null;
    return {
      ...r,
      name: a.name,
      genre: a.genre,
      href: undefined,
      photo: a.image ?? findAsset("artistas", a.slug),
    };
  }).filter((r): r is NonNullable<typeof r> => Boolean(r));

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
            {roster.map((a) => (
              <RosterCard
                key={a.slug}
                slug={a.slug}
                name={a.name}
                genre={a.genre}
                photo={a.photo}
                href={a.href}
                relation={a.relation}
                // Hover-vídeo desactivado a propósito: no tenemos vídeos por
                // artista bien alojados aún. Se reactiva pasando `video={a.video}`
                // cuando los haya. Mientras, la tarjeta se queda con la foto.
                aspect={a.aspect}
                shift={a.shift}
              />
            ))}
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

          {/* Nombres en bloque que fluye a varias líneas (como el mockup): cada
              nombre es una unidad que no se parte, y el flex-wrap corta ENTRE
              nombres. Antes iba todo en una sola línea porque los <span> nowrap
              adyacentes no dejaban punto de corte. */}
          <RevealOnScroll
            delay={0.15}
            className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-3 font-round text-[clamp(1.3rem,3.1vw,2.1rem)] font-semibold leading-tight text-[#14283C]"
          >
            {distributionCatalog.map((n, i) => (
              <span key={n} className="whitespace-nowrap">
                {n}
                {i < distributionCatalog.length - 1 && (
                  <span className="ml-4 font-bold" style={{ color: CYAN }}>
                    ·
                  </span>
                )}
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
