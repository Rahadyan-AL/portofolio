# RAHADYAN — Portfolio Website 🎨🕹️

> A personal portfolio that plays like a game and looks like it was tagged on a brick wall.

Not your average one-page portfolio. This project blends a **game-like flow** (intro sequence, achievement system, hidden collectibles) with a **street art / graffiti visual identity** — built with Next.js.

Live demo: _coming soon_
Design mockups & full PRD: see `/docs`

---

## ✨ Concept

Instead of a static "scroll and read" portfolio, visitors get an actual **experience**:

- A game-style intro (loading → logo/start screen → language select → audio on/off) before landing on the Home screen
- A left-side navigation menu with loose, hand-tagged typography — no boxes, no borders, no icons
- Hidden collectibles scattered across pages that visitors can hunt down
- An achievement system that tracks exploration, patience, and curiosity
- A couple of easter eggs for the terminal-and-devtools crowd 👀
- A locked **"Source Code"** menu item that only unlocks once you've found everything

Full detail on every mechanic lives in the PRD (`/docs/PRD-website-portfolio-rahadyan.md`).

---

## 🧩 Features

- 🎮 Game-style intro flow with session persistence (skips intro on repeat visits within 24h)
- 🌐 Bilingual — Indonesian & English, switchable anytime, saved to `localStorage`
- 🏆 Achievement system (page visits, time-on-page, hidden finds) with a dedicated Achievement page
- 🎨 Two collectible types (spray cans & `</>` tags) hidden across pages, with a spray-paint reveal animation on discovery
- 💻 Terminal easter egg — type `sudo` anywhere to open a fullscreen terminal menu
- 🕵️ Hidden message in the browser dev console, for the curious
- 🔊 Looping theme music + sound effects, with a full mute/volume control in Settings
- 🔒 A "Source Code" nav item that stays locked until every collectible is found
- 📱 Responsive nav — collapses into a single trigger button on mobile
- 🧱 Data-driven Project & Certificate sections — add a new entry by editing one array, no UI code required

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js](https://nextjs.org/) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Bungee, Space Grotesk, JetBrains Mono (Google Fonts) |
| Tech logos | [Simple Icons](https://simpleicons.org/) via `cdn.simpleicons.org` |

---

## 🚀 Getting Started

```bash
# clone the repo
git clone https://github.com/Rahadyan-AL/<repo-name>.git
cd <repo-name>

# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

---

## 📁 Project Structure (key parts)

```
├── app/                     # pages (Next.js App Router)
│   ├── about/
│   ├── skill/
│   ├── project/
│   ├── certificates/
│   └── source-code/         # locked page
├── components/
│   ├── nav/                 # side nav (desktop) + trigger menu (mobile)
│   ├── settings/            # language, volume, reset progress
│   ├── achievements/
│   └── collectibles/
├── data/
│   ├── projects.ts          # add a new project = add one object here
│   └── certificates.ts      # same idea for certificates
└── docs/
    └── PRD-website-portfolio-rahadyan.md
```

> Adding a new **project** or **certificate** never requires touching UI code — just add an entry to the matching file in `/data`.

---

## 🚧 Roadmap / Still TBD

A few things are intentionally left as placeholders for now:

- [ ] Final names for 4 achievements (terminal find, dev console find, spray can set, `</>` set)
- [ ] Actual hidden message content in the dev console easter egg
- [ ] Favicon & OG image (graffiti-style "RF" monogram)
- [ ] Real project screenshots, certificate scans, and bio content (currently placeholder)
- [ ] Deployment target (currently local-only)

---

## 📬 Contact

- LinkedIn: [rahadyan-al-farisi-a71a45381](https://www.linkedin.com/in/rahadyan-al-farisi-a71a45381)
- Instagram: [@rahadyan_al](https://instagram.com/rahadyan_al)
- GitHub: [@Rahadyan-AL](https://github.com/Rahadyan-AL)

---

<p align="center"><i>Built with Next.js, way too much CSS, and a genuine love for graffiti letterforms.</i></p>