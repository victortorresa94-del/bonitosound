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

  // ── Páginas de servicio (contenido profundo) ──
  "Una gira son veinte noches distintas que tienen que salir igual de bien. Nosotros ponemos todo lo que hay alrededor del artista —técnica, escenario, transporte y coordinación— para que él solo tenga que subirse y tocar.":
    "Una gira són vint nits diferents que han de sortir igual de bé. Nosaltres hi posem tot el que hi ha al voltant de l'artista —tècnica, escenari, transport i coordinació— perquè ell només s'hagi de pujar a l'escenari i tocar.",
  "Sonido, backline, monitores, microfonía y la ingeniería del directo. Con equipo propio, para que suene igual de bien en cada plaza.":
    "So, backline, monitors, microfonia i l'enginyeria del directe. Amb equip propi, perquè soni igual de bé a cada plaça.",
  "Escenario y luces": "Escenari i llums",
  "Montaje de escenario, iluminación y puesta en escena. Lo mismo en un teatro que en un festival, adaptado a lo que da cada sala.":
    "Muntatge d'escenari, il·luminació i posada en escena. Tant en un teatre com en un festival, adaptat al que dona cada sala.",
  "Logística y transporte": "Logística i transport",
  "Furgonetas, tiempos, permisos y el plan B. Que el equipo y la banda estén donde tienen que estar, a la hora que tienen que estar.":
    "Furgonetes, temps, permisos i el pla B. Que l'equip i la banda siguin on han de ser, a l'hora que han de ser-hi.",
  "Un solo interlocutor de la primera llamada al desmontaje. Nadie rebotando entre cinco proveedores; una persona que responde.":
    "Un sol interlocutor de la primera trucada al desmuntatge. Ningú rebotant entre cinc proveïdors; una persona que respon.",
  "Avance con promotores y salas": "Avançament amb promotors i sales",
  "Hablamos con cada promotor antes de llegar: qué hay en la sala, qué falta, qué horarios hay. Los problemas se resuelven por teléfono, no en el load-in.":
    "Parlem amb cada promotor abans d'arribar: què hi ha a la sala, què falta, quins horaris hi ha. Els problemes es resolen per telèfon, no al load-in.",
  "Alguien de los nuestros en la carretera con la gira: cuadrar el día, resolver lo que salga y que el artista no tenga que ocuparse de nada.":
    "Algú dels nostres a la carretera amb la gira: quadrar el dia, resoldre el que surti i que l'artista no s'hagi d'ocupar de res.",
  "Cómo se lleva una gira": "Com es porta una gira",
  "Producción previa": "Producció prèvia",
  "Avance con promotores y salas plaza a plaza: qué equipo hay, qué llevamos nosotros y qué horarios maneja cada una.":
    "Avançament amb promotors i sales plaça a plaça: quin equip hi ha, què hi portem nosaltres i quins horaris manega cadascuna.",
  "Hojas de ruta": "Fulls de ruta",
  "Cada fecha documentada: tiempos, contactos, accesos, catering y transporte. Todo el mundo sabe qué pasa y cuándo.":
    "Cada data documentada: temps, contactes, accessos, càtering i transport. Tothom sap què passa i quan.",
  "Road y transporte": "Road i transport",
  "Salimos a carretera con la gira. Equipo, banda y material moviéndose según lo previsto, con quien resuelve al lado.":
    "Sortim a carretera amb la gira. Equip, banda i material movent-se segons el previst, amb qui ho resol al costat.",
  "El directo": "El directe",
  "Montaje, prueba de sonido, show y desmontaje. Y a la mañana siguiente, la plaza que toca.":
    "Muntatge, prova de so, xou i desmuntatge. I l'endemà al matí, la plaça que toca.",
  "giras llevadas": "gires portades",
  "artistas de gira": "artistes de gira",
  "años de oficio": "anys d'ofici",
  "Giras que hemos llevado": "Gires que hem portat",
  "Cerrar un bolo no es mandar un dossier y esperar. Es saber qué sala, qué fecha y qué cartel encajan, y tener a quién llamar. Eso es lo que ponemos.":
    "Tancar un bolo no és enviar un dossier i esperar. És saber quina sala, quina data i quin cartell encaixen, i tenir a qui trucar. Això és el que hi posem.",
  "Agenda real": "Agenda real",
  "Sabemos qué salas y festivales encajan con cada artista, y en qué fecha. No disparamos a todo a ver qué cae.":
    "Sabem quines sales i festivals encaixen amb cada artista, i en quina data. No disparem a tot a veure què cau.",
  "Trato directo": "Tracte directe",
  "Hablas con quien lleva al artista, no con un buzón. Treinta años de contactos en la industria detrás de cada llamada.":
    "Parles amb qui porta l'artista, no amb una bústia. Trenta anys de contactes a la indústria darrere de cada trucada.",
  "El directo montado": "El directe muntat",
  "Cerramos la fecha y montamos lo que hace falta para que salga: producción, técnica y logística.":
    "Tanquem la data i muntem el que calgui perquè surti: producció, tècnica i logística.",
  "Dentro y fuera": "Dins i fora",
  "Giras nacionales e internacionales. Tenemos artistas con base fuera de España y sabemos moverlos.":
    "Gires nacionals i internacionals. Tenim artistes amb base fora d'Espanya i els sabem moure.",
  "Cómo cerramos una fecha": "Com tanquem una data",
  "Escuchamos el proyecto": "Escoltem el projecte",
  "Dónde está el artista, qué directo tiene y hacia dónde quiere ir.":
    "On és l'artista, quin directe té i cap on vol anar.",
  "Trazamos la ruta": "Tracem la ruta",
  "Qué salas y festivales tienen sentido, en qué fechas y en qué orden.":
    "Quines sales i festivals tenen sentit, en quines dates i en quin ordre.",
  "Cerramos y negociamos": "Tanquem i negociem",
  "Llamamos, cuadramos condiciones y aseguramos la fecha.":
    "Truquem, quadrem condicions i assegurem la data.",
  "Montamos el directo": "Muntem el directe",
  "Producción, técnica y road para que el artista solo tenga que subir al escenario.":
    "Producció, tècnica i road perquè l'artista només hagi de pujar a l'escenari.",
  "Directos y giras que hemos montado": "Directes i gires que hem muntat",
  "El booking cierra fechas; el management lleva la carrera entera. Estrategia, calendario y las decisiones que importan a medio plazo — con alguien que tiene la foto completa.":
    "El booking tanca dates; el management porta la carrera sencera. Estratègia, calendari i les decisions que importen a mitjà termini — amb algú que té la foto completa.",
  "Qué llevamos": "Què portem",
  "Estrategia con criterio": "Estratègia amb criteri",
  "Qué sale, cuándo y por qué. Decidimos el siguiente paso con argumentos, no con prisas.":
    "Què surt, quan i per què. Decidim el pas següent amb arguments, no amb presses.",
  "A mano": "A mà",
  "Aquí no hay artistas de primera y de segunda: a cada artista lo lleva una persona con nombre, que coge el teléfono.":
    "Aquí no hi ha artistes de primera i de segona: cada artista el porta una persona amb nom, que despenja el telèfon.",
  "Calendario ordenado": "Calendari ordenat",
  "Lanzamientos, bolos y contenido en un mismo plan, para que no choquen entre sí.":
    "Llançaments, bolos i contingut en un mateix pla, perquè no xoquin entre ells.",
  "Todo en la misma casa": "Tot a la mateixa casa",
  "Booking, sello y distribución hablan entre sí porque están bajo el mismo techo. El artista no va rebotando.":
    "Booking, segell i distribució es parlen perquè són sota el mateix sostre. L'artista no va rebotant.",
  "Cómo entramos": "Com hi entrem",
  "Foto completa": "Foto completa",
  "Vemos dónde estás: música, directo, números y equipo.":
    "Veiem on ets: música, directe, números i equip.",
  "Plan a medio plazo": "Pla a mitjà termini",
  "Ordenamos lanzamientos, bolos y decisiones en un calendario con sentido.":
    "Ordenem llançaments, bolos i decisions en un calendari amb sentit.",
  "Ejecución": "Execució",
  "Lo movemos con el resto de la casa: sello, distribución, booking.":
    "Ho movem amb la resta de la casa: segell, distribució, booking.",
  "Revisión": "Revisió",
  "Miramos qué funciona y ajustamos. La carrera es larga; se lleva, no se improvisa.":
    "Mirem què funciona i ho ajustem. La carrera és llarga; es porta, no s'improvisa.",
  "Producimos, publicamos y empujamos la música de nuestros artistas asumiendo parte del riesgo. Pocos proyectos, en serio: del primer demo al máster listo para plataformas.":
    "Produïm, publiquem i empenyem la música dels nostres artistes assumint part del risc. Pocs projectes, de debò: de la primera maqueta al màster llest per a plataformes.",
  "Producción propia": "Producció pròpia",
  "Del primer demo al máster. El álbum MARCA DIVINA de Eva Calyza salió de aquí.":
    "De la primera maqueta al màster. L'àlbum MARCA DIVINA d'Eva Calyza va sortir d'aquí.",
  "Criterio": "Criteri",
  "Te decimos qué single sale y por qué. Con argumentos, no con corazonadas.":
    "Et diem quin single surt i per què. Amb arguments, no amb pressentiments.",
  "Empuje": "Empenta",
  "Publicar es el minuto uno. Sabemos qué hacer al día siguiente para que la canción llegue.":
    "Publicar és el minut u. Sabem què fer l'endemà perquè la cançó arribi.",
  "Un sistema, no un cajón": "Un sistema, no un calaix",
  "Sello, booking y distribución trabajan juntos. No sueltas la música y a ver qué pasa.":
    "Segell, booking i distribució treballen junts. No amolles la música i a veure què passa.",
  "Del máster a la calle": "Del màster al carrer",
  "Escuchamos": "Escoltem",
  "Nos mandas lo que tienes. Si encaja y hay ganas por las dos partes, seguimos.":
    "Ens envies el que tens. Si encaixa i hi ha ganes per les dues bandes, seguim.",
  "Producimos": "Produïm",
  "Del demo al máster, decidiendo repertorio y calendario contigo.":
    "De la maqueta al màster, decidint repertori i calendari amb tu.",
  "Publicamos": "Publiquem",
  "Sacamos con los metadatos y la estrategia en orden, no a lo loco.":
    "Traiem amb les metadades i l'estratègia en ordre, no a la babalà.",
  "Empujamos": "Empenyem",
  "Ads, playlists, directo. Movemos la canción con el resto de la casa.":
    "Ads, playlists, directe. Movem la cançó amb la resta de la casa.",
  "Escucha lo que sacamos": "Escolta el que traiem",
  "La parte menos vistosa y de las más importantes: los derechos de autor de tus canciones. Registrarlos, seguir sus usos y asegurar que cada uno genere lo que debe.":
    "La part menys vistosa i de les més importants: els drets d'autor de les teves cançons. Registrar-los, seguir-ne els usos i assegurar que cadascun generi el que ha de generar.",
  "Qué gestionamos": "Què gestionem",
  "Registro en orden": "Registre en ordre",
  "Tus obras registradas y bien documentadas, para que nada se pierda por el camino.":
    "Les teves obres registrades i ben documentades, perquè no es perdi res pel camí.",
  "Que rinda": "Que rendeixi",
  "Seguimos los usos de tu música y nos ocupamos de que cada uno genere lo que tiene que generar.":
    "Seguim els usos de la teva música i ens ocupem que cadascun generi el que ha de generar.",
  "Sincronizaciones": "Sincronitzacions",
  "Tu música en anuncios, series o eventos cuando encaja. Una vía más para que suene y rinda.":
    "La teva música en anuncis, sèries o esdeveniments quan encaixa. Una via més perquè soni i rendeixi.",
  "Seguimiento": "Seguiment",
  "No es registrar y olvidar. Vigilamos que los derechos acaben donde tienen que acabar.":
    "No és registrar i oblidar. Vigilem que els drets acabin on han d'acabar.",
  "Cómo lo llevamos": "Com ho portem",
  "Registramos": "Registrem",
  "Damos de alta tus obras y las documentamos: autoría, splits, todo en su sitio.":
    "Donem d'alta les teves obres i les documentem: autoria, splits, tot al seu lloc.",
  "Vigilamos": "Vigilem",
  "Seguimos dónde suena tu música y qué usos genera, aquí y fuera.":
    "Seguim on sona la teva música i quins usos genera, aquí i fora.",
  "Cobramos lo que toca": "Cobrem el que toca",
  "Nos aseguramos de que cada uso te llegue, sin que nada se pierda por el camino.":
    "Ens assegurem que cada ús t'arribi, sense que es perdi res pel camí.",
  "Buscamos syncs": "Busquem syncs",
  "Cuando aparece una oportunidad en anuncio, serie o evento, la gestionamos entera.":
    "Quan apareix una oportunitat en anunci, sèrie o esdeveniment, la gestionem sencera.",
  "obras donde somos editorial": "obres on som editorial",
  "Llevamos tu música a todas las plataformas con los metadatos en orden, para que se pueda escuchar, encontrar y pagar como toca. Subir la canción es el minuto uno; distribuir bien es todo lo demás.":
    "Portem la teva música a totes les plataformes amb les metadades en ordre, perquè es pugui escoltar, trobar i pagar com toca. Pujar la cançó és el minut u; distribuir bé és tota la resta.",
  "A todas partes": "A tot arreu",
  "Spotify, Apple Music, YouTube, Amazon, Deezer y las demás. Tu música donde tiene que estar.":
    "Spotify, Apple Music, YouTube, Amazon, Deezer i la resta. La teva música on ha de ser.",
  "Metadatos en orden": "Metadades en ordre",
  "Título, autoría, ISRC, créditos. Bien puestos, para que te encuentren y los derechos no acaben donde no deben.":
    "Títol, autoria, ISRC, crèdits. Ben posats, perquè et trobin i els drets no acabin on no toca.",
  "Con seguimiento": "Amb seguiment",
  "No es subir y olvidarse. Miramos cómo se mueve y cuándo tiene sentido apoyar un lanzamiento.":
    "No és pujar i oblidar-se'n. Mirem com es mou i quan té sentit donar suport a un llançament.",
  "Parte del sistema": "Part del sistema",
  "Si además estás en sello o management, la distribución trabaja con el resto. No vas por libre.":
    "Si a més ets al segell o al management, la distribució treballa amb la resta. No vas per lliure.",
  "Del archivo a las plataformas": "De l'arxiu a les plataformes",
  "Preparamos el lanzamiento": "Preparem el llançament",
  "Audio, metadatos, ISRC, créditos y portada. Todo en regla antes de subir.":
    "Àudio, metadades, ISRC, crèdits i portada. Tot en regla abans de pujar.",
  "Entregamos con margen": "Lliurem amb marge",
  "Con semanas de antelación, para dar tiempo a las plataformas y optar a listas editoriales.":
    "Amb setmanes d'antelació, per donar temps a les plataformes i optar a llistes editorials.",
  "Publicamos en todas": "Publiquem a totes",
  "Spotify, Apple Music, YouTube, Amazon, Deezer y las demás, a la vez.":
    "Spotify, Apple Music, YouTube, Amazon, Deezer i la resta, alhora.",
  "Seguimos el dato": "Seguim la dada",
  "Miramos cómo se mueve y cuándo tiene sentido apoyarlo con marketing.":
    "Mirem com es mou i quan té sentit donar-hi suport amb màrqueting.",
  "Ads, estrategia de redes y planes de lanzamiento para artistas y eventos. Venimos del sector musical: sabemos cómo se mueve un lanzamiento y cómo se llena una sala. No lo aprendemos sobre la marcha.":
    "Ads, estratègia de xarxes i plans de llançament per a artistes i esdeveniments. Venim del sector musical: sabem com es mou un llançament i com s'omple una sala. No ho aprenem sobre la marxa.",
  "Ads y paid media": "Ads i paid media",
  "Campañas en Meta, TikTok y YouTube para mover oyentes y vender entradas. Medimos escuchas nuevas y entradas vendidas.":
    "Campanyes a Meta, TikTok i YouTube per moure oients i vendre entrades. Mesurem escoltes noves i entrades venudes.",
  "Contenido y redes": "Contingut i xarxes",
  "Qué contar, cuándo y en qué formato. Calendario alineado con tus lanzamientos, no publicar por publicar.":
    "Què explicar, quan i en quin format. Calendari alineat amb els teus llançaments, no publicar per publicar.",
  "Lanzamientos": "Llançaments",
  "Plan de salida para un single, un álbum o un evento: teaser, día de estreno y sostenimiento.":
    "Pla de sortida per a un single, un àlbum o un esdeveniment: tràiler, dia d'estrena i sosteniment.",
  "Vender entradas": "Vendre entrades",
  "Igual que movemos un single, montamos campañas para llenar un directo o dar empujón a un evento.":
    "Igual que movem un single, muntem campanyes per omplir un directe o donar empenta a un esdeveniment.",
  "Cómo montamos una campaña": "Com muntem una campanya",
  "El objetivo": "L'objectiu",
  "Oyentes, entradas, territorio. Sobre lo que tengas de verdad encima de la mesa.":
    "Oients, entrades, territori. Sobre el que tinguis de debò damunt la taula.",
  "El material": "El material",
  "Vídeos, cortes verticales y artes para cada formato, listos para pautar.":
    "Vídeos, talls verticals i arts per a cada format, llestos per pautar.",
  "La campaña": "La campanya",
  "Configuramos, pauteamos y optimizamos en cada plataforma.":
    "Configurem, pautem i optimitzem a cada plataforma.",
  "El seguimiento": "El seguiment",
  "Medimos lo que mueve la aguja y ajustamos mientras corre.":
    "Mesurem el que mou l'agulla i ho ajustem mentre corre.",

  // ── Preguntas frecuentes y cierres de las páginas de servicio ──
  "¿A quién lleváis en booking?": "A qui porteu en booking?",
  "A los artistas de nuestro roster. Pocos, para poder llevarlos bien. Los ves en el roster completo.":
    "Als artistes del nostre roster. Pocs, per poder portar-los bé. Els veus al roster complet.",
  "¿Contratáis artistas de fuera de Bonito?": "Contracteu artistes de fora de Bonito?",
  "Para eventos y giras sí trabajamos con artistas de terceros. Para booking de agencia, llevamos a los nuestros.":
    "Per a esdeveniments i gires sí que treballem amb artistes de tercers. Per a booking d'agència, portem els nostres.",
  "¿Trabajáis fuera de España?": "Treballeu fora d'Espanya?",
  "Sí. Hemos movido giras nacionales e internacionales; tenemos artistas con base fuera.":
    "Sí. Hem mogut gires nacionals i internacionals; tenim artistes amb base fora.",
  "¿Qué hace exactamente una agencia de booking musical?":
    "Què fa exactament una agència de booking musical?",
  "Contrata y cierra los directos de sus artistas: busca las salas y festivales que encajan, negocia las condiciones y coordina que la fecha salga adelante. Trabaja la agenda real, no promesas.":
    "Contracta i tanca els directes dels seus artistes: busca les sales i festivals que encaixen, negocia les condicions i coordina que la data tiri endavant. Treballa l'agenda real, no promeses.",
  "¿Qué necesitáis para empezar a moveros con las fechas de un artista?":
    "Què necessiteu per començar a moure les dates d'un artista?",
  "Saber dónde está el proyecto, qué directo tiene montado y hacia dónde quiere ir. Con eso vemos qué salas y festivales tienen sentido y empezamos a llamar.":
    "Saber on és el projecte, quin directe té muntat i cap on vol anar. Amb això veiem quines sales i festivals tenen sentit i comencem a trucar.",
  "¿Cuánto se tarda en cerrar un bolo?": "Quant es triga a tancar un bolo?",
  "Depende de la sala, la fecha y la agenda del artista. Lo importante es empezar con margen: cuanto antes se mueve, más opciones hay. A última hora se trabaja con lo que quede libre.":
    "Depèn de la sala, la data i l'agenda de l'artista. L'important és començar amb marge: com abans es mou, més opcions hi ha. A última hora es treballa amb el que quedi lliure.",
  "¿En qué se diferencia del booking?": "En què es diferencia del booking?",
  "El booking cierra fechas. El management lleva la carrera entera: estrategia, lanzamientos, equipo y decisiones a medio plazo.":
    "El booking tanca dates. El management porta la carrera sencera: estratègia, llançaments, equip i decisions a mitjà termini.",
  "¿Hace falta estar en el sello?": "Cal ser al segell?",
  "No es obligatorio, pero cuando management, sello y distribución van juntos, todo encaja mejor.":
    "No és obligatori, però quan management, segell i distribució van junts, tot encaixa millor.",
  "¿Con cuántos artistas trabajáis?": "Amb quants artistes treballeu?",
  "Con pocos, a propósito. Llevar bien una carrera pide tiempo y cabeza, no un catálogo enorme.":
    "Amb pocs, a posta. Portar bé una carrera demana temps i cap, no un catàleg enorme.",
  "¿Qué hace exactamente un manager musical?": "Què fa exactament un mànager musical?",
  "Lleva la carrera del artista: define la estrategia, ordena el calendario de lanzamientos, coordina al equipo y toma —con el artista— las decisiones que importan a medio plazo. Es quien tiene la foto completa.":
    "Porta la carrera de l'artista: defineix l'estratègia, ordena el calendari de llançaments, coordina l'equip i pren —amb l'artista— les decisions que importen a mitjà termini. És qui té la foto completa.",
  "¿A partir de qué momento de mi carrera necesito management?":
    "A partir de quin moment de la meva carrera necessito management?",
  "Cuando dejas de poder con todo tú solo: cuando las decisiones, los lanzamientos y los bolos empiezan a chocar entre sí. Ahí tener a alguien que ordene el sistema te cambia el día a día.":
    "Quan deixes de poder amb tot tu sol: quan les decisions, els llançaments i els bolos comencen a xocar entre ells. Aleshores tenir algú que ordeni el sistema et canvia el dia a dia.",
  "¿Qué hace exactamente un sello independiente?": "Què fa exactament un segell independent?",
  "Produce, publica y empuja la música de sus artistas asumiendo parte del riesgo, sin depender de una multinacional. Decide repertorio, calendario y estrategia junto al artista.":
    "Produeix, publica i empeny la música dels seus artistes assumint part del risc, sense dependre d'una multinacional. Decideix repertori, calendari i estratègia amb l'artista.",
  "¿Sois un sello o una distribuidora?": "Sou un segell o una distribuïdora?",
  "Las dos cosas, separadas. El sello asume proyecto y riesgo; la distribución es un servicio para llevar tu música a plataformas. Contratas lo que necesites.":
    "Totes dues coses, separades. El segell assumeix projecte i risc; la distribució és un servei per portar la teva música a plataformes. Contractes el que necessitis.",
  "¿Trabajáis con artistas que ya tienen música publicada?":
    "Treballeu amb artistes que ja tenen música publicada?",
  "Sí. No hace falta empezar de cero: revisamos lo que tienes y decidimos juntos qué relanzar y qué construir nuevo.":
    "Sí. No cal començar de zero: revisem el que tens i decidim junts què rellançar i què construir de nou.",
  "¿Cómo se ficha por un sello independiente?": "Com es fitxa per un segell independent?",
  "Empieza por que escuchemos lo que tienes. Si el proyecto encaja y hay ganas por las dos partes, hablamos de cómo trabajarlo. No hay fórmula mágica ni casting masivo: trabajamos pocos proyectos y en serio.":
    "Comença per que escoltem el que tens. Si el projecte encaixa i hi ha ganes per les dues bandes, parlem de com treballar-lo. No hi ha fórmula màgica ni càsting massiu: treballem pocs projectes i de debò.",
  "¿Qué géneros lleváis en el sello?": "Quins gèneres porteu al segell?",
  "No nos casamos con una etiqueta: nos fijamos en que el proyecto tenga algo que contar y recorrido. Puedes ver a quién llevamos en el roster completo.":
    "No ens casem amb cap etiqueta: ens fixem que el projecte tingui alguna cosa a explicar i recorregut. Pots veure qui portem al roster complet.",
  "¿Qué es la gestión editorial?": "Què és la gestió editorial?",
  "Es ocuparse de los derechos de autor de las canciones: registrarlas, seguir sus usos y asegurar que generen lo que deben. Va aparte de la grabación.":
    "És ocupar-se dels drets d'autor de les cançons: registrar-les, seguir-ne els usos i assegurar que generin el que han de generar. Va a part de la gravació.",
  "¿Necesito estar en el sello para la editorial?": "Necessito ser al segell per a l'editorial?",
  "No. Es un servicio independiente; puedes tener editorial con nosotros aunque publiques por tu cuenta.":
    "No. És un servei independent; pots tenir editorial amb nosaltres encara que publiquis pel teu compte.",
  "¿Y las sincronizaciones?": "I les sincronitzacions?",
  "Cuando surge una oportunidad de sync que encaja con el artista, la gestionamos de principio a fin.":
    "Quan surt una oportunitat de sync que encaixa amb l'artista, la gestionem de dalt a baix.",
  "¿Qué diferencia hay entre editorial y sello?":
    "Quina diferència hi ha entre editorial i segell?",
  "El sello se ocupa de la grabación: producir, publicar y empujar tus canciones. La editorial se ocupa de la obra: los derechos de autor, su registro y que cada uso genere lo que debe. Son dos cosas distintas y puedes tener una sin la otra.":
    "El segell s'ocupa de la gravació: produir, publicar i empènyer les teves cançons. L'editorial s'ocupa de l'obra: els drets d'autor, el seu registre i que cada ús generi el que ha de generar. Són dues coses diferents i pots tenir-ne una sense l'altra.",
  "¿Necesito registrar mis canciones si ya están en Spotify?":
    "Necessito registrar les meves cançons si ja són a Spotify?",
  "Sí. Estar en plataformas no es lo mismo que tener la obra registrada y los derechos en orden. Una cosa es que tu canción suene; otra, que cada uso se documente y se cobre donde toca.":
    "Sí. Ser a plataformes no és el mateix que tenir l'obra registrada i els drets en ordre. Una cosa és que la teva cançó soni; l'altra, que cada ús es documenti i es cobri on toca.",
  "¿Distribuís a artistas de fuera del sello?": "Distribuïu artistes de fora del segell?",
  "Sí. La distribución es un servicio independiente; no hace falta estar fichado en el sello.":
    "Sí. La distribució és un servei independent; no cal estar fitxat al segell.",
  "¿A qué plataformas llegáis?": "A quines plataformes arribeu?",
  "A las principales del mundo: Spotify, Apple Music, Amazon Music, YouTube Music, Deezer, Tidal y las tiendas y redes donde se escucha música.":
    "A les principals del món: Spotify, Apple Music, Amazon Music, YouTube Music, Deezer, Tidal i les botigues i xarxes on s'escolta música.",
  "¿Cuánto cuesta distribuir mi música?": "Quant costa distribuir la meva música?",
  "Depende de lo que necesites: un lanzamiento suelto o todo tu catálogo. Lo cerramos contigo antes de subir nada, sin letra pequeña y sin sorpresas. Lo concreto lo hablamos en la primera llamada.":
    "Depèn del que necessitis: un llançament sol o tot el teu catàleg. Ho tanquem amb tu abans de pujar res, sense lletra petita i sense sorpreses. El concret ho parlem a la primera trucada.",
  "¿Me quedo con los derechos de mi música?": "Em quedo amb els drets de la meva música?",
  "Sí. Distribuir no es firmar por un sello: tu música sigue siendo tuya. Nosotros la llevamos a las plataformas y nos ocupamos de que todo esté en orden.":
    "Sí. Distribuir no és signar per un segell: la teva música continua sent teva. Nosaltres la portem a les plataformes i ens ocupem que tot estigui en ordre.",
  "¿Puedo distribuir y llevar el resto por mi cuenta?":
    "Puc distribuir i portar la resta pel meu compte?",
  "Claro. Contratas solo la distribución si es lo que necesitas.":
    "És clar. Contractes només la distribució si és el que necessites.",
  "¿Qué es la distribución digital de música?": "Què és la distribució digital de música?",
  "Es el servicio que lleva tu música a las plataformas de streaming y descarga con los metadatos en orden, para que se pueda escuchar, encontrar y pagar correctamente. Subir la canción es el minuto uno; distribuir bien es todo lo que hay alrededor.":
    "És el servei que porta la teva música a les plataformes de streaming i descàrrega amb les metadades en ordre, perquè es pugui escoltar, trobar i pagar correctament. Pujar la cançó és el minut u; distribuir bé és tot el que hi ha al voltant.",
  "¿Cuánto tarda mi música en aparecer en Spotify?":
    "Quant triga la meva música a aparèixer a Spotify?",
  "Conviene entregar el lanzamiento con margen, unas semanas antes de la fecha. Así da tiempo a que las plataformas lo procesen y a optar a listas editoriales, que casi siempre piden antelación.":
    "Convé lliurar el llançament amb marge, unes setmanes abans de la data. Així dona temps que les plataformes el processin i a optar a llistes editorials, que gairebé sempre demanen antelació.",
  "¿Por qué son importantes los metadatos?": "Per què són importants les metadades?",
  "Porque son la ficha de tu canción: título, autoría, ISRC, créditos. Si están mal, no te encuentran y los derechos pueden acabar en el sitio equivocado. Si están bien, las plataformas te entienden y te colocan donde debes estar.":
    "Perquè són la fitxa de la teva cançó: títol, autoria, ISRC, crèdits. Si estan malament, no et troben i els drets poden acabar al lloc equivocat. Si estan bé, les plataformes t'entenen i et col·loquen on has de ser.",
  "¿Hace falta ser artista del sello para contratar marketing?":
    "Cal ser artista del segell per contractar màrqueting?",
  "No. El marketing es un servicio independiente: llevamos campañas de artistas que no están fichados en Records. Lo que pedimos es tener música o evento de verdad detrás.":
    "No. El màrqueting és un servei independent: portem campanyes d'artistes que no estan fitxats a Records. El que demanem és tenir música o esdeveniment de debò al darrere.",
  "¿Cómo planteáis la inversión en ads?": "Com plantegeu la inversió en ads?",
  "Según el objetivo (oyentes, entradas, territorio) y lo que tengas encima de la mesa. Te decimos qué mueve la aguja y qué no, sobre tu lanzamiento real. Lo concreto lo hablamos.":
    "Segons l'objectiu (oients, entrades, territori) i el que tinguis damunt la taula. Et diem què mou l'agulla i què no, sobre el teu llançament real. El concret ho parlem.",
  "¿En qué se diferencia de una agencia normal?": "En què es diferencia d'una agència normal?",
  "En que venimos del sector musical. Sabemos cómo se mueve un lanzamiento y cómo se llena una sala. No aprendemos tu industria sobre la marcha.":
    "En què venim del sector musical. Sabem com es mou un llançament i com s'omple una sala. No aprenem la teva indústria sobre la marxa.",
  "¿Qué incluye una campaña de marketing musical?":
    "Què inclou una campanya de màrqueting musical?",
  "Depende del objetivo, pero suele mezclar ads (Meta, TikTok, YouTube), estrategia de contenido para redes y un plan de lanzamiento con su día de estreno y su sostenimiento. Lo montamos sobre lo que tengas de verdad encima de la mesa.":
    "Depèn de l'objectiu, però sol barrejar ads (Meta, TikTok, YouTube), estratègia de contingut per a xarxes i un pla de llançament amb el seu dia d'estrena i el seu sosteniment. Ho muntem sobre el que tinguis de debò damunt la taula.",
  "¿Podéis promocionar un concierto o solo lanzamientos?":
    "Podeu promocionar un concert o només llançaments?",
  "Las dos cosas. Igual que movemos un single o un álbum, montamos campañas para vender entradas de un directo o dar empujón a un evento.":
    "Totes dues coses. Igual que movem un single o un àlbum, muntem campanyes per vendre entrades d'un directe o donar empenta a un esdeveniment.",
  "¿Qué incluye producir una gira?": "Què inclou produir una gira?",
  "La parte que no se ve: avance con promotores y salas, hojas de ruta, técnica, backline, escenario, transporte y road management. Lo que hace falta para que el artista solo tenga que tocar.":
    "La part que no es veu: avançament amb promotors i sales, fulls de ruta, tècnica, backline, escenari, transport i road management. El que cal perquè l'artista només hagi de tocar.",
  "¿Trabajáis con el equipo del artista?": "Treballeu amb l'equip de l'artista?",
  "Sí. Si ya hay técnico de sonido, tour manager o banda, nos acoplamos. Si no lo hay, lo ponemos nosotros.":
    "Sí. Si ja hi ha tècnic de so, tour manager o banda, ens hi acoblem. Si no n'hi ha, l'hi posem nosaltres.",
  "¿Hace falta tener toda la gira cerrada?": "Cal tenir tota la gira tancada?",
  "No. Podemos entrar con las fechas ya cerradas o antes, ayudando a ordenar la ruta para que la gira se sostenga.":
    "No. Podem entrar-hi amb les dates ja tancades o abans, ajudant a ordenar la ruta perquè la gira se sostingui.",
  "¿Solo giras grandes?": "Només gires grans?",
  "No. Hemos llevado giras de más de cuarenta fechas y también rutas de ocho. Lo que cambia es el tamaño del equipo, no cómo se trabaja.":
    "No. Hem portat gires de més de quaranta dates i també rutes de vuit. El que canvia és la mida de l'equip, no com es treballa.",
  "¿Trabajáis en toda España?": "Treballeu a tot Espanya?",
  "Sí. Tenemos base en Sabadell (Barcelona) y movemos giras por todo el país; también hemos trabajado fuera.":
    "Sí. Tenim base a Sabadell (Barcelona) i movem gires per tot el país; també hem treballat fora.",
  "¿Esto es lo mismo que producir mi disco?": "Això és el mateix que produir el meu disc?",
  "No. Aquí hablamos de producción de gira: el directo. La producción musical de estudio va por otro lado, en records.":
    "No. Aquí parlem de producció de gira: el directe. La producció musical d'estudi va per una altra banda, a records.",
  "¿Quieres una fecha?": "Vols una data?",
  "Cuéntanos qué buscas y para cuándo. Te decimos qué encaja de verdad.":
    "Explica'ns què busques i per a quan. Et diem què encaixa de debò.",
  "¿Hablamos de tu carrera?": "Parlem de la teva carrera?",
  "Cuéntanos dónde estás y a dónde quieres llegar. Te decimos cómo lo haríamos.":
    "Explica'ns on ets i on vols arribar. Et diem com ho faríem.",
  "¿Tienes música?": "Tens música?",
  "Mándanosla. Si encaja, te decimos cómo la sacaríamos.":
    "Envia-nos-la. Si encaixa, et diem com la trauríem.",
  "¿Tu música rinde lo que debería?": "La teva música rendeix el que hauria?",
  "Cuéntanos qué tienes publicado y le echamos un ojo.":
    "Explica'ns què tens publicat i hi fem un cop d'ull.",
  "¿Listo para publicar?": "A punt per publicar?",
  "Cuéntanos qué vas a sacar y te decimos cómo lo distribuiríamos.":
    "Explica'ns què trauràs i et diem com ho distribuiríem.",
  "¿Tienes algo que sacar?": "Tens alguna cosa per treure?",
  "Cuéntanos qué lanzas y cuándo. Te decimos qué se puede hacer de verdad y por dónde empezar.":
    "Explica'ns què llances i quan. Et diem què es pot fer de debò i per on començar.",
  "Agenda con nombre": "Agenda amb nom",
  "Sabemos qué salas, qué festivales y qué fechas encajan con cada artista. No mandamos un dossier y a ver qué pasa.":
    "Sabem quines sales, quins festivals i quines dates encaixen amb cada artista. No enviem un dossier i a veure què passa.",
  "Un solo interlocutor": "Un sol interlocutor",
  "Booking, sello y distribución hablan entre sí porque están en la misma casa. El artista no va rebotando.":
    "Booking, segell i distribució es parlen perquè són a la mateixa casa. L'artista no va rebotant.",
  "Del primer demo al máster listo para plataformas. El álbum MARCA DIVINA de Eva Calyza salió de aquí.":
    "De la primera maqueta al màster llest per a plataformes. L'àlbum MARCA DIVINA d'Eva Calyza va sortir d'aquí.",
  "Sello, booking y distribución trabajan juntos. Publicamos y sabemos qué hacer al día siguiente.":
    "Segell, booking i distribució treballen junts. Publiquem i sabem què fer l'endemà.",

  // ── Índice de servicios ──
  "Servicios": "Serveis",
  "Servicios — todo lo que tu música necesita, en un sitio":
    "Serveis — tot el que la teva música necessita, en un lloc",
  "Booking, management, producción, editorial, distribución, marketing y sello propio. Lo que la mayoría te hace montar con cinco proveedores, en Bonito Sound está en uno.":
    "Booking, management, producció, editorial, distribució, màrqueting i segell propi. El que la majoria et fa muntar amb cinc proveïdors, a Bonito Sound és en un de sol.",
  "Lo que la mayoría te hace montar con cinco proveedores,":
    "El que la majoria et fa muntar amb cinc proveïdors,",
  "aquí está en uno.": "aquí és en un de sol.",
  "En Bonito Sound reunimos todo lo que tu proyecto necesita para crecer, sonar mejor y llegar más lejos. Menos complicaciones, más música.":
    "A Bonito Sound reunim tot el que el teu projecte necessita per créixer, sonar millor i arribar més lluny. Menys complicacions, més música.",
  "Conectamos tu música con el público adecuado. Giras, festivales y conciertos a medida para que tu directo llegue más lejos.":
    "Connectem la teva música amb el públic adequat. Gires, festivals i concerts a mida perquè el teu directe arribi més lluny.",
  "Acompañamos tu carrera con visión, estrategia y experiencia para que tomes las mejores decisiones en cada etapa.":
    "Acompanyem la teva carrera amb visió, estratègia i experiència perquè prenguis les millors decisions a cada etapa.",
  "Producción": "Producció",
  "Damos forma a tu sonido. Producción musical, grabación, mezcla y mastering con criterio y sin prisas.":
    "Donem forma al teu so. Producció musical, gravació, mescla i masterització amb criteri i sense presses.",
  "Publicamos y administramos tus derechos para que tus canciones generen ingresos y lleguen a todas partes.":
    "Publiquem i administrem els teus drets perquè les teves cançons generin ingressos i arribin a tot arreu.",
  "Tu música en todas las plataformas. Distribución digital global, gestión de derechos y cuentas claras.":
    "La teva música a totes les plataformes. Distribució digital global, gestió de drets i comptes clars.",
  "Marketing": "Màrqueting",
  "Campañas para dar a conocer tu proyecto, conectar con tu audiencia y que el lanzamiento no pase desapercibido.":
    "Campanyes per donar a conèixer el teu projecte, connectar amb la teva audiència i que el llançament no passi desapercebut.",
  "Sello discográfico propio para desarrollar y lanzar proyectos con identidad, libertad creativa y una red que impulsa tu música.":
    "Segell discogràfic propi per desenvolupar i llançar projectes amb identitat, llibertat creativa i una xarxa que impulsa la teva música.",

  // ── Records ──
  "Records — Sello, editorial y distribución | Bonito Sound":
    "Records — Segell, editorial i distribució | Bonito Sound",
  "La división de música grabada de Bonito Sound: sello discográfico, editorial y distribución digital. Producimos, publicamos, registramos y llevamos tu música a donde se escucha. Más de 150 lanzamientos desde 2022.":
    "La divisió de música gravada de Bonito Sound: segell discogràfic, editorial i distribució digital. Produïm, publiquem, registrem i portem la teva música on s'escolta. Més de 150 llançaments des del 2022.",
  "Tu música grabada, ": "La teva música gravada, ",
  "de principio a fin.": "de principi a fi.",
  "La división de música grabada de Bonito: sello, editorial y distribución. Producimos, publicamos, registramos los derechos y llevamos tu música a donde se escucha. Todo bajo el mismo techo.":
    "La divisió de música gravada de Bonito: segell, editorial i distribució. Produïm, publiquem, registrem els drets i portem la teva música on s'escolta. Tot sota el mateix sostre.",
  "Tres patas, un sistema": "Tres potes, un sistema",
  "Lo que le pasa a tu música, ordenado.": "El que li passa a la teva música, ordenat.",
  "Producimos, publicamos y empujamos tu música. Pocos proyectos y en serio: del primer demo al máster listo para plataformas.":
    "Produïm, publiquem i empenyem la teva música. Pocs projectes i de debò: de la primera maqueta al màster llest per a plataformes.",
  "El sello": "El segell",
  "Registramos tus obras y seguimos sus usos para que cada vez que suena tu música, rinda lo que tiene que rendir.":
    "Registrem les teves obres i en seguim els usos perquè cada vegada que sona la teva música rendeixi el que ha de rendir.",
  "La editorial": "L'editorial",
  "Llevamos tu música a Spotify, Apple Music, YouTube y las demás, con los metadatos en orden y gente del sector detrás.":
    "Portem la teva música a Spotify, Apple Music, YouTube i la resta, amb les metadades en ordre i gent del sector al darrere.",
  "La distribución": "La distribució",
  "Publicar es el minuto uno. Hacerlo bien —máster, metadatos, derechos y un plan para el día después— es todo lo demás. Eso es Records.":
    "Publicar és el minut u. Fer-ho bé —màster, metadades, drets i un pla per a l'endemà— és tota la resta. Això és Records.",
  "Roster": "Roster",
  "Artistas que llevamos.": "Artistes que portem.",
  "Roster completo →": "Roster complet →",
  "¿Qué es exactamente Records?": "Què és exactament Records?",
  "Es la división de música grabada de Bonito Sound: sello, editorial y distribución. Todo lo que le pasa a tu música desde que existe la grabación hasta que suena y se cobra en las plataformas. El booking y el management van aparte.":
    "És la divisió de música gravada de Bonito Sound: segell, editorial i distribució. Tot el que li passa a la teva música des que existeix la gravació fins que sona i es cobra a les plataformes. El booking i el management van a part.",
  "Sello vs distribución vs editorial: ¿qué hace cada uno?":
    "Segell, distribució i editorial: què fa cadascun?",
  "El sello produce y publica tu música y asume parte del riesgo. La distribución la lleva a las plataformas con los metadatos en orden. La editorial gestiona los derechos de autor de las canciones. Puedes contratar una, dos o las tres.":
    "El segell produeix i publica la teva música i n'assumeix part del risc. La distribució la porta a les plataformes amb les metadades en ordre. L'editorial gestiona els drets d'autor de les cançons. En pots contractar una, dues o totes tres.",
  "¿Hace falta fichar por el sello para distribuir o llevar la editorial?":
    "Cal fitxar pel segell per distribuir o portar l'editorial?",
  "No. La distribución y la editorial son servicios independientes: puedes usarlos aunque publiques por tu cuenta. Cada pata se contrata y se justifica por separado.":
    "No. La distribució i l'editorial són serveis independents: els pots fer servir encara que publiquis pel teu compte. Cada pota es contracta i es justifica per separat.",
  "¿Cómo se ficha por el sello?": "Com es fitxa pel segell?",
  "Escribiéndonos. Escuchamos lo que tienes, te decimos con honestidad si hay encaje y, si lo hay, montamos un plan concreto. No fichamos por volumen.":
    "Escrivint-nos. Escoltem el que tens, et diem amb honestedat si hi ha encaix i, si n'hi ha, muntem un pla concret. No fitxem per volum.",
  "Mándanosla. Escuchamos lo que tienes y te decimos, sin humo, cómo la sacaríamos.":
    "Envia-nos-la. Escoltem el que tens i et diem, sense fum, com la trauríem.",
};

/**
 * Devuelve la frase en el idioma pedido. En castellano devuelve la propia
 * frase, así que se puede envolver cualquier literal sin condicionales.
 */
export function tr(locale: Locale, es: string): string {
  if (locale === DEFAULT_LOCALE) return es;
  return CA[es] ?? es;
}
