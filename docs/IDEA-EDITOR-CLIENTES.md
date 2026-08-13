# Un editor de webs para clientes

> Nota de contexto para trabajar esto en OTRO repo (el de Aura Studio), en otra
> sesión. Aquí no se implementa nada: esto es el porqué, el qué y las decisiones
> que ya están tomadas, para no tener que redescubrirlas.

## De dónde sale la idea

Bonito Sound es el primer caso real. Su web está hecha a medida (Next.js,
contenido en markdown dentro del repo) y el cliente —Dani, 30 años en la
industria, no técnico— tiene que poder cambiar un texto sin llamar a nadie.

La solución de hoy es **Keystatic** (ver `docs/KEYSTATIC.md`): un panel dentro
de la propia web que hace commit al repo. Funciona y desbloquea el problema.
Pero deja una arista: **Dani tiene que identificarse con GitHub**. Una vez, y
con una GitHub App que lo hace tolerable, pero sigue existiendo el momento
"conecta tu cuenta de GitHub" para alguien a quien GitHub no le dice nada.

Ese es el hueco que llena este producto.

## El objetivo

Que el cliente entre con **email y contraseña a un panel tuyo**, edite lo suyo,
lo vea, le dé a publicar, y no sepa jamás que existe un repositorio.

Y que quien tiene las llaves seas tú: el commit lo hace **tu backend con tu
credencial**, no la del cliente. Tú decides qué campos puede tocar, qué no, y
qué webs administra cada quien.

## Lo que tiene que resolver

**Para el cliente**
- Entrar sin GitHub. Email y contraseña, o un enlace mágico al correo.
- Formularios, no markdown. Campos con nombre humano y ayuda en cada uno.
- **Verlo antes de publicar.** Es la petición literal de Víctor y es lo que
  convierte el panel en algo en lo que se confía. Dos niveles:
  - *previsualización en vivo* mientras escribe, al lado del formulario;
  - *URL de previsualización real* de la web entera con su cambio dentro.
- Subir fotos arrastrando, sin pensar en rutas ni en pesos. El backend
  redimensiona y comprime (esta web ya tiene el script:
  `scripts/optimiza-imagenes.mjs`, y hubo un despliegue caído por subir fotos
  de 23 MB en bruto — el editor tiene que hacer eso solo).
- Que no pueda romper la web. Si un campo obligatorio falta, no deja guardar.

**Para ti**
- Multi-cliente y multi-web desde el mismo sitio.
- **Aprobación**: lo que el cliente publica va a una rama y te llega un aviso.
  Tú miras la previsualización y fusionas. Igual que hace Keystatic con
  `branchPrefix`, pero sin exponerle el concepto de rama.
- Definir el esquema de cada web **sin desplegar el editor**: el editor lee la
  forma del contenido de un fichero de configuración del repo del cliente.
- Historial y deshacer. Lo da git gratis; hay que enseñarlo en lenguaje humano
  ("versión del 12 de agosto, 17:40 — la cambió Dani").

## La decisión de arquitectura que ya está tomada

**El contenido sigue viviendo en el repositorio del cliente, en markdown.** No
en una base de datos del editor.

Esto no es pereza, es lo que hace el producto defendible:
- la web sigue funcionando aunque el editor se caiga o se abandone;
- el cliente nunca queda secuestrado;
- el historial y el deshacer salen gratis de git;
- y la previsualización real es trivial, porque cualquier host que despliegue
  ramas (Vercel, por ejemplo) ya te da una URL por rama sin hacer nada.

La base de datos del editor guarda **solo** lo que git no sabe: usuarios,
contraseñas, qué cliente administra qué web, y el estado de las aprobaciones.

## El esqueleto

```
Cliente → panel (email+contraseña)
            ↓
        tu backend  ── valida el esquema
                    ── comprime las imágenes
                    ── hace commit A UNA RAMA con TU credencial (una GitHub App
                       instalada en los repos que gestionas)
                    ── te avisa
            ↓
        el host despliega esa rama → URL de previsualización
            ↓
        tú apruebas → merge a main → publicado
```

Piezas mínimas: autenticación, un editor de campos generado desde un esquema,
un servicio de imágenes, un cliente de la API de GitHub, y una cola de
aprobaciones.

## Lo que NO debe hacer

- **No ser un maquetador.** El diseño se toca en el código. En cuanto el cliente
  puede mover bloques, la web se degrada sola y vuelve el problema que se venía
  a resolver.
- **No inventarse un formato propio.** Markdown con frontmatter, el mismo que ya
  lee la web.
- **No exponer conceptos de git.** Nada de "rama", "commit" ni "pull request" en
  la interfaz. Se dice "borrador", "guardar" y "enviar para revisión".

## Qué mirar de este repo cuando llegue el momento

| Qué | Dónde |
|---|---|
| Esquema real de contenido, en campos humanos | `keystatic.config.ts` |
| Cómo lo lee la web | `lib/content.ts` |
| Assets por sistema de ficheros (dejar el fichero y aparece) | `lib/assets.ts` |
| Compresión de imágenes | `scripts/optimiza-imagenes.mjs` |
| Los dos idiomas sin duplicar páginas | `middleware.ts`, `lib/copy-ca.ts` |

Ese último punto importa: esta web es bilingüe con un truco (`/ca/...` se
reescribe a la misma página y las traducciones viven en una memoria de
traducción indexada por la frase en castellano). Cualquier editor que quiera
servir a un cliente catalán tiene que entender ese modelo o forzará a duplicar
páginas.
