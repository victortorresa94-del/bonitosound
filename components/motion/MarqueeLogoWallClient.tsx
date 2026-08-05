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
};

export function MarqueeLogoWallClient({
  items,
  label,
  speed = 50,
  direction = "left",
  mono = false,
}: Props) {
  return (
    <div>
      {label && <p className="eyebrow mb-6">{label}</p>}
      <MarqueeRow speed={speed} direction={direction} gap="3rem">
        {items.map((it) => {
          const silueta = mono && it.aguantaSilueta !== false;
          return (
            <div
              key={it.name}
              className="flex h-14 min-w-[100px] shrink-0 items-center justify-center px-3"
            >
              {it.src ? (
                <Image
                  src={it.src}
                  alt={it.name}
                  width={140}
                  height={36}
                  loading="eager"
                  className={
                    silueta
                      ? "h-7 w-auto object-contain opacity-55 transition-opacity duration-300 hover:opacity-100"
                      : "h-7 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
                  }
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
