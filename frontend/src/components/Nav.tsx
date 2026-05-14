"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#origin", label: "Story" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Path" },
  { href: "#skills", label: "Skills" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <a
          href="#top"
          className="font-display italic text-[22px] tracking-tight text-ink transition-colors duration-300 hover:text-amber"
        >
          Siddhanth<span className="text-amber">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/Siddhanth_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ink/25 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            ↓ Resume
          </a>
          <a
            href="#contact"
            className="group relative overflow-hidden border border-ink/25 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            Say hello →
          </a>
        </div>
      </div>
    </motion.header>
  );
}
