# El panel de Dani

Keystatic es el panel para editar la web sin tocar código. Vive en
`bonitosound.com/keystatic`.

Por debajo **no hay base de datos**: escribe los mismos ficheros markdown de
`content/` que ya lee la web. Si algún día quitamos Keystatic, no se pierde
nada — los ficheros siguen ahí y la web sigue funcionando igual.

---

## Lo que ve Dani

Entra, se identifica una vez, y ve tres apartados: **Giras**, **Artistas** y
**Diario**. Dentro, formularios normales: titular, año, entradilla, foto, texto.
Nada de markdown, nada de llaves ni comillas.

Le da a guardar y **no se publica**. Sale una rama nueva llamada `edita/…`,
Vercel la publica en una URL de previsualización, y ahí la ve tal cual quedará.
Cuando tú la apruebas y la fusionas, entra en la web de verdad.

Eso es lo que pediste: que lo vea antes de que entre, y que no pueda tocar
`main` por su cuenta. Lo garantiza el `branchPrefix: "edita/"` de
`keystatic.config.ts`, no la buena fe de nadie.

---

## Lo que NO hace

- **No tiene IA.** No es Claude Code con formularios: es un editor de campos.
  Escribe él.
- **No cambia el diseño.** Solo el contenido de esas tres colecciones.
- **No toca los datos duros de las giras.** Los años y el nº de conciertos que
  confirmó Dani viven en `lib/giras.ts`, no en markdown, y están fuera del panel
  a propósito: son la fuente de verdad de la sección y no deben cambiarse por
  accidente al retocar un texto.

---

## Los dos modos

`keystatic.config.ts` decide el modo leyendo una variable de entorno, no una
constante escrita a mano. Así el mismo código sirve en local y en producción.

| | Cuándo | Qué hace |
|---|---|---|
| `local` | `npm run dev` en tu ordenador | Escribe en el disco directamente. Es el modo por defecto mientras no existan las variables de la GitHub App. |
| `github` | En producción | Hace commit al repositorio a través de una GitHub App, con selector de rama en la propia interfaz. |

En Vercel el disco es de **solo lectura**, así que en producción tiene que ser
`github` a la fuerza. Mientras no lo configures, `/keystatic` carga pero no
puede guardar.

---

## Encenderlo (una vez, ~10 minutos)

1. Arranca la web en tu ordenador: `npm run dev`.
2. Entra en `http://localhost:3000/keystatic`. Te saldrá el botón de conectar
   con GitHub.
3. Al pulsarlo, Keystatic te guía para **crear una GitHub App** — le pones
   nombre y le das acceso al repo `victortorresa94-del/bonitosound`.
4. Al terminar te escribe solo un fichero `.env` en la raíz del proyecto con
   cuatro variables:

   ```
   KEYSTATIC_GITHUB_CLIENT_ID=…
   KEYSTATIC_GITHUB_CLIENT_SECRET=…
   KEYSTATIC_SECRET=…
   NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=…
   ```

   ⚠️ Ese `.env` **no se sube al repo nunca**. Comprueba que está en
   `.gitignore` antes de hacer commit de nada.

5. Copia esas cuatro variables a Vercel: *Project* → *Settings* → *Environment
   Variables*. Vuelve a desplegar.
6. En los ajustes de la GitHub App, añade la URL de callback de producción
   (`https://bonitosound.com/api/keystatic/github/oauth/callback`). Si no,
   GitHub da el error de *"the redirect_uri is not associated with this
   application"* al entrar desde el dominio real.

## Dar acceso a Dani

Keystatic decide quién puede entrar **por el permiso de escritura en el repo**,
no por una lista de usuarios aparte. Así que:

1. Invita a Dani como colaborador con permiso *Write* en el repositorio.
2. Pásale el enlace `bonitosound.com/keystatic`.
3. La primera vez le pedirá autorizar la GitHub App. Una vez, y ya.

Ese sigue siendo el único momento incómodo de todo el proceso: el "conecta con
GitHub". No se puede evitar sin montar un backend propio — ahí es donde entraría
el editor del que hablamos, que va en otro repo.

---

## Añadir campos

Todo el esquema está en `keystatic.config.ts`, en castellano y comentado. Cada
campo del formulario es una línea. Si mañana hace falta que Dani pueda editar
otra cosa, se añade ahí y aparece sola en el panel.

Lo único que hay que respetar: **los nombres de los campos tienen que coincidir
con lo que lee `lib/content.ts`**. Si cambias uno aquí sin cambiarlo allí, la
web deja de encontrar ese dato.
