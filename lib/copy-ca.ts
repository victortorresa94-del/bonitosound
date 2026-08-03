import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * Memoria de traducción: catalán indexado POR LA FRASE CASTELLANA.
 *
 * Por qué así y no con claves inventadas ("giras.hero.titulo"): el copy de la
 * web son cientos de frases sueltas repartidas por las páginas. Con claves
 * habría que bautizarlas una a una, el código quedaría ilegible (no se ve lo
 * que pone la página) y cualquier retoque de copy obligaría a ir a dos sitios.
 * Indexando por la frase original, el castellano SIGUE VIÉNDOSE en el JSX —
 * que es donde se escribe y se revisa— y aquí solo vive su equivalente.
 *
 * Regla: si una frase no está traducida, sale en castellano. Nunca un hueco.
 *
 * ⚠️ Limitación asumida: si la misma frase castellana necesitara dos catalanes
 * distintos según el contexto, esto no lo distingue. No pasa hoy; si pasara,
 * esa frase concreta se saca a lib/i18n.ts con clave propia.
 */
const CA: Record<string, string> = {
  // ── Giras ──
  "Producción y dirección de giras": "Producció i direcció de gires",
  "Una gira no se improvisa. Se lleva.": "Una gira no s'improvisa. Es porta.",
  "Una gira no se improvisa. Se lleva. Coordinamos cada detalle, desde la planificación previa hasta el desmontaje final, porque la diferencia entre un buen concierto y una gran producción está en los detalles.":
    "Una gira no s'improvisa. Es porta. Coordinem cada detall, des de la planificació prèvia fins al desmuntatge final, perquè la diferència entre un bon concert i una gran producció és en els detalls.",
  "Producción técnica, logística y road management": "Producció tècnica, logística i road management",
  "Cuéntanos tu gira →": "Explica'ns la teva gira →",
  "¿Tienes una gira que mover?": "Tens una gira per moure?",
  "Cuéntanos las fechas y el proyecto. Te decimos cómo la montamos y por dónde empezaríamos.":
    "Explica'ns les dates i el projecte. Et diem com la muntem i per on començaríem.",
  "Giras Bonitas.": "Gires Bonites.",
  "Ver la gira →": "Veure la gira →",
  "Conciertos": "Concerts",
  "Giras": "Gires",
  "Artistas": "Artistes",
  "La ruta": "La ruta",
  "Las giras": "Les gires",
  "Qué ponemos en una gira": "Què hi posem, en una gira",
  "conciertos": "concerts",
  "Ver la gira": "Veure la gira",
  "Producción técnica": "Producció tècnica",
  "Logística": "Logística",
  "Road management": "Road management",
  "Coordinación integral": "Coordinació integral",

  // ── Artistas ──
  "Artistas con": "Artistes amb",
  "el rollo": "el rotllo",
  "Booking · Management · Sello": "Booking · Management · Segell",
  "Roster completo": "Roster complet",
  "Catálogo de": "Catàleg de",
  "distribución": "distribució",
  "~20 artistas,": "~20 artistes,",
  "una distribuidora.": "una distribuïdora.",
  "Entre ellos,": "Entre ells,",
  "— cantautor y actor salmantino con discografía propia.":
    "— cantautor i actor salmantí amb discografia pròpia.",
  "Producción de giras": "Producció de gires",
  "Producción y dirección de gira": "Producció i direcció de gira",
  "Producción técnica de giras": "Producció tècnica de gires",
  "Producción técnica y logística": "Producció tècnica i logística",
  "El roster": "El roster",
  "A quién llevamos": "A qui portem",
  "Ver la ficha": "Veure la fitxa",
  "Booking": "Booking",
  "Management": "Management",
  "Sello": "Segell",
  "Distribución": "Distribució",
  "Editorial": "Editorial",
  "Escuchar": "Escoltar",

  // ── Experiencias ──
  "Eventos para marcas": "Esdeveniments per a marques",
  "Diseñamos experiencias musicales que conectan marcas, artistas y personas.":
    "Dissenyem experiències musicals que connecten marques, artistes i persones.",
  "Eventos de marca": "Esdeveniments de marca",
  "Hacemos que las marcas suenen.": "Fem que les marques sonin.",
  "Creamos y producimos experiencias de marca donde la música, las artes en vivo y el entretenimiento se convierten en herramientas para conectar con el público. Participamos en todo el proceso creativo o ejecutamos proyectos ya diseñados, coordinando artistas, producción y equipos técnicos para hacer realidad cada evento.":
    "Creem i produïm experiències de marca on la música, les arts en viu i l'entreteniment esdevenen eines per connectar amb el públic. Participem en tot el procés creatiu o executem projectes ja dissenyats, coordinant artistes, producció i equips tècnics per fer realitat cada esdeveniment.",
  "Porque una marca no solo debe verse. Debe vivirse.":
    "Perquè una marca no només s'ha de veure. S'ha de viure.",
  "Eventos": "Esdeveniments",
  "realizados": "realitzats",
  "Marcas": "Marques",
  "que han confiado": "que hi han confiat",
  "Artistas con los que": "Artistes amb qui",
  "hemos colaborado": "hem col·laborat",
  "Marcas que han confiado": "Marques que hi han confiat",
  "Ver la experiencia →": "Veure l'experiència →",
  "Evento de marca": "Esdeveniment de marca",
  "Han confiado en nosotros": "Hi han confiat",
  "No todo es música": "No tot és música",
  "espectáculos visuales.": "espectacles visuals.",
  "Especialistas en producción de mapping, instalaciones de luz y experiencias visuales para eventos y marcas. Transformamos fachadas, espacios urbanos y escenarios en espectáculos únicos mediante tecnología, creatividad e innovación.":
    "Especialistes en producció de mapping, instal·lacions de llum i experiències visuals per a esdeveniments i marques. Transformem façanes, espais urbans i escenaris en espectacles únics mitjançant tecnologia, creativitat i innovació.",
  "Míralo en movimiento": "Mira-ho en moviment",
  "Mapping": "Mapping",
  "Proyección de mapping en una fachada": "Projecció de mapping en una façana",
  "Mapping y espectáculos visuales": "Mapping i espectacles visuals",
  "No organizamos eventos.": "No organitzem esdeveniments.",
  "Creamos momentos que suenan bonito.": "Creem moments que sonen bonic.",
  "Cuéntanoslo.": "Explica'ns-ho.",
  "Hablemos →": "Parlem-ne →",
  "¿Quieres crear un evento? Hablemos": "Vols crear un esdeveniment? Parlem-ne",
  "Quitar el sonido": "Treure el so",
  "Poner el sonido": "Posar el so",
  "Ver los eventos": "Veure els esdeveniments",
  "Teatro y espectáculos visuales": "Teatre i espectacles visuals",
  "El vídeo lo cuenta mejor": "El vídeo ho explica millor",

  // ── Qué somos ──
  "El equipo": "L'equip",
  "Ha trabajado con": "Ha treballat amb",
  "Quiénes somos": "Qui som",
  "Dónde estamos": "On som",

  // ── Qué somos ──
  "Qué somos": "Qui som",
  "Somos la gente": "Som la gent",
  "del sector.": "del sector.",
  "Booking, management, sello, distribución y eventos. Una agencia musical joven con treinta años de oficio detrás. Hacemos las cosas bonitas, sin postureo, porque nos gusta de verdad.":
    "Booking, management, segell, distribució i esdeveniments. Una agència musical jove amb trenta anys d'ofici al darrere. Fem les coses boniques, sense postureig, perquè ens agrada de debò.",
  "El equipo de Bonito Sound": "L'equip de Bonito Sound",
  "años": "anys",
  "de oficio": "d'ofici",
  "montamos": "vam muntar",
  "lanzamientos": "llançaments",
  "desde 2022": "des del 2022",
  "eventos": "esdeveniments",
  "Dani lleva treinta años en la industria musical española. Treinta años dan para ver de todo: sobre todo, para ver lo que no funciona y por qué nadie lo arregla.":
    "En Dani fa trenta anys que és a la indústria musical espanyola. Trenta anys donen per veure de tot: sobretot, per veure què no funciona i per què ningú no ho arregla.",
  "Montamos Bonito para arreglarlo, juntando bajo un mismo techo lo que el sector te hace montar con cinco proveedores.":
    "Vam muntar Bonito per arreglar-ho, ajuntant sota un mateix sostre el que el sector et fa muntar amb cinc proveïdors.",
  "Somos pocos, hacemos mucho y cogemos el teléfono. No damos keynote: montamos lo que se ve en el escenario.":
    "Som pocs, fem molt i despengem el telèfon. No fem keynotes: muntem el que es veu a l'escenari.",
  "Presentación de Bonito Sound": "Presentació de Bonito Sound",
  "Gente con nombre y teléfono.": "Gent amb nom i telèfon.",
  "El día a día": "El dia a dia",
  "Lo que montamos, semana a semana.": "El que muntem, setmana a setmana.",
  "Directos, backstage y lo que va cayendo. Como el vídeo de Cris: así trabajamos. Hay mucho más de esto ahí dentro.":
    "Directes, backstage i el que va caient. Com el vídeo de la Cris: així treballem. Hi ha molt més d'això aquí dins.",
  "Míranos en Instagram →": "Mira'ns a Instagram →",
  "Reel de Bonito Sound": "Reel de Bonito Sound",
  "Dani Boada · Fundador": "Dani Boada · Fundador",
  "Treinta años en esto. Y sigue al teléfono.": "Trenta anys en això. I encara despenja el telèfon.",
  "La entrevista a Dani, sin guion.": "L'entrevista a en Dani, sense guió.",
  "Management, contratos y la llamada que cierra el bolo: ese es el día a día de Dani. En treinta años en la industria ha llevado a artistas que hoy llenan estadios.":
    "Management, contractes i la trucada que tanca el bolo: aquest és el dia a dia d'en Dani. En trenta anys a la indústria ha portat artistes que avui omplen estadis.",
  "Empezó donde se aprende de verdad: cargando y montando. Backliner, producción técnica y dirección de giras por toda España, de sala en sala y de furgoneta en furgoneta. También producción en televisión, en":
    "Va començar on s'aprèn de debò: carregant i muntant. Backliner, producció tècnica i direcció de gires per tot Espanya, de sala en sala i de furgoneta en furgoneta. També producció en televisió, a",
  ". Nada de lo que pide hoy a un equipo es algo que no haya hecho antes él.":
    ". Res del que demana avui a un equip no ho hagi fet ell abans.",
  "Ha visto de todo lo que se puede ver en este oficio: lo que funciona, lo que no, y por qué. Ese recorrido es lo que hay detrás de cada decisión que tomamos en Bonito.":
    "Ha vist tot el que es pot veure en aquest ofici: el que funciona, el que no, i per què. Aquest recorregut és el que hi ha darrere de cada decisió que prenem a Bonito.",
  "Cómo trabajamos": "Com treballem",
  "Lo que firmas con nosotros.": "El que signes amb nosaltres.",
  "En este sector, demasiados artistas descubren la letra pequeña cuando ya es tarde. Con nosotros no hay letra pequeña. Los números se hablan; los principios, aquí.":
    "En aquest sector, massa artistes descobreixen la lletra petita quan ja és tard. Amb nosaltres no hi ha lletra petita. Els números es parlen; els principis, aquí.",
  "Pacto antes de empezar": "Pacte abans de començar",
  "Lo que prometemos en la primera llamada acaba por escrito antes del primer movimiento. Cero acuerdos verbales que luego nadie recuerda.":
    "El que prometem a la primera trucada acaba per escrit abans del primer moviment. Cap acord verbal que després ningú no recorda.",
  "Exclusividad solo donde aporta": "Exclusivitat només on aporta",
  "Si te llevamos en booking no te obligamos a fichar también el sello. Cada servicio se contrata y se justifica por separado.":
    "Si et portem el booking no t'obliguem a fitxar també el segell. Cada servei es contracta i es justifica per separat.",
  "Salida ordenada": "Sortida ordenada",
  "Si la cosa no va, se acaba sin pelea. Plazo de aviso corto, devolución de lo que es tuyo, y a otra cosa.":
    "Si la cosa no rutlla, s'acaba sense baralla. Termini d'avís curt, devolució del que és teu, i a una altra cosa.",
  "Tu música, tus másters": "La teva música, els teus màsters",
  "Lo que produzcamos juntos se acuerda en el papel: a quién pertenece, durante cuánto y cómo revierte. Sin ambigüedad.":
    "El que produïm junts s'acorda al paper: a qui pertany, durant quant i com reverteix. Sense ambigüitat.",
  "Sin cláusulas trampa": "Sense clàusules trampa",
  "Nada de obligar a sacar X canciones al año ni a cubrir gastos imposibles. Si hay que renegociar, se renegocia.":
    "Res d'obligar a treure X cançons l'any ni a cobrir despeses impossibles. Si cal renegociar, es renegocia.",
  "Cuentas claras": "Comptes clars",
  "Liquidaciones a tiempo y trimestrales. Si una plataforma se retrasa, te lo decimos.":
    "Liquidacions puntuals i trimestrals. Si una plataforma s'endarrereix, t'ho diem.",
  "El sector nos conoce": "El sector ens coneix",
  "Programas e instituciones con las que andamos.": "Programes i institucions amb qui anem.",
  "Proyecto residente 2025 de la fábrica de creación del Ajuntament de Barcelona.":
    "Projecte resident 2025 de la fàbrica de creació de l'Ajuntament de Barcelona.",
  "Compañía inscrita en la Red Española de Teatros, Auditorios, Circuitos y Festivales.":
    "Companyia inscrita a la Red Española de Teatros, Auditorios, Circuitos y Festivales.",
  "Proyecto acompañado por la fundación que conecta cultura y empresa en Catalunya.":
    "Projecte acompanyat per la fundació que connecta cultura i empresa a Catalunya.",
  "Ver": "Veure",
  "Miembros activos de": "Membres actius de",
  "Con el apoyo de": "Amb el suport de",
  "También con el apoyo de": "També amb el suport de",
  "Lo que pensamos, escrito.": "El que pensem, escrit.",
  "Ver el blog": "Veure el blog",
  "Leer →": "Llegir →",
  "¿Hablamos?": "Parlem?",
  "Cuéntanos qué tienes en la cabeza. Te contestamos nosotros, no un bot.":
    "Explica'ns què tens al cap. Et contestem nosaltres, no un bot.",

  // ── Contacto ──
  "Hablemos": "Parlem-ne",
  "Cogemos el teléfono,": "Despengem el telèfon,",
  "no un formulario": "no un formulari",
  "Cuéntanos tu proyecto, tu idea o lo que necesites. Te respondemos rápido, y por personas.":
    "Explica'ns el teu projecte, la teva idea o el que necessitis. Et responem ràpid, i persones de veritat.",
  "Cuéntanos el bolo para": "Explica'ns el bolo per a",
  ": fecha, sitio y qué tienes en mente. Te respondemos rápido, y por personas.":
    ": data, lloc i què tens al cap. Et responem ràpid, i persones de veritat.",
  "Teléfono": "Telèfon",
  "Ubicación": "Ubicació",

  // ── Clientes ──
  "Clientes": "Clients",
  "Empresas que han confiado en hacerlo bonito.": "Empreses que han confiat a fer-ho bonic.",
  "Marcas, agencias, festivales, ayuntamientos y asociaciones para las que ha trabajado Bonito Sound.":
    "Marques, agències, festivals, ajuntaments i associacions per a qui ha treballat Bonito Sound.",
  "Categorías": "Categories",
  "Agencias y festivales": "Agències i festivals",
  "Ayuntamientos": "Ajuntaments",
  "Asociaciones e instituciones": "Associacions i institucions",
  "Con quién lo hacemos": "Amb qui ho fem",
  "Los que ponen la técnica, la logística y el músculo para que cada proyecto salga.":
    "Els qui hi posen la tècnica, la logística i el múscul perquè cada projecte surti.",
  "en total.": "en total.",
  "¿Sumamos tu marca a la lista?": "Hi sumem la teva marca?",
  "Cuéntanos qué tienes en mente y te decimos cómo lo montaríamos.":
    "Explica'ns què tens al cap i et diem com ho muntaríem.",

  // ── Contacto y CTA ──
  "Hablamos": "Parlem",
  "Cuéntanos qué tienes en la cabeza.": "Explica'ns què tens al cap.",
  "Escríbenos": "Escriu-nos",
  "Llámanos": "Truca'ns",
  "Preguntas frecuentes": "Preguntes freqüents",
  "Qué hacemos": "Què fem",
  "Qué ponemos": "Què hi posem",
  "Casos": "Casos",
  "Playlist de Bonito Sound": "Playlist de Bonito Sound",
};

/**
 * Devuelve la frase en el idioma pedido. En castellano devuelve la propia
 * frase, así que se puede envolver cualquier literal sin condicionales.
 */
export function tr(locale: Locale, es: string): string {
  if (locale === DEFAULT_LOCALE) return es;
  return CA[es] ?? es;
}
