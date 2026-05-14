"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AUTO_DISMISS_MS = 5000;

// ── Entry screen ─────────────────────────────────────────────────────────────

function EntryScreen({ onEnter }: { onEnter: (withSound: boolean) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onEnter(false), AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [onEnter]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #c8dcec 0%, #e6effa 45%, #f6f1e8 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* Paper plane — arcs in from upper-right */}
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: 90, y: -90, rotate: -25, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <polygon points="27,5 5,14 12,16 14,24" fill="#1a1d24" />
        <polygon points="12,16 5,14 10,19" fill="#d97706" />
        <circle cx="7" cy="25" r="1.5" fill="#d97706" opacity="0.55" />
        <circle cx="4" cy="27.5" r="1" fill="#d97706" opacity="0.30" />
      </motion.svg>

      {/* Amber trail dots that follow the plane's path */}
      {[
        { x: 40, y: -40, delay: 0.15, size: 4, op: 0.35 },
        { x: 65, y: -65, delay: 0.05, size: 2.5, op: 0.2 },
      ].map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-amber-400 pointer-events-none"
          style={{ width: dot.size, height: dot.size }}
          initial={{ x: dot.x, y: dot.y, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, dot.op, 0] }}
          transition={{ delay: dot.delay, duration: 1.3, ease: "easeOut" }}
        />
      ))}

      {/* Name */}
      <motion.p
        className="mt-7 font-display text-[2rem] italic text-ink/80 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        Siddhanth Thakuri
      </motion.p>

      {/* Arc descriptor */}
      <motion.p
        className="mt-1.5 font-mono text-[10px] tracking-[0.22em] text-ink/35 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.7 }}
      >
        software · ai
      </motion.p>

      {/* Divider */}
      <motion.div
        className="mt-8 w-8 h-px bg-ink/15"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      />

      {/* Buttons */}
      <motion.div
        className="mt-6 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <button
          onClick={() => onEnter(true)}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-amber-500/50 bg-paper/40 text-amber-600 font-mono text-[11px] tracking-widest uppercase hover:bg-amber-50/60 hover:border-amber-500 hover:shadow-[0_0_16px_rgba(217,119,6,0.2)] transition-all duration-300 cursor-pointer"
        >
          <span aria-hidden className="text-base leading-none">♪</span>
          <span>enter with sound</span>
        </button>
        <button
          onClick={() => onEnter(false)}
          className="px-5 py-2 font-mono text-[11px] tracking-widest uppercase text-ink/30 hover:text-ink/55 transition-colors duration-300 cursor-pointer"
        >
          enter silent
        </button>
      </motion.div>

      {/* Auto-dismiss countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink/5">
        <motion.div
          className="h-full bg-amber-400/45"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

// ── Sound bar animation (used in player button) ───────────────────────────────

function SoundBar({ delay }: { delay: number }) {
  return (
    <motion.span
      className="w-[2px] rounded-full bg-amber-500 origin-bottom"
      animate={{ scaleY: [0.3, 1, 0.5, 0.8, 0.3] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ height: 12 }}
    />
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function MusicPlayer() {
  const [showEntry, setShowEntry] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show entry screen only on first visit (per session)
  useEffect(() => {
    if (!sessionStorage.getItem("entry_seen")) {
      setShowEntry(true);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setUnavailable(true);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      ctxRef.current?.close();
    };
  }, []);

  const bootstrap = useCallback(() => {
    if (ctxRef.current || !audioRef.current) return;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    ctx.createMediaElementSource(audioRef.current).connect(gain);
    ctxRef.current = ctx;
    gainRef.current = gain;
  }, []);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    bootstrap();
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    audio
      .play()
      .then(() => {
        gainRef.current!.gain.setTargetAtTime(
          0.4,
          ctxRef.current!.currentTime,
          1.2
        );
        setPlaying(true);
      })
      .catch(() => setUnavailable(true));
  }, [bootstrap]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !ctxRef.current) return;
    gainRef.current!.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.6);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => audio.pause(), 1800);
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    playing ? stopMusic() : startMusic();
  }, [playing, startMusic, stopMusic]);

  const handleEntry = useCallback(
    (withSound: boolean) => {
      sessionStorage.setItem("entry_seen", "1");
      setShowEntry(false);
      if (withSound) startMusic();
    },
    [startMusic]
  );

  return (
    <>
      <audio ref={audioRef} src="/music/ambient.mp3" loop preload="none" />

      <AnimatePresence>
        {showEntry && !unavailable && (
          <EntryScreen key="entry" onEnter={handleEntry} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showEntry && !unavailable && (
          <motion.div
            key="player-btn"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={toggle}
              title={playing ? "Pause music" : "Play ambient music"}
              className={[
                "group relative flex items-center gap-2 px-3 py-2 rounded-full",
                "border transition-all duration-500",
                "font-mono text-[10px] tracking-widest uppercase",
                "backdrop-blur-sm select-none cursor-pointer",
                playing
                  ? "border-amber-500/60 bg-paper/90 text-amber-600 shadow-[0_0_18px_rgba(217,119,6,0.22)]"
                  : "border-ink/10 bg-paper/80 text-ink/40 hover:text-ink/70 hover:border-ink/20",
              ].join(" ")}
            >
              <span className="flex items-end gap-[2px] h-3" aria-hidden>
                {playing ? (
                  <>
                    <SoundBar delay={0} />
                    <SoundBar delay={0.15} />
                    <SoundBar delay={0.3} />
                    <SoundBar delay={0.08} />
                  </>
                ) : (
                  <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    <path
                      d="M2 9V4L9 2V7"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="1.5" cy="9.5" r="1.5" fill="currentColor" />
                    <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" />
                  </svg>
                )}
              </span>

              <span className="leading-none">
                {playing ? "ambient" : "music"}
              </span>

              {playing && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-amber-400/30"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
