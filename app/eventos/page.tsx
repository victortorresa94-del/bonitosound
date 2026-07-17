import type { Metadata } from "next";
import { EventosHero } from "@/components/eventos/EventosHero";
import { EventosShowcase } from "@/components/eventos/EventosShowcase";
import { EventosArtistasShowcase } from "@/components/eventos/EventosArtistasShowcase";
import { EventosBento } from "@/components/eventos/EventosBento";
import { EventosBrands } from "@/components/eventos/EventosBrands";
import { EventosOutro } from "@/components/eventos/EventosOutro";
import { getEventos } from "@/lib/content";
import { site } from "@/lib/site";

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
      {/* Orden: banda superior + showcase + marcas (marca por marca) + más vídeos + cierre. */}
      <EventosHero />
      <EventosShowcase eventos={eventos} />
      <EventosArtistasShowcase eventos={eventos} />
      <EventosBrands eventos={eventos} />
      <EventosBento eventos={eventos} />
      <EventosOutro />
    </div>
  );
}
