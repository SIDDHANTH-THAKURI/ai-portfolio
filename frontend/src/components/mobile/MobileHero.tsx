"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function MobileHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-24 pt-24"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10"
      >
        {/* Location strip */}
        <motion.div
          variants={fade}
          className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-ink-soft"
        >
          <span className="flex items-center gap-2">
            <span className="h-px w-6 bg-ink/40" />
            33.86°S · 151.21°E
          </span>
          <span className="text-amber/80">·</span>
          <span>Australia</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fade}
          className="font-display font-light italic leading-[0.92] tracking-tight text-ink"
          style={{ fontSize: "clamp(52px, 17vw, 84px)" }}
        >
          Siddhanth
          <br />
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--amber) 0%, var(--ink) 65%)",
              }}
            >
              Thakuri
            </span>
            {/* Amber underline draws in */}
            <svg
              className="pointer-events-none absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 400 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path
                d="M2,7 C80,2 180,10 260,5 C310,2 360,8 398,3"
                stroke="var(--amber)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.9, ease }}
              />
            </svg>
          </span>
        </motion.h1>

        {/* Live status chip */}
        <motion.div
          variants={fade}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-amber/60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          Software Engineer
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fade}
          className="mt-7 font-display italic text-ink"
          style={{ fontSize: "clamp(20px, 6.5vw, 28px)" }}
        >
          I build things from problems I&apos;ve actually lived.
        </motion.p>
        <motion.p
          variants={fade}
          className="mt-3 font-body text-[14px] leading-relaxed text-ink-soft"
        >
          Aero → Software · Enterprise .NET at Accenture · AI products from Australia.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fade} className="mt-10 flex flex-col gap-3">
          <a
            href="#m-story"
            className="group relative overflow-hidden bg-ink px-6 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-amber transition-transform duration-500 ease-out group-hover:translate-x-0"
            />
            <span className="relative">Read the story →</span>
          </a>
          <a
            href="#m-work"
            className="border border-ink/30 px-6 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-amber hover:text-amber"
          >
            View the work
          </a>
        </motion.div>

        {/* Mini flight-data strip */}
        <motion.dl
          variants={fade}
          className="mt-14 grid grid-cols-3 gap-x-4 border-t border-ink/15 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"
        >
          <div>
            <dt className="text-ink-soft/60">Heading</dt>
            <dd className="mt-1 text-ink">Aero → SW</dd>
          </div>
          <div>
            <dt className="text-ink-soft/60">Ships</dt>
            <dd className="mt-1 text-ink">6 · 2 live</dd>
          </div>
          <div>
            <dt className="text-ink-soft/60">Status</dt>
            <dd className="mt-1 text-amber">In flight</dd>
          </div>
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 left-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft/55"
      >
        <span className="h-px w-8 bg-ink-soft/40" />
        Begin descent
      </motion.div>

      {/* Decorative compass — top right, faint */}
      <motion.svg
        initial={{ opacity: 0, rotate: -15 }}
        animate={{ opacity: 0.35, rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.7, ease }}
        className="pointer-events-none absolute right-4 top-20 h-20 w-20"
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
        <text x="60" y="14" textAnchor="middle" fontSize="8" fill="var(--blueprint)" fontFamily="monospace">N</text>
      </motion.svg>
    </section>
  );
}
