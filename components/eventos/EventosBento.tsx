import type { Evento } from "@/lib/content";
import { findAsset, findLogo } from "@/lib/assets";
import { EventosBentoTabs, type BentoCardData, type Role } from "./EventosBentoTabs";

const TYPE_LABEL: Record<Evento["type"], string> = {
  marca: "Marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
};

/**
 * Forma de celda por vídeo, decidida a partir de un análisis visual real
 * (fotogramas recortados a varios ratios), no de la orientación en bruto del
 * archivo: un vídeo vertical no implica una celda alta si su encuadre ya
 * funciona bien en ancho (ver "corona"/"font-vella"). Solo 2 van a celda alta
 * ("tall"), como acento de disrupción — el resto, formatos "normales"
 * (rectangulares, estilo YouTube) que es lo que mejor les sienta.
 *
 * `four-roses`: el propio plano tiene el andamio + cielo en la mitad superior
 * durante buena parte del clip, en CUALQUIER ratio de recorte — no es un
 * problema de forma de celda. Se corrige sesgando el object-position hacia
 * abajo para priorizar las rosas.
 */
const ROLE_MAP: Record<string, { role: Role; objectPosition?: string }> = {
  // Marca
  corona: { role: "hero" },
  schweppes: { role: "hero" },
  "font-vella": { role: "wide" },
  pepsi: { role: "wide" },
  chateau: { role: "regular" },
  "four-roses": { role: "regular", objectPosition: "center 85%" },
  "tequila-codigo": { role: "regular" },
  // Artista / gira
  natura: { role: "tall" },
  "anne-lukin": { role: "tall" },
  "albert-pla": { role: "regular" },
  "dani-directo": { role: "regular" },
  cris: { role: "regular" },
};
/** Slugs sin vídeo (solo cover): ciclan por formatos ya validados visualmente. */
const FALLBACK_ROLES: Role[] = ["regular", "wide", "regular"];
const ROTATE = ["", "sm:rotate-[-1.4deg]", "", "sm:rotate-[1.2deg]", "", "sm:rotate-[-1deg]"];

function resolveCard(e: Evento, fallbackIndex: number): BentoCardData {
  const cover = findAsset("eventos", e.slug);
  const label = e.brand ?? e.artist ?? TYPE_LABEL[e.type];
  const logo = e.brand ? findLogo("marcas", e.brand) : null;
  const mapped = ROLE_MAP[e.slug];
  const role: Role = mapped?.role ?? FALLBACK_ROLES[fallbackIndex % FALLBACK_ROLES.length];

  return {
    slug: e.slug,
    href: `/eventos/${e.slug}`,
    typeLabel: TYPE_LABEL[e.type],
    label,
    cover: cover ?? null,
    logo: logo ?? null,
    video: e.video ?? null,
    role,
    objectPosition: mapped?.objectPosition,
    rot: ROTATE[fallbackIndex % ROTATE.length],
  };
}

export function EventosBento({ eventos }: { eventos: Evento[] }) {
  // Solo eventos con media real (vídeo/foto). Los demás quedan ocultos hasta
  // que caiga su clip: mismo sistema drop-in, nada de cajas vacías.
  const withVideo = eventos.filter((e) => e.video);
  const withCover = eventos.filter((e) => !e.video && findAsset("eventos", e.slug));
  const ordered = [...withVideo, ...withCover];

  let fallbackI = 0;
  const cards = ordered.map((e) => {
    const known = Boolean(ROLE_MAP[e.slug]);
    const card = resolveCard(e, fallbackI);
    if (!known) fallbackI += 1;
    return card;
  });

  const marcas = cards.filter((c, i) => ordered[i].type === "marca");
  const artistas = cards.filter((c, i) => ordered[i].type !== "marca");

  if (cards.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-24">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#16b6d4" }}>
          Más eventos en vídeo
        </p>
        <h2 className="mb-8 font-round text-3xl font-bold md:text-5xl" style={{ color: "#14283C" }}>
          Míralo, no te lo contamos.
        </h2>
        <EventosBentoTabs marcas={marcas} artistas={artistas} />
      </div>
    </section>
  );
}
