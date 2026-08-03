import { NextResponse, type NextRequest } from "next/server";

/**
 * Rutas en catalán sin duplicar páginas.
 *
 * El catalán vive en /ca/... pero NO hay una carpeta app/ca con 35 páginas
 * clonadas: eso obligaría a mantener dos árboles en paralelo y acabarían
 * desincronizándose. En vez de eso, /ca/giras se REESCRIBE internamente a
 * /giras — se sirve la misma página— y el idioma se deduce del pathname
 * original con getLocale(), que es lo que leen el menú y los componentes.
 *
 * La URL que ve el usuario sigue siendo /ca/giras: la reescritura es interna.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/ca" || pathname.startsWith("/ca/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/ca" ? "/" : pathname.slice(3);

    // El componente ya no puede leer /ca del pathname una vez reescrito, así
    // que el idioma viaja en una cabecera para quien la necesite en servidor.
    const res = NextResponse.rewrite(url);
    res.headers.set("x-locale", "ca");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // Fuera del middleware todo lo que no es una página: estáticos, imágenes,
  // API y ficheros con extensión. Así no se paga el coste en cada asset.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
