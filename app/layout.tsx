import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { MotionProvider, PageTransitionShell } from "@/components/motion";
import { site, memberships, team } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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

  return (
    <html lang="es" className={`${display.variable} ${GeistSans.variable}`}>
      <body style={{ ["--font-body" as string]: "var(--font-geist-sans)" }}>
        <JsonLd data={orgLd} />
        <MotionProvider>
          <Nav />
          <PageTransitionShell>
            <main>{children}</main>
          </PageTransitionShell>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
