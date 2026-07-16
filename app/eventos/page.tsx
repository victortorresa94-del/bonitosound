import type { Metadata } from "next";
import { EventosHero } from "@/components/eventos/EventosHero";
import { EventosBento } from "@/components/eventos/EventosBento";
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
    <>
      {/* Diseño roto/asimétrico (mockup validado): Hero+Stats → Bento → Cierre. */}
      <EventosHero />
      <EventosBento eventos={eventos} />
      <EventosOutro brands={brands} />
    </>
  );
}
