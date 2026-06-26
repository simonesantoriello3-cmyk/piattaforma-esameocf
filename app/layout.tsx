import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import { QuizProvider } from "@/lib/quiz-context";
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import CookieBanner from '@/components/CookieBanner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FormazioneRUI — Preparati all'Esame RUI",
  description: "La piattaforma di riferimento per superare l'esame di iscrizione al Registro Unico degli Intermediari assicurativi e riassicurativi. 2.292 domande ufficiali e simulazioni.",
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'VP_j0JZ3xXhCtQTkxbRLztUzeb4Ib9eDGbkmfs1nVAU',
  },
  openGraph: {
    title: "FormazioneRUI — Preparati all'Esame RUI",
    description: "2.292 domande ufficiali e simulazioni per superare l'esame RUI.",
    url: "https://formazionerui.com",
    siteName: "FormazioneRUI",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HR7XQ67414"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HR7XQ67414');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <Navbar />
        <QuizProvider>
          <PageTransition>{children}</PageTransition>
        </QuizProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
