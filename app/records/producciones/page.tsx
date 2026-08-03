import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

const s = services.producciones;
export function generateMetadata(): Metadata {
  return {
  title: `${s.eyebrow} — Bonito Sound`,
  description: s.desc,
  alternates: alternatesFor(`${s.path}`),
  };
}

// Sin caseSlot: los casos en vídeo, los números y el muro de marcas los pinta
// ServicePage desde lib/servicesDetail.ts (producciones).
export default function Page() {
  return <ServicePage service={s} />;
}
