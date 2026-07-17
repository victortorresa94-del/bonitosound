"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Formulario de contratación de un artista concreto. Calibrado para el momento
 * en que ya se pide la información (lead cualificado): no es un "hola, ¿info?",
 * viene precargado con el artista y pregunta lo justo para poder responder de
 * verdad — tipo de bolo, fecha, sitio, aforo y qué se quiere de ese artista.
 *
 * Sin backend todavía (el resto del sitio va por mailto): al enviar compone un
 * correo estructurado a booking con todas las respuestas. Si algún día se
 * conecta un endpoint (NEXT_PUBLIC_FORM_ENDPOINT), basta con enchufarlo en
 * `send()` — la recogida de datos ya está hecha.
 */

const TIPOS = [
  "Concierto",
  "Festival",
  "Activación de marca",
  "Evento privado",
  "Corporativo",
  "Aún no lo sé",
] as const;

const AFOROS = [
  "Menos de 200",
  "200 – 1.000",
  "1.000 – 5.000",
  "Más de 5.000",
  "No lo sé",
] as const;

// Presupuesto en términos cualitativos (regla de marca: cero cifras de dinero
// en la web). Nos sitúa sin poner precio.
const PRESUS = [
  "Todavía por definir",
  "Ajustado",
  "Con margen",
  "Sin problema",
] as const;

const PERFILES = [
  "Marca",
  "Promotor/a",
  "Empresa o institución",
  "Particular",
  "Otro",
] as const;

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200"
      style={
        active
          ? { backgroundColor: NAVY, color: "#fff", borderColor: NAVY }
          : { backgroundColor: "transparent", color: NAVY, borderColor: "rgba(20,40,60,0.22)" }
      }
    >
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      {children}
      {hint && <p className="mt-2 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-subtle bg-bg-tertiary px-5 py-4 text-text-primary outline-none transition-colors focus:border-accent-cyan";

export function BookingForm({
  artistName,
  artistGenre,
}: {
  artistName: string;
  artistGenre?: string;
}) {
  const [tipo, setTipo] = useState<string>("");
  const [fecha, setFecha] = useState("");
  const [sinFecha, setSinFecha] = useState(false);
  const [lugar, setLugar] = useState("");
  const [aforo, setAforo] = useState<string>("");
  const [presu, setPresu] = useState<string>("");
  const [idea, setIdea] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [perfil, setPerfil] = useState<string>("");
  const [sent, setSent] = useState(false);

  const buildMailto = () => {
    const linea = (k: string, v: string) => (v ? `${k}: ${v}\n` : "");
    const cuerpo =
      `Solicitud de contratación · ${artistName}\n\n` +
      `— El evento —\n` +
      linea("Tipo", tipo) +
      linea("Fecha", sinFecha ? "Aún sin fecha" : fecha) +
      linea("Ciudad / lugar", lugar) +
      linea("Aforo", aforo) +
      linea("Presupuesto", presu) +
      `\n— Qué tiene en mente —\n${idea || "(sin detallar)"}\n\n` +
      `— Quién escribe —\n` +
      linea("Nombre", nombre) +
      linea("Email", email) +
      linea("Teléfono", tel) +
      linea("Empresa / marca", empresa) +
      linea("Perfil", perfil);

    return `mailto:${site.emails.booking}?subject=${encodeURIComponent(
      `Contratar · ${artistName}`,
    )}&body=${encodeURIComponent(cuerpo)}`;
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    // Momento del gesto del usuario: abre el correo con todo prerelleno.
    window.location.href = buildMailto();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-subtle bg-bg-primary p-8 text-center md:p-12">
        <div
          className="mx-auto grid h-14 w-14 place-items-center rounded-full"
          style={{ backgroundColor: CYAN, color: NAVY }}
          aria-hidden
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="display mt-6 text-[clamp(1.6rem,3.5vw,2.4rem)]" style={{ color: NAVY }}>
          Te hemos abierto el correo.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-text-secondary">
          Dale a enviar y lo tenemos. Si no se te ha abierto nada, escríbenos
          directo a{" "}
          <a className="font-semibold underline underline-offset-4" href={`mailto:${site.emails.booking}`}>
            {site.emails.booking}
          </a>{" "}
          y te contestamos nosotros, no un bot.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-sm font-semibold text-text-muted underline-offset-4 hover:text-text-primary hover:underline"
        >
          ← Volver a editar la solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="rounded-3xl border border-subtle bg-bg-primary p-6 md:p-9">
      {/* Contexto: a quién estás contratando. No es editable — es el sentido del form. */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-subtle bg-bg-tertiary px-5 py-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black" style={{ backgroundColor: CYAN, color: NAVY }}>
          ♪
        </span>
        <p className="text-sm text-text-secondary">
          Cuéntanos el bolo para{" "}
          <span className="font-bold" style={{ color: NAVY }}>{artistName}</span>
          {artistGenre ? <span className="text-text-muted"> · {artistGenre}</span> : null}
        </p>
      </div>

      <div className="space-y-8">
        <Field label={`¿Qué quieres montar con ${artistName}?`}>
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <Chip key={t} active={tipo === t} onClick={() => setTipo(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="¿Para cuándo?">
            <input
              type="date"
              value={fecha}
              disabled={sinFecha}
              onChange={(e) => setFecha(e.target.value)}
              className={`${inputCls} disabled:opacity-50`}
            />
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={sinFecha}
                onChange={(e) => setSinFecha(e.target.checked)}
                className="h-4 w-4 accent-[#16b6d4]"
              />
              Aún sin fecha cerrada
            </label>
          </Field>

          <Field label="¿Dónde?">
            <input
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              placeholder="Ciudad, sala o festival"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="¿Cuánta gente esperáis?">
            <div className="flex flex-wrap gap-2">
              {AFOROS.map((a) => (
                <Chip key={a} active={aforo === a} onClick={() => setAforo(a)}>
                  {a}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Presupuesto orientativo" hint="Opcional. Nos ayuda a proponerte algo realista, sin sorpresas.">
            <div className="flex flex-wrap gap-2">
              {PRESUS.map((p) => (
                <Chip key={p} active={presu === p} onClick={() => setPresu(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <Field label="¿Qué tienes en la cabeza?">
          <textarea
            required
            rows={5}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder={`El evento, el público, el formato (show completo, DJ set, acústico…) y por qué ${artistName}. Cuanto más nos cuentes, mejor te respondemos.`}
            className={inputCls}
          />
        </Field>

        {/* Quién escribe */}
        <div className="border-t border-subtle pt-8">
          <Field label="¿Quién eres?">
            <div className="mb-5 flex flex-wrap gap-2">
              {PERFILES.map((p) => (
                <Chip key={p} active={perfil === p} onClick={() => setPerfil(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre *"
              className={inputCls}
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email *"
              className={inputCls}
            />
            <input
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              placeholder="Teléfono (opcional)"
              className={inputCls}
            />
            <input
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Empresa / marca (opcional)"
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button type="submit" className="btn btn-primary px-8 py-4 text-base">
            Enviar solicitud →
          </button>
          <p className="text-xs text-text-muted">
            Te contestamos nosotros, no un bot. Sin compromiso.
          </p>
        </div>
      </div>
    </form>
  );
}
