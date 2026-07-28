import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Qué hacemos",
    links: [
      { label: "Eventos para marcas", href: "/experiencias/marcas" },
      { label: "Giras", href: "/giras" },
      { label: "Records", href: "/records" },
      { label: "Artistas", href: "/artistas" },
      { label: "Universo Bonito", href: "/universo" },
    ],
  },
  {
    title: "Bonito",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Jaleo Sound", href: "/jaleo-sound" },
      { label: "Blog", href: "/diario" },
      { label: "Contacto", href: "/contacto" },
      // Agenda queda fuera mientras esté vacía — se reintroduce con contenido real.
    ],
  },
];

export function Footer() {
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
            En la música nadie te regala nada. Tres décadas de oficio detrás,
            tres años montando la agencia para hacerlo como hay que hacerlo.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="mb-4 text-sm font-bold text-text-primary">{c.title}</p>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 text-sm font-bold text-text-primary">Contacto</p>
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
            <Link href="/aviso-legal" className="hover:text-text-secondary">
              Aviso legal
            </Link>
            <Link href="/privacidad" className="hover:text-text-secondary">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
