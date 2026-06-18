/**
 * Utilidad server-side para parsear los SVGs de "forma-<id>.svg" generados
 * por scripts/vectorize-mascot.mjs. Extrae los campos que el componente
 * cliente necesita inyectar inline (viewBox, silueta morfeable, grupos
 * shape y lettering serializados). Usa regex (los SVGs tienen un formato
 * conocido y simple) para no depender de un parser DOM en server.
 */

export type ParsedForm = {
  /** "0 0 W H" */
  viewBox: string;
  /** atributo d del <path id="silhouette"> dentro de <g id="shape"> */
  silhouetteD: string;
  /** style="color:#..." del <g id="shape"> */
  shapeStyle: string;
  /** innerHTML de <g id="shape">, ya sin el path id=silhouette */
  shapeInner: string;
  /** style="color:#..." del <g id="lettering"> */
  letteringStyle: string;
  /** innerHTML de <g id="lettering"> */
  letteringInner: string;
};

function extractGroup(
  svg: string,
  id: string
): { style: string; inner: string } | null {
  // Match en dos pasos para no depender del orden de atributos:
  // 1) localizar el <g id="ID" ...> de apertura y su tag completo
  // 2) sacar style="..." del header por separado y todo el inner hasta su </g>.
  // Asumimos que estos SVGs no anidan otro grupo con el mismo id dentro.
  const open = new RegExp(`<g\\b[^>]*\\bid="${id}"[^>]*>`);
  const o = svg.match(open);
  if (!o) return null;
  const headerEnd = (o.index ?? 0) + o[0].length;
  const closeIdx = svg.indexOf("</g>", headerEnd);
  if (closeIdx < 0) return null;
  const inner = svg.slice(headerEnd, closeIdx);
  const styleMatch = o[0].match(/\bstyle="([^"]*)"/);
  return { style: styleMatch ? styleMatch[1] : "", inner };
}

function extractSilhouetteD(svg: string): string {
  // Captura el <path id="silhouette" .../> en cualquier orden de atributos.
  const tag = svg.match(/<path\b[^>]*\bid="silhouette"[^>]*?\/>/);
  if (!tag) return "";
  const d = tag[0].match(/\bd="([^"]+)"/);
  return d ? d[1] : "";
}

function extractViewBox(svg: string): string {
  const m = svg.match(/viewBox="([^"]+)"/);
  return m ? m[1] : "0 0 100 100";
}

export function parseFormSvg(svgMarkup: string): ParsedForm {
  const viewBox = extractViewBox(svgMarkup);
  const silhouetteD = extractSilhouetteD(svgMarkup);
  const shape = extractGroup(svgMarkup, "shape") || { style: "", inner: "" };
  const lettering = extractGroup(svgMarkup, "lettering") || {
    style: "",
    inner: "",
  };
  // Quitamos el path id="silhouette" del shape inner (es la silueta oculta
  // que el cliente toma del campo silhouetteD por separado para morphear).
  const shapeInner = shape.inner.replace(
    /<path[^>]*\bid="silhouette"[^>]*\/>/g,
    ""
  );
  return {
    viewBox,
    silhouetteD,
    shapeStyle: shape.style,
    shapeInner,
    letteringStyle: lettering.style,
    letteringInner: lettering.inner,
  };
}
