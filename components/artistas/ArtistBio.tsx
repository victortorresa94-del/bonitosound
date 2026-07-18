import Image from "next/image";
import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";

/** Prosa de lectura larga: medida cómoda, rag limpio, color de cuerpo. */
const PARRAFO = "text-pretty text-lg leading-relaxed text-text-secondary";

/**
 * Entrada: un punto más grande + capital slab en navy. Abre el reportaje.
 * Las medidas de la capital están afinadas a ojo: no tocar sin ver el render.
 */
const ENTRADA = `${PARRAFO} md:text-xl md:leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.2rem] first-letter:leading-[0.78] first-letter:text-[#14283C] md:first-letter:text-[3.8rem]`;

/**
 * Bio larga y editorial del artista. Aparte de la línea corta del hero: aquí
 * se cuenta la historia de verdad. Si hay foto real, va a dos columnas
 * (reportaje + retrato); si no, a una sola. Plug-and-play: sin párrafos, no
 * renderiza.
 */
export function ArtistBio({
  paragraphs,
  name,
  photo,
}: {
  paragraphs: string[];
  name: string;
  photo?: string | null;
}) {
  const texto = (paragraphs ?? []).filter((p) => p && p.trim().length > 0);
  if (texto.length === 0) return null;

  const prosa = (
    <StaggerGroup stagger={0.08} className="space-y-6">
      {texto.map((p, i) => (
        <p key={i} className={i === 0 ? ENTRADA : PARRAFO}>
          {p}
        </p>
      ))}
    </StaggerGroup>
  );

  return (
    <Section id="historia">
      <RevealOnScroll as="p" className="eyebrow">Su historia</RevealOnScroll>
      <h2 className="sr-only">La historia de {name}</h2>

      {photo ? (
        <div className="mt-8 grid items-start gap-10 md:grid-cols-[1.35fr_1fr] md:gap-14">
          <div className="max-w-2xl">{prosa}</div>
          <RevealOnScroll delay={0.12} className="md:sticky md:top-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
              <Image
                src={photo}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>
      ) : (
        <div className="mt-8 max-w-2xl">{prosa}</div>
      )}
    </Section>
  );
}
