import type { Metadata } from "next";
import Image from "next/image";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { LogoWall } from "@/components/LogoWall";
import { findLogo } from "@/lib/assets";
import { team, memberships, support, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros — Quiénes están detrás de Bonito Sound",
  description:
    "El equipo de Bonito Sound en Sabadell. Miembros de UFI, SGAE, AGEDI, ARTE, AEDEM y European Music Council.",
  alternates: { canonical: `${site.url}/nosotros` },
};

export default function Nosotros() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Nosotros</Eyebrow>
            <Heading as="h1">Gente del sector. Cansada del sector.</Heading>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="space-y-5 text-lg text-text-secondary">
            <p>
              Bonito Sound se monta en 2022 en Sabadell. No para hacer una
              agencia más: para hacer la que faltaba.
            </p>
            <p>
              Treinta años en la industria dan para ver de todo. Sobre todo,
              para ver lo que no funciona y por qué nadie lo arregla. Nosotros
              lo arreglamos.
            </p>
            <p>
              Somos pocos, hacemos mucho y cogemos el teléfono. Si buscas una
              consultora con keynote, esta no es tu web.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl border border-subtle bg-bg-tertiary" />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Equipo</Eyebrow>
        <Heading>Tres personas con nombre y teléfono.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((p) => {
            const photo = findLogo("equipo", p.name);
            return (
              <div key={p.name} className="card">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="display text-xl">{p.name}</h3>
                <p className="mt-1 text-sm text-accent-warm">{p.role}</p>
                <p className="mt-3 text-sm text-text-secondary">{p.line}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Roser Gamonal y Cristina: rol exacto y aparición pública pendiente de
          confirmar con Víctor (§17 del brief).
        </p>
      </Section>

      <Section>
        <LogoWall items={memberships} dir="instituciones" label="Miembros activos de" />
        <div className="mt-12">
          <LogoWall items={support} dir="apoyos" label="Con el apoyo de" />
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="rounded-3xl border border-subtle bg-bg-tertiary p-10 text-center md:p-16">
          <Heading>¿Hablamos?</Heading>
          <div className="mt-8 flex justify-center">
            <Cta href="/contacto">Hablamos →</Cta>
          </div>
        </div>
      </Section>
    </>
  );
}
