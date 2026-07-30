#!/usr/bin/env bash
#
# Genera el vídeo resumen de /experiencias a partir de los vídeos de evento.
#
#   bash scripts/experiencias-video.sh
#
# Coge un trozo de cada evento de marca, los normaliza a 16:9 (los verticales
# van sobre un fondo desenfocado del propio vídeo, que queda mucho mejor que
# unas barras negras), los encadena con fundidos y les pone de banda sonora la
# sesión de la Radio Bonito — música de artistas de la casa, derechos propios.
#
# Necesita un ffmpeg CON códecs. El del sandbox de Playwright viene con
# --disable-everything y no sirve; se instala uno completo desde npm:
#   mkdir -p /tmp/ff && cd /tmp/ff && npm init -y && npm i @ffmpeg-installer/ffmpeg
#
# Cuando Dani mande más vídeos de marca, se añaden a SEGMENTOS y se relanza.
set -euo pipefail

FF="${FFMPEG_PATH:-/tmp/ff/node_modules/@ffmpeg-installer/linux-x64/ffmpeg}"
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# marca:segundo-de-inicio — se salta la entrada de cada vídeo y se coge la
# parte con más acción. Ajustar a ojo si se cambia el material.
SEGMENTOS="corona:8 schweppes:20 pepsi:10 tequila-codigo:14 font-vella:3 four-roses:3 chateau:5"
DURACION=5      # segundos por clip
FUNDIDO=0.5

[ -x "$FF" ] || { echo "No hay ffmpeg en $FF"; exit 1; }

echo "Preparando fragmentos…"
i=0
for s in $SEGMENTOS; do
  marca="${s%%:*}"; desde="${s##*:}"
  origen="$RAIZ/public/video/eventos/$marca.mp4"
  [ -f "$origen" ] || { echo "  (falta $marca.mp4, lo salto)"; continue; }
  salida="$(printf "%s/%02d.mp4" "$TMP" "$i")"
  # Fondo = el propio vídeo escalado a rebosar y desenfocado; delante, el vídeo
  # entero centrado. Así los verticales no dejan franjas muertas.
  "$FF" -v error -ss "$desde" -t "$DURACION" -i "$origen" -filter_complex \
    "[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,boxblur=22:2[bg];\
[0:v]scale=1280:720:force_original_aspect_ratio=decrease[fg];\
[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1,fps=25,\
fade=t=in:st=0:d=$FUNDIDO,fade=t=out:st=$(echo "$DURACION-$FUNDIDO"|bc):d=$FUNDIDO[v]" \
    -map "[v]" -an -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p "$salida"
  echo "  $marca"
  i=$((i+1))
done

echo "Encadenando…"
printf "file '%s'\n" "$TMP"/[0-9][0-9].mp4 > "$TMP/lista.txt"
"$FF" -v error -f concat -safe 0 -i "$TMP/lista.txt" -c copy "$TMP/mudo.mp4"

DUR=$("$FF" -v error -i "$TMP/mudo.mp4" -show_entries format=duration -of csv=p=0 -f null - 2>/dev/null || echo "")
TOTAL=$(awk "BEGIN{print $i*$DURACION}")

echo "Poniendo la música…"
"$FF" -v error -i "$TMP/mudo.mp4" -i "$RAIZ/public/audio/radio-bonito.mp3" -filter_complex \
  "[1:a]atrim=0:$TOTAL,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=1.2,\
afade=t=out:st=$(awk "BEGIN{print $TOTAL-1.8}"):d=1.7,volume=1.8[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 128k -shortest "$TMP/con-audio.mp4"

echo "Comprimiendo para web…"
mkdir -p "$RAIZ/public/video/experiencias"
"$FF" -v error -i "$TMP/con-audio.mp4" \
  -c:v libx264 -preset slow -crf 27 -maxrate 1400k -bufsize 2800k \
  -c:a aac -b:a 112k -movflags +faststart \
  -y "$RAIZ/public/video/experiencias/resumen.mp4"

PESO=$(du -h "$RAIZ/public/video/experiencias/resumen.mp4" | cut -f1)
echo "Listo: public/video/experiencias/resumen.mp4 ($PESO)"
