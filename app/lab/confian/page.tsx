import Link from "next/link";
import Image from "next/image";
import { MarqueeLogoWallClient } from "@/components/motion/MarqueeLogoWallClient";
import { resolveLogos } from "@/lib/assets";
import { trustedBy } from "@/lib/site";

/**
 * BANCO DE PRUEBAS — tres diseños del banner "Han confiado en hacerlo bonito".
 *
 * No está enlazada desde ningún sitio ni entra en el sitemap: es para que
 * Víctor elija uno y ese se lleve a components/home/TrustedWall.tsx.
 *
 * Los tres usan los LOGOS DE VERDAD y las cifras de verdad, porque un banner de
 * logos se juzga con los logos que va a llevar: con placeholders todo cuadra.
 */
export const metadata = { robots: { index: false, follow: false } };

const NAVY = "#14283C";
const CYAN = "#16b6d4";
const CREMA = "#FBFAF6";

function datos() {
  const clientes = trustedBy.filter((c) => c.id !== "proveedores");
  const total = clientes.reduce((n, c) => n + c.items.length, 0);
  const vistos = new Set<string>();
  const logos = clientes
    .flatMap((c) => resolveLogos(c.dir, c.items))
    .filter((l) => {
      if (!l.src || l.isPhoto || vistos.has(l.name)) return false;
      vistos.add(l.name);
      return true;
    });
  return { clientes, total, logos };
}

/* ─────────────────────────────────────────────────────────────────────────
   C1 · EL TITULAR ENTRE DOS BANDAS
   El movimiento manda. Dos hileras de logos, una en cada sentido, y el
   titular metido entre las dos como si la marca fuera una emisora más de la
   fila. Las cifras se leen como una frase, no como un panel de estadísticas.
   ───────────────────────────────────────────────────────────────────────── */
function C1() {
  const { clientes, total, logos } = datos();
  const mitad = Math.ceil(logos.length / 2);
  return (
    <section className="py-16">
      <div className="overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeLogoWallClient items={logos.slice(0, mitad)} speed={34} mono logoClass="h-7" />
      </div>

      <div className="wrap py-9 text-center md:py-12">
        <h2 className="font-round text-[clamp(2rem,5.4vw,4rem)] font-bold leading-[1] tracking-tight">
          <span style={{ color: NAVY }}>Han confiado en </span>
          <span style={{ color: CYAN }}>hacerlo bonito</span>
          <span style={{ color: NAVY }}>.</span>
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-[0.95rem] font-semibold leading-relaxed"
          style={{ color: "rgba(20,40,60,0.6)" }}
        >
          {clientes.map((c, i) => (
            <span key={c.id}>
              {i > 0 && <span style={{ color: CYAN }}> · </span>}
              <span className="font-round text-lg font-bold" style={{ color: NAVY }}>
                {c.items.length}
              </span>{" "}
              {c.label.toLowerCase()}
            </span>
          ))}
        </p>
        <Link
          href="/clientes"
          className="mt-6 inline-block text-sm font-bold underline-offset-4 hover:underline"
          style={{ color: CYAN }}
        >
          Verlos todos ({total}) →
        </Link>
      </div>

      <div className="overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeLogoWallClient items={logos.slice(mitad)} speed={30} direction="right" mono logoClass="h-7" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   C2 · EL MURO
   Sin movimiento: una rejilla de verdad, con los logos quietos y bien
   grandes, y el titular ocupando dos casillas como si fuera un logo más.
   Es el que más "cartel" hace y el que mejor deja ver marca por marca.
   ───────────────────────────────────────────────────────────────────────── */
function C2() {
  const { total, logos } = datos();
  const muestra = logos.slice(0, 34);
  return (
    <section className="py-16">
      <div className="wrap">
        <div className="grid grid-cols-3 gap-px sm:grid-cols-4 lg:grid-cols-6" style={{ backgroundColor: "rgba(20,40,60,0.12)" }}>
          {/* El titular ocupa el hueco de dos por dos: la marca dentro del muro,
              no encima de él. */}
          <div
            className="col-span-3 row-span-2 flex flex-col justify-between p-6 sm:col-span-2 md:p-8"
            style={{ backgroundColor: NAVY }}
          >
            <h2 className="font-round text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold leading-[1.05] tracking-tight" style={{ color: CREMA }}>
              Han confiado en <span style={{ color: CYAN }}>hacerlo bonito</span>.
            </h2>
            <Link href="/clientes" className="mt-6 text-sm font-bold underline-offset-4 hover:underline" style={{ color: CYAN }}>
              Verlos todos ({total}) →
            </Link>
          </div>

          {muestra.map((l) => (
            <div
              key={l.name}
              className="flex aspect-[4/3] items-center justify-center p-3"
              style={{ backgroundColor: CREMA }}
            >
              <Image
                src={l.src!}
                alt={l.name}
                width={150}
                height={60}
                className="max-h-9 w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100"
                style={l.aguantaSilueta ? { filter: "brightness(0)" } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   C3 · EL BLOQUE NAVY
   Rompe el crema del home a todo el ancho. Titular gigante en hueco (filete
   crema) como el wordmark del pie, cifras en una línea de fichas, y los
   logos en BLANCO sobre navy. Es el más contundente de los tres.
   ───────────────────────────────────────────────────────────────────────── */
function C3() {
  const { clientes, total, logos } = datos();
  return (
    <section style={{ backgroundColor: NAVY }} className="py-16 md:py-20">
      <div className="wrap">
        {/* Hueco + relleno: "hacerlo bonito" macizo en cian para que el ojo
            caiga ahí, el resto en filete. */}
        <h2 className="font-round text-[clamp(2.1rem,6.4vw,4.8rem)] font-bold leading-[0.98] tracking-tight">
          <span style={{ color: "transparent", WebkitTextStroke: `1.6px ${CREMA}` }}>Han confiado en</span>
          <br />
          <span style={{ color: CYAN }}>hacerlo bonito.</span>
        </h2>

        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
          {clientes.map((c) => (
            <div key={c.id}>
              <p className="font-round text-2xl font-bold leading-none" style={{ color: CREMA }}>
                {c.items.length}
              </p>
              <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(251,250,246,0.5)" }}>
                {c.label}
              </p>
            </div>
          ))}
          <Link
            href="/clientes"
            className="self-end text-sm font-bold underline-offset-4 hover:underline"
            style={{ color: CYAN }}
          >
            Verlos todos ({total}) →
          </Link>
        </div>
      </div>

      <div className="mt-11 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        {/* Sobre navy la silueta va en BLANCO. Los que traen el fondo incrustado
            se quedan a color: ennegrecerlos o blanquearlos daría un tocho. */}
        <div className="[&_img]:!opacity-70 [&_img[style*='brightness']]:!invert">
          <MarqueeLogoWallClient items={logos} speed={30} mono logoClass="h-7" />
        </div>
      </div>
    </section>
  );
}

function Etiqueta({ n, titulo, nota }: { n: string; titulo: string; nota: string }) {
  return (
    <div className="wrap border-t pt-6" style={{ borderColor: "rgba(20,40,60,0.2)" }}>
      <p className="font-mono text-xs font-bold tracking-[0.2em]" style={{ color: CYAN }}>
        {n}
      </p>
      <p className="mt-1 font-round text-xl font-bold" style={{ color: NAVY }}>
        {titulo}
      </p>
      <p className="mt-1 max-w-xl text-sm" style={{ color: "rgba(20,40,60,0.6)" }}>
        {nota}
      </p>
    </div>
  );
}

export default function LabConfian() {
  return (
    <main style={{ backgroundColor: CREMA }} className="pb-24 pt-12">
      <div className="wrap pb-10">
        <h1 className="font-round text-3xl font-bold" style={{ color: NAVY }}>
          Banner &ldquo;Han confiado&rdquo; — tres diseños
        </h1>
        <p className="mt-2 max-w-2xl" style={{ color: "rgba(20,40,60,0.65)" }}>
          Con los logos y las cifras de verdad. Dime el número y lo llevo al home.
        </p>
      </div>

      <Etiqueta n="C1" titulo="El titular entre dos bandas" nota="Manda el movimiento: dos hileras en sentidos opuestos y la marca en medio, como una emisora más de la fila." />
      <C1 />

      <Etiqueta n="C2" titulo="El muro" nota="Sin movimiento. Rejilla de verdad, logos quietos y grandes, y el titular ocupando una casilla navy dentro del propio muro." />
      <C2 />

      <Etiqueta n="C3" titulo="El bloque navy" nota="Rompe el crema del home a todo el ancho. Titular en hueco como el wordmark del pie y los logos en blanco sobre navy." />
      <C3 />
    </main>
  );
}
