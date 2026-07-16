import Link from "next/link";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

type IconKey = "ticket" | "vinyl" | "doc" | "globe" | "megaphone";

function Icon({ k }: { k: IconKey }) {
  const common = { fill: "none", stroke: NAVY, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (k) {
    case "ticket":
      return (
        <svg viewBox="0 0 32 24" className="h-6 w-8">
          <path {...common} d="M3 6 a2 2 0 0 1 2-2 h22 a2 2 0 0 1 2 2 v3 a2 2 0 0 0 0 6 v3 a2 2 0 0 1-2 2 H5 a2 2 0 0 1-2-2 v-3 a2 2 0 0 0 0-6 Z" />
          <path {...common} d="M11 4 v16" strokeDasharray="2 3" />
          <path fill={CYAN} stroke="none" d="M20 8 l1.2 2.6 2.8 .3-2.1 1.9 .6 2.8-2.5-1.4-2.5 1.4 .6-2.8-2.1-1.9 2.8-.3Z" />
        </svg>
      );
    case "vinyl":
      return (
        <svg viewBox="0 0 28 28" className="h-7 w-7">
          <circle {...common} cx="14" cy="14" r="12" />
          <circle {...common} cx="14" cy="14" r="6" />
          <circle fill={CYAN} stroke="none" cx="14" cy="14" r="2.2" />
        </svg>
      );
    case "doc":
      return (
        <svg viewBox="0 0 24 28" className="h-7 w-6">
          <path {...common} d="M4 3 h11 l5 5 v17 a1 1 0 0 1-1 1 H5 a1 1 0 0 1-1-1 Z" />
          <path {...common} d="M15 3 v5 h5" />
          <path {...common} d="M8 13 h8 M8 17 h8" />
          <path fill="none" stroke={CYAN} strokeWidth="1.6" strokeLinecap="round" d="M8 21 c1.5-1.5 2.5 1.5 4 0 s2.5 1.5 4 0" />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 28 28" className="h-7 w-7">
          <circle {...common} cx="14" cy="14" r="12" />
          <path {...common} d="M2 14 h24 M14 2 c5 4 5 20 0 24 c-5-4-5-20 0-24" />
        </svg>
      );
    case "megaphone":
      return (
        <svg viewBox="0 0 30 26" className="h-7 w-8">
          <path fill={NAVY} stroke="none" d="M4 10 l14-6 v18 l-14-6 Z" />
          <path {...common} d="M4 10 H2 a1 1 0 0 0-1 1 v4 a1 1 0 0 0 1 1 h2" />
          <path {...common} d="M6 17 v4 a2 2 0 0 0 4 0 v-2" />
          <path fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" d="M23 9 c3 2 3 6 0 8" />
        </svg>
      );
  }
}

/** Flecha curva dibujada entre tags. */
function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 60 44" className="h-9 w-12" fill="none" aria-hidden style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M8 6 C 40 6, 44 22, 40 36" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 36 l-8 -6 M40 36 l8 -4" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TAGS: { label: string; sub?: string; href: string; icon: IconKey; nuevo?: boolean }[] = [
  { label: "Booking Engine", href: "/records/booking-management", icon: "ticket" },
  { label: "Records 360", sub: "(Sello)", href: "/records/sello", icon: "vinyl" },
  { label: "Editorial 360", href: "/contacto", icon: "doc" },
  { label: "Distribución", href: "/records/distribucion", icon: "globe" },
  { label: "Marketing", href: "/marketing", icon: "megaphone", nuevo: true },
];
// Escalonado (staircase) por tag, en % de margen izquierdo (desktop).
const INDENT = [0, 12, 26, 40, 54];

function TagCard({ t }: { t: (typeof TAGS)[number] }) {
  if (t.nuevo) {
    // Marketing: blob cyan + NUEVO.
    return (
      <div className="relative inline-flex flex-col items-start">
        <Link
          href={t.href}
          className="group relative inline-flex items-center gap-3 px-7 py-4 transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: CYAN, borderRadius: "46% 54% 58% 42% / 56% 48% 52% 44%" }}
        >
          <Icon k={t.icon} />
          <span className="font-round text-lg font-bold md:text-xl" style={{ color: NAVY }}>{t.label}</span>
        </Link>
        <span className="mt-1 self-end pr-2 font-round text-lg font-bold italic" style={{ color: CYAN }}>NUEVO</span>
        {/* chispas */}
        <svg className="absolute -right-6 -top-3 h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M26 4 v6 M30 8 h-6 M28 16 l4 2" stroke={CYAN} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <Link
      href={t.href}
      className="group relative inline-flex items-center gap-3 rounded-[1.25rem] border-2 bg-[#FBFAF6] px-6 py-3.5 transition-transform hover:scale-[1.03]"
      style={{ borderColor: NAVY }}
    >
      {/* agujero de la etiqueta */}
      <span className="absolute left-3 h-2.5 w-2.5 rounded-full border-2" style={{ borderColor: NAVY }} />
      <span className="ml-5 inline-flex items-center gap-3">
        <Icon k={t.icon} />
        <span className="font-round text-lg font-bold leading-tight md:text-xl" style={{ color: NAVY }}>
          {t.label}
          {t.sub && <span className="ml-1.5 text-sm font-semibold opacity-70">{t.sub}</span>}
        </span>
      </span>
    </Link>
  );
}

export function RecordsHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14">
        {/* Statement gigante torcido, relleno navy */}
        <h1
          className="font-round font-bold leading-[0.86]"
          style={{
            fontSize: "clamp(3rem, 11vw, 9rem)",
            color: NAVY,
            transform: "rotate(-3.5deg)",
            transformOrigin: "left top",
            letterSpacing: "-0.01em",
          }}
        >
          Tienes la música.<br />Te falta el sistema.
        </h1>

        {/* Descripción */}
        <p className="mt-16 max-w-md text-lg font-medium leading-snug md:mt-24" style={{ color: NAVY }}>
          Sello, booking, management, distribución y editorial. Lo que la
          mayoría te hace montar con cinco proveedores, aquí está en uno.
        </p>

        {/* Cadena de tags escalonada, con flechas entre medias */}
        <div className="mt-10 md:mt-14">
          {TAGS.map((t, i) => (
            <div key={t.label} className="flex flex-col items-start" style={{ marginLeft: `${INDENT[i] * 0.7}%` }}>
              <TagCard t={t} />
              {i < TAGS.length - 1 && (
                <div className="ml-8 md:ml-16">
                  <Arrow />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
