import { headers } from "next/headers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * Idioma de la petición en componentes de SERVIDOR.
 *
 * El catalán se sirve por reescritura (middleware.ts manda /ca/giras a /giras),
 * así que el pathname ya no dice el idioma: lo dice la cabecera x-locale que
 * pone el middleware. En cliente el equivalente es useLocale().
 */
export function serverLocale(): Locale {
  return headers().get("x-locale") === "ca" ? "ca" : DEFAULT_LOCALE;
}
