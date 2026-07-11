"use client";

import { useState } from "react";
import { SpotifyEmbed } from "@/components/Embeds";

/**
 * Reproductor flotante de "Bonito" (Jarabe de Palo). Muestra el embed real de
 * Spotify con su botón de play — fiable en todos los navegadores. Al minimizar,
 * el iframe se queda MONTADO (colapsado con altura 0, no display:none) para que
 * el audio no se corte y siga sonando mientras se navega.
 *
 * Nota: el autoplay con sonido al cargar lo bloquean todos los navegadores; por
 * eso el visitante da al play una vez y ya suena de fondo el resto de la visita.
 */
const TRACK_ID = "5FiB1uNoGZE4PenzZd7Imu"; // Bonito — Jarabe de Palo

export function BonitoPlayer() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 print:hidden">
      {/* Panel SIEMPRE montado (colapsa con altura, no se desmonta) para que el
          audio persista al minimizar. */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open
            ? "mb-2 w-[min(340px,calc(100vw-2.5rem))] opacity-100"
            : "h-0 w-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-subtle bg-bg-primary p-2 shadow-xl">
          <SpotifyEmbed
            type="track"
            id={TRACK_ID}
            height={152}
            title="Bonito — Jarabe de Palo"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex items-center gap-2.5 rounded-full border border-subtle bg-bg-primary/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-colors hover:bg-bg-primary"
        >
          <span className="flex h-5 items-end gap-[3px]" aria-hidden>
            {[0.4, 0.9, 0.6].map((h, i) => (
              <span
                key={i}
                className="w-[3px] origin-bottom rounded-full bg-accent-cyan"
                style={{
                  height: `${h * 100}%`,
                  animation: `eq 0.9s ease-in-out infinite ${i * 0.15}s`,
                }}
              />
            ))}
          </span>
          <span className="text-sm font-medium text-text-primary">
            {open ? "La canción de Bonito" : "Escúchanos"}
          </span>
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Cerrar reproductor"
          className="rounded-full border border-subtle bg-bg-primary/90 px-2.5 py-2.5 text-text-muted shadow-lg backdrop-blur-md transition-colors hover:text-text-primary"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
