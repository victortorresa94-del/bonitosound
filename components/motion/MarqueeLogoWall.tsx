import { resolveLogos } from "@/lib/assets";
import { MarqueeLogoWallClient } from "./MarqueeLogoWallClient";

type Props = {
  items: readonly string[];
  dir: string;
  label?: string;
  speed?: number;
  direction?: "left" | "right";
  /** Logos en negro plano. Ver el comentario del cliente. */
  mono?: boolean;
  /** Deja fuera los que aún no tienen fichero, en vez de pintar su nombre. */
  soloConLogo?: boolean;
};

export function MarqueeLogoWall({
  items,
  dir,
  label,
  speed,
  direction,
  mono,
  soloConLogo,
}: Props) {
  // resolveLogos (y no findLogo) porque trae el flag isPhoto, que es lo que
  // permite no ennegrecer los JPG con fondo — quedarían como un tocho negro.
  const resolved = resolveLogos(dir, items);
  const finales = soloConLogo ? resolved.filter((l) => l.src) : resolved;
  return (
    <MarqueeLogoWallClient
      items={finales}
      label={label}
      speed={speed}
      direction={direction}
      mono={mono}
    />
  );
}
