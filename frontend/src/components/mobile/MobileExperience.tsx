"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Bullet = string | { text: string; highlight?: boolean; href?: string };

type Entry = {
  year: string;
  title: string;
  subtitle?: string;
  bullets?: Bullet[];
};

const entries: Entry[] = [
  {
    year: "Jan 2026 – Present",
    title: "Professional Year — ICT",
    subtitle: "QIBA · Professional Development Program",
    bullets: [
      "Information and Communication Technology stream",
      "Industry placement + professional skills development",
    ],
  },
  {
    year: "2023 – 2025",
    title: "Master of Computer Science",
    subtitle: "University of Wollongong · ML + Big Data",
    bullets: [
      "Distinction · WAM 77.9",
      "Academic Excellence Scholarship — UOW",
      { text: "Capstone: DrugNexusAI — clinical AI platform, now in production", href: "https://drugnexusai.app" },
    ],
  },
  {
    year: "2021 – 2023",
    title: "Software Engineer · Accenture",
    subtitle: "Hyderabad · C#, ASP.NET Core, React, SQL Server, Azure",
    bullets: [
      { text: "Unsung Hero Award 2022", highlight: true },
      "120+ code reviews · 18% defect reduction",
      "Recognised at Senior Analyst level on joining — above standard graduate entry",
    ],
  },
  {
    year: "2017 – 2021",
    title: "Bachelor of Aeronautical Engineering",
    subtitle: "MLR Institute of Technology, India",
    bullets: [
      { text: "Published: UAV design using computational modelling", href: "https://doi.org/10.1063/5.0109212" },
    ],
  },
];

const credentials = [
  "Microsoft SC-900 Certified",
  "Joy of Computing Using Python — NPTEL",
  "Python for Data Science — IBM (Coursera)",
  "Google Python Crash Course — Coursera",
];

function BulletItem({ bullet }: { bullet: Bullet }) {
  const isObj = typeof bullet === "object";
  const text = isObj ? bullet.text : bullet;
  const isHighlight = isObj && bullet.highlight;
  const href = isObj ? bullet.href : undefined;

  return (
    <li className="relative pl-4 text-[13px] leading-snug">
      <span
        aria-hidden
        className={`absolute left-0 top-[9px] h-px w-2.5 ${
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
              : "text-ink underline underline-offset-2 decoration-ink/20 hover:text-amber"
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
}

export function MobileExperience() {
  return (
    <section id="m-path" className="relative px-5 py-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber"
      >
        The Story · 03 · The Path
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mb-12 font-display font-light italic leading-[1.05] text-ink"
        style={{ fontSize: "clamp(32px, 10vw, 52px)" }}
      >
        From propulsion<br />to deployment.
      </motion.h2>

      {/* Timeline */}
      <ol className="relative">
        {/* Vertical line */}
        <span
          aria-hidden
          className="absolute bottom-3 left-[5px] top-3 w-px bg-ink/10"
        />

        {entries.map((entry, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease, delay: i * 0.05 }}
            className="relative pb-10 pl-8 last:pb-0"
          >
            {/* Timeline dot */}
            <span
              aria-hidden
              className="absolute left-0 top-[5px] h-2.5 w-2.5 rounded-full border-2 border-ink/30 bg-paper"
            />

            <div className="mb-1 font-mono text-[10px] tracking-wide text-amber">
              {entry.year}
            </div>

            <h3
              className="font-display font-light italic leading-tight text-ink"
              style={{ fontSize: "clamp(18px, 5.5vw, 24px)" }}
            >
              {entry.title}
            </h3>

            {entry.subtitle && (
              <p className="mt-0.5 font-body text-[12px] text-ink-soft">
                {entry.subtitle}
              </p>
            )}

            {entry.bullets && (
              <ul className="mt-3 space-y-2">
                {entry.bullets.map((b, j) => (
                  <BulletItem key={j} bullet={b} />
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>

      {/* Credentials */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mt-14 border-t border-ink/12 pt-8"
      >
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft/60">
          Credentials
        </p>
        <ul className="space-y-2.5">
          {credentials.map((c) => (
            <li key={c} className="font-body text-[13px] text-ink-soft">
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
