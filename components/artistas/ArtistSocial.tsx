import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { EventHeroVideo } from "@/components/eventos/EventHeroVideo";

function IgGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
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
 * Bloque de redes. Los reels solo se muestran como tile si son VÍDEOS LOCALES
 * (.mp4, ruta empezando por "/"): los embeds de Instagram salen rotos para
 * reels con música (a los artistas les pasa siempre), así que NO se incrustan.
 * Si no hay reels locales, se pinta un CTA de Instagram/TikTok en condiciones
 * (nada de cajas vacías). Si no hay ni reels ni redes, la sección no existe.
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
  const localReels = (reels ?? [])
    .map((r) => r?.trim())
    .filter((r): r is string => Boolean(r) && r.startsWith("/"))
    .slice(0, 3);
  const ig = instagram?.trim();
  const tt = tiktok?.trim();
  if (localReels.length === 0 && !ig && !tt) return null;

  const pills = (ig || tt) && (
    <div className="flex flex-wrap items-center justify-center gap-3">
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
    </div>
  );

  return (
    <Section id="redes" className="pt-10 md:pt-14">
      <RevealOnScroll as="p" className="eyebrow mb-4">En Instagram</RevealOnScroll>
      <RevealOnScroll as="h2" delay={0.05} className="display text-[clamp(1.8rem,4vw,3rem)]">
        El día a día de <span style={{ color: "#16b6d4" }}>{name}</span>.
      </RevealOnScroll>

      {localReels.length > 0 ? (
        <>
          <RevealOnScroll as="p" delay={0.12} className="mt-4 max-w-md text-text-secondary">
            Directos, backstage y lo que va cayendo.
          </RevealOnScroll>
          <StaggerGroup
            stagger={0.1}
            className="mt-8 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto pb-2 md:justify-center md:gap-6 md:overflow-visible"
          >
            {localReels.map((r) => (
              <div
                key={r}
                className="relative aspect-[9/16] w-[62vw] max-w-[240px] shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 sm:w-[240px]"
              >
                <EventHeroVideo src={r} label={name} />
              </div>
            ))}
          </StaggerGroup>
          {pills && (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <span className="mr-1 text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Síguele en</span>
              {pills}
            </div>
          )}
        </>
      ) : (
        // Sin reels locales → CTA de Instagram/TikTok en condiciones (navy).
        <RevealOnScroll delay={0.12} className="mt-8">
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-14 text-center md:py-16"
            style={{ background: "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
          >
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10">
              <IgGlyph className="h-8 w-8" />
            </span>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/85">
              Directos, backstage y el día a día de {name}: todo eso está en su
              Instagram. Dale un vistazo.
            </p>
            <div className="mt-8">{pills}</div>
          </div>
        </RevealOnScroll>
      )}
    </Section>
  );
}
