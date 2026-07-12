# Trabajo nocturno — log y pendientes

> Sesión autónoma. **Aviso importante:** hay OTRA sesión de IA trabajando el mismo
> `main` en paralelo (lleva el HOME y los vídeos de escena — commits "Home escenas
> ahora son VIDEOS", "Clips de escena en boomerang"). Para no pisarnos, esta sesión
> se centró en las **páginas internas**. Coordinad cuál lleva qué.

## Hecho esta noche (páginas internas — todo aditivo, build verde)

| Página / zona | Cambio |
|---|---|
| Heros vacíos | `records` y `lab` usan las ilustraciones de sección (webp); `nosotros` un collage B&W del equipo. Ya no hay huecos/cajas grises |
| `/eventos/marcas` | Las 3 covers de caso vacías caen al logo de marca (Ballantine's, Pernod) o al nombre |
| Marcas | Fix slug `GTS Global Talent Services` → `Global Talent Services` (ya casa con su logo) |
| `/records/sello` | Sección Eva Calyza: foto + embed de Spotify (era 100% texto) |
| `/records/booking-management` | Tira de fotos del roster (Dulze, Eva Calyza, Sa Pena, Nàtura) |
| `/eventos` (hub) | Media en el hero (patrón parallax) |
| `/eventos/giras` | Hero con clip de vídeo |
| Logo Jaleo Sound | Versiones roja + blanca con fondo quitado (`public/img/marca/jaleo-sound{,-white}.png`) |
| Equipo | Victor Torres añadido con foto real; equipo entero en B&W |

## PENDIENTE — bloqueado por subida de archivos (la red del entorno está capada, no puedo descargar nada)

Sube estos a la rama (arrástralos como el vídeo `0711`) y aparecen solos:

1. **6 logos de marca** → `public/img/marcas/` (PNG/SVG transparente):
   `absolut`, `le-souffle`, `codigo-1530`, `lighthouse`, `corre-lola-corre`, `sr-wilson`.
   (Comprobado: no están en simple-icons ni en ningún host alcanzable.)
2. **3 fotos de casos reales** → `public/img/casos/`: `ballantines.jpg`, `pernod-ricard.jpg`, `gira-1016.jpg`.
   (Mientras, salen con el logo de marca — ya no hay caja gris.)
3. **Fotos de artistas de gira** (para el banner del home): Orozco, Maldita Nerea, Alfred García,
   Ruth Lorenzo, etc. → `public/img/artistas/` en B&W. Sin ellas, el banner usa los artistas del roster.

## No hecho a propósito
- Los `mockup-*.png` NO son capturas de Artiverse (son comps de la web antigua) → no los uso como
  producto del SaaS (sería engañoso). `/lab/artiverse` sigue sin captura real de producto.
- No toqué el HOME ni los componentes de vídeo/player: los lleva la otra sesión.
