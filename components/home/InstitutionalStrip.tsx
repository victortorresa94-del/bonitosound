import Image from "next/image";
import { RevealOnScroll } from "@/components/motion";
import { findLogo } from "@/lib/assets";
import { memberships, support, supportPending } from "@/lib/site";

const NAVY = "#14283C";

/**
 * Franja institucional del home, justo debajo del 1er banner ("Llevamos la
 * música a todas partes"). Discreta pero presente: aporta prestigio (miembros
 * de UFI/SGAE/ARTE… y apoyo del Ministerio de Cultura, etc.). Los logos de
 * instituciones son siluetas blancas → van sobre navy. Solo pinta los que
 * tienen archivo (plug-and-play).
 */
function Logo({ dir, name }: { dir: string; name: string }) {
  const src = findLogo(dir, name);
  if (!src) return null;
  return (
    <span className="relative inline-block h-7 w-[92px] opacity-75 transition-opacity duration-300 hover:opacity-100 md:h-8 md:w-[104px]">
      <Image
        src={src}
        alt={name}
        fill
        sizes="104px"
        className="object-contain"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </span>
  );
}

export function InstitutionalStrip() {
  const members = memberships.filter((n) => findLogo("instituciones", n));
  const apoyos = [...support, ...supportPending].filter((n) => findLogo("apoyos", n));
  if (members.length === 0 && apoyos.length === 0) return null;

  return (
    <section aria-label="Miembros y apoyos institucionales" style={{ backgroundColor: NAVY }}>
      <RevealOnScroll className="wrap flex flex-col items-center gap-7 py-8 text-center md:flex-row md:justify-center md:gap-14 md:py-9">
        {members.length > 0 && (
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/45">
              Miembros de
            </span>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
              {members.map((n) => (
                <Logo key={n} dir="instituciones" name={n} />
              ))}
            </div>
          </div>
        )}

        {members.length > 0 && apoyos.length > 0 && (
          <span aria-hidden className="hidden h-8 w-px bg-white/15 md:block" />
        )}

        {apoyos.length > 0 && (
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/45">
              Con el apoyo de
            </span>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
              {apoyos.map((n) => (
                <Logo key={n} dir="apoyos" name={n} />
              ))}
            </div>
          </div>
        )}
      </RevealOnScroll>
    </section>
  );
}
