# Siddhanth Thakuri — Portfolio

Personal portfolio for **Siddhanth Thakuri**, Software Engineer based in Sydney.  
A scroll-driven editorial experience that tells the story of an aeronautical engineer who became an AI product builder.

**Live:** [siddhanththakuri.com](https://siddhanththakuri.com)

---

## Design concept

The site is built around a single narrative arc — *sky to circuit* — told through:

- A warm cream-and-ink editorial palette, light and filmic
- Drifting cloud layers, sun glow, and a blueprint grid that bleeds in as you scroll
- A canvas-rendered paper plane that follows the cursor, leaving a fading amber ink trail
- A scroll-driven story section where four SVG technical illustrations cross-fade: biplane → code editor → software architecture → neural network
- A perspective landing-strip runway in the contact section, completing the aviation metaphor

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Fonts | Cormorant Garamond · Plus Jakarta Sans · JetBrains Mono |
| Deploy | Vercel |

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, tagline, blueprint compass rose, flight-data strip |
| **Origin** | Scroll-driven story: aero → code → SE → AI/ML with 4-phase illustrations |
| **Projects** | 7 shipped projects with browser-frame preview thumbnails |
| **Experience** | Timeline: Professional Year → MCS → Accenture → Aeronautical Engineering |
| **About** | Personal manifesto + syntax-highlighted TypeScript self-portrait |
| **Skills** | Interactive pill tags with category colour accents on hover |
| **Contact** | Approach-light runway animation + project node constellation |

---

## Projects featured

1. [DrugNexusAI](https://drugnexusai.app) — clinical AI platform (live)
2. [ShiftMate](https://shiftmate-1.onrender.com) — AI workforce rostering SaaS (live)
3. [WAYA](https://waya.onrender.com) — AI group scheduling with real-time chat (live)
4. [HireReady](http://hirereadyai.app) — AI resume tailoring (live)
5. [AlgoViz](https://algo-viz-pi.vercel.app) — algorithm visualiser (live)
6. [Demon Slayer Focus](https://demon-slayer-focus.vercel.app) — Pomodoro timer (live)
7. [Escape Velocity](https://team-aero.itch.io/escape-velocity) — door-choice game on itch.io (live)

---

## Running locally

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `frontend/.env.local`:

```
# Required for the AI chat widget (SidAI)
OPENROUTER_API_KEY=your_key_here

# Required for analytics and feedback
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

The static portfolio sections work without any env vars. Only the AI chat widget and analytics require them.

---

## Project structure

```
frontend/
  src/
    app/
      page.tsx          # Section imports + order
      layout.tsx        # Fonts, metadata, global background layers
      globals.css       # CSS vars, body gradient, grain, keyframes
    components/
      Atmosphere.tsx    # Fixed canvas: dust particles + cursor plane trail
      SkyScape.tsx      # Fixed layers: clouds, sun, horizon, blueprint grid
      Nav.tsx
      Hero.tsx
      Origin.tsx        # Scroll-driven story — 4 cross-fading SVG illustrations
      Projects.tsx      # 7 projects with 3D tilt + browser preview thumbnails
      Experience.tsx    # Chronological timeline with linked UAV research paper
      About.tsx         # Prose + TypeScript self-portrait card
      Skills.tsx        # Interactive pill tags with category colour hover
      Contact.tsx       # Runway approach lights + project node constellation
```

---

## Contact

**Email:** thakurisiddhanth1@gmail.com  
**GitHub:** [github.com/SIDDHANTH-THAKURI](https://github.com/SIDDHANTH-THAKURI)  
**LinkedIn:** [linkedin.com/in/siddhanththakuri](https://linkedin.com/in/siddhanththakuri)  
**Location:** Sydney, NSW · Open to remote · 485 Visa · Full work rights

---

*Built with Next.js and assisted by Claude Code.*
