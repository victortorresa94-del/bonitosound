import type { Metadata } from "next";
import { Section, Heading, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  robots: { index: false },
  alternates: { canonical: `${site.url}/privacidad` },
};

export default function Privacidad() {
  return (
    <Section>
      <Eyebrow>Legal</Eyebrow>
      <Heading as="h1">Política de privacidad</Heading>
      <div className="mt-8 max-w-2xl space-y-4 text-text-secondary">
        <p>
          Responsable del tratamiento: {site.legalName} (CIF {site.cif}).
        </p>
        <p>
          Los datos que nos facilites a través de los formularios se usan solo
          para responderte y gestionar tu solicitud. No los vendemos ni los
          cedemos a terceros.
        </p>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación y supresión
          escribiendo a {site.emails.general}.
        </p>
        <p className="text-sm text-text-muted">
          Política RGPD completa pendiente de revisión jurídica antes del
          go-live.
        </p>
      </div>
    </Section>
  );
}
