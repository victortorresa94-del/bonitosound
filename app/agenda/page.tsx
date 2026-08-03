import type { Metadata } from "next";
import { Section, Cta, JsonLd } from "@/components/ui";
import { RevealOnScroll, SplitTextReveal, MagneticButton } from "@/components/motion";
import { getShows } from "@/lib/agenda";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { tr } from "@/lib/copy-ca";

export function generateMetadata(): Metadata {
  return {
  title: "Agenda — Próximos shows del roster",
  description:
    "Próximos conciertos de los artistas de Bonito Sound. Filtra por artista, mes y ciudad.",
  alternates: alternatesFor(`/agenda`),
  // Sin shows poblados: no indexar hasta que la agenda tenga fechas reales.
  robots: { index: false, follow: true },
  };
}

/** La fecha se escribe en el idioma de la página. */
function formateador(locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ca" ? "ca-ES" : "es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Agenda() {
  const locale = serverLocale();
  const fmt = formateador(locale);
  const shows = getShows();

  return (
    <>
      {shows.map((s) => (
        <JsonLd
          key={s.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: `${s.artist} en ${s.city}`,
            startDate: s.date,
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: s.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: s.city,
                addressCountry: "ES",
              },
            },
            performer: { "@type": "MusicGroup", name: s.artist },
            organizer: { "@type": "Organization", name: site.legalName },
            ...(s.ticketsUrl ? { offers: { "@type": "Offer", url: s.ticketsUrl } } : {}),
          }}
        />
      ))}

      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="max-w-3xl">
            <RevealOnScroll as="p" className="eyebrow mb-4">Agenda</RevealOnScroll>
            <SplitTextReveal as="h1" split="lines" className="display text-[clamp(2.6rem,7vw,5.4rem)]">
              {tr(locale, "Dónde estamos sonando.")}
            </SplitTextReveal>
          </div>
        </div>
      </section>

      <Section>
        {shows.length === 0 ? (
          <div className="rounded-3xl border border-subtle bg-bg-primary p-12 text-center">
            <SplitTextReveal as="h3" split="lines" className="display text-[clamp(2rem,4.5vw,3.4rem)]">
              {tr(locale, "Agenda en construcción.")}
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mx-auto mt-4 max-w-lg text-text-secondary" delay={0.2}>
              {tr(locale, "Estamos cerrando las próximas fechas. Si quieres a alguien del roster en tu sala o festival, no esperes a la agenda: escríbenos.")}
            </RevealOnScroll>
            <RevealOnScroll className="mt-8 flex justify-center" delay={0.35}>
              <MagneticButton strength={0.35}>
                <Cta href={`mailto:${site.emails.booking}?subject=Booking`}>
                  Contactar booking →
                </Cta>
              </MagneticButton>
            </RevealOnScroll>
          </div>
        ) : (
          <ul className="divide-y divide-subtle border-y border-subtle">
            {shows.map((s) => (
              <li
                key={s.slug}
                className="flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="display text-2xl">{s.artist}</p>
                  <p className="text-sm text-text-muted">
                    {s.venue} · {s.city}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-text-secondary">
                    {fmt.format(new Date(s.date))}
                  </span>
                  {s.ticketsUrl && (
                    <Cta href={s.ticketsUrl} variant="ghost">
                      {tr(locale, "Entradas →")}
                    </Cta>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
