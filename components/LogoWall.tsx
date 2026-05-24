import Image from "next/image";
import { findLogo } from "@/lib/assets";

/**
 * Muro de logos. Si existe el fichero en /public/img/<dir>/<slug>.(svg|png|webp…)
 * lo pinta como imagen; si no, cae al placeholder tipográfico.
 * Slug: assetSlug(name) — ej. "Ballantine's" -> ballantines.svg
 */
export function LogoWall({
  items,
  label,
  dir,
}: {
  items: readonly string[];
  label?: string;
  dir?: string;
}) {
  return (
    <div>
      {label && <p className="eyebrow mb-6">{label}</p>}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((name) => {
          const src = dir ? findLogo(dir, name) : null;
          return (
            <div
              key={name}
              className="flex items-center justify-center rounded-xl border border-subtle px-4 py-6 text-center"
            >
              {src ? (
                <Image
                  src={src}
                  alt={name}
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-sm font-semibold tracking-wide text-text-secondary">
                  {name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
