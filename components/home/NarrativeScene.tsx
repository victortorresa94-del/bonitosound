"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { HomeScene } from "@/lib/home";

type NarrativeSceneProps = {
  scene: HomeScene;
  /** src de la mascota ya resuelto en el servidor (o null si no hay) */
  media: string | null;
  /** índice para alternar el lado de la imagen y dar ritmo editorial */
  index: number;
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

export function NarrativeScene({ scene, media, index }: NarrativeSceneProps) {
  const flip = index % 2 === 1;

  const text = (
    <div className={media ? "md:max-w-xl" : "mx-auto max-w-3xl text-center"}>
      <RevealOnScroll y={20}>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-cyan">
          {scene.kicker}
        </p>
      </RevealOnScroll>

      <RevealOnScroll y={28} delay={0.06}>
        <h2 className="statement text-[clamp(2.6rem,7vw,6rem)]">
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
            <Link href={scene.cta.href} className="more-link">
              {scene.cta.label}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
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
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
                <Image
                  src={media}
                  alt={scene.statement}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-contain"
                />
              </div>
            </RevealOnScroll>
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}
