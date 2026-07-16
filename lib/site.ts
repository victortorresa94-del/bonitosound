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
  },
} as const;

// Cloudflare R2: casa única de los vídeos pesados. Host-independiente — la
// misma URL sirve en dev (Vercel) y en producción (IONOS). Los .md/componentes
// referencian solo la CLAVE del objeto (ej. "corona.mp4") y aquí se antepone
// la base; si algún día cambia el bucket, se toca únicamente esta línea.
export const R2_BASE = "https://pub-c9e7a562bfd645b5ac829874e2360807.r2.dev";

/** Devuelve la URL completa de un vídeo en R2 a partir de su clave. */
export function r2(key: string): string {
  return key.startsWith("http") ? key : `${R2_BASE}/${key.replace(/^\//, "")}`;
}

// Menú principal: 5 entradas. Categorías-servicio + institucional, en orden
// de prioridad. Marketing vive dentro de Records; Jaleo Sound, en el footer
// (es un proyecto con marca propia, no compite en el nivel principal).
export const nav = [
  { label: "Artistas", href: "/artistas" },
  { label: "Eventos", href: "/eventos" },
  { label: "Records", href: "/records" },
  { label: "Universo Bonito", href: "/universo" },
  { label: "Nosotros", href: "/nosotros" },
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
  "AEDEM",
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
