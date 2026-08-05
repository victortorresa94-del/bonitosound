import Image from "next/image";
import Link from "next/link";
import { MarqueeRow, MarqueeLogoWall } from "@/components/motion";
import { brands, distributionCatalog } from "@/lib/site";
import { findLogo } from "@/lib/assets";
import { serverLocale } from "@/lib/locale-server";
import { localePath } from "@/lib/i18n";
import { tr } from "@/lib/copy-ca";

const FADE_MASK =
  "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]";

/**
 * Artistas de gira que NO están en el catálogo de distribución: son clientes
 * de producción, no del sello. Su foto vive en /img/artistas-dani/ y su ficha
 * es la página de la gira, no un perfil de roster — igual que en /artistas.
 */
const GIRA = [
  { name: "Alfred García", dir: "artistas-dani", href: "/giras/alfred-garcia-1016" },
  { name: "Albert Pla", dir: "artistas-dani", href: "/giras/albert-pla-rumbagenarios" },
] as const;

/**
 * Interludio entre escenas: fotos de nuestros artistas en marquee (B&W,
 * a color al hover). Va justo después de la escena "giras" — prueba social
 * en el punto exacto donde el visitante ya sabe qué hacemos con directo.
 * Solo entran los que tienen foto real; los clientes de gira (Orozco,
 * Maldita Nerea…) entran en cuanto suban su foto.
 */
export function ArtistsBand() {
  const locale = serverLocale();
  const catalogo = distributionCatalog
    .map((name) => ({ name, photo: findLogo("artistas", name), href: undefined as string | undefined }))
    .filter((a) => Boolean(a.photo));
  // Alfred y Albert abren la fila: son los nombres que más pesan y los que
  // justifican la escena de giras que se acaba de leer.
  const gira = GIRA
    .map((g) => ({ name: g.name, photo: findLogo(g.dir, g.name), href: g.href as string | undefined }))
    .filter((a) => Boolean(a.photo));
  const artists = [...gira, ...catalogo] as { name: string; photo: string; href?: string }[];

  if (artists.length === 0) return null;

  // Repetimos hasta densificar la fila: con pocas fotos reales el marquee
  // quedaba corto y dejaba hueco. Da igual que se repitan las caras — el
  // objetivo es que la banda siempre se vea llena y en bucle continuo.
  const MIN_ITEMS = 36;
  const times = Math.max(3, Math.ceil(MIN_ITEMS / artists.length));
  const filled = Array.from({ length: times }, () => artists).flat();

  return (
    <section
      aria-label={tr(locale, "Artistas con los que trabajamos")}
      className="overflow-hidden border-t border-subtle py-16 md:py-20"
    >
      <p className="eyebrow mb-10 px-6 text-center">{tr(locale, "Artistas con los que trabajamos")}</p>
      <MarqueeRow speed={50} gap="2.25rem" className={FADE_MASK}>
        {filled.map((a, i) => {
          // Los de gira llevan a su página; los del catálogo aún no tienen
          // ficha propia, así que se quedan como tarjeta muda.
          const Tag = (a.href ? Link : "div") as React.ElementType;
          return (
            <Tag
              key={`${a.name}-${i}`}
              {...(a.href ? { href: localePath(a.href, locale) } : {})}
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
            </Tag>
          );
        })}
      </MarqueeRow>
    </section>
  );
}

/**
 * Interludio entre escenas: logos de marca en marquee. Va justo después de
 * la escena "marcas" — prueba social inmediata sobre lo que se acaba de leer.
 */
export function BrandsBand() {
  const locale = serverLocale();
  return (
    <section
      aria-label={tr(locale, "Marcas que han sonado con nosotros")}
      className="overflow-hidden border-t border-subtle py-16 md:py-20"
    >
      <p className="eyebrow mb-10 px-6 text-center">{tr(locale, "Marcas que han sonado con nosotros")}</p>
      <MarqueeLogoWall items={brands} dir="marcas" speed={42} direction="right" />
    </section>
  );
}
