"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Consolidado: hay UN solo formulario, el de /contacto (se adapta al artista
// con ?a=<slug>). /contratar se conserva solo como redirección para no romper
// enlaces antiguos. Se redirige en CLIENTE porque el export estático de IONOS
// Deploy Now no permite redirect() de servidor. Conserva el ?a=.
function Redirector() {
  const router = useRouter();
  const sp = useSearchParams();
  useEffect(() => {
    const a = sp.get("a");
    router.replace(a ? `/contacto?a=${encodeURIComponent(a)}` : "/contacto");
  }, [router, sp]);
  return null;
}

export default function Contratar() {
  return (
    <Suspense fallback={null}>
      <Redirector />
    </Suspense>
  );
}
