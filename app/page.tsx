import fs from "node:fs";
import path from "node:path";
import { Fragment } from "react";
import { HeroVideo } from "@/components/home/HeroVideo";
import { ArtistsBand } from "@/components/home/HomeProof";
import { TrustedWall } from "@/components/home/TrustedWall";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { PresentacionVideo } from "@/components/home/PresentacionVideo";
import { InstitutionalStrip } from "@/components/home/InstitutionalStrip";
import { scenes } from "@/lib/home";
import { alternatesFor } from "@/lib/seo";
import type { Metadata } from "next";

/** El home hereda del layout todo menos la canónica, que aquí es
 *  autorreferente por idioma y lleva su par de hreflang. */
export function generateMetadata(): Metadata {
  return { alternates: alternatesFor("/") };
}

const HERO_VIDEO = "/video/home/hero.mp4";
const HERO_POSTER = "/img/marca/hero-poster.webp";

/** Primer candidato de /public que existe en disco (o null). */
function firstExisting(candidates: string[] | undefined): string | null {
  if (!candidates) return null;
  for (const rel of candidates) {
    const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    if (fs.existsSync(abs)) return rel;
  }
  return null;
}

export default function HomePage() {
  const resolved = scenes.map((scene) => ({
    scene,
    media: firstExisting(scene.mediaCandidates),
  }));

  // El hero cuenta como el primer paso del recorrido (01), así que el
  // contador editorial de cada escena se desplaza +1 y el total también.
  const total = resolved.length + 1;

  return (
    <>
      <HeroVideo src={HERO_VIDEO} poster={HERO_POSTER} />

      {resolved.map(({ scene, media }, i) => (
        <Fragment key={scene.id}>
          <NarrativeScene
            scene={scene}
            media={media}
            index={i}
            total={total}
            displayIndex={i + 2}
          />
          {scene.id === "marketing" && <PresentacionVideo />}
          {scene.id === "tecnologia" && <InstitutionalStrip />}
          {scene.id === "marcas" && <TrustedWall />}
          {scene.id === "giras" && <ArtistsBand />}
        </Fragment>
      ))}
    </>
  );
}
