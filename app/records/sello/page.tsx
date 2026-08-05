import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { ArtistFeatureCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const s = services.sello;
export function generateMetadata(): Metadata {
  return {
  title: "Sello discográfico independiente en España",
  description: s.desc,
  alternates: alternatesFor(`${s.path}`),
  };
}

export default function Page() {
  const locale = serverLocale();
  return (
    <ServicePage
      service={s}
      caseSlot={
        <ArtistFeatureCase
          eyebrow={tr(locale, "Un ejemplo")}
          h2={tr(locale, "MARCA DIVINA, de Eva Calyza.")}
          body={tr(locale, "El primer \u00e1lbum de Eva Calyza \u2014 diez canciones que fusionan folclore andaluz y electr\u00f3nica oscura \u2014 se produjo con nosotros y sali\u00f3 en 2025. Del m\u00e1ster a la calle, con criterio.")}
          slug="eva-calyza"
          spotifyId="6rUgNfaBgUk0WCQbNafgKh"
        />
      }
    />
  );
}
