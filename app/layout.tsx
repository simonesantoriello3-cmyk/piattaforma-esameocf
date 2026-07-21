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
  title: "FormazioneOCF — Preparati alla Prova Valutativa OCF",
  description: "La piattaforma di riferimento per prepararti alla prova valutativa OCF. Oltre 5.000 domande aggiornate, simulazioni complete e allenamento mirato per superare l'esame.",
  alternates: {
    canonical: 'https://formazioneocf.com',
  },
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'hFhJHqfa75xSg2eD8R3LOBTXHIF0LSHvQEpb1kiukNs',
  },
  openGraph: {
    title: "FormazioneOCF — Preparati alla Prova Valutativa OCF",
    description: "Oltre 5.000 domande aggiornate, simulazioni complete e allenamento mirato per superare la prova valutativa OCF.",
    url: "https://formazioneocf.com",
    siteName: "FormazioneOCF",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "FormazioneOCF — Preparati alla Prova Valutativa OCF",
    description: "Oltre 5.000 domande aggiornate, simulazioni complete e allenamento mirato per superare la prova valutativa OCF.",
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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NDB6RZ54');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PH6D3M97LF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PH6D3M97LF');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDB6RZ54"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Navbar />
        <QuizProvider>
          <PageTransition>{children}</PageTransition>
        </QuizProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
