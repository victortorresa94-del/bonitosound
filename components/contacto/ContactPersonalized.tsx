"use client";

/**
 * Personalización de /contacto según `?a=<slug>` (al clicar "Contratar" en una
 * ficha de artista). Antes se leía en el SERVIDOR (searchParams), pero eso
 * impide el export estático de IONOS Deploy Now. Ahora se lee en CLIENTE con
 * useSearchParams (envuelto en Suspense, requisito de Next para export).
 *
 * El servidor pasa el mapa de artistas (slug→nombre/género) ya resuelto, así
 * que en cliente es solo un lookup — sin fetch, sin backend.
 */
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";

export type ContactArtist = { slug: string; name: string; genre: string };

const NAVY = "#14283C";

function useArtistFromQuery(artists: ContactArtist[]) {
  const slug = useSearchParams().get("a") ?? undefined;
  const found = slug ? artists.find((a) => a.slug === slug) : undefined;
  return found ? { name: found.name, genre: found.genre } : undefined;
}

function GenericIntro() {
  return <>Cuéntanos tu proyecto, tu idea o lo que necesites. Te respondemos rápido, y por personas.</>;
}

function IntroInner({ artists }: { artists: ContactArtist[] }) {
  const artist = useArtistFromQuery(artists);
  if (!artist) return <GenericIntro />;
  return (
    <>
      Cuéntanos el bolo para{" "}
      <span className="font-semibold" style={{ color: NAVY }}>{artist.name}</span>: fecha, sitio y
      qué tienes en mente. Te respondemos rápido, y por personas.
    </>
  );
}

/** Línea de intro (personalizada si hay ?a=, genérica si no). */
export function ContactIntro({ artists }: { artists: ContactArtist[] }) {
  return (
    <Suspense fallback={<GenericIntro />}>
      <IntroInner artists={artists} />
    </Suspense>
  );
}

function FormInner({ artists }: { artists: ContactArtist[] }) {
  const artist = useArtistFromQuery(artists);
  return <ContactForm artist={artist} />;
}

/** Formulario que se adapta al artista de ?a= (o general si no hay). */
export function ContactFormDynamic({ artists }: { artists: ContactArtist[] }) {
  return (
    <Suspense fallback={<ContactForm />}>
      <FormInner artists={artists} />
    </Suspense>
  );
}
