"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#m-story", label: "Story" },
  { href: "#m-work", label: "Work" },
  { href: "#m-path", label: "Path" },
  { href: "#m-skills", label: "Skills" },
  { href: "#m-contact", label: "Contact" },
];

export function MobileNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display italic text-[20px] tracking-tight text-ink transition-colors hover:text-amber"
          >
            Siddhanth<span className="text-amber">.</span>
          </a>

          <div className="flex items-center gap-2 rounded-full border border-amber/35 bg-amber/5 px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber/60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-amber/80">open to roles</span>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] text-ink"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[1.5px] w-5 origin-center bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[1.5px] w-5 bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[1.5px] w-5 origin-center bg-current"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-14 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur-md"
          >
            <nav className="flex flex-col px-5 pb-5 pt-3">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.045 }}
                  className="border-b border-ink/8 py-3.5 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-soft transition-colors last:border-0 hover:text-amber active:text-amber"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="/Siddhanth_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.22, delay: links.length * 0.045 }}
                className="mt-4 block border border-ink/25 px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-amber hover:text-amber"
              >
                ↓ Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
