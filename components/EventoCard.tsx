import Image from "next/image";
import Link from "next/link";
import type { Evento } from "@/lib/content";
import { findAsset, findLogo } from "@/lib/assets";
import { HoverVideo } from "@/components/HoverVideo";

const TYPE_LABEL: Record<Evento["type"], string> = {
  marca: "Marca",
  gira: "Gira",
  festival: "Festival",
  showcase: "Showcase",
};

/**
 * Tarjeta de evento para la rejilla "top" de /eventos: vídeo autoplay en
 * hover (o poster estático si no hay vídeo/reduced-motion), tipo, marca o
 * artista, y título. Enlaza a la página individual /eventos/[slug].
 */
export function EventoCard({ evento }: { evento: Evento }) {
  const cover = findAsset("eventos", evento.slug);
  const label = evento.brand ?? evento.artist ?? TYPE_LABEL[evento.type];
  // Mientras no haya vídeo ni foto, si es marca y tenemos su logo, lo usamos
  // como portada limpia en vez de texto suelto.
  const logo = evento.brand ? findLogo("marcas", evento.brand) : null;

  return (
    <Link
      href={`/eventos/${evento.slug}`}
      className="group block overflow-hidden rounded-2xl border border-subtle"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary">
        {evento.video ? (
          <HoverVideo
            src={evento.video}
            poster={cover ?? undefined}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : cover ? (
          <Image
            src={cover}
            alt={evento.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image
              src={logo}
              alt={label}
              width={200}
              height={120}
              className="max-h-16 w-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display text-2xl text-text-muted">{label}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-primary backdrop-blur-sm">
          {TYPE_LABEL[evento.type]}
        </span>
      </div>
      <div className="p-5">
        <p className="text-sm text-text-secondary">{label}</p>
        <h3 className="display mt-1 text-lg leading-snug">{evento.title}</h3>
      </div>
    </Link>
  );
}
