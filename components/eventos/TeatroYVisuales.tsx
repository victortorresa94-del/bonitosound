import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { findAsset } from "@/lib/assets";
import Image from "next/image";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * "No todo es música": teatro y espectáculos visuales (mapping). Datos reales
 * aportados por Dani. Las fotos/vídeos de mapping aún no están: mientras, el
 * bloque se sostiene con tipografía + un patrón navy (nunca un hueco vacío).
 */
const TEATRO = [
  { title: "Dumbo", tour: "Gira verano 2023", shows: "8 actuaciones" },
  { title: "El Rey León", tour: "Gira verano 2022", shows: "8 actuaciones" },
  { title: "Pinocho", tour: "Gira invierno 2022", shows: "3 actuaciones" },
];

export function TeatroYVisuales() {
  const mappingImg = findAsset("experiencias", "mapping");

  return (
    <Section id="teatro-visuales">
      {/* ---- Teatro ---- */}
      <RevealOnScroll as="p" className="eyebrow mb-4">
        No todo es música
      </RevealOnScroll>
      <RevealOnScroll
        as="h2"
        delay={0.05}
        className="display max-w-3xl text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05]"
      >
        También trabajamos para <span style={{ color: CYAN }}>teatro</span> y
        espectáculos visuales.
      </RevealOnScroll>

      <StaggerGroup stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
        {TEATRO.map((t) => (
          <div
            key={t.title}
            className="rounded-2xl border border-subtle p-6 transition-colors duration-300 hover:border-text-primary/25"
          >
            <h3 className="display text-xl leading-tight" style={{ color: NAVY }}>
              {t.title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">{t.tour}</p>
            <p className="mt-1 font-mono text-xs tabular-nums text-text-muted">
              {t.shows}
            </p>
          </div>
        ))}
      </StaggerGroup>

      {/* ---- Espectáculos visuales / mapping ---- */}
      <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-[1fr_1fr] md:items-center md:gap-14">
        <RevealOnScroll>
          <p className="eyebrow mb-4">Espectáculos visuales</p>
          <h3 className="display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.06]">
            Convertimos una fachada en un{" "}
            <span style={{ color: CYAN }}>espectáculo</span>.
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            Especialistas en producción de mapping, instalaciones de luz y
            experiencias visuales para eventos y marcas. Transformamos fachadas,
            espacios urbanos y escenarios en espectáculos únicos mediante
            tecnología, creatividad e innovación.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.12}>
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            style={{ backgroundColor: NAVY }}
          >
            {mappingImg ? (
              <Image
                src={mappingImg}
                alt="Proyección de mapping en una fachada"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              // Fallback con carácter mientras no haya foto de mapping.
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <div>
                  <svg viewBox="0 0 120 80" className="mx-auto h-20 w-28" fill="none" aria-hidden>
                    <rect x="10" y="14" width="100" height="52" rx="3" stroke={CYAN} strokeWidth="2.5" />
                    <path d="M22 66 V30 M40 66 V22 M58 66 V34 M76 66 V24 M94 66 V38" stroke={CYAN} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                    <path d="M4 74 L60 40 L116 74" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Mapping
                  </p>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
