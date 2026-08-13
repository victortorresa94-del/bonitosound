import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export const metadata: Metadata = {
  title: "Servicios — todo lo que tu música necesita, en un sitio",
  description:
    "Booking, management, producción, editorial, distribución, marketing y sello propio. Lo que la mayoría te hace montar con cinco proveedores, en Bonito Sound está en uno.",
  alternates: { canonical: `${site.url}/servicios` },
};

type Servicio = {
  n: string;
  slug: string;
  title: string;
  href: string;
  desc: string;
  /**
   * Va a TODO EL ANCHO, con el dibujo a un lado y el texto al otro.
   *
   * No es capricho: con siete tarjetas pequeñas en una rejilla de tres, la
   * última se quedaba sola en su fila y la página cojeaba por abajo. Con dos
   * anchas intercaladas el ritmo sale 3 · ancha · 3 · ancha, y las dos que se
   * llevan el ancho son las que lo merecen: el marketing y el sello.
   */
  ancho?: boolean;
};

// El orden manda: 3 pequeñas · ancha · 3 pequeñas · ancha. Ver el campo `ancho`.
const SERVICIOS: Servicio[] = [
  { n: "01", slug: "booking", title: "Booking", href: "/booking", desc: "Conectamos tu música con el público adecuado. Giras, festivales y conciertos a medida para que tu directo llegue más lejos." },
  { n: "02", slug: "management", title: "Management", href: "/management", desc: "Acompañamos tu carrera con visión, estrategia y experiencia para que tomes las mejores decisiones en cada etapa." },
  { n: "03", slug: "produccion", title: "Producción", href: "/records/producciones", desc: "Montamos la gira entera: producción técnica, escenario, logística y road management, plaza a plaza." },
  { n: "04", slug: "marketing", title: "Marketing de redes sociales", href: "/marketing", desc: "Campañas, contenido y paid media para dar a conocer tu proyecto, conectar con tu audiencia y que ningún lanzamiento pase desapercibido.", ancho: true },
  { n: "05", slug: "estudio", title: "Estudio de grabación", href: "/records/estudio", desc: "De la composición al máster. Grabación y producción musical con Marco La Testa y Jano Montano, al servicio de tu identidad." },
  { n: "06", slug: "editorial", title: "Editorial", href: "/records/editorial", desc: "Publicamos y administramos tus derechos para que tus canciones generen ingresos y lleguen a todas partes." },
  { n: "07", slug: "distribucion", title: "Distribución", href: "/records/distribucion", desc: "Tu música en todas las plataformas. Distribución digital global, gestión de derechos y cuentas claras." },
  { n: "08", slug: "records", title: "Bonito Records", href: "/records", desc: "Sello discográfico propio para desarrollar y lanzar proyectos con identidad, libertad creativa y una red que impulsa tu música.", ancho: true },
];

/** Esquinas "a mano": border-radius asimétrico por tarjeta (nada perfecto). */
const SHAPE = [
  "16px 26px 18px 22px / 22px 18px 26px 16px",
  "24px 16px 22px 18px / 16px 24px 18px 22px",
  "20px 24px 16px 26px / 26px 16px 22px 18px",
  "26px 18px 24px 16px / 18px 26px 16px 24px",
  "18px 22px 26px 16px / 24px 20px 16px 26px",
  "22px 20px 16px 26px / 16px 24px 22px 18px",
  "20px 16px 26px 20px / 22px 26px 16px 22px",
  "24px 22px 18px 16px / 20px 16px 24px 26px",
];
/** Cada tarjeta un pelín torcida (el "rollo dibujado"). */
const TILT = ["-1.4deg", "1deg", "-0.8deg", "0.5deg", "-1.1deg", "1.2deg", "-0.9deg", "-0.6deg"];
/** Combo por tarjeta: fuente (Zilla Slab / Fredoka) + color (navy / cian),
 *  mezclado a mano para dinamismo. En grid de 3 columnas, i e i+3 caen en la
 *  MISMA columna: ningún par comparte fuente ni color → nada de franjas. */
const COMBO: { font: string; color: string }[] = [
  { font: "font-round", color: NAVY }, // Booking
  { font: "display", color: CYAN }, //    Management
  { font: "display", color: NAVY }, //    Producción
  { font: "font-round", color: CYAN }, // Estudio de grabación
  { font: "display", color: NAVY }, //    Editorial
  { font: "font-round", color: NAVY }, // Distribución
];

/** Dibujo de la tarjeta (gpt-image-2) en /public/img/servicios/index/<slug>.png.
 *  Plug-and-play: si aún no está, la tarjeta se pinta sin ilustración. */
function art(slug: string): string | null {
  const rel = `/img/servicios/index/${slug}.png`;
  const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
  return fs.existsSync(abs) ? rel : null;
}

function Illu({ slug, className }: { slug: string; className?: string }) {
  const src = art(slug);
  if (!src) return null;
  return (
    <Image
      src={src}
      alt=""
      width={360}
      height={360}
      className={`object-contain ${className ?? ""}`}
    />
  );
}

function Numero({ n }: { n: string }) {
  return (
    <span className="font-round text-lg font-bold" style={{ color: CYAN }}>
      {n}
    </span>
  );
}

/** Estilo común de tarjeta interior (borde sutil + sombra + hover). */
const CARD =
  "flex h-full flex-col border border-[#14283C]/20 bg-[#FBFAF6] p-3.5 shadow-[0_2px_20px_-14px_rgba(20,40,60,0.35)] transition-[box-shadow,border-color] duration-300 group-hover:border-[#14283C] group-hover:shadow-[0_22px_44px_-24px_rgba(20,40,60,0.45)] md:p-4";

export default function Servicios() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Servicios de Bonito Sound",
          itemListElement: SERVICIOS.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: `${site.url}${s.href}`,
          })),
        }}
      />

      {/* ── HERO ── titular en la fuente de los heroes (.display / Zilla Slab) ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-4 pt-14 md:pb-6 md:pt-16">
          <RevealOnScroll as="p" className="eyebrow mb-4">
            Servicios
          </RevealOnScroll>
          <h1
            className="display font-bold leading-[0.95] text-[clamp(2.1rem,5.4vw,4rem)]"
            style={{ color: NAVY }}
          >
            Lo que la mayoría te hace montar con cinco proveedores,{" "}
            <span style={{ color: CYAN }}>aquí está en uno.</span>
          </h1>
          <RevealOnScroll
            as="p"
            delay={0.15}
            className="mt-5 max-w-[52ch] text-base leading-relaxed text-text-secondary"
          >
            En Bonito Sound reunimos todo lo que tu proyecto necesita para
            crecer, sonar mejor y llegar más lejos. Menos complicaciones, más
            música.
          </RevealOnScroll>
        </div>
      </section>

      {/* ── LOS SERVICIOS ──
             Una sola rejilla de tres columnas. Las tarjetas anchas ocupan las
             tres, así que basta con ponerlas en su sitio del array para que el
             ritmo salga 3 · ancha · 3 · ancha; no hay dos bloques separados que
             mantener en sincronía.
             El índice de COMBO se lleva aparte (`iPeq`) porque las anchas no
             consumen combinación: llevan el estilo fijo de banner. */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-16 pt-2">
          <StaggerGroup stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              let iPeq = -1;
              return SERVICIOS.map((s, i) => {
                if (s.ancho) {
                  return (
                    <div key={s.slug} className="sm:col-span-2 lg:col-span-3">
                      <Link
                        href={s.href}
                        data-cursor="link"
                        className="group block transition-transform duration-300 hover:-translate-y-1.5"
                      >
                        <div
                          className="grid items-center gap-5 border border-[#14283C]/20 bg-[#FBFAF6] p-4 shadow-[0_2px_20px_-14px_rgba(20,40,60,0.35)] transition-[box-shadow,border-color] duration-300 group-hover:border-[#14283C] group-hover:shadow-[0_22px_44px_-24px_rgba(20,40,60,0.45)] md:grid-cols-[0.82fr_1.18fr] md:p-5"
                          style={{ transform: `rotate(${TILT[i % TILT.length]})`, borderRadius: SHAPE[i % SHAPE.length] }}
                        >
                          <div className="flex h-52 items-center justify-center md:h-60 md:justify-start">
                            <Illu slug={s.slug} className="h-full w-auto max-w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                          </div>
                          <div>
                            <Numero n={s.n} />
                            {/* Las dos anchas comparten tipografía y color a
                                propósito: se leen como un par, no como dos
                                sorpresas distintas. */}
                            <h2 className="display mt-1 text-3xl font-bold md:text-4xl" style={{ color: NAVY }}>
                              {s.title}
                            </h2>
                            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-text-secondary">
                              {s.desc}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
                iPeq += 1;
                const combo = COMBO[iPeq % COMBO.length];
                return (
                  <div key={s.slug} className="h-full">
                    <Link
                      href={s.href}
                      data-cursor="link"
                      className="group block h-full transition-transform duration-300 hover:-translate-y-1.5"
                    >
                      <div className={CARD} style={{ transform: `rotate(${TILT[i % TILT.length]})`, borderRadius: SHAPE[i % SHAPE.length] }}>
                        <Numero n={s.n} />
                        <div className="flex h-52 items-center justify-center md:h-60">
                          <Illu slug={s.slug} className="h-full w-auto max-w-full transition-transform duration-500 group-hover:scale-[1.05]" />
                        </div>
                        <h2 className={`${combo.font} mt-0.5 text-2xl font-bold leading-tight md:text-[1.6rem]`} style={{ color: combo.color }}>
                          {s.title}
                        </h2>
                        <p className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-text-secondary">
                          {s.desc}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              });
            })()}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
