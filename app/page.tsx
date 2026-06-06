import fs from "node:fs";
import path from "node:path";
import { HeroVideo } from "@/components/home/HeroVideo";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { heroVideo, scenes } from "@/lib/home";

/**
 * HOME narrativa. Una idea por escena, scroll que presenta lo que hacemos en
 * lenguaje natural. La home no lo cuenta todo: invita a descubrir (el roster,
 * los números, el equipo, las marcas… viven en las páginas internas).
 *
 * Referencia de craft: hellomonday.com — slab serif editorial, movimiento con
 * propósito, mucho aire. El contenido se edita en lib/home.ts sin tocar esto.
 */

/** Primer candidato de /public que existe en disco (o null). Resuelto en servidor. */
function firstExisting(candidates: string[] | undefined): string | null {
  if (!candidates) return null;
  for (const rel of candidates) {
    const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    if (fs.existsSync(abs)) return rel;
  }
  return null;
}

export default function HomePage() {
  const poster = firstExisting(heroVideo.posterCandidates);
  const resolved = scenes.map((scene) => ({
    scene,
    media: firstExisting(scene.mediaCandidates),
  }));

  return (
    <>
      <HeroVideo src={heroVideo.src} poster={poster} label={heroVideo.label} />

      {resolved.map(({ scene, media }, i) => (
        <NarrativeScene key={scene.id} scene={scene} media={media} index={i} />
      ))}
    </>
  );
}
