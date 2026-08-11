import { resolveLogos } from "@/lib/assets";
import { memberships, support, supportPending, site } from "@/lib/site";
import { MarqueeLogoWallClient } from "@/components/motion/MarqueeLogoWallClient";

/**
 * Banco de pruebas: 6 cabeceras para /experiencias y 5 footers.
 *
 * Igual que /lab/banners, van montadas con las tipografías y los assets
 * REALES, no como mockups: lo que se elija ya está implementado.
 *
 * /lab no está enlazado ni entra en el sitemap.
 */

const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREMA = "#FBFAF6";

const CLAIM = "Diseñamos experiencias musicales que conectan marcas, artistas y personas.";

function Marco({
  n,
  titulo,
  nota,
  fondo = CREMA,
  children,
}: {
  n: string;
  titulo: string;
  nota: string;
  fondo?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14" id={n}>
      <div className="mx-auto mb-3 max-w-[1240px] px-6">
        <p className="font-mono text-xs font-bold" style={{ color: NAVY }}>{n} · {titulo}</p>
        <p className="font-mono text-[0.7rem]" style={{ color: "rgba(20,40,60,0.5)" }}>{nota}</p>
      </div>
      <div style={{ backgroundColor: fondo }} className="overflow-hidden border-y border-subtle">
        {children}
      </div>
    </section>
  );
}

/** Titular gigante en outline, en SVG (el filete de CSS se rompe en las curvas). */
function Outline({
  texto,
  color = NAVY,
  vb = "0 0 1000 130",
  size = 108,
  y = 100,
  stroke = 2.4,
}: {
  texto: string;
  color?: string;
  vb?: string;
  size?: number;
  y?: number;
  stroke?: number;
}) {
  return (
    <svg viewBox={vb} className="block w-full" role="img" aria-label={texto}>
      <text x="500" y={y} textAnchor="middle" className="font-round"
        style={{ fontSize: `${size}px`, fontWeight: 700 }}
        fill="none" stroke={color} strokeWidth={stroke} paintOrder="stroke">
        {texto}
      </text>
    </svg>
  );
}

export default function LabExperienciasFooter() {
  const insti = resolveLogos("instituciones", memberships).filter((l) => l.src);
  const apoyos = resolveLogos("apoyos", [...support, ...supportPending]).filter((l) => l.src);
  const logosPie = [...insti, ...apoyos];

  const cols = [
    { t: "Qué hacemos", li: ["Experiencias", "Giras", "Records", "Artistas", "Universo Bonito"] },
    { t: "Bonito", li: ["Nosotros", "Jaleo Sound", "Clientes", "Blog", "Contacto"] },
  ];

  return (
    <div className="py-12" style={{ backgroundColor: "#EFEDE6" }}>
      <div className="mx-auto mb-12 max-w-[1240px] px-6">
        <h1 className="font-round text-3xl font-bold" style={{ color: NAVY }}>
          Cabecera de Experiencias + Footer
        </h1>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "rgba(20,40,60,0.65)" }}>
          Seis cabeceras y cinco footers, montados con las tipografías y los logos reales.
          Dime los códigos que quieras (p. ej. &ldquo;E3 y F2&rdquo;) y los dejo puestos.
        </p>
      </div>

      {/* ═══════ CABECERAS DE EXPERIENCIAS ═══════ */}

      <Marco n="E1" titulo="Actual, de referencia" nota="La que hay ahora: outline inclinado + onda cian">
        <div className="px-5 pt-14 md:px-10">
          <h1 className="select-none whitespace-nowrap font-round font-bold leading-[0.82]"
            style={{ fontSize: "clamp(2.6rem,12.5vw,11rem)", color: "transparent",
              WebkitTextStroke: `clamp(1.5px,0.3vw,3.5px) ${NAVY}`, transform: "rotate(-3deg)",
              transformOrigin: "left center" }}>
            EXPERIENCIAS
          </h1>
          <div className="ml-auto mt-2 max-w-[17rem] pb-10">
            <p className="text-sm font-semibold uppercase leading-snug" style={{ color: NAVY }}>{CLAIM}</p>
          </div>
        </div>
      </Marco>

      <Marco n="E2" titulo="Outline limpio + cifras" nota="Mismo gesto pero en SVG (sin el glitch del filete) y con los datos al lado">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <div style={{ transform: "rotate(-2deg)" }}>
            <Outline texto="EXPERIENCIAS" size={118} y={104} vb="0 0 1000 135" />
          </div>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-sm text-sm font-semibold uppercase leading-snug tracking-wide" style={{ color: NAVY }}>{CLAIM}</p>
            <div className="flex gap-10">
              {[["250", "eventos"], ["58", "marcas"], ["53", "artistas"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-round text-[2.4rem] font-bold leading-none" style={{ color: CYAN }}>{n}</p>
                  <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(20,40,60,0.5)" }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Marco>

      <Marco n="E3" titulo="Navy a sangre" nota="Fondo oscuro, titular sólido en crema y el 250 de marca de agua" fondo={NAVY}>
        <div className="relative mx-auto max-w-[1240px] px-6 py-20">
          <span aria-hidden className="pointer-events-none absolute -left-6 top-4 select-none font-round font-bold leading-none"
            style={{ color: CYAN, opacity: 0.13, fontSize: "clamp(9rem,24vw,20rem)" }}>250</span>
          <div className="relative">
            <h1 className="font-round font-bold leading-[0.9]" style={{ color: CREMA, fontSize: "clamp(2.4rem,9vw,7rem)" }}>
              EXPERI<span style={{ color: CYAN }}>ENCIAS</span>
            </h1>
            <p className="mt-7 max-w-lg text-sm font-semibold uppercase leading-snug tracking-wide" style={{ color: "rgba(251,250,246,0.75)" }}>{CLAIM}</p>
          </div>
        </div>
      </Marco>

      <Marco n="E4" titulo="Apilado a la izquierda" nota="La palabra partida en dos líneas, muy grande, con la frase debajo">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <h1 className="font-cartel font-black uppercase leading-[0.86] tracking-tight" style={{ color: NAVY, fontSize: "clamp(3rem,11vw,8.5rem)" }}>
            EXPERI<br /><span style={{ color: CYAN }}>ENCIAS</span>
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <svg className="h-3 w-28 shrink-0" viewBox="0 0 112 12" fill="none" aria-hidden>
              <path d="M2 8 Q 14 2, 28 7 T 56 7 T 84 7 T 110 5" stroke={CYAN} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p className="max-w-md text-sm font-semibold uppercase leading-snug" style={{ color: NAVY }}>{CLAIM}</p>
          </div>
        </div>
      </Marco>

      <Marco n="E5" titulo="Banda cian cruzando" nota="Titular sólido con una banda cian atravesándolo por el medio">
        <div className="mx-auto max-w-[1240px] px-6 py-20">
          <div className="relative">
            <h1 className="relative z-10 text-center font-round font-bold leading-[0.9]" style={{ color: NAVY, fontSize: "clamp(2.4rem,10vw,8rem)" }}>
              EXPERIENCIAS
            </h1>
            <span aria-hidden className="absolute left-[-6%] right-[-6%] top-1/2 z-0 h-[0.16em] -translate-y-1/2"
              style={{ backgroundColor: CYAN, height: "clamp(10px,1.6vw,22px)" }} />
          </div>
          <p className="mx-auto mt-10 max-w-lg text-center text-sm font-semibold uppercase leading-snug tracking-wide" style={{ color: NAVY }}>{CLAIM}</p>
        </div>
      </Marco>

      <Marco n="E6" titulo="Repetida en bucle" nota="La palabra repetida como una cinta: el propio título es el movimiento">
        <div className="py-16">
          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="overflow-hidden">
                <div className={i === 1 ? "opacity-100" : "opacity-25"}>
                  <MarqueeLogoWallClient
                    items={Array.from({ length: 8 }, (_, k) => ({ name: `x${i}-${k}`, src: null }))}
                    speed={i === 1 ? 34 : 22}
                    direction={i === 1 ? "left" : "right"}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-[1240px] px-6 pt-2">
            <h1 className="text-center font-round font-bold leading-none" style={{ color: NAVY, fontSize: "clamp(2rem,7vw,5rem)" }}>
              EXPERI<span style={{ color: CYAN }}>ENCIAS</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-sm font-semibold uppercase leading-snug" style={{ color: NAVY }}>{CLAIM}</p>
          </div>
        </div>
      </Marco>

      {/* ═══════ FOOTERS ═══════ */}

      <Marco n="F1" titulo="Wordmark gigante recortado" nota="BONITO SOUND enorme en outline, cortado por el borde inferior" fondo={NAVY}>
        <div className="pt-14">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="grid gap-10 md:grid-cols-4">
              {cols.map((c) => (
                <div key={c.t}>
                  <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>{c.t}</p>
                  {c.li.map((l) => (
                    <p key={l} className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{l}</p>
                  ))}
                </div>
              ))}
              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>Contacto</p>
                <p className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{site.emails.general}</p>
                <p className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{site.phone}</p>
              </div>
              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>Miembros de</p>
                <div className="flex flex-wrap items-center gap-4">
                  {logosPie.slice(0, 5).map((l) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={l.name} src={l.src!} alt={l.name} className="h-4 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* El wordmark, recortado por abajo */}
          <div className="-mb-[3.5vw] mt-10 overflow-hidden px-2">
            <Outline texto="BONITO SOUND" color={CREMA} size={132} y={112} vb="0 0 1000 130" stroke={2} />
          </div>
        </div>
      </Marco>

      <Marco n="F2" titulo="Wordmark sólido gigante" nota="Igual pero relleno, y con la frase de marca arriba" fondo={NAVY}>
        <div className="pt-14">
          <div className="mx-auto max-w-[1240px] px-6">
            <p className="max-w-xl font-display text-[clamp(1.3rem,2.6vw,2rem)] leading-snug" style={{ color: CREMA }}>
              En la música nadie te regala nada. Tres décadas de oficio detrás,
              tres años montando la agencia para hacerlo como hay que hacerlo.
            </p>
            <div className="mt-12 grid gap-10 md:grid-cols-4">
              {cols.map((c) => (
                <div key={c.t}>
                  <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>{c.t}</p>
                  {c.li.map((l) => (
                    <p key={l} className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{l}</p>
                  ))}
                </div>
              ))}
              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>Contacto</p>
                <p className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{site.emails.general}</p>
                <p className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{site.phone}</p>
              </div>
              <div>
                <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>Miembros de</p>
                <div className="flex flex-wrap items-center gap-4">
                  {logosPie.slice(0, 5).map((l) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={l.name} src={l.src!} alt={l.name} className="h-4 w-auto object-contain"
                      style={{ filter: "brightness(0) invert(1)", opacity: 0.6 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <h2 className="-mb-[2.5vw] mt-10 select-none px-2 text-center font-round font-bold leading-[0.8]"
            style={{ color: CREMA, fontSize: "clamp(3rem,14vw,11rem)" }}>
            BONITO SOUND
          </h2>
        </div>
      </Marco>

      <Marco n="F3" titulo="Crema, editorial" nota="Footer claro en vez de oscuro, con la franja institucional en movimiento">
        <div className="pt-14">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="flex flex-wrap items-start justify-between gap-10">
              <div className="max-w-sm">
                <h2 className="font-editorial text-[clamp(1.6rem,3.2vw,2.4rem)] font-black leading-tight" style={{ color: NAVY }}>
                  ¿Hablamos?
                </h2>
                <p className="mt-3 text-sm" style={{ color: "rgba(20,40,60,0.65)" }}>
                  {site.emails.general} · {site.phone}
                </p>
              </div>
              <div className="flex flex-wrap gap-12">
                {cols.map((c) => (
                  <div key={c.t}>
                    <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>{c.t}</p>
                    {c.li.map((l) => (
                      <p key={l} className="py-1 text-sm" style={{ color: "rgba(20,40,60,0.75)" }}>{l}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-subtle py-5">
            <MarqueeLogoWallClient items={logosPie} speed={22} mono logoClass="h-5" />
          </div>
          <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 text-[0.7rem]" style={{ color: "rgba(20,40,60,0.5)" }}>
            <span>© 2026 {site.legalName}</span>
            <span>Aviso legal · Privacidad</span>
          </div>
        </div>
      </Marco>

      <Marco n="F4" titulo="CTA gigante integrado" nota="El footer ES la llamada: una pregunta enorme y los links pequeños debajo" fondo={NAVY}>
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <h2 className="font-round font-bold leading-[0.95]" style={{ color: CREMA, fontSize: "clamp(2rem,6.5vw,4.6rem)" }}>
            ¿Lo hacemos<br /><span style={{ color: CYAN }}>bonito</span>?
          </h2>
          <div className="mt-8 inline-flex rounded-full px-8 py-4 text-sm font-bold" style={{ backgroundColor: CYAN, color: NAVY }}>
            Cuéntanos tu proyecto →
          </div>
          <div className="mt-14 flex flex-wrap items-start justify-between gap-10 border-t pt-8" style={{ borderColor: "rgba(251,250,246,0.16)" }}>
            <div className="flex flex-wrap gap-10">
              {cols.map((c) => (
                <div key={c.t}>
                  <p className="mb-2 text-[0.58rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>{c.t}</p>
                  {c.li.map((l) => (
                    <p key={l} className="py-0.5 text-[0.8rem]" style={{ color: "rgba(251,250,246,0.7)" }}>{l}</p>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {logosPie.slice(0, 6).map((l) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={l.name} src={l.src!} alt={l.name} className="h-4 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)", opacity: 0.55 }} />
              ))}
            </div>
          </div>
        </div>
      </Marco>

      <Marco n="F5" titulo="Dos bandas de logos" nota="Footer navy con las membresías y los apoyos en cinta, separados" fondo={NAVY}>
        <div className="pt-12">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
              <div>
                <p className="font-round text-2xl font-bold" style={{ color: CREMA }}>Bonito Sound</p>
                <p className="mt-3 max-w-xs text-sm" style={{ color: "rgba(251,250,246,0.7)" }}>
                  Booking, management, sello, distribución y experiencias.
                </p>
                <p className="mt-4 text-sm" style={{ color: CYAN }}>{site.emails.general}</p>
              </div>
              {cols.map((c) => (
                <div key={c.t}>
                  <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: CYAN }}>{c.t}</p>
                  {c.li.map((l) => (
                    <p key={l} className="py-1 text-sm" style={{ color: "rgba(251,250,246,0.8)" }}>{l}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 space-y-3 border-t py-6" style={{ borderColor: "rgba(251,250,246,0.14)" }}>
            <div className="flex items-center gap-5 px-6">
              <span className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(251,250,246,0.45)" }}>Miembros de</span>
              <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <MarqueeLogoWallClient
                  items={Array.from({ length: 3 }, () => insti).flat().map((l, i) => ({ ...l, name: `${l.name}·${i}` }))}
                  speed={20} logoClass="h-5" />
              </div>
            </div>
            <div className="flex items-center gap-5 px-6">
              <span className="shrink-0 text-[0.58rem] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(251,250,246,0.45)" }}>Con el apoyo de</span>
              <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <MarqueeLogoWallClient
                  items={Array.from({ length: 4 }, () => apoyos).flat().map((l, i) => ({ ...l, name: `${l.name}·${i}` }))}
                  speed={20} direction="right" logoClass="h-5" />
              </div>
            </div>
          </div>
        </div>
      </Marco>
    </div>
  );
}
