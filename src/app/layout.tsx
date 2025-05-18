import "./globals.css";

import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import localFont from "next/font/local";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const urbane = localFont({
  src: [
    { path: "../../public/Urbane-Medium.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-urbane",
  weight: "400",
  display: "swap",
});

const product = localFont({
  src: [
    { path: "../../public/Product-Sans.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-product",
  weight: "400",
  display: "swap",
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
      className={`${urbane.variable} ${product.variable} antialiased overflow-x-hidden`}
      suppressHydrationWarning={true}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`min-h-screen`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <ScrollToTopButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
    
  );
}
