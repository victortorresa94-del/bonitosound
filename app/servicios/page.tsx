import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/site";
import { alternatesFor } from "@/lib/seo";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export function generateMetadata(): Metadata {
  return {
  title: "Servicios — todo lo que tu música necesita, en un sitio",
  description:
    "Booking, management, producción, editorial, distribución, marketing y sello propio. Lo que la mayoría te hace montar con cinco proveedores, en Bonito Sound está en uno.",
  alternates: alternatesFor(`/servicios`),
  };
}

type Servicio = {
  n: string;
  slug: string;
  title: string;
  href: string;
  desc: string;
};

// Copy y orden del mockup. Records va ancho al final.
const SERVICIOS: Servicio[] = [
  { n: "01", slug: "booking", title: "Booking", href: "/booking", desc: "Conectamos tu música con el público adecuado. Giras, festivales y conciertos a medida para que tu directo llegue más lejos." },
  { n: "02", slug: "management", title: "Management", href: "/management", desc: "Acompañamos tu carrera con visión, estrategia y experiencia para que tomes las mejores decisiones en cada etapa." },
  { n: "03", slug: "produccion", title: "Producción", href: "/records/producciones", desc: "Damos forma a tu sonido. Producción musical, grabación, mezcla y mastering con criterio y sin prisas." },
  { n: "04", slug: "editorial", title: "Editorial", href: "/records/editorial", desc: "Publicamos y administramos tus derechos para que tus canciones generen ingresos y lleguen a todas partes." },
  { n: "05", slug: "distribucion", title: "Distribución", href: "/records/distribucion", desc: "Tu música en todas las plataformas. Distribución digital global, gestión de derechos y cuentas claras." },
  { n: "06", slug: "marketing", title: "Marketing", href: "/marketing", desc: "Campañas para dar a conocer tu proyecto, conectar con tu audiencia y que el lanzamiento no pase desapercibido." },
];

const RECORDS: Servicio = {
  n: "07",
  slug: "records",
  title: "Records",
  href: "/records",
  desc: "Sello discográfico propio para desarrollar y lanzar proyectos con identidad, libertad creativa y una red que impulsa tu música.",
};

/** Esquinas "a mano": border-radius asimétrico por tarjeta (nada perfecto). */
const SHAPE = [
  "16px 26px 18px 22px / 22px 18px 26px 16px",
  "24px 16px 22px 18px / 16px 24px 18px 22px",
  "20px 24px 16px 26px / 26px 16px 22px 18px",
  "26px 18px 24px 16px / 18px 26px 16px 24px",
  "18px 22px 26px 16px / 24px 20px 16px 26px",
  "22px 20px 16px 26px / 16px 24px 22px 18px",
  "20px 16px 26px 20px / 22px 26px 16px 22px",
];
/** Cada tarjeta un pelín torcida (el "rollo dibujado"). */
const TILT = ["-1.4deg", "1deg", "-0.8deg", "1.2deg", "-1.1deg", "0.7deg", "-0.6deg"];
/** Combo por tarjeta: fuente (Zilla Slab / Fredoka) + color (navy / cian),
 *  mezclado a mano para dinamismo. En grid de 3 columnas, i e i+3 caen en la
 *  MISMA columna: ningún par comparte fuente ni color → nada de franjas. */
const COMBO: { font: string; color: string }[] = [
  { font: "font-round", color: NAVY }, // 01 Booking
  { font: "display", color: CYAN }, //    02 Management
  { font: "display", color: NAVY }, //    03 Producción
  { font: "display", color: CYAN }, //    04 Editorial
  { font: "font-round", color: NAVY }, // 05 Distribución
  { font: "font-round", color: CYAN }, // 06 Marketing
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
          itemListElement: [...SERVICIOS, RECORDS].map((s, i) => ({
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

      {/* ── GRID de servicios ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-16 pt-2">
          <StaggerGroup stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICIOS.map((s, i) => (
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
                    <h2 className={`${COMBO[i].font} mt-0.5 text-2xl font-bold leading-tight md:text-[1.6rem]`} style={{ color: COMBO[i].color }}>
                      {s.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-[0.75rem] leading-snug text-text-secondary">
                      {s.desc}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </StaggerGroup>

          {/* Records: tarjeta ancha al final (ilustración a un lado, texto al otro) */}
          <RevealOnScroll className="mt-4">
            <Link
              href={RECORDS.href}
              data-cursor="link"
              className="group block transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div
                className="grid items-center gap-5 border border-[#14283C]/20 bg-[#FBFAF6] p-4 shadow-[0_2px_20px_-14px_rgba(20,40,60,0.35)] transition-[box-shadow,border-color] duration-300 group-hover:border-[#14283C] group-hover:shadow-[0_22px_44px_-24px_rgba(20,40,60,0.45)] md:grid-cols-[0.82fr_1.18fr] md:p-5"
                style={{ transform: "rotate(-0.6deg)", borderRadius: SHAPE[6] }}
              >
                <div className="flex h-52 items-center justify-center md:h-60 md:justify-start">
                  <Illu slug={RECORDS.slug} className="h-full w-auto max-w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div>
                  <Numero n={RECORDS.n} />
                  <h2 className="display mt-1 text-3xl font-bold md:text-4xl" style={{ color: NAVY }}>
                    {RECORDS.title}
                  </h2>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-text-secondary">
                    {RECORDS.desc}
                  </p>
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
