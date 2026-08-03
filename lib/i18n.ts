/**
 * Sistema de idiomas de la web: castellano (por defecto) y catalán.
 *
 * Cómo funciona:
 *  - Las rutas en castellano se quedan como estaban: /giras, /artistas…
 *    (no se rompe ningún enlace ni posicionamiento ya ganado).
 *  - El catalán vive bajo /ca: /ca/giras, /ca/artistes…
 *  - `getLocale(pathname)` deduce el idioma de la URL y `localePath()` construye
 *    enlaces respetando el idioma actual.
 *
 * El diccionario está partido por zonas para que sea legible y para poder
 * traducir por bloques sin tocar una única lista gigante.
 */

export const LOCALES = ["es", "ca"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Deduce el idioma a partir del pathname. /ca o /ca/... → catalán. */
export function getLocale(pathname: string): Locale {
  return pathname === "/ca" || pathname.startsWith("/ca/") ? "ca" : "es";
}

/**
 * Construye una ruta en el idioma dado. Las rutas se guardan siempre en su
 * forma castellana (/giras) y aquí se les antepone /ca cuando toca; así solo
 * hay una fuente de verdad para los enlaces.
 */
export function localePath(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return href;
  if (!href.startsWith("/")) return href;          // externos, mailto, tel…
  if (href.startsWith("/ca")) return href;         // ya localizada
  return href === "/" ? "/ca" : `/ca${href}`;
}

/** Quita el prefijo de idioma: /ca/giras → /giras. Útil para el selector. */
export function stripLocale(pathname: string): string {
  if (pathname === "/ca") return "/";
  return pathname.startsWith("/ca/") ? pathname.slice(3) : pathname;
}

type Dict = Record<string, string>;

/**
 * Textos de la interfaz compartida (navegación, pie, botones, etiquetas que se
 * repiten). El copy largo de cada página vive en lib/content-i18n.ts.
 */
const UI: Record<Locale, Dict> = {
  es: {
    // Navegación
    "nav.servicios": "¿Qué hacemos?",
    "nav.artistas": "Artistas",
    "nav.giras": "Giras",
    "nav.experiencias": "Experiencias",
    "nav.universo": "Universo Bonito",
    "nav.nosotros": "Qué somos",
    "nav.contacto": "Hablamos",
    "nav.menu": "Menú",
    "nav.inicio": "Bonito Sound — inicio",

    // Selector de idioma
    "lang.switch": "Cambiar idioma",
    "lang.es": "Castellano",
    "lang.ca": "Català",

    // Botones y microcopy que se repiten
    "cta.hablamos": "Hablamos",
    "cta.verMas": "Ver más",
    "cta.verTodas": "Verlas todas",
    "cta.volver": "Volver",
    "cta.masInfo": "Más información",

    // Pie
    "footer.bonito": "Bonito",
    "footer.legal": "Legal",
    "footer.siguenos": "Síguenos",
    "footer.derechos": "Todos los derechos reservados.",
    "footer.queHacemos": "Qué hacemos",
    "footer.contacto": "Contacto",
    "footer.tagline":
      "En la música nadie te regala nada. Tres décadas de oficio detrás, tres años montando la agencia para hacerlo como hay que hacerlo.",
    "footer.marcas": "Eventos para marcas",
    "footer.clientes": "Clientes",
    "footer.records": "Records",
    "footer.nosotros": "Nosotros",
    "footer.blog": "Blog",
    "footer.avisoLegal": "Aviso legal",
    "footer.privacidad": "Privacidad",

    // Reproductor / radio
    "radio.titulo": "Radio Bonito",
    "radio.sintonizando": "sintonizando…",
    "radio.abrir": "Abrir la Radio Bonito",
    "radio.cerrar": "Cerrar la radio",
    "radio.emisora": "Emisora",
    "radio.poner": "Poner música",
    "radio.pausar": "Pausar la música",
    "radio.reanudar": "Reanudar la música",
    "radio.siguiente": "Siguiente tema",
    "radio.spotify": "La playlist de Bonito en Spotify",

    // Genéricos
    "a11y.baja": "Baja",
    "hero.play": "Dale al play",
  },
  ca: {
    // Navegació
    "nav.servicios": "Què fem?",
    "nav.artistas": "Artistes",
    "nav.giras": "Gires",
    "nav.experiencias": "Experiències",
    "nav.universo": "Univers Bonito",
    "nav.nosotros": "Qui som",
    "nav.contacto": "Parlem",
    "nav.menu": "Menú",
    "nav.inicio": "Bonito Sound — inici",

    // Selector d'idioma
    "lang.switch": "Canviar idioma",
    "lang.es": "Castellà",
    "lang.ca": "Català",

    // Botons i microcopy que es repeteixen
    "cta.hablamos": "Parlem",
    "cta.verMas": "Veure'n més",
    "cta.verTodas": "Veure-les totes",
    "cta.volver": "Tornar",
    "cta.masInfo": "Més informació",

    // Peu
    "footer.bonito": "Bonito",
    "footer.legal": "Legal",
    "footer.siguenos": "Segueix-nos",
    "footer.derechos": "Tots els drets reservats.",
    "footer.queHacemos": "Què fem",
    "footer.contacto": "Contacte",
    "footer.tagline":
      "A la música ningú no et regala res. Tres dècades d'ofici al darrere, tres anys muntant l'agència per fer-ho com s'ha de fer.",
    "footer.marcas": "Esdeveniments per a marques",
    "footer.clientes": "Clients",
    "footer.records": "Records",
    "footer.nosotros": "Nosaltres",
    "footer.blog": "Blog",
    "footer.avisoLegal": "Avís legal",
    "footer.privacidad": "Privacitat",

    // Reproductor / ràdio
    "radio.titulo": "Radio Bonito",
    "radio.sintonizando": "sintonitzant…",
    "radio.abrir": "Obrir la Radio Bonito",
    "radio.cerrar": "Tancar la ràdio",
    "radio.emisora": "Emissora",
    "radio.poner": "Posar música",
    "radio.pausar": "Pausar la música",
    "radio.reanudar": "Reprendre la música",
    "radio.siguiente": "Següent tema",
    "radio.spotify": "La playlist de Bonito a Spotify",

    // Genèrics
    "a11y.baja": "Baixa",
    "hero.play": "Dona-li al play",
  },
};

/**
 * Traduce una clave. Si falta en catalán cae al castellano (nunca se queda un
 * hueco en blanco), y si tampoco existe devuelve la propia clave para que el
 * fallo se vea en pantalla en vez de pasar desapercibido.
 */
export function t(locale: Locale, key: string): string {
  return UI[locale][key] ?? UI[DEFAULT_LOCALE][key] ?? key;
}
