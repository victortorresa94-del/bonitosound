import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { RevealOnScroll } from "@/components/motion";

/**
 * Hero de página de servicio (calcado de "Hero Sellos"): a la izquierda
 * eyebrow "SERVICIO · NN/TT" + titular en la tipografía del home (.display,
 * serif) con una palabra en cian + descripción; a la derecha la ilustración
 * suelta del servicio (line-art navy con acento cian), flotando sin recuadro.
 *
 * La ilustración se resuelve de /public/img/servicios/heroes/<slug>.png
 * (plug-and-play): si aún no está, el hero se pinta a una columna sin imagen.
 */

/** Parte el titular para teñir de cian la última "frase" (tras la coma o el
 *  último salto). Si no hay separador, tiñe la última palabra. */
function splitAccent(title: string): { lead: string; accent: string } {
  const comma = title.indexOf(",");
  if (comma !== -1 && comma < title.length - 1) {
    return { lead: title.slice(0, comma + 1), accent: title.slice(comma + 1).trim() };
  }
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { lead: title, accent: "" };
  return { lead: words.slice(0, -1).join(" "), accent: words[words.length - 1] };
}

function heroImage(slug: string): string | null {
  const rel = `/img/servicios/heroes/${slug}.png`;
  const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
  return fs.existsSync(abs) ? rel : null;
}

export function ServiceHero({
  slug,
  eyebrow,
  index,
  total,
  title,
  desc,
}: {
  slug: string;
  eyebrow: string;
  /** Posición del servicio (1-based) para el "NN / TT". */
  index?: number;
  total?: number;
  title: string;
  desc: string;
}) {
  const img = heroImage(slug);
  const { lead, accent } = splitAccent(title);
  const counter =
    index && total ? ` · ${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}` : "";

  return (
    <section style={{ backgroundColor: "#FBFAF6" }}>
      <div
        className={`wrap grid items-center gap-10 py-16 md:py-24 ${
          img ? "md:grid-cols-[1fr_1fr]" : "md:grid-cols-1"
        }`}
      >
        <div className={img ? "" : "max-w-3xl"}>
          <RevealOnScroll as="p" className="eyebrow mb-6">
            {eyebrow}
            {counter}
          </RevealOnScroll>

          <h1 className="display leading-[0.98] text-[clamp(2.8rem,7vw,5.8rem)] text-[#14283C]">
            {lead}
            {accent && (
              <>
                <br />
                <span className="text-[#16b6d4]">{accent}</span>
              </>
            )}
          </h1>

          <RevealOnScroll
            as="p"
            delay={0.15}
            className="mt-7 max-w-[46ch] text-lg leading-relaxed text-text-secondary"
          >
            {desc}
          </RevealOnScroll>
        </div>

        {img && (
          <div className="order-first md:order-none">
            <Image
              src={img}
              alt=""
              width={760}
              height={620}
              priority
              className="mx-auto h-auto w-full max-w-[560px] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
