"use client";

import Image from "next/image";
import { MarqueeRow } from "./MarqueeRow";

type Item = { name: string; src: string | null; aguantaSilueta?: boolean };

type Props = {
  items: Item[];
  label?: string;
  speed?: number;
  direction?: "left" | "right";
  /**
   * Pinta los logos en NEGRO plano (silueta) en vez de a todo color. Unifica
   * un muro que viene de mil marcas distintas y evita el efecto "feria de
   * colorines".
   *
   * Solo se aplica a los que son tinta sobre transparencia: un logo que trae
   * el fondo incrustado se convertiría en un rectángulo negro, así que esos se
   * quedan a color. Lo decide `aguantaSilueta` (ver lib/png-alpha.ts), no la
   * extensión del fichero.
   */
  mono?: boolean;
  /** Alto de cada logo. Por defecto `h-7`; la banda-pie del home usa `h-6`. */
  logoClass?: string;
  /**
   * Separación entre logos. Por defecto `3rem`, que va bien en una banda ancha
   * y suelta. El muro del home la baja: ahí la fila es más corta y con 3rem se
   * veían cuatro logos perdidos en medio de la nada.
   */
  gap?: string;
  /** Ancho mínimo de la celda de cada logo. Mismo motivo que `gap`. */
  minAncho?: string;
};

export function MarqueeLogoWallClient({
  items,
  label,
  speed = 50,
  direction = "left",
  mono = false,
  logoClass = "h-7",
  gap = "3rem",
  minAncho = "100px",
}: Props) {
  return (
    <div>
      {label && <p className="eyebrow mb-6">{label}</p>}
      <MarqueeRow speed={speed} direction={direction} gap={gap}>
        {items.map((it) => {
          const silueta = mono && it.aguantaSilueta !== false;
          return (
            <div
              key={it.name}
              className="flex h-14 shrink-0 items-center justify-center px-3"
              style={{ minWidth: minAncho }}
            >
              {it.src ? (
                <Image
                  src={it.src}
                  alt={it.name}
                  width={140}
                  height={36}
                  loading="eager"
                  className={`${logoClass} w-auto object-contain transition-opacity duration-300 ${
                    silueta ? "opacity-55 hover:opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                  style={silueta ? { filter: "brightness(0)" } : undefined}
                />
              ) : (
                <span className="text-sm font-semibold tracking-wide text-text-secondary">
                  {it.name}
                </span>
              )}
            </div>
          );
        })}
      </MarqueeRow>
    </div>
  );
}
