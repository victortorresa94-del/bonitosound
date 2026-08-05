import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { YouTubeEmbed } from "@/components/Embeds";
import { R2Video } from "@/components/R2Video";
import type { Gira } from "@/lib/giras";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

/**
 * "Míralo en movimiento": las giras que tienen vídeo, en la propia página de
 * /giras. Así se ve el directo sin tener que entrar en ninguna ficha — que es
 * lo que pidió Víctor para las giras sin página propia.
 *
 * Plug-and-play: se pinta solo con las entradas de lib/giras.ts que tengan
 * `video` o `youtubeId`. Si no hay ninguna, la sección no existe.
 */
export function GirasVideos({ giras }: { giras: Gira[] }) {
  const locale = serverLocale();
  const conVideo = giras.filter((g) => g.video || g.youtubeId);
  if (conVideo.length === 0) return null;

  return (
    <Section className="bg-bg-primary">
      <RevealOnScroll as="p" className="eyebrow mb-3">
        {tr(locale, "Míralo en movimiento")}
      </RevealOnScroll>
      <RevealOnScroll
        as="h2"
        delay={0.05}
        className="display mb-10 text-[clamp(1.8rem,4vw,2.8rem)] text-[#14283C]"
      >
        {tr(locale, "Así suenan desde dentro.")}
      </RevealOnScroll>

      <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-2">
        {conVideo.map((g) => (
          <figure key={g.slug}>
            {g.youtubeId ? (
              <YouTubeEmbed id={g.youtubeId} title={`${g.artist} — ${g.tour}`} />
            ) : (
              <R2Video src={g.video!} ratio="16 / 9" />
            )}
            <figcaption className="mt-3">
              <span className="display text-lg text-[#14283C]">{g.artist}</span>
              <span className="ml-2 text-sm italic text-text-secondary">{g.tour}</span>
            </figcaption>
          </figure>
        ))}
      </StaggerGroup>
    </Section>
  );
}
