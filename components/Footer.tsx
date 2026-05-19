import Link from "next/link";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Qué hacemos",
    links: [
      { label: "Eventos para marcas", href: "/eventos/marcas" },
      { label: "Giras", href: "/eventos/giras" },
      { label: "Records", href: "/records" },
      { label: "Artistas", href: "/artistas" },
      { label: "Lab", href: "/lab" },
    ],
  },
  {
    title: "Bonito",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Jaleo Sound", href: "/jaleo-sound" },
      { label: "Agenda", href: "/agenda" },
      { label: "Diario", href: "/diario" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-bg-secondary">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="display text-xl">
            Bonito<span className="text-accent-blue">.</span>Sound
          </p>
          <p className="mt-3 max-w-xs text-sm text-text-secondary">
            En la música nadie te regala nada. Llevamos 30 años. Hace tres
            montamos esto para hacerlo como hay que hacerlo.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="eyebrow mb-4">{c.title}</p>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary hover:text-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="eyebrow mb-4">Contacto</p>
          <ul className="space-y-2.5 text-sm text-text-secondary">
            <li>
              <a href={`mailto:${site.emails.general}`} className="hover:text-text-primary">
                {site.emails.general}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.emails.booking}`} className="hover:text-text-primary">
                {site.emails.booking}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-text-primary">
                {site.phone}
              </a>
            </li>
            <li>
              {site.address.street}, {site.address.zip} {site.address.city}
            </li>
            <li className="flex gap-4 pt-2">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
                Instagram
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
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
