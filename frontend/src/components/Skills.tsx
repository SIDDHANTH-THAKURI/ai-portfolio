"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "280+", label: "LeetCode problems" },
  { value: "120+", label: "Code reviews" },
  { value: "18%", label: "Defect reduction" },
  { value: "77.9", label: "WAM Distinction" },
  { value: "6", label: "Shipped projects" },
  { value: "2", label: "Live products" },
];

type Group = { label: string; accent: string; items: string[] };

const groups: Group[] = [
  {
    label: "Languages",
    accent: "#d97706",   // amber
    items: ["C#", "TypeScript", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Frameworks",
    accent: "#2c4a6b",   // blueprint
    items: ["ASP.NET Core", "React", "Next.js", "Node.js", "FastAPI"],
  },
  {
    label: "AI / ML",
    accent: "#2d8a7f",   // teal
    items: [
      "Anthropic API",
      "OpenRouter",
      "BERT",
      "ChemBERTa",
      "Transformers",
      "Mistral",
      "GPT-4",
      "scikit-learn",
    ],
  },
  {
    label: "Infrastructure",
    accent: "#7a9b76",   // sage
    items: [
      "PostgreSQL",
      "MongoDB",
      "SQL Server",
      "Docker",
      "Azure",
      "AWS",
      "Vercel",
      "Render",
      "Twilio",
      "Stripe",
    ],
  },
  {
    label: "Tools",
    accent: "#5b5f6b",   // ink-soft
    items: ["Git", "Jira", "Postman", "Figma"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-[140px] md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 md:mb-28"
        >
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.28em] text-amber">
            The Story · 05 · By the Numbers
          </p>
          <h2
            className="font-display font-light italic leading-[1] text-ink"
            style={{ fontSize: "clamp(40px, 6.5vw, 82px)" }}
          >
            Counted, not claimed.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease, delay: i * 0.05 }}
              className="group"
            >
              <div
                className="font-display font-light italic leading-none text-amber transition-opacity duration-300"
                style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
              >
                {s.value}
              </div>
              <p className="mt-3 font-body text-[13px] uppercase tracking-wider text-ink-soft md:text-[14px]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Interactive skill tag groups ─────────────────────────────── */}
        <div className="mt-32">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="mb-14 font-mono text-[12px] uppercase tracking-[0.28em] text-amber"
          >
            The Toolkit
          </motion.p>

          <div className="space-y-14">
            {groups.map((g, gi) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease, delay: gi * 0.06 }}
              >
                {/* Category header with colour dot */}
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: g.accent }}
                    aria-hidden
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft/70">
                    {g.label}
                  </span>
                </div>

                {/* Tag cloud */}
                <div className="flex flex-wrap gap-2.5">
                  {g.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, ease, delay: gi * 0.06 + ii * 0.04 }}
                      whileHover={{
                        y: -3,
                        boxShadow: `0 6px 20px -6px ${g.accent}55`,
                        borderColor: g.accent,
                        color: g.accent,
                        transition: { duration: 0.18 },
                      }}
                      className="cursor-default rounded-full border border-ink/14 bg-paper px-4 py-1.5 font-body text-[14px] text-ink-soft transition-colors duration-200"
                      style={{ willChange: "transform" }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
