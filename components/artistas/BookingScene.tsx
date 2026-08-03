import Image from "next/image";
import { findAsset } from "@/lib/assets";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * Ilustración de la página de contratación, en el "rollo" de la marca: teléfono
 * hecho a mano, cord en espiral, notas y chispas, sobre crema. Line-art navy +
 * cian, igual que el resto de motivos de Bonito.
 *
 * Plug-and-play: si Víctor genera/sube una ilustración a
 * `public/img/marca/contratar-scene.(png|webp|svg…)`, se usa esa y el SVG de
 * aquí deja de pintarse. Mientras tanto, esta escena vale de sobra.
 */
export function BookingScene({ className = "" }: { className?: string }) {
  const generated = findAsset("marca", "contratar-scene");

  if (generated) {
    return (
      <div className={`relative mx-auto aspect-square w-full max-w-md ${className}`}>
        <Image
          src={generated}
          alt="Cogemos el teléfono"
          fill
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 400 460"
      className={`mx-auto w-full max-w-md ${className}`}
      fill="none"
      role="img"
      aria-label={tr(serverLocale(), "Cogemos el teléfono, no un formulario")}
    >
      {/* chispas y estrellas */}
      <g stroke={NAVY} strokeWidth="4" strokeLinecap="round">
        <path d="M60 70 l0 22 M49 81 l22 0" />
        <path d="M348 150 l0 18 M339 159 l18 0" />
        <path d="M300 60 l0 16 M292 68 l16 0" />
      </g>
      <g fill={CYAN}>
        <circle cx="40" cy="180" r="5" />
        <circle cx="360" cy="250" r="5" />
        <circle cx="110" cy="40" r="4" />
      </g>

      {/* notas musicales */}
      <g fill={CYAN} stroke={CYAN} strokeWidth="3" strokeLinecap="round">
        <g transform="translate(288 92)">
          <path d="M0 0 v-46" stroke={CYAN} strokeWidth="4" fill="none" />
          <path d="M0 -46 q18 4 22 20" stroke={CYAN} strokeWidth="4" fill="none" />
          <ellipse cx="-8" cy="2" rx="11" ry="8" transform="rotate(-20 -8 2)" />
        </g>
        <g transform="translate(330 120)">
          <path d="M0 0 v-40" stroke={CYAN} strokeWidth="4" fill="none" />
          <ellipse cx="-8" cy="2" rx="10" ry="7" transform="rotate(-20 -8 2)" />
        </g>
      </g>

      {/* teléfono: auricular en diagonal */}
      <g transform="rotate(-26 200 200)">
        {/* grip */}
        <path
          d="M92 196 Q200 262 308 196"
          stroke={CYAN}
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M92 196 Q200 262 308 196"
          stroke={NAVY}
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
          opacity="0.0"
        />
        {/* auricular (izq) y micrófono (der) */}
        <g stroke={NAVY} strokeWidth="9" strokeLinejoin="round">
          <ellipse cx="88" cy="196" rx="34" ry="46" fill="#FBFAF6" transform="rotate(-8 88 196)" />
          <ellipse cx="312" cy="196" rx="34" ry="46" fill="#FBFAF6" transform="rotate(8 312 196)" />
          {/* rejillas */}
          <g stroke={CYAN} strokeWidth="5" strokeLinecap="round">
            <path d="M76 186 h24 M76 198 h24 M80 210 h16" />
            <path d="M300 186 h24 M300 198 h24 M304 210 h16" />
          </g>
        </g>
        {/* contorno del grip */}
        <path
          d="M92 196 Q200 262 308 196"
          stroke={NAVY}
          strokeWidth="4"
          fill="none"
          opacity="0.35"
        />
      </g>

      {/* cord en espiral hacia el teléfono base */}
      <path
        d="M300 300
           c 34 6 34 34 4 40
           c -30 6 -30 34 4 40
           c 34 6 34 34 4 40"
        stroke={NAVY}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* base / dial */}
      <g transform="translate(196 392)">
        <rect x="-70" y="-8" width="150" height="56" rx="20" fill="#FBFAF6" stroke={NAVY} strokeWidth="9" />
        <circle cx="6" cy="20" r="20" fill="none" stroke={CYAN} strokeWidth="6" />
        <circle cx="6" cy="20" r="6" fill={NAVY} />
      </g>
    </svg>
  );
}
