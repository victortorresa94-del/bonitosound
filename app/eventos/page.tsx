import type { Metadata } from "next";
import { EventosHero } from "@/components/eventos/EventosHero";
import { EventosShowcase } from "@/components/eventos/EventosShowcase";
import { EventosOutro } from "@/components/eventos/EventosOutro";
import { getEventos } from "@/lib/content";
import { brands, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eventos — Activaciones para marcas y giras",
  description:
    "Productora de eventos musicales: activaciones de marca y tour management. Del brief al titular, con un solo equipo.",
  alternates: { canonical: `${site.url}/eventos` },
};

export default function Eventos() {
  const eventos = getEventos();
  return (
    <div style={{ backgroundColor: "#FBFAF6" }}>
      {/* Rediseño calcado del mockup: banda superior + showcase asimétrico + cierre. */}
      <EventosHero />
      <EventosShowcase eventos={eventos} />
      <EventosOutro brands={brands} />
    </div>
  );
}
