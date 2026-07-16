import { redirect } from "next/navigation";

// La página de marketing canónica la lleva la sesión principal en /marketing.
// Redirigimos para no duplicar contenido.
export default function Page() {
  redirect("/marketing");
}
