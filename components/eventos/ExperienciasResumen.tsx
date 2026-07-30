"use client";

import { useEffect, useRef, useState } from "react";
// Import directo al fichero, NO al barrel de @/components/motion: ese arrastra
// MarqueeLogoWall → lib/assets → node:path, que no existe en el navegador y
// rompe el build de este componente cliente.
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const NAVY = "#14283C";
const CYAN = "#16b6d4";

/**
 * El resumen de experiencias: un montaje con trozos de los eventos reales que
 * hemos montado, con música de artistas de la casa.
 *
 * Arranca MUDO y en bucle (así puede autoreproducirse sin molestar) y el sonido
 * se activa al pulsar. Cuando se activa, el PlayerProvider pausa la radio solo
 * —tiene un listener que se ocupa—, para que nunca suenen dos cosas a la vez.
 */
export function ExperienciasResumen({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [conSonido, setConSonido] = useState(false);

  // Solo se reproduce mientras se ve: un vídeo corriendo fuera de pantalla
  // gasta batería y ancho de banda para nada.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const alternarSonido = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setConSonido(!v.muted);
    if (!v.muted) v.play().catch(() => {});
  };

  return (
    <section className="wrap py-16 md:py-24">
      <RevealOnScroll as="p" className="eyebrow mb-4">
        Medio minuto de lo que montamos
      </RevealOnScroll>
      <RevealOnScroll
        as="h2"
        delay={0.05}
        className="display mb-10 max-w-3xl text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-[#14283C]"
      >
        No te lo contamos. Míralo.
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ backgroundColor: NAVY }}
        >
          <video
            ref={videoRef}
            src={src}
            className="aspect-video w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
          />

          <button
            onClick={alternarSonido}
            aria-label={conSonido ? "Quitar el sonido" : "Poner el sonido"}
            className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:scale-110"
            style={{ backgroundColor: CYAN, color: NAVY }}
          >
            {conSonido ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                <path d="M16 9.5l4 5M20 9.5l-4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
