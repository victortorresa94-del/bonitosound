const CYAN = "#16b6d4";

/**
 * Set de iconos de línea (estilo Bonito: trazo navy currentColor + acento cyan)
 * para los bloques "Qué hacemos" de las páginas de servicio. 24×24, stroke.
 * Añadir uno = añadir una clave aquí; el resto es data en lib/services.ts.
 */
export type IconName =
  | "mixer" | "sonido" | "escenario" | "logistica" | "calendario"
  | "management" | "disco" | "distribucion" | "derechos" | "megafono"
  | "crecimiento" | "estrategia" | "roster" | "direccion" | "plataformas"
  | "entrada" | "brief" | "sync";

export function ServiceIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
  };
  const dot = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="1.6" fill={CYAN} stroke="none" />;

  switch (name) {
    case "mixer": // mesa de sonido / producción técnica
      return (
        <svg {...common}>
          <path d="M6 3v6M6 15v6M12 3v9M12 18v3M18 3v3M18 12v9" />
          <rect x="4.3" y="9" width="3.4" height="6" rx="1" fill={CYAN} stroke="none" />
          <rect x="10.3" y="12" width="3.4" height="6" rx="1" />
          <rect x="16.3" y="6" width="3.4" height="6" rx="1" />
        </svg>
      );
    case "sonido": // altavoz / directo
      return (
        <svg {...common}>
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8 8 0 0 1 0 12" stroke={CYAN} />
        </svg>
      );
    case "escenario": // foco / luces y escenario
      return (
        <svg {...common}>
          <path d="M9 3l2 5M15 3l-2 5" />
          <path d="M7 8h10l-1.5 4h-7L7 8Z" fill={CYAN} stroke="none" />
          <path d="M8.5 12l-3 9M15.5 12l3 9M8.5 21h7" />
        </svg>
      );
    case "logistica": // furgoneta / gira
      return (
        <svg {...common}>
          <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z" />
          <circle cx="6.5" cy="18" r="1.8" />
          <circle cx="16.5" cy="18" r="1.8" />
          {dot(9, 11.5)}
        </svg>
      );
    case "calendario": // fechas / booking
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
          <rect x="7" y="12" width="4" height="4" rx="0.8" fill={CYAN} stroke="none" />
        </svg>
      );
    case "management": // handshake / carrera llevada a mano
      return (
        <svg {...common}>
          <path d="M8 12l2.5 2.5a2 2 0 0 0 2.8 0L18 10" />
          <path d="M3 8l4-2 5 3M21 8l-4-2-3 2" />
          <path d="M7 6v8M17 6v8" />
        </svg>
      );
    case "disco": // vinilo / sello y producción
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.4" fill={CYAN} stroke="none" />
          <path d="M12 5.5a6.5 6.5 0 0 1 6.5 6.5" stroke={CYAN} />
        </svg>
      );
    case "distribucion": // subir a plataformas
      return (
        <svg {...common}>
          <path d="M12 15V4M8 8l4-4 4 4" stroke={CYAN} />
          <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
        </svg>
      );
    case "derechos": // documento con check / editorial
      return (
        <svg {...common}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4" />
          <path d="M9 14l2 2 4-4" stroke={CYAN} />
        </svg>
      );
    case "megafono": // ads
      return (
        <svg {...common}>
          <path d="M3 10v4l11 5V5L3 10Z" />
          <path d="M14 8a4 4 0 0 1 0 8" stroke={CYAN} />
          <path d="M6 14v4l3 1v-4" />
        </svg>
      );
    case "crecimiento": // gráfico al alza
      return (
        <svg {...common}>
          <path d="M3 20h18" />
          <path d="M5 16l4-5 4 3 6-8" stroke={CYAN} />
          <path d="M19 6h-3M19 6v3" stroke={CYAN} />
        </svg>
      );
    case "estrategia": // diana
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          {dot(12, 12)}
        </svg>
      );
    case "roster": // personas
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 6a3 3 0 0 1 0 6M18 20a6 6 0 0 0-3-5.2" stroke={CYAN} />
        </svg>
      );
    case "direccion": // estrella / dirección artística
      return (
        <svg {...common}>
          <path d="M12 3l2.4 5.6L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.4L12 3Z" />
        </svg>
      );
    case "plataformas": // globo
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke={CYAN} />
        </svg>
      );
    case "entrada": // ticket
      return (
        <svg {...common}>
          <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4 2 2 0 0 1 0-4Z" />
          <path d="M15 6v12" stroke={CYAN} strokeDasharray="1 2.5" />
        </svg>
      );
    case "brief": // documento / brief
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke={CYAN} />
        </svg>
      );
    case "sync": // sincronización (claqueta)
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M3 11l4-4M9 11l4-4M15 11l4-4" stroke={CYAN} />
        </svg>
      );
  }
}
