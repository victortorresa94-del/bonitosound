import Image from "next/image";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";

/**
 * Galería de archivo de Dani: treinta años de oficio, en fotos.
 *
 * Plug-and-play: cada entrada se pinta SOLO si existe su fichero en
 * /public/img/nosotros/dani/. Si no hay ninguna, la sección no existe.
 * Estética polaroid (marco blanco, cinta, rotación), la misma que /giras.
 */
type Foto = { file: string; alt: string; caption: string; credit?: string };

const FOTOS: Foto[] = [
  {
    file: "backliner",
    alt: "Dani trabajando como backliner en una gira",
    caption: "De backliner en carretera",
  },
  {
    file: "en-directo",
    alt: "Dani en producción durante un directo",
    caption: "Producción en directo",
  },
  {
    file: "ruth-lorenzo",
    alt: "Dani con Ruth Lorenzo",
    caption: "Con Ruth Lorenzo",
  },
  {
    file: "tu-cara-me-suena",
    alt: "Producción técnica en el programa Tu Cara Me Suena",
    caption: "Tu Cara Me Suena",
  },
];

export function DaniGaleria() {
  const locale = serverLocale();
  const fotos = FOTOS.map((f) => ({ ...f, src: findAsset("nosotros/dani", f.file) })).filter(
    (f): f is Foto & { src: string } => Boolean(f.src),
  );
  if (fotos.length === 0) return null;

  return (
    <RevealOnScroll className="mt-14 border-t border-subtle pt-10">
      <p className="eyebrow mb-2">Del archivo</p>
      <p className="mb-8 max-w-xl text-text-secondary">
        {tr(locale, "Treinta años dan para mucho carrete. Estas son de las que se guardan.")}
      </p>

      <StaggerGroup
        stagger={0.08}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:overflow-visible"
      >
        {/* El wrapper es el que anima StaggerGroup (GSAP escribe su transform);
            la rotación va DENTRO, si no GSAP la pisa. */}
        {fotos.map((f, i) => (
          <div key={f.file} className="w-[62vw] shrink-0 snap-center sm:w-[240px] md:w-auto">
          <figure
            className="relative bg-white p-2.5 pb-3 shadow-[0_10px_30px_rgba(20,40,60,0.13)] transition-transform duration-300 hover:!rotate-0 hover:scale-[1.03]"
            style={{ transform: `rotate(${i % 2 === 0 ? -1.8 : 1.8}deg)` }}
          >
            {/* Cinta adhesiva, como en las polaroids de /giras. */}
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] rounded-[2px]"
              style={{ backgroundColor: "rgba(214,199,166,0.75)" }}
            />
            <div
              className="relative aspect-[4/3] w-full overflow-hidden"
              style={{ backgroundColor: NAVY }}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(max-width: 768px) 62vw, 240px"
                className="object-cover"
              />
            </div>
            <figcaption className="px-1 pt-2.5 text-center">
              <span className="text-sm font-semibold" style={{ color: NAVY }}>
                {f.caption}
              </span>
              {f.credit && (
                <span className="mt-0.5 block text-[0.6rem] text-text-muted/70">© {f.credit}</span>
              )}
            </figcaption>
          </figure>
          </div>
        ))}
      </StaggerGroup>
    </RevealOnScroll>
  );
}
