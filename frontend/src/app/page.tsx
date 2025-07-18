"use client";
// src/app/page.tsx
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { BeyondCode } from "@/components/BeyondCode";
import { ExperienceEducation } from "@/components/ExperienceEducation";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/stars_milky_way.jpg";
    img.onload = () => {
      setTimeout(() => setLoading(false), 1200);
    };
    const timeout = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main>
      {loading && <Loader />}
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