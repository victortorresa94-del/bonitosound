import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Proxy temporal para scrape desde el sandbox de Claude Code.
 * Solo permite hosts pre-aprobados (jaleosound, wixstatic, instagram cdn).
 *
 * Uso:
 *   /api/proxy?url=https://jaleosound.com           → devuelve HTML como texto
 *   /api/proxy?url=https://…/foto.jpg&binary=1     → devuelve base64
 *
 * BORRAR DESPUÉS DE USAR. Endpoint público sin autenticación.
 */

const ALLOWED = [
  "jaleosound.com",
  "www.jaleosound.com",
  "static.wixstatic.com",
  "wixstatic.com",
  "spainculture.nl",
  "www.spainculture.nl",
  "instagram.com",
  "www.instagram.com",
  "cdninstagram.com",
  "hellomonday.com",
  "www.hellomonday.com",
];

export async function GET(req: Request) {
  const u = new URL(req.url);
  const target = u.searchParams.get("url");
  const binary = u.searchParams.get("binary") === "1";

  if (!target) {
    return NextResponse.json({ error: "missing url" }, { status: 400 });
  }
  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: "bad url" }, { status: 400 });
  }
  const host = parsed.hostname.toLowerCase();
  if (!ALLOWED.some((h) => host === h || host.endsWith("." + h))) {
    return NextResponse.json(
      { error: "host not allowed", host, allowed: ALLOWED },
      { status: 403 },
    );
  }

  try {
    const res = await fetch(parsed.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
      redirect: "follow",
    });
    const contentType = res.headers.get("content-type") ?? "";

    if (binary) {
      const buf = Buffer.from(await res.arrayBuffer());
      return NextResponse.json({
        ok: res.ok,
        status: res.status,
        contentType,
        bytes: buf.length,
        base64: buf.toString("base64"),
      });
    }

    const text = await res.text();
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      contentType,
      length: text.length,
      body: text,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "fetch failed", message: e instanceof Error ? e.message : String(e) },
      { status: 502 },
    );
  }
}
