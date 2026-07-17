"use client";

import Link from "next/link";
import { MotionImage } from "@/components/home/MotionImage";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { HomeScene } from "@/lib/home";

type NarrativeSceneProps = {
  scene: HomeScene;
  /** src de la mascota ya resuelto en el servidor (o null si no hay) */
  media: string | null;
  /** índice para alternar el lado de la imagen y dar ritmo editorial */
  index: number;
  /** total de escenas, para el contador editorial 01 / N */
  total?: number;
  /** Nº mostrado en el contador si difiere de index+1 (p.ej. el hero cuenta como 01) */
  displayIndex?: number;
};

/** Parte el statement para teñir la palabra de acento sin romper el flujo. */
function renderStatement(statement: string, accent?: string) {
  if (!accent || !statement.includes(accent)) return statement;
  const [before, after] = statement.split(accent);
  return (
    <>
      {before}
      <span className="accent">{accent}</span>
      {after}
    </>
  );
}

export function NarrativeScene({
  scene,
  media,
  index,
  total,
  displayIndex,
}: NarrativeSceneProps) {
  const flip = index % 2 === 1;
  const shown = displayIndex ?? index + 1;
  const counter = total ? `${String(shown).padStart(2, "0")} / ${String(total).padStart(2, "0")}` : null;

  const text = (
    <div className={media ? "md:max-w-xl" : "mx-auto max-w-3xl text-center"}>
      <RevealOnScroll y={20}>
        <div
          className={`mb-5 flex items-baseline gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-cyan ${
            media ? "" : "justify-center"
          }`}
        >
          <span>{scene.kicker}</span>
          {counter && (
            <span className="text-text-muted" aria-hidden="true">
              · {counter}
            </span>
          )}
        </div>
      </RevealOnScroll>

      <RevealOnScroll y={28} delay={0.06}>
        <h2 className="statement text-[clamp(2.1rem,5vw,4.2rem)]">
          {renderStatement(scene.statement, scene.accent)}
        </h2>
      </RevealOnScroll>

      <RevealOnScroll y={20} delay={0.14}>
        <p
          className={`mt-6 text-lg leading-relaxed text-text-secondary md:text-xl ${
            media ? "" : "mx-auto"
          } max-w-prose`}
        >
          {scene.support}
        </p>
      </RevealOnScroll>

      {scene.cta && (
        <RevealOnScroll y={16} delay={0.2}>
          <div className={`mt-9 ${media ? "" : "flex justify-center"}`}>
            {scene.id === "cierre" ? (
              <Link href={scene.cta.href} className="btn btn-primary px-8 py-4 text-base">
                {scene.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link href={scene.cta.href} className="more-link">
                {scene.cta.label}
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            )}
          </div>
        </RevealOnScroll>
      )}
    </div>
  );

  return (
    <section
      id={`scene-${scene.id}`}
      className="flex min-h-[88svh] items-center py-24 md:py-32"
    >
      <div className="wrap w-full">
        {media ? (
          <div
            className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
              flip ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            {text}
            <RevealOnScroll y={36} delay={0.1}>
              <MotionImage
                src={media}
                alt={scene.statement}
                preset={scene.motionPreset ?? "kenburns"}
                fit={media.includes("jaleo-sound") ? "contain" : "cover"}
                size={scene.id === "tecnologia" ? "xl" : "md"}
                // Solo el tramo del tocadiscos: arranca ya formado (2.0s) y
                // vuelve antes de que el morph traiga la guitarra (4.0s). Entra
                // y sale en el mismo fotograma limpio → loop sin salto, con el
                // vinilo de Bonito Sound girando en medio.
                loopStart={scene.id === "tecnologia" ? 2.0 : undefined}
                loopEnd={scene.id === "tecnologia" ? 4.0 : undefined}
              />
            </RevealOnScroll>
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}
