import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DistribucionCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const s = services.distribucion;
export const metadata: Metadata = {
  title: "Distribución musical para artistas — Spotify, Apple Music y más",
  description:
    "Distribuye tu música en Spotify, Apple Music, YouTube y todas las plataformas, con los metadatos en orden y gente del sector detrás. Tu música sigue siendo tuya. Ya distribuyen unos veinte artistas con Bonito Sound.",
  alternates: { canonical: `${site.url}${s.path}` },
};

export default function Page() {
  return <ServicePage service={s} caseSlot={<DistribucionCase />} />;
}
