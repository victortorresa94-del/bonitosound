"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav } from "@/lib/site";

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
          className="md:hidden"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-text-primary" />
          <span className="mt-1.5 block h-0.5 w-6 bg-text-primary" />
          <span className="mt-1.5 block h-0.5 w-6 bg-text-primary" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-subtle bg-bg-secondary md:hidden">
          <div className="wrap flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-text-secondary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="btn btn-primary mt-3"
              onClick={() => setOpen(false)}
            >
              Hablamos
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
