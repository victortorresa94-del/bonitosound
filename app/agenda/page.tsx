import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta, JsonLd } from "@/components/ui";
import { getShows } from "@/lib/agenda";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agenda — Próximos shows del roster",
  description:
    "Próximos conciertos de los artistas de Bonito Sound. Filtra por artista, mes y ciudad.",
  alternates: { canonical: `${site.url}/agenda` },
};

const fmt = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function Agenda() {
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
          <div className="stagger max-w-3xl">
            <Eyebrow>Agenda</Eyebrow>
            <Heading as="h1">Dónde estamos sonando.</Heading>
          </div>
        </div>
      </section>

      <Section>
        {shows.length === 0 ? (
          <div className="rounded-3xl border border-subtle bg-bg-secondary p-12 text-center">
            <Heading as="h3">Agenda en construcción.</Heading>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Estamos cerrando las próximas fechas. Si quieres a alguien del
              roster en tu sala o festival, no esperes a la agenda: escríbenos.
            </p>
            <div className="mt-8 flex justify-center">
              <Cta href={`mailto:${site.emails.booking}?subject=Booking`}>
                Contactar booking →
              </Cta>
            </div>
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
                      Entradas →
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
