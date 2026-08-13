import Image from "next/image";
import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Quién está detrás del estudio. No es un servicio interno de Bonito sino un
 * ACUERDO con el estudio de Marco La Testa y Jano Montano, así que el bloque
 * los presenta con nombre y cara en vez de hablar en primera persona.
 *
 * Las fotos son plug-and-play, como el resto del sitio: en cuanto existan
 * /img/estudio/marco-la-testa.jpg y /img/estudio/jano-montano.jpg se pintan
 * solas. Mientras no estén, la ficha se sostiene con tipografía — nunca un
 * hueco gris esperando imagen.
 *
 * Los artistas y el "+100 canciones" son dato real que aportó el estudio; por
 * eso van aquí y no inventados en el copy de servicio.
 */
const DUO = [
  { nombre: "Marco La Testa", slug: "marco-la-testa" },
  { nombre: "Jano Montano", slug: "jano-montano" },
];

const ARTISTAS = [
  "Alfred García", "Maruja Limón", "Tribade", "Sofia Gabanna", "J Dose",
  "Elane", "Huda", "Albali", "Paule", "D Nácar",
];

export function EstudioPartner() {
  const locale = serverLocale();
  const conFoto = DUO.map((p) => ({ ...p, foto: findAsset("estudio", p.slug) }));

  return (
    <Section id="estudio-partner">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <RevealOnScroll as="p" className="eyebrow mb-4">
            {tr(locale, "Quién lo hace")}
          </RevealOnScroll>

          <StaggerGroup stagger={0.1} className="grid grid-cols-2 gap-5">
            {conFoto.map((p) => (
              <div key={p.slug}>
                {p.foto && (
                  <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-2xl bg-bg-tertiary">
                    <Image
                      src={p.foto}
                      alt={p.nombre}
                      fill
                      sizes="(max-width: 768px) 45vw, 240px"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="font-round text-base font-bold leading-tight" style={{ color: NAVY }}>
                  {p.nombre}
                </p>
              </div>
            ))}
          </StaggerGroup>
        </div>

        <RevealOnScroll delay={0.1} className="space-y-5 text-lg leading-relaxed text-text-secondary">
          <p>
            {tr(locale, "Marco La Testa y Jano Montano ofrecen un acompañamiento integral en todas las fases de un proyecto musical. Desde la composición y la producción hasta la grabación, la mezcla y el máster, trabajan para que cada decisión creativa y técnica refuerce la identidad de la canción.")}
          </p>
          <p>
            {tr(locale, "No entienden la producción como un conjunto de fórmulas ni como un sonido propio impuesto a todos los proyectos. Cada artista tiene una identidad, una manera de comunicar y un universo propio. Cada decisión creativa está al servicio de potenciar esa identidad y llevar cada canción a su mejor versión.")}
          </p>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="font-round text-[2.6rem] font-bold leading-none" style={{ color: CYAN }}>
              +100
            </span>
            <span className="text-sm font-semibold uppercase leading-snug tracking-[0.14em]" style={{ color: "rgba(20,40,60,0.55)" }}>
              {tr(locale, "canciones publicadas en los últimos tres años")}
            </span>
          </div>

          <div className="pt-2">
            <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(20,40,60,0.5)" }}>
              {tr(locale, "Han trabajado con")}
            </p>
            <p className="text-base leading-relaxed" style={{ color: NAVY }}>
              {ARTISTAS.join(" · ")}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
