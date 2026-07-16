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
 * se cuenta la historia de verdad. Plug-and-play: sin párrafos, no renderiza.
 */
export function ArtistBio({
  paragraphs,
  name,
}: {
  paragraphs: string[];
  name: string;
}) {
  // Filtramos vacíos por si llegan strings en blanco desde el contenido.
  const texto = (paragraphs ?? []).filter((p) => p && p.trim().length > 0);
  if (texto.length === 0) return null;

  return (
    <Section id="historia">
      <RevealOnScroll as="p" className="eyebrow">
        Su historia
      </RevealOnScroll>

      {/* Titular oculto: da jerarquía y contexto sin repetir el nombre del hero.
          Visualmente el bloque se lee como un reportaje —antetítulo y capital,
          sin headline— y así no metemos copy de relleno. */}
      <h2 className="sr-only">La historia de {name}</h2>

      {/* StaggerGroup usa ScrollTrigger.batch: cada párrafo entra cuando llega
          a viewport. Con un solo reveal, un bloque alto termina de animarse
          con media bio aún fuera de pantalla. */}
      <StaggerGroup stagger={0.08} className="mt-8 max-w-2xl space-y-6">
        {texto.map((p, i) => (
          <p key={i} className={i === 0 ? ENTRADA : PARRAFO}>
            {p}
          </p>
        ))}
      </StaggerGroup>
    </Section>
  );
}
