"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export type RosterItem = {
  slug: string;
  name: string;
  genre: string;
  image: string | null;
};

/**
 * Roster estilo agencia de booking premium (patrón Earth Agency):
 * lista de nombres GIGANTES; al pasar el cursor sobre uno, su foto aparece
 * flotando y persiguiendo el ratón. En mobile cae a un grid normal con foto
 * (sin hover), que es robusto y táctil.
 */
export function RosterHover({ items }: { items: RosterItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Posición del preview, suavizada con spring
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  function onMove(e: React.MouseEvent) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <>
      {/* DESKTOP: lista tipográfica con preview al cursor */}
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        className="relative hidden md:block"
      >
        {/* Preview flotante */}
        <AnimatePresence>
          {active !== null && items[active]?.image && (
            <motion.div
              key={items[active].slug}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ left: sx, top: sy, x: "-50%", y: "-50%" }}
              className="pointer-events-none absolute z-20 h-[22rem] w-[17rem] overflow-hidden rounded-2xl border border-subtle shadow-[0_30px_80px_-20px_rgba(11,15,20,0.4)]"
            >
              <Image
                src={items[active].image as string}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="divide-y divide-subtle border-y border-subtle">
          {items.map((a, i) => (
            <li key={a.slug}>
              <Link
                href={`/artistas/${a.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                className="group flex items-center justify-between py-6 transition-colors"
              >
                <span
                  className={`display text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] transition-all duration-300 ${
                    active === i
                      ? "text-accent-blue translate-x-4"
                      : active === null
                        ? "text-text-primary"
                        : "text-text-muted/40"
                  }`}
                >
                  {a.name}
                </span>
                <span
                  className={`shrink-0 pl-6 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                    active === i ? "text-accent-cyan opacity-100" : "text-text-muted opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {a.genre}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* MOBILE: grid táctil robusto */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {items.map((a) => (
          <Link
            key={a.slug}
            href={`/artistas/${a.slug}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary"
          >
            {a.image && (
              <Image
                src={a.image}
                alt={a.name}
                fill
                sizes="50vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="display text-xl text-white">{a.name}</p>
              <p className="text-[11px] uppercase tracking-wide text-white/70">{a.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
