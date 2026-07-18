import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";

const CYAN = "#16b6d4";

type Extra = { label: string; url: string; kind?: string; source?: string };

/** Icono según el tipo de recurso. */
function Glyph({ kind }: { kind?: string }) {
  if (kind === "prensa") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 4h13v16H6a2 2 0 0 1-2-2V4Z" />
        <path d="M17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h5" />
      </svg>
    );
  }
  if (kind === "web") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  );
}

/**
 * "Más de X": recursos extra que tengamos del artista (prensa, web oficial,
 * enlaces). Cada uno abre en su sitio. Si no hay extras, no se pinta.
 */
export function ArtistExtras({ name, extras }: { name: string; extras?: Extra[] }) {
  const items = (extras ?? []).filter((e) => e?.label && e?.url);
  if (items.length === 0) return null;

  return (
    <Section id="mas" className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow mb-4">Recursos</RevealOnScroll>
      <RevealOnScroll as="h2" delay={0.05} className="display text-[clamp(1.8rem,4vw,3rem)]">
        Más de <span style={{ color: CYAN }}>{name}</span>
      </RevealOnScroll>

      <StaggerGroup stagger={0.07} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => (
          <a
            key={e.url}
            href={e.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-center gap-4 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-cyan/10 text-text-primary transition-colors group-hover:bg-accent-cyan/20">
              <Glyph kind={e.kind} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-round text-base font-bold text-text-primary transition-colors group-hover:text-accent-cyan">{e.label}</span>
              {e.source && <span className="block truncate text-xs text-text-muted">{e.source}</span>}
            </span>
            <span className="ml-auto text-accent-cyan transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </a>
        ))}
      </StaggerGroup>
    </Section>
  );
}
