"use client";

import Image from "next/image";
import { MarqueeRow } from "./MarqueeRow";

type Item = { name: string; src: string | null };

type Props = {
  items: Item[];
  label?: string;
  speed?: number;
  direction?: "left" | "right";
};

export function MarqueeLogoWallClient({
  items,
  label,
  speed = 50,
  direction = "left",
}: Props) {
  return (
    <div>
      {label && <p className="eyebrow mb-6">{label}</p>}
      <MarqueeRow speed={speed} direction={direction} gap="3rem">
        {items.map((it) => (
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
                className="h-7 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
              />
            ) : (
              <span className="text-sm font-semibold tracking-wide text-text-secondary">
                {it.name}
              </span>
            )}
          </div>
        ))}
      </MarqueeRow>
    </div>
  );
}
