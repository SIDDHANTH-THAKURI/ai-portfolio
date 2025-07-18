"use client";
// src/app/page.tsx
import { useState, useEffect, useRef } from "react";
import Loader from "@/components/Loader";
import { useProgress } from '@react-three/drei';
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { BeyondCode } from "@/components/BeyondCode";
import { ExperienceEducation } from "@/components/ExperienceEducation";

function useSmoothProgress(target: number, speed = 0.15) {
  const [smooth, setSmooth] = useState(0);
  useEffect(() => {
    let frame: number;
    function animate() {
      setSmooth(prev => {
        const next = prev + (target - prev) * speed;
        if (Math.abs(next - target) < 0.5) return target;
        return next;
      });
      if (Math.abs(smooth - target) > 0.5) {
        frame = requestAnimationFrame(animate);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line
  }, [target]);
  return Math.round(smooth);
}

export default function Home() {
  const { progress } = useProgress();
  const smoothProgress = useSmoothProgress(progress);
  const [loading, setLoading] = useState(true);
  const minTime = useRef<number>(0);

  useEffect(() => {
    minTime.current = Date.now();
  }, []);

  useEffect(() => {
    if (progress >= 100 && smoothProgress >= 100) {
      const elapsed = Date.now() - minTime.current;
      const minDuration = 1200;
      const delay = Math.max(0, minDuration - elapsed);
      const timeout = setTimeout(() => setLoading(false), delay);
      return () => clearTimeout(timeout);
    }
  }, [progress, smoothProgress]);

  return (
    <main>
      {loading && <Loader progress={smoothProgress} />}
      <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.7s" }}>
        <Hero />
        <About />
        <ExperienceEducation />
        <Skills />
        <Projects />
        <BeyondCode />
        <Contact />
      </div>
    </main>
  );
}