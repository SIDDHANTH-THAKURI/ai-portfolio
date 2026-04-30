"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const beats = [
  {
    chapter: "01 · Aeronautics",
    year: "2017 – 2021",
    line: "I started in aeronautical engineering in India.",
    note: "MLR Institute of Technology · Published research on UAV design using computational modelling.",
  },
  {
    chapter: "02 · First Lines",
    year: "2019 – 2021",
    line: "Taught myself Python between lectures.",
    note: "The physics made sense. Software felt like engineering without the wind tunnel.",
  },
  {
    chapter: "03 · Software Engineering",
    year: "2021 – 2023",
    line: "Joined Accenture as a Software Engineer — one level above graduate entry.",
    note: "C#, ASP.NET Core, Azure · 120+ reviews · Unsung Hero Award 2022.",
  },
  {
    chapter: "04 · AI & Machine Learning",
    year: "2023 – Now",
    line: "Moved to Australia to specialise in ML. Started shipping AI products.",
    note: "UoW Master of CS · Distinction · DrugNexusAI, ShiftMate, WAYA — real problems, real users.",
  },
];

export function Origin() {
  const ref = useRef<HTMLDivElement>(null);

  // Track from when the section's top hits 80% down the viewport
  // to when the bottom hits 20% — gives maximum scroll runway.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });

  // Slow, heavy spring so cross-fades never feel rushed.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.9,
  });

  // Each illustration is visible for ~24% of the total scroll range.
  // The 8% ramps (fade-in / fade-out) give smooth cross-fades.
  const op0 = useTransform(smooth, [0.00, 0.07, 0.22, 0.30], [0, 1, 1, 0]);
  const op1 = useTransform(smooth, [0.22, 0.30, 0.46, 0.54], [0, 1, 1, 0]);
  const op2 = useTransform(smooth, [0.46, 0.54, 0.70, 0.78], [0, 1, 1, 0]);
  const op3 = useTransform(smooth, [0.70, 0.78, 1.00, 1.00], [0, 1, 1, 1]);

  // Chapter index label in the card (1-4), driven by scroll.
  const chapterNum = useTransform(
    smooth,
    [0, 0.28, 0.52, 0.76, 1],
    [1, 2, 3, 4, 4]
  );

  return (
    <section id="origin" ref={ref} className="relative px-6 py-[120px] md:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 font-mono text-[12px] uppercase tracking-[0.28em] text-amber"
        >
          The Story · 01
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="font-display font-light italic leading-[1] text-ink"
          style={{ fontSize: "clamp(40px, 7vw, 92px)" }}
        >
          From sky <span className="text-amber italic">→</span> to circuit.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mt-6 max-w-2xl font-display italic text-ink-soft"
          style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
        >
          A propeller turning into a logic gate. A flight plan turning into a
          deploy pipeline. Same engineer, different altitude.
        </motion.p>

        {/* Two-column: sticky card left, tall beat list right */}
        <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">

          {/* ── Sticky drafting card (desktop only) ─────────────────── */}
          <div className="relative hidden md:block">
            <div className="sticky top-24 flex aspect-square w-full items-center justify-center">
              {/* Card shell */}
              <div className="absolute inset-0 border border-ink/12 bg-paper/75 shadow-[0_24px_56px_-24px_rgba(26,29,36,0.18)] backdrop-blur-sm">
                <Tick pos="left-3 top-3" />
                <Tick pos="right-3 top-3" />
                <Tick pos="left-3 bottom-3" />
                <Tick pos="right-3 bottom-3" />
                {/* Dynamic chapter label */}
                <motion.span
                  className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft/55"
                  style={{ opacity: 1 }}
                >
                  fig · 0
                  <motion.span>
                    {[1, 2, 3, 4].map((n) => (
                      <motion.span
                        key={n}
                        style={{
                          position: "absolute",
                          opacity: useTransform(
                            smooth,
                            [
                              n === 1 ? 0 : (n - 1) * 0.25 - 0.04,
                              n === 1 ? 0 : (n - 1) * 0.25,
                              n * 0.25,
                              n * 0.25 + 0.04,
                            ],
                            n === 1 ? [1, 1, 1, 0] : n === 4 ? [0, 1, 1, 1] : [0, 1, 1, 0]
                          ),
                        }}
                      >
                        {n}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.span>
                <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft/45">
                  scale 1:1
                </span>
              </div>
              <span className="absolute bottom-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft/40">
                scroll to advance
              </span>

              {/* ── Illustration 0: Biplane ──────────────────────── */}
              <IllustrationBiplane opacity={op0} />

              {/* ── Illustration 1: Code / Terminal ─────────────── */}
              <IllustrationCode opacity={op1} />

              {/* ── Illustration 2: Software Architecture ────────── */}
              <IllustrationArchitecture opacity={op2} />

              {/* ── Illustration 3: Neural Network ───────────────── */}
              <IllustrationNeuralNet opacity={op3} />
            </div>
          </div>

          {/* ── Scroll beats — each chapter is min-h-[80vh] ─────────── */}
          <div>
            {beats.map((b, i) => (
              // Each chapter wrapper is tall so you genuinely scroll through it.
              <div key={b.chapter} className="flex min-h-[80vh] items-center py-12 last:min-h-0 last:pb-0">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{ duration: 0.7, ease }}
                  className="relative"
                >
                  <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber">
                    <span className="h-px w-8 bg-amber/70" />
                    {b.chapter}
                  </div>
                  <p
                    className="font-display font-light italic leading-[1.1] text-ink"
                    style={{ fontSize: "clamp(28px, 3.8vw, 44px)" }}
                  >
                    {b.line}
                  </p>
                  <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-ink-soft">
                    {b.note}
                  </p>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/28">
                    {b.year}
                  </div>
                </motion.div>
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
              className="border-t border-ink/12 py-12"
            >
              <p
                className="font-display italic text-ink"
                style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}
              >
                Everything on this site started as something I actually needed.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Illustrations ────────────────────────────────────────────────────────────

type IllusProps = { opacity: MotionValue<number> };

function IllustrationBiplane({ opacity }: IllusProps) {
  return (
    <motion.svg
      style={{ opacity, position: "absolute", inset: 0, margin: "auto" }}
      className="h-[76%] w-[76%]"
      viewBox="0 0 400 260"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10,190 L390,190" stroke="var(--ink-soft)" strokeOpacity="0.18" strokeDasharray="3 5" />
      <motion.path d="M40,85 L360,85" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
      <motion.path d="M70,145 L330,145" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.15, ease }} />
      <motion.path d="M140,112 L290,112 L318,104 L290,96 L140,96 L122,104 Z" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3, ease }} />
      <path d="M112,85 L112,145 M190,85 L190,145 M268,85 L268,145" />
      <path d="M140,104 L102,70 M140,104 L102,146" />
      <path d="M318,104 L332,82 L318,104 L332,126" />
      <path d="M40,65 L40,80 M360,65 L360,80 M40,72 L360,72" stroke="var(--blueprint)" strokeOpacity="0.4" strokeDasharray="2 4" />
      <text x="200" y="62" textAnchor="middle" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.55">span 9.5 m</text>
      <circle cx="318" cy="104" r="22" stroke="var(--ink-soft)" strokeOpacity="0.18" strokeDasharray="2 4" />
      <text x="22" y="35" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.5">AERONAUTICS</text>
    </motion.svg>
  );
}

function IllustrationCode({ opacity }: IllusProps) {
  return (
    <motion.svg
      style={{ opacity, position: "absolute", inset: 0, margin: "auto" }}
      className="h-[76%] w-[76%]"
      viewBox="0 0 400 280"
      fill="none"
      aria-hidden
    >
      <rect x="30" y="20" width="340" height="215" rx="6" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="30" y="20" width="340" height="30" rx="6" fill="var(--ink)" fillOpacity="0.055" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="50" cy="35" r="5" fill="var(--red)" fillOpacity="0.55" />
      <circle cx="66" cy="35" r="5" fill="var(--amber)" fillOpacity="0.55" />
      <circle cx="82" cy="35" r="5" fill="var(--teal)" fillOpacity="0.55" />
      <text x="200" y="38" textAnchor="middle" fontSize="9" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.5">main.py</text>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
        <text x="52" y="76" fontSize="11" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.35">01</text>
        <text x="78" y="76" fontSize="11" fill="var(--blueprint)" fontFamily="monospace">import</text>
        <text x="130" y="76" fontSize="11" fill="var(--ink)" fontFamily="monospace"> numpy as np</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.32 }}>
        <text x="52" y="96" fontSize="11" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.35">02</text>
        <text x="78" y="96" fontSize="11" fill="var(--blueprint)" fontFamily="monospace">import</text>
        <text x="130" y="96" fontSize="11" fill="var(--ink)" fontFamily="monospace"> pandas as pd</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.48 }}>
        <text x="52" y="122" fontSize="11" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.35">04</text>
        <text x="78" y="122" fontSize="11" fill="var(--amber)" fontFamily="monospace">def</text>
        <text x="104" y="122" fontSize="11" fill="var(--teal)" fontFamily="monospace"> solve(data):</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.62 }}>
        <text x="52" y="142" fontSize="11" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.35">05</text>
        <text x="96" y="142" fontSize="11" fill="var(--amber)" fontFamily="monospace">return</text>
        <text x="148" y="142" fontSize="11" fill="var(--ink)" fontFamily="monospace"> np.linalg.solve(data)</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.76 }}>
        <text x="52" y="168" fontSize="11" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.35">07</text>
        <text x="78" y="168" fontSize="11" fill="var(--blueprint)" fontFamily="monospace">result</text>
        <text x="130" y="168" fontSize="11" fill="var(--ink)" fontFamily="monospace"> = solve(df.values)</text>
      </motion.g>
      <motion.rect x="78" y="183" width="7" height="12" fill="var(--amber)" opacity="0.8" animate={{ opacity: [0.8, 0, 0.8] }} transition={{ duration: 1.1, repeat: Infinity }} />
      <path d="M180,235 L220,235 M200,235 L200,254 M176,254 L224,254" stroke="var(--ink)" strokeWidth="1.5" />
      <text x="22" y="35" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.5">FIRST LINES</text>
    </motion.svg>
  );
}

function IllustrationArchitecture({ opacity }: IllusProps) {
  return (
    <motion.svg
      style={{ opacity, position: "absolute", inset: 0, margin: "auto" }}
      className="h-[76%] w-[76%]"
      viewBox="0 0 400 280"
      fill="none"
      stroke="var(--ink)"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <motion.rect x="22" y="108" width="80" height="42" rx="4" fill="var(--sky-pale)" fillOpacity="0.5" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} />
      <text x="62" y="130" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="monospace">client</text>
      <text x="62" y="143" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">React / Next</text>

      <motion.rect x="160" y="28" width="82" height="42" rx="4" fill="var(--amber-dim)" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12, ease }} />
      <text x="201" y="50" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="monospace">API</text>
      <text x="201" y="63" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">REST · Socket.io</text>

      <motion.rect x="160" y="118" width="82" height="42" rx="4" fill="var(--paper-warm)" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.22, ease }} />
      <text x="201" y="140" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="monospace">Auth</text>
      <text x="201" y="153" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">JWT · OAuth</text>

      <motion.rect x="160" y="208" width="82" height="42" rx="4" fill="var(--amber-dim)" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.32, ease }} />
      <text x="201" y="230" textAnchor="middle" fontSize="10" fill="var(--amber)" fontFamily="monospace">AI Model</text>
      <text x="201" y="243" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">Anthropic API</text>

      {/* DB */}
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.42 }}>
        <ellipse cx="330" cy="136" rx="32" ry="9" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M298,136 L298,164 Q298,173 330,173 Q362,173 362,164 L362,136" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.5" />
        <ellipse cx="330" cy="136" rx="32" ry="9" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="330" y="158" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">PostgreSQL</text>
      </motion.g>

      {/* Arrows */}
      <path d="M102,125 L160,75" stroke="var(--blueprint)" strokeOpacity="0.6" strokeDasharray="4 3" />
      <path d="M102,132 L160,138" stroke="var(--blueprint)" strokeOpacity="0.6" strokeDasharray="4 3" />
      <path d="M102,142 L160,215" stroke="var(--blueprint)" strokeOpacity="0.6" strokeDasharray="4 3" />
      <path d="M242,50 L298,130" stroke="var(--ink)" strokeOpacity="0.35" strokeDasharray="3 4" />
      <path d="M242,140 L298,148" stroke="var(--ink)" strokeOpacity="0.35" strokeDasharray="3 4" />
      <path d="M242,225 L298,158" stroke="var(--ink)" strokeOpacity="0.35" strokeDasharray="3 4" />

      <text x="22" y="35" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.5">SOFTWARE ENG</text>
    </motion.svg>
  );
}

function IllustrationNeuralNet({ opacity }: IllusProps) {
  const inputY = [55, 100, 155, 210];
  const hiddenY = [38, 85, 138, 192, 238];
  const outputY = [98, 178];

  return (
    <motion.svg
      style={{ opacity, position: "absolute", inset: 0, margin: "auto" }}
      className="h-[76%] w-[76%]"
      viewBox="0 0 400 280"
      fill="none"
      aria-hidden
    >
      <text x="66" y="24" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.55">input</text>
      <text x="200" y="24" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.55">hidden</text>
      <text x="334" y="24" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.55">output</text>

      {/* Connections input→hidden */}
      {inputY.flatMap((iy, ii) =>
        hiddenY.map((hy, hi) => {
          const isHighlight = (ii === 1 && hi === 2) || (ii === 2 && hi === 3);
          return (
            <motion.line key={`ih${ii}${hi}`} x1="80" y1={iy} x2="186" y2={hy}
              stroke={isHighlight ? "var(--amber)" : "var(--ink)"}
              strokeOpacity={isHighlight ? 0.55 : 0.09}
              strokeWidth={isHighlight ? 1.3 : 0.7}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (ii + hi) * 0.018 }}
            />
          );
        })
      )}

      {/* Connections hidden→output */}
      {hiddenY.flatMap((hy, hi) =>
        outputY.map((oy, oi) => {
          const isHighlight = hi === 2 || hi === 3;
          return (
            <motion.line key={`ho${hi}${oi}`} x1="214" y1={hy} x2="318" y2={oy}
              stroke={isHighlight ? "var(--amber)" : "var(--ink)"}
              strokeOpacity={isHighlight ? 0.5 : 0.1}
              strokeWidth={isHighlight ? 1.3 : 0.7}
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + (hi + oi) * 0.022 }}
            />
          );
        })
      )}

      {/* Input nodes */}
      {inputY.map((y, i) => (
        <motion.circle key={"in" + i} cx="66" cy={y} r="13" fill="var(--sky-pale)" stroke="var(--ink)" strokeWidth="1.3"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.055, ease }}
        />
      ))}

      {/* Hidden nodes */}
      {hiddenY.map((y, i) => (
        <motion.circle key={"hn" + i} cx="200" cy={y} r="13" fill="var(--paper-warm)" stroke="var(--amber)" strokeWidth="1.3"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 + i * 0.055, ease }}
        />
      ))}

      {/* Output nodes */}
      {outputY.map((y, i) => (
        <motion.circle key={"on" + i} cx="334" cy={y} r="15" fill="var(--amber)" fillOpacity="0.15" stroke="var(--amber)" strokeWidth="1.5"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.45 + i * 0.07, ease }}
        />
      ))}

      <text x="355" y="102" fontSize="9" fill="var(--amber)" fontFamily="monospace">predict</text>
      <text x="355" y="182" fontSize="9" fill="var(--ink-soft)" fontFamily="monospace">classify</text>
      <text x="22" y="35" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.5">AI / ML</text>
    </motion.svg>
  );
}

function Tick({ pos }: { pos: string }) {
  return <span aria-hidden className={`absolute h-3 w-3 border border-ink/35 ${pos}`} />;
}
