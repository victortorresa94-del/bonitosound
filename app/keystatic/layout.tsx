/**
 * El panel de Keystatic vive fuera de la web: sin cabecera, sin pie y sin la
 * radio flotante. Este layout corta el del sitio para que la interfaz de
 * edición ocupe la pantalla entera y no se mezcle con la marca.
 */
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
