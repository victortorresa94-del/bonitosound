import { redirect } from "next/navigation";

// Consolidado: hay UN solo formulario, el de /contacto (se adapta al artista
// con ?a=<slug>). /contratar se conserva solo como redirección para no romper
// enlaces antiguos.
type SP = { searchParams: { a?: string } };

export default function Contratar({ searchParams }: SP) {
  const a = typeof searchParams.a === "string" ? searchParams.a : undefined;
  redirect(a ? `/contacto?a=${encodeURIComponent(a)}` : "/contacto");
}
