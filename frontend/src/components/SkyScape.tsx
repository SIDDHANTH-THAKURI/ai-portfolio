"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Three fixed background layers, all behind the canvas:
 *  1. Sun + sky-blue glow that fades as you scroll past the hero.
 *  2. Drifting hand-drawn clouds (visible in the sky zone).
 *  3. Blueprint grid that bleeds in during the aero → IT transition,
 *     then fades back out as the cream paper takes over.
 *
 * Opacities are scroll-driven via a single rAF loop on a ref so
 * we don't re-render React on every frame.
 */
export function SkyScape() {
  const sunRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let raf = 0;
    const tick = () => {
      const h = window.innerHeight || 1;
      const y = window.scrollY;

      // Phase 0..1 — page-relative scroll
      const skyPhase = clamp(y / (h * 0.9), 0, 1);          // hero -> faded by 1vh of scroll
      const transitionPhase = bell(y / h, 1.0, 0.55);        // peaks ~1vh in (Origin section)
      const paperPhase = clamp((y - h * 0.4) / h, 0, 1);

      if (sunRef.current) {
        sunRef.current.style.opacity = String(1 - skyPhase * 0.85);
        sunRef.current.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
      }
      if (skyRef.current) {
        skyRef.current.style.opacity = String(1 - skyPhase * 0.9);
      }
      if (cloudsRef.current) {
        cloudsRef.current.style.opacity = String(1 - skyPhase * 0.95);
        cloudsRef.current.style.transform = `translate3d(0, ${y * -0.25}px, 0)`;
      }
      if (horizonRef.current) {
        horizonRef.current.style.opacity = String(1 - skyPhase * 0.7);
        horizonRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
      }
      if (gridRef.current) {
        gridRef.current.style.opacity = String(transitionPhase * 0.55 + paperPhase * 0.18);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Sky tint — saturates the top of the page where the hero lives. */}
      <div
        ref={skyRef}
        className="absolute inset-x-0 top-0 h-[120vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(168, 197, 224, 0.55) 0%, rgba(200, 220, 236, 0.35) 40%, rgba(246, 241, 232, 0) 80%)",
        }}
      />

      {/* Sun — soft amber radial in the upper right. */}
      <div
        ref={sunRef}
        className="absolute"
        style={{
          right: "-8%",
          top: "-12%",
          width: "min(900px, 90vw)",
          height: "min(900px, 90vw)",
          background:
            "radial-gradient(closest-side, rgba(244, 196, 109, 0.65), rgba(232, 152, 70, 0.18) 45%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />

      {/* Distant horizon haze + a faint rolling line. */}
      <div
        ref={horizonRef}
        className="absolute inset-x-0"
        style={{ top: "62vh", height: "30vh" }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[26vh]"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(180, 160, 120, 0.18) 60%, rgba(140, 110, 60, 0.06))",
          }}
        />
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-[20vh] h-[20vh] w-full opacity-60"
        >
          <path
            d="M0,60 C200,40 360,75 540,55 C720,35 880,72 1080,52 L1200,58 L1200,120 L0,120 Z"
            fill="rgba(122, 155, 118, 0.18)"
          />
          <path
            d="M0,72 C220,60 380,82 560,68 C740,54 900,86 1100,68 L1200,72 L1200,120 L0,120 Z"
            fill="rgba(60, 90, 70, 0.10)"
          />
        </svg>
      </div>

      {/* Drifting clouds — three layers at different speeds for parallax. */}
      <div ref={cloudsRef} className="absolute inset-0">
        <Cloud
          className="absolute animate-drift-slow"
          style={{ left: "-6%", top: "12%", width: "44vw", opacity: 0.7 }}
        />
        <Cloud
          className="absolute animate-drift-slower"
          style={{ left: "55%", top: "22%", width: "32vw", opacity: 0.55 }}
        />
        <Cloud
          className="absolute animate-drift-slow"
          style={{ left: "20%", top: "48%", width: "26vw", opacity: 0.4 }}
        />
        <Cloud
          className="absolute animate-drift-slower"
          style={{ left: "70%", top: "60%", width: "30vw", opacity: 0.35 }}
        />
      </div>

      {/* Faint biplane sketch — far away, drifting */}
      <svg
        className="absolute animate-float-y"
        style={{ left: "68%", top: "26%", width: "9vw", minWidth: "90px", opacity: 0.55 }}
        viewBox="0 0 200 120"
        fill="none"
        stroke="rgba(44, 74, 107, 0.55)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* lower wing */}
        <path d="M20,72 L180,72" />
        {/* upper wing */}
        <path d="M30,42 L170,42" />
        {/* fuselage */}
        <path d="M70,57 L150,57 L162,52 L150,46 Z" />
        {/* struts */}
        <path d="M60,42 L60,72 M100,42 L100,72 M140,42 L140,72" />
        {/* tail */}
        <path d="M70,57 L62,38 M70,57 L62,76" />
        {/* propeller */}
        <path d="M162,42 L168,52 L162,62" />
      </svg>

      {/* Blueprint grid — bleeds in during the Origin transition. */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          backgroundImage:
            "linear-gradient(rgba(44, 74, 107, 0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(44, 74, 107, 0.45) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

function Cloud({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 400 160"
      fill="none"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth="0"
      aria-hidden
    >
      <defs>
        <radialGradient id="cloud-grad" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M80,110 C50,110 30,90 50,72 C40,52 70,38 92,52 C100,30 140,28 152,50 C176,42 210,52 214,76 C246,68 274,86 268,110 C268,128 240,140 212,134 C188,148 132,148 110,134 C92,142 64,138 60,124 C50,124 50,114 80,110 Z"
        fill="url(#cloud-grad)"
      />
    </svg>
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// Bell-shaped: 1 at center, 0 at edges. width controls steepness.
function bell(t: number, center: number, width: number) {
  const dx = (t - center) / width;
  return Math.max(0, 1 - dx * dx);
}
