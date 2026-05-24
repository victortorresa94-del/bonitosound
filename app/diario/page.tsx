import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diario",
  description:
    "Noticias y publicaciones de Bonito Sound: nuevos artistas, lanzamientos y presencia en eventos.",
  alternates: { canonical: `${site.url}/diario` },
};

export default function Diario() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Diario</Eyebrow>
            <Heading as="h1">Lo que va pasando, sin postureo.</Heading>
          </div>
        </div>
      </section>

      <Section>
        <div className="rounded-3xl border border-subtle bg-bg-secondary p-12 text-center">
          <Heading as="h3">Todavía no hemos escrito nada aquí.</Heading>
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            El diario se llena cuando hay algo que contar de verdad: un fichaje,
            un lanzamiento, un evento. No para rellenar. Mientras tanto, lo que
            se cuece está en Instagram.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta href={site.social.instagram}>Ver @bonito_sound →</Cta>
          </div>
        </div>
      </Section>
    </>
  );
}
