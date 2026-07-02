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

export const nav = [
  { label: "Eventos", href: "/eventos" },
  { label: "Records", href: "/records" },
  { label: "Artistas", href: "/artistas" },
  { label: "Marketing", href: "/marketing" },
  { label: "Lab", href: "/lab" },
  { label: "Jaleo Sound", href: "/jaleo-sound" },
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
    line: "El que hace que el deck se convierta en evento. Sin él, no hay escenario.",
  },
  {
    name: "Cristina Soler",
    role: "Comunicación",
    line: "La voz que coordina lo de fuera y lo de dentro. Si te llega, es porque ella lo manda.",
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
  "Absolut",
  "Font Vella",
  "Four Roses",
  "Le Souffle",
  "Universal",
  "Gestmusic",
  "Concert Studio",
  "GTS Global Talent Services",
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
