import type { ReactNode } from "react";

/**
 * Banner de CARACTERÍSTICAS de un servicio (calcado del mockup de Marketing).
 *
 * Reutilizable en cualquier servicio: pásale 2-4 features. La que lleve
 * `highlight: true` se pinta como BLOB cian relleno (el "gancho" del bloque),
 * el resto como tarjeta de borde navy con micro-rotación (efecto dibujado).
 *
 * Uso:
 *   <ServiceFeatures features={[
 *     { icon: "megafono",  title: "Ads",              text: "…" },
 *     { icon: "claqueta",  title: "Material",         text: "…" },
 *     { icon: "moneda",    title: "Inversión propia", text: "…", highlight: true },
 *   ]} />
 */

const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREAM = "#FBFAF6";

export type FeatureIcon = "megafono" | "claqueta" | "moneda" | "vinilo" | "ticket" | "globo";

export type ServiceFeature = {
  icon: FeatureIcon;
  title: string;
  text: string;
  /** Se pinta como blob cian relleno en vez de tarjeta con borde. */
  highlight?: boolean;
};

/** Iconos line-art navy con chispas cian (dibujados a mano). */
function Icon({ k }: { k: FeatureIcon }): ReactNode {
  const s = {
    fill: "none",
    stroke: NAVY,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (k) {
    case "megafono":
      return (
        <svg viewBox="0 0 44 40" className="h-11 w-12" aria-hidden>
          <path fill={NAVY} stroke="none" d="M6 15 l19-8 v22 l-19-8 Z" />
          <path {...s} d="M6 15 H3.5 a1.5 1.5 0 0 0-1.5 1.5 v5 a1.5 1.5 0 0 0 1.5 1.5 H6" />
          <path {...s} d="M9 24 v5 a2.5 2.5 0 0 0 5 0 v-3" />
          {/* chispas cian */}
          <path d="M31 12 c4 3 4 11 0 14" stroke={CYAN} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M36 8 c7 5 7 19 0 24" stroke={CYAN} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.75" />
        </svg>
      );
    case "claqueta":
      return (
        <svg viewBox="0 0 44 40" className="h-11 w-12" aria-hidden>
          <rect {...s} x="4" y="14" width="34" height="22" rx="2.5" />
          <path fill={NAVY} stroke="none" d="M4 8 l32-4 2 6 -32 4 Z" />
          <path d="M12 5.5 l2.5 5.5 M20 4.5 l2.5 5.5 M28 3.5 l2.5 5.5" stroke={CREAM} strokeWidth="1.6" strokeLinecap="round" />
          {/* play cian */}
          <path fill={CYAN} stroke="none" d="M18 20 l9 5 -9 5 Z" />
        </svg>
      );
    case "moneda":
      return (
        <svg viewBox="0 0 44 40" className="h-11 w-12" aria-hidden>
          <circle {...s} cx="20" cy="21" r="12" />
          <path {...s} d="M20 14 v14 M23.5 17 h-5 a2.5 2.5 0 0 0 0 5 h3 a2.5 2.5 0 0 1 0 5 h-5" />
          {/* chispas */}
          <path d="M36 8 v5 M39.5 11 h-5 M35 26 l3.5 2" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "vinilo":
      return (
        <svg viewBox="0 0 44 40" className="h-11 w-12" aria-hidden>
          <circle {...s} cx="21" cy="20" r="14" />
          <circle {...s} cx="21" cy="20" r="6" />
          <circle fill={CYAN} stroke="none" cx="21" cy="20" r="2.4" />
        </svg>
      );
    case "ticket":
      return (
        <svg viewBox="0 0 44 40" className="h-11 w-12" aria-hidden>
          <path {...s} d="M5 13 a2 2 0 0 1 2-2 h30 a2 2 0 0 1 2 2 v4 a3 3 0 0 0 0 6 v4 a2 2 0 0 1-2 2 H7 a2 2 0 0 1-2-2 v-4 a3 3 0 0 0 0-6 Z" />
          <path {...s} d="M15 11 v18" strokeDasharray="2 3" />
          <path fill={CYAN} stroke="none" d="M27 16 l1.4 3 3.2 .3-2.4 2.2 .7 3.2-2.9-1.6-2.9 1.6 .7-3.2-2.4-2.2 3.2-.3Z" />
        </svg>
      );
    case "globo":
      return (
        <svg viewBox="0 0 44 40" className="h-11 w-12" aria-hidden>
          <circle {...s} cx="21" cy="20" r="14" />
          <path {...s} d="M7 20 h28 M21 6 c6 5 6 23 0 28 c-6-5-6-23 0-28" />
        </svg>
      );
  }
}

/** Micro-rotaciones alternas: efecto "recortado a mano", no rejilla rígida. */
const TILT = ["-1.2deg", "0.9deg", "-0.6deg", "1.1deg"];

export function ServiceFeatures({
  features,
  className = "",
}: {
  features: ServiceFeature[];
  className?: string;
}) {
  if (!features || features.length === 0) return null;

  return (
    <div className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {features.map((f, i) => {
        const tilt = TILT[i % TILT.length];

        if (f.highlight) {
          // Blob cian relleno: el gancho del bloque (el color es un evento).
          return (
            <div key={f.title} className="relative">
              <div
                className="h-full px-7 py-8"
                style={{
                  backgroundColor: CYAN,
                  borderRadius: "46% 54% 58% 42% / 8% 8% 10% 10%",
                  transform: `rotate(${tilt})`,
                }}
              >
                <Icon k={f.icon} />
                <h3
                  className="mt-4 font-round text-2xl font-bold leading-tight md:text-3xl"
                  style={{ color: NAVY }}
                >
                  {f.title}
                </h3>
                <span
                  className="mt-2 block h-[3px] w-10 rounded-full"
                  style={{ backgroundColor: NAVY, opacity: 0.5 }}
                />
                <p className="mt-4 text-sm leading-relaxed" style={{ color: NAVY }}>
                  {f.text}
                </p>
              </div>
              {/* chispas sueltas */}
              <svg className="absolute -right-3 -top-3 h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path d="M24 3 v7 M28.5 7 h-7 M27 18 l4 2" stroke={CYAN} strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            </div>
          );
        }

        return (
          <div
            key={f.title}
            className="h-full rounded-[2rem] border-2 px-7 py-8"
            style={{
              borderColor: NAVY,
              backgroundColor: CREAM,
              transform: `rotate(${tilt})`,
            }}
          >
            <Icon k={f.icon} />
            <h3
              className="mt-4 font-round text-2xl font-bold leading-tight md:text-3xl"
              style={{ color: NAVY }}
            >
              {f.title}
            </h3>
            <span
              className="mt-2 block h-[3px] w-10 rounded-full"
              style={{ backgroundColor: CYAN }}
            />
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {f.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
