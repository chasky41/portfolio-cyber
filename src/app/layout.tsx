import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { AppProvider } from "@/lib/app-context";
import { profile, site } from "@/data/profile";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const title = "Charaf-Eddine BERHILI · Portfolio cybersécurité (GRC, SOC, pentest)";
const description =
  "Étudiant M2 OPSIE (Lyon 2, SecNumÉdu) en recherche d'un stage de fin d'études de 6 mois en cybersécurité dès fin mars 2027 : GRC, gestion des risques, SOC, pentest, DevSecOps. · Cybersecurity portfolio, 6-month internship from late March 2027.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/", languages: { fr: "/", en: "/" } },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  authors: [{ name: site.name }],
};

export const viewport: Viewport = {
  themeColor: "#12294a",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  email: `mailto:${profile.email}`,
  jobTitle: "Étudiant M2 Informatique OPSIE, recherche stage cybersécurité",
  address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: "FR" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Université Lumière Lyon 2" },
    { "@type": "EducationalOrganization", name: "ESIC Paris" },
  ],
  knowsAbout: ["Cybersécurité", "GRC", "Gestion des risques", "SOC", "Pentest", "DevSecOps", "ISO 27001", "EBIOS RM"],
  knowsLanguage: ["fr", "en", "ar"],
  sameAs: [profile.linkedin, profile.github, profile.tryhackme],
};

// Amorce du thème avant le premier rendu (évite le flash). Autorisé par le nonce de la CSP.
const themeBootstrap = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;else if(window.matchMedia("(prefers-color-scheme: light)").matches)document.documentElement.dataset.theme="light"}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\u003c") }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="bg-grid" aria-hidden="true" />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
