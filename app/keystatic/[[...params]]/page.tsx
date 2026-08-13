import { makePage } from "@keystatic/next/ui/app";
import config from "@/keystatic.config";

// El panel no se indexa jamás: es una herramienta interna.
export const metadata = { robots: { index: false, follow: false } };

export default makePage(config);
