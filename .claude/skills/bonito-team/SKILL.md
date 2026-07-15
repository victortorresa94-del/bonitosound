---
name: bonito-team
description: El "equipo de diseño" de Bonito Sound — un panel de 11 perspectivas para revisar y elevar cualquier página o pantalla a nivel top (UI/UX). Úsala antes de diseñar/rediseñar una página importante (eventos, artistas, landings, home). Convoca las 11 voces, cada una critica desde su lente, se converge en una dirección y se implementa CON CONTENCIÓN (ver web-motion). Combínala con web-ui-craft, web-motion y bonito-voz.
---

# Bonito Team — el panel de diseño

Cuando toca elevar una página a nivel "de puta madre", no se diseña a ojo: se
pasa por estas **11 lentes**. Cada una hace preguntas incómodas. La página no
está terminada hasta que las 11 dan el visto bueno. Al final se **converge** y
se implementa con **gracia pero contención** (una animación con trabajo, no un
circo — ver `web-motion`).

## Las 11 voces (y qué pregunta cada una)

1. **El ganador de Awwwards** — *¿Esto es memorable o es una plantilla más?*
   Busca UN momento wow: un hero cinematográfico, una tipografía enorme y
   editorial, un scroll con intención. Si no hay un momento que se recuerde,
   falta ambición.

2. **Front-end top mundial** — *¿Esto va fino y es factible?*
   60fps, solo transform/opacity, vídeo con poster y lazy, reveals con
   ScrollTrigger, nada que salte (CLS). Si una animación cuesta batería sin
   aportar, fuera.

3. **Backend top mundial** — *¿Esto escala a 20, a 100?*
   El contenido sale de un esquema (markdown/frontmatter), no hardcodeado.
   Añadir una entrada = un fichero + un asset, sin tocar código. Cada sección
   se pinta sola si hay datos y desaparece si no.

4. **El crack del marketing musical** — *¿Esto vende o solo se ve bonito?*
   La música tiene que SONAR (Spotify/YouTube arriba, no enterrado). El gancho
   emocional primero. Un CTA claro por pantalla. La prueba (nombres, marcas,
   directos) por delante.

5. **Victor (marketing artístico & IA)** — *¿Esto es coherente con la marca y
   aprovecha lo que ya tenemos?* Reutiliza los assets de Bonito: los clips de
   la mascota (furgoneta, ticket, cassette, cocktail…), el crema, el cyan.
   Nada genérico que no huela a Bonito.

6. **Dani (CEO, 30 años de oficio)** — *¿Esto genera confianza y llamadas?*
   Cara y nombre reales, teléfono visible, "cogemos el teléfono". Sin humo.
   El negocio por delante del efecto.

7. **Marketing de Bonito (voz interna)** — *¿Suena a Bonito?* Directo, cercano,
   sin postureo ni pasta (ver `bonito-voz`). El copy remata, no rellena.

8. **La visión del cliente final** — dos personas entran:
   - *La marca* que busca quién le monte un evento: necesita ver **casos reales
     con vídeo**, qué se entregó y el resultado, en 5 segundos.
   - *El artista* que busca representación/booking: necesita ver **a otros
     artistas bien llevados**, cómo suenan, y un contacto directo sin
     formularios fríos.
   Pregunta siempre: *¿esta página responde a lo que ESA persona vino a buscar?*

9. **La máquina de UI/UX web** — *¿Se entiende y se navega solo?*
   Jerarquía clara (una cosa manda), espaciado generoso, un CTA primario,
   estado activo, breadcrumb/retorno, "relacionados" al final para que no sea
   un callejón sin salida. Accesible (contraste, foco, reduced-motion).

10. **El desenfadado / el loco alegre** — *¿Dónde está la gracia?*
    UN detalle con personalidad: la mascota asomando, un microcopy con humor
    seco, un hover que sorprende, el motivo cassette/vinilo tirando de marca.
    Sin pasarse: la gracia es un guiño, no la fiesta entera.

11. **El copywriter musical** — *¿Este titular se pasa de listo?*
    Caza el copy "too much": el chiste forzado, el doble negativo cínico
    ("gente del sector cansada del sector"), hablar de dinero ("aquí está la
    pasta"), la frase que quiere ser ingeniosa y solo es rara. Regla: la
    frase más corta que dice la verdad gana. Si suena a eslogan de cuñado,
    fuera. Trabaja pegado a `bonito-voz` (mismo tono, este afina el filo).

## Proceso (cómo se usa)

1. **Convoca**: para la página objetivo, pasa por las 11 lentes y anota qué
   falla en cada una (rápido, una línea por voz).
2. **Converge**: junta lo repetido en una **dirección de diseño** concreta
   (estructura de secciones + el momento wow + los assets de Bonito que se usan
   + los 1-2 toques de gracia).
3. **Implementa con contención**: aplica `web-ui-craft` (tokens, jerarquía) y
   `web-motion` (un protagonista de movimiento por pantalla, sutil, 60fps,
   reduced-motion). Copy con `bonito-voz`.
4. **Revisa**: la página no sale hasta que las 11 voces darían el ok.

## Regla de oro
Nivel top ≠ más movimiento. Nivel top = **una idea fuerte, ejecutada con
oficio y un guiño de gracia**, que carga rápido y se navega sola.
