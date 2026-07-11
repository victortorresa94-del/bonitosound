"use client";

import { useState } from "react";
import { SpotifyEmbed } from "@/components/Embeds";

/**
 * Reproductor flotante con la playlist de Bonito (canciones de nuestros
 * artistas). Empieza por "Bonito" de Jarabe de Palo — para eso, esa canción
 * debe ir la PRIMERA en la playlist de Spotify (el embed reproduce en el
 * orden de la playlist).
 *
 * Diseño: pastilla discreta abajo a la izquierda que se despliega al pulsar.
 * Nunca autoplay (Spotify exige que el usuario le dé al play). Se puede cerrar.
 */
const PLAYLIST_ID = "2lxa6r7k0dthpANWR9wRWs";

export function BonitoPlayer() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 print:hidden">
      {open ? (
        <div className="w-[min(360px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-subtle bg-bg-primary shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary">
              Suena bonito
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen(false)}
                aria-label="Minimizar reproductor"
                className="rounded-md px-2 py-1 text-text-muted transition-colors hover:text-text-primary"
              >
                –
              </button>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Cerrar reproductor"
                className="rounded-md px-2 py-1 text-text-muted transition-colors hover:text-text-primary"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="px-2 pb-2">
            <SpotifyEmbed
              type="playlist"
              id={PLAYLIST_ID}
              height={352}
              title="La playlist de Bonito Sound"
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2.5 rounded-full border border-subtle bg-bg-primary/90 py-2.5 pl-3 pr-4 shadow-lg backdrop-blur-md transition-colors hover:bg-bg-primary"
          aria-label="Abrir la playlist de Bonito"
        >
          <span className="flex h-6 items-end gap-[3px]" aria-hidden>
            <span className="w-[3px] origin-bottom animate-[eq_0.9s_ease-in-out_infinite] rounded-full bg-accent-cyan" style={{ height: "40%" }} />
            <span className="w-[3px] origin-bottom animate-[eq_0.9s_ease-in-out_infinite_0.15s] rounded-full bg-accent-cyan" style={{ height: "90%" }} />
            <span className="w-[3px] origin-bottom animate-[eq_0.9s_ease-in-out_infinite_0.3s] rounded-full bg-accent-cyan" style={{ height: "60%" }} />
          </span>
          <span className="text-sm font-medium text-text-primary">
            La playlist de Bonito
          </span>
        </button>
      )}
    </div>
  );
}
