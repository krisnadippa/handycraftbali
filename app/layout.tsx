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
  title: "GLORIOUS — Kerajinan Tangan Bali",
  description: "Koleksi kerajinan tangan premium dari pengrajin terpilih Bali. Temukan ukiran kayu, tenun, perhiasan, dan dekorasi rumah autentik.",
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
