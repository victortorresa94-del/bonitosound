# Informe para la sesión de Aura: integrar el método de diseño web

**Para:** la sesión de Claude Code que está desarrollando Aura (`aura-project-2`).
**De:** la sesión de Claude Code de Bonito Sound (`bonitosound`).
**Fecha:** septiembre de 2026.

---

## 0 · Qué te estoy pidiendo, en una frase

Que **el método que hay en la parte 2 de este documento deje de ser algo que
Víctor tiene que explicar cada vez, y pase a ser una ruta de Aura** — de modo
que cualquier IA que reciba «diseña esta web con Aura Studio» lo siga entero sin
que nadie se lo cuente.

Hoy el método existe: se usó para construir la web de Bonito Sound
(bonitosound.com) de principio a fin entre agosto y septiembre de 2026, y está
guardado en Aura Storage. Pero está guardado **de forma pasiva**: hay que saber
que existe para ir a buscarlo. La parte 3 explica cómo volverlo activo.

---

## 1 · Contexto: de dónde sale esto

La web de Bonito Sound es una agencia musical de Sabadell: booking, management,
sello (Bonito Records), distribución, producción de giras, eventos de marca,
estudio de grabación y un festival en Ámsterdam. Next 14 (App Router),
TypeScript, Tailwind, GSAP.

No se diseñó maquetando y corrigiendo en el navegador. Se diseñó **dibujando
cada bloque antes en Aura Studio**, enseñándole a Víctor varias opciones, y
maquetando solo lo que él elegía. Eso se repitió bloque a bloque: el héroe, el
muro de logos del home, la rejilla de servicios, las fichas de artista, el
footer, los retratos del equipo.

El resultado de esa repetición no es un truco suelto: es un proceso con pasos,
con trampas conocidas y con caminos ya descartados. Eso es lo que hay que meter
en Aura.

---

## 2 · EL MÉTODO (texto íntegro, autocontenido)

> Esta sección es la doctrina. Está escrita para que la lea una IA y actúe.
> Puedes copiarla tal cual: no depende de nada de este repositorio.

### La idea de fondo

**La discusión de diseño se tiene sobre una imagen, no sobre código
desplegado.** Cambiar de opinión sobre un dibujo cuesta dos minutos y céntimos.
Cambiar de opinión sobre un componente ya maquetado cuesta una tarde, un
deploy, y —esto es lo importante— **contamina la crítica**: cuando algo ya está
escrito, la conversación deja de ser «¿es esto lo mejor?» y pasa a ser «¿merece
la pena rehacerlo?». Sobre un dibujo, a nadie le duele tirarlo.

### Paso 1 · Acotar el bloque

Un bloque por vuelta. El héroe, o el muro de logos, o la rejilla de servicios,
o el footer. **Nunca la página entera**: una maqueta de página completa sale
ilegible (todo mide 40 píxeles de alto) y el modelo se inventa secciones para
rellenar el hueco.

Antes de generar nada, ten claras tres cosas y déjalas escritas:

- **Qué datos REALES van a entrar ahí.** No «unos logos»: 145 logos, de alturas
  distintas, algunos con el fondo horneado dentro del PNG. No «unos artistas»:
  los 23 que hay en el repositorio. El diseño que no aguanta el dato real no es
  un diseño, es una ilustración.
- **Dónde vive en la jerarquía de la página.** Lo que va antes y lo que va
  después: el ritmo se decide entre bloques, no dentro de uno.
- **Qué está ya decidido y no se toca.** Tipografías, paleta, tono. Si hay marca
  con espacio propio, su cerebro de marca primero y su identificador de espacio
  en todas las llamadas — sin eso se produce con la marca equivocada.

### Paso 2 · Dibujar 3-4 variantes, etiquetadas

- **Prompts CORTOS.** Un párrafo denso lo ignora. Una frase por decisión.
- **Variantes de verdad distintas.** Tres versiones del mismo layout con el
  titular más grande no son tres opciones: son una. Que se diferencien en algo
  estructural — dónde cae el peso, si hay rejilla o hay banda, si manda el texto
  o manda la imagen.
- **Etiquétalas A1, A2, A3.** Parece una tontería y es la mitad del método: con
  etiquetas el cliente contesta «A1» en una palabra y se acabó. Sin etiquetas la
  respuesta es un párrafo describiendo cuál era, y se pierde otra ronda.
- **Estima el coste antes de gastar y cántalo.** Los proveedores de generación
  cobran también los fallos.
- **El logo NO lo dibuja nunca el modelo.** Se pega desde el PNG oficial.

### Paso 3 · Que elija él

Se le enseñan las variantes y **elige él**. No elijas tú y le enseñes «la
buena»: con una sola imagen la conversación se vuelve sí/no, y un «no» no dice
hacia dónde ir. Con tres, la respuesta lleva la dirección dentro.

Y aquí va lo que más se repite en la práctica y lo que peor entienden los
modelos: **el cliente corrige mucho y corrige concreto.** «Aquí no pongas tantas
fotos, solo dos líneas.» «La letra del título, la misma que la de Records.»
«Salgo chepao.» **Eso no es ruido, ni indecisión, ni una señal de que el proceso
vaya mal: es el trabajo.** Se apunta y se aplica tal cual, sin reinterpretar y
sin negociar. Si pide dos cosas, se hacen las dos — no una y una explicación de
por qué la otra no.

### Paso 4 · Maquetar, y ahí la maqueta se queda atrás

**La maqueta es una DIRECCIÓN, no una especificación.** No se calca píxel a
píxel. De la imagen se extraen las decisiones —dónde está el peso, qué
jerarquía, qué ritmo, qué densidad— y se reconstruyen con las herramientas de
verdad: la tipografía real, el dato real, la rejilla real, y funcionando a
375 px de ancho, que es donde la maqueta nunca se probó.

**Cuando el dato real contradice a la maqueta, manda el dato real.** Si el
modelo dibujó ocho logos idénticos y perfectos y en la realidad hay 145 de
alturas distintas, el problema no es la realidad.

Antes de decir que está hecho, abrirlo en un navegador de verdad y mirar cuatro
cosas: errores de página, errores de consola, desbordes horizontales
(`scrollWidth - clientWidth`) y respuestas HTTP ≥ 400 (imágenes que no están).
**«Compila» no es «se ve bien».**

### Trampas que ya costaron una ronda cada una

- **El texto dentro de la maqueta siempre sale mal.** Siempre. Trátalo como
  lorem ipsum: sirve para ver cuánto sitio ocupa un titular, no para leerlo. El
  copy se escribe aparte.
- **Un retrato generado desde la foto de alguien sale «implantado».** Se nota
  que esa cara viene de otro sitio. Lo que sí funciona: generar primero el dibujo
  de esa persona SOLA y usar ese dibujo —no su foto— como referencia para meterla
  en el grupo. Así entra en el mismo lenguaje gráfico que el resto.
- **Pide el recorte del bloque, no un lienzo cuadrado.** Un muro de logos es muy
  apaisado; un héroe, panorámico; una ficha, casi cuadrada. Pedir siempre 1:1 es
  diseñar para una proporción que no existe en la página.
- **No dibujes lo que ya está decidido.** Si la marca tiene tipografía y paleta,
  la maqueta resuelve la ESTRUCTURA. Dejar que el modelo elija tipografía cada
  vez es reabrir una discusión cerrada.
- **No apliques el método a los arreglos.** «Baja esto», «quita ese logo»,
  «cambia el texto» → se toca el código y ya está. El método es para cuando la
  dirección todavía no existe.

### Lo que se probó y se DESCARTÓ

Esto es lo que impide que el método se vuelva a discutir dentro de tres meses:

1. **Maquetar directo e iterar en el navegador.** Es lo natural y es lo caro:
   cada vuelta son build, deploy, mirarlo y opinar. Y la crítica se contamina,
   como se explica arriba.
2. **Figma o cualquier herramienta de diseño.** Una superficie más que mantener
   y en la que nadie vive. La maqueta es **desechable**: su único trabajo es
   cerrar la dirección, y luego se tira. Guardarla en una herramienta con
   estados, versiones y comentarios es tratarla como lo que no es.
3. **Enseñar una sola maqueta, la mejor.** Convierte la elección en un examen:
   aprobado o suspenso. Y el suspenso no trae información. Tres etiquetadas
   convierten la respuesta en una coordenada.
4. **Maqueta de la página entera.** Ilegible, y con secciones inventadas.

---

## 3 · Cómo integrarlo en Aura

### 3.1 · Dónde está ya guardado (no lo dupliques)

Está en Aura Storage, en el árbol del cerebro:

| Qué | Tipo | Carpeta |
|---|---|---|
| El manual completo, con dos ficheros: `WORKFLOW.md` y `CASO-BONITO-SOUND.md` | `workflow` | `aura-studio/diseno/workflows` |
| La decisión corta, con las alternativas descartadas | `decision` | `aura-studio/diseno/decisiones` |
| El disparador: «diseña la web con Aura Studio» significa esto | `context`, `always: true` | `aura-studio/diseno/contexto` |

Identificadores exactos:

- `workflow-disenar-una-web-o-una-interfaz-primero-se-dibuja-en-studio-despu`
- `decision-el-diseno-de-web-se-dibuja-antes-en-aura-studio-no-se-maqueta-a-`
- `context-disena-la-web-con-aura-studio-significa-un-proceso-concreto-no-u`

**No crees una cuarta copia.** El fallo más probable de esta integración es
acabar con el método escrito en cuatro sitios y tres de ellos desactualizados.
Si la integración necesita el texto, que lo LEA de ahí.

### 3.2 · La integración de verdad: una ruta más del playbook

Aura ya tiene rutas por encargo. Hoy hay presentación, explorar-concepto,
influencer, voz, marca. **Falta la de interfaz**, y es exactamente el hueco por
el que se escapa este método.

Lo que hay que añadir:

- Una ruta **`deliverable: "web"`** (o `"interfaz"`, como prefieras nombrarla)
  en el playbook, que devuelva la doctrina de la parte 2 de este documento.
- Su entrada en las **instrucciones del servidor MCP**, en la línea de RUTA POR
  ENCARGO, con las frases que la disparan: *diseñar una web · una landing · una
  pantalla · rediseñar un bloque · «diseña esto con Aura Studio»*.
- La **frontera con sus vecinas**, escrita, porque sin eso nadie sabe cuál
  elegir:
  - `explorar-concepto` es para **piezas sueltas** (un banner, un post, un
    carrusel) y termina en una imagen.
  - Esta ruta es para **interfaces** y termina en código desplegado.
  - Para **arreglos pequeños** no hay ruta: se toca el código.

### 3.3 · Qué debe devolver la ruta

No un texto inspirador. Algo accionable, en este orden:

1. **Los cuatro pasos**, numerados, con lo que hay que tener decidido antes de
   pasar de uno al siguiente.
2. **Las trampas**, cada una con su causa raíz. Una lista de buenas prácticas
   sin el motivo no cambia el comportamiento de nadie.
3. **Lo descartado**, para que no se reabra.
4. **Las herramientas concretas** de Aura que se usan en cada paso, con sus
   nombres reales, y la advertencia de estimar coste antes de generar.
5. **Un recordatorio de cierre**: registrar en la bitácora lo decidido con su
   alternativa descartada.

### 3.4 · Comportamiento esperado, para poder probarlo

Con la integración hecha, una sesión limpia que reciba *«diseña la home de esta
web con Aura Studio»* debería, **sin que nadie se lo pida**:

- [ ] Reconocer que eso es un proceso y cargar la ruta antes de generar nada.
- [ ] Preguntar por el bloque concreto en vez de intentar la página entera.
- [ ] Preguntar qué datos reales van a entrar.
- [ ] Estimar y cantar el coste antes de generar.
- [ ] Producir **3-4 variantes etiquetadas A1/A2/A3**, no una.
- [ ] **No elegir por su cuenta.**
- [ ] Al maquetar, no calcar la imagen, y verificar en navegador antes de darlo
      por hecho.
- [ ] Al cerrar, dejar bitácora.

Si una sesión limpia genera una sola imagen y dice «¿te gusta?», **la
integración no está hecha**, por muy guardado que esté el documento.

### 3.5 · Lo que NO hay que hacer

- **No lo conviertas en un generador automático de webs.** El método existe
  precisamente porque hay un humano que elige en el paso 3. Una versión que
  genere, elija sola y maquete no es este método acelerado: es otra cosa, y es
  justo lo que se descartó.
- **No metas la maqueta en una biblioteca con versiones y estados.** Es
  desechable a propósito (alternativa 2 descartada).
- **No lo hagas obligatorio para todo.** Aplicarlo a un cambio de margen es la
  forma más rápida de que Víctor deje de usarlo.

---

## 4 · Material de apoyo, si quieres los ejemplos reales

En `aura-studio/diseno/workflows`, el fichero `CASO-BONITO-SOUND.md` tiene los
bloques que pasaron por el proceso, con lo que costó cada uno:

- **El muro de logos del home** («han confiado en hacerlo bonito»): el primero
  quedó mal, se rehízo con tres maquetas, eligió A1 (titular en Anton a la
  izquierda, cifras a la derecha con filetes cian, marquesina debajo). Al
  maquetar pidió quitar la negrita del enlace. La maqueta acertó la estructura y
  falló los pesos tipográficos, que es exactamente lo normal.
- **Los retratos del equipo**: el caso que enseñó la trampa del «implantado».
- **La rejilla de `/servicios`**: acabó en 3 tarjetas · banner ancho · 3
  tarjetas · banner ancho, tras varias vueltas de correcciones concretas.
- **El footer**: «que el BONITO SOUND quede cortado justo por la mitad» se
  resolvió midiendo (la altura de mayúscula es ~92 % del SVG de 9.6vw, así que
  la mitad es `-4.8vw`). Cuando la corrección es geométrica, se calcula; no se
  prueban valores a ojo.

---

## 5 · Un aviso operativo, por si te ahorra una vuelta

Al guardar todo esto pasaron dos cosas que conviene que sepas porque te van a
pasar igual:

1. **Una ficha guardada con ficheros puede quedarse sin ficheros.** El listado
   la enseñaba con título, resumen y «cuándo se usa» perfectos, y al sacarla
   entera devolvía la lista de ficheros vacía. Una portada sin contenido es peor
   que nada, porque parece hecha y nadie vuelve a mirar. **Comprueba siempre con
   una lectura completa lo que acabas de guardar.**
2. **Los campos `when` y `porque` se recortan a 700 caracteres** por el final de
   frase, y avisan. El recorte se come justo lo que está al final — que suele ser
   la frontera con la ficha vecina o la alternativa descartada, es decir, lo
   único que sirve para elegir. **Escribe primero lo que distingue.**
