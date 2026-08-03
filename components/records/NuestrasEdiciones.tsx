import Link from "next/link";
import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup, SplitTextReveal } from "@/components/motion";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

type Edicion = {
  artist: string;
  slug?: string; // ficha interna si está en el roster
  title: string;
  year?: string;
  kind: "Álbum" | "EP" | "Single";
  spotify?: string; // ID de artista para el enlace a Spotify
};

// Ediciones REALES verificadas desde las fichas del roster. Nada inventado:
// si un dato (año) no está confirmado, no se pone. Ampliable a medida que se
// confirmen más lanzamientos del catálogo (+150 desde 2022).
const EDICIONES: Edicion[] = [
  { artist: "Eva Calyza", slug: "eva-calyza", title: "MARCA DIVINA", year: "2025", kind: "Álbum", spotify: "6rUgNfaBgUk0WCQbNafgKh" },
  { artist: "Eva Calyza", slug: "eva-calyza", title: "Afilá", year: "2023", kind: "EP", spotify: "6rUgNfaBgUk0WCQbNafgKh" },
  { artist: "Egon Calle", slug: "egon-calle", title: "Las Flores Cortadas", year: "2022", kind: "EP", spotify: "73GXtlzsrh32dnAiAO2xpO" },
  { artist: "Egon Calle", slug: "egon-calle", title: "Llegar a España", kind: "Single", spotify: "73GXtlzsrh32dnAiAO2xpO" },
  { artist: "D Nácar × Marco la Testa", slug: "d-nacar", title: "1 Feeling (Remix)", kind: "Single", spotify: "5KYVUnPDSlv6g86mQ0EBsp" },
  { artist: "Dulze", slug: "dulze", title: "Si Pudiera Elegir", kind: "Single" },
];

/**
 * "Nuestras ediciones": muestra que el sello es un catálogo real, no una
 * promesa. Encabeza con el dato verificable (+150 lanzamientos desde 2022) y
 * lista ediciones concretas del roster, cada una enlazada a su ficha y a
 * Spotify. Solo datos confirmados; el bloque crece a medida que se confirmen más.
 */
export function NuestrasEdiciones() {
  const locale = serverLocale();
  return (
    <Section className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow mb-4">
        {tr(locale, "Nuestras ediciones")}
      </RevealOnScroll>
      <SplitTextReveal as="h2" split="lines" className="display text-[clamp(2rem,5vw,3.6rem)]">
        {tr(locale, "Más de 150 lanzamientos desde 2022.")}
      </SplitTextReveal>
      <RevealOnScroll as="p" className="mt-4 max-w-2xl text-lg text-text-secondary" delay={0.15}>
        {tr(locale, "El sello no es una promesa: es un catálogo. Estas son algunas de las ediciones que han salido con nosotros — del máster a las plataformas.")}
      </RevealOnScroll>

      <StaggerGroup stagger={0.06} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EDICIONES.map((e) => {
          const inner = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide"
                  style={{ backgroundColor: CYAN, color: NAVY }}
                >
                  {e.kind}
                </span>
                {e.year && <span className="text-xs font-semibold text-text-muted">{e.year}</span>}
              </div>
              <p className="mt-4 font-round text-xl font-bold leading-tight" style={{ color: NAVY }}>
                {e.title}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{e.artist}</p>
              {e.spotify && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: "#0f7a37" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.213c3.809-.871 7.076-.496 9.712 1.114a.623.623 0 0 1 .207.856Zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 1 1-.452-1.49c3.632-1.102 8.147-.568 11.232 1.327a.779.779 0 0 1 .257 1.072Zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 1 1-.956 1.608Z" />
                  </svg>
                  {tr(locale, "Escuchar")}
                </span>
              )}
            </>
          );
          return e.slug ? (
            <Link
              key={`${e.slug}-${e.title}`}
              href={`/artistas/${e.slug}`}
              className="group block rounded-2xl border border-subtle bg-bg-tertiary p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-18px_rgba(20,40,60,0.4)]"
            >
              {inner}
            </Link>
          ) : (
            <div key={e.title} className="rounded-2xl border border-subtle bg-bg-tertiary p-5">
              {inner}
            </div>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
