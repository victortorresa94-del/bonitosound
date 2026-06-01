# System prompts de referencia para diseñar mejor

Estos son los **system prompts internos** que empresas como Anthropic y Google le dan a sus asistentes cuando trabajan en producción. Son las recetas exactas que usan productos como Claude Design, Claude Code, AI Studio Build, Cursor, etc., para generar UIs y experiencias profesionales.

**Por qué los tenemos aquí**: para que cualquier Claude (o LLM) que retome el proyecto pueda **adjuntarlos como contexto adicional** al pedir nuevas iteraciones de diseño. Robar la receta, vamos.

Fuente: [github.com/asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) (snapshot del 24 may 2026).

---

## Cuál usar y cuándo

### 🎨 `anthropic-claude-design.md` — el más importante para nosotros

Prompt completo (2001 líneas) que Anthropic usa para su producto **Claude Design**. Cubre:
- Workflow de diseño desde brief → artifacts.
- Cómo estructurar HTML para piezas editoriales, landings, slides, prototipos.
- Reglas tipográficas, paleta, spacing.
- Cómo evitar tropes de "web design genérico".
- Patrones para animaciones, interactividad, microcopy.

**Cuándo lo cargas**: cuando le pidas a la sesión nueva "rediseña /eventos/marcas con más personalidad" o "haz que esta página se sienta nivel Awwwards". Pega su contenido como contexto.

### 🤖 `anthropic-claude-code.md`

Prompt completo (2072 líneas) de **Claude Code** — el asistente de programación de Anthropic. Cómo razona sobre estructura de proyecto, qué patrones de Next.js/React prefiere, cómo decide entre soluciones, cómo escribe commits.

**Cuándo**: cuando vayas a hacer features de código complejas. Te ayuda a darle al LLM patrones de razonamiento sobre arquitectura.

### 🧪 `anthropic-claude-in-chrome.md`

El system prompt de la extensión **Claude in Chrome** — el equivalente exacto de Cowork for Chrome que usamos para scrapear bonitosound.com.

**Cuándo**: si quieres entender cómo razona Cowork al automatizar tu navegador, o si vas a darle tareas más complejas con esa extensión.

### 📊 `anthropic-visualize.md`

Prompt (772 líneas) que Claude usa cuando se le pide **visualizar datos** o crear gráficos. Útil si en algún momento metes un dashboard en la web o quieres charts en `/lab`.

### 🛠 `cursor.md`

System prompt de **Cursor**, el IDE con IA. Patrones de cómo razona sobre edición de código en proyectos grandes.

### 🌐 `google-ai-studio-build.md`

Prompt de **Google AI Studio Build** — el equivalente de v0 / Lovable de Google. Cómo construye landings a partir de prompts naturales.

**Cuándo**: si quieres comparar enfoques entre Anthropic (Claude Design) y Google (Build) al pedir lo mismo.

---

## Cómo usarlos en una sesión nueva

### Opción A — Adjuntarlos como contexto al prompt

Al lanzar una sesión nueva de Claude Code on the web, en el primer mensaje pega algo como:

```
Lee primero /CONTEXT.md y luego /references/prompts/anthropic-claude-design.md
como contexto de estilo. Cuando me hagas cambios de diseño en este proyecto,
aplica las reglas de ese system prompt como si fuesen las tuyas: workflow,
tipografía, anti-patterns, manera de razonar sobre composición.

Ahora rediseña /eventos/marcas para que se sienta nivel Awwwards.
```

### Opción B — Para tareas concretas

Si solo necesitas un fragmento (ej. "cómo Claude Design razona sobre tipografía"), abre el archivo, busca esa sección, copia el bloque y pégalo en tu prompt:

```
Aplica este principio de diseño de Anthropic cuando rediseñes el hero:
[pega el bloque concreto]

Ahora rediseña el hero de /records.
```

---

## Aviso

- Estos prompts son **referencia interna**. No los publicamos como código del sitio.
- Están en `references/` (fuera de `/public`) → no se sirven en internet.
- Excluidos de `tsconfig` y de cualquier procesamiento de Next.
- Son de Anthropic / Google / Cursor: úsalos para inspirar tus prompts, no copies sus capacidades 1:1 si vas a publicar algo de Bonito.
