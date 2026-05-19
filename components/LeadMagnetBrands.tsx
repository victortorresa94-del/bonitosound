"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const steps = [
  {
    q: "¿Qué tipo de evento quieres montar?",
    opts: [
      "Festival corporativo",
      "Lanzamiento de producto",
      "Fiesta privada",
      "Gira de marca",
    ],
  },
  {
    q: "¿Cuántos asistentes esperáis?",
    opts: ["<200", "200-1000", "1000-5000", "5000+"],
  },
  {
    q: "¿Artista nacional o local?",
    opts: ["Nacional grande", "Emergente nacional", "Internacional", "Aún no lo sé"],
  },
  {
    q: "¿Cuándo lo necesitas listo?",
    opts: ["<1 mes", "1-3 meses", "3-6 meses", "+6 meses"],
  },
];

const examples = [
  "Activación con música en directo para Ballantine's",
  "Experiencia cultural de marca para Pernod Ricard",
  "Final de gira en el Sant Jordi Club (Gira 1016)",
];

export function LeadMagnetBrands() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= steps.length;

  function pick(opt: string) {
    setAnswers((a) => [...a.slice(0, step), opt]);
    setStep((s) => s + 1);
  }

  return (
    <div className="rounded-3xl border border-subtle bg-bg-secondary p-7 md:p-10">
      {!done ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="eyebrow">Diseña tu activación · 90 segundos</p>
            <p className="text-xs text-text-muted">
              {step + 1} / {steps.length}
            </p>
          </div>
          <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <div
              className="h-full bg-accent-blue transition-all duration-500"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
          <h3 className="display mb-7 text-2xl md:text-3xl">
            {steps[step].q}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {steps[step].opts.map((o) => (
              <button
                key={o}
                onClick={() => pick(o)}
                className="card text-left text-base font-medium"
              >
                {o}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 text-sm text-text-muted hover:text-text-secondary"
            >
              ← Atrás
            </button>
          )}
        </>
      ) : (
        <div className="stagger">
          <p className="eyebrow mb-3">Por lo que cuentas…</p>
          <h3 className="display mb-6 text-2xl md:text-3xl">
            Esto del portfolio se parece a lo tuyo:
          </h3>
          <ul className="mb-8 space-y-3">
            {examples.map((e) => (
              <li
                key={e}
                className="rounded-xl border border-subtle bg-bg-tertiary px-5 py-4 text-text-secondary"
              >
                {e}
              </li>
            ))}
          </ul>
          <p className="mb-6 max-w-lg text-text-secondary">
            No te calculamos el precio por una web. Eso lo hablamos. Cuéntanos
            el tuyo y te decimos qué se puede hacer de verdad.
          </p>
          <a
            href={`mailto:${site.emails.general}?subject=Activación de marca&body=${encodeURIComponent(
              `Tipo: ${answers[0] ?? ""}\nAsistentes: ${answers[1] ?? ""}\nArtista: ${answers[2] ?? ""}\nPlazo: ${answers[3] ?? ""}\n\nCuéntanos:`,
            )}`}
            className="btn btn-primary"
          >
            Hablemos del tuyo →
          </a>
          <button
            onClick={() => {
              setStep(0);
              setAnswers([]);
            }}
            className="ml-4 text-sm text-text-muted hover:text-text-secondary"
          >
            Volver a empezar
          </button>
        </div>
      )}
    </div>
  );
}
