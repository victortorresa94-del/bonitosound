import { redirect } from "next/navigation";

// El hub de proyectos propios pasó a llamarse "Universo Bonito" (/universo).
// Mantenemos las fichas /lab/artiverse y /lab/giraverse y redirigimos el índice.
export default function Lab() {
  redirect("/universo");
}
