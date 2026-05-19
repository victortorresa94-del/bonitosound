import type { Metadata } from "next";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lab — Artiverse y Giraverse",
  description:
    "El software que el sector cultural no tiene. Artiverse conecta agencias, programadores y promotores. Giraverse ordena la circulación de giras.",
  alternates: { canonical: `${site.url}/lab` },
};

export default function Lab() {
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-24 md:py-32">
          <div className="stagger max-w-3xl">
            <Eyebrow>Lab</Eyebrow>
            <Heading as="h1">
              El sector mueve carreras por WhatsApp. Nos parece flipante.
            </Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Cientos de millones moviéndose con Excel, WhatsApp y favores. No
              esperamos a que alguien lo arregle. Lo construimos.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col">
            <Eyebrow>En marcha · 200+ usuarios</Eyebrow>
            <h2 className="display mt-3 text-3xl">Artiverse</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              Plataforma B2B que conecta agencias, programadores y promotores.
              El sitio donde el sector deja de trabajar a ciegas.
            </p>
            <div className="mt-6 flex gap-3">
              <Cta href="/lab/artiverse" variant="ghost">
                Qué es →
              </Cta>
              <Cta href={site.external.artiverse}>Ir a Artiverse →</Cta>
            </div>
          </div>

          <div className="card flex flex-col">
            <Eyebrow>En desarrollo</Eyebrow>
            <h2 className="display mt-3 text-3xl">Giraverse</h2>
            <p className="mt-3 flex-1 text-text-secondary">
              La circulación de giras, ordenada. Nacional e internacional. Lo
              que ahora se resuelve a base de llamadas y suerte.
            </p>
            <div className="mt-6">
              <Cta href="/lab/giraverse" variant="ghost">
                Avísame cuando esté →
              </Cta>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <Eyebrow>Por qué construimos software</Eyebrow>
        <Heading className="max-w-3xl">
          Porque entender el sistema entero también significa darle
          herramientas.
        </Heading>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Bonito no es una agencia con un departamento de tecnología. Es un
          ecosistema donde el software es otra vertical: la que conecta a las
          demás y al resto de la industria.
        </p>
      </Section>
    </>
  );
}
