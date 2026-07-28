import Link from "next/link";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { resolveLogos } from "@/lib/assets";
import { trustedBy } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * "Empresas que han confiado en hacerlo bonito" — franja navy del home.
 *
 * Con ~110 logos, pintarlos todos aquí satura. La solución: los NÚMEROS venden
 * el volumen y una selección de los reconocibles pone la cara. El listado
 * completo vive en /clientes.
 *
 * Sin marquee a propósito: el home ya tiene dos (BrandsBand y ArtistsBand).
 */
export function TrustedWall() {
  const clientes = trustedBy.filter((c) => c.id !== "proveedores");
  const total = clientes.reduce((n, c) => n + c.items.length, 0);

  // Los destacados de cada categoría, mezclados a propósito (marca + festival +
  // institución + ayuntamiento) para que se vea la variedad de un vistazo.
  const featured = clientes.flatMap((c) =>
    resolveLogos(c.dir, c.featured ?? []).map((l) => ({ ...l, cat: c.id })),
  );

  if (total === 0) return null;

  return (
    <section aria-label="Empresas que han confiado en Bonito Sound" style={{ backgroundColor: NAVY }}>
      <div className="wrap py-16 md:py-24">
        <RevealOnScroll as="p" className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" >
          <span style={{ color: CYAN }}>Confían en nosotros</span>
        </RevealOnScroll>
        <RevealOnScroll
          as="h2"
          delay={0.05}
          className="display max-w-3xl text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-white"
        >
          Empresas que han confiado en{" "}
          <span style={{ color: CYAN }}>hacerlo bonito</span>.
        </RevealOnScroll>

        {/* Los números primero: cuentan el volumen sin pintar 110 logos. */}
        <StaggerGroup
          stagger={0.08}
          className="mt-10 flex flex-wrap gap-x-12 gap-y-6 md:mt-12"
        >
          {clientes.map((c) => (
            <div key={c.id}>
              <p className="font-round text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-none" style={{ color: CYAN }}>
                {c.items.length}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                {c.label}
              </p>
            </div>
          ))}
        </StaggerGroup>

        {/* Una muestra con cara: chips blancos, sin filtros (aguantan cualquier logo). */}
        {featured.length > 0 && (
          <StaggerGroup stagger={0.04} className="mt-12 flex flex-wrap items-center gap-3">
            {featured.map((l) => (
              <span
                key={`${l.cat}-${l.slug}`}
                className="flex h-14 items-center justify-center rounded-xl bg-white px-5"
              >
                {l.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={l.src}
                    alt={l.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 w-auto max-w-[130px] object-contain"
                  />
                ) : (
                  <span className="text-sm font-bold" style={{ color: NAVY }}>
                    {l.name}
                  </span>
                )}
              </span>
            ))}
          </StaggerGroup>
        )}

        <RevealOnScroll className="mt-10" delay={0.2}>
          <Link
            href="/clientes"
            className="text-sm font-bold text-white underline-offset-4 transition-colors hover:underline"
            style={{ color: CYAN }}
          >
            Verlos todos ({total}) →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
