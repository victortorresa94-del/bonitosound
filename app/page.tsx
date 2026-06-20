import fs from "node:fs";
import path from "node:path";
import { HeroRigged } from "@/components/home/HeroRigged";
import { HeroVideo } from "@/components/home/HeroVideo";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { scenes } from "@/lib/home";

/** Cuando es true, el hero usa el personaje vectorial animado por partes
 *  aunque exista /video/home/hero.mp4. Se cambia a false si en el futuro
 *  queremos volver al vídeo IA. */
const PREFER_HERO_RIG = false;

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
  const useRig = PREFER_HERO_RIG || !heroVideo;

  const resolved = scenes.map((scene) => ({
    scene,
    media: firstExisting(scene.mediaCandidates),
  }));

  return (
    <>
      {useRig ? <HeroRigged /> : heroVideo ? <HeroVideo src={heroVideo} /> : <HeroRigged />}

      {resolved.map(({ scene, media }, i) => (
        <NarrativeScene key={scene.id} scene={scene} media={media} index={i} />
      ))}
    </>
  );
}
