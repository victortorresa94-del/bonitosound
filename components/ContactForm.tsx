"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

const inputCls =
  "w-full rounded-xl border-2 bg-transparent px-5 py-3.5 text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-cyan";

/**
 * Formulario ÚNICO de contacto/contratación (diseño del mockup: Nombre, Email,
 * Mensaje, Enviar). Es el mismo siempre y se adapta:
 *  - General (sin `artist`): va al correo general.
 *  - Con `artist` (desde /contacto?a=<slug>, al clicar "Contratar" en un
 *    artista): muestra un aviso, precarga el mensaje y va a booking.
 * Sin backend: al enviar compone un correo estructurado (mailto). Si algún día
 * hay endpoint (NEXT_PUBLIC_FORM_ENDPOINT), se enchufa en `send()`.
 */
export function ContactForm({
  artist,
}: {
  artist?: { name: string; genre?: string };
}) {
  const starter = artist
    ? `Hola, me gustaría contratar a ${artist.name}. Os cuento: (evento, fecha, ciudad o sala y aforo aproximado).`
    : "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [msg, setMsg] = useState(starter);
  const [sent, setSent] = useState(false);

  // Todo el formulario va a bonito@ (general), también la contratación de
  // artista — un único buzón.
  const to = site.emails.general;
  const subject = artist ? `Contratar · ${artist.name}` : "Web · Contacto";

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const line = (k: string, v: string) => (v.trim() ? `${k}: ${v}\n` : "");
    const body =
      (artist ? `Solicitud de contratación · ${artist.name}\n\n` : "") +
      line("Nombre", name) +
      line("Email", email) +
      line("Teléfono", phone) +
      line("Empresa", company) +
      `\n${msg}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border-2 border-subtle p-8 text-center">
        <div
          className="mx-auto grid h-14 w-14 place-items-center rounded-full"
          style={{ backgroundColor: CYAN, color: NAVY }}
          aria-hidden
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="display mt-5 text-2xl" style={{ color: NAVY }}>
          Te hemos abierto el correo.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
          Dale a enviar y lo tenemos. Si no se abrió nada, escríbenos directo a{" "}
          <a className="font-semibold underline underline-offset-4" href={`mailto:${to}`}>{to}</a>.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-text-muted underline-offset-4 hover:text-text-primary hover:underline"
        >
          ← Volver a editar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="space-y-5">
      {artist && (
        <div className="flex items-center gap-3 rounded-xl border-2 border-subtle bg-bg-tertiary px-4 py-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-black" style={{ backgroundColor: CYAN, color: NAVY }}>
            ♪
          </span>
          <p className="text-sm text-text-secondary">
            Contratando a <span className="font-bold" style={{ color: NAVY }}>{artist.name}</span>
            {artist.genre ? <span className="text-text-muted"> · {artist.genre}</span> : null}
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-2 block text-sm font-bold" style={{ color: NAVY }}>Nombre</label>
          <input
            id="cf-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className={inputCls}
            style={{ borderColor: "rgba(20,40,60,0.2)" }}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className="mb-2 block text-sm font-bold" style={{ color: NAVY }}>
            Empresa <span className="font-normal text-text-muted">(opcional)</span>
          </label>
          <input
            id="cf-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Tu empresa o marca"
            className={inputCls}
            style={{ borderColor: "rgba(20,40,60,0.2)" }}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-2 block text-sm font-bold" style={{ color: NAVY }}>Email</label>
          <input
            id="cf-email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className={inputCls}
            style={{ borderColor: "rgba(20,40,60,0.2)" }}
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-2 block text-sm font-bold" style={{ color: NAVY }}>
            Teléfono <span className="font-normal text-text-muted">(opcional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 …"
            className={inputCls}
            style={{ borderColor: "rgba(20,40,60,0.2)" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-msg" className="mb-2 block text-sm font-bold" style={{ color: NAVY }}>Mensaje</label>
        <textarea
          id="cf-msg"
          required
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={artist ? "Cuéntanos el bolo…" : "Cuéntanos en qué podemos ayudarte…"}
          className={inputCls}
          style={{ borderColor: "rgba(20,40,60,0.2)" }}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl py-4 text-base font-bold text-white transition-transform duration-200 hover:-translate-y-0.5"
        style={{ backgroundColor: CYAN }}
      >
        Enviar
      </button>
      <p className="text-xs text-text-muted">Te respondemos rápido, y por personas. No un bot.</p>
    </form>
  );
}
