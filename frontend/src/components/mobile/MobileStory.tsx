"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useInView, animate } from "framer-motion";
import {
  IllustrationBiplane,
  IllustrationCode,
  IllustrationArchitecture,
  IllustrationNeuralNet,
} from "@/components/Origin";
const ease = [0.16, 1, 0.3, 1] as const;

type Beat = {
  chapter: string;
  year: string;
  line: string;
  note: string;
};

const beats: Beat[] = [
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
    line: "Joined Accenture — one level above graduate entry.",
    note: "C#, ASP.NET Core, Azure · Unsung Hero Award 2022 · 120+ code reviews.",
  },
  {
    chapter: "04 · AI & Machine Learning",
    year: "2023 – Now",
    line: "Moved to Australia. Started shipping AI products.",
    note: "UoW Master of CS · Distinction · DrugNexusAI, ShiftMate, WAYA — real problems, real users.",
  },
];

const IllusComponents = [
  IllustrationBiplane,
  IllustrationCode,
  IllustrationArchitecture,
  IllustrationNeuralNet,
] as const;

function StoryCard({ beat, index }: { beat: Beat; index: number }) {
  const opacity = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });
  const Illu = IllusComponents[index];
  // Biplane has a very wide viewBox — give it more vertical room
  const illuHeight = index === 0 ? 190 : 210;

  useEffect(() => {
    if (isInView) {
      animate(opacity, 1, { duration: 0.95 });
    }
  }, [isInView, opacity]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease }}
      className="relative overflow-hidden border border-ink/12 bg-paper/75 backdrop-blur-sm"
    >
      {/* Illustration panel */}
      <div
        className="relative w-full border-b border-ink/8 bg-paper/50"
        style={{ height: illuHeight }}
      >
        {/* Engineering corner ticks */}
        <span aria-hidden className="absolute left-2 top-2 h-3 w-3 border-l border-t border-ink/22" />
        <span aria-hidden className="absolute right-2 top-2 h-3 w-3 border-r border-t border-ink/22" />
        <span aria-hidden className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-ink/22" />
        <span aria-hidden className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-ink/22" />
        <span className="absolute bottom-2.5 left-3 font-mono text-[8px] uppercase tracking-[0.2em] text-ink/22">
          fig · 0{index + 1}
        </span>
        <span className="absolute bottom-2.5 right-3 font-mono text-[8px] uppercase tracking-[0.2em] text-ink/20">
          scale 1:1
        </span>

        {/* Illustration — absolute + inset:0 + margin:auto centers within parent */}
        <Illu opacity={opacity} />
      </div>

      {/* Text content */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
          <span aria-hidden className="h-px w-5 bg-amber/70" />
          {beat.chapter}
        </div>
        <p
          className="font-display font-light italic leading-[1.12] text-ink"
          style={{ fontSize: "clamp(21px, 6vw, 27px)" }}
        >
          {beat.line}
        </p>
        <p className="mt-3 font-body text-[13px] leading-relaxed text-ink-soft">
          {beat.note}
        </p>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/28">
          {beat.year}
        </div>
      </div>
    </motion.div>
  );
}

export function MobileStory() {
  return (
    <section id="m-story" className="relative px-5 py-20">
      {/* Section header */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-amber"
      >
        The Story · 01
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="font-display font-light italic leading-[1.02] text-ink"
        style={{ fontSize: "clamp(36px, 11vw, 56px)" }}
      >
        From sky <span className="text-amber italic">→</span>
        <br />
        to circuit.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease, delay: 0.12 }}
        className="mb-12 mt-4 font-display italic text-ink-soft"
        style={{ fontSize: "clamp(15px, 4.5vw, 18px)" }}
      >
        A propeller turning into a logic gate. Same engineer, different altitude.
      </motion.p>

      {/* Story cards */}
      <div className="space-y-6">
        {beats.map((beat, i) => (
          <StoryCard key={beat.chapter} beat={beat} index={i} />
        ))}
      </div>

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease }}
        className="mt-12 border-t border-ink/12 pt-10"
      >
        <p
          className="font-display italic text-ink"
          style={{ fontSize: "clamp(18px, 5.5vw, 24px)" }}
        >
          Everything on this site started as something I actually needed.
        </p>
      </motion.div>
    </section>
  );
}
