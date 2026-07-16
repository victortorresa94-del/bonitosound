import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { RosterGridCase } from "@/components/services/cases";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const s = services.booking;
export const metadata: Metadata = {
  title: `${s.eyebrow} — Bonito Sound`,
  description: s.desc,
  alternates: { canonical: `${site.url}${s.path}` },
};

export default function Page() {
  return <ServicePage service={s} caseSlot={<RosterGridCase />} />;
}
