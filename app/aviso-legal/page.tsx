import type { Metadata } from "next";
import { Section, Heading, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  robots: { index: false },
  alternates: { canonical: `${site.url}/aviso-legal` },
};

export default function AvisoLegal() {
  return (
    <Section>
      <Eyebrow>Legal</Eyebrow>
      <Heading as="h1">Aviso legal</Heading>
      <div className="mt-8 max-w-2xl space-y-4 text-text-secondary">
        <p>
          Titular: {site.legalName}. CIF: {site.cif}. Domicilio:{" "}
          {site.address.street}, {site.address.zip} {site.address.city},{" "}
          {site.address.region}.
        </p>
        <p>
          Contacto: {site.emails.general} · {site.phone}.
        </p>
        <p>
          Actividad: actividades de grabación de sonido y edición musical (CNAE
          5920).
        </p>
        <p className="text-sm text-text-muted">
          Texto legal completo pendiente de revisión jurídica antes del go-live
          (§16 del brief: no publicar en producción sin revisión).
        </p>
      </div>
    </Section>
  );
}
