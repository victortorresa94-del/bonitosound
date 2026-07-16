import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";

/**
 * ArtistStyle — "Su sonido": género grande, descripción del sonido,
 * influencias en chips y para quién es. Plug-and-play: si falta el género
 * (dato esencial) no renderiza nada; el resto de bloques son opcionales.
 */
export function ArtistStyle({
  genre,
  style,
  influences,
  forWho,
}: {
  genre: string;
  style?: string;
  influences?: string[];
  forWho?: string;
}) {
  const genreClean = genre?.trim();
  if (!genreClean) return null;

  const soundClean = style?.trim();
  const forWhoClean = forWho?.trim();
  // Limpiamos vacíos y duplicados: el chip vacío nunca llega al DOM y una
  // influencia repetida no rompe las keys de React.
  const tags = Array.from(
    new Set((influences ?? []).map((t) => t.trim()).filter(Boolean))
  );

  // Tiñe de cian la última palabra del género solo si es un titular corto
  // (en géneros largos el acento estorba: "el color es un evento").
  const words = genreClean.split(/\s+/);
  const canTint = words.length > 1 && words.length <= 3;
  const lead = canTint ? words.slice(0, -1).join(" ") : genreClean;
  const tail = canTint ? words[words.length - 1] : null;

  const hasAside = Boolean(soundClean || tags.length > 0 || forWhoClean);

  return (
    <Section id="sonido">
      <div
        className={
          hasAside
            ? "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14"
            : "max-w-3xl"
        }
      >
        {/* Columna izquierda: género */}
        <div className={hasAside ? "md:col-span-5" : ""}>
          <RevealOnScroll as="p" className="eyebrow mb-4">
            Su sonido
          </RevealOnScroll>

          <RevealOnScroll
            as="h2"
            className="display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-text-primary"
          >
            {lead}
            {tail && (
              <>
                {" "}
                <span className="text-[#16b6d4]">{tail}</span>
              </>
            )}
          </RevealOnScroll>
        </div>

        {/* Columna derecha: sonido, influencias y público */}
        {hasAside && (
          <div className="md:col-span-7">
            {soundClean && (
              <RevealOnScroll
                as="p"
                delay={0.08}
                className="max-w-[54ch] text-lg leading-relaxed text-text-secondary"
              >
                {soundClean}
              </RevealOnScroll>
            )}

            {tags.length > 0 && (
              <div className={soundClean ? "mt-10" : ""}>
                <RevealOnScroll
                  as="p"
                  className="font-round mb-4 text-sm text-text-muted"
                >
                  Suena a
                </RevealOnScroll>
                {/* Chips en line-art neutro: el cian se reserva al titular y
                    al "para quién". N chips en cian competirían con ellos. */}
                <StaggerGroup
                  as="ul"
                  stagger={0.06}
                  className="flex list-none flex-wrap gap-2.5"
                >
                  {tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-subtle px-4 py-1.5 text-sm text-text-secondary"
                    >
                      {tag}
                    </li>
                  ))}
                </StaggerGroup>
              </div>
            )}

            {forWhoClean && (
              <RevealOnScroll
                as="div"
                delay={0.1}
                className="mt-11 border-l-2 border-[#16b6d4] pl-5"
              >
                <p className="font-round mb-1.5 text-xs uppercase tracking-[0.18em] text-text-muted">
                  Para quién
                </p>
                <p className="display text-[clamp(1.15rem,2vw,1.6rem)] italic leading-snug text-text-primary">
                  {forWhoClean}
                </p>
              </RevealOnScroll>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
