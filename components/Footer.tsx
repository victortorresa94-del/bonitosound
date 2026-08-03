import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { serverLocale } from "@/lib/locale-server";
import { localePath, t } from "@/lib/i18n";

/** Las columnas se guardan por CLAVE, no por texto: el idioma se resuelve al
 *  pintar y los enlaces pasan por localePath para no salirse de /ca. */
const cols = [
  {
    title: "footer.queHacemos",
    links: [
      { key: "footer.marcas", href: "/experiencias/marcas" },
      { key: "footer.clientes", href: "/clientes" },
      { key: "nav.giras", href: "/giras" },
      { key: "footer.records", href: "/records" },
      { key: "nav.artistas", href: "/artistas" },
      { key: "nav.universo", href: "/universo" },
    ],
  },
  {
    title: "footer.bonito",
    links: [
      { key: "footer.nosotros", href: "/nosotros" },
      { key: null, label: "Jaleo Sound", href: "/jaleo-sound" },
      { key: "footer.blog", href: "/diario" },
      { key: "footer.contacto", href: "/contacto" },
      // Agenda queda fuera mientras esté vacía — se reintroduce con contenido real.
    ],
  },
] as const;

export function Footer() {
  const locale = serverLocale();
  return (
    <footer className="border-t border-subtle bg-bg-primary">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-20">
        <div>
          <Image
            src="/img/marca/logo-bonito-color.svg"
            alt="Bonito Sound"
            width={121}
            height={82}
            className="h-11 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-secondary">
            {t(locale, "footer.tagline")}
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-sm font-bold text-text-primary">{t(locale, c.title)}</p>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localePath(l.href, locale)}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                  >
                    {"key" in l && l.key ? t(locale, l.key) : (l as { label: string }).label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 text-sm font-bold text-text-primary">{t(locale, "footer.contacto")}</p>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            <li>
              <a
                href={`mailto:${site.emails.general}`}
                className="transition-colors hover:text-accent-cyan"
              >
                {site.emails.general}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.emails.booking}`}
                className="transition-colors hover:text-accent-cyan"
              >
                {site.emails.booking}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-accent-cyan"
              >
                {site.phone}
              </a>
            </li>
            <li>
              {site.address.street}, {site.address.zip} {site.address.city}
            </li>
            <li className="flex gap-4 pt-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-text-primary transition-colors hover:text-accent-cyan"
              >
                Instagram
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-text-primary transition-colors hover:text-accent-cyan"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-subtle">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-text-muted md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · CIF {site.cif}
          </p>
          <div className="flex gap-5">
            <Link href={localePath("/aviso-legal", locale)} className="hover:text-text-secondary">
              {t(locale, "footer.avisoLegal")}
            </Link>
            <Link href={localePath("/privacidad", locale)} className="hover:text-text-secondary">
              {t(locale, "footer.privacidad")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
