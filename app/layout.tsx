import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { CookieModal } from "@/components/layout/CookieModal";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

const geistSans = localFont({
  src: "./fonts/GeistSans.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://kylianjulia.fr";
const siteName = "Kylian JULIA";
const title = "Kylian JULIA — Étudiant ingénieur informatique";
const description =
  "Portfolio de Kylian JULIA, étudiant ingénieur informatique : projets, expériences, articles de blog.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Kylian JULIA",
  },
  description,
  keywords: [
    "Kylian JULIA",
    "ingénieur informatique",
    "développeur web",
    "portfolio",
    "cybersécurité",
    "blog tech",
  ],
  authors: [{ name: "Kylian JULIA", url: siteUrl }],
  creator: "Kylian JULIA",
  icons: {
    icon: "/images/favicon.ico",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kylian JULIA",
    url: siteUrl,
    jobTitle: "Étudiant ingénieur informatique",
    sameAs: ["https://projets.kylianjulia.fr"],
  };

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LoadingScreen />
          <Header />

          <main className="flex-1 pt-24 bg-background">
            {children}
          </main>

          <Footer />
          <Toaster position="top-right" richColors closeButton />
          <CookieModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
