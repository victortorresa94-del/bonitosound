import { RevealOnScroll } from "@/components/motion";
import { MarqueeLogoWallClient } from "@/components/motion/MarqueeLogoWallClient";
import { resolveLogos } from "@/lib/assets";
import { memberships, support, supportPending } from "@/lib/site";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

/**
 * Franja institucional del home: de qué somos miembros y quién nos apoya.
 * Discreta pero presente — aporta el prestigio que no se compra.
 *
 * Va entre la escena de tecnología y la del festival: cierra el bloque de
 * "esto es lo que hacemos" con quién nos avala, antes de pasar al festival.
 *
 * Sobre CREMA, como el resto del home, y en MOVIMIENTO como el resto de
 * bandas de logos del sitio. Los logos van en negro plano (`mono`): vienen
 * de mil sitios con mil fondos y en silueta quedan como un sello grabado,
 * presentes sin gritar. Solo se pintan los que tienen archivo — el resto
 * entra solo en cuanto se suba a public/img/.
 */

/**
 * Repite la lista hasta llenar la fila. Con 4-5 logos el marquee se quedaba
 * corto y dejaba un hueco enorme antes de volver a empezar; duplicando da
 * igual que se repitan — lo que importa es que la banda se vea continua.
 * Mismo truco que la banda de artistas (HomeProof.tsx).
 */
function llenar<T>(items: T[], minimo = 14): T[] {
  if (items.length === 0) return items;
  const veces = Math.max(2, Math.ceil(minimo / items.length));
  return Array.from({ length: veces }, () => items).flat();
}

function Grupo({
  etiqueta,
  logos,
  direction,
}: {
  etiqueta: string;
  logos: { name: string; src: string | null; aguantaSilueta: boolean }[];
  direction: "left" | "right";
}) {
  // La key del marquee es el nombre y aquí repetimos la lista, así que el
  // nombre se hace único con el índice.
  const items = llenar(logos).map((l, i) => ({ ...l, name: `${l.name}·${i}` }));
  return (
    // w-full explícito: el contenedor de arriba es `items-center` (no stretch),
    // así que sin esto el grupo se dimensiona al CONTENIDO — y el contenido es
    // un marquee de varios miles de px, que se llevaba por delante el ancho de
    // la página en móvil.
    <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-3 md:flex-row md:gap-5">
      <span
        className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
        style={{ color: "rgba(20,40,60,0.45)" }}
      >
        {etiqueta}
      </span>
      <div className="w-full min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <MarqueeLogoWallClient items={items} speed={26} direction={direction} mono />
      </div>
    </div>
  );
}

export function InstitutionalStrip() {
  const locale = serverLocale();
  const members = resolveLogos("instituciones", memberships).filter((l) => l.src);
  const apoyos = resolveLogos("apoyos", [...support, ...supportPending]).filter(
    (l) => l.src,
  );
  if (members.length === 0 && apoyos.length === 0) return null;

  return (
    <section
      aria-label={tr(locale, "Miembros y apoyos institucionales")}
      className="border-y border-subtle"
    >
      <RevealOnScroll className="wrap flex flex-col items-center gap-7 py-10 md:flex-row md:gap-10 md:py-11">
        {members.length > 0 && (
          <Grupo etiqueta={tr(locale, "Miembros de")} logos={members} direction="left" />
        )}

        {members.length > 0 && apoyos.length > 0 && (
          <span aria-hidden className="hidden h-8 w-px shrink-0 bg-[rgba(20,40,60,0.12)] md:block" />
        )}

        {apoyos.length > 0 && (
          // En sentido contrario al de al lado: dos filas moviéndose igual
          // se leen como una sola banda; en espejo se distinguen los grupos.
          <Grupo etiqueta={tr(locale, "Con el apoyo de")} logos={apoyos} direction="right" />
        )}
      </RevealOnScroll>
    </section>
  );
}
