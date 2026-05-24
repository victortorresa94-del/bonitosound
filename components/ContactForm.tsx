"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const segments = ["Marca", "Artista", "Promotor", "Prensa", "Otro"] as const;
type Segment = (typeof segments)[number];

const placeholder: Record<Segment, string> = {
  Marca: "Qué evento tienes en mente, marca, fechas aproximadas.",
  Artista: "Dónde estás, qué necesitas (sello, booking, distribución).",
  Promotor: "Qué fecha, qué artista del roster, qué sala o festival.",
  Prensa: "Qué medio, sobre qué quieres hablar.",
  Otro: "Cuéntanos.",
};

export function ContactForm() {
  const [seg, setSeg] = useState<Segment>("Marca");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const to = seg === "Artista" ? site.emails.booking : site.emails.general;
  const mailto = `mailto:${to}?subject=${encodeURIComponent(
    `Web · ${seg}`,
  )}&body=${encodeURIComponent(
    `Soy: ${seg}\nNombre: ${name}\nEmail: ${email}\n\n${msg}`,
  )}`;

  return (
    <div className="rounded-3xl border border-subtle bg-bg-secondary p-7 md:p-10">
      <p className="eyebrow mb-4">Vengo porque soy…</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {segments.map((s) => (
          <button
            key={s}
            onClick={() => setSeg(s)}
            className={`btn px-5 py-2 ${
              seg === s ? "btn-primary" : "btn-ghost"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailto;
        }}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="rounded-xl border border-subtle bg-bg-tertiary px-5 py-4 outline-none focus:border-accent-blue"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            className="rounded-xl border border-subtle bg-bg-tertiary px-5 py-4 outline-none focus:border-accent-blue"
          />
        </div>
        <textarea
          required
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={placeholder[seg]}
          className="w-full rounded-xl border border-subtle bg-bg-tertiary px-5 py-4 outline-none focus:border-accent-blue"
        />
        <button className="btn btn-primary">Enviar →</button>
        <p className="text-xs text-text-muted">
          Te contestamos nosotros, no un bot. Backend de envío (Resend /
          Formspree) pendiente de conectar — de momento abre tu correo.
        </p>
      </form>
    </div>
  );
}
