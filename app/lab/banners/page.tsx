import { resolveLogos } from "@/lib/assets";
import { trustedBy } from "@/lib/site";
import { MarqueeLogoWallClient } from "@/components/motion/MarqueeLogoWallClient";

/**
 * Doce maquetaciones del banner "Han confiado en hacerlo bonito", construidas
 * con las tipografías y los logos REALES del sitio (no mockups de IA), para
 * poder elegir sobre lo que de verdad se va a ver.
 *
 * Feedback que las origina: las dos primeras propuestas "se limitaban al mismo
 * formato" (titular centrado + cuatro números en fila + tira de logos). Aquí
 * cada variante cambia la ESTRUCTURA, no solo la fuente: split asimétrico,
 * marca de agua, entrada de concierto, tabla, sello, onda, collage…
 *
 * Vive en /lab, que no está enlazado ni entra en el sitemap: es un banco de
 * pruebas, no una página pública.
 */

const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREMA = "#FBFAF6";

const CATS = trustedBy.filter((c) => c.id !== "proveedores");
const TOTAL = CATS.reduce((n, c) => n + c.items.length, 0);

type Logo = ReturnType<typeof resolveLogos>[number];

/** Los logos reales, deduplicados y sin fotos — igual que en el home. */
function getLogos(): Logo[] {
  const vistos = new Set<string>();
  return CATS.flatMap((c) => resolveLogos(c.dir, c.items)).filter((l) => {
    if (!l.src || l.isPhoto || vistos.has(l.name)) return false;
    vistos.add(l.name);
    return true;
  });
}

/** Tira estática de logos, para las variantes que no llevan marquee. */
function TiraLogos({
  logos,
  invertir = false,
  max = 9,
}: {
  logos: Logo[];
  invertir?: boolean;
  max?: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
      {logos.slice(0, max).map((l) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={l.name}
          src={l.src!}
          alt={l.name}
          className="h-5 w-auto object-contain"
          style={{
            filter: l.aguantaSilueta
              ? invertir
                ? "brightness(0) invert(1)"
                : "brightness(0)"
              : undefined,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function Marco({
  n,
  titulo,
  nota,
  fondo = CREMA,
  children,
}: {
  n: number;
  titulo: string;
  nota: string;
  fondo?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14" id={`v${n}`}>
      <div className="mx-auto mb-3 max-w-[1240px] px-6">
        <p className="font-mono text-xs font-bold" style={{ color: NAVY }}>
          {String(n).padStart(2, "0")} · {titulo}
        </p>
        <p className="font-mono text-[0.7rem]" style={{ color: "rgba(20,40,60,0.5)" }}>
          {nota}
        </p>
      </div>
      <div style={{ backgroundColor: fondo }} className="overflow-hidden border-y border-subtle">
        {children}
      </div>
    </section>
  );
}

export default function BannersLab() {
  const logos = getLogos();

  return (
    <div className="py-12" style={{ backgroundColor: "#EFEDE6" }}>
      <div className="mx-auto mb-12 max-w-[1240px] px-6">
        <h1 className="font-round text-3xl font-bold" style={{ color: NAVY }}>
          Banner &ldquo;Han confiado&rdquo; — 12 maquetaciones
        </h1>
        <p className="mt-2 max-w-2xl text-sm" style={{ color: "rgba(20,40,60,0.65)" }}>
          Construidas con las tipografías y los logos reales del sitio. Cada una cambia la
          estructura, no solo la fuente. Dime el número y lo dejo montado en el home.
        </p>
      </div>

      {/* 01 · SPLIT ASIMÉTRICO */}
      <Marco n={1} titulo="Split asimétrico" nota="Titular grande a la izquierda · lista con filetes a la derecha">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16">
          <h2 className="font-round text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.02] tracking-tight" style={{ color: NAVY }}>
            Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>.
          </h2>
          <div>
            {CATS.map((c) => (
              <div key={c.id} className="flex items-baseline justify-between gap-6 border-t py-4" style={{ borderColor: "rgba(20,40,60,0.14)" }}>
                <span className="font-round text-[2.4rem] font-bold leading-none" style={{ color: CYAN }}>{c.items.length}</span>
                <span className="text-right text-[0.7rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(20,40,60,0.55)" }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-subtle py-5">
          <MarqueeLogoWallClient items={logos} speed={30} mono logoClass="h-5" />
        </div>
      </Marco>

      {/* 02 · MARCA DE AGUA GIGANTE */}
      <Marco n={2} titulo="El total, de marca de agua" nota="123 enorme detrás de todo · titular pequeño encima">
        <div className="relative mx-auto max-w-[1240px] px-6 py-20 text-center">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-round font-bold leading-none"
            style={{ color: CYAN, opacity: 0.13, fontSize: "clamp(12rem,30vw,26rem)" }}
          >
            {TOTAL}
          </span>
          <div className="relative">
            <h2 className="font-editorial text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-tight" style={{ color: NAVY }}>
              Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>.
            </h2>
            <p className="mt-5 text-sm" style={{ color: "rgba(20,40,60,0.6)" }}>
              {CATS.map((c) => `${c.items.length} ${c.label.toLowerCase()}`).join("  ·  ")}
            </p>
          </div>
        </div>
      </Marco>

      {/* 03 · ENTRADA DE CONCIERTO */}
      <Marco n={3} titulo="Entrada de concierto" nota="Ficha sobre navy · datos tipo ticket + código de barras" fondo={NAVY}>
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-2xl px-10 py-10" style={{ backgroundColor: CREMA }}>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em]" style={{ color: CYAN }}>
              Bonito Sound · admit all
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-tight" style={{ color: NAVY }}>
              Han confiado en hacerlo bonito.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-dashed pt-6 sm:grid-cols-4" style={{ borderColor: "rgba(20,40,60,0.28)" }}>
              {CATS.map((c) => (
                <div key={c.id}>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em]" style={{ color: "rgba(20,40,60,0.45)" }}>{c.label}</p>
                  <p className="font-round text-2xl font-bold leading-none" style={{ color: CYAN }}>{c.items.length}</p>
                </div>
              ))}
            </div>
            <div aria-hidden className="mt-8 flex h-8 items-end gap-[3px]">
              {Array.from({ length: 54 }).map((_, i) => (
                <span key={i} className="flex-1" style={{ backgroundColor: NAVY, height: `${40 + ((i * 37) % 60)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </Marco>

      {/* 04 · LA CINTA MANDA */}
      <Marco n={4} titulo="La cinta manda" nota="Tres filas de logos · el titular flota encima en una píldora">
        <div className="relative py-16">
          <div className="space-y-6 opacity-90">
            <MarqueeLogoWallClient items={logos} speed={26} mono logoClass="h-6" />
            <MarqueeLogoWallClient items={[...logos].reverse()} speed={34} direction="right" mono logoClass="h-6" />
            <MarqueeLogoWallClient items={logos} speed={30} mono logoClass="h-6" />
          </div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center px-6">
            <div className="rounded-full border px-9 py-5" style={{ backgroundColor: CREMA, borderColor: NAVY }}>
              <h2 className="text-center font-round text-[clamp(1rem,2.6vw,1.9rem)] font-bold leading-none" style={{ color: NAVY }}>
                Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>.
              </h2>
            </div>
          </div>
        </div>
      </Marco>

      {/* 05 · UNA SOLA FRASE */}
      <Marco n={5} titulo="Una sola frase" nota="Sin bloques de stats: los números viven dentro del texto" fondo={NAVY}>
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <p className="font-display text-[clamp(1.5rem,3.6vw,2.9rem)] leading-[1.5]" style={{ color: CREMA }}>
            Han confiado en hacerlo bonito{" "}
            {CATS.map((c, i) => (
              <span key={c.id}>
                <span className="font-round font-bold" style={{ color: CYAN, fontSize: "1.45em" }}>{c.items.length}</span>{" "}
                {c.label.toLowerCase()}
                {i < CATS.length - 2 ? ", " : i === CATS.length - 2 ? " y " : "."}
              </span>
            ))}
          </p>
          <div className="mt-14">
            <TiraLogos logos={logos} invertir max={10} />
          </div>
        </div>
      </Marco>

      {/* 06 · REJILLA DE FICHAS */}
      <Marco n={6} titulo="Rejilla de fichas" nota="Titular arriba a la izquierda · cuatro tarjetas con filete">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <h2 className="max-w-lg font-cartel text-[clamp(1.7rem,3.4vw,2.6rem)] font-black uppercase leading-[0.98] tracking-tight" style={{ color: NAVY }}>
            Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATS.map((c) => (
              <div key={c.id} className="rounded-2xl border p-6" style={{ borderColor: "rgba(20,40,60,0.16)" }}>
                <p className="font-round text-[2.8rem] font-bold leading-none" style={{ color: CYAN }}>{c.items.length}</p>
                <p className="mt-4 text-[0.66rem] font-semibold uppercase leading-snug tracking-[0.16em]" style={{ color: "rgba(20,40,60,0.55)" }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Marco>

      {/* 07 · BANDA DIAGONAL */}
      <Marco n={7} titulo="Banda diagonal" nota="El titular cruza en cian por debajo · los números descolocados arriba">
        <div className="mx-auto max-w-[1240px] px-6 pb-28 pt-16">
          {/* Los números van ARRIBA y la banda DEBAJO, en flujo normal: la
              primera versión superponía la banda sobre ellos en absoluto y se
              comía las etiquetas. */}
          <div className="flex flex-wrap items-start justify-between gap-y-12">
            {CATS.map((c, i) => (
              <div key={c.id} className="text-center" style={{ transform: `rotate(${[-4, 3, -2, 4][i]}deg)` }}>
                <p className="font-round text-[clamp(2.2rem,4.4vw,3.4rem)] font-bold leading-none" style={{ color: NAVY }}>{c.items.length}</p>
                <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(20,40,60,0.5)" }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* La banda, fuera del contenedor con padding para poder sangrar por
            los dos lados y girar sin que la recorte el ancho de contenido. */}
        <div className="relative -mt-8 h-[130px] overflow-hidden">
          <div
            className="absolute left-[-6%] w-[112%] py-5"
            style={{ backgroundColor: CYAN, top: "22px", transform: "rotate(-3.2deg)" }}
          >
            <h2 className="text-center font-round text-[clamp(1.3rem,3.4vw,2.6rem)] font-bold leading-none" style={{ color: CREMA }}>
              Han confiado en hacerlo bonito.
            </h2>
          </div>
        </div>
      </Marco>

      {/* 08 · ÍNDICE EDITORIAL */}
      <Marco n={8} titulo="Índice editorial" nota="Cada categoría, una fila a todo el ancho, con sus propios logos">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] font-bold" style={{ color: NAVY }}>
            Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>.
          </h2>
          <div className="mt-9">
            {CATS.map((c) => {
              const suyos = resolveLogos(c.dir, c.items).filter((l) => l.src && !l.isPhoto).slice(0, 4);
              return (
                <div key={c.id} className="flex items-center gap-6 border-t py-5" style={{ borderColor: "rgba(20,40,60,0.14)" }}>
                  <span className="w-20 shrink-0 font-round text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none" style={{ color: CYAN }}>{c.items.length}</span>
                  <span className="flex-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]" style={{ color: NAVY }}>{c.label}</span>
                  <span className="hidden items-center gap-6 sm:flex">
                    {suyos.map((l) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={l.name} src={l.src!} alt={l.name} className="h-5 w-auto object-contain"
                        style={{ filter: l.aguantaSilueta ? "brightness(0)" : undefined, opacity: 0.45 }} />
                    ))}
                  </span>
                </div>
              );
            })}
            <div className="border-t" style={{ borderColor: "rgba(20,40,60,0.14)" }} />
          </div>
        </div>
      </Marco>

      {/* 09 · TIPOGRAFÍA HUECA */}
      <Marco n={9} titulo="Tipografía hueca" nota="Titular en outline gigante, como la cabecera de Giras">
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-center">
          <svg viewBox="0 0 1000 215" className="block w-full" role="img" aria-label="Han confiado en hacerlo bonito">
            <text x="500" y="88" textAnchor="middle" className="font-round" style={{ fontSize: "88px", fontWeight: 700 }}
              fill="none" stroke={NAVY} strokeWidth="2.2" paintOrder="stroke">HAN CONFIADO</text>
            <text x="500" y="188" textAnchor="middle" className="font-round" style={{ fontSize: "74px", fontWeight: 700 }}
              fill="none" stroke={CYAN} strokeWidth="2.2" paintOrder="stroke">EN HACERLO BONITO</text>
          </svg>
          <p className="mt-8 font-round text-sm font-bold" style={{ color: NAVY }}>
            {TOTAL} entre marcas, agencias, ayuntamientos y asociaciones
          </p>
          <div className="mt-9">
            <TiraLogos logos={logos} max={9} />
          </div>
        </div>
      </Marco>

      {/* 10 · SELLO CIRCULAR */}
      <Marco n={10} titulo="Sello circular" nota="Un cuño con el total dentro · las categorías al lado">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-12 px-6 py-16 md:flex-row md:gap-20">
          <div className="relative h-56 w-56 shrink-0">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
              <defs>
                <path id="aro" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="92" fill="none" stroke={CYAN} strokeWidth="2.5" />
              <circle cx="100" cy="100" r="66" fill="none" stroke={NAVY} strokeWidth="1.2" opacity="0.25" />
              <text className="font-round" style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2.4px" }} fill={NAVY}>
                <textPath href="#aro" startOffset="2%">
                  HAN CONFIADO EN HACERLO BONITO · BONITO SOUND ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-round text-[4rem] font-bold leading-none" style={{ color: NAVY }}>{TOTAL}</span>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-7">
            {CATS.map((c) => (
              <div key={c.id}>
                <p className="font-round text-[2.2rem] font-bold leading-none" style={{ color: CYAN }}>{c.items.length}</p>
                <p className="mt-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(20,40,60,0.55)" }}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Marco>

      {/* 11 · ONDA DE SONIDO */}
      <Marco n={11} titulo="Onda de sonido" nota="Las cifras son las barras altas del ecualizador">
        <div className="mx-auto max-w-[1240px] px-6 py-16 text-center">
          <h2 className="font-round text-[clamp(1.3rem,2.8vw,2.1rem)] font-bold" style={{ color: NAVY }}>
            Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>.
          </h2>
          <div className="mt-12 flex items-end justify-center gap-[6px]">
            {Array.from({ length: 44 }).map((_, i) => {
              const destacada = [7, 17, 26, 35].indexOf(i);
              if (destacada >= 0) {
                const c = CATS[destacada];
                return (
                  <div key={i} className="flex w-[92px] shrink-0 flex-col items-center">
                    <span className="font-round text-[clamp(1.5rem,3vw,2.3rem)] font-bold leading-none" style={{ color: NAVY }}>{c.items.length}</span>
                    <span className="mt-1 w-[7px] rounded-full" style={{ backgroundColor: CYAN, height: 74 }} />
                    <span className="mt-2 text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.1em]" style={{ color: "rgba(20,40,60,0.5)" }}>{c.label}</span>
                  </div>
                );
              }
              return (
                <span key={i} className="w-[7px] shrink-0 rounded-full"
                  style={{ backgroundColor: CYAN, opacity: 0.3, height: 14 + ((i * 29) % 46) }} />
              );
            })}
          </div>
        </div>
      </Marco>

      {/* 12 · REVISTA */}
      <Marco n={12} titulo="Revista" nota="Titular serif a un tercio · collage denso de logos en el resto">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-6 py-16 md:grid-cols-[0.85fr_1.3fr] md:items-center md:gap-14">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]" style={{ color: CYAN }}>Clientes</p>
            <h2 className="mt-4 font-editorial text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.06]" style={{ color: NAVY }}>
              Han confiado en hacerlo bonito.
            </h2>
            <p className="mt-5 font-round text-sm font-bold" style={{ color: CYAN }}>{TOTAL} en total</p>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-7 sm:grid-cols-4">
            {logos.slice(0, 16).map((l) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={l.name} src={l.src!} alt={l.name} className="h-6 w-full object-contain"
                style={{ filter: l.aguantaSilueta ? "brightness(0)" : undefined, opacity: 0.5 }} />
            ))}
          </div>
        </div>
      </Marco>
    </div>
  );
}
