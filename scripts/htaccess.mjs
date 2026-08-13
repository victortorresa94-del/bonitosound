/**
 * Saca los redirects de next.config.mjs en formato .htaccess de Apache.
 *
 * Solo hace falta si la web acaba en el webspace clásico de IONOS: ahí no corre
 * Next, así que `redirects()` no existe y las 234 URLs viejas del WordPress se
 * quedarían en 404 el día del cambio. Ver docs/DESPLIEGUE.md.
 *
 *   node scripts/htaccess.mjs > .htaccess
 */
import config from "../next.config.mjs";

const reglas = await config.redirects();

/** `/artista/:slug` -> `^artista/([^/]+)/?$`, y `:path*` -> `(.*)`. */
function aRegex(source) {
  let n = 0;
  const cuerpo = source
    .replace(/^\//, "")
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:[a-zA-Z]+\*/g, () => { n++; return "(.*)"; })
    .replace(/:[a-zA-Z]+/g, () => { n++; return "([^/]+)"; });
  return { regex: `^${cuerpo}/?$`, grupos: n };
}

/** `/artistas/:slug` -> `/artistas/$1`, en el orden en que aparecen. */
function aDestino(destination) {
  let i = 0;
  return destination.replace(/:[a-zA-Z]+\*?/g, () => `$${++i}`);
}

const lineas = [
  "# Generado por scripts/htaccess.mjs — NO editar a mano.",
  "# Sale de los redirects de next.config.mjs. Si tocas aquellos, vuelve a",
  "# ejecutar el script en vez de retocar este fichero.",
  "",
  "<IfModule mod_rewrite.c>",
  "RewriteEngine On",
  "",
];

for (const r of reglas) {
  const { regex } = aRegex(r.source);
  const destino = aDestino(r.destination);
  const codigo = r.statusCode ?? (r.permanent ? 301 : 302);
  lineas.push(`RewriteRule ${regex} ${destino} [R=${codigo},L]`);
}

lineas.push("", "</IfModule>", "");
process.stdout.write(lineas.join("\n"));
