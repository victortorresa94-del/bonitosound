import Image from "next/image";
import { Section } from "@/components/ui";
import { RevealOnScroll, StaggerGroup } from "@/components/motion";
import { findAsset } from "@/lib/assets";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Quién está detrás del estudio. No es un servicio interno de Bonito sino un
 * ACUERDO con el estudio de Marco La Testa y Jano Montano, así que el bloque
 * los presenta con nombre y cara en vez de hablar en primera persona.
 *
 * Las fotos que mandaron son todas del DÚO trabajando (no hay retratos
 * individuales), así que el bloque enseña el estudio en vez de dos fichas de
 * persona: el retrato de los dos manda y dos planos del trabajo lo acompañan.
 * Siguen siendo plug-and-play — si un fichero no está, ese hueco simplemente
 * no se pinta.
 *
 * Los artistas y el "+100 canciones" son dato real que aportó el estudio; por
 * eso van aquí y no inventados en el copy de servicio.
 */
/** Las tres fotos del estudio, por orden de peso en la composición. */
const FOTOS = [
  { slug: "duo", alt: "Marco La Testa y Jano Montano en el estudio" },
  { slug: "mesa", alt: "Marco La Testa y Jano Montano trabajando en la mesa" },
  { slug: "instrumentos", alt: "Marco La Testa y Jano Montano tocando en el estudio" },
];

const ARTISTAS = [
  "Alfred García", "Maruja Limón", "Tribade", "Sofia Gabanna", "J Dose",
  "Elane", "Huda", "Albali", "Paule", "D Nácar",
];

function QuienLoHace() {
  const locale = serverLocale();
  const fotos = FOTOS.map((f) => ({ ...f, src: findAsset("estudio", f.slug) })).filter((f) => f.src);

  return (
    <Section id="estudio-partner">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <RevealOnScroll as="p" className="eyebrow mb-4">
            {tr(locale, "Quién lo hace")}
          </RevealOnScroll>

          {fotos.length > 0 && (
            <StaggerGroup stagger={0.1}>
              {/* La primera manda a todo el ancho; las otras dos, debajo y
                  más pequeñas. Si solo hay una, ocupa ella sola el bloque. */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-tertiary">
                <Image
                  src={fotos[0].src!}
                  alt={tr(locale, fotos[0].alt)}
                  fill
                  sizes="(max-width: 768px) 92vw, 42vw"
                  className="object-cover"
                />
              </div>
              {fotos.length > 1 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {fotos.slice(1).map((f) => (
                    <div key={f.slug} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-tertiary">
                      <Image
                        src={f.src!}
                        alt={tr(locale, f.alt)}
                        fill
                        sizes="(max-width: 768px) 45vw, 21vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </StaggerGroup>
          )}

          <p className="mt-4 font-round text-base font-bold leading-tight" style={{ color: NAVY }}>
            Marco La Testa · Jano Montano
          </p>
        </div>

        <RevealOnScroll delay={0.1} className="space-y-5 text-lg leading-relaxed text-text-secondary">
          <p>
            {tr(locale, "Marco La Testa y Jano Montano ofrecen un acompañamiento integral en todas las fases de un proyecto musical. Desde la composición y la producción hasta la grabación, la mezcla y el máster, trabajan para que cada decisión creativa y técnica refuerce la identidad de la canción.")}
          </p>
          <p>
            {tr(locale, "No entienden la producción como un conjunto de fórmulas ni como un sonido propio impuesto a todos los proyectos. Cada artista tiene una identidad, una manera de comunicar y un universo propio. Cada decisión creativa está al servicio de potenciar esa identidad y llevar cada canción a su mejor versión.")}
          </p>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="font-round text-[2.6rem] font-bold leading-none" style={{ color: CYAN }}>
              +100
            </span>
            <span className="text-sm font-semibold uppercase leading-snug tracking-[0.14em]" style={{ color: "rgba(20,40,60,0.55)" }}>
              {tr(locale, "canciones publicadas en los últimos tres años")}
            </span>
          </div>

          <div className="pt-2">
            <p className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(20,40,60,0.5)" }}>
              {tr(locale, "Han trabajado con")}
            </p>
            <p className="text-base leading-relaxed" style={{ color: NAVY }}>
              {ARTISTAS.join(" · ")}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
}

/**
 * LAS CINCO FASES.
 *
 * El correo de Marco y Jano las enumera en cadena —composición, producción,
 * grabación, mezcla y máster— y ese encadenado es justo lo que venden: que no
 * hay que cambiar de sitio ni de criterio a mitad del camino. Arriba quedaban
 * comprimidas en dos frases y se perdía.
 *
 * Se pinta como una carretera, con la línea cian cruzando los cinco puntos: el
 * mismo lenguaje que la ruta de /giras. Aquí significa que el camino es uno,
 * aunque se pueda entrar por cualquier punto.
 */
const FASES = [
  { n: "01", t: "Composición", d: "Desde una idea suelta o desde lo que ya tengas escrito." },
  { n: "02", t: "Producción", d: "Darle forma: qué instrumentos, qué arreglo, qué sobra." },
  { n: "03", t: "Grabación", d: "Registrar las tomas buenas, las que se quedan." },
  { n: "04", t: "Mezcla", d: "Que cada elemento ocupe su sitio y se entienda la canción." },
  { n: "05", t: "Máster", d: "El acabado, para que suene igual de bien en cualquier sitio." },
];

function Fases() {
  const locale = serverLocale();
  return (
    <Section className="border-t border-subtle">
      <RevealOnScroll as="p" className="eyebrow mb-3">
        {tr(locale, "El proceso")}
      </RevealOnScroll>
      <RevealOnScroll
        as="h2"
        className="display max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.08]"
      >
        <span style={{ color: NAVY }}>{tr(locale, "Cinco fases,")} </span>
        <span style={{ color: CYAN }}>{tr(locale, "un solo criterio.")}</span>
      </RevealOnScroll>

      <div className="relative mt-12">
        {/* La carretera. Solo en escritorio: en móvil las fases caen en columna
            y una línea horizontal no diría nada. */}
        <div
          aria-hidden
          className="absolute left-1 right-1 top-[4px] hidden h-[2px] md:block"
          style={{ backgroundColor: "rgba(22,182,212,0.3)" }}
        />
        <StaggerGroup stagger={0.08} className="grid gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-5">
          {FASES.map((f) => (
            <div key={f.n} className="relative">
              <span
                aria-hidden
                className="mb-5 hidden h-[10px] w-[10px] rounded-full md:block"
                style={{ backgroundColor: CYAN }}
              />
              <p className="font-mono text-[0.7rem] font-bold tabular-nums" style={{ color: CYAN }}>
                {f.n}
              </p>
              <h3 className="font-round mt-1 text-lg font-bold leading-tight" style={{ color: NAVY }}>
                {tr(locale, f.t)}
              </h3>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-text-secondary">
                {tr(locale, f.d)}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </div>

      <RevealOnScroll delay={0.2} className="mt-11">
        <p className="max-w-[58ch] text-lg leading-relaxed" style={{ color: NAVY }}>
          {tr(locale, "Se puede entrar en cualquiera de ellas. Pero cuando las decisiones creativas y las técnicas van juntas desde el principio, la canción sale mejor.")}
        </p>
      </RevealOnScroll>
    </Section>
  );
}

export function EstudioPartner() {
  return (
    <>
      <QuienLoHace />
      <Fases />
    </>
  );
}
