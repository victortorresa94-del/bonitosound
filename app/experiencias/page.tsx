import type { Metadata } from "next";
import { EventosHero } from "@/components/eventos/EventosHero";
import { EventosShowcase } from "@/components/eventos/EventosShowcase";
import { EventosBento } from "@/components/eventos/EventosBento";
import { EventosBrands } from "@/components/eventos/EventosBrands";
import { TeatroYVisuales } from "@/components/eventos/TeatroYVisuales";
import { EventosOutro } from "@/components/eventos/EventosOutro";
import { getEventos } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experiencias — Eventos para marcas, teatro y espectáculos visuales",
  description:
    "Creamos y producimos experiencias de marca donde la música y las artes en vivo conectan con el público. También teatro y espectáculos visuales: mapping, luz y proyección.",
  alternates: { canonical: `${site.url}/experiencias` },
};

export default function Experiencias() {
  // Experiencias = SOLO marcas (+ teatro y visuales). Las giras y los directos
  // de artista viven ahora en /giras: aquí ya no se mezclan.
  const marcas = getEventos().filter((e) => e.type === "marca");

  return (
    <div style={{ backgroundColor: "#FBFAF6" }}>
      {/* Orden: banda superior + showcase con el texto de experiencias +
          marca por marca + más vídeos + teatro/mapping + cierre. */}
      <EventosHero />
      <EventosShowcase eventos={marcas} />
      <EventosBrands eventos={marcas} />
      <EventosBento eventos={marcas} />
      <TeatroYVisuales />
      <EventosOutro />
    </div>
  );
}
