"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { skillClusters } from "@/data/skills";
import { usePageAchievement } from "@/hooks/usePageAchievement";

function hexForColor(color: string): string {
  if (color.includes("gold")) return "FFC93C";
  if (color.includes("pink")) return "FF2E93";
  if (color.includes("purple")) return "6B21D8";
  if (color.includes("cream")) return "F5F1E8";
  return "F5F1E8";
}

export default function SkillPage() {
  usePageAchievement();
  return (
    <MainLayout>
      <div className="mx-auto max-w-[1100px] px-10 py-[130px] max-[900px]:px-6 max-[900px]:py-8 min-[901px]:pl-[260px]">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          // senjata yang dipakai
        </span>
        <h1
          className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          SKILL
        </h1>

        <div className="mt-10">
          {skillClusters.map((cluster) => (
            <div key={cluster.label} className="mb-11">
              <div
                className="mb-3.5 text-xs tracking-[3px] text-white/40"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {cluster.label}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-[22px] gap-y-1.5">
                {cluster.items.map((skill) => {
                  const iconColor = hexForColor(skill.color);
                  return (
                    <span
                      key={skill.name}
                      className="relative inline-flex items-center gap-[0.22em] cursor-default select-none"
                      style={{
                        fontFamily: "var(--font-bungee), cursive",
                        fontSize: skill.size,
                        color: skill.color,
                        transform: `rotate(${skill.rotate})`,
                        textShadow: "2px 2px 0 rgba(0,0,0,0.45)",
                      }}
                    >
                      {skill.iconSlug && (
                        <img
                          src={`https://cdn.simpleicons.org/${skill.iconSlug}/${iconColor}`}
                          alt=""
                          className="h-[1em] w-[1em] shrink-0"
                          style={{ filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.45))" }}
                          loading="lazy"
                        />
                      )}
                      {skill.name}
                      <span
                        className="absolute -bottom-1 left-[-2px] h-[6px] w-[85%] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] opacity-50"
                        style={{ background: skill.color }}
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-[11px] leading-relaxed text-white/25"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Logo pakai cdn.simpleicons.org — ganti <code className="text-white/40">iconSlug</code> & warna di{" "}
          <code className="text-white/40">data/skills.ts</code> untuk nambah skill baru.
        </p>
      </div>
    </MainLayout>
  );
}
