import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { SkyScape } from "@/components/SkyScape";
import { Atmosphere } from "@/components/Atmosphere";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Analytics } from "@vercel/analytics/next";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siddhanth Thakuri — Software Engineer",
  description:
    "I build things from problems I've actually lived. Enterprise .NET at Accenture · Now shipping AI products from Sydney.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {/* Fixed background layers — lowest z. */}
        <SkyScape />
        {/* Particle + plane canvas — sits above backdrops, below content. */}
        <Atmosphere />
        {children}
        {/* Ambient music player — fixed bottom-right, opt-in. */}
        <MusicPlayer />
        <Analytics />
      </body>
    </html>
  );
}
