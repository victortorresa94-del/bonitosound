import fs from "node:fs";
import path from "node:path";
import { MetamorphicLogo, type FormData } from "@/components/home/MetamorphicLogo";
import { NarrativeScene } from "@/components/home/NarrativeScene";
import { logoForms, scenes } from "@/lib/home";
import { parseFormSvg } from "@/lib/svg-form";

/**
 * HOME narrativa con identidad metamórfica.
 *
 * El hero ya no es estático: el logo de Bonito Sound se "pinta solo" como
 * superhéroe y se va transformando con el scroll en megáfono → guitarra →
 * bafle, sincronizado con las escenas de la narrativa (Marcas, Records,
 * Festival). La firma "el logo es la marca" recorre toda la web.
 *
 * Referencia de craft: hellomonday.com (slab editorial, movimiento con
 * propósito) + GSAP DrawSVG/MorphSVG (Codrops, mascot animations).
 * El contenido editorial se edita en lib/home.ts sin tocar componentes.
 */

/** Primer candidato de /public que existe en disco (o null). */
function firstExisting(candidates: string[] | undefined): string | null {
  if (!candidates) return null;
  for (const rel of candidates) {
    const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    if (fs.existsSync(abs)) return rel;
  }
  return null;
}

/** Lee y normaliza un SVG de /public para inyectarlo inline en el cliente. */
function readSvg(relPath: string): string {
  const abs = path.join(process.cwd(), "public", relPath.replace(/^\//, ""));
  return fs.readFileSync(abs, "utf8").trim();
}

export default function HomePage() {
  const forms: FormData[] = logoForms
    .filter((f) => {
      const abs = path.join(
        process.cwd(),
        "public",
        f.svgPath.replace(/^\//, "")
      );
      return fs.existsSync(abs);
    })
    .map((f) => ({
      id: f.id,
      triggerSceneId: f.triggerSceneId,
      label: f.label,
      ...parseFormSvg(readSvg(f.svgPath)),
    }));

  const resolved = scenes.map((scene) => ({
    scene,
    media: firstExisting(scene.mediaCandidates),
  }));

  return (
    <>
      <MetamorphicLogo forms={forms} />

      {resolved.map(({ scene, media }, i) => (
        <NarrativeScene key={scene.id} scene={scene} media={media} index={i} />
      ))}
    </>
  );
}
