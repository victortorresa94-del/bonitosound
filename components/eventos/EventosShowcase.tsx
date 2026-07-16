import Image from "next/image";
import Link from "next/link";
import type { Evento } from "@/lib/content";
import { findAsset } from "@/lib/assets";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

const TYPE_LABEL: Record<Evento["type"], string> = {
  marca: "Marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
};

/** Bocadillo blanco tipo mockup, esquina sup-izq de cada foto. */
function Tag({ e }: { e: Evento }) {
  return (
    <span className="absolute left-3 top-3 z-20 inline-block rounded-2xl rounded-tl-md bg-white px-3 py-1.5 text-[0.6rem] font-bold uppercase leading-[1.15] tracking-wide shadow-sm" style={{ color: NAVY }}>
      {TYPE_LABEL[e.type]}
      <br />
      <span className="text-[0.72rem]">{e.brand ?? e.artist}</span>
    </span>
  );
}

/** Chip con el nº de bolos para esa marca (esquina inf-izq). */
function CountChip({ e }: { e: Evento }) {
  if (!e.count) return null;
  return (
    <span
      className="absolute bottom-3 left-3 z-20 inline-block rounded-full px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wide shadow-sm"
      style={{ backgroundColor: CYAN, color: NAVY }}
    >
      {e.count}
    </span>
  );
}

function CardMedia({ e }: { e: Evento }) {
  const cover = findAsset("eventos", e.slug);
  return (
    <>
      {e.video ? (
        <video src={e.video} poster={cover ?? undefined} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
      ) : cover ? (
        <Image src={cover} alt={e.title} fill sizes="40vw" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center" style={{ backgroundColor: NAVY }}>
          <span className="font-round text-3xl font-bold leading-none text-white md:text-4xl">{e.brand ?? e.artist}</span>
        </div>
      )}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />
    </>
  );
}

/** Slots del clúster (desktop): posición %, tamaño, rotación, z. */
const SLOTS = [
  { key: "big", style: { left: "34%", top: "3%", width: "27%", aspectRatio: "3/4", transform: "rotate(-2.5deg)", zIndex: 20 } },
  { key: "med1", style: { left: "64%", top: "10%", width: "27%", aspectRatio: "5/4", transform: "rotate(2deg)", zIndex: 10 } },
  { key: "med2", style: { left: "67%", top: "45%", width: "26%", aspectRatio: "5/4", transform: "rotate(-1.5deg)", zIndex: 10 } },
  { key: "wide", style: { left: "29%", top: "58%", width: "41%", aspectRatio: "16/10", transform: "rotate(1.5deg)", zIndex: 30 } },
];

export function EventosShowcase({ eventos }: { eventos: Evento[] }) {
  // Orden fijo del clúster (grande → resto). Sainte Marguerite fuera.
  const bySlug = Object.fromEntries(eventos.map((e) => [e.slug, e]));
  const clusterSlugs = ["corona", "four-roses", "chateau", "font-vella"];
  const cluster = clusterSlugs.map((s) => bySlug[s]).filter(Boolean) as Evento[];

  const stats = [
    { n: "250", l: ["Eventos", "realizados"] },
    { n: "58", l: ["Marcas", "que han confiado"] },
    { n: "53", l: ["Artistas con los que", "hemos colaborado"] },
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#FBFAF6" }}>
      {/* ============ DESKTOP: stats izq + clúster solapado der ============ */}
      <div className="relative mx-auto hidden max-w-6xl px-10 md:block" style={{ height: "760px" }}>
        {/* Stats zigzag (izquierda) */}
        <svg className="pointer-events-none absolute left-0 top-0 h-full w-[34%]" viewBox="0 0 300 760" fill="none" preserveAspectRatio="none" aria-hidden>
          <path d="M70 120 C 150 175, 120 210, 175 240 C 235 275, 250 330, 210 380 C 165 435, 120 470, 150 560" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="185" cy="150" r="7" fill="none" stroke={CYAN} strokeWidth="2.5" />
          <circle cx="150" cy="300" r="7" fill="none" stroke={CYAN} strokeWidth="2.5" />
          <circle cx="95" cy="470" r="7" fill="none" stroke={CYAN} strokeWidth="2.5" />
          <path d="M138 548 l18 18 M156 548 l-18 18" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
        </svg>
        {stats.map((s, i) => (
          <div key={s.n} className="absolute" style={{ left: i === 1 ? "13%" : "1%", top: `${8 + i * 30}%` }}>
            <p className="font-round font-bold leading-none" style={{ fontSize: i === 0 ? "6.5rem" : i === 1 ? "5.2rem" : "4rem", color: NAVY }}>{s.n}</p>
            <p className="mt-1 text-xs font-bold uppercase leading-tight tracking-wide" style={{ color: NAVY }}>
              {s.l[0]}<br />{s.l[1]}
            </p>
          </div>
        ))}

        {/* Clúster de fotos solapadas */}
        {cluster.map((e, i) => {
          const slot = SLOTS[i];
          if (!slot) return null;
          return (
            <Link key={e.slug} href={`/eventos/${e.slug}`} className="group absolute block overflow-visible" style={{ ...slot.style }}>
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] shadow-xl ring-1 ring-black/5 transition-transform duration-500 group-hover:z-40 group-hover:scale-[1.03]" style={{ aspectRatio: slot.style.aspectRatio }}>
                <CardMedia e={e} />
              </div>
              <Tag e={e} />
              <CountChip e={e} />
            </Link>
          );
        })}
      </div>

      {/* ============ MOBILE: stats en fila + cards apiladas inclinadas ============ */}
      <div className="px-5 pb-10 md:hidden">
        <div className="relative mb-8">
          {stats.map((s, i) => (
            <div key={s.n} className="mb-3" style={{ marginLeft: i === 1 ? "28%" : i === 2 ? "6%" : "0" }}>
              <p className="font-round font-bold leading-none" style={{ fontSize: i === 0 ? "3.6rem" : i === 1 ? "3rem" : "2.5rem", color: NAVY }}>{s.n}</p>
              <p className="text-[0.7rem] font-bold uppercase leading-tight tracking-wide" style={{ color: NAVY }}>{s.l[0]} {s.l[1]}</p>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {cluster.map((e, i) => (
            <Link key={e.slug} href={`/eventos/${e.slug}`} className="group relative block" style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] shadow-lg ring-1 ring-black/5">
                <CardMedia e={e} />
              </div>
              <Tag e={e} />
              <CountChip e={e} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
