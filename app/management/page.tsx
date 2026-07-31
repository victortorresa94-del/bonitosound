import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { ArtistFeatureCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const s = services.management;
export const metadata: Metadata = {
  title: `${s.eyebrow} — Bonito Sound`,
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
          h2="A Nàtura la lleva una persona, no un buzón."
          body="Management personal: estrategia, calendario y las decisiones que importan, con un interlocutor que coge el teléfono. Booking, records y editorial en la misma casa, así que nadie va rebotando entre empresas."
          slug="natura"
          spotifyId="07Epl3n2QMYOUTYqZNfj3F"
        />
      }
    />
  );
}
