import "./globals.css";

import { Inter } from "next/font/google";
import { Metadata } from "next";

import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
