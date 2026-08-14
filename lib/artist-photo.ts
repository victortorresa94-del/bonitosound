import { findAsset } from "./assets";
import type { Artist } from "./content";

/** La foto de la FICHA: el retrato principal del artista. */
export function fotoFicha(a: Pick<Artist, "slug" | "image">): string | null {
  return a.image ?? findAsset("artistas", a.slug);
}

/**
 * La foto de la PORTADA (el roster). Distinta de la de la ficha siempre que se
 * pueda: Dani pidió no repetir el mismo retrato en la parrilla y al entrar.
 *
 * Orden: `cover` del frontmatter → /img/artistas/<slug>-portada.* → la de la
 * ficha. O sea, mientras no haya segunda foto se comporta como antes; el día
 * que se suba una, la portada cambia sola.
 */
export function fotoPortada(a: Pick<Artist, "slug" | "image" | "cover">): string | null {
  return a.cover ?? findAsset("artistas", `${a.slug}-portada`) ?? fotoFicha(a);
}
