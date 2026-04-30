"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const codeLines = [
  { tokens: [{ t: "const", c: "blueprint" }, { t: " siddhanth", c: "amber" }, { t: " = {", c: "ink-soft" }] },
  { tokens: [{ t: "  origin:", c: "ink-soft" }, { t: ' "Aeronautical Engineering, India"', c: "teal" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: "  pivot:", c: "ink-soft" }, { t: ' "Python between lectures"', c: "teal" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: "  journey:", c: "ink-soft" }, { t: ' ["Accenture", "UoW — ML", "Sydney"]', c: "teal" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: "  products:", c: "ink-soft" }, { t: " [", c: "ink-soft" }] },
  { tokens: [{ t: '    "DrugNexusAI"', c: "teal" }, { t: ", ", c: "ink-soft" }, { t: '"ShiftMate"', c: "teal" }, { t: ", ", c: "ink-soft" }, { t: '"WAYA"', c: "teal" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: '    "HireReady"', c: "teal" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: "  ],", c: "ink-soft" }] },
  { tokens: [{ t: "  philosophy:", c: "ink-soft" }, { t: ' "Build what you need. Ship what you build."', c: "teal" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: "  status:", c: "ink-soft" }, { t: ' "In flight →"', c: "amber" }, { t: ",", c: "ink-soft" }] },
  { tokens: [{ t: "}", c: "ink-soft" }] },
];

const colorMap: Record<string, string> = {
  blueprint: "var(--blueprint)",
  amber: "var(--amber)",
  teal: "var(--teal)",
  "ink-soft": "var(--ink-soft)",
};

export function About() {
  return (
    <section id="about" className="relative px-6 py-[140px] md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 font-mono text-[12px] uppercase tracking-[0.28em] text-amber"
        >
          The Story · 04 · About
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="font-display font-light italic leading-[1.15] text-ink"
          style={{ fontSize: "clamp(28px, 4.2vw, 52px)" }}
        >
          I build from scratch what
          <span className="text-amber"> doesn&apos;t exist yet.</span>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-16 max-w-3xl space-y-6 text-[17px] leading-[1.8] text-ink-soft"
        >
          <p>
            Aeronautical engineering gave me the vocabulary of systems — how forces interact,
            where structures fail, how you win a millimetre of efficiency against physics.
            Software turned out to be the same discipline with different materials.
            I taught myself Python between lectures, not because I planned a pivot,
            but because the problems were too interesting to ignore.
          </p>
          <p>
            Every project on this site began as a real friction point.
            A scheduling system that breaks under pressure.
            A drug interaction that slips past a tired doctor.
            A resume that goes nowhere because it wasn&apos;t tailored.
            I build the tool I would have needed, then I ship it.
            That&apos;s the only brief I&apos;ve ever worked from.
          </p>
        </motion.div>

        {/* Code self-portrait — syntax-highlighted TypeScript object. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="relative mt-24"
        >
          {/* Card */}
          <div className="overflow-hidden border border-ink/12 bg-paper/80 shadow-[0_24px_60px_-30px_rgba(26,29,36,0.18)] backdrop-blur-sm">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-warm/70 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red/55" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/55" />
              <span className="h-2.5 w-2.5 rounded-full bg-teal/55" />
              <span className="ml-3 font-mono text-[11px] text-ink-soft/55">siddhanth.ts</span>
            </div>

            {/* Code body */}
            <div className="overflow-x-auto p-6 md:p-8">
              <pre className="font-mono text-[13px] leading-[1.85] md:text-[14px]">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, ease, delay: i * 0.045 }}
                    className="flex flex-wrap"
                  >
                    {/* Line number */}
                    <span className="mr-5 select-none text-ink-soft/25 w-5 text-right shrink-0">
                      {i + 1}
                    </span>
                    {/* Tokens */}
                    {line.tokens.map((tok, j) => (
                      <span key={j} style={{ color: colorMap[tok.c] ?? "var(--ink)" }}>
                        {tok.t}
                      </span>
                    ))}
                  </motion.div>
                ))}
              </pre>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between border-t border-ink/8 bg-paper-warm/50 px-5 py-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft/45">
                TypeScript · UTF-8
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-amber/50" />
                  <span className="relative h-2 w-2 rounded-full bg-amber" />
                </span>
                In flight
              </span>
            </div>
          </div>

          {/* Corner ticks for the drafting-paper feel */}
          <span aria-hidden className="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-amber/40" />
          <span aria-hidden className="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-amber/40" />
          <span aria-hidden className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-amber/40" />
          <span aria-hidden className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-amber/40" />
        </motion.div>
      </div>
    </section>
  );
}
