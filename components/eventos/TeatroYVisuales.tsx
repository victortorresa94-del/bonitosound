import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { VimeoEmbed, YouTubeEmbed } from "@/components/Embeds";
import { findAsset, findLogo } from "@/lib/assets";
import Image from "next/image";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Vídeos de mapping y espectáculos visuales (links aportados por Dani). El
 * primero es el destacado grande de la sección; el resto va en la columna
 * lateral, más pequeños — estilo "siguiente vídeo" de YouTube.
 *
 * ⚠️ Víctor pidió que el destacado fuera el de HYPNOCITY. No he podido
 * verificar los títulos de estos 5 vídeos (Vimeo y YouTube devuelven 403 a
 * las herramientas de esta sesión, incluso al oEmbed público) así que el
 * orden de abajo es el que ya traía el archivo, sin tocar. Si el primero
 * (536427671) no es Hypnocity, basta con subirlo a la primera posición.
 */
const MAPPING_VIDEOS = [
  { kind: "vimeo", id: "536427671" },
  { kind: "vimeo", id: "294375960" },
  { kind: "vimeo", id: "269001449" },
  { kind: "vimeo", id: "258058124" },
  { kind: "youtube", id: "xT-EYMZGuF8" },
] as const;

/**
 * "No todo es música": teatro y espectáculos visuales (mapping). Datos reales
 * aportados por Dani. El logo de cada obra es plug-and-play, igual que el
 * resto del sitio: si existe /img/teatro/<slug>.(png|jpg|svg) se pinta ahí
 * mismo, encima del título; si no, la tarjeta se sostiene solo con
 * tipografía (nunca un hueco vacío mientras no llegue el fichero).
 */
const TEATRO = [
  { title: "Dumbo", tour: "Gira verano 2023", shows: "8 actuaciones" },
  { title: "El Rey León", tour: "Gira verano 2022", shows: "8 actuaciones" },
  { title: "Pinocho", tour: "Gira invierno 2022", shows: "3 actuaciones" },
];

export function TeatroYVisuales() {
  const locale = serverLocale();
  const mappingImg = findAsset("experiencias", "mapping");

  return (
    <Section id="teatro-visuales">
      {/* ---- Teatro ---- */}
      <RevealOnScroll as="p" className="eyebrow mb-4">
        {tr(locale, "No todo es música")}
      </RevealOnScroll>
      <RevealOnScroll
        as="h2"
        delay={0.05}
        className="display max-w-3xl text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05]"
      >
        También trabajamos para <span style={{ color: CYAN }}>teatro</span> y
        espectáculos visuales.
      </RevealOnScroll>

      <StaggerGroup stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
        {TEATRO.map((t) => {
          const logo = findLogo("teatro", t.title);
          return (
          <div
            key={t.title}
            className="rounded-2xl border border-subtle p-6 transition-colors duration-300 hover:border-text-primary/25"
          >
            {logo && (
              <div className="relative mb-4 h-12 w-full">
                <Image
                  src={logo}
                  alt={t.title}
                  fill
                  sizes="200px"
                  className="object-contain object-left"
                />
              </div>
            )}
            <h3 className="display text-xl leading-tight" style={{ color: NAVY }}>
              {t.title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">{t.tour}</p>
            <p className="mt-1 font-mono text-xs tabular-nums text-text-muted">
              {t.shows}
            </p>
          </div>
          );
        })}
      </StaggerGroup>

      {/* ---- Espectáculos visuales / mapping ---- */}
      <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-[1fr_1fr] md:items-center md:gap-14">
        <RevealOnScroll>
          <p className="eyebrow mb-4">{tr(locale, "Espectáculos visuales")}</p>
          <h3 className="display text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.06]">
            Convertimos una fachada en un{" "}
            <span style={{ color: CYAN }}>espectáculo</span>.
          </h3>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            {tr(locale, "Especialistas en producción de mapping, instalaciones de luz y experiencias visuales para eventos y marcas. Transformamos fachadas, espacios urbanos y escenarios en espectáculos únicos mediante tecnología, creatividad e innovación.")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.12}>
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            style={{ backgroundColor: NAVY }}
          >
            {mappingImg ? (
              <Image
                src={mappingImg}
                alt={tr(locale, "Proyección de mapping en una fachada")}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              // Fallback con carácter mientras no haya foto de mapping.
              <div className="absolute inset-0 grid place-items-center p-8 text-center">
                <div>
                  <svg viewBox="0 0 120 80" className="mx-auto h-20 w-28" fill="none" aria-hidden>
                    <rect x="10" y="14" width="100" height="52" rx="3" stroke={CYAN} strokeWidth="2.5" />
                    <path d="M22 66 V30 M40 66 V22 M58 66 V34 M76 66 V24 M94 66 V38" stroke={CYAN} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
                    <path d="M4 74 L60 40 L116 74" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    {tr(locale, "Mapping")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>

      {/* Vídeos de mapping: el trabajo se explica solo viéndolo. Uno grande
          destacado + el resto en columna, más pequeños — rollo YouTube: el
          vídeo que estás viendo a la izquierda, los siguientes a la derecha.
          En móvil el destacado va arriba a todo ancho y el resto en 2
          columnas debajo, para que no se haga eterno. */}
      <RevealOnScroll as="p" className="eyebrow mb-5 mt-16 md:mt-20">
        {tr(locale, "Míralo en movimiento")}
      </RevealOnScroll>
      <StaggerGroup stagger={0.08} className="grid gap-4 md:grid-cols-[1.7fr_1fr] md:gap-5">
        {MAPPING_VIDEOS[0].kind === "vimeo" ? (
          <VimeoEmbed id={MAPPING_VIDEOS[0].id} title={tr(locale, "Mapping y espectáculos visuales")} />
        ) : (
          <YouTubeEmbed id={MAPPING_VIDEOS[0].id} title={tr(locale, "Mapping y espectáculos visuales")} />
        )}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-3.5">
          {MAPPING_VIDEOS.slice(1).map((v) =>
            v.kind === "vimeo" ? (
              <VimeoEmbed key={v.id} id={v.id} title={tr(locale, "Mapping y espectáculos visuales")} />
            ) : (
              <YouTubeEmbed key={v.id} id={v.id} title={tr(locale, "Mapping y espectáculos visuales")} />
            ),
          )}
        </div>
      </StaggerGroup>
    </Section>
  );
}
