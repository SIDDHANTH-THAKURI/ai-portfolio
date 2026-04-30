"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "github.com/SIDDHANTH-THAKURI", href: "https://github.com/SIDDHANTH-THAKURI" },
  { label: "linkedin.com/in/siddhanththakuri", href: "https://linkedin.com/in/siddhanththakuri" },
  { label: "leetcode.com/u/siddhanththakuri", href: "https://leetcode.com/u/siddhanththakuri" },
];

// Approach lights — 7 pairs converging toward horizon.
const approachLights = Array.from({ length: 7 }, (_, i) => {
  const t = i / 6; // 0 = far (near horizon), 1 = close (viewer end)
  const spread = 60 + t * 180;   // horizontal spread widens toward viewer
  const y = 40 + t * 140;        // vertical position, horizon at top
  const r = 1.5 + t * 3.5;      // dot size grows as they approach
  return { t, spread, y, r, delay: (6 - i) * 0.12 };
});

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-16 pt-[140px] md:px-12">
      {/* ── Runway scene ──────────────────────────────────────────── */}
      <div className="relative mx-auto mb-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          <svg
            viewBox="0 0 800 200"
            className="w-full"
            fill="none"
            aria-hidden
          >
            {/* Sky haze at top */}
            <defs>
              <linearGradient id="runway-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--sky)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--paper)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="runway-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.04" />
              </linearGradient>
              <radialGradient id="horizon-glow" cx="50%" cy="0%" r="55%">
                <stop offset="0%" stopColor="var(--sun)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--sun)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Horizon glow */}
            <ellipse cx="400" cy="35" rx="320" ry="55" fill="url(#horizon-glow)" />

            {/* Runway surface — two converging lines */}
            <path
              d="M 300,180 L 390,30 M 500,180 L 410,30"
              stroke="url(#runway-fade)"
              strokeWidth="1.5"
            />
            {/* Runway centre-line dashes, drawn in perspective */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const t0 = i / 6;
              const t1 = (i + 0.5) / 6;
              const x0 = 400 + (t0 - 0.5) * 0;
              const y0 = 30 + t0 * 150;
              const x1 = 400;
              const y1 = 30 + t1 * 150;
              const lw = 0.8 + t0 * 2;
              return (
                <motion.line
                  key={i}
                  x1={x0} y1={y0} x2={x1} y2={y1}
                  stroke="var(--amber)"
                  strokeOpacity="0.45"
                  strokeWidth={lw}
                  strokeDasharray={`${4 + t0 * 8} ${6 + t0 * 10}`}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease }}
                />
              );
            })}

            {/* Approach lights — two columns, pulsing in sequence */}
            {approachLights.map(({ spread, y, r, delay }, i) => (
              <g key={i}>
                {/* Left light */}
                <motion.circle
                  cx={400 - spread / 2}
                  cy={y}
                  r={r}
                  fill="var(--amber)"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.4,
                    delay: delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Right light */}
                <motion.circle
                  cx={400 + spread / 2}
                  cy={y}
                  r={r}
                  fill="var(--amber)"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.4,
                    delay: delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </g>
            ))}

            {/* LANDING stencil text at threshold */}
            <motion.text
              x="400"
              y="190"
              textAnchor="middle"
              fontSize="11"
              letterSpacing="8"
              fill="var(--ink)"
              fillOpacity="0.18"
              fontFamily="monospace"
              fontWeight="700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              LANDING
            </motion.text>

            {/* Horizon line */}
            <line x1="240" y1="32" x2="560" y2="32" stroke="var(--sky-deep)" strokeOpacity="0.35" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      {/* ── Contact content ────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 font-mono text-[12px] uppercase tracking-[0.28em] text-amber"
        >
          The Story · 06 · Final approach
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="font-display font-light italic leading-[1.02] text-ink"
          style={{ fontSize: "clamp(48px, 9vw, 120px)" }}
        >
          Let&apos;s build
          <br />
          something.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-14"
        >
          <a
            href="mailto:thakurisiddhanth1@gmail.com"
            className="group inline-flex items-baseline gap-3 font-display italic text-ink transition-colors duration-500 hover:text-amber"
            style={{ fontSize: "clamp(20px, 3vw, 36px)" }}
          >
            <span className="ink-underline">thakurisiddhanth1@gmail.com</span>
            <span
              aria-hidden
              className="font-body text-[14px] not-italic text-ink-soft transition-colors duration-500 group-hover:text-amber"
            >
              ↗
            </span>
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] text-ink-soft"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-amber"
              >
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Node constellation — projects as connected dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease, delay: 0.35 }}
          className="my-16"
          aria-hidden
        >
          <Constellation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="flex flex-col gap-3 border-t border-ink/12 pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-body text-[13px] text-ink-soft">
            Sydney, NSW · Open to remote · 485 Visa · Full work rights
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft/55">
            © {new Date().getFullYear()} Siddhanth Thakuri
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Project-names constellation — nodes connected by faint edges.
const nodes = [
  { label: "DrugNexusAI", x: 120, y: 40 },
  { label: "ShiftMate",   x: 310, y: 20 },
  { label: "WAYA",        x: 520, y: 50 },
  { label: "HireReady",   x: 680, y: 30 },
  { label: "AlgoViz",     x: 200, y: 95 },
  { label: "Demon Slayer",x: 430, y: 100 },
  { label: "Escape Vel.", x: 630, y: 90 },
];
const edges = [
  [0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 6], [1, 4], [2, 5], [3, 6],
];

function Constellation() {
  return (
    <svg viewBox="0 0 800 130" className="w-full opacity-60" fill="none">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="var(--ink)"
          strokeOpacity="0.12"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.07, ease }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x} cy={n.y} r="4"
            fill="var(--amber)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease }}
          />
          <motion.text
            x={n.x} y={n.y + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--ink-soft)"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          >
            {n.label}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}
