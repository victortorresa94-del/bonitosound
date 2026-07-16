import { redirect } from "next/navigation";

// Marketing vive ahora dentro de Records. Redirigimos la ruta antigua.
export default function Page() {
  redirect("/records/marketing");
}
