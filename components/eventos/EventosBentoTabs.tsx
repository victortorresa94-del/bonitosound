"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "@/components/LazyVideo";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

export type Role = "hero" | "wide" | "regular" | "tall";

export type BentoCardData = {
  slug: string;
  href: string;
  typeLabel: string;
  label: string;
  cover: string | null;
  logo: string | null;
  video: string | null;
  role: Role;
  /** Clase Tailwind de object-position (p.ej. "object-[center_85%]"); por
   *  defecto centrado. Sesga qué parte del vídeo se ve al recortar. */
  objectPosition?: string;
  rot: string;
};

/** Tamaño de celda por rol, decidido por cómo se ve cada vídeo de verdad
 *  (ver comentario en EventosBento.tsx), no por su orientación en bruto. */
const ROLE_CLASS: Record<Role, string> = {
  hero: "col-span-6 row-span-3 sm:col-span-4",
  wide: "col-span-6 row-span-2 sm:col-span-3",
  regular: "col-span-3 row-span-2 sm:col-span-2",
  tall: "col-span-3 row-span-4 sm:col-span-2",
};

function BentoCard({ c }: { c: BentoCardData }) {
  return (
    <Link
      href={c.href}
      className={`group relative overflow-hidden rounded-3xl border transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.02] ${ROLE_CLASS[c.role]} ${c.rot}`}
      style={{ borderColor: "rgba(20,40,60,0.12)", backgroundColor: "#eef0ee" }}
    >
      {/* Media: vídeo (carga perezosa) > foto > logo */}
      {c.video ? (
        <LazyVideo
          src={c.video}
          poster={c.cover ?? undefined}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={c.objectPosition ? { objectPosition: c.objectPosition } : undefined}
        />
      ) : c.cover ? (
        <Image
          src={c.cover}
          alt={c.label}
          fill
          sizes="(max-width: 640px) 100vw, 40vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={c.objectPosition ? { objectPosition: c.objectPosition } : undefined}
        />
      ) : c.logo ? (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <Image src={c.logo} alt={c.label} width={200} height={120} className="max-h-14 w-auto object-contain opacity-90" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-round text-2xl font-bold" style={{ color: NAVY }}>{c.label}</span>
        </div>
      )}

      {/* Degradado para legibilidad del pill sobre media */}
      {(c.video || c.cover) && (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/10" />
      )}

      {/* Pill "MARCA X / GIRA X" tipo bocadillo */}
      <span
        className="absolute left-4 top-4 z-10 rounded-2xl rounded-tl-sm px-3 py-1.5 text-[0.62rem] font-bold uppercase leading-tight tracking-wide"
        style={{ backgroundColor: c.video || c.cover ? "rgba(251,250,246,0.95)" : CYAN, color: NAVY }}
      >
        {c.typeLabel}
        <br />
        <span className="text-[0.7rem]">{c.label}</span>
      </span>
    </Link>
  );
}

/**
 * Pestañas Marcas/Artistas sobre el mismo bento: solo se montan (y
 * reproducen) los vídeos de la pestaña activa, nunca los 12 a la vez —
 * evita el lag de tener demasiados <video> reproduciéndose en pantalla.
 */
export function EventosBentoTabs({
  marcas,
  artistas,
}: {
  marcas: BentoCardData[];
  artistas: BentoCardData[];
}) {
  const [tab, setTab] = useState<"marcas" | "artistas">("marcas");
  const active = tab === "marcas" ? marcas : artistas;

  return (
    <>
      {/* Selector Marcas / Artistas */}
      <div
        className="mb-8 inline-flex rounded-full border p-1"
        style={{ borderColor: "rgba(20,40,60,0.15)" }}
        role="tablist"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "marcas"}
          onClick={() => setTab("marcas")}
          className="rounded-full px-5 py-2 text-sm font-bold transition-colors"
          style={
            tab === "marcas"
              ? { backgroundColor: NAVY, color: "#FBFAF6" }
              : { color: "rgba(20,40,60,0.55)" }
          }
        >
          Marcas ({marcas.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "artistas"}
          onClick={() => setTab("artistas")}
          className="rounded-full px-5 py-2 text-sm font-bold transition-colors"
          style={
            tab === "artistas"
              ? { backgroundColor: NAVY, color: "#FBFAF6" }
              : { color: "rgba(20,40,60,0.55)" }
          }
        >
          Artistas ({artistas.length})
        </button>
      </div>

      <div className="grid auto-rows-[76px] grid-flow-row-dense grid-cols-6 gap-3 md:auto-rows-[92px] md:gap-4">
        {active.map((c) => (
          <BentoCard key={c.slug} c={c} />
        ))}
      </div>
    </>
  );
}
