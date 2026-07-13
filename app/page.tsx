import fs from "node:fs";
import path from "node:path";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HomeProof } from "@/components/home/HomeProof";
import { HomeProcess } from "@/components/home/HomeProcess";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { scenes } from "@/lib/home";

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

  // "Cómo trabajamos" va después de las escenas de servicio y antes del cierre
  // (landing-anatomy). Separamos la escena de cierre para intercalar el proceso.
  const closingIdx = resolved.findIndex(({ scene }) => scene.id === "cierre");
  const bodyScenes = closingIdx === -1 ? resolved : resolved.slice(0, closingIdx);
  const closingScenes = closingIdx === -1 ? [] : resolved.slice(closingIdx);

  return (
    <>
      <HeroVideo src={HERO_VIDEO} poster={HERO_POSTER} />

      <HomeProof />

      {bodyScenes.map(({ scene, media }, i) => (
        <NarrativeScene
          key={scene.id}
          scene={scene}
          media={media}
          index={i}
          total={resolved.length}
        />
      ))}

      <HomeProcess />

      {closingScenes.map(({ scene, media }, i) => (
        <NarrativeScene
          key={scene.id}
          scene={scene}
          media={media}
          index={closingIdx + i}
          total={resolved.length}
        />
      ))}
    </>
  );
}
