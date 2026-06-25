"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

type Q =
  | { id: string; q: string; type: "single"; opts: string[] }
  | { id: string; q: string; type: "multi"; opts: string[] }
  | { id: string; q: string; type: "text" };

const questions: Q[] = [
  {
    id: "stage",
    q: "¿Dónde estás en tu carrera?",
    type: "single",
    opts: ["Maqueta", "Primer EP", "Primer álbum", "Segundo álbum", "Desbordado"],
  },
  {
    id: "needs",
    q: "¿Qué necesitas?",
    type: "multi",
    opts: ["Sello", "Booking", "Management", "Distribución", "Todo", "No lo sé"],
  },
  { id: "genre", q: "¿En qué género te mueves?", type: "text" },
  {
    id: "produce",
    q: "¿Te autoproduces?",
    type: "single",
    opts: ["Sí, todo", "Producción externa", "Co-produce"],
  },
  {
    id: "shows",
    q: "¿Cuántos shows has hecho este año?",
    type: "single",
    opts: ["0", "1-5", "5-15", "15+"],
  },
  {
    id: "bottleneck",
    q: "¿Cuál es tu mayor cuello de botella ahora?",
    type: "text",
  },
];

function diagnose(a: Record<string, string | string[]>): string {
  const needs = (a.needs as string[]) || [];
  const stage = a.stage as string;
  if (needs.includes("Todo") || needs.length >= 3)
    return "Por lo que cuentas, lo que te toca no es un proveedor más: es alguien que entienda el sistema entero. Eso es exactamente lo que hacemos.";
  if (needs.includes("Booking"))
    return "Suena a que tienes música y te falta agenda. Booking es por donde empezaríamos contigo.";
  if (needs.includes("Distribución"))
    return "Si lo que necesitas es que tu música llegue a las plataformas bien hecha, distribución y editorial es tu entrada.";
  if (stage === "Maqueta")
    return "Estás pronto, y eso no es malo. Lo honesto es decírtelo: hablamos y te orientamos sin venderte humo.";
  return "Por lo que cuentas, hay encaje. Lo suyo es hablarlo en una llamada corta, sin compromiso.";
}

export function LeadMagnetArtists() {
  const [i, setI] = useState(0);
  const [a, setA] = useState<Record<string, string | string[]>>({});
  const [text, setText] = useState("");
  const done = i >= questions.length;
  const cur = questions[i];

  function next(val: string | string[]) {
    setA((p) => ({ ...p, [cur.id]: val }));
    setText("");
    setI((n) => n + 1);
  }

  function toggleMulti(opt: string) {
    const sel = (a[cur.id] as string[]) || [];
    setA((p) => ({
      ...p,
      [cur.id]: sel.includes(opt)
        ? sel.filter((x) => x !== opt)
        : [...sel, opt],
    }));
  }

  return (
    <div className="rounded-3xl border border-subtle bg-bg-secondary p-7 md:p-10">
      {!done ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="eyebrow">¿Encajas con Bonito?</p>
            <p className="text-xs text-text-muted">
              {i + 1} / {questions.length}
            </p>
          </div>
          <div className="mb-7 h-1 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <motion.div
              className="h-full bg-accent-warm"
              initial={false}
              animate={{ width: `${(i / questions.length) * 100}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <h3 className="display mb-7 text-2xl md:text-3xl">{cur.q}</h3>

              {cur.type === "single" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {cur.opts.map((o) => (
                    <button
                      key={o}
                      onClick={() => next(o)}
                      className="card text-left font-medium"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}

              {cur.type === "multi" && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {cur.opts.map((o) => {
                      const sel = ((a[cur.id] as string[]) || []).includes(o);
                      return (
                        <button
                          key={o}
                          onClick={() => toggleMulti(o)}
                          className={`card text-left font-medium ${
                            sel ? "border-accent-cyan text-accent-cyan" : ""
                          }`}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => next((a[cur.id] as string[]) || [])}
                    className="btn btn-primary mt-6"
                  >
                    Siguiente →
                  </button>
                </>
              )}

              {cur.type === "text" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    next(text);
                  }}
                >
                  <input
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escríbelo corto"
                    className="w-full rounded-xl border border-subtle bg-bg-tertiary px-5 py-4 text-text-primary outline-none focus:border-accent-warm"
                  />
                  <button className="btn btn-primary mt-6">Siguiente →</button>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          {i > 0 && (
            <button
              onClick={() => setI((n) => n - 1)}
              className="mt-6 block text-sm text-text-muted hover:text-text-secondary"
            >
              ← Atrás
            </button>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="eyebrow mb-3">Diagnóstico</p>
          <p className="mb-8 max-w-xl text-xl text-text-primary">
            {diagnose(a)}
          </p>
          <a
            href={`mailto:${site.emails.booking}?subject=Encajo con Bonito&body=${encodeURIComponent(
              questions
                .map(
                  (q) =>
                    `${q.q} ${
                      Array.isArray(a[q.id])
                        ? (a[q.id] as string[]).join(", ")
                        : (a[q.id] ?? "")
                    }`,
                )
                .join("\n"),
            )}`}
            className="btn btn-primary"
          >
            Que lo hablemos →
          </a>
          <button
            onClick={() => {
              setI(0);
              setA({});
            }}
            className="ml-4 text-sm text-text-muted hover:text-text-secondary"
          >
            Repetir
          </button>
        </motion.div>
      )}
    </div>
  );
}
