"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type Project = {
  num: string;
  title: string;
  tags: string[];
  oneLine: string;
  stack: string[];
  link: { label: string; href: string | null };
  preview: { gradient: string; domain?: string } | null;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Job Hunter",
    tags: ["Personal Project", "AI Tool", "Open Source"],
    oneLine: "AI-powered job hunting system that crawls Seek, LinkedIn, and Indeed — scores listings and generates tailored resumes.",
    stack: ["Python", "Flask", "SQLite", "Claude AI", "Playwright"],
    link: { label: "GitHub", href: "https://github.com/SIDDHANTH-THAKURI/Job-Hunter" },
    preview: { gradient: "linear-gradient(135deg, #fdf4f3 0%, #f5c5c0 55%, #c44536 100%)", domain: "github.com" },
  },
  {
    num: "02",
    title: "DrugNexusAI",
    tags: ["Live", "Clinical AI"],
    oneLine: "A production clinical AI platform for drug interaction analysis. Real users. Not a demo.",
    stack: ["React", "Node.js", "FastAPI", "MongoDB", "Anthropic API", "ChemBERTa"],
    link: { label: "drugnexusai.app", href: "https://drugnexusai.app" },
    preview: { gradient: "linear-gradient(135deg, #d0e8f0 0%, #a0c8dc 40%, #5fa8c8 100%)", domain: "drugnexusai.app" },
  },
  {
    num: "03",
    title: "ShiftMate",
    tags: ["Live", "SaaS", "AI Workforce"],
    oneLine: "AI rostering built from watching scheduling collapse in real time.",
    stack: ["React", "Node.js", "PostgreSQL", "Twilio", "Anthropic API", "Stripe"],
    link: { label: "shiftmate-1.onrender.com", href: "https://shiftmate-1.onrender.com/" },
    preview: { gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 45%, #f59e0b 100%)", domain: "shiftmate" },
  },
  {
    num: "04",
    title: "WAYA",
    tags: ["Live", "AI Scheduling"],
    oneLine: "AI-powered group scheduling with real-time chat, polls, and a React Native mobile app.",
    stack: ["Node.js", "Next.js", "PostgreSQL", "Socket.io", "React Native", "Anthropic API"],
    link: { label: "waya.onrender.com", href: "https://waya.onrender.com/" },
    preview: { gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 45%, #818cf8 100%)", domain: "waya" },
  },
  {
    num: "05",
    title: "HireReady",
    tags: ["Live", "AI Tool"],
    oneLine: "Resume tailoring from my own stack of rejection emails.",
    stack: ["React", "Node.js", "Anthropic API"],
    link: { label: "hirereadyai.app", href: "http://hirereadyai.app/" },
    preview: { gradient: "linear-gradient(135deg, #dcfce7 0%, #86efac 50%, #22c55e 100%)", domain: "hirereadyai.app" },
  },
  {
    num: "06",
    title: "AlgoViz",
    tags: ["Live", "Education"],
    oneLine: "Algorithm visualiser that makes sorting make sense.",
    stack: ["TypeScript", "React"],
    link: { label: "algo-viz-pi.vercel.app", href: "https://algo-viz-pi.vercel.app" },
    preview: { gradient: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 45%, #3b82f6 100%)", domain: "algo-viz" },
  },
  {
    num: "07",
    title: "Demon Slayer Focus",
    tags: ["Live", "Productivity"],
    oneLine: "A Pomodoro timer inside the world of Demon Slayer.",
    stack: ["TypeScript", "React", "Next.js"],
    link: { label: "demon-slayer-focus.vercel.app", href: "https://demon-slayer-focus.vercel.app" },
    preview: { gradient: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 45%, #ec4899 100%)", domain: "demon-slayer" },
  },
  {
    num: "08",
    title: "Escape Velocity",
    tags: ["Live", "Game"],
    oneLine: "A door-choice game inspired by Takeshi's Castle. PC and Android.",
    stack: ["Unity", "C#", "Android"],
    link: { label: "Play on itch.io", href: "https://team-aero.itch.io/escape-velocity" },
    preview: { gradient: "linear-gradient(135deg, #f0fdf4 0%, #86efac 35%, #1a2e1a 100%)", domain: "itch.io" },
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease }}
      className="border border-ink/12 bg-paper/75 backdrop-blur-sm"
    >
      {/* Preview with browser chrome */}
      {project.preview && (
        <div className="border-b border-ink/8">
          {/* Browser chrome bar */}
          <div className="flex h-7 items-center gap-1.5 border-b border-ink/8 bg-paper/85 px-2.5">
            <span className="h-2 w-2 rounded-full bg-red/50" />
            <span className="h-2 w-2 rounded-full bg-amber/50" />
            <span className="h-2 w-2 rounded-full bg-teal/50" />
            <span className="ml-1.5 h-3.5 flex-1 rounded-sm border border-ink/10 bg-paper-warm px-1.5 font-mono text-[8px] leading-[14px] text-ink-soft/50 truncate">
              {project.preview.domain ?? "app"}
            </span>
          </div>
          {/* Gradient page preview */}
          <div
            className="h-20 w-full"
            style={{ background: project.preview.gradient }}
          >
            <div className="flex h-full flex-col justify-center gap-1.5 p-3 opacity-25">
              <div className="h-1.5 w-3/4 rounded-full bg-white/80" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/80" />
              <div className="h-1.5 w-full rounded-full bg-white/60" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Number + tags */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <span
            className="font-display font-light italic leading-none text-amber/35"
            style={{ fontSize: 44 }}
          >
            {project.num}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {project.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                  t === "Live"
                    ? "border-teal/40 text-teal"
                    : "border-ink/15 text-ink-soft"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3
          className="mb-2 font-display font-light italic leading-tight text-ink"
          style={{ fontSize: "clamp(22px, 7vw, 30px)" }}
        >
          {project.title}
        </h3>

        {/* One-liner */}
        <p className="mb-4 text-[14px] leading-snug text-ink">{project.oneLine}</p>

        {/* Stack pills */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-ink/12 bg-paper px-2.5 py-0.5 font-mono text-[10px] text-ink-soft"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link.href ? (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-amber transition-colors hover:text-ink"
          >
            {project.link.label}
            <span aria-hidden>↗</span>
          </a>
        ) : (
          <span className="font-mono text-[11px] text-ink-soft/55">{project.link.label}</span>
        )}
      </div>
    </motion.div>
  );
}

export function MobileProjects() {
  return (
    <section id="m-work" className="relative px-5 py-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber"
      >
        The Story · 02 · Selected Work
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mb-12 font-display font-light italic leading-[1] text-ink"
        style={{ fontSize: "clamp(34px, 10.5vw, 54px)" }}
      >
        Things I&apos;ve<br />actually shipped.
      </motion.h2>

      <div className="space-y-5">
        {projects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </div>
    </section>
  );
}
