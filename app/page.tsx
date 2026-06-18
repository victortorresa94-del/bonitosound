import fs from "node:fs";
import path from "node:path";
import { HeroDrawing } from "@/components/home/HeroDrawing";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { heroMascot, scenes } from "@/lib/home";

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

/** Lee el SVG del personaje en disco, le añade el atributo data-bs-mascot
 *  (svgo lo elimina si va vacío) y lo deja listo para inyectar. */
function readMascotSvg(): string {
  const abs = path.join(process.cwd(), "public", heroMascot.svgPath.replace(/^\//, ""));
  let svg = fs.readFileSync(abs, "utf8").trim();
  if (!/data-bs-mascot/.test(svg)) {
    svg = svg.replace(/<svg\b/, '<svg data-bs-mascot="true"');
  }
  // ARIA: el SVG es decorativo (el h1.sr-only lleva la semántica).
  if (!/aria-hidden/.test(svg)) {
    svg = svg.replace(/<svg\b/, '<svg aria-hidden="true"');
  }
  return svg;
}

export default function HomePage() {
  const svgMarkup = readMascotSvg();
  const resolved = scenes.map((scene) => ({
    scene,
    media: firstExisting(scene.mediaCandidates),
  }));

  return (
    <>
      <HeroDrawing svgMarkup={svgMarkup} label={heroMascot.label} />

      {resolved.map(({ scene, media }, i) => (
        <NarrativeScene key={scene.id} scene={scene} media={media} index={i} />
      ))}
    </>
  );
}
