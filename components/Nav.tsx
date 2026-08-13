"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";
import { localePath, stripLocale, t, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/LocaleProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/** ¿La ruta actual pertenece a este item de nav? (activo también en subrutas).
 *  Compara SIN el prefijo de idioma: /ca/giras debe marcar "Gires" igual que
 *  /giras marca "Giras". */
function isActive(pathname: string, href: string) {
  const p = stripLocale(pathname);
  return p === href || p.startsWith(href + "/");
}

/** Clave de traducción de cada entrada del menú, a partir de su ruta. */
function navKey(href: string) {
  return "nav." + (href === "/" ? "inicio" : href.replace(/^\//, "").split("/")[0]);
}

/**
 * Selector de idioma: mantiene la página actual y solo cambia el prefijo.
 *
 * Va con <a> y NO con <Link> a propósito. El idioma lo decide el layout raíz
 * leyendo la cabecera que pone el middleware, y el App Router conserva ese
 * layout al navegar por cliente: al saltar de /giras a /ca/giras cambiaba la
 * URL pero el menú y el pie se quedaban en el idioma anterior. Con una
 * navegación completa el servidor vuelve a decidir el idioma y todo cuadra.
 * Cambiar de idioma se hace una vez por visita: la recarga no molesta.
 */
/**
 * Las dos banderas, dibujadas en SVG.
 *
 * Van dibujadas y no como emoji 🇪🇸/🇨🇦 porque Windows NO pinta las banderas
 * de emoji: sale el par de letras "ES"/"CA" en una cajita, que es justo lo que
 * queríamos quitar. Y la senyera ni siquiera existe como emoji.
 *
 * Cada una lleva su borde: sobre el crema del fondo, el amarillo de la senyera
 * y el de la bandera española se pierden sin un filete que los recorte.
 */
function Bandera({ pais }: { pais: Locale }) {
  const comun = "block h-[1.15rem] w-[1.6rem] rounded-[3px]";
  return pais === "ca" ? (
    // Senyera: cuatro barras rojas sobre amarillo.
    <svg viewBox="0 0 27 18" className={comun} aria-hidden>
      <rect width="27" height="18" fill="#FCDD09" />
      {[2, 6, 10, 14].map((y) => (
        <rect key={y} y={y} width="27" height="2" fill="#DA121A" />
      ))}
      <rect x="0.4" y="0.4" width="26.2" height="17.2" rx="2.6" fill="none" stroke="rgba(20,40,60,0.28)" strokeWidth="0.8" />
    </svg>
  ) : (
    // Bandera de España: rojo-amarillo-rojo, con la banda central al doble.
    <svg viewBox="0 0 27 18" className={comun} aria-hidden>
      <rect width="27" height="18" fill="#AA151B" />
      <rect y="4.5" width="27" height="9" fill="#F1BF00" />
      <rect x="0.4" y="0.4" width="26.2" height="17.2" rx="2.6" fill="none" stroke="rgba(20,40,60,0.28)" strokeWidth="0.8" />
    </svg>
  );
}

function LangSwitch({ pathname, locale }: { pathname: string; locale: Locale }) {
  const base = stripLocale(pathname);
  const otro: Locale = locale === "es" ? "ca" : "es";
  return (
    <a
      href={localePath(base, otro)}
      aria-label={t(locale, "lang.switch")}
      title={otro === "ca" ? "Català" : "Castellano"}
      className="flex items-center opacity-80 transition-all duration-200 hover:scale-110 hover:opacity-100"
    >
      <Bandera pais={otro} />
      {/* El idioma al que se va, para quien no distinga las banderas o navegue
          con lector de pantalla. */}
      <span className="sr-only">{otro === "ca" ? "Català" : "Castellano"}</span>
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  return (
    <header className="sticky top-0 z-50 bg-bg-primary/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Link
          href={localePath("/", locale)}
          aria-label={t(locale, "nav.inicio")}
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/img/marca/logo-bonito.avif"
            alt="Bonito Sound"
            width={400}
            height={500}
            priority
            unoptimized
            className="h-11 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={localePath(item.href, locale)}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-sm font-medium ${
                  active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {t(locale, navKey(item.href))}
              </Link>
            );
          })}
          <LangSwitch pathname={pathname} locale={locale} />
          <Link href={localePath("/contacto", locale)} className="btn btn-primary px-5 py-2">
            {t(locale, "cta.hablamos")}
          </Link>
        </nav>

        <button
          className="relative h-6 w-6 md:hidden"
          aria-label={t(locale, "nav.menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="absolute left-0 right-0 h-0.5 bg-text-primary"
            animate={open ? { top: "50%", rotate: 45, y: "-50%" } : { top: "25%", rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
          <motion.span
            className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-text-primary"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute left-0 right-0 h-0.5 bg-text-primary"
            animate={open ? { top: "50%", rotate: -45, y: "-50%" } : { top: "75%", rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-subtle bg-bg-primary md:hidden"
          >
            <div className="wrap flex flex-col py-4">
              {nav.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 * idx, ease: EASE }}
                >
                  <Link
                    href={localePath(item.href, locale)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`block py-3 ${
                      isActive(pathname, item.href) ? "text-text-primary" : "text-text-secondary"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {t(locale, navKey(item.href))}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 * nav.length, ease: EASE }}
              >
                <Link
                  href={localePath("/contacto", locale)}
                  className="btn btn-primary mt-3"
                  onClick={() => setOpen(false)}
                >
                  {t(locale, "cta.hablamos")}
                </Link>
                {/* Selector de idioma también en móvil, donde no cabe arriba. */}
                <div className="mt-4 border-t border-subtle pt-4">
                  <LangSwitch pathname={pathname} locale={locale} />
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
