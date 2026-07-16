import Link from "next/link";
import { Section, Cta } from "@/components/ui";
import { RevealOnScroll, MagneticButton } from "@/components/motion";

/**
 * Cierre de la ficha de artista: booking + seguir + volver al roster.
 * Plug-and-play: sin nombre o sin email de booking no renderiza nada.
 */
export function ArtistCTA({
  name,
  bookingEmail,
  instagram,
  slug,
}: {
  name: string;
  bookingEmail: string;
  instagram?: string;
  slug: string;
}) {
  // Datos esenciales: sin ellos el bloque no tiene sentido.
  const nombre = name?.trim();
  const email = bookingEmail?.trim();
  if (!nombre || !email) return null;

  // El IG puede llegar vacío desde el frontmatter ("").
  const ig = instagram?.trim();

  // Cuerpo pre-rellenado con lo que pide el copy: filtra leads y evita el
  // "hola, info?" sin contexto.
  const asunto = `Booking ${nombre}`;
  const cuerpo = `Hola, os escribo por ${nombre}.

Fecha:
Sitio:
Qué tengo en mente:`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    asunto
  )}&body=${encodeURIComponent(cuerpo)}`;

  return (
    <Section id={slug ? `booking-${slug}` : "booking"}>
      <div className="rounded-3xl border border-subtle bg-bg-secondary px-6 py-14 text-center sm:px-8 md:py-20">
        <RevealOnScroll as="p" className="eyebrow">
          Booking
        </RevealOnScroll>

        <RevealOnScroll
          as="h2"
          delay={0.05}
          className="display mx-auto mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-text-primary"
        >
          Hablemos de <span className="text-[#16b6d4]">{nombre}</span>.
        </RevealOnScroll>

        <RevealOnScroll
          as="p"
          delay={0.12}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
        >
          Cuéntanos fecha, sitio y qué tienes en mente. Te contamos disponibilidad
          y cómo montarlo, sin vueltas.
        </RevealOnScroll>

        <RevealOnScroll
          delay={0.18}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <Cta href={mailto} variant="primary">
              Contratar a {nombre} →
            </Cta>
          </MagneticButton>

          {ig && (
            <MagneticButton strength={0.3}>
              <Cta href={ig} variant="ghost" external>
                Síguele en Instagram
              </Cta>
            </MagneticButton>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.24} className="mt-8">
          <Link
            href="/artistas"
            className="text-sm font-semibold text-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            Ver todo el roster →
          </Link>
        </RevealOnScroll>
      </div>
    </Section>
  );
}
