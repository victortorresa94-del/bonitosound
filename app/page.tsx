import fs from "node:fs";
import path from "node:path";
import { HeroImage } from "@/components/home/HeroImage";
import { HomeProof } from "@/components/home/HomeProof";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { scenes } from "@/lib/home";

const HERO_IMAGE = "/img/marca/superheroe-home.png";

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

  return (
    <>
      <HeroImage src={HERO_IMAGE} />

      <HomeProof />

      {resolved.map(({ scene, media }, i) => (
        <NarrativeScene
          key={scene.id}
          scene={scene}
          media={media}
          index={i}
          total={resolved.length}
        />
      ))}
    </>
  );
}
