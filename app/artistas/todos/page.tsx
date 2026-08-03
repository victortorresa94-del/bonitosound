import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { distributionCatalog, site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";
import { localePath } from "@/lib/i18n";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function generateMetadata(): Metadata {
  return {
  title: "Roster completo — todos los artistas de Bonito Sound",
  description:
    "Todo el roster de Bonito Sound organizado: artistas de booking, management y sello, y el catálogo de distribución y editorial. Fotos, géneros y ficha de cada uno.",
  alternates: alternatesFor(`/artistas/todos`),
  };
}

// Enlaces a "cada cosa de nuestros servicios" — para bajar al detalle.
const SERVICE_LINKS = [
  { label: "Booking", href: "/booking" },
  { label: "Management", href: "/management" },
  { label: "Sello", href: "/records/sello" },
  { label: "Editorial", href: "/records/editorial" },
  { label: "Distribución", href: "/records/distribucion" },
  { label: "Marketing", href: "/records/marketing" },
  { label: "Producciones", href: "/records/producciones" },
];

const BOOKING_ORDER = ["dulze", "eva-calyza", "natura", "pablo-rojo", "paule", "sa-pena"];

function ArtistCard({
  slug,
  name,
  genre,
  photo,
  services,
}: {
  slug: string;
  name: string;
  genre: string;
  photo: string | null;
  services?: string[];
}) {
  return (
    <Link href={localePath(`/artistas/${slug}`, serverLocale())} className="group block" data-cursor="link">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
        {photo ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center">
            <span className="font-round text-xl font-bold" style={{ color: NAVY }}>
              {name}
            </span>
          </div>
        )}
        <span
          className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ backgroundColor: CYAN, color: NAVY }}
          aria-hidden
        >
          →
        </span>
      </div>
      <div className="mt-3">
        <span className="font-round text-xl font-bold" style={{ color: NAVY }}>
          {name}
        </span>
        <p className="text-sm text-text-muted">{genre}</p>
        {services && services.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {services.map((s) => (
              <span
                key={s}
                className="rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
                style={{ borderColor: "rgba(20,40,60,0.2)", color: NAVY }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function GroupHeader({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <RevealOnScroll as="p" className="eyebrow mb-3">
          {eyebrow}
        </RevealOnScroll>
        <RevealOnScroll
          as="h2"
          className="display text-[#14283C] text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[0.98]"
        >
          {title}
        </RevealOnScroll>
      </div>
      {note && (
        <RevealOnScroll as="p" delay={0.1} className="text-sm text-text-muted">
          {note}
        </RevealOnScroll>
      )}
    </div>
  );
}

export default function RosterCompleto() {
  const locale = serverLocale();
  const all = getArtists();

  const booking = all
    .filter((a) => a.tier === "booking")
    .sort((a, b) => BOOKING_ORDER.indexOf(a.slug) - BOOKING_ORDER.indexOf(b.slug))
    .map((a) => ({ ...a, photo: a.image ?? findAsset("artistas", a.slug) }));

  const distribucion = all
    .filter((a) => a.tier === "distribucion")
    .map((a) => ({ ...a, photo: a.image ?? findAsset("artistas", a.slug) }));

  // Nombre → slug de los que tienen ficha, para linkar el catálogo cuando existe.
  const slugForName = (name: string) =>
    all.find((a) => a.name.toLowerCase() === name.toLowerCase())?.slug;

  // Catálogo completo (site.ts) sin duplicar los que ya salen con foto arriba.
  const conFicha = new Set(distribucion.map((a) => a.name.toLowerCase()));
  const catalogoResto = distributionCatalog.filter(
    (n) => !conFicha.has(n.toLowerCase()),
  );

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-8 pt-20 md:pt-28">
          <RevealOnScroll as="p" className="eyebrow mb-4">
            {tr(locale, "Roster completo")}
          </RevealOnScroll>
          <RevealOnScroll
            as="h1"
            delay={0.05}
            className="display leading-[0.95] text-[clamp(2.6rem,8vw,5.6rem)]"
          >
            <span style={{ color: NAVY }}>{tr(locale, "Todos los que ")}</span>
            <span style={{ color: CYAN }}>{tr(locale, "llevamos")}</span>
            <span style={{ color: NAVY }}>.</span>
          </RevealOnScroll>
          <RevealOnScroll
            as="p"
            delay={0.12}
            className="mt-5 max-w-2xl text-lg text-text-secondary"
          >
            {tr(locale, "El roster propio —booking, management y sello— y el catálogo que distribuimos y editamos.")}{" "}
            {all.length} {tr(locale, "artistas, cada uno con su ficha.")}
          </RevealOnScroll>

          {/* Navegación a cada servicio */}
          <RevealOnScroll delay={0.18} className="mt-8 flex flex-wrap gap-2">
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={localePath(s.href, locale)}
                className="rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/[0.03]"
                style={{ borderColor: "rgba(20,40,60,0.2)", color: NAVY }}
              >
                {tr(locale, s.label)}
              </Link>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ── BOOKING · MANAGEMENT · SELLO ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap py-14 md:py-20">
          <GroupHeader
            eyebrow={tr(locale, "Booking · Management · Sello")}
            title={tr(locale, "El roster propio")}
            note={`${booking.length} ${tr(locale, "artistas que llevamos de la mano")}`}
          />
          <StaggerGroup
            stagger={0.06}
            className="grid grid-cols-2 gap-6 sm:grid-cols-3"
          >
            {booking.map((a) => (
              <ArtistCard
                key={a.slug}
                slug={a.slug}
                name={a.name}
                genre={a.genre}
                photo={a.photo}
                services={a.services}
              />
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Divisor cian dibujado a mano ── */}
      <div className="wrap" aria-hidden>
        <svg className="h-5 w-full" viewBox="0 0 1200 20" fill="none" preserveAspectRatio="none">
          <path
            d="M0 12 C 120 2, 220 2, 340 11 S 560 20, 680 10 S 900 1, 1020 11 S 1160 18, 1200 9"
            stroke={CYAN}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── DISTRIBUCIÓN & EDITORIAL ── */}
      <section id="distribucion" style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap py-14 md:py-20">
          <GroupHeader
            eyebrow={tr(locale, "Distribución · Editorial")}
            title={tr(locale, "El catálogo")}
            note={tr(locale, "~20 artistas, una distribuidora")}
          />

          {distribucion.length > 0 && (
            <StaggerGroup
              stagger={0.05}
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
            >
              {distribucion.map((a) => (
                <ArtistCard
                  key={a.slug}
                  slug={a.slug}
                  name={a.name}
                  genre={a.genre}
                  photo={a.photo}
                  services={a.services}
                />
              ))}
            </StaggerGroup>
          )}

          {/* Resto del catálogo sin ficha aún: nombres (linkados si hay ficha). */}
          {catalogoResto.length > 0 && (
            <div className="mt-12 border-t border-subtle pt-8">
              <RevealOnScroll className="flex flex-wrap items-baseline gap-x-4 gap-y-3 font-round text-[#14283C] text-[clamp(1.2rem,2.8vw,1.9rem)] font-semibold leading-tight">
                {catalogoResto.map((n, i) => {
                  const slug = slugForName(n);
                  return (
                    <span key={n} className="whitespace-nowrap">
                      {slug ? (
                        <Link href={localePath(`/artistas/${slug}`, locale)} className="transition-opacity hover:opacity-70">
                          {n}
                        </Link>
                      ) : (
                        n
                      )}
                      {i < catalogoResto.length - 1 && (
                        <span className="ml-4 font-bold" style={{ color: CYAN }}>
                          ·
                        </span>
                      )}
                    </span>
                  );
                })}
              </RevealOnScroll>
            </div>
          )}
        </div>
      </section>

      {/* ── volver ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-24">
          <Link
            href={localePath("/artistas", locale)}
            className="text-sm font-semibold text-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            {tr(locale, "← Volver a Artistas")}
          </Link>
        </div>
      </section>
    </>
  );
}
