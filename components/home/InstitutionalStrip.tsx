import Image from "next/image";
import { RevealOnScroll } from "@/components/motion";
import { findLogo } from "@/lib/assets";
import { memberships, support, supportPending } from "@/lib/site";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

/**
 * Franja institucional del home: de qué somos miembros y quién nos apoya.
 * Discreta pero presente — aporta el prestigio que no se compra.
 *
 * Va entre la escena de tecnología y la del festival: cierra el bloque de
 * "esto es lo que hacemos" con quién nos avala, antes de pasar al festival.
 *
 * Sobre CREMA, como el resto del home. Los ficheros de logo son siluetas
 * BLANCAS (venían de un fondo navy), así que aquí se invierten a negro con
 * brightness(0) y se bajan de opacidad: quedan como un sello grabado,
 * presentes sin gritar. Sin invertirlos no se verían. Solo pinta los que
 * tienen archivo (plug-and-play).
 */
function Logo({ dir, name }: { dir: string; name: string }) {
  const src = findLogo(dir, name);
  if (!src) return null;
  return (
    <span className="relative inline-block h-7 w-[92px] opacity-55 transition-opacity duration-300 hover:opacity-100 md:h-8 md:w-[104px]">
      <Image
        src={src}
        alt={name}
        fill
        sizes="104px"
        className="object-contain"
        style={{ filter: "brightness(0)" }}
      />
    </span>
  );
}

export function InstitutionalStrip() {
  const locale = serverLocale();
  const members = memberships.filter((n) => findLogo("instituciones", n));
  const apoyos = [...support, ...supportPending].filter((n) => findLogo("apoyos", n));
  if (members.length === 0 && apoyos.length === 0) return null;

  return (
    <section
      aria-label={tr(locale, "Miembros y apoyos institucionales")}
      className="border-y border-subtle"
    >
      <RevealOnScroll className="wrap flex flex-col items-center gap-7 py-10 text-center md:flex-row md:justify-center md:gap-14 md:py-11">
        {members.length > 0 && (
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <span
              className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(20,40,60,0.45)" }}
            >
              {tr(locale, "Miembros de")}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
              {members.map((n) => (
                <Logo key={n} dir="instituciones" name={n} />
              ))}
            </div>
          </div>
        )}

        {members.length > 0 && apoyos.length > 0 && (
          <span aria-hidden className="hidden h-8 w-px bg-[rgba(20,40,60,0.12)] md:block" />
        )}

        {apoyos.length > 0 && (
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <span
              className="text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "rgba(20,40,60,0.45)" }}
            >
              {tr(locale, "Con el apoyo de")}
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
