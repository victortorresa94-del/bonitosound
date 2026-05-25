"use client";

import Link from "next/link";
import { StickyScene } from "./StickyScene";
import { MagneticButton } from "./MagneticButton";

export function JaleoColorBurst() {
  return (
    <StickyScene pinDuration="+=80%">
      {(progress) => {
        const bg = `rgb(${Math.round(255 - (255 - 232) * progress)}, ${Math.round(
          255 - (255 - 53) * progress
        )}, ${Math.round(255 - (255 - 31) * progress)})`;
        const textColor = progress > 0.45 ? "#ffffff" : "var(--text-primary)";
        return (
          <section
            className="flex min-h-screen items-center py-20 md:py-28"
            style={{ background: bg, color: textColor, transition: "color 0.3s" }}
          >
            <div
              className="wrap"
              style={{
                opacity: Math.max(0.15, progress),
                transform: `translateY(${(1 - progress) * 30}px)`,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ opacity: 0.85 }}
              >
                Festival propio
              </p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,4rem)]">
                Y un festival propio en Amsterdam, porque por qué no.
              </h2>
              <p className="mt-5 max-w-2xl" style={{ opacity: 0.85 }}>
                Cultura española y latina. No massive stages, no VIP fences, no
                nonsense. Just music, good taste, great food and people.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <MagneticButton strength={0.35}>
                  <a
                    href="https://jaleosound.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ background: "#ffffff", color: "var(--jaleo-red)" }}
                  >
                    Web del festival →
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <Link
                    href="/jaleo-sound"
                    className="btn"
                    style={{
                      border: `1px solid ${
                        progress > 0.45
                          ? "rgba(255,255,255,0.45)"
                          : "rgba(11,15,20,0.25)"
                      }`,
                      color: textColor,
                    }}
                  >
                    Open Call 2026 →
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </section>
        );
      }}
    </StickyScene>
  );
}
