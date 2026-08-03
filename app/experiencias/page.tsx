import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { EventosHero } from "@/components/eventos/EventosHero";
import { ExperienciasResumen } from "@/components/eventos/ExperienciasResumen";
import { EventosShowcase } from "@/components/eventos/EventosShowcase";
import { EventosBento } from "@/components/eventos/EventosBento";
import { EventosBrands } from "@/components/eventos/EventosBrands";
import { TeatroYVisuales } from "@/components/eventos/TeatroYVisuales";
import { EventosOutro } from "@/components/eventos/EventosOutro";
import { getEventos } from "@/lib/content";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";
import { serverLocale } from "@/lib/locale-server";
import { eventoCa } from "@/lib/content-md-ca";
import { paginaCa } from "@/lib/content-i18n";

export function generateMetadata(): Metadata {
  // En catalán manda la traducción; si faltara, se queda el castellano.
  const trad = serverLocale() === "ca" ? paginaCa("experiencias") : undefined;
  return {
  title: trad?.title ?? "Experiencias — Eventos para marcas, teatro y espectáculos visuales",
  description:
    trad?.desc ?? "Creamos y producimos experiencias de marca donde la música y las artes en vivo conectan con el público. También teatro y espectáculos visuales: mapping, luz y proyección.",
  alternates: alternatesFor(`/experiencias`),
  };
}

export default function Experiencias() {
  const locale = serverLocale();
  // Experiencias = SOLO marcas (+ teatro y visuales). Las giras y los directos
  // de artista viven ahora en /giras: aquí ya no se mezclan.
  const marcas = getEventos().map((x) => eventoCa(x, locale, "eventos")).filter((e) => e.type === "marca");

  // El resumen solo se pinta si el mp4 existe: lo genera scripts/experiencias-video.sh
  // a partir de los vídeos de evento, y no queremos un hueco si falta.
  const resumen = "/video/experiencias/resumen.mp4";
  const hayResumen = fs.existsSync(
    path.join(process.cwd(), "public", resumen.replace(/^\//, "")),
  );

  return (
    <div style={{ backgroundColor: "#FBFAF6" }}>
      {/* Orden: banda superior + showcase con el texto de experiencias +
          marca por marca + más vídeos + teatro/mapping + cierre. */}
      <EventosHero />
      {hayResumen && <ExperienciasResumen src={resumen} />}
      <EventosShowcase eventos={marcas} />
      <EventosBrands eventos={marcas} />
      <EventosBento eventos={marcas} />
      <TeatroYVisuales />
      <EventosOutro />
    </div>
  );
}
