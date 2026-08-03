import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { RosterGridCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

const s = services.booking;
export function generateMetadata(): Metadata {
  return {
  title: `${s.eyebrow} — Bonito Sound`,
  description: s.desc,
  alternates: alternatesFor(`${s.path}`),
  };
}

export default function Page() {
  return <ServicePage service={s} caseSlot={<RosterGridCase />} />;
}
