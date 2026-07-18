import Link from "next/link";
import Image from "next/image";
import { LazyVideo } from "@/components/LazyVideo";
import type { Evento } from "@/lib/content";
import { findAsset } from "@/lib/assets";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

const TYPE_LABEL: Record<Evento["type"], string> = {
  marca: "Marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Directo",
};

// Nombres que SÍ podemos afirmar como producción / tour management documentado.
const PRODUCCIONES = ["Albert Pla", "Anne Lukin", "Alfred García"];

/** Bocadillo blanco (esquina sup-izq), igual que en eventos de marca. */
function Tag({ e }: { e: Evento }) {
  return (
    <span className="absolute left-3 top-3 z-20 inline-block rounded-2xl rounded-tl-md bg-white px-3 py-1.5 text-[0.6rem] font-bold uppercase leading-[1.15] tracking-wide shadow-sm" style={{ color: NAVY }}>
      {TYPE_LABEL[e.type]}
      <br />
      <span className="text-[0.72rem]">{e.artist}</span>
    </span>
  );
}

/** Media de la tarjeta: YouTube (autoplay mudo en bucle) > vídeo R2 > foto >
 *  fallback de marca (navy + nombre) para los que aún no tienen clip subido. */
function CardMedia({ e }: { e: Evento }) {
  const cover = findAsset("eventos", e.slug);
  return (
    <>
      {/* Fallback de marca SIEMPRE detrás: mientras el vídeo carga (o si no hay
          media), se ve el nombre en navy — nunca un hueco gris. */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center p-6 text-center"
        style={{ background: "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
      >
        <span className="font-round text-2xl font-bold leading-tight text-white/25 md:text-3xl">{e.artist ?? e.brand}</span>
      </div>
      {e.youtubeId ? (
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            title={e.title}
            src={`https://www.youtube-nocookie.com/embed/${e.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${e.youtubeId}&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3`}
            allow="autoplay; encrypted-media"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-full min-w-full -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      ) : e.video ? (
        <LazyVideo src={e.video} poster={cover ?? undefined} className="absolute inset-0 h-full w-full object-cover" />
      ) : cover ? (
        <Image src={cover} alt={e.title} fill sizes="40vw" className="object-cover" />
      ) : null}
    </>
  );
}

// Rotación e inclinación por posición (mismo "rollo" collage que marcas).
const TILT = ["md:rotate-[-1.8deg]", "md:rotate-[1.5deg] md:mt-10", "md:rotate-[-1deg] md:mt-4"];

/**
 * "Eventos para artistas": mismo formato que el showcase de eventos de marca
 * (tarjetas rotadas + bocadillos), pero con giras y directos de artista y sus
 * vídeos. Sin stats/mapa. Alfred García va por YouTube (se ve ya); Albert Pla
 * y Anne Lukin son producciones nuestras y entran en cuanto suba su clip a R2.
 */
export function EventosArtistasShowcase({ eventos }: { eventos: Evento[] }) {
  const arts = eventos.filter(
    (e) => (e.type === "gira" || e.type === "showcase") && e.artist && (e.youtubeId || e.video)
  );
  // Los que renderizan ya (YouTube) primero, para que la sección luzca sin
  // depender de que estén subidos los R2.
  const ordered = [...arts].sort((a, b) => (b.youtubeId ? 1 : 0) - (a.youtubeId ? 1 : 0));
  const cluster = ordered.slice(0, 6);
  if (cluster.length === 0) return null;

  return (
    <section className="w-full" style={{ backgroundColor: "#FBFAF6" }}>
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:px-10 md:pb-24">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
          Eventos para artistas
        </p>
        <h2 className="mb-4 font-round text-3xl font-bold md:text-5xl" style={{ color: NAVY }}>
          Giras y directos que montamos.
        </h2>
        <p className="mb-12 max-w-2xl text-base text-text-secondary md:text-lg">
          No solo activamos marcas. Cuando el que sube al escenario es el artista,
          ponemos la producción, la técnica y la logística de la gira — para que lo
          único que se vea sea el directo.
        </p>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {cluster.map((e, i) => (
            <Link
              key={e.slug}
              href={`/eventos/${e.slug}`}
              className={`group relative block transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.02] ${TILT[i % TILT.length]}`}
            >
              <div
                className="relative aspect-video overflow-hidden rounded-[1.4rem] shadow-xl ring-1 ring-black/5"
                style={{ background: "radial-gradient(120% 120% at 30% 20%, #1b3a52 0%, #14283C 55%, #0d1a29 100%)" }}
              >
                <CardMedia e={e} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
              <Tag e={e} />
              <p className="mt-3 font-round text-lg font-bold" style={{ color: NAVY }}>
                {e.title}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14 border-t border-subtle pt-8">
          <p className="mb-4 text-sm text-text-muted">Producción y tour management de:</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-round text-lg font-semibold md:text-xl" style={{ color: NAVY }}>
            {PRODUCCIONES.map((name, i) => (
              <span key={name} className="whitespace-nowrap">
                {i > 0 && <span className="mr-6" style={{ color: CYAN }}>·</span>}
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
