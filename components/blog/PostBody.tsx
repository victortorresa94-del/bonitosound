import { Fragment, type ReactNode } from "react";

/**
 * Render de cuerpo de artículo con markdown ligero (sin dependencias):
 *  - "## " → h2   ·   "### " → h3
 *  - líneas "- " → lista
 *  - "> " → cita
 *  - resto → párrafo
 *  - inline **negrita**
 * Suficiente para artículos de blog con buena estructura semántica (SEO).
 */

function inline(text: string): ReactNode[] {
  // Divide por **negrita** conservando el contenido.
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{chunk}</Fragment>;
  });
}

export function PostBody({ blocks }: { blocks: string[] }) {
  return (
    <div className="mx-auto max-w-2xl">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="display mt-14 text-[clamp(1.5rem,3.5vw,2.2rem)] leading-tight text-text-primary">
              {inline(block.slice(3))}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="display mt-10 text-xl text-text-primary md:text-2xl">
              {inline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-2 pl-5 text-lg italic text-text-secondary"
              style={{ borderColor: "#16b6d4" }}
            >
              {inline(block.slice(2))}
            </blockquote>
          );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="my-6 space-y-2 pl-1">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3 text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#16b6d4" }} />
                  <span className="leading-relaxed">{inline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-6 text-lg leading-relaxed text-text-secondary">
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
