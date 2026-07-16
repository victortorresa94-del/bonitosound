import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { InstagramReel, YouTubeEmbed } from "@/components/Embeds";

type FeedItem = {
  kind: "reel" | "video";
  value: string;
  span: string; // columnas dentro del mosaico de 6
  hang: boolean; // cuelga para romper la línea base
};

/**
 * Arma el mosaico intercalando vertical (reel) y horizontal (vídeo).
 * Cada fila mixta suma 6 columnas justas (2 + 4) y alterna el lado del vertical,
 * así el ojo hace zigzag en vez de leer dos columnas planas.
 * Las piezas que sobran de un tipo se reagrupan con su propio ancho
 * (reels de 3 en 3, vídeos de 2 en 2) para no dejar huecos al final.
 */
function buildFeed(reels: string[], videos: string[]): FeedItem[] {
  const mosaic = reels.length > 0 && videos.length > 0;

  // Un solo formato: rejilla simple, sin spans (los aplicaría sobre otra rejilla).
  if (!mosaic) {
    return [
      ...reels.map((value) => ({ kind: "reel" as const, value, span: "", hang: false })),
      ...videos.map((value) => ({ kind: "video" as const, value, span: "", hang: false })),
    ];
  }

  const out: FeedItem[] = [];
  const rounds = Math.max(reels.length, videos.length);

  for (let i = 0; i < rounds; i++) {
    const reel = reels[i];
    const video = videos[i];

    if (reel && video) {
      const pair: FeedItem[] = [
        { kind: "reel", value: reel, span: "lg:col-span-2", hang: false },
        { kind: "video", value: video, span: "lg:col-span-4", hang: false },
      ];
      if (i % 2 === 1) pair.reverse(); // el vertical cambia de lado
      pair[1].hang = true; // el segundo de la fila cuelga
      out.push(...pair);
    } else if (reel) {
      out.push({ kind: "reel", value: reel, span: "lg:col-span-2", hang: false });
    } else if (video) {
      out.push({ kind: "video", value: video, span: "lg:col-span-3", hang: false });
    }
  }

  return out;
}

export function ArtistLiveFeed({
  name,
  reels,
  youtubeIds,
}: {
  name: string;
  reels?: string[];
  youtubeIds?: string[];
}) {
  // Datos por props: si no hay nada que enseñar, la sección no existe.
  const reelList = (reels ?? []).map((r) => r?.trim()).filter((r): r is string => Boolean(r));
  const videoList = (youtubeIds ?? []).map((v) => v?.trim()).filter((v): v is string => Boolean(v));
  if (reelList.length === 0 && videoList.length === 0) return null;

  const feed = buildFeed(reelList, videoList);
  const mixed = reelList.length > 0 && videoList.length > 0;

  // El mosaico solo entra en lg: por debajo, un reel a 2/6 quedaría demasiado
  // estrecho para su alto fijo y el embed se rompería.
  const gridCls = mixed
    ? "grid grid-cols-1 gap-10 lg:grid-cols-6 lg:items-start lg:gap-x-8 lg:gap-y-16"
    : videoList.length > 0
      ? "grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12"
      : "grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3";

  // El texto solo nombra lo que de verdad hay debajo.
  const formatos = mixed
    ? "Reels, vídeos y trocitos de directo"
    : videoList.length > 0
      ? "Vídeos y trocitos de directo"
      : "Reels y trocitos de directo";

  return (
    <Section>
      <RevealOnScroll as="p" className="eyebrow mb-4">
        Su mundo, en directo
      </RevealOnScroll>

      <RevealOnScroll as="h2" delay={0.06} className="display max-w-[16ch] text-[clamp(2rem,4.5vw,3.4rem)]">
        Lo último de <span className="text-[#16b6d4]">{name}</span>
      </RevealOnScroll>

      <RevealOnScroll as="p" delay={0.12} className="mt-5 max-w-[52ch] text-text-secondary">
        {formatos}. Se entiende mejor viéndolo que leyéndolo.
      </RevealOnScroll>

      <StaggerGroup stagger={0.1} className={`mt-14 ${gridCls}`}>
        {feed.map((item, i) => (
          <figure key={`${item.kind}-${item.value}-${i}`} className={`${item.span} ${item.hang ? "lg:mt-16" : ""}`}>
            {item.kind === "reel" ? (
              <InstagramReel url={item.value} title={`Reel de ${name}`} />
            ) : (
              <YouTubeEmbed id={item.value} title={`Vídeo de ${name}`} />
            )}
            <figcaption className="mt-3 font-round text-xs uppercase tracking-[0.18em] text-text-muted">
              {item.kind === "reel" ? "Reel" : "Vídeo"}
            </figcaption>
          </figure>
        ))}
      </StaggerGroup>
    </Section>
  );
}
