# ROADMAP — Pendientes de la web Bonito Sound

> Doc interno vivo. Última actualización: 25 junio 2026 (sesión de contenido).
> Complementa a `CONTEXT.md` (handoff general). Aquí solo lo que FALTA, con su
> archivo afectado y el cómo. Regla de la web: **no publicar nada inventado** —
> por eso varios ítems están retirados o en draft hasta tener el dato real.

---

## 1 · Bloqueado por el cliente (datos/material que solo Bonito tiene)

| # | Qué falta | Dónde | Cómo se desbloquea |
|---|---|---|---|
| 1.1 | **Enlaces reales de OTEM** (Spotify + Instagram) | `content/artistas/otem.md` | Quitar `draft: true`, añadir `spotifyArtistId` e `instagram` correctos y una foto en `public/img/artistas/otem.*`. ⚠️ El ID anterior (`382ZStNMRpkdxhvwYgQRaU`) era de un artista **francés** homónimo — no reutilizar. |
| 1.2 | **Enlaces reales de Paule** (Spotify + IG confirmado) | `content/artistas/paule.md` | Quitar `draft: true` y añadir `spotifyArtistId`. Sin huella pública citable a día de hoy. |
| 1.3 | **Spotify IDs de Nàtura y Sa Pena** | `content/artistas/{natura,sa-pena}.md` | Añadir `spotifyArtistId` → activa el embed automáticamente. No localizados en fuentes públicas. |
| 1.4 | **6 logos de marca** | `public/img/marcas/` | Soltar `absolut.svg/png`, `le-souffle.*`, `codigo-1530.*`, `lighthouse.*`, `corre-lola-corre.*`, `sr-wilson.*` (slug = minúsculas con guiones). Aparecen solos. El proxy del entorno de desarrollo bloquea descargas externas; hay que subirlos a mano. |
| 1.5 | **Equipo público definitivo** | `lib/site.ts` → `team` | Confirmar con Dani si entran Júlia Martín (producto/marketing) y Roser Gamonal (contacto en registros públicos). Hoy hay 4: Dani, Manu, Xavi, Cristina. |
| 1.6 | **Membresías** (UFI, SGAE, AGEDI, ARTE, AEDEM, European Music Council) | `lib/site.ts` → `memberships` + `/nosotros` | Sin confirmación pública encontrada. Validar que son reales y vigentes antes de seguir mostrándolas. |
| 1.7 | **Jaleo 2026**: line-up y fecha | `app/jaleo-sound/page.tsx` | El brief dice 11-12 sep 2026; la edición 2025 fue 11-12 **oct**. Confirmar fecha y añadir cartel cuando se anuncie (array `lineup2025` como referencia de formato). También: ¿existió edición 2024/Utrecht? Sin fuente pública. |
| 1.8 | **Fotos de Jaleo (ediciones pasadas)** | `public/img/jaleo/` | Cualquier .jpg/.png/.webp aquí activa automáticamente la galería "Esto es lo que pasó" (hoy oculta por estar vacía). |
| 1.9 | **Reels de artistas** | `content/artistas/*.md` → `reels: []` | 2-3 URLs de reels de IG por artista. |
| 1.10 | **Material de casos de marca** (foto + fecha + ciudad + artista + 1 frase por caso) | `content/casos/*.md` + `public/img/casos/` | Con material real, los 3 casos (Ballantine's, Pernod, Gira 1016) pasan de tarjeta genérica a caso creíble. Las giras históricas (Orozco, Maldita Nerea, Ruth Lorenzo, Ramon Mirabet, Efecto Pasillo, Albert Pla) se **retiraron del copy afirmativo** por falta de huella pública — con dossier propio se reincorporan a `/eventos/giras`. |
| 1.11 | **CP de la dirección** | `lib/site.ts` → `address.zip` | Web dice 08206; los directorios mercantiles dicen 08203. Confirmar cuál. |

## 2 · Código pendiente (Tramo 1 de la auditoría — no ejecutado)

| # | Qué | Dónde | Nota |
|---|---|---|---|
| 2.1 | **Backend del formulario** | `components/ContactForm.tsx`, `LeadMagnetBrands.tsx`, `LeadMagnetArtists.tsx` | Hoy todo termina en `mailto:` → se pierde todo lead que no complete el salto al correo. Conectar Resend o Formspree (`.env.example` ya prevé `RESEND_API_KEY` / `NEXT_PUBLIC_FORM_ENDPOINT`) y persistir las respuestas de los quizzes. **El pendiente con más impacto en negocio.** |
| 2.2 | **CTAs segmentados** marca/artista | escena `cierre` en `lib/home.ts` | El cierre pregunta "¿Marca, artista o promotor?" pero manda a todos a `/contacto`. Desdoblar: marca → quiz de `/eventos/marcas`, artista → quiz de `/records`. |
| 2.3 | **Breadcrumbs / retorno al hub** | sub-páginas de `/records/*`, `/eventos/*`, `/lab/*` | Solo la ficha de artista tiene "← Roster completo". Añadir el equivalente en las 6-8 hijas. |
| 2.4 | **Caso real completo** | `content/casos/` | Depende del material del punto 1.10. |

## 3 · Deuda técnica / performance

| # | Qué | Nota |
|---|---|---|
| 3.1 | Optimizar imágenes pesadas | `superheroe-home.png` (1.5 MB, es el poster del hero) y PNGs de `img/secciones|heroes|marca` (1.4-2.3 MB) → AVIF/WebP. `sharp` ya está en devDependencies. |
| 3.2 | Lenis en móvil | Valorar desactivar smooth-scroll en `pointer: coarse` (coste de scroll en gama baja). `components/motion/MotionProvider.tsx`. |
| 3.3 | Dos motores de animación | GSAP + framer-motion conviven (~40 KB extra). Consolidar a medio plazo, sin prisa. |
| 3.4 | Analytics | Nunca se instaló. Plausible (previsto en `.env.example`) o Vercel Analytics. |
| 3.5 | Lighthouse + legales | Audit real de Lighthouse en producción; revisión jurídica de `/aviso-legal` y `/privacidad`. |
| 3.6 | **Hero definitivo** | El actual (imagen estática flotando, `components/home/HeroImage.tsx`) es placeholder aceptado por el cliente ("ni que sea para terminar la web"). Los 4 vídeos IA se descartaron y borraron. Pendiente decidir la pieza final. |

## 4 · Contenido futuro (reactivaciones)

| # | Qué | Cómo |
|---|---|---|
| 4.1 | `/agenda` | Poblar `content/agenda/*.md` (formato en `lib/agenda.ts`) → quitar `robots: noindex` de `app/agenda/page.tsx`, devolver a `nav` (`lib/site.ts`) y al sitemap (`app/sitemap.ts`). |
| 4.2 | `/diario` | 2-3 posts iniciales → mismos pasos que agenda. |
| 4.3 | Feed de Instagram real | 6 URLs de posts de @bonito_sound → `components/Embeds.tsx` (`InstagramFeed posts=[…]`). |
| 4.4 | Fichas del catálogo de distribución | Soylapau, Daniel Giró, 96Grados, Pablo Rojo, Hebe, Kanela, Sotrac, Belbaka, Egon Calle, Rumba Menuda, Fabian, Overpulation, D Nácar, AlexDeLion, Marco la Testa — hoy solo nombres en marquee. Con datos, crear `.md` como el de `kenai-white.md`. |
| 4.5 | DNS + Search Console | bonitosound.com → Vercel; validar sitemap; monitorizar las 301 de WordPress (`next.config.mjs`). Sprint D del brief. |

---

### Estado de las fichas de artista (referencia rápida)

| Artista | Ficha | Spotify | Hitos | Nota |
|---|---|---|---|---|
| Dulze | ✅ publicada | ✅ | ✅ (GATEA, Qué Fantasía Tour, Verde aceituna) | Verificada con prensa |
| Eva Calyza | ✅ publicada | ✅ | ✅ (MARCA DIVINA, afilá, La Tarara) | Verificada con prensa |
| Sa Pena | ✅ publicada | ❌ (1.3) | ✅ (Sona9 2023, Tot Canvia, FCK PENA) | Género corregido: urbano valencià |
| Nàtura | ✅ publicada | ❌ (1.3) | ✅ (FiM, Share Festival, Festiuet) | Corregida: es DJ/productora |
| Kenai White | ✅ publicada (distribución) | ❌ | ✅ (Soy Trans, Dos Vidas TVE) | Nueva |
| OTEM | 🚫 draft (1.1) | ❌ | ❌ | ID anterior era de artista francés |
| Paule | 🚫 draft (1.2) | ❌ | ❌ | Sin huella pública citable |
