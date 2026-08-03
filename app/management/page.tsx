import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { ArtistFeatureCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const s = services.management;
export function generateMetadata(): Metadata {
  return {
  title: `${s.eyebrow} — Bonito Sound`,
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
          h2={tr(locale, "A N\u00e0tura la lleva una persona, no un buz\u00f3n.")}
          body={tr(locale, "Management personal: estrategia, calendario y las decisiones que importan, con un interlocutor que coge el tel\u00e9fono. Booking, records y editorial en la misma casa, as\u00ed que nadie va rebotando entre empresas.")}
          slug="natura"
          spotifyId="07Epl3n2QMYOUTYqZNfj3F"
        />
      }
    />
  );
}
