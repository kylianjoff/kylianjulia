import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { CookieModal } from "@/components/layout/CookieModal";

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

export const metadata: Metadata = {
  title: "Kylian JULIA — Etudiant ingénieur informatique",
  description: "Site personnel de Kylian JULIA.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
