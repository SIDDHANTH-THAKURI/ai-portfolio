"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Entry = {
  year: string;
  title: string;
  subtitle?: string;
  bullets?: (string | { text: string; highlight?: boolean; href?: string })[];
  accent?: boolean;
};

const entries: Entry[] = [
  {
    year: "Jan 2026 – Present",
    title: "Professional Year — ICT",
    subtitle: "QIBA · Sydney, NSW, Australia",
    bullets: [
      "Information and Communication Technology stream",
      "Industry placement + professional skills development",
    ],
  },
  {
    year: "2023 – 2025",
    title: "Master of Computer Science",
    subtitle: "University of Wollongong · Wollongong, NSW, Australia · ML + Big Data",
    bullets: [
      "Distinction · WAM 77.9",
      "Academic Excellence Scholarship — UOW",
      {
        text: "Capstone: DrugNexusAI — clinical AI platform, now in production",
        href: "https://drugnexusai.app",
      },
    ],
  },
  {
    year: "2021 – 2023",
    title: "Software Engineer · Accenture",
    subtitle: "India · C#, ASP.NET Core, React, SQL Server, Azure",
    bullets: [
      { text: "Unsung Hero Award 2022", highlight: true },
      "120+ code reviews · 18% defect reduction",
      "Delivered enterprise .NET and React solutions across client engagements on Azure",
    ],
  },
  {
    year: "2017 – 2021",
    title: "Bachelor of Aeronautical Engineering",
    subtitle: "MLR Institute of Technology, India",
    bullets: [
      {
        text: "Published: UAV design using computational modelling",
        href: "https://doi.org/10.1063/5.0109212",
      },
    ],
  },
];

const credentials = [
  "Microsoft SC-900 Certified",
  "Joy of Computing Using Python — NPTEL",
  "Python for Data Science — IBM (Coursera)",
  "Google Python Crash Course — Coursera",
];

// ── Entry visuals ────────────────────────────────────────────────────────────

// ICT network diagram — nodes connected by animated edges, pulsing hub
function VisualICT() {
  const outer = [
    { cx: 42, cy: 28 },
    { cx: 158, cy: 28 },
    { cx: 42, cy: 92 },
    { cx: 158, cy: 92 },
  ];
  return (
    <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full">
      {outer.map((n, i) => (
        <motion.line key={i}
          x1={100} y1={60} x2={n.cx} y2={n.cy}
          stroke="var(--blueprint)" strokeOpacity="0.3" strokeWidth="0.9" strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease }}
        />
      ))}
      {/* Pulse ring */}
      <motion.circle cx={100} cy={60} r={28}
        stroke="var(--blueprint)" strokeOpacity="0.12" strokeWidth="0.8" fill="none"
        animate={{ r: [22, 34, 22], opacity: [0.25, 0, 0.25] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Hub */}
      <motion.circle cx={100} cy={60} r={18}
        fill="var(--sky-pale)" fillOpacity="0.7" stroke="var(--blueprint)" strokeOpacity="0.45" strokeWidth="1"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1, ease }}
      />
      <text x={100} y={64} textAnchor="middle" fontSize="8" fill="var(--blueprint)" fontFamily="monospace" opacity="0.65">ICT</text>
      {/* Outer nodes */}
      {outer.map((n, i) => (
        <motion.circle key={i} cx={n.cx} cy={n.cy} r={9}
          fill="var(--paper-warm)" stroke="var(--blueprint)" strokeOpacity="0.35" strokeWidth="0.9"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: 0.35 + i * 0.08, ease }}
        />
      ))}
      <text x={100} y={114} textAnchor="middle" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.38">PROFESSIONAL NETWORK</text>
    </svg>
  );
}

// ML training curve — accuracy rising, loss falling
function VisualML() {
  return (
    <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full">
      {/* Grid */}
      {[30, 50, 70, 88].map((y) => (
        <line key={y} x1={32} y1={y} x2={182} y2={y}
          stroke="var(--ink)" strokeOpacity="0.06" strokeWidth="0.5" />
      ))}
      {/* Axes */}
      <line x1={32} y1={88} x2={182} y2={88} stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.8" />
      <line x1={32} y1={14} x2={32} y2={88} stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.8" />
      {/* Accuracy curve */}
      <motion.path
        d="M 32,86 C 65,80 88,52 112,32 C 132,18 158,15 182,14"
        stroke="var(--teal)" strokeWidth="1.8" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Loss curve (dashed amber) */}
      <motion.path
        d="M 32,18 C 60,26 80,55 108,72 C 132,83 158,86 182,87"
        stroke="var(--amber)" strokeWidth="1.3" strokeDasharray="3 2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* WAM endpoint dot + label */}
      <motion.circle cx={182} cy={14} r={3.5}
        fill="var(--teal)" fillOpacity="0.75"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.5, ease }}
      />
      <motion.text x={178} y={10} textAnchor="end" fontSize="7" fill="var(--teal)" fontFamily="monospace" opacity="0.75"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.75 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
      >WAM 77.9</motion.text>
      {/* Axis labels */}
      <text x={107} y={100} textAnchor="middle" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.38">epochs</text>
      {/* Legend */}
      <line x1={38} y1={112} x2={52} y2={112} stroke="var(--teal)" strokeWidth="1.4" />
      <text x={55} y={115} fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.48">accuracy</text>
      <line x1={108} y1={112} x2={122} y2={112} stroke="var(--amber)" strokeWidth="1.4" strokeDasharray="3 2" />
      <text x={125} y={115} fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.48">loss</text>
    </svg>
  );
}

// Git branch graph — main line, feature branch splits and merges back
function VisualCode() {
  const commits = [20, 60, 100, 140, 180];
  const branchNodes = [60, 140];
  return (
    <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full">
      {/* Main branch line */}
      <motion.line x1={20} y1={68} x2={180} y2={68}
        stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="1.2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      />
      {/* Feature branch arc */}
      <motion.path d="M 60,68 C 72,38 128,38 140,68"
        stroke="var(--amber)" strokeOpacity="0.65" strokeWidth="1.3" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Feature midpoint commit */}
      <motion.circle cx={100} cy={38} r={5}
        fill="var(--paper-warm)" stroke="var(--amber)" strokeOpacity="0.65" strokeWidth="1.2"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.28, delay: 0.8, ease }}
      />
      {/* Main branch commits */}
      {commits.map((cx, i) => (
        <motion.circle key={cx} cx={cx} cy={68} r={branchNodes.includes(cx) ? 5.5 : 4.5}
          fill={branchNodes.includes(cx) ? "var(--amber)" : "var(--paper)"}
          fillOpacity={branchNodes.includes(cx) ? 0.85 : 1}
          stroke={branchNodes.includes(cx) ? "var(--amber)" : "var(--ink)"}
          strokeOpacity={branchNodes.includes(cx) ? 0.7 : 0.3}
          strokeWidth="1.2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: 0.18 + i * 0.12, ease }}
        />
      ))}
      {/* Labels */}
      <text x={100} y={84} textAnchor="middle" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.38">main</text>
      <text x={100} y={30} textAnchor="middle" fontSize="7" fill="var(--amber)" fontFamily="monospace" opacity="0.6">feature</text>
      {/* Merged badge */}
      <motion.text x={100} y={110} textAnchor="middle" fontSize="7" fill="var(--teal)" fontFamily="monospace" opacity="0.6"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >✓ 120+ reviews merged</motion.text>
    </svg>
  );
}

// Airfoil cross-section with animated streamlines and lift arrow
function VisualAero() {
  const streamlines = [
    { d: "M 18,28 C 52,28 76,24 108,24 C 134,24 158,28 182,31", delay: 0.55 },
    { d: "M 18,42 C 50,41 74,36 108,35 C 134,34 158,38 182,41", delay: 0.45 },
    { d: "M 18,60 C 48,59 68,55 96,52 C 120,50 152,54 182,57", delay: 0.35 },
    { d: "M 18,76 C 48,77 68,75 96,74 C 120,73 152,73 182,73", delay: 0.4 },
    { d: "M 18,90 C 48,90 68,89 96,89 C 120,89 152,87 182,85", delay: 0.5 },
  ];
  return (
    <svg viewBox="0 0 200 120" fill="none" aria-hidden className="w-full">
      {/* Streamlines */}
      {streamlines.map((s, i) => (
        <motion.path key={i} d={s.d}
          stroke="var(--sky-deep)" strokeOpacity="0.38" strokeWidth="0.75"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: s.delay, ease: "easeOut" }}
        />
      ))}
      {/* Airfoil body */}
      <motion.path
        d="M 48,58 C 58,49 82,43 110,44 C 138,45 158,51 168,58 C 158,64 138,68 110,69 C 82,70 58,67 48,58 Z"
        fill="var(--paper-warm)" fillOpacity="0.9"
        stroke="var(--ink)" strokeOpacity="0.42" strokeWidth="1"
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.18, ease }}
      />
      {/* Chord datum (dashed) */}
      <motion.line x1={48} y1={58} x2={168} y2={58}
        stroke="var(--blueprint)" strokeOpacity="0.28" strokeWidth="0.55" strokeDasharray="3 3"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.65, ease }}
      />
      {/* Lift arrow */}
      <motion.line x1={108} y1={43} x2={108} y2={18}
        stroke="var(--blueprint)" strokeOpacity="0.55" strokeWidth="1.1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 1.2, ease }}
      />
      <motion.polygon points="104,23 108,14 112,23"
        fill="var(--blueprint)" fillOpacity="0.5"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.45 }}
      />
      <motion.text x={116} y={21} fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.55"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      >LIFT</motion.text>
      {/* Flow direction */}
      <motion.line x1={18} y1={58} x2={36} y2={58}
        stroke="var(--ink)" strokeOpacity="0.32" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.3, ease }}
      />
      <polygon points="33,55 39,58 33,61" fill="var(--ink)" fillOpacity="0.28" />
      <text x={100} y={112} textAnchor="middle" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.38">NACA AIRFOIL · SIDE ELEVATION</text>
    </svg>
  );
}

const visuals = [VisualICT, VisualML, VisualCode, VisualAero];

// ── Main section ─────────────────────────────────────────────────────────────

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-[140px] md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 md:mb-28"
        >
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.28em] text-amber">
            The Story · 03 · The Path
          </p>
          <h2
            className="font-display font-light italic leading-[1] text-ink"
            style={{ fontSize: "clamp(40px, 6.5vw, 82px)" }}
          >
            From propulsion to<br />deployment pipelines.
          </h2>
        </motion.div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute bottom-3 left-2 top-3 w-px bg-ink/12 md:left-[160px]"
          />

          {entries.map((entry, i) => {
            const Visual = visuals[i];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="relative grid grid-cols-1 gap-2 pb-14 pl-10 last:pb-0 md:grid-cols-[160px_1fr_210px] md:items-center md:gap-10 md:pl-0"
              >
                {/* Timeline dot */}
                <span
                  aria-hidden
                  className="absolute left-[3px] top-2 h-3 w-3 rounded-full border-2 border-ink/30 bg-paper md:left-[155px]"
                />

                {/* Year */}
                <div className="font-mono text-[12px] tracking-wide text-amber md:pt-1.5 md:pr-10 md:text-right">
                  {entry.year}
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="font-display font-light italic leading-tight text-ink"
                    style={{ fontSize: "clamp(22px, 2.8vw, 30px)" }}
                  >
                    {entry.title}
                  </h3>
                  {entry.subtitle && (
                    <p className="mt-1 font-body text-[14px] text-ink-soft">
                      {entry.subtitle}
                    </p>
                  )}
                  {entry.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {entry.bullets.map((b, j) => {
                        const isObj = typeof b === "object";
                        const text = isObj ? b.text : b;
                        const isHighlight = isObj && b.highlight;
                        const href = isObj ? b.href : undefined;
                        return (
                          <li key={j} className="relative pl-5 text-[15px] leading-snug">
                            <span
                              aria-hidden
                              className={`absolute left-0 top-[10px] h-px w-3 ${
                                isHighlight ? "bg-amber" : "bg-ink-soft/40"
                              }`}
                            />
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className={`transition-colors duration-300 ${
                                  isHighlight
                                    ? "text-amber hover:text-ink"
                                    : "text-ink hover:text-amber underline underline-offset-2 decoration-ink/20"
                                }`}
                              >
                                {text} ↗
                              </a>
                            ) : (
                              <span className={isHighlight ? "font-medium text-amber" : "text-ink"}>
                                {text}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Animated visual — desktop only */}
                <div className="hidden md:block">
                  <div className="border border-ink/8 bg-paper/50 p-3 backdrop-blur-sm">
                    <Visual />
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mt-20 border-t border-ink/12 pt-10"
        >
          <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.28em] text-ink-soft/60">
            Credentials
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {credentials.map((c) => (
              <li key={c} className="font-body text-[14px] text-ink-soft">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
