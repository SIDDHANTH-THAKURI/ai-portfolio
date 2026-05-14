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

type SkillGroup = { label: string; accent: string; items: string[] };

const groups: SkillGroup[] = [
  {
    label: "Languages",
    accent: "#d97706",
    items: ["C#", "TypeScript", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Frameworks",
    accent: "#2c4a6b",
    items: ["ASP.NET Core", "Entity Framework Core", "React", "Next.js", "Node.js", "FastAPI"],
  },
  {
    label: "AI / ML",
    accent: "#2d8a7f",
    items: ["Anthropic API", "Claude Code", "OpenRouter", "LLMs", "BERT", "ChemBERTa", "Transformers", "scikit-learn"],
  },
  {
    label: "Infrastructure",
    accent: "#7a9b76",
    items: ["PostgreSQL", "MongoDB", "SQL Server", "Docker", "Azure", "AWS", "Vercel", "Render", "Stripe"],
  },
  {
    label: "Tools",
    accent: "#5b5f6b",
    items: ["Git", "GitHub Actions", "xUnit / NUnit", "Jira", "Postman", "Figma"],
  },
];

export function MobileSkills() {
  return (
    <section id="m-skills" className="relative px-5 py-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber"
      >
        The Story · 05 · By the Numbers
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mb-12 font-display font-light italic leading-[1] text-ink"
        style={{ fontSize: "clamp(34px, 10.5vw, 54px)" }}
      >
        Counted,<br />not claimed.
      </motion.h2>

      {/* Stats — 2-column grid */}
      <div className="mb-16 grid grid-cols-2 gap-x-6 gap-y-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease, delay: i * 0.055 }}
          >
            <div
              className="font-display font-light italic leading-none text-amber"
              style={{ fontSize: "clamp(42px, 13vw, 72px)" }}
            >
              {s.value}
            </div>
            <p className="mt-2 font-body text-[12px] uppercase tracking-wider text-ink-soft">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Toolkit header */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-amber"
      >
        The Toolkit
      </motion.p>

      {/* Skill groups */}
      <div className="space-y-10">
        {groups.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease, delay: gi * 0.05 }}
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: g.accent }}
                aria-hidden
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft/70">
                {g.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item, ii) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease, delay: gi * 0.05 + ii * 0.035 }}
                  className="rounded-full border border-ink/12 bg-paper px-3.5 py-1 font-body text-[13px] text-ink-soft"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
