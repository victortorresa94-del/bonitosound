import Link from "next/link";
import { site, memberships } from "@/lib/site";
import { resolveLogos } from "@/lib/assets";
import { serverLocale } from "@/lib/locale-server";
import { localePath, t } from "@/lib/i18n";

const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREMA = "#FBFAF6";

/**
 * Pie — variante FA del banco de pruebas.
 *
 * Navy a sangre, cuatro columnas de enlaces y, cerrando abajo, el wordmark
 * BONITO SOUND enorme en outline recortado por el borde inferior: la marca
 * firma la página en vez de repetir el logotipo pequeño otra vez.
 *
 * Las columnas se guardan por CLAVE, no por texto: el idioma se resuelve al
 * pintar y los enlaces pasan por localePath para no salirse de /ca.
 */
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

/** Encabezado de columna: cian, versalita, muy espaciado. */
function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
      {children}
    </p>
  );
}

const enlace = "text-sm transition-colors hover:text-accent-cyan";
const tintaSuave = { color: "rgba(251,250,246,0.78)" };

export function Footer() {
  const locale = serverLocale();
  // Solo las que tienen fichero: un nombre suelto entre logos canta como hueco.
  const insti = resolveLogos("instituciones", memberships).filter((l) => l.src);

  return (
    <footer style={{ backgroundColor: NAVY }}>
      <div className="wrap grid gap-10 gap-y-12 pb-16 pt-16 md:grid-cols-4 md:pb-20 md:pt-20">
        {cols.map((c) => (
          <div key={c.title}>
            <Titulo>{t(locale, c.title)}</Titulo>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={localePath(l.href, locale)} className={enlace} style={tintaSuave}>
                    {"key" in l && l.key ? t(locale, l.key) : (l as { label: string }).label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <Titulo>{t(locale, "footer.contacto")}</Titulo>
          <ul className="space-y-2.5" style={tintaSuave}>
            <li>
              <a href={`mailto:${site.emails.general}`} className={enlace}>{site.emails.general}</a>
            </li>
            <li>
              <a href={`mailto:${site.emails.booking}`} className={enlace}>{site.emails.booking}</a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={enlace}>{site.phone}</a>
            </li>
            <li className="text-sm">
              {site.address.street}, {site.address.zip} {site.address.city}
            </li>
          </ul>
        </div>

        <div>
          <Titulo>{t(locale, "footer.siguenos")}</Titulo>
          <ul className="space-y-2.5" style={tintaSuave}>
            <li>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={enlace}>Instagram</a>
            </li>
            <li>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className={enlace}>LinkedIn</a>
            </li>
          </ul>

          {/* La firma a mano, como en la cabecera de gira: un gesto humano
              sobre el impreso. Decorativa, por eso va aria-hidden. */}
          <svg className="mt-7 h-10 w-28" viewBox="0 0 120 44" fill="none" aria-hidden>
            <path
              d="M6 34 C 20 6, 26 6, 30 30 C 34 12, 44 8, 48 30 C 54 14, 62 10, 68 28 C 78 6, 96 4, 114 14"
              stroke={CYAN}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Franja inferior: membresías a la izquierda, legales a la derecha. */}
      <div className="border-t" style={{ borderColor: "rgba(251,250,246,0.14)" }}>
        {/* Aire de sobra arriba y abajo: esta franja quedaba pegada al bloque
            de columnas y al wordmark gigante, y todo el pie parecía amontonado
            en dos centímetros. El respiro grande va DEBAJO, que es donde entra
            el BONITO SOUND enorme. */}
        <div className="wrap flex flex-col gap-6 pb-12 pt-9 md:flex-row md:items-center md:justify-between md:gap-8 md:pb-16 md:pt-11">
          {insti.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(251,250,246,0.45)" }}>
                {t(locale, "footer.miembros")}
              </span>
              {insti.map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={l.name}
                  src={l.src!}
                  alt={l.name}
                  loading="lazy"
                  decoding="async"
                  className="h-5 w-auto object-contain transition-opacity duration-300 hover:opacity-100"
                  // Los ficheros ya son siluetas; sobre navy se pasan a blanco.
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.72 }}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs" style={{ color: "rgba(251,250,246,0.5)" }}>
            <span>© {new Date().getFullYear()} {site.legalName} · CIF {site.cif}</span>
            <Link href={localePath("/aviso-legal", locale)} className="transition-colors hover:text-accent-cyan">
              {t(locale, "footer.avisoLegal")}
            </Link>
            <Link href={localePath("/privacidad", locale)} className="transition-colors hover:text-accent-cyan">
              {t(locale, "footer.privacidad")}
            </Link>
          </div>
        </div>
      </div>

      {/* El wordmark, hueco y CORTADO POR LA MITAD contra el borde de la
          página: se lee entero igual y firma sin ocupar media pantalla.
          El corte lo hace el margen negativo, no el viewBox — así el hueco que
          lo separa de la franja de membresías no cambia al ajustarlo.
          La cuenta: la caja alta de la letra ocupa el ~92% del alto del SVG y
          el SVG mide 9,6vw de alto (1000×96 a ancho completo), así que para
          esconder justo la mitad de la letra hay que tirar de ~4,8vw.
          `textLength` lo obliga a
          caber justo en el viewBox: sin eso el ancho dependería de si la
          fuente ha cargado, y se saldría por los lados. Va aria-hidden porque
          el nombre de la marca ya está en el copyright de arriba. */}
      <div className="overflow-hidden px-3" aria-hidden>
        <svg viewBox="0 0 1000 96" className="mb-[-4.8vw] block w-full">
          <text
            x="500"
            y="92"
            textAnchor="middle"
            textLength="984"
            lengthAdjust="spacingAndGlyphs"
            className="font-round"
            style={{ fontSize: "126px", fontWeight: 700 }}
            fill="none"
            stroke={CREMA}
            strokeWidth="2"
            paintOrder="stroke"
          >
            BONITO SOUND
          </text>
        </svg>
      </div>
    </footer>
  );
}
