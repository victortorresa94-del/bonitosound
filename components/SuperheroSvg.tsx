type State = "home" | "records" | "eventos";

/**
 * Versión SVG-only del Superhero (sin findAsset / node:fs).
 * Safe para client components. Si necesitas el PNG raster, usa <Superhero>.
 */
export function SuperheroSvg({
  state = "home",
  className = "",
}: {
  state?: State;
  className?: string;
}) {
  const stroke = "var(--text-primary)";
  const fill = "var(--accent-blue)";
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`Bonito Sound — ${state}`}
      className={className}
      fill="none"
    >
      <circle cx="100" cy="100" r="86" stroke={stroke} strokeOpacity="0.14" strokeWidth="2" />
      <path
        d="M58 100c0-26 24-44 52-44s52 18 52 44-24 44-52 44-52-18-52-44Z"
        fill={fill}
        fillOpacity="0.16"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M58 100c-10-9-18-10-26-6 5 6 5 18 0 24 9 4 17 2 26-6"
        fill={fill}
        fillOpacity="0.16"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M96 86c8-4 18-4 26 0-2 7-8 11-13 11s-11-4-13-11Z" fill={stroke} />
      <circle cx="105" cy="118" r="3.5" fill={stroke} />
      {state === "home" && (
        <path
          d="M120 70c14 6 22 18 22 30"
          stroke={fill}
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}
      {state === "records" && (
        <>
          <circle cx="109" cy="104" r="22" stroke={stroke} strokeWidth="3.5" />
          <circle cx="109" cy="104" r="6" fill={fill} />
          <circle cx="109" cy="104" r="1.6" fill={stroke} />
        </>
      )}
      {state === "eventos" && (
        <>
          <path
            d="M118 90v28l16 12V78l-16 12Z"
            fill={fill}
            fillOpacity="0.2"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M142 92c6 5 6 21 0 26M150 84c11 9 11 39 0 48"
            stroke={fill}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
