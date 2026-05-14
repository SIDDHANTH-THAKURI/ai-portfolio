"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";

// Returns true once the illustration's opacity first crosses 0.05
function useVisible(opacity: MotionValue<number>) {
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(opacity, "change", (v) => {
    if (!visible && v > 0.05) setVisible(true);
  });
  return visible;
}

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
    note: "C#, ASP.NET Core, Azure · Unsung Hero Award 2022 · 120+ code reviews.",
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

  // Illustrations are offset so each only appears after its beat scrolls into view.
  // Section header occupies ~10% of the tracked scroll range.
  const op0 = useTransform(smooth, [0.09, 0.17, 0.30, 0.38], [0, 1, 1, 0]);
  const op1 = useTransform(smooth, [0.30, 0.38, 0.52, 0.60], [0, 1, 1, 0]);
  const op2 = useTransform(smooth, [0.52, 0.60, 0.68, 0.76], [0, 1, 1, 0]);
  const op3 = useTransform(smooth, [0.66, 0.75, 1.00, 1.00], [0, 1, 1, 1]);

  // Chapter index label in the card (1-4), driven by scroll.
  const chapterNum = useTransform(
    smooth,
    [0, 0.34, 0.56, 0.73, 1],
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

export type IllusProps = { opacity: MotionValue<number> };

export function IllustrationBiplane({ opacity }: IllusProps) {
  return (
    <motion.svg
      style={{ opacity, position: "absolute", inset: 0, margin: "auto" }}
      className="w-[94%]"
      viewBox="0 0 960 640"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Ground + centreline datums */}
      <line x1="40" y1="488" x2="860" y2="488" stroke="var(--blueprint)" strokeWidth="0.4" strokeDasharray="8 4" />
      <text x="868" y="491" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.6">GND DATUM</text>
      <line x1="50" y1="348" x2="840" y2="348" stroke="var(--blueprint)" strokeWidth="0.35" strokeDasharray="6 3" />
      <text x="848" y="351" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.6">CL DATUM</text>

      {/* ── TAIL ── */}
      <path d="M115,330 L115,295 Q125,270 155,280 L155,330" stroke="var(--ink)" strokeWidth="0.6" fill="none" />
      <path d="M98,300 L115,295" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <line x1="115" y1="295" x2="115" y2="330" stroke="var(--ink)" strokeWidth="0.35" strokeDasharray="2 1.5" />
      <path d="M98,300 Q88,315 86,335 Q84,348 80,355" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <circle cx="115" cy="295" r="1.2" stroke="var(--ink)" strokeWidth="0.4" fill="none" />
      <path d="M100,332 Q110,318 155,325 L155,332" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <path d="M100,365 Q110,378 155,372 L155,365" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <path d="M78,330 L100,332" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <path d="M78,368 L100,365" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <line x1="100" y1="332" x2="100" y2="338" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="2 1.5" />
      <line x1="100" y1="360" x2="100" y2="365" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="2 1.5" />
      <path d="M78,330 Q74,340 74,348 Q74,356 78,368" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      {/* Tail skid */}
      <path d="M115,372 L100,488 Q98,494 104,496" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <ellipse cx="104" cy="496" rx="4" ry="2.5" stroke="var(--ink)" strokeWidth="0.4" fill="none" />

      {/* ── FUSELAGE ── */}
      <path d="M155,322 Q200,298 340,296 Q480,293 600,298 Q660,302 700,308 L740,318" stroke="var(--ink)" strokeWidth="0.6" fill="none" />
      <path d="M155,375 Q200,395 340,397 Q480,400 600,395 Q660,390 700,385 L740,378" stroke="var(--ink)" strokeWidth="0.6" fill="none" />
      <path d="M740,318 Q758,320 768,328 L768,335" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <path d="M740,378 Q758,376 768,370 L768,362" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      {/* Panel lines longitudinal */}
      {[328,338,358,368].map((y,i) => (
        <line key={`long-${i}`} x1="175" y1={y} x2="730" y2={y+(i<2?-6:6)} stroke="var(--ink)" strokeWidth="0.25" opacity="0.18" />
      ))}
      {/* Panel lines transverse */}
      {[240,330,420,510,600,680].map(x => (
        <line key={`trans-${x}`} x1={x} y1="296" x2={x} y2="398" stroke="var(--ink)" strokeWidth="0.25" opacity="0.15" />
      ))}
      {/* Rivet dots */}
      {Array.from({length:28},(_,i)=>190+i*20).map(x => (
        <circle key={`rv-t-${x}`} cx={x} cy={328} r="0.5" fill="var(--ink)" opacity="0.35" />
      ))}
      {Array.from({length:20},(_,i)=>190+i*20).map(x => (
        <circle key={`rv-b-${x}`} cx={x} cy={368} r="0.5" fill="var(--ink)" opacity="0.3" />
      ))}
      {/* Structural bracing */}
      {[[240,330],[330,420],[420,510],[510,600]].map(([x1,x2],i) => (
        <g key={`brace-${i}`}>
          <line x1={x1} y1="300" x2={x2} y2="395" stroke="var(--blueprint)" strokeWidth="0.35" opacity="0.12" />
          <line x1={x2} y1="300" x2={x1} y2="395" stroke="var(--blueprint)" strokeWidth="0.35" opacity="0.12" />
        </g>
      ))}

      {/* ── COCKPIT ── */}
      <path d="M470,296 Q470,280 488,272 L535,270 Q552,272 552,280 L552,298" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <path d="M470,296 L480,276 L488,272" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <path d="M535,270 Q548,260 560,262 Q570,265 570,278 L552,298" stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <line x1="488" y1="272" x2="535" y2="270" stroke="var(--ink)" strokeWidth="0.3" opacity="0.4" />

      {/* ── ENGINE COWLING ── */}
      <path d="M768,335 Q778,316 806,310 Q828,307 834,328" stroke="var(--ink)" strokeWidth="0.55" fill="none" />
      <path d="M768,362 Q778,382 806,388 Q828,391 834,370" stroke="var(--ink)" strokeWidth="0.55" fill="none" />
      <line x1="834" y1="328" x2="834" y2="370" stroke="var(--ink)" strokeWidth="0.5" />
      <ellipse cx="822" cy="348" rx="2.5" ry="24" stroke="var(--ink)" strokeWidth="0.35" opacity="0.35" fill="none" />
      {/* Cylinder heads */}
      {[[810,312,824,308,828,310],[818,317,830,312,834,314],[818,379,830,384,834,382],[810,384,824,388,828,386]].map(([x1,y1,x2,y2,x3,y3],i) => (
        <path key={`cyl-${i}`} d={`M${x1},${y1} L${x2},${y2} L${x3},${y3}`} stroke="var(--ink)" strokeWidth="0.4" fill="none" />
      ))}
      {[310,314,318].map(y => (
        <line key={`fin-t-${y}`} x1="820" y1={y} x2="820" y2={y-3} stroke="var(--ink)" strokeWidth="0.3" opacity="0.4" />
      ))}
      {[380,384,388].map(y => (
        <line key={`fin-b-${y}`} x1="820" y1={y} x2="820" y2={y+3} stroke="var(--ink)" strokeWidth="0.3" opacity="0.4" />
      ))}
      <path d="M800,330 Q802,348 800,366" stroke="var(--ink)" strokeWidth="0.3" opacity="0.3" fill="none" />

      {/* ── PROPELLER ── */}
      <path d="M834,348 Q840,326 846,288 Q848,272 854,266 Q860,264 864,270 Q866,286 858,326 Q852,344 834,348"
        stroke="var(--ink)" strokeWidth="0.7" fill="rgba(26,29,36,0.05)" />
      <path d="M844,290 Q848,310 846,340" stroke="var(--ink)" strokeWidth="0.2" opacity="0.2" fill="none" />
      <path d="M850,278 Q854,305 850,338" stroke="var(--ink)" strokeWidth="0.2" opacity="0.18" fill="none" />
      <path d="M834,348 Q840,370 846,408 Q848,424 854,430 Q860,432 864,426 Q866,410 858,370 Q852,352 834,348"
        stroke="var(--ink)" strokeWidth="0.7" fill="rgba(26,29,36,0.05)" />
      <path d="M844,406 Q848,386 846,356" stroke="var(--ink)" strokeWidth="0.2" opacity="0.2" fill="none" />
      <path d="M850,418 Q854,392 850,358" stroke="var(--ink)" strokeWidth="0.2" opacity="0.18" fill="none" />
      <circle cx="834" cy="348" r="7" stroke="var(--ink)" strokeWidth="0.6" fill="none" />
      <circle cx="834" cy="348" r="3.5" stroke="var(--ink)" strokeWidth="0.4" fill="none" />
      {[0,60,120,180,240,300].map(a => (
        <circle key={`bolt-${a}`} cx={834+5.2*Math.cos(a*Math.PI/180)} cy={348+5.2*Math.sin(a*Math.PI/180)} r="0.6" fill="var(--ink)" opacity="0.4" />
      ))}
      <path d="M834,341 Q842,341 844,348 Q842,355 834,355" stroke="var(--ink)" strokeWidth="0.4" fill="none" />
      <path d="M826,268 Q890,348 826,428" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="2 4" opacity="0.12" fill="none" />

      {/* ── UPPER WING ── */}
      <path d="M370,195 Q395,191 630,190 Q680,190 730,193 Q768,197 786,203 L788,210 Q768,216 730,219 Q680,219 630,219 Q395,220 370,224 Z"
        stroke="var(--ink)" strokeWidth="0.55" fill="rgba(26,29,36,0.03)" />
      {[405,430,455,480,510,540,570,600,630,660,690,720,750].map(x => (
        <line key={`ur-${x}`} x1={x} y1="191" x2={x} y2="220" stroke="var(--blueprint)" strokeWidth="0.35" strokeDasharray="2 2" opacity="0.4" />
      ))}
      {[405,455,510,570,630,690,750].map(x => (
        <path key={`urc-${x}`} d={`M${x},191 Q${x+3},205 ${x},220`} stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.2" fill="none" />
      ))}
      <line x1="738" y1="193" x2="786" y2="203" stroke="var(--ink)" strokeWidth="0.3" strokeDasharray="2 1.5" opacity="0.35" />

      {/* ── LOWER WING ── */}
      <path d="M390,400 Q410,396 630,395 Q680,395 730,398 Q768,402 786,408 L788,415 Q768,421 730,424 Q680,424 630,424 Q410,425 390,429 Z"
        stroke="var(--ink)" strokeWidth="0.5" fill="rgba(26,29,36,0.03)" />
      {[420,450,480,510,540,570,600,630,660,690,720,750].map(x => (
        <line key={`lr-${x}`} x1={x} y1="396" x2={x} y2="425" stroke="var(--blueprint)" strokeWidth="0.35" strokeDasharray="2 2" opacity="0.38" />
      ))}
      {[420,480,540,600,660,720].map(x => (
        <path key={`lrc-${x}`} d={`M${x},396 Q${x+3},410 ${x},425`} stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.18" fill="none" />
      ))}

      {/* ── INTERPLANE STRUTS (N-TYPE) ── */}
      <line x1="460" y1="222" x2="480" y2="396" stroke="var(--ink)" strokeWidth="0.6" />
      <line x1="500" y1="220" x2="480" y2="396" stroke="var(--ink)" strokeWidth="0.6" />
      <line x1="660" y1="219" x2="680" y2="424" stroke="var(--ink)" strokeWidth="0.6" />
      <line x1="700" y1="219" x2="680" y2="424" stroke="var(--ink)" strokeWidth="0.6" />
      <line x1="476" y1="300" x2="494" y2="300" stroke="var(--ink)" strokeWidth="0.4" />
      <line x1="676" y1="310" x2="694" y2="310" stroke="var(--ink)" strokeWidth="0.4" />
      {/* Flying wires */}
      <line x1="460" y1="222" x2="680" y2="424" stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.35" />
      <line x1="700" y1="219" x2="480" y2="396" stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.35" />
      {/* Cabane struts */}
      <line x1="510" y1="296" x2="490" y2="220" stroke="var(--ink)" strokeWidth="0.5" />
      <line x1="568" y1="296" x2="580" y2="220" stroke="var(--ink)" strokeWidth="0.5" />

      {/* ── UNDERCARRIAGE ── */}
      <line x1="555" y1="395" x2="585" y2="460" stroke="var(--ink)" strokeWidth="0.6" />
      <line x1="615" y1="395" x2="590" y2="468" stroke="var(--ink)" strokeWidth="0.6" />
      <line x1="555" y1="395" x2="590" y2="450" stroke="var(--ink)" strokeWidth="0.35" opacity="0.35" />
      <line x1="572" y1="468" x2="612" y2="468" stroke="var(--ink)" strokeWidth="0.4" />
      <path d="M572,452 Q568,462 566,475 Q564,486 578,488 Q596,490 610,488 Q616,486 614,475 Q612,462 608,452"
        stroke="var(--ink)" strokeWidth="0.5" fill="none" />
      <circle cx="590" cy="476" r="13" stroke="var(--ink)" strokeWidth="0.55" fill="none" />
      <circle cx="590" cy="476" r="9" stroke="var(--ink)" strokeWidth="0.3" opacity="0.3" fill="none" />
      <circle cx="590" cy="476" r="2.2" stroke="var(--ink)" strokeWidth="0.35" fill="none" />
      {[0,45,90,135].map(a => (
        <line key={`spoke-${a}`}
          x1={590+9*Math.cos(a*Math.PI/180)} y1={476+9*Math.sin(a*Math.PI/180)}
          x2={590-9*Math.cos(a*Math.PI/180)} y2={476-9*Math.sin(a*Math.PI/180)}
          stroke="var(--ink)" strokeWidth="0.25" opacity="0.28" />
      ))}

      {/* ── DIMENSION ANNOTATIONS ── */}
      {/* Wingspan */}
      <line x1="370" y1="168" x2="788" y2="168" stroke="var(--blueprint)" strokeWidth="0.35" />
      <polygon points="370,165 370,171 377,168" fill="var(--blueprint)" />
      <polygon points="788,165 788,171 781,168" fill="var(--blueprint)" />
      <line x1="370" y1="190" x2="370" y2="165" stroke="var(--blueprint)" strokeWidth="0.25" />
      <line x1="788" y1="203" x2="788" y2="165" stroke="var(--blueprint)" strokeWidth="0.25" />
      <text x="565" y="164" fontSize="7.5" fill="var(--blueprint)" fontFamily="monospace" textAnchor="middle" opacity="0.7">9500 WINGSPAN (HALF SHOWN)</text>
      {/* Fuselage length */}
      <line x1="78" y1="525" x2="834" y2="525" stroke="var(--blueprint)" strokeWidth="0.35" />
      <polygon points="78,522 78,528 85,525" fill="var(--blueprint)" />
      <polygon points="834,522 834,528 827,525" fill="var(--blueprint)" />
      <line x1="78" y1="488" x2="78" y2="528" stroke="var(--blueprint)" strokeWidth="0.25" />
      <line x1="834" y1="488" x2="834" y2="528" stroke="var(--blueprint)" strokeWidth="0.25" />
      <text x="456" y="522" fontSize="7.5" fill="var(--blueprint)" fontFamily="monospace" textAnchor="middle" opacity="0.7">6800 FUSELAGE LENGTH</text>
      {/* Wing gap */}
      <line x1="890" y1="219" x2="890" y2="395" stroke="var(--blueprint)" strokeWidth="0.3" />
      <polygon points="887,219 893,219 890,226" fill="var(--blueprint)" />
      <polygon points="887,395 893,395 890,388" fill="var(--blueprint)" />
      <line x1="788" y1="219" x2="893" y2="219" stroke="var(--blueprint)" strokeWidth="0.2" />
      <line x1="788" y1="395" x2="893" y2="395" stroke="var(--blueprint)" strokeWidth="0.2" />
      <text x="898" y="312" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" textAnchor="start" opacity="0.65" transform="rotate(90,898,312)">1400 WING GAP</text>
      {/* Wing chord */}
      <line x1="910" y1="190" x2="910" y2="219" stroke="var(--blueprint)" strokeWidth="0.3" />
      <polygon points="907,190 913,190 910,197" fill="var(--blueprint)" />
      <polygon points="907,219 913,219 910,212" fill="var(--blueprint)" />
      <text x="918" y="208" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.65">1400 CHORD</text>
      {/* Ground to upper wing */}
      <line x1="52" y1="190" x2="52" y2="488" stroke="var(--blueprint)" strokeWidth="0.3" />
      <polygon points="49,190 55,190 52,197" fill="var(--blueprint)" />
      <polygon points="49,488 55,488 52,481" fill="var(--blueprint)" />
      <text x="44" y="348" fontSize="7" fill="var(--blueprint)" fontFamily="monospace" opacity="0.65" textAnchor="end" transform="rotate(-90,44,348)">2800 GND TO UPPER WING</text>

      {/* ── CALLOUT LABELS ── */}
      <g opacity="0.6">
        <text x="68" y="288" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">RUDDER</text>
        <line x1="85" y1="291" x2="96" y2="315" stroke="var(--blueprint)" strokeWidth="0.25" />
        <text x="60" y="382" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">ELEVATOR</text>
        <line x1="85" y1="376" x2="90" y2="368" stroke="var(--blueprint)" strokeWidth="0.25" />
        <text x="80" y="510" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">TAIL SKID</text>
        <text x="462" y="260" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">COCKPIT</text>
        <line x1="485" y1="263" x2="500" y2="272" stroke="var(--blueprint)" strokeWidth="0.25" />
        <text x="540" y="253" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">HEADREST FAIRING</text>
        <line x1="560" y1="256" x2="560" y2="262" stroke="var(--blueprint)" strokeWidth="0.25" />
        <text x="796" y="295" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">COWLING</text>
        <text x="848" y="340" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">PROP</text>
        <line x1="848" y1="342" x2="842" y2="348" stroke="var(--blueprint)" strokeWidth="0.25" />
        <text x="558" y="505" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">SPATTED U/C</text>
        <text x="395" y="210" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">UPPER WING</text>
        <text x="395" y="416" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">LOWER WING</text>
        <text x="440" y="290" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace">N-STRUTS</text>
        <line x1="462" y1="293" x2="475" y2="305" stroke="var(--blueprint)" strokeWidth="0.25" />
      </g>

      {/* ── TITLE BLOCK ── */}
      <rect x="40" y="555" width="880" height="70" stroke="var(--blueprint)" strokeWidth="0.5" fill="none" opacity="0.4" />
      <line x1="40" y1="573" x2="920" y2="573" stroke="var(--blueprint)" strokeWidth="0.3" opacity="0.35" />
      <line x1="280" y1="573" x2="280" y2="625" stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.3" />
      <line x1="520" y1="573" x2="520" y2="625" stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.3" />
      <line x1="720" y1="573" x2="720" y2="625" stroke="var(--blueprint)" strokeWidth="0.25" opacity="0.3" />
      <text x="480" y="567" fontSize="8.5" fill="var(--blueprint)" fontFamily="monospace" textAnchor="middle" opacity="0.55">BIPLANE — SIDE ELEVATION (STARBOARD) — ORTHOGRAPHIC PROJECTION</text>
      <text x="55" y="587" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace" opacity="0.45">DRAWING NO.</text>
      <text x="55" y="605" fontSize="10" fill="var(--ink)" fontFamily="monospace" opacity="0.5">BIP-001</text>
      <text x="55" y="618" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace" opacity="0.4">REV A</text>
      <text x="295" y="587" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace" opacity="0.45">SCALE</text>
      <text x="295" y="605" fontSize="9" fill="var(--ink)" fontFamily="monospace" opacity="0.45">NOT TO SCALE</text>
      <text x="535" y="587" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace" opacity="0.45">UNITS</text>
      <text x="535" y="605" fontSize="9" fill="var(--ink)" fontFamily="monospace" opacity="0.45">MILLIMETRES</text>
      <text x="735" y="587" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace" opacity="0.45">SHEET</text>
      <text x="735" y="605" fontSize="9" fill="var(--ink)" fontFamily="monospace" opacity="0.45">1 / 1</text>
      <text x="735" y="618" fontSize="6.5" fill="var(--blueprint)" fontFamily="monospace" opacity="0.4">3RD ANGLE PROJECTION</text>

      {/* Border frame */}
      <rect x="30" y="155" width="905" height="480" stroke="var(--blueprint)" strokeWidth="0.7" fill="none" opacity="0.2" />
    </motion.svg>
  );
}

export function IllustrationCode({ opacity }: IllusProps) {
  const visible = useVisible(opacity);
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
      {[
        { line: "01", delay: 0.1,  keyword: "import", kColor: "var(--blueprint)", rest: " numpy as np",          rx: 130, ry: 76  },
        { line: "02", delay: 0.22, keyword: "import", kColor: "var(--blueprint)", rest: " pandas as pd",         rx: 130, ry: 96  },
        { line: "04", delay: 0.38, keyword: "def",    kColor: "var(--amber)",     rest: " solve(data):",         rx: 104, ry: 122 },
        { line: "05", delay: 0.52, keyword: "return", kColor: "var(--amber)",     rest: " np.linalg.solve(data)",rx: 148, ry: 142 },
        { line: "06", delay: 0.66, keyword: "result", kColor: "var(--blueprint)", rest: " = solve(df.values)",   rx: 130, ry: 168 },
      ].map(({ line, delay, keyword, kColor, rest, rx, ry }) => (
        <motion.g key={line}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay }}
        >
          <text x="52" y={ry} fontSize="11" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.35">{line}</text>
          <text x="78" y={ry} fontSize="11" fill={kColor} fontFamily="monospace">{keyword}</text>
          <text x={rx}  y={ry} fontSize="11" fill="var(--ink)"  fontFamily="monospace">{rest}</text>
        </motion.g>
      ))}
      <motion.rect x="78" y="183" width="7" height="12" fill="var(--amber)"
        animate={visible ? { opacity: [0.8, 0, 0.8] } : { opacity: 0 }}
        transition={{ duration: 1.1, repeat: Infinity }} />
      <text x="38" y="268" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.5">FIRST LINES</text>
    </motion.svg>
  );
}

export function IllustrationArchitecture({ opacity }: IllusProps) {
  const visible = useVisible(opacity);
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
      <motion.rect x="22" y="108" width="80" height="42" rx="4" fill="var(--sky-pale)" fillOpacity="0.5" initial={{ opacity: 0, scale: 0.8 }} animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, ease }} />
      <text x="62" y="130" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="monospace">client</text>
      <text x="62" y="143" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">React / Next</text>

      <motion.rect x="160" y="28" width="82" height="42" rx="4" fill="var(--amber-dim)" initial={{ opacity: 0, scale: 0.8 }} animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, delay: 0.12, ease }} />
      <text x="201" y="50" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="monospace">API</text>
      <text x="201" y="63" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">REST · Socket.io</text>

      <motion.rect x="160" y="118" width="82" height="42" rx="4" fill="var(--paper-warm)" initial={{ opacity: 0, scale: 0.8 }} animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, delay: 0.22, ease }} />
      <text x="201" y="140" textAnchor="middle" fontSize="10" fill="var(--ink)" fontFamily="monospace">Auth</text>
      <text x="201" y="153" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">JWT · OAuth</text>

      <motion.rect x="160" y="208" width="82" height="42" rx="4" fill="var(--amber-dim)" initial={{ opacity: 0, scale: 0.8 }} animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }} transition={{ duration: 0.5, delay: 0.32, ease }} />
      <text x="201" y="230" textAnchor="middle" fontSize="10" fill="var(--amber)" fontFamily="monospace">AI Model</text>
      <text x="201" y="243" textAnchor="middle" fontSize="8" fill="var(--ink-soft)" fontFamily="monospace">Anthropic API</text>

      {/* DB */}
      <motion.g initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5, delay: 0.42 }}>
        <ellipse cx="330" cy="136" rx="32" ry="9" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M298,136 L298,164 Q298,173 330,173 Q362,173 362,164 L362,136" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.5" />
        <ellipse cx="330" cy="136" rx="32" ry="9" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="330" y="158" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace">PostgreSQL</text>
      </motion.g>

      {/* Arrows — corrected architecture */}
      {/* Client → API */}
      <path d="M102,122 L160,55" stroke="var(--blueprint)" strokeOpacity="0.6" strokeDasharray="4 3" />
      {/* Client → Auth */}
      <path d="M102,135 L160,138" stroke="var(--blueprint)" strokeOpacity="0.6" strokeDasharray="4 3" />
      {/* API ↔ Auth (token verification on every protected request) */}
      <path d="M197,70 L197,118" stroke="var(--ink)" strokeOpacity="0.4" strokeDasharray="3 3" />
      <path d="M205,118 L205,70" stroke="var(--ink)" strokeOpacity="0.4" strokeDasharray="3 3" />
      {/* API → DB */}
      <path d="M242,50 L298,132" stroke="var(--ink)" strokeOpacity="0.35" strokeDasharray="3 4" />
      {/* Auth → DB */}
      <path d="M242,140 L298,140" stroke="var(--ink)" strokeOpacity="0.35" strokeDasharray="3 4" />
      {/* API → AI Model (routes around right side, avoids Auth box) */}
      <path d="M242,52 Q258,52 258,229 L242,229" stroke="var(--amber)" strokeOpacity="0.45" strokeDasharray="3 3" fill="none" />

      <text x="22" y="35" fontSize="9" fill="var(--blueprint)" fontFamily="monospace" opacity="0.5">SOFTWARE ENG</text>
    </motion.svg>
  );
}

export function IllustrationNeuralNet({ opacity }: IllusProps) {
  const visible = useVisible(opacity);
  // Positions — nodes shifted down so headers at y=12 don't clip top nodes
  const inX = 52, h1X = 144, h2X = 248, outX = 340;
  const inY  = [50, 98, 148, 198];
  const h1Y  = [36, 80, 128, 176, 220];
  const h2Y  = [52, 100, 150, 198];
  const outY = [88, 148, 208];

  // Active forward-pass: x₂ → h1[2] → h2[1] → c₁
  const isActiveIH   = (ii: number, hi: number)  => ii === 1 && hi === 2;
  const isActiveH1H2 = (hi: number, h2i: number) => hi === 2 && h2i === 1;
  const isActiveH2O  = (h2i: number, oi: number) => h2i === 1 && oi === 0;

  // Gray weights all draw quickly (0–0.55s).
  // Active segments fire sequentially after that (0.8 → 1.2 → 1.6),
  // making the forward-pass propagation visually clear.
  const activeDelay = [0.8, 1.2, 1.6];

  return (
    <motion.svg
      style={{ opacity, position: "absolute", inset: 0, margin: "auto" }}
      className="h-[76%] w-[76%]"
      viewBox="0 0 400 280"
      fill="none"
      aria-hidden
    >
      {/* Layer headers — above all nodes */}
      <text x={inX}  y="12" textAnchor="middle" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.5">input</text>
      <text x={h1X}  y="12" textAnchor="middle" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.5">h₁ · relu</text>
      <text x={h2X}  y="12" textAnchor="middle" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.5">h₂ · relu</text>
      <text x={outX} y="12" textAnchor="middle" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.5">out · softmax</text>

      {/* ── Gray weights ── draw first, fast */}
      {inY.flatMap((iy, ii) => h1Y.map((hy, hi) => isActiveIH(ii, hi) ? null : (
        <motion.line key={`ih${ii}${hi}`} x1={inX} y1={iy} x2={h1X} y2={hy}
          stroke="var(--ink)" strokeOpacity="0.07" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.4, delay: (ii + hi) * 0.012 }} />
      )))}
      {h1Y.flatMap((hy, hi) => h2Y.map((h2y, h2i) => isActiveH1H2(hi, h2i) ? null : (
        <motion.line key={`hh${hi}${h2i}`} x1={h1X} y1={hy} x2={h2X} y2={h2y}
          stroke="var(--ink)" strokeOpacity="0.07" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.4, delay: 0.18 + (hi + h2i) * 0.012 }} />
      )))}
      {h2Y.flatMap((h2y, h2i) => outY.map((oy, oi) => isActiveH2O(h2i, oi) ? null : (
        <motion.line key={`ho${h2i}${oi}`} x1={h2X} y1={h2y} x2={outX} y2={oy}
          stroke="var(--ink)" strokeOpacity="0.07" strokeWidth="0.6"
          initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.4, delay: 0.36 + (h2i + oi) * 0.014 }} />
      )))}

      {/* ── Active forward-pass — fires sequentially after weights ── */}
      <motion.line x1={inX} y1={inY[1]} x2={h1X} y2={h1Y[2]}
        stroke="var(--amber)" strokeOpacity="0.85" strokeWidth="1.4"
        initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.35, delay: activeDelay[0], ease: [0.4, 0, 0.2, 1] }} />
      <motion.line x1={h1X} y1={h1Y[2]} x2={h2X} y2={h2Y[1]}
        stroke="var(--amber)" strokeOpacity="0.85" strokeWidth="1.4"
        initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.35, delay: activeDelay[1], ease: [0.4, 0, 0.2, 1] }} />
      <motion.line x1={h2X} y1={h2Y[1]} x2={outX} y2={outY[0]}
        stroke="var(--amber)" strokeOpacity="0.85" strokeWidth="1.4"
        initial={{ pathLength: 0 }} animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.35, delay: activeDelay[2], ease: [0.4, 0, 0.2, 1] }} />

      {/* ── Nodes ── */}
      {inY.map((y, i) => (
        <motion.g key={"in"+i} initial={{ scale: 0 }} animate={visible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.28, delay: i * 0.045, ease }}>
          <circle cx={inX} cy={y} r="11" fill="var(--sky-pale)" stroke="var(--ink)" strokeWidth="1.2" />
          <text x={inX - 15} y={y + 3} fontSize="7.5" fill="var(--ink-soft)" fontFamily="monospace" textAnchor="end" opacity="0.55">x{i + 1}</text>
        </motion.g>
      ))}
      {h1Y.map((y, i) => (
        <motion.g key={"h1"+i} initial={{ scale: 0 }} animate={visible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.28, delay: 0.16 + i * 0.04, ease }}>
          <circle cx={h1X} cy={y} r="11" fill="var(--paper-warm)" stroke="var(--amber)" strokeWidth="1.2" strokeOpacity="0.65" />
        </motion.g>
      ))}
      {h2Y.map((y, i) => (
        <motion.g key={"h2"+i} initial={{ scale: 0 }} animate={visible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.28, delay: 0.32 + i * 0.04, ease }}>
          <circle cx={h2X} cy={y} r="11" fill="var(--paper-warm)" stroke="var(--amber)" strokeWidth="1.2" strokeOpacity="0.65" />
        </motion.g>
      ))}
      {outY.map((y, i) => (
        <motion.g key={"out"+i} initial={{ scale: 0 }} animate={visible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.28, delay: 0.5 + i * 0.05, ease }}>
          <circle cx={outX} cy={y} r="12" fill="var(--amber)" fillOpacity="0.12" stroke="var(--amber)" strokeWidth="1.4" />
          <text x={outX + 16} y={y + 3} fontSize="7.5" fill="var(--amber)" fontFamily="monospace" textAnchor="start" opacity="0.75">c{i + 1}</text>
        </motion.g>
      ))}

      {/* Legend — bottom left, clear of all nodes */}
      <line x1="22" y1="255" x2="40" y2="255" stroke="var(--amber)" strokeWidth="1.3" opacity="0.8" />
      <text x="44" y="258" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.55">forward pass</text>
      <line x1="22" y1="267" x2="40" y2="267" stroke="var(--ink)" strokeWidth="0.6" opacity="0.28" />
      <text x="44" y="270" fontSize="7" fill="var(--ink-soft)" fontFamily="monospace" opacity="0.42">weight</text>

      <text x="22" y="278" fontSize="8" fill="var(--blueprint)" fontFamily="monospace" opacity="0.45">AI / ML</text>
    </motion.svg>
  );
}

function Tick({ pos }: { pos: string }) {
  return <span aria-hidden className={`absolute h-3 w-3 border border-ink/35 ${pos}`} />;
}
