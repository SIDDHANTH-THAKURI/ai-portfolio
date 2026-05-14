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
  const t = i / 6;
  const spread = 60 + t * 180;
  const y = 40 + t * 140;
  const r = 1.5 + t * 3.5;
  return { t, spread, y, r, delay: (6 - i) * 0.12 };
});

// Threshold bars — 4 per side flanking the centerline
const thresholdBarsLeft  = [310, 325, 340, 355];
const thresholdBarsRight = [435, 450, 465, 480];

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
          {/* ATIS instrument readout — top right */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 1.4 }}
            className="absolute right-0 top-2 z-10 border border-ink/10 bg-paper/50 px-3 py-2 font-mono text-[8px] leading-[1.85] text-ink-soft/45 backdrop-blur-sm"
          >
            <p className="mb-0.5 tracking-[0.2em] text-amber/55">ATIS · YSSY · INFO K</p>
            <p>RWY 27 IN USE</p>
            <p>WIND 270/08KT</p>
            <p>VIS 10KM CAVOK</p>
            <p>QNH 1013 HPA</p>
          </motion.div>

          <svg viewBox="0 0 800 200" className="w-full" fill="none" aria-hidden>
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

            {/* ── Control tower silhouette ────────────────────────────── */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
            >
              {/* Base shaft */}
              <line x1="606" y1="32" x2="606" y2="20" stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="3" />
              {/* Observation deck */}
              <rect x="601" y="18" width="10" height="3" fill="var(--ink)" fillOpacity="0.22" />
              {/* Control cab */}
              <rect x="597" y="9" width="18" height="9" fill="var(--sky)" fillOpacity="0.18" stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="0.8" />
              {/* Window dividers */}
              <line x1="603" y1="9" x2="603" y2="18" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.6" />
              <line x1="609" y1="9" x2="609" y2="18" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.6" />
              <line x1="615" y1="9" x2="615" y2="18" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.6" />
              {/* Antenna */}
              <line x1="606" y1="9" x2="606" y2="2" stroke="var(--ink)" strokeOpacity="0.32" strokeWidth="0.8" />
              {/* Rotating beacon — pulsing amber */}
              <motion.circle
                cx="606" cy="2" r="1.8"
                fill="var(--amber)"
                animate={{ opacity: [0.15, 1, 0.15], r: [1.5, 2.2, 1.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.g>

            {/* Runway surface — two converging edge lines */}
            <path
              d="M 300,180 L 390,30 M 500,180 L 410,30"
              stroke="url(#runway-fade)"
              strokeWidth="1.5"
            />

            {/* Runway centre-line dashes in perspective */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const t0 = i / 6;
              const t1 = (i + 0.5) / 6;
              const y0 = 30 + t0 * 150;
              const y1 = 30 + t1 * 150;
              const lw = 0.8 + t0 * 2;
              return (
                <motion.line
                  key={i}
                  x1={400} y1={y0} x2={400} y2={y1}
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

            {/* ── Touchdown zone markers ─────────────────────────────── */}
            {/* Pair 1 — far (y=143) */}
            {[[-72, 54], [18, 54]].map(([offsetX, w], i) => (
              <motion.rect
                key={`tdz1-${i}`}
                x={400 + offsetX} y={141} width={w} height={4}
                fill="var(--ink)" fillOpacity="0.12" rx="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.45 }}
              />
            ))}
            {/* Pair 2 — near (y=155) */}
            {[[-80, 60], [20, 60]].map(([offsetX, w], i) => (
              <motion.rect
                key={`tdz2-${i}`}
                x={400 + offsetX} y={154} width={w} height={5}
                fill="var(--ink)" fillOpacity="0.13" rx="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.48 }}
              />
            ))}

            {/* ── Runway designation "27" ────────────────────────────── */}
            <motion.text
              x="400" y="167"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="6"
              fill="var(--ink)"
              fillOpacity="0.15"
              fontFamily="monospace"
              fontWeight="700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.42 }}
            >
              27
            </motion.text>

            {/* ── Threshold bars ─────────────────────────────────────── */}
            {thresholdBarsLeft.map((x, i) => (
              <motion.rect
                key={`tl-${i}`}
                x={x} y={171} width={10} height={5}
                fill="var(--ink)" fillOpacity="0.13" rx="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.38 + i * 0.04 }}
              />
            ))}
            {thresholdBarsRight.map((x, i) => (
              <motion.rect
                key={`tr-${i}`}
                x={x} y={171} width={10} height={5}
                fill="var(--ink)" fillOpacity="0.13" rx="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: 0.38 + i * 0.04 }}
              />
            ))}

            {/* Approach lights — two columns, pulsing in sequence */}
            {approachLights.map(({ spread, y, r, delay }, i) => (
              <g key={i}>
                <motion.circle
                  cx={400 - spread / 2} cy={y} r={r}
                  fill="var(--amber)"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx={400 + spread / 2} cy={y} r={r}
                  fill="var(--amber)"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>
            ))}

            {/* LANDING stencil text */}
            <motion.text
              x="400" y="190"
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
              transition={{ duration: 0.8, ease, delay: 0.4 }}
            >
              LANDING
            </motion.text>

            {/* Horizon line */}
            <line x1="240" y1="32" x2="560" y2="32" stroke="var(--sky-deep)" strokeOpacity="0.35" strokeWidth="1" />

            {/* ── Jetliner — final approach & touchdown ──────────────── */}
            {/* Outer fades in; inner animates scale + descent */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.8 }}
            >
              <motion.g
                style={{ transformOrigin: "400px 35px" }}
                initial={{ scale: 0.13, y: 0 }}
                whileInView={{ scale: 1, y: 126 }}
                viewport={{ once: true }}
                transition={{ duration: 3.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 }}
              >
              {/* Gentle depth-pulse wobble — loops forever, stacks on top of descent */}
              <motion.g
                style={{ transformOrigin: "400px 35px" }}
                animate={{ scale: [1, 1.05, 1, 0.96, 1], y: [0, -3, 0, 3, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
              >
                {/* Vertical tail fin */}
                <rect x="399" y="21" width="2" height="7" rx="0.8"
                  fill="var(--ink)" fillOpacity="0.5" />
                {/* Horizontal tail stabilizer */}
                <path d="M 399,27 L 390,29 L 391,32 L 400,30 L 409,32 L 410,29 Z"
                  fill="var(--ink)" fillOpacity="0.55" />
                {/* Fuselage — tapered nose-down, cockpit at bottom */}
                <path d="M 397,24 C 396,23 404,23 403,24 L 403,47 C 403,48 397,48 397,47 Z"
                  fill="var(--ink)" fillOpacity="0.72" />
                {/* Main wings — swept back */}
                <path d="M 399,33 L 366,40 L 369,44 L 400,37 L 431,44 L 434,40 Z"
                  fill="var(--ink)" fillOpacity="0.66" />
                {/* Engine nacelle — left */}
                <ellipse cx="381" cy="41" rx="6" ry="2.2" fill="var(--ink)" fillOpacity="0.6" />
                <ellipse cx="381" cy="43" rx="3.5" ry="1" fill="var(--ink)" fillOpacity="0.25" />
                {/* Engine nacelle — right */}
                <ellipse cx="419" cy="41" rx="6" ry="2.2" fill="var(--ink)" fillOpacity="0.6" />
                <ellipse cx="419" cy="43" rx="3.5" ry="1" fill="var(--ink)" fillOpacity="0.25" />
                {/* Cockpit windows — nose faces the runway */}
                <ellipse cx="400" cy="43.5" rx="1.8" ry="2.5"
                  fill="var(--sky)" fillOpacity="0.6" />
                {/* Landing light — pulsing amber at nose tip */}
                <motion.circle
                  cx="400" cy="47.5" r="1.5"
                  fill="var(--amber)"
                  animate={{ opacity: [0.5, 1, 0.5], r: [1.2, 2.2, 1.2] }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>{/* end wobble */}
              </motion.g>
            </motion.g>

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
            Australia
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
  { label: "Job Hunter",  x: 30,  y: 55 },
  { label: "DrugNexusAI", x: 150, y: 30 },
  { label: "ShiftMate",   x: 310, y: 15 },
  { label: "WAYA",        x: 490, y: 45 },
  { label: "HireReady",   x: 680, y: 25 },
  { label: "AlgoViz",     x: 210, y: 100 },
  { label: "Demon Slayer",x: 420, y: 105 },
  { label: "Escape Vel.", x: 630, y: 95 },
];
const edges = [
  [0, 1], [0, 5], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6], [6, 7], [2, 5], [3, 6], [4, 7],
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
