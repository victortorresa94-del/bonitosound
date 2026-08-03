import type { Locale } from "@/lib/i18n";

/**
 * Traducciones del COPY LARGO: escenas del home y páginas de servicio.
 *
 * Va separado de lib/i18n.ts (que lleva la interfaz: menú, botones, etiquetas)
 * porque son cosas distintas: aquí está el mensaje de marca, y conviene poder
 * revisarlo de una tacada sin ruido de microcopy.
 *
 * Solo se guarda el CATALÁN. El castellano sigue viviendo en lib/home.ts y
 * lib/services.ts, que son la fuente de verdad: así no se duplica el original
 * ni hay riesgo de que las dos copias se desincronicen.
 */

/** Escenas del home, por id de escena. */
type EscenaCa = { kicker: string; statement: string; accent: string; support: string; cta?: string };

const HOME_CA: Record<string, EscenaCa> = {
  "que-es": {
    kicker: "Què és això",
    statement: "Portem la música a tot arreu.",
    accent: "tot arreu",
    support:
      "Tant li fa si és amb un cantant, un esdeveniment, una gravació o difusió. La qüestió és fer-ho bonic.",
  },
  marcas: {
    kicker: "Marques",
    statement: "Fem que les marques sonin.",
    accent: "sonin",
    support:
      "Activacions, esdeveniments i experiències de marca que la gent recorda. Del brief al titular en sis setmanes.",
    cta: "Veure'n més",
  },
  records: {
    kicker: "Records",
    statement: "Ajudem els artistes a enlairar-se.",
    accent: "enlairar-se",
    support:
      "Segell, booking, management, distribució i editorial. Tot el que necessita una carrera per créixer, en un sol lloc.",
    cta: "Veure'n més",
  },
  giras: {
    kicker: "Gires",
    statement: "I les gires, les omplim.",
    accent: "omplim",
    support:
      "Producció, ruta i management de directe. D'Antonio Orozco a Maldita Nerea: l'escenari muntat i l'aforament ple.",
    cta: "Veure'n més",
  },
  marketing: {
    kicker: "Màrqueting per a artistes",
    statement: "I que el llançament no passi desapercebut.",
    accent: "no passi desapercebut",
    support:
      "Campanyes d'ads, estratègia de xarxes i llançaments d'àlbum i d'esdeveniment. Quan surti, se n'assabenta qui se n'ha d'assabentar.",
    cta: "Veure'n més",
  },
  tecnologia: {
    kicker: "Tecnologia",
    statement: "També construïm les eines que calguin.",
    accent: "les eines que calguin",
    support: "Fem webs, programari, i tenim la nostra pròpia app: Artiverse.",
    cta: "Veure'n més",
  },
  festival: {
    kicker: "Ah, i una cosa més",
    statement: "Tenim un festival.",
    accent: "festival",
    support: "Jaleo Sound. Música espanyola i llatina a Amsterdam.",
    cta: "Veure'n més",
  },
  cierre: {
    kicker: "Parlem",
    statement: "Marca, artista o sala. Explica'ns què tens al cap.",
    accent: "què tens al cap",
    support:
      "Una trucada de mitja hora: ens ho expliques, ho mirem de debò i et diem què hi faríem. Amb honestedat, encara que de vegades sigui dir-te que encara no.",
    cta: "Parlem?",
  },
};

export function escenaCa(id: string): EscenaCa | undefined {
  return HOME_CA[id];
}

/** Cabeceras de las páginas de servicio, por slug. */
type ServicioCa = { eyebrow: string; h1: string; h1Cyan?: string; desc: string };

const SERVICIOS_CA: Record<string, ServicioCa> = {
  booking: {
    eyebrow: "Booking",
    h1: "Tanquem la data i muntem el directe.",
    h1Cyan: "muntem el directe.",
    desc: "Contractem i tanquem els directes dels nostres artistes. Agenda real, amb qui despenja el telèfon.",
  },
  management: {
    eyebrow: "Management",
    h1: "La teva carrera, amb algú al capdavant.",
    desc: "Gestionem la carrera de l'artista de principi a fi: estratègia, calendari i les decisions que importen.",
  },
  sello: {
    eyebrow: "Segell",
    h1: "La teva música, ben cuidada.",
    h1Cyan: "ben cuidada.",
    desc: "Editem, produïm i distribuïm. Del màster a les plataformes, amb criteri i sense presses. Records 360: segell, editorial i distribució en un mateix lloc.",
  },
  editorial: {
    eyebrow: "Editorial",
    h1: "Que cada ús de la teva música es cobri.",
    desc: "La part menys vistosa i de les més importants: drets, registre i que la música rendeixi allà on soni.",
  },
  distribucion: {
    eyebrow: "Distribució",
    h1: "Portem la teva música a tot el món.",
    desc: "La teva música a totes les plataformes amb les metadades en ordre, perquè es pugui escoltar, trobar i pagar com toca.",
  },
  marketing: {
    eyebrow: "Màrqueting",
    h1: "Que el llançament no passi desapercebut.",
    desc: "Campanyes, contingut i estratègia perquè cada llançament arribi més lluny.",
  },
  producciones: {
    eyebrow: "Producció de gires",
    h1: "Tu toques. De la resta ens n'ocupem nosaltres.",
    desc: "Producció tècnica, escenari, logística i coordinació de gires d'artista. Plaça a plaça, de la producció prèvia al desmuntatge.",
  },
};

export function servicioCa(slug: string): ServicioCa | undefined {
  return SERVICIOS_CA[slug];
}

/** Títulos y descripciones de las páginas principales (metadatos + cabeceras). */
const PAGINAS_CA: Record<string, { title: string; desc: string }> = {
  artistas: {
    title: "Artistes — el roster de Bonito Sound",
    desc: "A aquests els portem nosaltres: booking, management i segell. Pocs artistes, ben portats, més un catàleg de distribució d'una vintena de noms.",
  },
  giras: {
    title: "Gires — producció tècnica, logística i road management",
    desc: "Una gira no s'improvisa. Es porta. Coordinem cada detall, des de la planificació prèvia fins al desmuntatge final.",
  },
  experiencias: {
    title: "Experiències — esdeveniments per a marques, teatre i espectacles visuals",
    desc: "Creem i produïm experiències de marca on la música i les arts en viu connecten amb el públic.",
  },
  nosotros: {
    title: "Qui som — Qui hi ha darrere de Bonito Sound",
    desc: "L'equip de Bonito Sound a Sabadell: 30 anys d'ofici i la gent que ho porta.",
  },
  contacto: {
    title: "Parlem — Contacte",
    desc: "Explica'ns què tens al cap. Et diem què en faríem, amb honestedat.",
  },
};

export function paginaCa(slug: string) {
  return PAGINAS_CA[slug];
}

/** Atajo: devuelve la traducción catalana o `undefined` si el idioma es castellano. */
export function ca<T>(locale: Locale, valor: T): T | undefined {
  return locale === "ca" ? valor : undefined;
}
