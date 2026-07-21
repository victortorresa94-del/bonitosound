import type { Metadata } from "next";
import { SpotifyDock } from "@/components/lab/SpotifyDock";

export const metadata: Metadata = {
  title: "Prueba · Reproductor Spotify acoplable",
  robots: { index: false, follow: false },
};

/**
 * PÁGINA DE PRUEBA (no indexada, aislada). Solo para ver el concepto del
 * reproductor de Spotify que arranca centrado y se acopla abajo-derecha.
 * No toca nada del home ni del resto de la web.
 */
export default function PlayerTest() {
  return (
    <main className="min-h-[100svh] bg-[#FBFAF6]">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0c7e93]">
          Prueba interna
        </p>
        <h1 className="display mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-tight text-[#14283C]">
          Reproductor de Spotify acoplable
        </h1>
        <p className="mx-auto mt-6 max-w-md text-text-secondary">
          El reproductor arranca centrado con un botón propio{" "}
          <strong>&laquo;Dale al play&raquo;</strong>. Al pulsarlo suena y se
          desliza a la esquina de abajo a la derecha en pequeño, sin dejar de
          sonar. Usa el embed oficial de Spotify (con licencia de Spotify), no
          alojamos ningún audio.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-text-muted">
          Nota: Spotify se ve en el <strong>deploy de Vercel</strong>, no en el
          sandbox (bloquea su script). Playlist de prueba: la de artistas de
          Bonito; se cambia por una canción concreta en un segundo.
        </p>
      </div>

      <SpotifyDock />
    </main>
  );
}
