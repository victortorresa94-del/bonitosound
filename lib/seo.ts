import type { Metadata } from "next";
import { site } from "@/lib/site";
import { serverLocale } from "@/lib/locale-server";
import { DEFAULT_LOCALE, localePath, stripLocale } from "@/lib/i18n";

/**
 * Canónica + hreflang de una página, en los dos idiomas.
 *
 * La canónica es AUTORREFERENTE: en /ca/giras apunta a /ca/giras, no a
 * /giras. Si apuntara al castellano, Google entendería que la versión
 * catalana es un duplicado y no la indexaría nunca —justo lo contrario de lo
 * que queremos con el hreflang.
 *
 * `ruta` se pasa siempre en castellano (p. ej. "/giras/albert-pla"); el
 * idioma lo pone la cabecera que escribe el middleware.
 *
 * ⚠️ Usa headers(), así que la página pasa a renderizarse por petición. Es el
 * precio de servir dos idiomas por reescritura sin duplicar el árbol de rutas.
 */
export function alternatesFor(ruta: string): NonNullable<Metadata["alternates"]> {
  const base = stripLocale(ruta) || "/";
  const es = `${site.url}${base === "/" ? "" : base}`;
  const ca = `${site.url}${localePath(base, "ca")}`;
  const locale = serverLocale();
  return {
    canonical: locale === DEFAULT_LOCALE ? es : ca,
    languages: { es, ca, "x-default": es },
  };
}
