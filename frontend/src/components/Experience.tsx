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
      {
        text: "Capstone: DrugNexusAI — clinical AI platform, now in production",
        href: "https://drugnexusai.app",
      },
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

          {entries.map((entry, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              className="relative grid grid-cols-1 gap-2 pb-14 pl-10 last:pb-0 md:grid-cols-[160px_1fr] md:gap-12 md:pl-0"
            >
              {/* Dot */}
              <span
                aria-hidden
                className="absolute left-[3px] top-2 h-3 w-3 rounded-full border-2 border-ink/30 bg-paper md:left-[155px]"
              />

              <div className="font-mono text-[12px] tracking-wide text-amber md:pt-1.5 md:pr-10 md:text-right">
                {entry.year}
              </div>

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
                        <li
                          key={j}
                          className="relative pl-5 text-[15px] leading-snug"
                        >
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
                            <span
                              className={
                                isHighlight ? "font-medium text-amber" : "text-ink"
                              }
                            >
                              {text}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
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
