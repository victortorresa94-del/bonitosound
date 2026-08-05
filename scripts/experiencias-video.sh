#!/usr/bin/env bash
#
# Vídeo resumen de /experiencias — montaje dinámico, cortes cortos.
#
#   bash scripts/experiencias-video.sh
#
# Diferencias con la primera versión (que quedó lenta y sosa):
#   · Muchos planos cortos (~1-1,6s) en vez de 7 clips de 5s. Se sacan VARIOS
#     momentos distintos de cada evento, no uno solo, así no se repite plano.
#   · Los vídeos VERTICALES se amplían para llenar el 16:9 recortando el centro
#     —que es donde está la acción— en vez de dejar franjas desenfocadas.
#   · Alterna duraciones (1,6 / 1,1 / 1,3 / 0,9s) para que tenga respiración y
#     no parezca metralla a ritmo fijo.
#
# Necesita un ffmpeg CON códecs. El del sandbox de Playwright viene con
# --disable-everything y no sirve; se instala uno completo desde npm:
#   mkdir -p /tmp/ff && cd /tmp/ff && npm init -y && npm i @ffmpeg-installer/ffmpeg
set -euo pipefail

FF="${FFMPEG_PATH:-/tmp/ff/node_modules/@ffmpeg-installer/linux-x64/ffmpeg}"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

[ -x "$FF" ] || { echo "No hay ffmpeg en $FF"; exit 1; }

# marca:segundo — varios momentos POR evento. Cuando lleguen más vídeos de
# Dani, se añaden líneas aquí y se relanza el script.
#
# Revisado fotograma a fotograma (fila por fila, con contact sheets) tras el
# aviso de Víctor de que había planos "que no tienen mucho sentido". De los
# 28, 5 se sustituyeron por otro segundo de la MISMA fuente (nunca un vídeo
# nuevo — no hay más metraje que este):
#   · four-roses:2  → four-roses:11  (antes: tío en la barandilla subiendo
#     rosas contra el cielo, casi sin marca visible. Ahora: banner "Four
#     Roses Bourbon" leíble, igual que el otro plano de four-roses del reel)
#   · corona:24     → corona:21      (antes: primer plano ambiguo de tela/
#     mano, sin marca. Ahora: tres amigos brindando con Corona, de blanco)
#   · corona:9      → corona:0       (antes: una planta tapa todo el plano.
#     Ahora: botellas de Corona + la corona de madera, plano limpio)
#   · natura:14     → natura:12      (antes: caía justo en un momento oscuro
#     sin texto. Ahora: la cabina con el logo "NÀTURA" bien visible)
#   · natura:20     → natura:21      (mismo motivo: cae en el tramo con logo
#     legible en vez de en el corte de planta general)
# El resto de planos se revisaron uno a uno y están bien: lo que a primera
# vista parecía "ULTRA" en los planos de Nàtura es en realidad su propio
# logo (un oso con diadema) mal leído en miniatura — no había nada que tocar
# ahí. El plano de Pepsi que parecía mostrar una botella de Corona era un
# artefacto de haber medido el frame exacto del corte entre dos clips, no un
# error real (verificado extrayendo el mismo segundo directo de pepsi.mp4).
PLANOS=(
  "corona:4" "schweppes:12" "pepsi:6" "tequila-codigo:9"
  "corona:14" "schweppes:28" "font-vella:2" "four-roses:11"
  "chateau:4" "natura:5" "corona:21" "schweppes:44"
  "pepsi:16" "tequila-codigo:22" "font-vella:8" "four-roses:8"
  "chateau:11" "natura:12" "corona:32" "schweppes:60"
  "pepsi:26" "tequila-codigo:36" "chateau:15" "natura:21"
  "schweppes:76" "tequila-codigo:46" "corona:0" "pepsi:31"
)

echo "Cortando ${#PLANOS[@]} planos…"
i=0
for p in "${PLANOS[@]}"; do
  marca="${p%%:*}"; desde="${p##*:}"
  origen="$RAIZ/public/video/eventos/$marca.mp4"
  [ -f "$origen" ] || continue
  salida="$(printf "%s/%03d.mp4" "$TMP" "$i")"

  case $((i % 4)) in
    0) dur=1.6 ;;
    1) dur=1.1 ;;
    2) dur=1.3 ;;
    *) dur=0.9 ;;
  esac

  # scale+crop llena SIEMPRE el 16:9: los verticales se amplían y se recorta el
  # centro. Nada de franjas a los lados.
  "$FF" -v error -ss "$desde" -t "$dur" -i "$origen" \
    -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=25" \
    -an -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p "$salida" 2>/dev/null || continue
  i=$((i+1))
done
echo "  $i planos listos"

echo "Encadenando…"
printf "file '%s'\n" "$TMP"/[0-9][0-9][0-9].mp4 > "$TMP/lista.txt"
"$FF" -v error -f concat -safe 0 -i "$TMP/lista.txt" -c copy "$TMP/mudo.mp4"

# Ojo: `ffmpeg -i` sin fichero de salida termina con código 1 ("At least one
# output file must be specified"), y con `set -o pipefail` eso tumbaría el
# script aunque la duración se haya leído bien. De ahí el `|| true`.
TOTAL=$({ "$FF" -i "$TMP/mudo.mp4" 2>&1 || true; } | grep Duration \
  | sed 's/.*Duration: \([0-9:.]*\).*/\1/' \
  | awk -F: '{print ($1*3600)+($2*60)+$3}')
echo "  duración: ${TOTAL}s"

echo "Poniendo la música…"
"$FF" -v error -i "$TMP/mudo.mp4" -i "$RAIZ/public/audio/radio-bonito.mp3" -filter_complex \
  "[1:a]atrim=0:$TOTAL,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.8,\
afade=t=out:st=$(awk "BEGIN{print $TOTAL-1.5}"):d=1.4,volume=1.8[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 128k -shortest "$TMP/con-audio.mp4"

echo "Comprimiendo para web…"
mkdir -p "$RAIZ/public/video/experiencias"
"$FF" -v error -i "$TMP/con-audio.mp4" \
  -c:v libx264 -preset slow -crf 27 -maxrate 1500k -bufsize 3000k \
  -c:a aac -b:a 112k -movflags +faststart \
  -y "$RAIZ/public/video/experiencias/resumen.mp4"

echo "Listo: public/video/experiencias/resumen.mp4 ($(du -h "$RAIZ/public/video/experiencias/resumen.mp4" | cut -f1))"
