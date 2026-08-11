import type { Metadata } from "next";
import { headers } from "next/headers";
import { LocaleProvider } from "@/components/LocaleProvider";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { Zilla_Slab, Fredoka, Caveat, Playfair_Display, Archivo } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { MotionProvider, PageTransitionShell } from "@/components/motion";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { getRadio } from "@/lib/audio";
import { site, memberships, team } from "@/lib/site";

// Display: Zilla Slab — slab serif tipo Clarendon (la referencia de Hello Monday
// es ClarendonBTWXX-Light). Editorial, con carácter, peso ligero para titulares
// grandes. Body: Geist (grotesca neutra, equivalente libre a NB International Pro).
const display = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Grotesca redondeada chunky para titulares display de /eventos (mockup).
const round = Fredoka({
  subsets: ["latin"],
  variable: "--font-round",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Manuscrita para los acentos "a mano" sobre el impreso (cabecera de gira).
// Se usa con MUCHA contención: una frase corta, nunca párrafos.
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
  weight: ["500", "600", "700"],
});

// Serif de ALTO CONTRASTE (fino/grueso muy marcado), para titulares que quieran
// sonar a revista y no a slab. Zilla Slab es robusta y uniforme; esta aporta el
// registro elegante que le falta.
const editorial = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: ["400", "700", "900"],
});

// Grotesca de peso alto para titulares tipo cartel: mete mucho texto en poco
// ancho sin encoger el cuerpo. Complementa a Fredoka, que es simpática pero ancha.
const cartel = Archivo({
  subsets: ["latin"],
  variable: "--font-cartel",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bonito Sound — Ecosistema cultural integral",
    template: "%s · Bonito Sound",
  },
  description: site.description,
  openGraph: {
    title: "Bonito Sound",
    description: site.description,
    url: site.url,
    siteName: "Bonito Sound",
    locale: "es_ES",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: site.url },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: "Bonito Sound",
    url: site.url,
    foundingDate: String(site.founded),
    taxID: site.cif,
    email: site.emails.general,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    founder: { "@type": "Person", name: "Dani Boada" },
    member: memberships.map((m) => ({ "@type": "Organization", name: m })),
    employee: team.map((t) => ({
      "@type": "Person",
      name: t.name,
      jobTitle: t.role,
    })),
    sameAs: [site.social.instagram, site.social.linkedin],
  };

  // El middleware marca las rutas /ca con esta cabecera. Decidir el idioma
  // AQUÍ (una sola vez, en servidor) es lo que evita que servidor y cliente
  // pinten cosas distintas y salten errores de hidratación.
  const locale: Locale = headers().get("x-locale") === "ca" ? "ca" : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      className={`${display.variable} ${round.variable} ${hand.variable} ${editorial.variable} ${cartel.variable} ${GeistSans.variable}`}
    >
      <body style={{ ["--font-body" as string]: "var(--font-geist-sans)" }}>
        <JsonLd data={orgLd} />
        <LocaleProvider locale={locale}>
        <MotionProvider>
          <PlayerProvider radio={getRadio()}>
            <Nav />
            <PageTransitionShell>
              <main>{children}</main>
            </PageTransitionShell>
            <Footer />
          </PlayerProvider>
        </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
