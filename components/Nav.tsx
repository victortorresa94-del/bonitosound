"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-bg-primary/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="Bonito Sound — inicio"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/img/marca/logo-bonito.avif"
            alt="Bonito Sound"
            width={400}
            height={500}
            priority
            unoptimized
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contacto" className="btn btn-primary px-5 py-2">
            Hablamos
          </Link>
        </nav>

        <button
          className="relative h-6 w-6 md:hidden"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="absolute left-0 right-0 h-0.5 bg-text-primary"
            animate={open ? { top: "50%", rotate: 45, y: "-50%" } : { top: "25%", rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
          <motion.span
            className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-text-primary"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute left-0 right-0 h-0.5 bg-text-primary"
            animate={open ? { top: "50%", rotate: -45, y: "-50%" } : { top: "75%", rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-subtle bg-bg-secondary md:hidden"
          >
            <div className="wrap flex flex-col py-4">
              {nav.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.06 * idx, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 text-text-secondary"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 * nav.length, ease: EASE }}
              >
                <Link
                  href="/contacto"
                  className="btn btn-primary mt-3"
                  onClick={() => setOpen(false)}
                >
                  Hablamos
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
