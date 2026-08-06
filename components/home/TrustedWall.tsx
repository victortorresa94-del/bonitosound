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
 * Con ~110 logos, pintarlos todos aquí satura: los NÚMEROS venden el volumen y
 * la banda de logos pone la cara. El listado completo vive en /clientes.
 *
 * Todo CENTRADO y compacto a propósito. La primera versión era un bloque
 * alineado a la izquierda con un titular a tamaño de portada, y encima la
 * banda de logos: dos pesos pesados peleándose en la misma sección. Ahora el
 * titular baja de tamaño, los números pasan a ser el elemento grande —que es
 * lo que de verdad cuenta la historia— y la banda cierra por debajo como un
 * pie, no como un segundo protagonista.
 *
 * Va sobre crema, como el resto del home.
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
      {/* Padding asimétrico: por abajo va más corto porque debajo viene la
          banda de logos con su propio aire. Simétrico dejaba un hueco muerto
          entre el enlace y la línea. */}
      <div className="wrap pb-9 pt-14 text-center md:pb-11 md:pt-20">
        <RevealOnScroll
          as="h2"
          className="display mx-auto max-w-2xl text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.15]"
        >
          <span style={{ color: NAVY }}>{tr(locale, "Empresas que han confiado en")}</span>{" "}
          <span style={{ color: CYAN }}>{tr(locale, "hacerlo bonito")}</span>
          <span style={{ color: NAVY }}>.</span>
        </RevealOnScroll>

        {/* Los números SON la pieza grande de la sección: cuentan el volumen
            sin pintar 110 logos. Rejilla de 2 en móvil y 4 en escritorio para
            que las cifras queden alineadas en columna, no desparramadas por
            una fila flexible con anchos distintos. */}
        <StaggerGroup
          stagger={0.07}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-9 md:mt-12 md:grid-cols-4 md:gap-x-4"
        >
          {clientes.map((c) => (
            <div key={c.id}>
              <p
                className="font-round text-[clamp(2.6rem,6vw,3.8rem)] font-bold leading-none tracking-tight"
                style={{ color: CYAN }}
              >
                {c.items.length}
              </p>
              <p
                className="mx-auto mt-2 max-w-[9rem] text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.16em]"
                style={{ color: "rgba(20,40,60,0.5)" }}
              >
                {tr(locale, c.label)}
              </p>
            </div>
          ))}
        </StaggerGroup>

        <RevealOnScroll className="mt-11" delay={0.18}>
          <Link
            href={localePath("/clientes", locale)}
            className="text-sm font-bold underline-offset-4 transition-colors hover:underline"
            style={{ color: CYAN }}
          >
            {tr(locale, "Verlos todos")} ({total}) →
          </Link>
        </RevealOnScroll>
      </div>

      {/* La banda cierra la sección, a todo el ancho (fuera del .wrap): los
          logos entran y salen por los bordes de la pantalla. Va más baja y con
          los logos más pequeños que la primera versión para que lea como un
          pie de sección y no como un segundo bloque. Máscara a los lados para
          que aparezcan y desaparezcan en vez de cortarse en seco. */}
      {logos.length > 0 && (
        <div className="overflow-hidden border-t border-subtle py-6 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] md:py-7">
          <MarqueeLogoWallClient items={logos} speed={32} mono logoClass="h-6" />
        </div>
      )}
    </section>
  );
}
