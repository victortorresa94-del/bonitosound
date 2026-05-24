#!/usr/bin/env bash
# Descarga las imágenes reales de bonitosound.com y wikimedia a /public/img/
# Equivalente bash del .ps1 que dejó Cowork. Multiplataforma (Mac/Linux/WSL).
#
# Uso:
#   bash scripts/download-bonito-assets.sh
#
# Requiere: curl. Crea las subcarpetas si no existen. Salta los ficheros
# que ya estén descargados (re-correr es seguro).

set -e
cd "$(dirname "$0")/.."

ok=0
skip=0
fail=0

dl() {
  local url="$1" dest="$2"
  mkdir -p "$(dirname "$dest")"
  if [ -s "$dest" ]; then
    echo "↪  $dest (ya existe)"
    skip=$((skip+1)); return
  fi
  if ! curl -sSL -m 30 -A "Mozilla/5.0" -o "$dest" "$url" || [ ! -s "$dest" ]; then
    echo "✗  $dest  (no se pudo bajar)"
    rm -f "$dest"; fail=$((fail+1)); return
  fi
  # Validar que la respuesta sea realmente una imagen, no HTML/texto de error
  local mime
  mime=$(file -b --mime-type "$dest" 2>/dev/null || echo "?")
  case "$mime" in
    image/*) ;;
    text/xml|application/xml)
      # Posible SVG: verificar magic
      if ! head -c 200 "$dest" | grep -q '<svg\|<?xml'; then
        echo "✗  $dest  (no es SVG válido: $mime)"
        rm -f "$dest"; fail=$((fail+1)); return
      fi ;;
    text/plain)
      # En Linux 'file' a veces detecta SVG como text/plain. Mirar magic.
      if head -c 200 "$dest" | grep -q '<svg\|<?xml'; then
        : # SVG válido
      else
        echo "✗  $dest  (respuesta de texto / página de error)"
        rm -f "$dest"; fail=$((fail+1)); return
      fi ;;
    *)
      echo "✗  $dest  (mime no admitido: $mime)"
      rm -f "$dest"; fail=$((fail+1)); return ;;
  esac
  echo "✓  $dest  $(du -h "$dest" | cut -f1)"
  ok=$((ok+1))
}

# ───── Marca ─────
dl "https://bonitosound.com/wp-content/uploads/2024/04/logo.svg"   public/img/marca/logo-bonito.svg
dl "https://bonitosound.com/wp-content/uploads/2024/04/logo-1.svg" public/img/marca/logo-bonito-color.svg

# ───── Artistas (booking + catálogo) ─────
dl "https://bonitosound.com/wp-content/uploads/2025/11/image00001.jpeg"              public/img/artistas/paule.jpeg
dl "https://bonitosound.com/wp-content/uploads/2024/10/FOTO-DE-GRUP-scaled.jpg"      public/img/artistas/sa-pena.jpg
dl "https://bonitosound.com/wp-content/uploads/2024/04/DJ-Natura-feat-scaled.jpg"    public/img/artistas/natura.jpg
dl "https://bonitosound.com/wp-content/uploads/2025/04/ps1.png"                      public/img/artistas/dulze.png
dl "https://bonitosound.com/wp-content/uploads/2024/06/Eva-Calyza-2.jpg"             public/img/artistas/eva-calyza.jpg
dl "https://bonitosound.com/wp-content/uploads/2024/07/IMG_0251-scaled.jpg"          public/img/artistas/pablo-rojo.jpg
dl "https://bonitosound.com/wp-content/uploads/2025/01/D-NACAR-scaled.jpeg"          public/img/artistas/d-nacar.jpeg
dl "https://bonitosound.com/wp-content/uploads/2025/01/Campeonato-cover.png"         public/img/artistas/alexdelion.png
dl "https://bonitosound.com/wp-content/uploads/2025/01/Marco-la-Testa-scaled.jpeg"   public/img/artistas/marco-la-testa.jpeg
dl "https://bonitosound.com/wp-content/uploads/2025/01/IMG_5857-scaled-e1738156300749.jpeg" public/img/artistas/hebe.jpeg

# ───── Equipo ─────
dl "https://bonitosound.com/wp-content/uploads/2024/06/DANIEL_BOADA_BONITO_SOUND_2024__001-e1721832808420.jpg" public/img/equipo/dani-boada.jpg
dl "https://bonitosound.com/wp-content/uploads/2024/06/manu_rojo_bonito_sound-copia.jpg"                       public/img/equipo/manu-rojo.jpg
dl "https://bonitosound.com/wp-content/uploads/2024/07/xavi_julia_bonito_sound-copia.jpg"                      public/img/equipo/xavi-julia.jpg
dl "https://bonitosound.com/wp-content/uploads/2025/03/b819c45d-314f-4d61-9953-acd80ee30cc3-2.jpg"             public/img/equipo/cristina-soler.jpg

# ───── Logos de marcas clientes (los que están en bonitosound.com) ─────
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-1.png"   public/img/marcas/ballantines.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-2.png"   public/img/marcas/sweet-bird.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-3.png"   public/img/marcas/font-vella.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-4.png"   public/img/marcas/gts-global-talent-services.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-5.png"   public/img/marcas/four-roses.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-6.png"   public/img/marcas/schweppes.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-7.png"   public/img/marcas/la-sucursal.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-10.png"  public/img/marcas/concert-studio.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-13.png"  public/img/marcas/gestmusic.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/image-15.png"  public/img/marcas/universal.png

# ───── Logos de marcas que vienen de Wikimedia (las que no estaban en bonitosound.com) ─────
dl "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pernod_Ricard_2019.svg/512px-Pernod_Ricard_2019.svg.png" public/img/marcas/pernod-ricard.png
dl "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/PepsiCo_logo_%282023%29.svg/512px-PepsiCo_logo_%282023%29.svg.png" public/img/marcas/pepsico.png
dl "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Absolut_Vodka_logo.svg/512px-Absolut_Vodka_logo.svg.png" public/img/marcas/absolut.png

# ───── Instituciones / apoyos ─────
dl "https://bonitosound.com/wp-content/uploads/2024/10/UFI_logo.png"               public/img/instituciones/ufi.png
dl "https://bonitosound.com/wp-content/uploads/2024/10/sgae_logo.png"              public/img/instituciones/sgae.png
dl "https://bonitosound.com/wp-content/uploads/2024/10/agedi_logo.png"             public/img/instituciones/agedi.png
dl "https://bonitosound.com/wp-content/uploads/2024/10/arte_logo.png"              public/img/instituciones/arte.png
dl "https://bonitosound.com/wp-content/uploads/2024/10/AEDEM_white.png"            public/img/instituciones/aedem.png
dl "https://bonitosound.com/wp-content/uploads/2024/10/european-music-council.png" public/img/instituciones/european-music-council.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/plan-recuperacion.svg"      public/img/apoyos/plan-de-recuperacion-ue.svg
dl "https://bonitosound.com/wp-content/uploads/2026/04/Institut_llull_Marca_White_H-300x73.png" public/img/apoyos/institut-ramon-llull.png
dl "https://bonitosound.com/wp-content/uploads/2024/04/union-europea.svg"          public/img/apoyos/union-europea.svg

echo ""
echo "Fin. ok=$ok skip=$skip fail=$fail"
