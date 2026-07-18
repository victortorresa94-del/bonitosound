import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { ArtistFeatureCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const s = services.sello;
export const metadata: Metadata = {
  title: "Sello discográfico independiente en España",
  description: s.desc,
  alternates: { canonical: `${site.url}${s.path}` },
};

export default function Page() {
  return (
    <ServicePage
      service={s}
      caseSlot={
        <ArtistFeatureCase
          eyebrow="Un ejemplo"
          h2="MARCA DIVINA, de Eva Calyza."
          body="El primer álbum de Eva Calyza — diez canciones que fusionan folclore andaluz y electrónica oscura — se produjo con nosotros y salió en 2025. Del máster a la calle, con criterio."
          slug="eva-calyza"
          spotifyId="6rUgNfaBgUk0WCQbNafgKh"
        />
      }
    />
  );
}
