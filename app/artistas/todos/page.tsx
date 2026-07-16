import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, Heading } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roster completo — Todos los artistas de Bonito Sound",
  description:
    "Todos los artistas de Bonito Sound: booking, management, sello y catálogo de distribución.",
  alternates: { canonical: `${site.url}/artistas/todos` },
};

export default function RosterCompleto() {
  const all = getArtists().map((a) => ({
    ...a,
    photo: a.image ?? findAsset("artistas", a.slug),
  }));

  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-20 md:py-28">
          <RevealOnScroll as="p" className="eyebrow mb-4">
            Roster completo
          </RevealOnScroll>
          <Heading>Todos los que llevamos.</Heading>
          <RevealOnScroll as="p" className="mt-5 max-w-2xl text-lg text-text-secondary" delay={0.15}>
            Booking, management, sello y catálogo de distribución. {all.length} artistas.
          </RevealOnScroll>
        </div>
      </section>

      <Section>
        <StaggerGroup
          stagger={0.04}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {all.map((a) => (
            <Link key={a.slug} href={`/artistas/${a.slug}`} className="group" data-cursor="link">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                {a.photo ? (
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-4 text-center">
                    <span className="display text-xl text-text-muted">{a.name}</span>
                  </div>
                )}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="display text-lg text-white">{a.name}</span>
                </span>
              </div>
              <p className="mt-2 text-sm text-text-muted">{a.genre}</p>
            </Link>
          ))}
        </StaggerGroup>
      </Section>
    </>
  );
}
