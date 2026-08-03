"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * Idioma de la página, provisto DESDE EL SERVIDOR.
 *
 * Por qué hace falta y no basta con usePathname(): el catalán se sirve por
 * reescritura (middleware.ts manda /ca/giras a /giras), así que en servidor el
 * pathname es /giras —castellano— y en cliente es /ca/giras —catalán—. Si cada
 * componente lo dedujera por su cuenta, el HTML del servidor y el del cliente
 * no coincidirían y React tiraría errores de hidratación.
 *
 * La solución es que el idioma se decida UNA vez, en el layout de servidor
 * (que lee la cabecera x-locale que pone el middleware), y de ahí baje por
 * contexto. Servidor y cliente pintan entonces exactamente lo mismo.
 */
const Ctx = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <Ctx.Provider value={locale}>{children}</Ctx.Provider>;
}

export function useLocale(): Locale {
  return useContext(Ctx);
}
