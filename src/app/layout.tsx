import "./globals.css";

import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import localFont from "next/font/local";

import Navbar from "@/components/Navbar"
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const urbane = localFont({
  src: '../../public/Urbane-Medium.ttf',
  display: 'swap',
  variable: '--font-urbane',
});

const productSans = localFont({
  src: '../../public/Product-Sans.ttf',
  display: 'swap',
  variable: '--font-productsans',
});

export const metadata: Metadata = {
  title: "Gursimran Singh | Portfolio",
  description: "Building modern web experiences with Next.js, Tailwind, and passion.",
  metadataBase: new URL("https://gursimran.me"),
  openGraph: {
    title: "Gursimran Singh | Portfolio",
    description: "Explore my work and projects as a modern web developer.",
    url: "https://gursimran.me",
    siteName: "Gursimran Singh",
    images: [
      {
        url: "https://gursimran.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gursimran Singh Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gursimran Singh | Portfolio",
    description: "Building modern web experiences with Next.js, Tailwind, and passion.",
    images: ["https://gursimran.me/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${urbane.variable} ${productSans.variable}`} 
      suppressHydrationWarning={true}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
      </head>
      <body className="min-h-screen antialiased font-urbane overflow-x-hidden">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <ScrollToTopButton />
          <Analytics />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
