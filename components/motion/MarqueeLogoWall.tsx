import { findLogo } from "@/lib/assets";
import { MarqueeLogoWallClient } from "./MarqueeLogoWallClient";

type Props = {
  items: readonly string[];
  dir: string;
  label?: string;
  speed?: number;
  direction?: "left" | "right";
};

export function MarqueeLogoWall({ items, dir, label, speed, direction }: Props) {
  const resolved = items.map((name) => ({ name, src: findLogo(dir, name) }));
  return (
    <MarqueeLogoWallClient
      items={resolved}
      label={label}
      speed={speed}
      direction={direction}
    />
  );
}
