"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const socialLinks = [
  { label: "GitHub", href: "https://github.com/SIDDHANTH-THAKURI" },
  { label: "LinkedIn", href: "https://linkedin.com/in/siddhanththakuri" },
  { label: "LeetCode", href: "https://leetcode.com/u/siddhanththakuri" },
];

// Approach light pairs — 5 rows converging toward horizon
const approachLights = Array.from({ length: 5 }, (_, i) => {
  const t = i / 4;
  const spread = 30 + t * 95;
  const y = 18 + t * 78;
  const r = 0.9 + t * 2.4;
  return { spread, y, r, delay: (4 - i) * 0.14 };
});

export function MobileContact() {
  return (
    <section id="m-contact" className="relative overflow-hidden px-5 pb-10 pt-20">
      {/* ── Mini runway scene ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative mb-10"
        aria-hidden
      >
        <svg viewBox="0 0 400 120" className="w-full" fill="none">
          <defs>
            <linearGradient id="m-runway-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.03" />
            </linearGradient>
            <radialGradient id="m-horizon-glow" cx="50%" cy="0%" r="55%">
              <stop offset="0%" stopColor="var(--sun)" stopOpacity="0.38" />
              <stop offset="100%" stopColor="var(--sun)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Horizon glow */}
          <ellipse cx="200" cy="20" rx="190" ry="32" fill="url(#m-horizon-glow)" />

          {/* Runway edge lines — converging in perspective */}
          <path d="M 158,112 L 193,20 M 242,112 L 207,20" stroke="url(#m-runway-fade)" strokeWidth="1.2" />

          {/* Center-line dashes */}
          {[0, 1, 2, 3].map((i) => {
            const t0 = i / 4;
            const t1 = (i + 0.45) / 4;
            const y0 = 20 + t0 * 92;
            const y1 = 20 + t1 * 92;
            const lw = 0.5 + t0 * 1.8;
            return (
              <motion.line
                key={i}
                x1={200} y1={y0} x2={200} y2={y1}
                stroke="var(--amber)"
                strokeOpacity="0.45"
                strokeWidth={lw}
                strokeDasharray={`${3 + t0 * 6} ${4 + t0 * 8}`}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
              />
            );
          })}

          {/* Runway designation */}
          <motion.text
            x="200" y="97"
            textAnchor="middle"
            fontSize="8"
            letterSpacing="5"
            fill="var(--ink)"
            fillOpacity="0.13"
            fontFamily="monospace"
            fontWeight="700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.35 }}
          >
            27
          </motion.text>

          {/* LANDING stencil */}
          <motion.text
            x="200" y="110"
            textAnchor="middle"
            fontSize="7"
            letterSpacing="5"
            fill="var(--ink)"
            fillOpacity="0.13"
            fontFamily="monospace"
            fontWeight="700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.38 }}
          >
            LANDING
          </motion.text>

          {/* Horizon line */}
          <line x1="120" y1="20" x2="280" y2="20" stroke="var(--sky-deep)" strokeOpacity="0.28" strokeWidth="0.7" />

          {/* Approach lights */}
          {approachLights.map(({ spread, y, r, delay }, i) => (
            <g key={i}>
              <motion.circle
                cx={200 - spread / 2} cy={y} r={r}
                fill="var(--amber)"
                animate={{ opacity: [0.18, 1, 0.18] }}
                transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx={200 + spread / 2} cy={y} r={r}
                fill="var(--amber)"
                animate={{ opacity: [0.18, 1, 0.18] }}
                transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          ))}

          {/* Control tower silhouette */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            <line x1="310" y1="20" x2="310" y2="10" stroke="var(--ink)" strokeOpacity="0.25" strokeWidth="2" />
            <rect x="306" y="8" width="8" height="3" fill="var(--ink)" fillOpacity="0.18" />
            <rect x="304" y="3" width="12" height="5" fill="var(--sky)" fillOpacity="0.15" stroke="var(--ink)" strokeOpacity="0.22" strokeWidth="0.6" />
            <line x1="310" y1="3" x2="310" y2="0" stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="0.6" />
            <motion.circle
              cx="310" cy="0" r="1.2"
              fill="var(--amber)"
              animate={{ opacity: [0.15, 1, 0.15], r: [1, 1.8, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Jetliner — final approach descent */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.9 }}
          >
            <motion.g
              style={{ transformOrigin: "200px 20px" }}
              initial={{ scale: 0.14, y: 0 }}
              whileInView={{ scale: 1, y: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 3.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.9 }}
            >
              <motion.g
                style={{ transformOrigin: "200px 20px" }}
                animate={{ scale: [1, 1.05, 1, 0.97, 1], y: [0, -2, 0, 2, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Tail fin */}
                <rect x="199.5" y="12" width="1" height="4" rx="0.4" fill="var(--ink)" fillOpacity="0.5" />
                {/* Horizontal stab */}
                <path d="M 199,15.5 L 194,17 L 194.5,19 L 200,17.5 L 205.5,19 L 206,17 Z"
                  fill="var(--ink)" fillOpacity="0.55" />
                {/* Fuselage */}
                <path d="M 198.5,13.5 C 198,13 202,13 201.5,13.5 L 201.5,26.5 C 201.5,27 198.5,27 198.5,26.5 Z"
                  fill="var(--ink)" fillOpacity="0.72" />
                {/* Wings */}
                <path d="M 199.5,19.5 L 183,22.5 L 184.5,25.5 L 200,23 L 215.5,25.5 L 217,22.5 Z"
                  fill="var(--ink)" fillOpacity="0.65" />
                {/* Left engine */}
                <ellipse cx="190.5" cy="23" rx="3.5" ry="1.2" fill="var(--ink)" fillOpacity="0.58" />
                {/* Right engine */}
                <ellipse cx="209.5" cy="23" rx="3.5" ry="1.2" fill="var(--ink)" fillOpacity="0.58" />
                {/* Cockpit */}
                <ellipse cx="200" cy="25.5" rx="1.2" ry="1.5" fill="var(--sky)" fillOpacity="0.6" />
                {/* Landing light */}
                <motion.circle
                  cx="200" cy="27"
                  r="1"
                  fill="var(--amber)"
                  animate={{ opacity: [0.5, 1, 0.5], r: [0.8, 1.6, 0.8] }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>

      {/* ── Contact content ───────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-amber"
      >
        The Story · 06 · Final approach
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mb-10 font-display font-light italic leading-[1.02] text-ink"
        style={{ fontSize: "clamp(42px, 13vw, 72px)" }}
      >
        Let&apos;s build<br />something.
      </motion.h2>

      {/* Email CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease, delay: 0.12 }}
        className="mb-8"
      >
        <a
          href="mailto:thakurisiddhanth1@gmail.com"
          className="group block border border-ink/20 bg-paper/60 px-5 py-4 text-center font-mono text-[12px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm transition-all duration-300 hover:border-amber hover:text-amber active:scale-[0.98]"
        >
          thakurisiddhanth1@gmail.com
          <span aria-hidden className="ml-2 text-amber/70 transition-colors group-hover:text-amber">↗</span>
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease, delay: 0.22 }}
        className="mb-10 flex flex-col"
      >
        {socialLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-b border-ink/8 py-3.5 font-mono text-[12px] text-ink-soft transition-colors duration-300 hover:text-amber"
          >
            <span>{l.label}</span>
            <span aria-hidden className="text-amber/50">↗</span>
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
        className="flex items-center justify-between border-t border-ink/12 pt-8"
      >
        <p className="font-body text-[12px] text-ink-soft">
          Sydney · Open to remote · 485 Visa
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft/45">
          © {new Date().getFullYear()} ST
        </p>
      </motion.div>
    </section>
  );
}
