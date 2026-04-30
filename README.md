<div align="center">

<img src="frontend/src/app/icon.svg" width="64" height="64" alt="Siddhanth Portfolio Icon" />

# ✈️ Siddhanth Thakuri — Portfolio

**A scroll-driven editorial portfolio.**
*From aeronautical engineering to AI product builder — told through design.*

<br/>

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-siddhanththakuri.com-d97706?style=for-the-badge)](https://siddhanththakuri.com)
&nbsp;
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
&nbsp;
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

<br/>

</div>

---

## 🎨 The concept

This isn't a portfolio that lists credentials. It's one that tells a story.

The entire site follows a single narrative arc — **sky to circuit** — beginning with aeronautical engineering and landing on AI product development. Every design decision serves that arc:

- 🌤️ **Sky-to-cream gradient** fixed to the viewport — the world literally changes as you scroll
- ☁️ **Drifting cloud layers** with parallax depth, fading as you descend into the work
- ✈️ **Cursor-following paper plane** on a canvas, leaving a fading amber ink trail
- 📐 **Blueprint grid** that bleeds in during the engineering-to-code transition
- 🛬 **Perspective runway** with sequenced approach lights in the contact section — completing the landing metaphor

---

## 🧱 Stack

| Layer | Technology |
|---|---|
| ⚡ Framework | Next.js 15 (App Router) |
| 🔷 Language | TypeScript |
| 🎨 Styling | Tailwind CSS |
| 🎞️ Animation | Framer Motion |
| 🔤 Fonts | Cormorant Garamond · Plus Jakarta Sans · JetBrains Mono |
| 🚀 Deploy | Vercel |

---

## 📖 Sections

| # | Section | What it does |
|---|---|---|
| 01 | 🦅 **Hero** | Name, tagline, blueprint compass rose, flight-data strip |
| 02 | 📜 **Origin** | Scroll-driven story with 4 cross-fading SVG illustrations |
| 03 | 🏗️ **Projects** | 7 shipped projects with 3D tilt cards + live preview thumbnails |
| 04 | 🗺️ **Experience** | Chronological timeline with published research + Professional Year |
| 05 | 📝 **About** | Prose manifesto + syntax-highlighted TypeScript self-portrait |
| 06 | 🧰 **Skills** | Interactive pill tags — hover for category colour glow |
| 07 | 📡 **Contact** | Runway approach lights + project node constellation |

---

## 🚀 Projects

<div align="center">

| Project | Category | Status |
|---|---|---|
| [DrugNexusAI](https://drugnexusai.app) | Clinical AI Platform | 🟢 Live |
| [ShiftMate](https://shiftmate-1.onrender.com) | AI Workforce SaaS | 🟢 Live |
| [WAYA](https://waya.onrender.com) | AI Group Scheduling | 🟢 Live |
| [HireReady](http://hirereadyai.app) | AI Resume Tailoring | 🟢 Live |
| [AlgoViz](https://algo-viz-pi.vercel.app) | Algorithm Visualiser | 🟢 Live |
| [Demon Slayer Focus](https://demon-slayer-focus.vercel.app) | Pomodoro Timer | 🟢 Live |
| [Escape Velocity](https://team-aero.itch.io/escape-velocity) | Browser Game | 🟢 Live |

</div>

---

## 🛠️ Running locally

```bash
# Clone and install
git clone https://github.com/SIDDHANTH-THAKURI/ai-portfolio.git
cd ai-portfolio/frontend
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in.

<details>
<summary>🔑 Environment variables (optional)</summary>

<br/>

Create `frontend/.env.local` — only needed for the AI chat widget and analytics. The portfolio itself works without them.

```env
# AI chat widget
OPENROUTER_API_KEY=your_key_here

# Analytics + feedback
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

</details>

---

## 🗂️ Project structure

```
frontend/
  src/
    app/
      page.tsx          ← Section imports + order
      layout.tsx        ← Fonts, metadata, global background layers
      globals.css       ← CSS vars, body gradient, grain, keyframes
    components/
      Atmosphere.tsx    ← Canvas: dust particles + cursor plane trail
      SkyScape.tsx      ← Fixed: drifting clouds, sun, horizon, blueprint grid
      Nav.tsx           ← Sticky navigation
      Hero.tsx          ← Opening — compass, flight-data strip, parallax
      Origin.tsx        ← Scroll-driven story — 4 cross-fading illustrations
      Projects.tsx      ← 7 projects, 3D tilt, browser preview thumbnails
      Experience.tsx    ← Timeline with UAV research paper + Pro Year
      About.tsx         ← Prose + TypeScript self-portrait code card
      Skills.tsx        ← Interactive pill tags with category hover glow
      Contact.tsx       ← Runway approach lights + node constellation
```

---

## 📬 Contact

<div align="center">

| | |
|---|---|
| 📧 Email | thakurisiddhanth1@gmail.com |
| 💻 GitHub | [github.com/SIDDHANTH-THAKURI](https://github.com/SIDDHANTH-THAKURI) |
| 🔗 LinkedIn | [linkedin.com/in/siddhanththakuri](https://linkedin.com/in/siddhanththakuri) |
| 📍 Location | Sydney, NSW · Open to remote · 485 Visa · Full work rights |

</div>

---

<div align="center">

*Built with Next.js and assisted by Claude Code.*

</div>
