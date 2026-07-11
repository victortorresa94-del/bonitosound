import { MarqueeRow, MarqueeLogoWall } from "@/components/motion";
import { brands, tourArtists } from "@/lib/site";

/**
 * Banda de prueba social de la home. Va tras el hero: nombres y marcas reales
 * generan confianza antes de leer nada (prueba social, Cialdini).
 *
 * Diseño: sin caja de color, a sangre sobre el fondo del sitio, con reglas
 * de un pelo arriba/abajo. Los nombres top van GRANDES y en movimiento
 * (marquee) — es el tratamiento premium cuando aún no hay logos de cada
 * artista. Los logos de marca van en marquee inverso, atenuados y uniformes.
 * Cuando lleguen los logos de artista (scrape local), se cambian nombres→logos.
 */
export function HomeProof() {
  return (
    <section
      aria-label="Artistas y marcas con las que hemos trabajado"
      className="overflow-hidden border-y border-subtle bg-bg-primary py-14 md:py-20"
    >
      <p className="eyebrow mb-8 px-6 text-center">En directo · nombres que hemos llevado</p>

      {/* Nombres grandes en marquee. */}
      <MarqueeRow speed={70} gap="0px">
        {tourArtists.map((name) => (
          <div key={name} className="flex items-center whitespace-nowrap">
            <span className="font-display text-4xl leading-none text-text-primary md:text-6xl">
              {name}
            </span>
            <span
              aria-hidden
              className="mx-8 inline-block h-2.5 w-2.5 rounded-full bg-accent-cyan md:mx-12"
            />
          </div>
        ))}
      </MarqueeRow>

      {/* Logos de marca en marquee inverso, atenuados. */}
      <div className="mt-12 md:mt-16">
        <p className="eyebrow mb-6 px-6 text-center">Marcas que han sonado con nosotros</p>
        <MarqueeLogoWall items={brands} dir="marcas" speed={45} direction="right" />
      </div>
    </section>
  );
}
