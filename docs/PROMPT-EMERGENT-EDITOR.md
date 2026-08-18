# Prompt para Emergent — el editor de webs para clientes

> Pegar tal cual. Está escrito con el contexto real del primer cliente
> (Bonito Sound) y con los errores que ya nos costaron caro, para que el
> generador no los repita.

---

## QUÉ QUIERO CONSTRUIR

Un **editor de contenido web para clientes de agencia**. No es un creador de
webs tipo Wix ni un maquetador: las webs las diseño y programo yo. Esto es el
panel donde **mis clientes, que no son técnicos, editan el contenido de la web
que yo les he hecho**, lo ven antes de publicar, y le dan a publicar.

Yo soy una agencia de una persona. Tengo varios clientes, cada uno con su web
hecha a medida en Next.js, con el contenido en ficheros markdown dentro de un
repositorio de GitHub. Hoy, para cambiar un texto, el cliente me tiene que
escribir a mí. Eso no escala y a ellos les frustra.

## EL PROBLEMA CONCRETO, CON NOMBRE Y APELLIDOS

Mi primer cliente es **Bonito Sound**, una agencia de música en Barcelona. Quien
edita es **Dani**: 60 años, 30 de oficio en la industria musical, no técnico.
Sabe usar WhatsApp y el correo. Todo lo demás le da pereza.

Dani tiene que poder:
- cambiar el texto de la ficha de un artista,
- subir una foto nueva,
- crear la página de una gira,
- ver cómo queda **antes** de que lo vea nadie,
- y darle a publicar.

Sin ver nunca la palabra "repositorio", "rama", "commit" ni "pull request".

Ya probé **Keystatic** (un CMS git-based). Funciona, pero tiene una arista que lo
mata: **obliga al cliente a identificarse con GitHub**. Para Dani eso es un muro.

## LA DECISIÓN DE ARQUITECTURA QUE YA ESTÁ TOMADA — NO LA CAMBIES

**El contenido sigue viviendo en el repositorio de GitHub del cliente, como
ficheros markdown. NO en una base de datos del editor.**

No es pereza, es lo que hace el producto defendible:
- la web sigue funcionando aunque el editor se caiga o yo lo abandone;
- el cliente nunca queda secuestrado por mi herramienta;
- el historial y el "deshacer" salen gratis de git;
- la previsualización real es trivial: cualquier host que despliegue ramas
  (Vercel, Netlify) da una URL por rama sin hacer nada.

La base de datos del editor guarda **solo** lo que git no sabe: usuarios,
contraseñas, qué cliente administra qué web, y el estado de las aprobaciones.

**Y el commit lo hace MI backend con MI credencial** (una GitHub App instalada en
los repos que gestiono), nunca la del cliente. Ese es el truco que elimina el
muro de Keystatic: el cliente entra con email y contraseña a un panel mío.

## CÓMO FUNCIONA, DE PRINCIPIO A FIN

```
Cliente entra al panel (email + contraseña)
        ↓
Elige su web → ve secciones: "Artistas", "Giras", "Diario"
        ↓
Abre una ficha → formulario normal (título, foto, texto, fechas)
        ↓
Guarda  →  MI BACKEND:
             · valida contra el esquema
             · comprime las imágenes
             · hace commit A UNA RAMA con mi GitHub App
             · me avisa
        ↓
El host despliega esa rama → URL de previsualización
        ↓
El cliente ve su cambio en la web real, en su móvil
        ↓
Yo apruebo → merge a main → publicado
```

El cliente ve dos botones: **"Guardar borrador"** y **"Enviar para revisión"**.
Nunca "crear rama" ni "hacer merge".

## EL ESQUEMA LO DEFINE EL REPO DEL CLIENTE

Cada web lleva en su raíz un fichero `editor.config.json` que describe qué puede
editar el cliente. El editor lo lee y **genera los formularios solos**. Dar de
alta una web nueva = añadir ese fichero a su repo y registrarla en el panel.
Sin desplegar el editor.

Ejemplo real, el de Bonito Sound:

```json
{
  "nombre": "Bonito Sound",
  "repo": "victortorresa94-del/bonitosound",
  "ramaBase": "main",
  "prefijoRamas": "edita/",
  "imagenes": { "carpeta": "public/img", "ladoMaximoPx": 2000, "calidad": 80 },
  "colecciones": [
    {
      "id": "artistas",
      "etiqueta": "Artistas",
      "ruta": "content/artistas/*.md",
      "campos": [
        { "id": "name",   "tipo": "texto",     "etiqueta": "Nombre", "obligatorio": true },
        { "id": "genre",  "tipo": "texto",     "etiqueta": "Género",
          "ayuda": "Ej.: «Indie pop / Raíz flamenca»" },
        { "id": "image",  "tipo": "imagen",    "etiqueta": "Foto",
          "destino": "public/img/artistas" },
        { "id": "milestones", "tipo": "lista", "etiqueta": "Hitos",
          "campos": [
            { "id": "year", "tipo": "texto", "etiqueta": "Año" },
            { "id": "text", "tipo": "texto", "etiqueta": "Qué pasó" }
          ]
        },
        { "id": "__cuerpo", "tipo": "texto-largo", "etiqueta": "Biografía" }
      ]
    }
  ]
}
```

Tipos de campo mínimos: `texto`, `texto-largo`, `numero`, `fecha`,
`seleccion`, `imagen`, `lista` (repetible, con campos anidados), `booleano`.

## PANTALLAS

**Del cliente**
1. **Entrar** — email + contraseña, y "he olvidado la contraseña". Nada más.
2. **Mis webs** — si solo tiene una, entra directo.
3. **Secciones** — las colecciones del config, con su icono y cuántas entradas.
4. **Listado** — buscador, y una insignia por entrada: *Publicado* · *Borrador* ·
   *En revisión*.
5. **Editor** — formulario a la izquierda, **previsualización en vivo a la
   derecha**. En móvil, pestañas.
6. **Enviado** — "Se lo hemos mandado a Víctor" + el enlace de previsualización
   para compartir.

**Mías (agencia)**
7. **Bandeja de aprobaciones** — qué cambió, quién, el diff en lenguaje humano
   ("cambió la biografía de Dulze y subió una foto"), enlace de previsualización,
   y dos botones: **Publicar** / **Devolver con un comentario**.
8. **Webs y usuarios** — dar de alta una web, invitar a un cliente, decidir qué
   colecciones ve.

## LO QUE NO DEBE HACER — Y ESTO ES IMPORTANTE

- **NO es un maquetador.** El cliente no mueve bloques ni cambia colores,
  tipografías ni layout. El diseño se toca en el código. En cuanto puede
  maquetar, la web se degrada sola y vuelve el problema que veníamos a resolver.
- **NO inventa un formato propio.** Markdown con frontmatter, el mismo que ya
  lee la web.
- **NO enseña conceptos de git.** Ni "rama", ni "commit", ni "PR". Se dice
  "borrador", "guardar" y "enviar para revisión".
- **NO deja publicar directo a producción** salvo que yo se lo active a un
  cliente concreto.

## COSAS QUE APRENDÍ A GOLPES — IMPLEMÉNTALAS DESDE EL PRINCIPIO

1. **Comprimir imágenes SIEMPRE, en el servidor, antes del commit.** Un cliente
   subió fotos de cámara de 23 MB y tumbó el despliegue. Redimensiona a 2000 px
   de lado largo y recomprime a ~80 de calidad. El cliente no debe saber que
   esto pasa.
2. **Validar contra el esquema antes de guardar.** Si falta un campo obligatorio
   o una fecha viene mal, el sitio entero deja de compilar. El editor tiene que
   ser la última barrera.
3. **No dejar tocar los datos duros.** Hay ficheros de configuración (números de
   conciertos, listas de clientes) que son la fuente de verdad y no deben
   cambiarse por accidente al retocar un texto. Solo se edita lo que declara el
   config.
4. **Los sitios bilingües.** La web de Bonito Sound sirve castellano y catalán
   con un fichero `<slug>.ca.md` que se superpone al original, más una memoria de
   traducción indexada por la frase en castellano. El editor tiene que entender
   ese modelo: al editar una ficha, poder ver y editar **las dos versiones lado a
   lado**, sin obligar a duplicar páginas.
5. **Conflictos.** Si yo he tocado el fichero por mi lado mientras el cliente
   editaba, no machaques: avisa en cristiano ("Víctor ha cambiado esta ficha
   mientras la editabas") y ofrece ver las dos versiones.
6. **Historial legible.** Git ya lo guarda; enséñalo como "versión del 12 de
   agosto, 17:40 — la cambió Dani", con botón de restaurar.

## STACK

- **Next.js 15 (App Router) + TypeScript + Tailwind.** Es lo que ya uso y lo que
  usan las webs de mis clientes.
- **Supabase** (Postgres + Auth) para usuarios, permisos y aprobaciones.
- **GitHub App** para leer y escribir en los repos de clientes. Token de
  instalación en servidor, nunca en el navegador.
- **sharp** para las imágenes.
- **gray-matter** para el frontmatter.
- Despliegue en Vercel.

## MVP — CONSTRUYE ESTO PRIMERO, EN ESTE ORDEN

1. Autenticación por email y contraseña, con invitación.
2. Registrar una web: repo + `editor.config.json` + instalar la GitHub App.
3. Leer una colección del repo y listar sus entradas.
4. Formulario generado desde el esquema, con los tipos básicos
   (`texto`, `texto-largo`, `imagen`, `lista`).
5. Guardar → commit a rama `edita/<fecha>-<usuario>` → devolver la URL de
   previsualización de Vercel.
6. Bandeja de aprobaciones para mí, con merge desde el panel.
7. Subida de imagen con compresión automática.

**Para la v2:** previsualización en vivo mientras se escribe, edición bilingüe
lado a lado, historial con restaurar, comentarios en las revisiones.

## CÓMO SÉ QUE ESTÁ BIEN HECHO

Dani entra desde su móvil, cambia la biografía de un artista, sube una foto de
5 MB, le da a enviar, abre el enlace que le sale, ve su cambio en la web real, y
en ningún momento ha visto la palabra GitHub. Yo recibo un aviso, miro la
previsualización, y publico con un botón.

## TONO DE LA INTERFAZ

Español de España, tuteando, directo y sin jerga. Cada campo con una ayuda de
una línea que diga qué es y dónde sale. Los errores en cristiano: no
"validation failed" sino "Falta el nombre del artista".
