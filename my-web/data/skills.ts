// Skill wall — kelompok per kategori, gampang tambah skill baru
// Logo via https://cdn.simpleicons.org/{slug}/{hex} — warna hex disesuaikan palet (tanpa #)

export interface SkillItem {
  name: string;
  iconSlug?: string; // slug simpleicons, contoh: "nextdotjs" . Kosong = tanpa ikon
  color: string; // css var atau hex, contoh: "var(--gold)"
  size: number; // px font-size
  rotate: string; // contoh: "-2deg"
}

export interface SkillCluster {
  label: string; // FRONTEND / BACKEND dll
  items: SkillItem[];
}

export const skillClusters: SkillCluster[] = [
  {
    label: "FRONTEND",
    items: [
      { name: "Next.js", iconSlug: "nextdotjs", color: "var(--gold)", size: 34, rotate: "-2deg" },
      { name: "React", iconSlug: "react", color: "var(--cream)", size: 26, rotate: "1.5deg" },
      { name: "Tailwind", iconSlug: "tailwindcss", color: "var(--pink)", size: 22, rotate: "-1deg" },
      { name: "TypeScript", iconSlug: "typescript", color: "var(--cream)", size: 29, rotate: "2deg" },
    ],
  },
  {
    label: "BACKEND",
    items: [
      { name: "NestJS", iconSlug: "nestjs", color: "var(--purple)", size: 31, rotate: "1.5deg" },
      { name: "Node.js", iconSlug: "nodedotjs", color: "var(--cream)", size: 24, rotate: "-2deg" },
      { name: "REST API", color: "var(--gold)", size: 20, rotate: "1deg" },
    ],
  },
  {
    label: "MOBILE & TOOLS",
    items: [
      { name: "Expo", iconSlug: "expo", color: "var(--pink)", size: 27, rotate: "-1.5deg" },
      { name: "Git", iconSlug: "git", color: "var(--cream)", size: 22, rotate: "2deg" },
      { name: "Figma", iconSlug: "figma", color: "var(--gold)", size: 25, rotate: "-1deg" },
    ],
  },
];
