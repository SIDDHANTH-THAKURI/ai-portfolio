"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reveal button 2 s after load so it doesn't distract on first impression
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // error fires if the file is missing or can't be decoded
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

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // AudioContext must be created inside a user gesture (browser policy)
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      ctx.createMediaElementSource(audio).connect(gain);
      ctxRef.current = ctx;
      gainRef.current = gain;
    }

    const ctx = ctxRef.current;
    const gain = gainRef.current!;

    if (playing) {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.6);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      fadeTimer.current = setTimeout(() => audio.pause(), 1800);
      setPlaying(false);
    } else {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      audio.play().then(() => {
        gain.gain.setTargetAtTime(0.4, ctx.currentTime, 1.2);
        setPlaying(true);
      }).catch(() => setUnavailable(true));
    }
  }, [playing]);

  return (
    <>
      {/* preload=none means no network request until play() is called */}
      <audio ref={audioRef} src="/music/ambient.mp3" loop preload="none" />

      <AnimatePresence>
        {visible && !unavailable && (
          <motion.div
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
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

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
