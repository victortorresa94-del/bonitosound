import type { Metadata } from "next";
import Image from "next/image";
import { Section, Cta } from "@/components/ui";
import {
  RevealOnScroll,
  StaggerGroup,
  SplitTextReveal,
  MagneticButton,
  ParallaxLayer,
} from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Universo Bonito — Artiverse, Giraverse y Jaleo Sound",
  description:
    "Lo que Bonito crea por su cuenta: Artiverse conecta el sector, Giraverse ordena las giras y Jaleo Sound lleva la cultura española a Ámsterdam.",
  alternates: { canonical: `${site.url}/universo` },
};

/** Ficha de proyecto propio (software o festival). */
function ProjectCard({
  tag,
  name,
  children,
  primary,
  secondary,
}: {
  tag: string;
  name: string;
  children: React.ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div className="card flex flex-col">
      <p className="eyebrow">{tag}</p>
      <h2 className="display mt-3 text-3xl">{name}</h2>
      <p className="mt-3 flex-1 text-text-secondary">{children}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {secondary && (
          <MagneticButton strength={0.25}>
            <Cta href={secondary.href} variant="ghost">
              {secondary.label}
            </Cta>
          </MagneticButton>
        )}
        {primary && (
          <MagneticButton strength={0.35}>
            <Cta href={primary.href}>{primary.label}</Cta>
          </MagneticButton>
        )}
      </div>
    </div>
  );
}

export default function Universo() {
  const hero = findAsset("heroes", "universo") ?? findAsset("heroes", "lab");
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap grid items-center gap-10 py-24 md:grid-cols-[1.2fr_1fr] md:py-32">
          <div>
            <RevealOnScroll as="p" className="eyebrow mb-4">
              Universo Bonito
            </RevealOnScroll>
            <SplitTextReveal
              as="h1"
              split="lines"
              className="display text-[clamp(2.6rem,7vw,5.4rem)]"
            >
              No esperamos a que el sector se arregle solo. Lo construimos.
            </SplitTextReveal>
            <RevealOnScroll as="p" className="mt-7 text-lg text-text-secondary" delay={0.2}>
              Más allá de los servicios, Bonito crea sus propias cosas: software
              que le falta a la industria y un festival propio. Esto es lo que
              montamos por nuestra cuenta.
            </RevealOnScroll>
          </div>
          {hero ? (
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-subtle">
              <ParallaxLayer speed={0.2} className="absolute inset-0">
                <Image
                  src={hero}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="scale-110 object-cover"
                />
              </ParallaxLayer>
            </div>
          ) : null}
        </div>
      </section>

      <Section>
        <StaggerGroup stagger={0.08} className="grid gap-6 md:grid-cols-3">
          <ProjectCard
            tag="En marcha · Software"
            name="Artiverse"
            primary={{ href: site.external.artiverse, label: "Ir a Artiverse →" }}
            secondary={{ href: "/lab/artiverse", label: "Qué es →" }}
          >
            Plataforma B2B que conecta agencias, programadores y promotores. El
            sitio donde el sector deja de trabajar a ciegas.
          </ProjectCard>

          <ProjectCard
            tag="En desarrollo · Software"
            name="Giraverse"
            secondary={{ href: "/lab/giraverse", label: "Avísame cuando esté →" }}
          >
            La circulación de giras, ordenada. Nacional e internacional. Lo que
            ahora se resuelve a base de llamadas y suerte.
          </ProjectCard>

          <ProjectCard
            tag="Festival propio"
            name="Jaleo Sound"
            primary={{ href: site.external.jaleo, label: "jaleosound.com →" }}
            secondary={{ href: "/jaleo-sound", label: "El festival →" }}
          >
            Nuestro festival de cultura española y latina en Ámsterdam. Del brief
            a la marca propia: cuando montas el sistema entero, también montas la
            fiesta.
          </ProjectCard>
        </StaggerGroup>
      </Section>

      <Section className="bg-bg-primary">
        <RevealOnScroll as="p" className="eyebrow mb-4">
          Por qué lo construimos
        </RevealOnScroll>
        <SplitTextReveal
          as="h2"
          split="lines"
          className="display text-[clamp(2rem,4.5vw,3.4rem)]"
        >
          Entender el sistema entero también significa darle herramientas y crear
          las nuestras.
        </SplitTextReveal>
        <RevealOnScroll as="p" className="mt-5 max-w-2xl text-text-secondary" delay={0.2}>
          Bonito no es una agencia con un departamento de tecnología. Es un
          ecosistema donde el software y los proyectos propios son otra vertical:
          la que conecta a las demás y al resto de la industria.
        </RevealOnScroll>
      </Section>
    </>
  );
}
