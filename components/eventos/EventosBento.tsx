import { LazyVideo } from "@/components/LazyVideo";
import Image from "next/image";
import Link from "next/link";
import type { Evento } from "@/lib/content";
import { findAsset, findLogo } from "@/lib/assets";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

const TYPE_LABEL: Record<Evento["type"], string> = {
  marca: "Marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
};

/**
 * Patrón de tamaños para el bento asimétrico (grid de 6 columnas, filas densas).
 * Se repite; con auto-flow dense rellena huecos. Algunas con rotación sutil.
 */
const SIZES = [
  "col-span-6 row-span-3 sm:col-span-3", // big portrait
  "col-span-3 row-span-2", // med
  "col-span-3 row-span-2", // med
  "col-span-6 row-span-2 sm:col-span-4", // wide
  "col-span-3 row-span-2 sm:col-span-2", // small
  "col-span-3 row-span-2", // med
  "col-span-6 row-span-2 sm:col-span-3", // med
];
const ROTATE = ["", "sm:rotate-[-1.5deg]", "", "", "sm:rotate-[1.5deg]", "", ""];

function BentoCard({ e, size, rot }: { e: Evento; size: string; rot: string }) {
  const cover = findAsset("eventos", e.slug);
  const label = e.brand ?? e.artist ?? TYPE_LABEL[e.type];
  const logo = e.brand ? findLogo("marcas", e.brand) : null;

  return (
    <Link
      href={`/eventos/${e.slug}`}
      className={`group relative overflow-hidden rounded-3xl border transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.02] ${size} ${rot}`}
      style={{ borderColor: "rgba(20,40,60,0.12)", backgroundColor: "#eef0ee" }}
    >
      {/* Media: vídeo (carga perezosa) > foto > logo */}
      {e.video ? (
        <LazyVideo
          src={e.video}
          poster={cover ?? undefined}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : cover ? (
        <Image
          src={cover}
          alt={e.title}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : logo ? (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image src={logo} alt={label} width={200} height={120} className="max-h-14 w-auto object-contain opacity-90" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-round text-2xl font-bold" style={{ color: NAVY }}>{label}</span>
        </div>
      )}

      {/* Degradado para legibilidad del pill sobre media */}
      {(e.video || cover) && (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/10" />
      )}

      {/* Pill "MARCA X / GIRA X" tipo bocadillo */}
      <span
        className="absolute left-4 top-4 z-10 rounded-2xl rounded-tl-sm px-3 py-1.5 text-[0.62rem] font-bold uppercase leading-tight tracking-wide"
        style={{ backgroundColor: e.video || cover ? "rgba(251,250,246,0.95)" : CYAN, color: NAVY }}
      >
        {TYPE_LABEL[e.type]}
        <br />
        <span className="text-[0.7rem]">{label}</span>
      </span>
    </Link>
  );
}

export function EventosBento({ eventos }: { eventos: Evento[] }) {
  // Solo eventos con media real (vídeo/foto). Los demás quedan ocultos hasta
  // que caiga su clip: mismo sistema drop-in, nada de cajas vacías.
  // Vídeo primero (van a los slots grandes y se autoreproducen).
  const withVideo = eventos.filter((e) => e.video);
  const withCover = eventos.filter((e) => !e.video && findAsset("eventos", e.slug));
  const ordered = [...withVideo, ...withCover];

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-24">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#16b6d4" }}>
          Más eventos en vídeo
        </p>
        <h2 className="mb-8 font-round text-3xl font-bold md:text-5xl" style={{ color: "#14283C" }}>
          Míralo, no te lo contamos.
        </h2>
        <div className="grid auto-rows-[76px] grid-cols-6 gap-3 md:auto-rows-[92px] md:gap-4">
          {ordered.map((e, i) => (
            <BentoCard
              key={e.slug}
              e={e}
              size={SIZES[i % SIZES.length]}
              rot={ROTATE[i % ROTATE.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
