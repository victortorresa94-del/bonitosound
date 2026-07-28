/**
 * Giras que ha llevado Bonito Sound, de lo más reciente hacia atrás.
 * Datos aportados por Dani (documento "cambios web"). NADA inventado: el
 * número de conciertos es el que él confirma; si no hay cifra, no se pinta.
 *
 * La foto de cada gira es plug-and-play: si existe
 * /public/img/giras/<slug>.(jpg|png|webp) se usa; si no, la tarjeta cae a un
 * fallback tipográfico navy (nunca un hueco vacío).
 */
export type Gira = {
  slug: string;
  artist: string;
  /** Nombre de la gira, tal cual lo da Dani. */
  tour: string;
  /** Año o rango que se pinta como marca de agua. */
  year: string;
  /** Rango largo para el detalle (si difiere del año grande). */
  years?: string;
  /** Nº de conciertos confirmado (texto) + valor mínimo para sumar. */
  shows?: string;
  showsCount?: number;
};

export const giras: Gira[] = [
  { slug: "albert-pla-no-quiero-hablar", artist: "Albert Pla", tour: "No quiero hablar de mí pero yo", year: "2026", years: "2026–2027", shows: "+40 fechas previstas", showsCount: 40 },
  { slug: "dulze-que-fantasia", artist: "Dulze", tour: "Qué fantasía", year: "2026", shows: "8 fechas", showsCount: 8 },
  { slug: "alfred-garcia-testimo", artist: "Alfred García", tour: "T'estimo és te quiero", year: "2025", years: "2025–2026", shows: "+50 conciertos", showsCount: 50 },
  { slug: "natura-dj", artist: "Nàtura", tour: "Gira DJ", year: "2025", years: "2023–2026", shows: "+250 conciertos", showsCount: 250 },
  { slug: "albert-pla-rumbagenarios", artist: "Albert Pla", tour: "Rumbagenarios", year: "2024", years: "2024–2025", shows: "+40 conciertos", showsCount: 40 },
  { slug: "ernest-prana-torno-a-casa", artist: "Ernest Prana", tour: "Torno a casa", year: "2025", years: "Primavera–verano 2025", shows: "12 conciertos", showsCount: 12 },
  { slug: "laura-andres-zero", artist: "Laura Andrés", tour: "Gira Zero", year: "2025", years: "Primavera–verano 2025", shows: "+20 conciertos", showsCount: 20 },
  { slug: "eva-calyza-marca-divina", artist: "Eva Calyza", tour: "Marca Divina", year: "2024", years: "2024–2025", shows: "+15 conciertos", showsCount: 15 },
  { slug: "alfred-garcia-acustica", artist: "Alfred García", tour: "Gira Acústica", year: "2023", years: "2023–2024", shows: "+20 conciertos", showsCount: 20 },
  { slug: "pablo-rojo-on-tour", artist: "Pablo Rojo", tour: "On Tour in Spain — desde Ámsterdam", year: "2025", years: "Abril 2025", shows: "+8 actuaciones", showsCount: 8 },
  { slug: "egon-calle-invierno", artist: "Egon Calle", tour: "Gira Invierno", year: "2024", shows: "6 conciertos", showsCount: 6 },
  { slug: "ramon-mirabet-free", artist: "Ramón Mirabet", tour: "Free", year: "2022", years: "2022–2023", shows: "+30 conciertos", showsCount: 30 },
  { slug: "vicente-garcia-espana", artist: "Vicente García", tour: "Gira en España", year: "2022", years: "Verano 2022", shows: "8 conciertos", showsCount: 8 },
  { slug: "ruth-lorenzo", artist: "Ruth Lorenzo", tour: "Gira", year: "2022" },
  { slug: "bemba-saoco", artist: "Bemba Saoco", tour: "Gira", year: "2022" },
  { slug: "anne-lukin", artist: "Anne Lukin", tour: "Gira", year: "2021", years: "2021–2022", shows: "+20 conciertos", showsCount: 20 },
  { slug: "ramon-mirabet-del-mar", artist: "Ramón Mirabet", tour: "Gira del Mar — ruta por el Mediterráneo", year: "2021", shows: "+12 conciertos", showsCount: 12 },
  { slug: "nerea-rodriguez-doble-o-nada", artist: "Nerea Rodríguez", tour: "Doble o Nada Tour", year: "2021", shows: "+15 conciertos", showsCount: 15 },
  { slug: "fabian-acustica", artist: "Fabián", tour: "Gira Acústica", year: "2021", shows: "+10 conciertos", showsCount: 10 },
  { slug: "alfred-garcia-1016", artist: "Alfred García", tour: "Gira 1016", year: "2019", years: "2019–2021", shows: "+40 conciertos", showsCount: 40 },
];

/** Números de la sección, DERIVADOS de los datos de arriba (no inventados). */
export const girasStats = {
  /** Suma de los conciertos documentados, redondeada a la baja a la centena. */
  conciertos: Math.floor(
    giras.reduce((n, g) => n + (g.showsCount ?? 0), 0) / 100,
  ) * 100,
  giras: giras.length,
  artistas: new Set(giras.map((g) => g.artist)).size,
};
