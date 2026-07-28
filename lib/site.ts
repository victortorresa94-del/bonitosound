export const site = {
  name: "Bonito Sound",
  legalName: "Bonito Sound S.L.",
  cif: "B10805299",
  founded: 2022,
  url: "https://bonitosound.com",
  description:
    "Llevamos artistas, montamos eventos para marcas, tenemos festival propio y construimos el software que al sector le falta. Todo bajo el mismo techo, en Sabadell.",
  address: {
    street: "Carrer Tulancingo, 4",
    zip: "08206",
    city: "Sabadell",
    region: "Barcelona",
    country: "ES",
  },
  phone: "+34 656 865 545",
  emails: {
    general: "bonito@bonitosound.com",
    booking: "sonabonito@bonitosound.com",
  },
  social: {
    instagram: "https://instagram.com/bonito_sound",
    linkedin: "https://linkedin.com/company/bonito-sound",
  },
  external: {
    jaleo: "https://jaleosound.com",
    artiverse: "https://artiverse.es",
    youtubeSantJordi: "https://youtu.be/r47SP4OULcI",
    spotifyJaleoPlaylist:
      "https://open.spotify.com/playlist/2J24790mkalzNNsw4vFc2E",
    spotifyJaleoPlaylistId: "2J24790mkalzNNsw4vFc2E",
    // Playlist de artistas de Bonito. El botón de Spotify del player flotante
    // (fuera del home) la abre. No se incrusta: el embed de Spotify obliga a
    // mostrar su banner de marca, así que enlazamos a la playlist real.
    spotifyBonitoPlaylist: "https://open.spotify.com/playlist/2lxa6r7k0dthpANWR9wRWs",
  },
} as const;

// Cloudflare R2: casa única de los vídeos pesados. Host-independiente — la
// misma URL sirve en dev (Vercel) y en producción (IONOS). Los .md/componentes
// referencian solo la CLAVE del objeto (ej. "corona.mp4") y aquí se antepone
// la base; si algún día cambia el bucket, se toca únicamente esta línea.
// Base de los vídeos alojados fuera del repo. Configurable por env para poder
// cambiar de host (R2 → Vercel Blob → lo que sea) SIN tocar código: basta con
// poner NEXT_PUBLIC_VIDEO_BASE en Vercel a la URL base pública (sin barra final)
// y redesplegar. Si un vídeo está en /public/video/... esa ruta local manda y
// esto ni se usa.
export const R2_BASE =
  process.env.NEXT_PUBLIC_VIDEO_BASE ??
  "https://pub-c9e7a562bfd645b5ac829874e2360807.r2.dev";

/** Devuelve la URL completa de un vídeo a partir de su clave (o la deja tal
 *  cual si ya es una URL absoluta). */
export function r2(key: string): string {
  // URL absoluta o ruta local (/video/...) → se deja tal cual. Solo las claves
  // "sueltas" (resumen-bonito.mp4) se resuelven contra el bucket R2.
  return key.startsWith("http") || key.startsWith("/")
    ? key
    : `${R2_BASE.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;
}

// Menú principal: 5 entradas. Categorías-servicio + institucional, en orden
// de prioridad. Marketing vive dentro de Records; Jaleo Sound, en el footer
// (es un proyecto con marca propia, no compite en el nivel principal).
export const nav = [
  { label: "¿Qué hacemos?", href: "/servicios" },
  { label: "Artistas", href: "/artistas" },
  { label: "Giras", href: "/giras" },
  { label: "Experiencias", href: "/experiencias" },
  { label: "Universo Bonito", href: "/universo" },
  { label: "Qué somos", href: "/nosotros" },
] as const;

export const team = [
  {
    name: "Dani Boada",
    role: "Fundador",
    line: "30 años en la industria. Management, contratos, la llamada que cierra el bolo.",
  },
  {
    name: "Manu Rojo",
    role: "Cofundador",
    line: "Project management, financiación y booking. Lleva a Eva Calyza de la mano.",
  },
  {
    name: "Xavi Julià",
    role: "Producción",
    line: "El que convierte el deck en evento. La producción que se ve en el escenario.",
  },
  {
    name: "Cristina Soler",
    role: "Comunicación",
    line: "Coordina lo de dentro y lo de fuera. Lo que ves publicado, ha pasado por ella.",
  },
  {
    name: "Victor Torres",
    role: "Marketing Artístico & IA",
    line: "Campañas, contenido y la IA que hace que cada lanzamiento llegue más lejos.",
  },
] as const;

export const memberships = [
  "UFI",
  "SGAE",
  "AGEDI",
  "ARTE",
  "European Music Council",
] as const;

export const support = [
  "Institut Ramon Llull",
  "Plan de Recuperación UE",
  "Unión Europea",
] as const;

// Apoyos confirmados sin logo aún (mostrar como texto):
export const supportPending = [
  "Ministerio de Cultura",
  "Instituto Cervantes",
  "Embajada de España en Holanda",
  "AIE",
  "Stadsdeel Amsterdam",
] as const;

export const brands = [
  "Ballantine's",
  "Pernod Ricard",
  "Pepsico",
  "Schweppes",
  "Corona",
  "Absolut",
  "Font Vella",
  "Four Roses",
  "Seagram's",
  "Monkey",
  "Sainte Marguerite",
  "Le Souffle",
  "Universal",
  "Gestmusic",
  "Concert Studio",
  "Global Talent Services",
  "Sweet Bird",
  "Código 1530",
  "Lighthouse",
  "Corre Lola Corre",
  "Sr. Wilson",
] as const;

/**
 * Empresas y entidades que han confiado en Bonito Sound, agrupadas por tipo.
 * Material aportado por Dani (carpeta de Drive, ver docs/MATERIAL-DANI-DRIVE.md).
 *
 * Reglas:
 *  - `brands` (arriba) se mantiene intacto: lo usan el home, servicios y eventos.
 *    Aquí se referencia, NO se duplica.
 *  - Un nombre vive en UNA sola categoría (si no, la key de React colisiona):
 *    Global Talent Services, Sweet Bird y Corre Lola Corre ya están en `brands`,
 *    así que no se repiten en agencias. "Concert Estudio" es la misma empresa
 *    que "Concert Studio" de `brands`.
 *  - Los PROVEEDORES no son clientes: van en su propio bloque, aparte del muro
 *    de "han confiado en nosotros".
 */
export type TrustedCategory = {
  id: "marcas" | "agencias" | "ayuntamientos" | "asociaciones" | "proveedores";
  label: string;
  /** Subcarpeta en /public/img/ donde viven sus logos. */
  dir: string;
  /** Escudos municipales piden celda cuadrada; los logotipos, apaisada. */
  layout?: "wide" | "shield";
  /** Los que salen en el home (subconjunto por nombre exacto). */
  featured?: readonly string[];
  items: readonly string[];
};

const AGENCIAS = [
  "Arenal Sound", "Festival Pedralbes", "Desalia", "Share Festival Barcelona",
  "Pirata Festival", "Mediterrànea Festival", "Música Global", "Propaganda pel Fet!",
  "Heliogàbal", "Sala Búho Real", "Quality Artist Management",
  "Planning General d'Espectacles", "Nauw Ur Music", "Midnight Entertainment",
  "M2 Music Group", "LT Music", "La Tornada", "La Bombilla Media",
  "Radiocat XXL", "Wilson Agencia Creativa", "Up & Down Tempo", "Jolssen Events",
  "Events91", "Espectacles La Traca", "Emergen-disc", "Barcelona Events Musicals",
  "Bética Trade", "FOMO Gastronomía y Cultura", "Produccions Artístiques Victori",
  "Federación Coordinadora del Circuito de Músicas Populares",
] as const;

const AYUNTAMIENTOS = [
  "Ajuntament de Sabadell", "Ajuntament de Granollers", "Ajuntament de Calella",
  "Ajuntament de Tossa de Mar", "Ajuntament de Banyoles", "Ajuntament de Sant Boi de Llobregat",
  "Ajuntament de Sant Celoni", "Ajuntament de Montcada i Reixac", "Ajuntament de Pineda de Mar",
  "Ajuntament de Ripollet", "Ajuntament del Masnou", "Ajuntament de Moià",
  "Ajuntament de Polinyà", "Ajuntament de Palafolls", "Ajuntament de Castellbisbal",
  "Ajuntament de Caldes de Montbui", "Ajuntament de Caldes d'Estrac", "Ajuntament de Canet de Mar",
  "Ajuntament de Masquefa", "Ajuntament de l'Ametlla del Vallès", "Ajuntament de la Roca del Vallès",
  "Ajuntament de Santa Perpètua de la Mogoda", "Ajuntament de Sant Andreu de Llavaneres",
  "Ajuntament de Sant Sadurní d'Anoia", "Ajuntament de Sant Esteve Sesrovires",
  "Ajuntament de Sant Esteve de Palautordera", "Ajuntament de Vila-seca",
  "Ajuntament de Vallmoll", "Ajuntament de Vilassar de Dalt", "Ajuntament de Vilobí d'Onyar",
  "Ajuntament d'Olesa de Montserrat", "Ajuntament del Pla de Santa Maria",
  "Ajuntament de Palau-solità i Plegamans", "Ajuntament de Campins",
  "Ajuntament de Montesquiu", "Ayuntamiento de Cuevas del Valle",
] as const;

const ASOCIACIONES = [
  "Fundación Colección Thyssen-Bornemisza", "Universitat Autònoma de Barcelona",
  "Universidad Carlos III de Madrid", "Minyons Escoltes i Guies de Catalunya",
  "Castellers del Poble Sec", "Colla de Castellers Xiquets del Serrallo",
  "Blaus de Granollers", "Col·legi Oficial de Criminologia de Catalunya",
  "SPM Viladecans Qualitat", "Tritoma", "Harmony Games", "FUNADER",
  "L'Afluent", "Col·lectiu l'Aresta", "Associació Cultural TGK",
  "Associació Festa Major Jove de Sentmenat", "Associació Juvenil Corberenca",
  "Associació Cultural i Popular de l'Esquerra de l'Eixample",
  "Associació de Comissions de Festes de Carrers del Poblenou",
  "Associació de Joves Seniencs", "Associació Jovent Ignorat", "Associació la Garrinada",
  "Associació Veïns Sant Oleguer Sol i Padrís", "Comissió de Festes de Bescanó",
  "La Veu del Jovent Aubesa", "Nostra Llar Sant Oleguer",
  "Plataforma Infantil i Juvenil de Les Corts", "Societat Coral l'Esperança",
  "Asociación Club Matador", "BPM Grup",
] as const;

const PROVEEDORES = [
  "Block Audiovisuals", "Visual Sonora", "Solfesa", "Transit Projectes",
  "Xtra Event & Communication", "Tàndem Projects", "BestWay Events",
  "Ben Aisit", "Lari Music", "Crocantickets", "Mancomunitat de la Vall de Camprodon",
  "Meliá Hotels International",
] as const;

/** Marcas nuevas que aportó Dani, además de las de `brands`. */
const MARCAS_EXTRA = ["La Casera", "Bartender Spirits Awards", "Intruso Bar"] as const;

export const trustedBy: readonly TrustedCategory[] = [
  {
    id: "marcas",
    label: "Marcas",
    dir: "marcas",
    featured: ["Ballantine's", "Pepsico", "Corona", "Schweppes", "Universal", "Gestmusic"],
    items: [...brands, ...MARCAS_EXTRA],
  },
  {
    id: "agencias",
    label: "Agencias y festivales",
    dir: "agencias",
    featured: ["Arenal Sound", "Festival Pedralbes", "Desalia", "Música Global"],
    items: AGENCIAS,
  },
  {
    id: "ayuntamientos",
    label: "Ayuntamientos",
    dir: "ayuntamientos",
    layout: "shield",
    featured: ["Ajuntament de Sabadell", "Ajuntament de Granollers", "Ajuntament de Banyoles"],
    items: AYUNTAMIENTOS,
  },
  {
    id: "asociaciones",
    label: "Asociaciones e instituciones",
    dir: "asociaciones",
    featured: [
      "Fundación Colección Thyssen-Bornemisza",
      "Universitat Autònoma de Barcelona",
      "Universidad Carlos III de Madrid",
    ],
    items: ASOCIACIONES,
  },
  {
    id: "proveedores",
    label: "Con quién lo hacemos",
    dir: "proveedores",
    items: PROVEEDORES,
  },
] as const;

export const tourArtists = [
  "Albert Pla",
  "Alfred García",
  "Antonio Orozco",
  "Maldita Nerea",
  "Ruth Lorenzo",
  "Ramon Mirabet",
  "Efecto Pasillo",
] as const;

export const distributionCatalog = [
  "Paule",
  "Dulze",
  "Sa Pena",
  "Soylapau",
  "Daniel Giró",
  "96Grados",
  "Pablo Rojo",
  "Nàtura",
  "Hebe",
  "Kanela",
  "Sotrac",
  "Belbaka",
  "Egon Calle",
  "Rumba Menuda",
  "Fabian",
  "Eva Calyza",
  "Kenai White",
  "Overpulation",
  "D Nácar",
  "AlexDeLion",
  "Marco la Testa",
] as const;

// Plataformas a las que distribuimos (las principales; hay muchas más tiendas y
// redes). Si algún día se suben logos a /img/plataformas/<slug>, el componente
// los usa; mientras, cada una va como chip con su nombre.
export const distributionPlatforms = [
  "Spotify",
  "Apple Music",
  "YouTube Music",
  "Amazon Music",
  "Deezer",
  "Tidal",
  "Instagram / TikTok",
  "Shazam",
] as const;
