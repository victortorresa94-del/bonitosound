"use client";

import { usePlayer } from "./PlayerProvider";
import { useLocale } from "@/components/LocaleProvider";
import { t } from "@/lib/i18n";

const NAVY = "#14283C";
const TEAL = "#3E93AC";
const CYAN = "#16b6d4";
const CREMA = "#FBFAF6";
const ROJO = "#c8452f";

/**
 * La Radio Bonito: el panel que se despliega sobre el botón flotante, abajo a
 * la derecha, en TODAS las páginas.
 *
 * La radio está DIBUJADA EN SVG con el mismo lenguaje que la furgoneta del
 * home (contorno navy grueso, relleno teal plano, formas redondeadas, fondo
 * crema), no con el grabado fino de los iconos de servicio. Es SVG y no un
 * mp4 a propósito: así la aguja se mueve de verdad al cambiar de emisora, el
 * dial es pulsable y el ecualizador responde a si suena o no. Un vídeo sería
 * bonito pero mudo a la interacción.
 *
 * Vida, en capas y por orden de aparición:
 *   · al abrirse, la AGUJA BARRE el dial de lado a lado y frena en la emisora
 *     que suena, como quien busca una;
 *   · un HALO cian la acompaña: la emisora sintonizada ilumina el dial;
 *   · mientras sintoniza entre temas, la aguja TIEMBLA en vez de deslizarse;
 *   · un REFLEJO cruza el cristal del dial cada siete segundos;
 *   · y con la música sonando, la carcasa bota, las ondas de la antena laten
 *     y la rejilla del altavoz hace de ecualizador.
 *
 * Cada cosa dice algo del estado: nada se mueve solo por moverse. Todo se
 * para con prefers-reduced-motion.
 */
export function RadioBonito({ onClose }: { onClose: () => void }) {
  const { current, index, total, tuning, playing, goTo } = usePlayer();
  const locale = useLocale();

  // El dial útil va de x=62 a x=338 en el viewBox. La aguja se coloca en el
  // centro de la emisora: (i + 0,5) / total.
  const x0 = 62;
  const ancho = 276;
  const aguja = x0 + ((index + 0.5) / Math.max(total, 1)) * ancho;

  const vivo = playing && !tuning;

  return (
    /* Sin tarjeta: la radio va suelta sobre la página, como los demás dibujos
       de la casa. Deliberadamente pequeña en móvil: es un adorno con función,
       no una pieza de contenido, y ahí compite con la página por un espacio
       que no tiene.
       Ahora que fuera solo queda el botón de play, el ancho del conjunto ya
       no lo fijan los botones y la radio puede bajar de tamaño de verdad. */
    <div
      className="relative w-[7.5rem] sm:w-[9.5rem]"
      role="region"
      aria-label={t(locale, "radio.titulo")}
    >
      {/* Cerrar: pegado a la esquina de la propia radio, sin cabecera. */}
      <button
        onClick={onClose}
        aria-label={t(locale, "radio.cerrar")}
        className="absolute -top-0.5 right-0 z-10 grid h-6 w-6 place-items-center rounded-full transition-opacity hover:opacity-60"
        style={{ color: NAVY, backgroundColor: "rgba(251,250,246,0.9)" }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
          <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── La radio dibujada ── */}
      <svg viewBox="0 0 400 290" className="w-full" role="img" aria-label={t(locale, "radio.titulo")}>
        <defs>
          {/* Recorta el reflejo al hueco del dial. Mismo rect y mismo radio. */}
          <clipPath id="bs-dial">
            <rect x="52" y="82" width="296" height="62" rx="16" />
          </clipPath>
        </defs>
        <g className={vivo ? "bs-radio-bob" : undefined} style={{ transformOrigin: "200px 260px" }}>
          {/* Antena + ondas de señal */}
          <g stroke={NAVY} strokeWidth="7" strokeLinecap="round" fill="none">
            <path d="M322 78 L368 26" />
          </g>
          <circle cx="368" cy="26" r="7" fill={NAVY} />
          <g stroke={CYAN} strokeWidth="6" strokeLinecap="round" fill="none">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${376 + i * 5} ${18 - i * 5} a ${12 + i * 9} ${12 + i * 9} 0 0 1 ${5 + i * 3} ${16 + i * 8}`}
                style={{
                  opacity: vivo ? undefined : 0.18,
                  animation: vivo ? `bs-radio-signal 1.5s ease-in-out ${i * 0.22}s infinite` : undefined,
                }}
              />
            ))}
          </g>

          {/* Patas */}
          <rect x="72" y="248" width="46" height="26" rx="11" fill={NAVY} />
          <rect x="282" y="248" width="46" height="26" rx="11" fill={NAVY} />

          {/* Carcasa */}
          <rect
            x="26" y="58" width="348" height="200" rx="34"
            fill="#ffffff" stroke={NAVY} strokeWidth="9" strokeLinejoin="round"
          />

          {/* ── Dial ── */}
          <rect x="52" y="82" width="296" height="62" rx="16" fill={CREMA} stroke={NAVY} strokeWidth="7" />
          {/* Marcas de emisora: una por tema, pulsables */}
          {Array.from({ length: total }).map((_, i) => {
            const cx = x0 + ((i + 0.5) / Math.max(total, 1)) * ancho;
            const activa = i === index;
            return (
              <g key={i}>
                <line
                  x1={cx} y1={activa ? 98 : 104} x2={cx} y2={activa ? 130 : 122}
                  stroke={activa ? CYAN : "rgba(20,40,60,0.3)"}
                  strokeWidth={activa ? 5 : 3}
                  strokeLinecap="round"
                  style={{ transition: "all 0.3s" }}
                />
                {/* Zona de pulsación generosa e invisible. */}
                <rect
                  x={cx - ancho / Math.max(total, 1) / 2} y="82"
                  width={ancho / Math.max(total, 1)} height="62"
                  fill="transparent"
                  onClick={() => goTo(i)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  aria-label={`${t(locale, "radio.emisora")} ${i + 1}`}
                />
              </g>
            );
          })}
          {/* El reflejo que recorre el cristal, recortado al dial. */}
          <g clipPath="url(#bs-dial)">
            <rect
              className="bs-radio-brillo"
              x="52" y="82" width="46" height="62"
              fill={CYAN} opacity="0"
              style={{ mixBlendMode: "multiply" }}
            />
          </g>

          {/* La aguja.
              Va dentro de un <g> con `translateX` en vez de mover x1/x2: los
              atributos de geometría no animan igual en todos los navegadores,
              y un transform sí. La posición base es x0 y el desplazamiento lo
              pone --aguja, que es también donde termina el barrido. */}
          <g
            className={tuning ? "bs-radio-jitter" : "bs-radio-sweep"}
            style={{
              ["--aguja" as string]: `${aguja - x0}px`,
              transform: `translateX(${aguja - x0}px)`,
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Halo: la emisora sintonizada "ilumina" el dial a su alrededor. */}
            <ellipse cx={x0} cy="113" rx="26" ry="30" fill={CYAN}
              opacity={vivo ? 0.16 : 0.07} style={{ transition: "opacity 0.4s" }} />
            <line x1={x0} y1="88" x2={x0} y2="138" stroke={ROJO} strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* ── Rejilla del altavoz: hace de ecualizador ── */}
          <rect x="52" y="162" width="184" height="76" rx="16" fill={TEAL} stroke={NAVY} strokeWidth="7" />
          <g>
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={i}
                x={70 + i * 18} y="180" width="7" rx="3.5"
                height={vivo ? 42 : 14}
                fill="rgba(20,40,60,0.55)"
                style={{
                  transformOrigin: `${73.5 + i * 18}px 222px`,
                  transformBox: "fill-box",
                  animation: vivo ? `eq ${0.7 + (i % 4) * 0.18}s ease-in-out ${i * 0.06}s infinite` : undefined,
                  transition: "height 0.3s",
                }}
              />
            ))}
          </g>

          {/* ── Mandos ── */}
          <circle cx="284" cy="200" r="34" fill={TEAL} stroke={NAVY} strokeWidth="7" />
          <line x1="284" y1="200" x2="284" y2="176" stroke={NAVY} strokeWidth="6" strokeLinecap="round"
            style={{ transformOrigin: "284px 200px", transform: `rotate(${index * 28}deg)`, transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }} />
          <circle cx="340" cy="212" r="20" fill="#ffffff" stroke={NAVY} strokeWidth="6" />
        </g>
      </svg>

      {/* ── Qué suena ── */}
      <div className="flex min-h-[1.7rem] items-center sm:min-h-[2rem]">
        {tuning ? (
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] sm:text-[0.6rem]" style={{ color: "rgba(20,40,60,0.5)" }}>
            {t(locale, "radio.sintonizando")}
          </p>
        ) : (
          <div className="min-w-0">
            <p className="truncate font-round text-[0.7rem] font-bold leading-tight sm:text-sm" style={{ color: NAVY }}>
              {current?.title}
            </p>
            {current?.artist && (
              <p className="truncate text-[0.6rem] leading-tight sm:text-xs" style={{ color: "rgba(20,40,60,0.55)" }}>
                {current.artist}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
