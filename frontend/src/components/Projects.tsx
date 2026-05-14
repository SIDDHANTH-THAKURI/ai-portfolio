"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type Project = {
  num: string;
  title: string;
  tags: string[];
  oneLine: string;
  description: string;
  stack: string[];
  link: { label: string; href: string | null };
  preview: { gradient: string; domain?: string } | null;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Job Hunter",
    tags: ["Personal Project", "AI Tool", "Automation", "Full-Stack", "Open Source"],
    oneLine: "AI-powered job hunting system that crawls Seek, LinkedIn, and Indeed, scores every listing, and generates a tailored resume and cover letter — all from a local dashboard.",
    description:
      "Job Hunter automates the most tedious parts of job searching: it crawls live listings across three major platforms using your target roles and locations, then uses Claude AI to score each job 1–10 against your actual profile. For any role you want to pursue, it generates a fully tailored, ATS-safe resume and cover letter in Word and PDF format — without overclaiming your skills. Built and used during my own active job search.",
    stack: ["Python", "Flask", "SQLite", "Claude AI (Sonnet + Haiku)", "Apify", "Playwright", "python-docx", "HTML/CSS/JS"],
    link: { label: "GitHub", href: "https://github.com/SIDDHANTH-THAKURI/Job-Hunter" },
    preview: {
      gradient: "linear-gradient(135deg, #fdf4f3 0%, #f5c5c0 55%, #c44536 100%)",
      domain: "github.com",
    },
  },
  {
    num: "02",
    title: "DrugNexusAI",
    tags: ["Live", "Clinical AI"],
    oneLine: "A production clinical AI platform for drug interaction analysis.",
    description:
      "Built a live dual-portal system (doctor + patient) with an intelligent AI chatbot running 9+ LLM fallback models. ChemBERTa-based drug-drug interaction detection. Stanford AI de-identification. Multi-cloud: Vercel + AWS App Runner + Render. Real users. Not a demo.",
    stack: ["React", "Node.js", "FastAPI", "MongoDB Atlas", "Anthropic API", "ChemBERTa"],
    link: { label: "drugnexusai.app", href: "https://drugnexusai.app" },
    preview: {
      gradient: "linear-gradient(135deg, #d0e8f0 0%, #a0c8dc 40%, #5fa8c8 100%)",
      domain: "drugnexusai.app",
    },
  },
  {
    num: "03",
    title: "ShiftMate",
    tags: ["Live", "SaaS", "AI Workforce"],
    oneLine: "AI rostering built from watching scheduling collapse in real time.",
    description:
      "I saw the problem. Built the fix. Role-based auth, AI sick-day cover calls via Twilio, manager and staff dashboards, Stripe credit billing, Anthropic API for intelligent scheduling suggestions.",
    stack: ["React", "Node.js", "PostgreSQL", "Twilio", "Anthropic API", "Stripe"],
    link: { label: "shiftmate-1.onrender.com", href: "https://shiftmate-1.onrender.com/" },
    preview: {
      gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 45%, #f59e0b 100%)",
      domain: "shiftmate",
    },
  },
  {
    num: "04",
    title: "WAYA",
    tags: ["Live", "Full-Stack", "AI Scheduling"],
    oneLine: "AI-powered group scheduling with real-time chat, polls, and a mobile app.",
    description:
      "Group scheduling is a mess. WAYA fixes it. Create a group, chat in real time, and type @WAYA — the AI finds a meeting time that works for everyone. If it can't resolve automatically, it creates a poll. Members vote. A calendar event is created from the result. Full-stack: REST + Socket.io backend, Next.js frontend, React Native mobile app.",
    stack: ["Node.js", "Next.js", "PostgreSQL", "Socket.io", "React Native", "Anthropic API", "Prisma"],
    link: { label: "waya.onrender.com", href: "https://waya.onrender.com/" },
    preview: {
      gradient: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 45%, #818cf8 100%)",
      domain: "waya",
    },
  },
  {
    num: "05",
    title: "HireReady",
    tags: ["Live", "AI Tool"],
    oneLine: "Resume tailoring from my own stack of rejection emails.",
    description:
      "Paste a job description. Get a tailored resume in 30 seconds. Built because I needed it. Now other people use it too.",
    stack: ["React", "Node.js", "Anthropic API"],
    link: { label: "hirereadyai.app", href: "http://hirereadyai.app/" },
    preview: {
      gradient: "linear-gradient(135deg, #dcfce7 0%, #86efac 50%, #22c55e 100%)",
      domain: "hirereadyai.app",
    },
  },
  {
    num: "06",
    title: "AlgoViz",
    tags: ["Live", "Education"],
    oneLine: "Algorithm visualiser that makes sorting make sense.",
    description:
      "Interactive visualisation of sorting and pathfinding algorithms. Built to understand deeply, not just to show on a portfolio.",
    stack: ["TypeScript", "React"],
    link: { label: "algo-viz-pi.vercel.app", href: "https://algo-viz-pi.vercel.app" },
    preview: {
      gradient: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 45%, #3b82f6 100%)",
      domain: "algo-viz",
    },
  },
  {
    num: "07",
    title: "Demon Slayer Focus",
    tags: ["Live", "Productivity"],
    oneLine: "A Pomodoro timer inside the world of Demon Slayer.",
    description:
      "Anime-themed productivity timer with Demon Slayer characters, focus modes, and atmospheric UI. Built for fun — shipped for real.",
    stack: ["TypeScript", "React", "Next.js"],
    link: { label: "demon-slayer-focus.vercel.app", href: "https://demon-slayer-focus.vercel.app" },
    preview: {
      gradient: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 45%, #ec4899 100%)",
      domain: "demon-slayer-focus",
    },
  },
  {
    num: "08",
    title: "Escape Velocity",
    tags: ["Live", "Game"],
    oneLine: "A door-choice game inspired by Takeshi's Castle.",
    description:
      "3 difficulty modes. A relentless police officer who chases you in Medium and Hard. Choose the wrong door — game over. Playable on PC and Android.",
    stack: ["Unity", "C#", "Android"],
    link: { label: "Play on itch.io", href: "https://team-aero.itch.io/escape-velocity" },
    preview: {
      gradient: "linear-gradient(135deg, #f0fdf4 0%, #86efac 35%, #1a2e1a 100%)",
      domain: "itch.io",
    },
  },
];

export function Projects() {
  return (
    <section id="work" className="relative px-6 py-[140px] md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 md:mb-28"
        >
          <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.28em] text-amber">
            The Story · 02 · Selected Work
          </p>
          <h2
            className="font-display font-light italic leading-[1] text-ink"
            style={{ fontSize: "clamp(40px, 6.5vw, 82px)" }}
          >
            Things I&apos;ve actually shipped.
          </h2>
        </motion.div>

        <ul className="border-t border-ink/12">
          {projects.map((p) => (
            <ProjectRow key={p.num} project={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [2.5, -2.5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-2.5, 2.5]);

  function onMouseMove(e: MouseEvent<HTMLLIElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { mx.set(0); my.set(0); }

  const isLive = project.tags.includes("Live");

  return (
    <motion.li
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 900 }}
      className="group relative border-b border-ink/12"
    >
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-amber transition-transform duration-500 ease-out group-hover:scale-y-100" />

      <motion.div
        style={{ rotateX, rotateY }}
        className="grid grid-cols-1 gap-6 px-2 py-10 transition-shadow duration-500 group-hover:shadow-[0_16px_48px_-16px_rgba(26,29,36,0.12)] md:grid-cols-[140px_1fr_auto] md:items-start md:gap-10 md:px-4 md:py-14"
      >
        {/* Number */}
        <div
          className="font-display font-light italic leading-none text-ink/18 transition-colors duration-500 group-hover:text-amber/60 md:pt-1"
          style={{ fontSize: "clamp(48px, 6.5vw, 80px)" }}
        >
          {project.num}
        </div>

        {/* Content */}
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
                  t === "Live"
                    ? "border-teal/40 text-teal"
                    : "border-ink/18 text-ink-soft"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <h3
            className="mb-3 font-display font-light italic leading-[1.05] text-ink"
            style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
          >
            {project.title}
          </h3>
          <p className="mb-4 max-w-2xl text-[16px] leading-snug text-ink">{project.oneLine}</p>
          <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{project.description}</p>

          <ul className="mb-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-ink/14 bg-paper px-3 py-1 font-mono text-[11px] text-ink-soft">
                {s}
              </li>
            ))}
          </ul>

          {project.link.href ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="ink-underline inline-flex items-center gap-2 font-mono text-[12px] text-amber transition-colors duration-300 hover:text-ink"
            >
              {project.link.label}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          ) : (
            <span className="font-mono text-[12px] text-ink-soft/55">{project.link.label}</span>
          )}
        </div>

        {/* Preview thumbnail — desktop only, live projects only */}
        {project.link.href && project.preview && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className="group/prev hidden shrink-0 overflow-hidden rounded-sm border border-ink/12 shadow-sm transition-all duration-400 hover:scale-[1.03] hover:shadow-md md:block"
            style={{ width: 172 }}
            aria-label={`Open ${project.title}`}
          >
            {/* Browser chrome */}
            <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 bg-paper px-2.5">
              <span className="h-2 w-2 rounded-full bg-red/50" />
              <span className="h-2 w-2 rounded-full bg-amber/50" />
              <span className="h-2 w-2 rounded-full bg-teal/50" />
              <span className="ml-1 h-3.5 flex-1 rounded-sm border border-ink/10 bg-paper-warm px-1 font-mono text-[8px] text-ink-soft/50 leading-[14px] truncate">
                {project.preview.domain ?? "app"}
              </span>
            </div>
            {/* Gradient "page" */}
            <div
              className="relative h-24 w-full"
              style={{ background: project.preview.gradient }}
            >
              <div className="absolute inset-0 flex flex-col gap-1.5 p-3 opacity-30">
                <div className="h-1.5 w-3/4 rounded-full bg-white/80" />
                <div className="h-1.5 w-1/2 rounded-full bg-white/80" />
                <div className="mt-1 h-1.5 w-full rounded-full bg-white/60" />
                <div className="h-1.5 w-5/6 rounded-full bg-white/60" />
                <div className="h-1.5 w-2/3 rounded-full bg-white/60" />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover/prev:bg-ink/15">
                <span className="translate-y-2 rounded bg-paper/90 px-2 py-1 font-mono text-[10px] text-ink opacity-0 transition-all duration-300 group-hover/prev:translate-y-0 group-hover/prev:opacity-100">
                  Open ↗
                </span>
              </div>
            </div>
          </a>
        )}
      </motion.div>
    </motion.li>
  );
}
