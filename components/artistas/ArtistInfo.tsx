import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { ServiceIcon, type IconName } from "@/components/services/ServiceIcon";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const CYAN = "#16b6d4";
const NAVY = "#14283C";

// Servicio de Bonito → su iconito. Se normaliza (minúsculas, sin tildes).
const SERVICE_ICON: Record<string, IconName> = {
  booking: "calendario",
  management: "management",
  distribucion: "distribucion",
  sello: "disco",
  editorial: "derechos",
  marketing: "megafono",
  producciones: "escenario",
};
function iconFor(s: string): IconName {
  const key = s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return SERVICE_ICON[key] ?? "disco";
}
const PARRAFO = "text-pretty text-lg leading-relaxed text-text-secondary";
const ENTRADA = `${PARRAFO} md:text-xl md:leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[3.2rem] first-letter:leading-[0.78] first-letter:text-[#14283C] md:first-letter:text-[3.8rem]`;

/**
 * Bloque de información del artista, unificado y a dos columnas:
 *  - Izquierda: su historia (bio larga, formato reportaje).
 *  - Derecha: trayectoria (si hay), qué hacemos con Bonito (servicios) y estilos.
 * La foto NO va aquí (ya está en el hero). Cada sub-bloque de la derecha se
 * pinta solo si hay dato.
 */
export function ArtistInfo({
  name,
  bio,
  milestones,
  services,
  influences,
}: {
  name: string;
  bio: string[];
  milestones?: { year: string; text: string }[];
  services?: string[];
  influences?: string[];
}) {
  const locale = serverLocale();
  const paras = (bio ?? []).filter((p) => p && p.trim().length > 0);
  const miles = (milestones ?? []).filter((m) => m?.year && m?.text);
  const servs = (services ?? []).map((s) => s?.trim()).filter(Boolean) as string[];
  const styles = Array.from(new Set((influences ?? []).map((t) => t?.trim()).filter(Boolean) as string[]));

  const hasRight = miles.length > 0 || servs.length > 0 || styles.length > 0;
  if (paras.length === 0 && !hasRight) return null;

  return (
    <Section id="historia">
      <div className={`grid gap-10 ${hasRight ? "md:grid-cols-[1.25fr_0.75fr] md:gap-14" : ""}`}>
        {/* IZQUIERDA — su historia */}
        <div>
          <RevealOnScroll as="p" className="eyebrow mb-6">Su historia</RevealOnScroll>
          <h2 className="sr-only">La historia de {name}</h2>
          <StaggerGroup stagger={0.08} className="max-w-2xl space-y-6">
            {paras.map((p, i) => (
              <p key={i} className={i === 0 ? ENTRADA : PARRAFO}>{p}</p>
            ))}
          </StaggerGroup>
        </div>

        {/* DERECHA — trayectoria + Con Bonito + estilos */}
        {hasRight && (
          <RevealOnScroll delay={0.1} className="space-y-9 md:border-l md:border-subtle md:pl-10">
            {miles.length > 0 && (
              <div>
                <p className="eyebrow mb-5">Trayectoria</p>
                {/* Timeline: línea vertical + puntos cian. */}
                <ol className="relative space-y-5 border-l-2 pl-6" style={{ borderColor: "rgba(20,40,60,0.12)" }}>
                  {miles.map((m) => (
                    <li key={`${m.year}-${m.text}`} className="relative">
                      <span
                        className="absolute top-1.5 h-3 w-3 rounded-full ring-4 ring-bg-primary"
                        style={{ left: "-1.85rem", backgroundColor: CYAN }}
                      />
                      <p className="font-mono text-xs font-bold tabular-nums" style={{ color: NAVY }}>{m.year}</p>
                      <p className="mt-0.5 text-sm leading-snug text-text-secondary">{m.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {servs.length > 0 && (
              <div>
                <p className="eyebrow mb-4">{tr(locale, "Con Bonito")}</p>
                {/* Chips navy con el iconito de cada servicio (icono blanco,
                    acento cian) — juega con el azul oscuro de la marca. */}
                <div className="flex flex-wrap gap-2.5">
                  {servs.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white [&_svg]:h-4 [&_svg]:w-4"
                      style={{ backgroundColor: NAVY }}
                    >
                      <ServiceIcon name={iconFor(s)} className="text-white" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {styles.length > 0 && (
              <div>
                <p className="eyebrow mb-4">Estilos</p>
                <div className="flex flex-wrap gap-2">
                  {styles.map((t) => (
                    <span key={t} className="rounded-full border border-subtle px-3.5 py-1.5 text-sm text-text-secondary">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </RevealOnScroll>
        )}
      </div>
    </Section>
  );
}
