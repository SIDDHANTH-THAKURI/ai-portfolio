"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
  hueShift: number;
};

type TrailPoint = { x: number; y: number; life: number };

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: w * 0.5, y: h * 0.45, has: false };
    const plane = { x: w * 0.5, y: h * 0.45, angle: 0 };
    const trail: TrailPoint[] = [];
    let scrollY = window.scrollY;
    let scrollVel = 0;
    let lastScrollY = scrollY;
    let raf = 0;

    const particles: Particle[] = [];

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeParticles() {
      const count = w < 640 ? 38 : w < 1100 ? 70 : 110;
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.04 - Math.random() * 0.14,
          r: 0.5 + Math.random() * 1.8,
          alpha: 0.18 + Math.random() * 0.32,
          phase: Math.random() * Math.PI * 2,
          hueShift: Math.random(),
        });
      }
    }

    function pageProgress() {
      const docH = Math.max(
        document.documentElement.scrollHeight - h,
        1
      );
      return Math.min(Math.max(scrollY / docH, 0), 1);
    }

    function tick(t: number) {
      // Gentle damping on scroll velocity (reset each frame from delta).
      const sv = scrollVel;
      scrollVel *= 0.85;

      ctx!.clearRect(0, 0, w, h);
      const progress = pageProgress();

      // ---- Dust / particle field ---------------------------------------
      // Shift particle tone from sky-blue at the top to warm sepia further
      // down — matches the sky → paper gradient running on body.
      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 0.0008 + p.phase) * 0.18;
        p.y += p.vy - sv * 0.004;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Cursor repulsion — soft, only when close.
        if (mouse.has) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (14000 - d2) / 14000;
            p.x += (dx / Math.sqrt(d2 + 1)) * f * 0.6;
            p.y += (dy / Math.sqrt(d2 + 1)) * f * 0.6;
          }
        }

        // Tone interpolation: blue dust → sepia dust as you scroll.
        const blue = [60, 90, 130];
        const warm = [120, 90, 50];
        const r = Math.round(blue[0] + (warm[0] - blue[0]) * progress);
        const g = Math.round(blue[1] + (warm[1] - blue[1]) * progress);
        const b = Math.round(blue[2] + (warm[2] - blue[2]) * progress);

        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.7})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // ---- Paper plane + trail (skip on touch / reduced motion) --------
      if (!isTouch && !reduce) {
        // Ease plane toward cursor.
        const dx = mouse.x - plane.x;
        const dy = mouse.y - plane.y;
        plane.x += dx * 0.07;
        plane.y += dy * 0.07;
        const speed = Math.hypot(dx, dy);
        if (speed > 0.5) plane.angle = Math.atan2(dy, dx);

        // Append trail.
        if (mouse.has) {
          trail.push({ x: plane.x, y: plane.y, life: 1 });
          if (trail.length > 70) trail.shift();
        }
        for (const p of trail) p.life -= 0.018;

        // Draw trail as varying-width amber ink.
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];
          if (a.life <= 0 || b.life <= 0) continue;
          const lifeAvg = (a.life + b.life) * 0.5;
          ctx!.strokeStyle = `rgba(217, 119, 6, ${lifeAvg * 0.55})`;
          ctx!.lineWidth = lifeAvg * 1.6 + 0.4;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }

        // Draw plane silhouette.
        if (mouse.has) {
          ctx!.save();
          ctx!.translate(plane.x, plane.y);
          ctx!.rotate(plane.angle);

          // body
          ctx!.fillStyle = "rgba(26, 29, 36, 0.92)";
          ctx!.beginPath();
          ctx!.moveTo(14, 0);
          ctx!.lineTo(-12, 8);
          ctx!.lineTo(-7, 0);
          ctx!.lineTo(-12, -8);
          ctx!.closePath();
          ctx!.fill();

          // amber underwing
          ctx!.fillStyle = "rgba(217, 119, 6, 0.88)";
          ctx!.beginPath();
          ctx!.moveTo(-7, 0);
          ctx!.lineTo(-12, 5);
          ctx!.lineTo(-12, -5);
          ctx!.closePath();
          ctx!.fill();

          ctx!.restore();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.has = true;
    }
    function onLeave() {
      mouse.has = false;
    }
    function onScroll() {
      const y = window.scrollY;
      scrollVel = y - lastScrollY;
      lastScrollY = y;
      scrollY = y;
    }
    function onResize() {
      resize();
      makeParticles();
    }

    resize();
    makeParticles();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[3]"
    />
  );
}
