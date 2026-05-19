import type { Metadata } from "next";
import { Section, Heading, Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Bonito Sound. Marcas, artistas, promotores y prensa. Sabadell, Barcelona.",
  alternates: { canonical: `${site.url}/contacto` },
};

export default function Contacto() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Contacto</Eyebrow>
            <Heading as="h1">Cuéntanoslo. Te contestamos nosotros.</Heading>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-3">Dónde estamos</p>
              <p className="text-text-secondary">
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}, {site.address.region}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Directo</p>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a
                    className="link-underline"
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                  >
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href={`mailto:${site.emails.general}`}
                  >
                    {site.emails.general}
                  </a>{" "}
                  <span className="text-text-muted">general</span>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href={`mailto:${site.emails.booking}`}
                  >
                    {site.emails.booking}
                  </a>{" "}
                  <span className="text-text-muted">booking</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Redes</p>
              <ul className="space-y-2 text-text-secondary">
                <li>
                  <a
                    className="link-underline"
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram @bonito_sound
                  </a>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
