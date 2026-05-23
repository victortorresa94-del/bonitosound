# Comentario para PR #1 — Resumen del trabajo de assets

Copia y pega esto como nuevo comentario en https://github.com/victortorresa94-del/bonitosound/pull/1

---

Resumen del aterrizaje de assets reales (Bonito Sound):

**📸 Imágenes subidas (`public/img/`)**
- `marca/`: 2 logos (logo Bonito blanco SVG + logo color SVG)
- `artistas/`: 10 fotos en alta resolución — Paule, Sa Pena, Nàtura, Dulze, Eva Calyza, Pablo Rojo, D Nácar, AlexDeLion, Marco la Testa, Hebe
- `equipo/`: 4 retratos — Dani Boada, Manu Rojo, Xavi Julià, Cristina Soler
- `marcas/`: 13 logos clientes — Ballantine's, Sweet Bird, Font Vella, Global Talent Services, Four Roses, Schweppes, La Sucursal, Concert Studio, Gestmusic, Universal (todos desde bonitosound.com), + Pernod Ricard, PepsiCo, Absolut (desde Wikimedia Commons)
- `instituciones/`: 9 logos — UFI, SGAE, AGEDI, ARTE, AEDEM, European Music Council, Plan Recuperación, Institut Llull, Unión Europea

**🔗 Instagram en `content/artistas/*.md`**

Frontmatter actualizado con `instagram:` para los 6 que pude confirmar:
- `paule.md` → @paulemusica
- `sa-pena.md` → @sa_pena_
- `natura.md` → @dj.natura
- `dulze.md` → @duuuulze
- `eva-calyza.md` → @evacalyza
- `kenai-white.md` → @kenaiwhite (también añadido `tiktok:`)

**📺 Feed de Instagram en `app/page.tsx`**

Estructura del componente `<InstagramFeed posts={[...]} />` ya cableada; los 6 URLs de los posts pendientes de pegar (no tenía sesión de IG en este entorno).

**⚠️ Pendientes (necesitan info del usuario)**

1. **OTEM**: lo listas en el roster booking, pero **no existe ficha pública en bonitosound.com** ni aparece en `/artistas/`. Sólo encuentro un artista llamado OTEM en Spotify con 66 listeners. ¿Confirmar handle de Instagram y foto, o quitar del nuevo sitio?
2. **Equipo**: tu lista decía "Dani Boada, Manu Rojo, Júlia Martín". La web muestra Dani, Manu, **Xavi Julià** y **Cristina Soler**, no aparece Júlia Martín. ¿Júlia es incorporación nueva sin foto en la web?
3. **Marcas pendientes**: Le Souffle no la he encontrado como restaurante en Barcelona (mi búsqueda devuelve un Le Soufflé de París). ¿Tienes el logo por separado o se queda fuera?
4. **Reels por artista**: el frontmatter de cada artista admite un campo `reels: [url1, url2, ...]`. Necesito que pegues 2-3 reels por cada uno del roster (OTEM, Sa Pena, Nàtura, Dulze, Paule, Eva Calyza). Mientras tanto el campo queda vacío.
5. **6 posts de la home**: pendientes de pegar en `app/page.tsx` (placeholders dejados).
6. **Distribución (Soylapau, Daniel Giró, 96Grados, Kanela, Sotrac, Belbaka, Egon Calle, Rumba Menuda, Fabian, Overpulation)**: solo Kenai White aparece en la home. Si quieres ficha para los demás, paso por sus URLs `/artista/<slug>/` en una segunda iteración.

**🔧 Notas técnicas**

- Todos los assets son material ya publicado en bonitosound.com (uso legítimo) o logos corporativos de Wikimedia Commons.
- Las imágenes de artista de bonitosound.com vienen en alta resolución (la de Paule por ejemplo es 4095×3276). Si Next.js no las optimiza automáticamente vía `<Image />`, conviene generar webp en build.
- Para Júlia Martín y cualquier nuevo artista no documentado en bonitosound.com, una vez tengamos sus fotos, basta con dejarlas en `public/img/<carpeta>/<slug>.<ext>` y referenciar desde el `.md`.
