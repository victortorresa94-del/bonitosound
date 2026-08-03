import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { YouTubeEmbed } from "@/components/Embeds";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

/**
 * Bloque de vídeos del artista. La rejilla se adapta a cuántos hay para que
 * quede compacto: 2 → 2 columnas; 3 → 3 en una fila; 4 → 2×2; 5-6 → 3 por fila.
 * Con CTA al canal de YouTube si lo hay. Si no hay vídeos, no se pinta.
 *
 * Ojo: algunos vídeos (subidos por sellos/distribuidoras tipo VEVO) tienen el
 * embed DESACTIVADO por su dueño y no se pueden incrustar — conviene poner en
 * `youtubeIds` solo subidas del propio canal del artista, que sí se reproducen.
 */
export function ArtistVideos({
  name,
  youtubeIds,
  youtubeChannel,
}: {
  name: string;
  youtubeIds?: string[];
  youtubeChannel?: string;
}) {
  const locale = serverLocale();
  const vids = (youtubeIds ?? []).map((v) => v?.trim()).filter(Boolean).slice(0, 6) as string[];
  if (vids.length === 0) return null;

  const n = vids.length;
  const cols =
    n === 1
      ? "max-w-2xl"
      : n === 2 || n === 4
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 md:grid-cols-3";
  const channel = youtubeChannel?.trim();

  return (
    <Section id="videos" className="bg-bg-primary">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <RevealOnScroll as="p" className="eyebrow mb-3">{tr(locale, "En vídeo")}</RevealOnScroll>
          <RevealOnScroll as="h2" delay={0.05} className="display text-[clamp(1.8rem,4vw,3rem)]">
            Lo último de <span style={{ color: "#16b6d4" }}>{name}</span>
          </RevealOnScroll>
        </div>
        {channel && (
          <RevealOnScroll delay={0.1}>
            <a href={channel} target="_blank" rel="noopener noreferrer" className="more-link">
              Ver el canal en YouTube <span className="arrow" aria-hidden>→</span>
            </a>
          </RevealOnScroll>
        )}
      </div>

      <StaggerGroup stagger={0.08} className={`mt-8 grid gap-5 ${cols}`}>
        {vids.map((id) => (
          <YouTubeEmbed key={id} id={id} title={`Vídeo de ${name}`} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
