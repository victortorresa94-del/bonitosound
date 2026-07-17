# Vídeos de evento → subir a R2

Los vídeos están en tu Drive (**Bonito Sound / Material Eventos**). La web ya
los referencia por `videoUrl` en cada `content/eventos/<slug>.md`: en cuanto
subas cada archivo a tu bucket de R2 **con el nombre exacto de la derecha**,
aparecen solos (no hay que tocar código).

> El sandbox no puede subir a R2 (bloqueado por el proxy) ni bajar los mp4 de
> Drive. Esta subida la haces tú desde Cloudflare R2.

| Vídeo en Drive (Material Eventos) | Súbelo a R2 como |
|---|---|
| Evento corona mas de 40 eventos 2025.mp4 | `corona.mp4` |
| Bolo Sweppes / Swepes 2 / Evento swepes top | `schweppes.mp4` (elige el mejor) |
| fontvella 30 eventos… / Fontvella.mp4 | `font-vella.mp4` |
| four roses 20 eventos desde 2024.mp4 | `four-roses.mp4` |
| Chateau.mp4 | `chateau.mp4` |
| Tequila codigo + 20 eventos.mp4 | `tequila-codigo.mp4` |
| eventod pepsi.mp4 | `pepsi.mp4` |
| Natura.mp4 | `natura.mp4` |
| Producción técnica y logística gira Anne Lukin…mp4 | `anne-lukin.mp4` |
| Evento montado Albert Pla… / Concierto Albert Pla… / Video Albert pla top | `albert-pla.mp4` (elige el mejor) |
| Bolo Dani CEO tocando.mp4 | `dani-directo.mp4` |
| Entrevista Dani.mp4 | `entrevista-dani.mp4` (banner de Nosotros) |
| Video TOP Resumen Bonito…150 lanzamientos.mp4 | vídeo "resumen" del home / records |

## Logos e imágenes de marca
- ✅ **Monkey** y **Sainte Marguerite**: ya integrados (`public/img/marcas/`).
- Seagram's / Four Roses / Font Vella: ya estaban.
- ❌ Falta **Le Souffle** (no estaba en Drive).

## Fotos de artista pendientes (proxy bloquea bonitosound.com)
Bajar a mano a `public/img/artistas/<slug>.jpg`: kanela, daniel-giro, egon-calle,
fabian, kenai-white, rumba-menuda. (URLs en el INFORME de Cowork.)
