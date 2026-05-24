# =============================================================================
#  Bonito Sound — Descarga masiva de assets desde bonitosound.com y Wikimedia
#  Uso (en PowerShell, dentro de la raíz del repo bonitosound clonado):
#       Set-ExecutionPolicy -Scope Process Bypass
#       .\download-bonito-assets.ps1
#  Las imágenes se guardan en .\public\img\ con los slugs del manifest.
#  Idempotente: si el fichero ya existe, lo salta.
# =============================================================================

$ErrorActionPreference = 'Continue'
$BaseDir = Join-Path (Get-Location) 'public\img'

function Save-Image {
    param([string]$Url, [string]$RelPath, [string]$Label)
    $Out = Join-Path $BaseDir $RelPath
    $Dir = Split-Path $Out -Parent
    if (-not (Test-Path $Dir)) { New-Item -ItemType Directory -Path $Dir -Force | Out-Null }
    if (Test-Path $Out) { Write-Host "  [SKIP] $Label  →  $RelPath (ya existe)" -ForegroundColor DarkGray; return }
    try {
        Invoke-WebRequest -Uri $Url -OutFile $Out -UseBasicParsing -UserAgent 'Mozilla/5.0' -MaximumRedirection 10
        Write-Host "  [OK]   $Label  →  $RelPath" -ForegroundColor Green
    } catch {
        Write-Host "  [FAIL] $Label  ($Url)  $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n== Bonito Sound asset downloader ==" -ForegroundColor Cyan
Write-Host "Destino base: $BaseDir`n"

# ─── LOGO BONITO SOUND ────────────────────────────────────────────────────────
Write-Host "[1/6] Logo Bonito Sound" -ForegroundColor Yellow
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/logo.svg'   'marca\logo-bonito.svg'       'logo blanco'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/logo-1.svg' 'marca\logo-bonito-color.svg' 'logo color'

# ─── ARTISTAS ─────────────────────────────────────────────────────────────────
Write-Host "`n[2/6] Artistas (10 fotos del roster identificadas)" -ForegroundColor Yellow
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/11/image00001.jpeg'                'artistas\paule.jpeg'          'Paule'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/FOTO-DE-GRUP-scaled.jpg'        'artistas\sa-pena.jpg'         'Sa Pena'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/DJ-Natura-feat-scaled.jpg'      'artistas\natura.jpg'          'Natura (DJ Natura)'
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/04/ps1.png'                         'artistas\dulze.png'           'Dulze'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/06/Eva-Calyza-2.jpg'                'artistas\eva-calyza.jpg'      'Eva Calyza'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/07/IMG_0251-scaled.jpg'             'artistas\pablo-rojo.jpg'      'Pablo Rojo'
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/01/D-NACAR-scaled.jpeg'             'artistas\d-nacar.jpeg'        'D Nacar'
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/01/Campeonato-cover.png'            'artistas\alexdelion.png'      'AlexDeLion'
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/01/Marco-la-Testa-scaled.jpeg'      'artistas\marco-la-testa.jpeg' 'Marco la Testa'
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/01/IMG_5857-scaled-e1738156300749.jpeg' 'artistas\hebe.jpeg'       'Hebe'

# ─── EQUIPO ───────────────────────────────────────────────────────────────────
Write-Host "`n[3/6] Equipo" -ForegroundColor Yellow
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/06/DANIEL_BOADA_BONITO_SOUND_2024__001-e1721832808420.jpg' 'equipo\dani-boada.jpg' 'Dani Boada'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/06/manu_rojo_bonito_sound-copia.jpg'  'equipo\manu-rojo.jpg'      'Manu Rojo'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/07/xavi_julia_bonito_sound-copia.jpg' 'equipo\xavi-julia.jpg'     'Xavi Julia'
Save-Image 'https://bonitosound.com/wp-content/uploads/2025/03/b819c45d-314f-4d61-9953-acd80ee30cc3-2.jpg' 'equipo\cristina-soler.jpg' 'Cristina Soler'

# ─── MARCAS CLIENTES (logos de bonitosound.com /producciones/) ───────────────
Write-Host "`n[4/6] Marcas clientes (de bonitosound.com)" -ForegroundColor Yellow
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-1.png'  'marcas\ballantines.png'             'Ballantines'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-2.png'  'marcas\sweet-bird.png'              'Sweet Bird'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-3.png'  'marcas\font-vella.png'              'Font Vella'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-4.png'  'marcas\global-talent-services.png'  'Global Talent Services'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-5.png'  'marcas\four-roses.png'              'Four Roses'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-6.png'  'marcas\schweppes.png'               'Schweppes'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-7.png'  'marcas\la-sucursal.png'             'La Sucursal'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-10.png' 'marcas\concert-studio.png'          'Concert Studio'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-13.png' 'marcas\gestmusic.png'               'Gestmusic'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/image-15.png' 'marcas\universal.png'               'Universal'

# ─── MARCAS CLIENTES EXTRAS (Wikimedia Commons, mencionadas por el usuario) ───
Write-Host "`n[5/6] Marcas clientes extras (Wikimedia Commons)" -ForegroundColor Yellow
Save-Image 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Pernod_Ricard_logo_2019.svg' 'marcas\pernod-ricard.svg' 'Pernod Ricard'
Save-Image 'https://commons.wikimedia.org/wiki/Special:FilePath/PepsiCo_logo.svg'             'marcas\pepsico.svg'        'PepsiCo'
Save-Image 'https://upload.wikimedia.org/wikipedia/commons/9/94/Absolut_Vodka_logo.svg'       'marcas\absolut.svg'        'Absolut'

# ─── INSTITUCIONES / APOYOS ──────────────────────────────────────────────────
Write-Host "`n[6/6] Instituciones y apoyos" -ForegroundColor Yellow
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/UFI_logo.png'                   'instituciones\ufi.png'                    'UFI'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/sgae_logo.png'                  'instituciones\sgae.png'                   'SGAE'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/agedi_logo.png'                 'instituciones\agedi.png'                  'AGEDI'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/arte_logo.png'                  'instituciones\arte.png'                   'ARTE'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/AEDEM_white.png'                'instituciones\aedem.png'                  'AEDEM'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/10/european-music-council.png'     'instituciones\european-music-council.png' 'European Music Council'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/plan-recuperacion.svg'          'instituciones\plan-recuperacion.svg'      'Plan Recuperacion'
Save-Image 'https://bonitosound.com/wp-content/uploads/2026/04/Institut_llull_Marca_White_H-300x73.png' 'instituciones\institut-llull.png' 'Institut Llull'
Save-Image 'https://bonitosound.com/wp-content/uploads/2024/04/union-europea.svg'              'instituciones\union-europea.svg'          'Union Europea'

Write-Host "`n== Descarga finalizada ==" -ForegroundColor Cyan
Write-Host "Revisa $BaseDir para ver los ficheros descargados."
Write-Host "Si todo OK: git add public/img; git commit -m 'feat(assets): fotos artistas, equipo y logos'; git push"
