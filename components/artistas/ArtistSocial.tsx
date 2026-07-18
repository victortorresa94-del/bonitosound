import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { InstagramReel } from "@/components/Embeds";
import { EventHeroVideo } from "@/components/eventos/EventHeroVideo";

function IgGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <defs>
        <linearGradient id="ig-soc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="45%" stopColor="#DD2A7B" />
          <stop offset="80%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="url(#ig-soc)" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.2" stroke="url(#ig-soc)" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="url(#ig-soc)" />
    </svg>
  );
}

function TikTokGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 4v2.6c-1.3.1-2.5-.2-3.6-.9v5.9c0 3.2-2.3 5.4-5.2 5.4-2.9 0-5.2-2.2-5.2-5s2.2-5 5-5c.3 0 .6 0 .9.1v2.7a2.3 2.3 0 0 0-1-.2 2.4 2.4 0 1 0 2.4 2.4V3h3.2Z" />
    </svg>
  );
}

function SocialPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-subtle bg-bg-secondary px-6 py-3 text-sm font-bold text-text-primary transition-transform duration-200 hover:scale-[1.04] hover:border-text-primary/25"
    >
      {children}
    </a>
  );
}

/**
 * Bloque de redes: los reels del artista (los que tenga) + CTA a su Instagram y
 * TikTok. Si no hay ni reels ni redes, no se pinta.
 */
export function ArtistSocial({
  name,
  reels,
  instagram,
  tiktok,
}: {
  name: string;
  reels?: string[];
  instagram?: string;
  tiktok?: string;
}) {
  const reelList = (reels ?? []).map((r) => r?.trim()).filter(Boolean).slice(0, 3) as string[];
  const ig = instagram?.trim();
  const tt = tiktok?.trim();
  if (reelList.length === 0 && !ig && !tt) return null;

  return (
    <Section id="redes" className="pt-10 md:pt-14">
      <RevealOnScroll as="p" className="eyebrow mb-4">En Instagram</RevealOnScroll>
      <RevealOnScroll as="h2" delay={0.05} className="display text-[clamp(1.8rem,4vw,3rem)]">
        El día a día de <span style={{ color: "#16b6d4" }}>{name}</span>.
      </RevealOnScroll>
      <RevealOnScroll as="p" delay={0.12} className="mt-4 max-w-md text-text-secondary">
        Directos, backstage y lo que va cayendo. Lo de dentro está aquí.
      </RevealOnScroll>

      {reelList.length > 0 && (
        <StaggerGroup
          stagger={0.1}
          className="mt-8 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 md:justify-center md:gap-6 md:overflow-visible"
        >
          {reelList.map((r) =>
            r.startsWith("/") ? (
              // Vídeo LOCAL (.mp4) → marco reel fiable, se reproduce inline
              // (como en Nosotros). Es la vía recomendada.
              <div
                key={r}
                className="relative aspect-[9/16] w-[62vw] max-w-[240px] shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:w-[240px]"
              >
                <EventHeroVideo src={r} label={name} />
              </div>
            ) : (
              // URL de Instagram → tarjeta-enlace (los embeds de IG salen rotos).
              <div key={r} className="w-[62vw] max-w-[240px] shrink-0 snap-center sm:w-[240px]">
                <InstagramReel url={r} title={`Reel de ${name}`} />
              </div>
            ),
          )}
        </StaggerGroup>
      )}

      {(ig || tt) && (
        <RevealOnScroll className="mt-9 flex flex-wrap items-center justify-center gap-3" delay={0.15}>
          <span className="mr-1 text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Síguele en</span>
          {ig && (
            <SocialPill href={ig}>
              <IgGlyph /> Instagram
            </SocialPill>
          )}
          {tt && (
            <SocialPill href={tt}>
              <TikTokGlyph /> TikTok
            </SocialPill>
          )}
        </RevealOnScroll>
      )}
    </Section>
  );
}
