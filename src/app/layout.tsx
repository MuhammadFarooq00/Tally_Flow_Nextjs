
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./App.css";
import { Navigation } from "./components/Navigation";


import React from 'react';
import Providers from "./components/Providers";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: 'TallyFlow',
  description: 'A beautiful counter app for tracking anything',
  manifest: '/manifest.json',
  themeColor: '#39ffb0',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TallyFlow',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
       <html lang="en" suppressHydrationWarning={true}>
       <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#39ffb0" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TallyFlow" />
      </head>
      <body className="min-h-screen min-w-full overflow-y-auto app-light-bg dark:app-dark-gradient-bg custom-scrollbar">
        <Providers>
          <main className="relative z-10">{children}</main>
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
