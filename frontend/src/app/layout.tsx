import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Siddhanth Thakuri | Software Engineer & AI Developer",
  description: "The professional portfolio of Siddhanth Thakuri, a software engineer specializing in full-stack development and AI solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${poppins.variable} font-inter`}>
        {children}
      </body>
    </html>
  );
}