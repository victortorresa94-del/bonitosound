import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const s = services.producciones;
export const metadata: Metadata = {
  title: `${s.eyebrow} — Bonito Sound`,
  description: s.desc,
  alternates: { canonical: `${site.url}${s.path}` },
};

// Sin caseSlot: los casos en vídeo, los números y el muro de marcas los pinta
// ServicePage desde lib/servicesDetail.ts (producciones).
export default function Page() {
  return <ServicePage service={s} />;
}
