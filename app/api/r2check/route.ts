import { NextResponse } from "next/server";
import { r2 } from "@/lib/site";

// Diagnóstico temporal: comprueba desde el servidor (Vercel, que SÍ llega a R2)
// si el bucket sirve los vídeos y con qué cabeceras. Borrar tras diagnosticar.
export const dynamic = "force-dynamic";

const KEYS = [
  "corona.mp4",
  "schweppes.mp4",
  "tequila-codigo.mp4",
  "pepsi.mp4",
  "resumen-bonito.mp4",
  "entrevista-dani.mp4",
];

export async function GET() {
  const results = await Promise.all(
    KEYS.map(async (key) => {
      const url = r2(key);
      try {
        const res = await fetch(url, { method: "GET", headers: { Range: "bytes=0-1" } });
        return {
          key,
          status: res.status,
          ok: res.ok,
          contentType: res.headers.get("content-type"),
          acceptRanges: res.headers.get("accept-ranges"),
          contentLength: res.headers.get("content-length"),
          contentRange: res.headers.get("content-range"),
          cors: res.headers.get("access-control-allow-origin"),
        };
      } catch (e) {
        return { key, error: String(e) };
      }
    })
  );
  return NextResponse.json({ base: r2(""), results }, { headers: { "cache-control": "no-store" } });
}
