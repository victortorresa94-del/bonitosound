import { Section, Heading } from "@/components/ui";
import { RevealOnScroll } from "@/components/motion";

/**
 * "Cómo trabajamos" — proceso en 3 pasos. landing-anatomy lo marca como
 * obligatorio: hace tangible lo intangible y reduce el miedo antes del cierre.
 * Va después de las escenas de servicio y antes de la escena "cierre".
 * Copy calibrado con la skill bonito-voz (sobrio, del brief al resultado, sin pasta).
 */
const steps = [
  {
    n: "01",
    title: "Nos cuentas el brief",
    body: "Marca, artista o gira. Nos dices qué necesitas y para cuándo.",
  },
  {
    n: "02",
    title: "Un solo equipo",
    body: "Del primer brief al desmontaje. No rebotas entre cinco proveedores: lo llevamos nosotros.",
  },
  {
    n: "03",
    title: "Lo que se ve",
    body: "El evento montado, la gira llena o el disco fuera. La parte que se recuerda.",
  },
];

export function HomeProcess() {
  return (
    <Section id="como-trabajamos">
      <RevealOnScroll as="p" className="eyebrow mb-4">
        Cómo trabajamos
      </RevealOnScroll>
      <RevealOnScroll>
        <Heading as="h2" className="mb-14 max-w-3xl">
          Del brief al escenario, sin intermediarios.
        </Heading>
      </RevealOnScroll>

      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step) => (
          <RevealOnScroll key={step.n}>
            <div className="border-t border-subtle pt-5">
              <span className="font-display text-sm text-text-muted">{step.n}</span>
              <h3 className="mt-3 font-display text-xl text-text-primary md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-text-secondary">{step.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}
