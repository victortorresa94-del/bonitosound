import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealOnScroll } from "@/components/motion";
import { BookingForm } from "@/components/artistas/BookingForm";
import { BookingScene } from "@/components/artistas/BookingScene";
import { getArtist, getArtists } from "@/lib/content";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function generateStaticParams() {
  return getArtists().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getArtist(params.slug);
  if (!a) return {};
  return {
    title: `Contratar a ${a.name}`,
    description: `Cuéntanos el bolo para ${a.name}: fecha, sitio y qué tienes en mente. Te decimos disponibilidad y cómo montarlo.`,
    alternates: { canonical: `${site.url}/contratar/${a.slug}` },
    // Página de captación por artista: no queremos que compita en el índice con
    // la ficha; es una herramienta, no contenido.
    robots: { index: false, follow: true },
  };
}

export default function ContratarPage({
  params,
}: {
  params: { slug: string };
}) {
  const a = getArtist(params.slug);
  if (!a) notFound();

  return (
    <section style={{ backgroundColor: "#FBFAF6" }}>
      <div className="wrap py-16 md:py-24">
        {/* volver a la ficha */}
        <RevealOnScroll as="div">
          <Link
            href={`/artistas/${a.slug}`}
            className="text-sm font-semibold text-text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            ← Volver a {a.name}
          </Link>
        </RevealOnScroll>

        <div className="mt-8 grid items-start gap-12 md:mt-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          {/* Columna izquierda: mensaje + ilustración (el "rollo") */}
          <div className="md:sticky md:top-28">
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Booking
            </RevealOnScroll>
            <RevealOnScroll
              as="h1"
              delay={0.05}
              className="display leading-[0.95] text-[clamp(2.4rem,6vw,4.4rem)]"
            >
              <span style={{ color: NAVY }}>Hablemos de </span>
              <span style={{ color: CYAN }}>{a.name}</span>
              <span style={{ color: NAVY }}>.</span>
            </RevealOnScroll>
            <RevealOnScroll
              as="p"
              delay={0.12}
              className="mt-5 max-w-md text-base leading-relaxed text-text-secondary md:text-lg"
            >
              No es un formulario de «hola, ¿info?». Cuéntanos fecha, sitio y qué
              tienes en la cabeza, y te decimos disponibilidad y cómo montarlo —
              sin vueltas.
            </RevealOnScroll>

            <RevealOnScroll delay={0.18} className="mt-10">
              <BookingScene />
            </RevealOnScroll>

            <RevealOnScroll delay={0.24} className="mt-10 space-y-2 text-sm text-text-secondary">
              <p className="eyebrow mb-2">O directo, sin formulario</p>
              <p>
                <a className="link-underline font-semibold" href={`mailto:${site.emails.booking}`}>
                  {site.emails.booking}
                </a>
              </p>
              <p>
                <a className="link-underline font-semibold" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </p>
            </RevealOnScroll>
          </div>

          {/* Columna derecha: el formulario */}
          <RevealOnScroll delay={0.1}>
            <BookingForm artistName={a.name} artistGenre={a.genre} />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
