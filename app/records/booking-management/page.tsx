import { redirect } from "next/navigation";

// Booking y Management ahora son páginas separadas. Redirigimos la antigua.
export default function Page() {
  redirect("/records/booking");
}
