"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const fade = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-32 pt-40 md:px-12 md:pt-44"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        {/* Coordinates strip — flight-deck instrument feel */}
        <motion.div
          variants={fade}
          className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft"
        >
          <span className="flex items-center gap-2">
            <span className="h-px w-8 bg-ink/40" />
            33.86°S · 151.21°E
          </span>
          <span className="text-amber/80">·</span>
          <span>Software Engineer</span>
          <span className="text-amber/80">·</span>
          <span>Australia</span>
        </motion.div>

        {/* Name — italic Cormorant on cream, with a sun-warm gradient on the surname. */}
        <motion.h1
          variants={fade}
          className="font-display font-light italic leading-[0.92] tracking-tight text-ink"
          style={{ fontSize: "clamp(56px, 11vw, 138px)" }}
        >
          Siddhanth
          <br />
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--amber) 0%, var(--ink) 70%)",
              }}
            >
              Thakuri
            </span>
            {/* Hand-drawn underline that draws in. */}
            <svg
              className="pointer-events-none absolute -bottom-3 left-0 w-full"
              height="14"
              viewBox="0 0 600 14"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d="M2,9 C120,2 260,12 380,6 C460,2 540,9 598,4"
                stroke="var(--amber)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 1.0, ease }}
              />
            </svg>
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fade}
          className="mt-12 max-w-xl font-display italic text-ink"
          style={{ fontSize: "clamp(20px, 2.4vw, 26px)" }}
        >
          I build things from problems I&apos;ve actually lived.
        </motion.p>
        <motion.p
          variants={fade}
          className="mt-3 max-w-xl font-body text-[15px] text-ink-soft"
        >
          Aeronautical engineer turned software engineer · Enterprise .NET at
          Accenture · Now shipping AI products from Australia.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fade} className="mt-12 flex flex-wrap gap-4">
          <a
            href="#origin"
            className="group relative inline-flex items-center gap-2 overflow-hidden bg-ink px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-paper transition-colors duration-500 hover:text-paper"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-amber transition-transform duration-500 ease-out group-hover:translate-x-0"
            />
            <span className="relative">Read the story</span>
            <span aria-hidden className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 border border-ink/30 bg-paper/40 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink backdrop-blur-sm transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            View the work
          </a>
        </motion.div>

        {/* Flight-data strip */}
        <motion.dl
          variants={fade}
          className="mt-20 grid max-w-3xl grid-cols-3 gap-x-6 gap-y-4 border-t border-ink/15 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft md:gap-x-12"
        >
          <div>
            <dt className="text-ink-soft/70">Heading</dt>
            <dd className="mt-1 text-ink">Aero → Software</dd>
          </div>
          <div>
            <dt className="text-ink-soft/70">Altitude</dt>
            <dd className="mt-1 text-ink">6 ships · 2 live</dd>
          </div>
          <div>
            <dt className="text-ink-soft/70">Status</dt>
            <dd className="mt-1 flex items-center gap-2 text-amber">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-amber/60" />
                <span className="relative h-2 w-2 rounded-full bg-amber" />
              </span>
              In flight
            </dd>
          </div>
        </motion.dl>
      </motion.div>

      {/* Compass mark — subtle blueprint flourish, top-left */}
      <motion.svg
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.55, rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease }}
        className="pointer-events-none absolute right-6 top-28 hidden h-32 w-32 md:block md:right-12 md:top-32"
        viewBox="0 0 120 120"
        fill="none"
        stroke="var(--blueprint)"
        strokeWidth="1"
        aria-hidden
      >
        <circle cx="60" cy="60" r="56" />
        <circle cx="60" cy="60" r="40" />
        <circle cx="60" cy="60" r="2" fill="var(--blueprint)" />
        <path d="M60,4 L60,18 M60,102 L60,116 M4,60 L18,60 M102,60 L116,60" />
        <path d="M22,22 L32,32 M88,22 L78,32 M22,98 L32,88 M88,98 L78,88" strokeDasharray="2 3" />
        <text x="60" y="14" textAnchor="middle" fontSize="7" fill="var(--blueprint)" fontFamily="monospace">N</text>
        <text x="60" y="112" textAnchor="middle" fontSize="7" fill="var(--blueprint)" fontFamily="monospace">S</text>
      </motion.svg>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-10 left-6 z-10 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft md:left-12 md:flex"
      >
        <span className="h-px w-10 bg-ink-soft/50" />
        Begin descent
      </motion.div>
    </section>
  );
}
