import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        border: "var(--border)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        amber: "var(--amber)",
        "amber-glow": "var(--amber-glow)",
        "amber-dim": "var(--amber-dim)",
        teal: "var(--teal)",
        red: "var(--red)",
        sky: "var(--sky)",
        "sky-deep": "var(--sky-deep)",
        "sky-pale": "var(--sky-pale)",
        sun: "var(--sun)",
        "sun-warm": "var(--sun-warm)",
        sage: "var(--sage)",
        paper: "var(--paper)",
        "paper-warm": "var(--paper-warm)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        blueprint: "var(--blueprint)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        heroPulse: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        driftSlow: {
          "0%, 100%": { transform: "translate3d(-4%, 0, 0)" },
          "50%": { transform: "translate3d(2%, -1.5%, 0)" },
        },
        driftSlower: {
          "0%, 100%": { transform: "translate3d(2%, 0, 0)" },
          "50%": { transform: "translate3d(-3%, 1%, 0)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "hero-pulse": "heroPulse 6s ease-in-out infinite",
        "drift-slow": "driftSlow 38s ease-in-out infinite",
        "drift-slower": "driftSlower 56s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
