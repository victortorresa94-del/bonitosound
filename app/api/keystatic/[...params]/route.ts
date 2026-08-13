import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

/**
 * La API que usa el panel para leer y escribir. En modo `github` es también la
 * que hace el intercambio de credenciales con la GitHub App, así que necesita
 * correr en servidor Node — no en el runtime edge.
 */
export const { POST, GET } = makeRouteHandler({ config });
