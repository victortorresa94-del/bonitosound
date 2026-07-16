import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";

// Datos de un concierto puntual (todo opcional: puede faltar la sala o la ciudad)
type Concert = {
  date?: string;
  venue?: string;
  city?: string;
};

type ArtistConcertsProps = {
  firstConcert?: Concert;
  lastConcert?: Concert;
  milestones?: { year: string; text: string }[];
};

// ¿El concierto trae algún dato aprovechable?
function hasConcertData(c?: Concert): c is Concert {
  return Boolean(c && (c.date || c.venue || c.city));
}

// Card destacada de un concierto (primer / último)
function ConcertCard({ label, concert }: { label: string; concert: Concert }) {
  return (
    <div className="card flex-1">
      {/* Tipografía de eyebrow pero SIN cian: el único acento de la sección es
          la flecha que une las dos fechas. */}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        {label}
      </p>

      {concert.date && (
        <p className="display mt-3 text-3xl leading-tight text-text-primary sm:text-4xl">
          {concert.date}
        </p>
      )}

      {concert.venue && (
        <p className="mt-3 text-lg text-text-primary">{concert.venue}</p>
      )}

      {concert.city && (
        <p className="mt-1 text-sm text-text-secondary">{concert.city}</p>
      )}
    </div>
  );
}

/**
 * Prueba de directo para quien contrata: de dónde viene y dónde está ahora.
 * Primer y último concierto unidos por una flecha, más la trayectoria.
 * Plug-and-play: sin fechas ni hitos, no renderiza nada.
 */
export function ArtistConcerts({
  firstConcert,
  lastConcert,
  milestones,
}: ArtistConcertsProps) {
  // Normalizamos a undefined lo que llegue vacío: así el narrowing es directo
  // y no hace falta ningún "!" más abajo.
  const first = hasConcertData(firstConcert) ? firstConcert : undefined;
  const last = hasConcertData(lastConcert) ? lastConcert : undefined;
  const hitos = milestones ?? [];

  // Plug-and-play: sin datos esenciales, la sección no existe
  if (!first && !last && hitos.length === 0) return null;

  const showLine = Boolean(first && last);

  return (
    <Section id="directo">
      {/* h2 real: da jerarquía a la sección y deja "Trayectoria" como h3. */}
      <RevealOnScroll as="h2" className="eyebrow">
        Sobre el escenario
      </RevealOnScroll>

      {(first || last) && (
        <RevealOnScroll as="div" delay={0.1} className="mt-8">
          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-0">
            {first && <ConcertCard label="Su primer concierto" concert={first} />}

            {/* Línea cian "de aquí hasta hoy": vertical en móvil, horizontal en desktop */}
            {showLine && (
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center self-center py-2 md:w-16 md:py-0"
              >
                {/* Móvil: flecha hacia abajo */}
                <svg
                  className="md:hidden"
                  width="16"
                  height="48"
                  viewBox="0 0 16 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 0 V40"
                    stroke="#16b6d4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.5 34.5 L8 41 L13.5 34.5"
                    stroke="#16b6d4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>

                {/* Desktop: flecha hacia la derecha */}
                <svg
                  className="hidden md:block"
                  width="64"
                  height="16"
                  viewBox="0 0 64 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8 H56"
                    stroke="#16b6d4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5 2.5 L57 8 L50.5 13.5"
                    stroke="#16b6d4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {last && <ConcertCard label="Su último concierto" concert={last} />}
          </div>
        </RevealOnScroll>
      )}

      {hitos.length > 0 && (
        <div className="mt-16">
          <RevealOnScroll as="h3" className="display text-2xl text-text-primary sm:text-3xl">
            Trayectoria
          </RevealOnScroll>

          <StaggerGroup stagger={0.08} className="mt-6">
            <ul className="divide-y divide-subtle border-y border-subtle">
              {hitos.map((m, i) => (
                <li
                  key={`${m.year}-${i}`}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="w-16 shrink-0 font-mono text-sm tabular-nums text-text-muted">
                    {m.year}
                  </span>
                  <span className="text-text-secondary">{m.text}</span>
                </li>
              ))}
            </ul>
          </StaggerGroup>
        </div>
      )}
    </Section>
  );
}
