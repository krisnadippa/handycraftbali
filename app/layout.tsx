import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aquarius Bali Craft — Kerajinan Tangan Bali",
  description: "Koleksi kerajinan tangan premium dari pengrajin terpilih Bali. Temukan ukiran kayu, tenun, perhiasan, dan dekorasi rumah autentik.",
  keywords: ["kerajinan tangan", "Bali", "ukiran kayu", "tenun", "dekorasi rumah", "souvenir Bali", "AquariusBaliCraft"],
  authors: [{ name: "AquariusBaliCraft" }],
  openGraph: {
    title: "Aquarius Bali Craft — Kerajinan Tangan Bali",
    description: "Koleksi kerajinan tangan premium dari pengrajin terpilih Bali. Temukan ukiran kayu, tenun, perhiasan, dan dekorasi rumah autentik.",
    url: "https://glorious-bali.vercel.app",
    siteName: "Aquarius Bali Craft",
    images: [
      {
        url: "/images/logo3.png",
        width: 800,
        height: 800,
        alt: "Aquarius Bali Craft Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aquarius Bali Craft — Kerajinan Tangan Bali",
    description: "Koleksi kerajinan tangan premium dari pengrajin terpilih Bali.",
    images: ["/images/logo3.png"],
  },
  icons: {
    icon: "/images/logo3.png",
    shortcut: "/images/logo3.png",
    apple: "/images/logo3.png",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(playfair.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
