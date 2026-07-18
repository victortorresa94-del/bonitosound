import type { Metadata } from "next";
import { BookingScene } from "@/components/artistas/BookingScene";
import { RevealOnScroll } from "@/components/motion";
import { ContactIntro, ContactFormDynamic } from "@/components/contacto/ContactPersonalized";
import { getArtists } from "@/lib/content";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Contacto — Cogemos el teléfono, no un formulario",
  description:
    "Cuéntanos tu proyecto, tu idea o lo que necesites. Te respondemos rápido, y por personas. Bonito Sound — Sabadell, Barcelona.",
  alternates: { canonical: `${site.url}/contacto` },
};

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const val = href ? (
    <a href={href} className="transition-colors hover:text-accent-cyan-text">{value}</a>
  ) : (
    value
  );
  return (
    <div className="flex items-center gap-4 border-t border-subtle py-4">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2"
        style={{ borderColor: "rgba(20,40,60,0.2)", color: NAVY }}
        aria-hidden
      >
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-text-muted">{label}</p>
        <p className="font-semibold" style={{ color: NAVY }}>{val}</p>
      </div>
    </div>
  );
}

export default function Contacto() {
  // Mapa de artistas resuelto en build; el ?a= se lee en cliente (export estático).
  const artists = getArtists().map((a) => ({ slug: a.slug, name: a.name, genre: a.genre }));

  return (
    <section style={{ backgroundColor: "#FBFAF6" }}>
      <div className="wrap py-14 md:py-20">
        {/* Hero */}
        <RevealOnScroll as="p" className="mb-5 text-sm font-bold uppercase tracking-[0.22em]">
          <span style={{ color: CYAN }}>Hablemos</span>
        </RevealOnScroll>
        <RevealOnScroll as="h1" delay={0.05} className="display leading-[0.92] text-[clamp(2.8rem,8vw,5.6rem)]">
          <span style={{ color: NAVY }}>Cogemos el teléfono,</span>
          <br />
          <span className="italic" style={{ color: CYAN }}>no un formulario</span>
        </RevealOnScroll>
        <RevealOnScroll as="p" delay={0.12} className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
          <ContactIntro artists={artists} />
        </RevealOnScroll>

        {/* Ilustración + formulario */}
        <div className="mt-12 grid items-start gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
          <RevealOnScroll className="md:sticky md:top-28">
            <BookingScene />
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <ContactFormDynamic artists={artists} />

            {/* Datos de contacto */}
            <div className="mt-8">
              <InfoRow
                label="Teléfono"
                value={site.phone}
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                }
              />
              <InfoRow
                label="Email"
                value={site.emails.general}
                href={`mailto:${site.emails.general}`}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                }
              />
              <InfoRow
                label="Ubicación"
                value={`${site.address.city}, ${site.address.region}`}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
