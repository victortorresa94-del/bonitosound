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
};

// Copy y orden del mockup. Records va ancho al final.
const SERVICIOS: Servicio[] = [
  { n: "01", slug: "booking", title: "Booking", href: "/records/booking", desc: "Conectamos tu música con el público adecuado. Giras, festivales y conciertos a medida para que tu directo llegue más lejos." },
  { n: "02", slug: "management", title: "Management", href: "/records/management", desc: "Acompañamos tu carrera con visión, estrategia y experiencia para que tomes las mejores decisiones en cada etapa." },
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
      width={320}
      height={320}
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

      {/* ── HERO ── titular del mockup (font-round chunky) + "en uno." cian ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-8 pt-20 md:pb-12 md:pt-28">
          <RevealOnScroll as="p" className="eyebrow mb-6">
            Servicios
          </RevealOnScroll>
          <h1
            className="font-round font-bold leading-[0.98] text-[clamp(2.6rem,7vw,5.4rem)]"
            style={{ color: NAVY }}
          >
            Lo que la mayoría te hace montar con cinco proveedores,{" "}
            <span style={{ color: CYAN }}>aquí está en uno.</span>
          </h1>
          <RevealOnScroll
            as="p"
            delay={0.15}
            className="mt-7 max-w-[54ch] text-lg leading-relaxed text-text-secondary"
          >
            En Bonito Sound reunimos todo lo que tu proyecto necesita para
            crecer, sonar mejor y llegar más lejos. Menos complicaciones, más
            música.
          </RevealOnScroll>
        </div>
      </section>

      {/* ── GRID de servicios ── */}
      <section style={{ backgroundColor: "#FBFAF6" }}>
        <div className="wrap pb-24 pt-4">
          <StaggerGroup stagger={0.07} className="grid gap-6 md:grid-cols-2">
            {SERVICIOS.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                data-cursor="link"
                className="group flex flex-col rounded-[1.75rem] border border-subtle bg-white/60 p-7 shadow-[0_2px_22px_-14px_rgba(20,40,60,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#14283C] hover:shadow-[0_20px_44px_-22px_rgba(20,40,60,0.4)] md:p-9"
              >
                <Numero n={s.n} />
                <div className="mt-2 flex h-44 items-center justify-center">
                  <Illu slug={s.slug} className="h-full w-auto max-w-[80%] transition-transform duration-500 group-hover:scale-[1.06]" />
                </div>
                <h2 className="font-round text-2xl font-bold md:text-3xl" style={{ color: NAVY }}>
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
              </Link>
            ))}
          </StaggerGroup>

          {/* Records: tarjeta ancha al final (ilustración a un lado, texto al otro) */}
          <RevealOnScroll className="mt-6">
            <Link
              href={RECORDS.href}
              data-cursor="link"
              className="group grid items-center gap-6 rounded-[1.75rem] border border-subtle bg-white/60 p-7 shadow-[0_2px_22px_-14px_rgba(20,40,60,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#14283C] hover:shadow-[0_20px_44px_-22px_rgba(20,40,60,0.4)] md:grid-cols-[0.7fr_1.3fr] md:p-10"
            >
              <div className="flex h-44 items-center justify-center md:justify-start">
                <Illu slug={RECORDS.slug} className="h-full w-auto max-w-[80%] transition-transform duration-500 group-hover:scale-[1.05]" />
              </div>
              <div>
                <Numero n={RECORDS.n} />
                <h2 className="mt-2 font-round text-3xl font-bold md:text-4xl" style={{ color: NAVY }}>
                  {RECORDS.title}
                </h2>
                <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-text-secondary">
                  {RECORDS.desc}
                </p>
              </div>
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
