import Link from "next/link";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { MarqueeLogoWallClient } from "@/components/motion/MarqueeLogoWallClient";
import { resolveLogos } from "@/lib/assets";
import { trustedBy } from "@/lib/site";
import { serverLocale } from "@/lib/locale-server";
import { localePath } from "@/lib/i18n";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * "Empresas que han confiado en hacerlo bonito" — el muro de clientes del home.
 *
 * Con ~110 logos, pintarlos todos aquí satura. La solución: los NÚMEROS venden
 * el volumen y una selección de los reconocibles pone la cara. El listado
 * completo vive en /clientes.
 *
 * Va sobre crema, como el resto del home: era la única banda oscura que
 * quedaba y cortaba el recorrido en seco.
 *
 * Los logos van en MARQUEE, como la banda de artistas, y en negro plano: son
 * logos de mil sitios distintos y a color la fila parecía una feria. En
 * silueta se lee como un muro y no compite con el titular.
 */
export function TrustedWall() {
  const locale = serverLocale();
  const clientes = trustedBy.filter((c) => c.id !== "proveedores");
  const total = clientes.reduce((n, c) => n + c.items.length, 0);

  // TODOS los logos que tengamos, de todas las categorías, mezclados a
  // propósito. Solo los que tienen fichero de verdad: pintar el nombre en
  // texto dentro de una fila de logos canta como un hueco. Los que faltan ya
  // se cuentan en los números de arriba, y entran solos en el marquee en
  // cuanto se suba su fichero a public/img/<categoría>/.
  //
  // Fuera los JPG: en esas carpetas no son logos sino FOTOS del evento
  // (la barra de Monkey 47, por ejemplo). A 28px de alto una foto es una
  // mancha marrón que rompe la fila — y ennegrecerla daría un tocho negro.
  // Entran solas el día que se suba su logo de verdad en PNG/SVG.
  //
  // La key del marquee es el nombre, así que un duplicado entre categorías
  // rompería React: de-duplicamos por nombre antes de pasarlo.
  const vistos = new Set<string>();
  const logos = clientes
    .flatMap((c) => resolveLogos(c.dir, c.items))
    .filter((l) => {
      if (!l.src || l.isPhoto || vistos.has(l.name)) return false;
      vistos.add(l.name);
      return true;
    });

  if (total === 0) return null;

  return (
    <section aria-label={tr(locale, "Empresas que han confiado en Bonito Sound")}>
      <div className="wrap py-16 md:py-24">
        <RevealOnScroll as="p" className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]">
          <span style={{ color: CYAN }}>{tr(locale, "Confían en nosotros")}</span>
        </RevealOnScroll>
        <RevealOnScroll
          as="h2"
          delay={0.05}
          className="display max-w-3xl text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05]"
        >
          <span style={{ color: NAVY }}>{tr(locale, "Empresas que han confiado en")}</span>{" "}
          <span style={{ color: CYAN }}>{tr(locale, "hacerlo bonito")}</span>
          <span style={{ color: NAVY }}>.</span>
        </RevealOnScroll>

        {/* Los números primero: cuentan el volumen sin pintar 110 logos. */}
        <StaggerGroup
          stagger={0.08}
          className="mt-10 flex flex-wrap gap-x-12 gap-y-6 md:mt-12"
        >
          {clientes.map((c) => (
            <div key={c.id}>
              <p className="font-round text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-none" style={{ color: CYAN }}>
                {c.items.length}
              </p>
              <p
                className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
                style={{ color: "rgba(20,40,60,0.55)" }}
              >
                {tr(locale, c.label)}
              </p>
            </div>
          ))}
        </StaggerGroup>

        <RevealOnScroll className="mt-10" delay={0.2}>
          <Link
            href={localePath("/clientes", locale)}
            className="text-sm font-bold underline-offset-4 transition-colors hover:underline"
            style={{ color: CYAN }}
          >
            {tr(locale, "Verlos todos")} ({total}) →
          </Link>
        </RevealOnScroll>
      </div>

      {/* La banda en movimiento, a TODO el ancho (fuera del .wrap): los logos
          entran y salen por los bordes de la pantalla, como la de artistas.
          Todos los que tengamos fichero, de todas las categorías mezcladas
          — marca, festival, ayuntamiento, asociación — para que se vea la
          variedad sin leer una lista. En NEGRO plano: vienen de mil sitios
          con mil colores y a color esto parecía una feria; en silueta es un
          muro. Los que aún no tienen logo no se pintan (se cuentan arriba). */}
      {logos.length > 0 && (
        <div className="overflow-hidden border-y border-subtle py-8 md:py-10">
          <MarqueeLogoWallClient items={logos} speed={38} mono />
        </div>
      )}
    </section>
  );
}
