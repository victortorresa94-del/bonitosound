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
 * Diseño A1 del banco de pruebas, el que eligió Víctor: TITULAR DE CARTEL a la
 * izquierda, cifras en columna a la derecha con filetes cian, y la banda de
 * logos cerrando por debajo del titular.
 *
 * El titular va en Anton (`font-poster`), ultracondensada y en mayúsculas, y no
 * en la redondeada de la casa: con Fredoka la frase se partía en cuatro líneas
 * y perdía toda la fuerza de cartel. Es el único sitio del sitio donde se usa
 * esa tipografía, y a propósito — así este bloque suena a póster de concierto y
 * no a otra sección más.
 *
 * Con ~110 logos, pintarlos todos satura: los NÚMEROS venden el volumen y la
 * banda pone la cara. El listado completo vive en /clientes.
 */
export function TrustedWall() {
  const locale = serverLocale();
  const clientes = trustedBy.filter((c) => c.id !== "proveedores");
  const total = clientes.reduce((n, c) => n + c.items.length, 0);

  // TODOS los logos que tengamos, de todas las categorías, mezclados a
  // propósito. Solo los que tienen fichero de verdad: pintar el nombre en
  // texto dentro de una fila de logos canta como un hueco. Los que faltan ya
  // se cuentan en los números, y entran solos en el marquee en cuanto se suba
  // su fichero a public/img/<categoría>/.
  //
  // Fuera los JPG: en esas carpetas no son logos sino FOTOS del evento (la
  // barra de Monkey 47, por ejemplo). A 28px de alto una foto es una mancha
  // marrón que rompe la fila — y ennegrecerla daría un tocho negro.
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
    <section aria-label={tr(locale, "Han confiado en Bonito Sound")} className="overflow-hidden">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.45fr_1fr] md:items-center md:gap-14 md:py-20 lg:gap-20">
        {/* ── Izquierda: el titular y, debajo, los logos ── */}
        <div className="min-w-0">
          <RevealOnScroll
            as="h2"
            className="font-poster text-[clamp(2.6rem,8.2vw,5.6rem)] uppercase leading-[0.88] tracking-[-0.01em]"
          >
            {/* "Han confiado", no "Empresas que han confiado": aquí hay
                ayuntamientos, asociaciones e instituciones, que no son
                empresas. */}
            <span className="block" style={{ color: NAVY }}>
              {tr(locale, "Han confiado en")}
            </span>
            <span className="block" style={{ color: CYAN }}>
              {tr(locale, "hacerlo bonito")}.
            </span>
          </RevealOnScroll>

          {/* La banda, pegada al titular como en el diseño. Se sale del .wrap
              por la izquierda con márgenes negativos para que los logos entren
              y salgan por el borde de la pantalla en vez de cortarse en seco
              contra la caja de texto. */}
          {logos.length > 0 && (
            <div className="mt-8 -ml-5 md:-ml-10 md:mt-10">
              <div className="[mask-image:linear-gradient(to_right,transparent,black_5%,black_88%,transparent)]">
                <MarqueeLogoWallClient items={logos} speed={30} mono logoClass="h-6" gap="1.1rem" minAncho="0px" />
              </div>
            </div>
          )}

          <RevealOnScroll className="mt-4 md:mt-6" delay={0.2}>
            <Link
              href={localePath("/clientes", locale)}
              className="text-sm font-bold underline-offset-4 transition-colors hover:underline"
              style={{ color: CYAN }}
            >
              {tr(locale, "Verlos todos")} ({total}) →
            </Link>
          </RevealOnScroll>
        </div>

        {/* ── Derecha: las cifras, cada una con su filete ──
            La cifra enorme y la etiqueta debajo en pequeñito, no al lado: así
            los números se leen de un vistazo en columna y las etiquetas no
            compiten con ellos. Alineadas a la derecha en escritorio para que
            cierren contra el margen. */}
        <StaggerGroup stagger={0.07} className="md:text-right">
          {clientes.map((c, i) => (
            <div
              key={c.id}
              className={i === 0 ? "pb-4" : "border-t pt-4 pb-4 last:pb-0"}
              style={i === 0 ? undefined : { borderColor: "rgba(22,182,212,0.45)" }}
            >
              <p
                className="font-poster text-[clamp(2.4rem,5.4vw,3.6rem)] leading-[0.85] tracking-tight"
                style={{ color: NAVY }}
              >
                {c.items.length}
              </p>
              <p
                className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.2em]"
                style={{ color: "rgba(20,40,60,0.55)" }}
              >
                {tr(locale, c.label)}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
