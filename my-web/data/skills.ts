// Skill wall — kelompok per kategori, sinkron dengan screenshot GitHub profile
// Logo via https://cdn.simpleicons.org/{slug}/{hex} — warna hex disesuaikan palet (tanpa #)
// Untuk icon yang tidak ada di Simple Icons / CDN 404 (Matplotlib, Seaborn, Whimsical) → fallback inline SVG di app/skill/page.tsx
// Canva & VS Code juga fallback inline karena cdn.simpleicons.org 404 (padahal ada di jsDelivr)

export interface SkillItem {
  name: string;
  iconSlug?: string; // slug simpleicons, contoh: "nextdotjs" . Kosong = fallback inline
  color: string; // css var atau hex, contoh: "var(--gold)"
  size: number; // px font-size
  rotate: string; // contoh: "-2deg"
}

export interface SkillCluster {
  label: string; // LANGUAGES / FRAMEWORKS & LIBRARIES dll
  items: SkillItem[];
}

export const skillClusters: SkillCluster[] = [
  {
    label: "LANGUAGES",
    items: [
      { name: "HTML5", iconSlug: "html5", color: "var(--gold)", size: 28, rotate: "-1.8deg" },
      { name: "CSS3", iconSlug: "css", color: "var(--pink)", size: 26, rotate: "1.4deg" },
      { name: "JavaScript", iconSlug: "javascript", color: "var(--gold)", size: 27, rotate: "-1deg" },
      { name: "TypeScript", iconSlug: "typescript", color: "var(--cream)", size: 26, rotate: "1.6deg" },
      { name: "Java", iconSlug: "openjdk", color: "var(--purple)", size: 25, rotate: "-1.2deg" },
      { name: "Python", iconSlug: "python", color: "var(--pink)", size: 26, rotate: "1.2deg" },
      { name: "Scratch", iconSlug: "scratch", color: "var(--cream)", size: 24, rotate: "-1.5deg" },
    ],
  },
  {
    label: "FRAMEWORKS & LIBRARIES",
    items: [
      { name: "React", iconSlug: "react", color: "var(--cream)", size: 26, rotate: "1.5deg" },
      { name: "Next.js", iconSlug: "nextdotjs", color: "var(--gold)", size: 28, rotate: "-1.6deg" },
      { name: "NestJS", iconSlug: "nestjs", color: "var(--pink)", size: 25, rotate: "1.2deg" },
      { name: "Tailwind CSS", iconSlug: "tailwindcss", color: "var(--cream)", size: 24, rotate: "-1deg" },
      { name: "shadcn/ui", iconSlug: "shadcnui", color: "var(--purple)", size: 24, rotate: "1.4deg" },
      { name: "Expo", iconSlug: "expo", color: "var(--gold)", size: 25, rotate: "-1.3deg" },
    ],
  },
  {
    label: "DATA",
    items: [
      { name: "NumPy", iconSlug: "numpy", color: "var(--pink)", size: 25, rotate: "-1.4deg" },
      { name: "Pandas", iconSlug: "pandas", color: "var(--purple)", size: 25, rotate: "1.3deg" },
      { name: "Matplotlib", color: "var(--gold)", size: 24, rotate: "-1deg" }, // no simpleicons → fallback bar chart
      { name: "Seaborn", color: "var(--cream)", size: 24, rotate: "1deg" }, // no simpleicons → fallback line chart
    ],
  },
  {
    label: "DATABASE & BACKEND",
    items: [
      { name: "MySQL", iconSlug: "mysql", color: "var(--cream)", size: 26, rotate: "-1.5deg" },
      { name: "Supabase", iconSlug: "supabase", color: "var(--gold)", size: 25, rotate: "1.2deg" },
      { name: "Prisma", iconSlug: "prisma", color: "var(--purple)", size: 25, rotate: "-1deg" },
    ],
  },
  {
    label: "DESIGN TOOLS",
    items: [
      { name: "Figma", iconSlug: "figma", color: "var(--pink)", size: 26, rotate: "-1.2deg" },
      { name: "Canva", color: "var(--gold)", size: 24, rotate: "1.5deg" }, // fallback inline Canva SVG (cdn 404)
    ],
  },
  {
    label: "PRODUCTIVITY & COLLABORATION",
    items: [
      { name: "Notion", iconSlug: "notion", color: "var(--cream)", size: 25, rotate: "-1.3deg" },
      { name: "Miro", iconSlug: "miro", color: "var(--gold)", size: 25, rotate: "1.4deg" },
      { name: "Whimsical", color: "var(--pink)", size: 24, rotate: "-1deg" }, // no simpleicons → fallback board
    ],
  },
  {
    label: "TOOLS & DEPLOYMENT",
    items: [
      { name: "Git", iconSlug: "git", color: "var(--gold)", size: 25, rotate: "-1.4deg" },
      { name: "GitHub", iconSlug: "github", color: "var(--cream)", size: 26, rotate: "1.2deg" },
      { name: "Postman", iconSlug: "postman", color: "var(--purple)", size: 25, rotate: "-1deg" },
      { name: "Swagger", iconSlug: "swagger", color: "var(--pink)", size: 25, rotate: "1.3deg" },
      { name: "VS Code", color: "var(--cream)", size: 25, rotate: "-1.2deg" }, // fallback inline VS Code SVG (cdn 404)
      { name: "Vercel", iconSlug: "vercel", color: "var(--gold)", size: 24, rotate: "1deg" },
    ],
  },
];
