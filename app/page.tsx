import fs from "node:fs";
import path from "node:path";
import { HeroAlive } from "@/components/home/HeroAlive";
import { HeroDisplaceFilter } from "@/components/home/HeroDisplaceFilter";
import { HeroVideo } from "@/components/home/HeroVideo";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { scenes } from "@/lib/home";

/** Primer candidato de /public que existe en disco (o null). */
function firstExisting(candidates: string[] | undefined): string | null {
  if (!candidates) return null;
  for (const rel of candidates) {
    const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    if (fs.existsSync(abs)) return rel;
  }
  return null;
}

const HERO_VIDEO_PATH = "/video/home/hero.mp4";

export default function HomePage() {
  const heroVideo = firstExisting([HERO_VIDEO_PATH]);

  const resolved = scenes.map((scene) => ({
    scene,
    media: firstExisting(scene.mediaCandidates),
  }));

  return (
    <>
      {heroVideo ? (
        <HeroVideo src={heroVideo} />
      ) : (
        <>
          <HeroDisplaceFilter />
          <HeroAlive />
        </>
      )}

      {resolved.map(({ scene, media }, i) => (
        <NarrativeScene key={scene.id} scene={scene} media={media} index={i} />
      ))}
    </>
  );
}
