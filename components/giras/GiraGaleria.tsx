import Image from "next/image";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { girasFotos } from "@/lib/giras-fotos";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";

/**
 * Las fotos de una gira, más allá de la de la cabecera.
 *
 * Se alimenta sola de /public/img/giras/<slug>/ (ver lib/giras-fotos.ts): si la
 * carpeta no existe, la sección tampoco. Estética polaroid, la misma que el
 * listado de /giras y la galería de Dani — es material de archivo, y así se ve.
 *
 * La primera va a doble ancho: una gira tiene siempre una foto que la resume, y
 * si todas miden lo mismo esa se pierde entre las demás.
 */
export function GiraGaleria({ slug }: { slug: string }) {
  const locale = serverLocale();
  const fotos = girasFotos(slug);
  if (fotos.length === 0) return null;

  return (
    <div>
      <RevealOnScroll as="p" className="eyebrow mb-6">
        {tr(locale, "Del archivo de la gira")}
      </RevealOnScroll>

      <StaggerGroup stagger={0.06} className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
        {fotos.map((f, i) => (
          // El wrapper es el que anima GSAP (escribe su transform); la rotación
          // va dentro, si no se la come.
          <div key={f.src} className={i === 0 ? "col-span-2 row-span-2" : undefined}>
            <figure
              className="h-full bg-white p-2 pb-2.5 shadow-[0_10px_30px_rgba(20,40,60,0.13)] transition-transform duration-300 hover:!rotate-0 hover:scale-[1.02] md:p-2.5 md:pb-3"
              style={{ transform: `rotate(${i % 2 === 0 ? -1.4 : 1.4}deg)` }}
            >
              <div
                className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}
                style={{ backgroundColor: NAVY }}
              >
                <Image
                  src={f.src}
                  alt={f.caption ?? tr(locale, "Foto de la gira")}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 92vw, 480px" : "(max-width: 768px) 45vw, 240px"}
                  className="object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
              {(f.caption || f.credit) && (
                <figcaption className="px-1 pt-2 text-center">
                  {f.caption && (
                    <span className="block text-[0.72rem] font-semibold leading-tight" style={{ color: NAVY }}>
                      {tr(locale, f.caption)}
                    </span>
                  )}
                  {f.credit && (
                    <span className="mt-0.5 block text-[0.58rem] text-text-muted/70">© {f.credit}</span>
                  )}
                </figcaption>
              )}
            </figure>
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}
