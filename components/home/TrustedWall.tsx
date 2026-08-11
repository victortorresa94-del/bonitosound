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
 * "Han confiado en hacerlo bonito" — el muro de clientes del home.
 *
 * Con ~110 logos, pintarlos todos aquí satura: los NÚMEROS venden el volumen y
 * la banda de logos pone la cara. El listado completo vive en /clientes.
 *
 * SPLIT ASIMÉTRICO, no centrado: el titular manda a la izquierda, grande, y
 * las cifras bajan en columna a la derecha, cada una con su filete. La
 * versión centrada anterior se leía como un bloque de estadísticas de
 * plantilla; así el titular respira y los números se recorren como una lista.
 * La banda de logos cierra por debajo, a todo el ancho.
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
    <section aria-label={tr(locale, "Han confiado en Bonito Sound")}>
      {/* Padding asimétrico: por abajo va más corto porque debajo viene la
          banda de logos con su propio aire. Simétrico dejaba un hueco muerto
          entre el enlace y la línea. */}
      <div className="wrap grid gap-10 pb-9 pt-14 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16 md:pb-11 md:pt-20">
        <div>
          <RevealOnScroll
            as="h2"
            className="font-round text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold leading-[1.03] tracking-tight"
          >
            {/* "Han confiado", no "Empresas que han confiado": aquí hay
                ayuntamientos, asociaciones e instituciones, que no son
                empresas. */}
            <span style={{ color: NAVY }}>{tr(locale, "Han confiado en")}</span>{" "}
            <span style={{ color: CYAN }}>{tr(locale, "hacerlo bonito")}</span>
            <span style={{ color: NAVY }}>.</span>
          </RevealOnScroll>

          <RevealOnScroll className="mt-8" delay={0.18}>
            <Link
              href={localePath("/clientes", locale)}
              className="text-sm font-bold underline-offset-4 transition-colors hover:underline"
              style={{ color: CYAN }}
            >
              {tr(locale, "Verlos todos")} ({total}) →
            </Link>
          </RevealOnScroll>
        </div>

        {/* Las cifras, en columna y separadas por filetes: se recorren como una
            lista, no como una fila de estadísticas. La cifra a la izquierda y
            la etiqueta alineada a la derecha, para que los números queden
            todos a plomo aunque las etiquetas midan distinto. */}
        <StaggerGroup stagger={0.07}>
          {clientes.map((c) => (
            <div
              key={c.id}
              className="flex items-baseline justify-between gap-6 border-t py-4"
              style={{ borderColor: "rgba(20,40,60,0.14)" }}
            >
              <span
                className="font-round text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-none tracking-tight"
                style={{ color: CYAN }}
              >
                {c.items.length}
              </span>
              <span
                className="max-w-[11rem] text-right text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.16em]"
                style={{ color: "rgba(20,40,60,0.55)" }}
              >
                {tr(locale, c.label)}
              </span>
            </div>
          ))}
        </StaggerGroup>
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
