import Image from "next/image";
import { MarqueeRow, MarqueeLogoWall } from "@/components/motion";
import { brands, distributionCatalog } from "@/lib/site";
import { findLogo } from "@/lib/assets";

const FADE_MASK =
  "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]";

/**
 * Interludio entre escenas: fotos de nuestros artistas en marquee (B&W,
 * a color al hover). Va justo después de la escena "giras" — prueba social
 * en el punto exacto donde el visitante ya sabe qué hacemos con directo.
 * Solo entran los que tienen foto real; los clientes de gira (Orozco,
 * Maldita Nerea…) entran en cuanto suban su foto.
 */
export function ArtistsBand() {
  const artists = distributionCatalog
    .map((name) => ({ name, photo: findLogo("artistas", name) }))
    .filter((a) => Boolean(a.photo)) as { name: string; photo: string }[];

  if (artists.length === 0) return null;

  // Repetimos hasta densificar la fila: con pocas fotos reales el marquee
  // quedaba corto y dejaba hueco. Da igual que se repitan las caras — el
  // objetivo es que la banda siempre se vea llena y en bucle continuo.
  const MIN_ITEMS = 36;
  const times = Math.max(3, Math.ceil(MIN_ITEMS / artists.length));
  const filled = Array.from({ length: times }, () => artists).flat();

  return (
    <section
      aria-label="Artistas que llevamos"
      className="overflow-hidden border-t border-subtle py-16 md:py-20"
    >
      <p className="eyebrow mb-10 px-6 text-center">Artistas que llevamos</p>
      <MarqueeRow speed={50} gap="2.25rem" className={FADE_MASK}>
        {filled.map((a, i) => (
          <div
            key={`${a.name}-${i}`}
            className="group flex w-[136px] shrink-0 flex-col items-center gap-3"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-bg-tertiary">
              <Image
                src={a.photo}
                alt={a.name}
                fill
                loading="eager"
                sizes="136px"
                className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
            </div>
            <span className="text-xs font-medium tracking-wide text-text-muted transition-colors group-hover:text-text-secondary">
              {a.name}
            </span>
          </div>
        ))}
      </MarqueeRow>
    </section>
  );
}

/**
 * Interludio entre escenas: logos de marca en marquee. Va justo después de
 * la escena "marcas" — prueba social inmediata sobre lo que se acaba de leer.
 */
export function BrandsBand() {
  return (
    <section
      aria-label="Marcas que han sonado con nosotros"
      className="overflow-hidden border-t border-subtle py-16 md:py-20"
    >
      <p className="eyebrow mb-10 px-6 text-center">Marcas que han sonado con nosotros</p>
      <MarqueeLogoWall items={brands} dir="marcas" speed={42} direction="right" />
    </section>
  );
}
