# RAHADYAN — Portfolio Website 🎨

> A personal portfolio with a street art soul — built with Next.js and animated with React Bits.

Live: `https://rahadyan-al.github.io/portofolio/`

---

## ✨ About

A graffiti-inspired portfolio focused on showing off projects and certificates clearly — bold typography, torn-flyer cards, and a dark brick-wall backdrop, without unnecessary gimmicks getting in the way of the content.

---

## 🧩 Features

- 🎨 Graffiti-inspired visual identity — layered hard-shadow typography (Bungee), torn-flyer style cards, a purple/gold/pink palette on a dark brick-textured background
- 🌐 Bilingual — Indonesian & English, text centralized in `lib/text/`
- ⚡ Animated with [React Bits](https://reactbits.dev/) — all components installed via the official MCP registry (not hand-copied), including DotGrid, GooeyNav, DecryptedText, SplitText, TextType, ElectricBorder, ProfileCard, SpotlightCard, FadeContent, ShinyText, and ClickSpark
- 🧱 Data-driven Project & Certificate sections — add a new entry by editing one file, no UI code required
- 📬 Working Contact form (Name / Email / Message) — submits through a static-site-friendly form service (Formspree/Web3Forms), since the site is statically exported
- 🦶 Footer with contact links and a Privacy Policy page

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (static export, for GitHub Pages) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation / UI | [React Bits](https://reactbits.dev/) (via MCP) |
| Fonts | Bungee, Space Grotesk, JetBrains Mono |
| Tech logos | [Simple Icons](https://simpleicons.org/) via `cdn.simpleicons.org` |
| Deployment | GitHub Pages, via GitHub Actions |

---

## 🚀 Getting Started

```bash
git clone https://github.com/Rahadyan-AL/portofolio.git
cd portofolio/my-web

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

---

## 📁 Project Structure (key parts)

```
my-web/
├── app/
│   ├── page.tsx              # Home
│   ├── about/
│   ├── skill/
│   ├── project/
│   │   └── [slug]/           # project detail pages
│   ├── certificates/
│   ├── contact/               # contact form
│   └── privacy-policy/
├── components/                 # React Bits components (installed via MCP)
│   ├── DotGrid/
│   ├── GooeyNav/
│   ├── ProfileCard/
│   └── ...
├── components/layout/
│   ├── MainLayout.tsx          # background layers, page transitions
│   ├── TopNav.tsx
│   └── Footer.tsx
├── lib/
│   ├── text/                   # bilingual content, one file per page
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── skill.ts
│   │   ├── project.ts
│   │   ├── certificates.ts
│   │   ├── contact.ts
│   │   └── common.ts           # nav, footer, shared buttons
│   └── storage.ts / utils.ts
├── data/
│   ├── projects.ts             # add a new project = add one object here
│   └── certificates.ts         # same idea for certificates
└── components.json             # React Bits MCP registry trace
```

> Adding a new **project** or **certificate** never requires touching UI code — just add an entry to the matching file in `/data`.
> All copy lives in `lib/text/`, with matching `id`/`en` keys side by side per file — any placeholder still waiting to be filled in is marked `[ISI SENDIRI: ...]` / `[FILL IN: ...]`.

---

## 🚧 Roadmap / Still TBD

- [ ] Fill in remaining placeholder copy across `lib/text/` (bio, project descriptions, etc.) in both languages
- [ ] Add real project screenshots and certificate scans
- [ ] Finish Formspree/Web3Forms account setup for the Contact form
- [ ] Write real Privacy Policy content
- [ ] Favicon (graffiti-style "R" monogram, still in progress)

---

## 📬 Contact

- LinkedIn: [rahadyan-al-farisi](https://www.linkedin.com/in/rahadyan-al-farisi)
- Instagram: [@rahadyan_al](https://instagram.com/rahadyan_al)
- GitHub: [@Rahadyan-AL](https://github.com/Rahadyan-AL)

---

<p align="center"><i>Made by R.A.F, with react bits.</i></p>
