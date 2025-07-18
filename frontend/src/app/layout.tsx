"use client";

import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

import SidAIWidget from "@/components/SidAIWidget";
import { useState, useEffect } from "react";
import { getSessionId } from "@/utils/session";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidAI, setShowSidAI] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowSidAI(true), 1200); 
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          country: '',
          session_id: getSessionId(),
        }),
      });
    }
  }, []);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.variable} ${poppins.variable} font-inter`}>
        {children}
        {showSidAI && <SidAIWidget />}
      </body>
    </html>
  );
}