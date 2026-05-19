export const site = {
  name: "Bonito Sound",
  legalName: "Bonito Sound S.L.",
  cif: "B10805299",
  founded: 2022,
  url: "https://bonitosound.com",
  description:
    "El único ecosistema cultural integral del sector musical en España. Artistas, eventos para marcas, festival propio y la tecnología que conecta a toda la industria.",
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
  { label: "Lab", href: "/lab" },
  { label: "Jaleo Sound", href: "/jaleo-sound" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Agenda", href: "/agenda" },
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
    name: "Júlia Martín",
    role: "Producto y marketing",
    line: "La que mueve esto cada día. Si la web está viva, es por ella.",
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
] as const;
