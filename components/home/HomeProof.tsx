import Image from "next/image";
import { MarqueeRow, MarqueeLogoWall } from "@/components/motion";
import { brands, distributionCatalog } from "@/lib/site";
import { findLogo } from "@/lib/assets";

/**
 * Banda de prueba social de la home. Va tras el hero.
 *
 * Fila 1: fotos B&W de nuestros artistas (marquee; a color al hacer hover).
 *   Solo se muestran los que tienen foto en public/img/artistas/. Los clientes
 *   de gira (Orozco, Maldita Nerea…) aparecerán aquí en cuanto se suban sus
 *   fotos — no se pueden descargar desde el entorno.
 * Fila 2: logos de marca en marquee inverso, atenuados.
 */
export function HomeProof() {
  const artists = distributionCatalog
    .map((name) => ({ name, photo: findLogo("artistas", name) }))
    .filter((a) => Boolean(a.photo)) as { name: string; photo: string }[];

  return (
    <section
      aria-label="Nuestros artistas y las marcas con las que trabajamos"
      className="overflow-hidden border-y border-subtle bg-bg-primary py-14 md:py-20"
    >
      <p className="eyebrow mb-8 px-6 text-center">Artistas que llevamos</p>

      <MarqueeRow speed={55} gap="1.75rem">
        {artists.map((a) => (
          <div
            key={a.name}
            className="group flex w-[128px] shrink-0 flex-col items-center gap-3"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-bg-tertiary">
              <Image
                src={a.photo}
                alt={a.name}
                fill
                sizes="128px"
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
            <span className="text-sm font-medium text-text-secondary">{a.name}</span>
          </div>
        ))}
      </MarqueeRow>

      <div className="mt-14 md:mt-16">
        <p className="eyebrow mb-6 px-6 text-center">Marcas que han sonado con nosotros</p>
        <MarqueeLogoWall items={brands} dir="marcas" speed={45} direction="right" />
      </div>
    </section>
  );
}
