"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { achievements } from "@/data/achievements";
import { useAchievements } from "@/components/achievements/AchievementContext";
import { usePageAchievement } from "@/hooks/usePageAchievement";

export default function AchievementsPage() {
  usePageAchievement();
  const { isUnlocked, unlocked } = useAchievements();

  return (
    <MainLayout>
      <div className="mx-auto max-w-[900px] px-10 py-[130px] max-[900px]:px-6 max-[900px]:py-8 lg:pl-[260px]">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          // pencapaian
        </span>
        <h1
          className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          ACHIEVEMENT
        </h1>
        <p
          className="mt-2 font-mono text-xs text-white/50"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {unlocked.length} / {achievements.length} terbuka —{" "}
          <span className="text-white/25">lebih banyak achievement akan ditambahkan ke depannya</span>
        </p>

        <div className="mt-8 grid gap-4">
          {achievements.map((a) => {
            const unlockedFlag = isUnlocked(a.id);
            return (
              <div
                key={a.id}
                className={`relative flex items-center gap-4 rounded-[8px] border px-4 py-4 transition-all ${
                  unlockedFlag
                    ? "border-[var(--gold)]/30 bg-[#1c171c] shadow-[4px_4px_0_rgba(0,0,0,0.35)]"
                    : "border-white/10 bg-white/[0.03] border-dashed"
                }`}
                style={{
                  clipPath: unlockedFlag
                    ? "polygon(1% 0%, 99% 1%, 100% 97%, 2% 100%, 0% 4%)"
                    : undefined,
                }}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm ${
                    unlockedFlag ? "bg-[var(--gold)] text-[var(--bg-dark)]" : "bg-white/5 text-white/20 border border-white/10"
                  }`}
                >
                  {unlockedFlag ? "🏆" : "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[15px] leading-tight ${unlockedFlag ? "text-[var(--cream)]" : "text-white/25 tracking-[0.2em]"}`}
                    style={{ fontFamily: unlockedFlag ? "var(--font-bungee), cursive" : "var(--font-jetbrains), monospace" }}
                  >
                    {unlockedFlag ? a.name : "???"}
                  </p>
                  <p className="text-xs leading-tight text-white/45">{a.trigger}</p>
                  {a.placeholder && unlockedFlag && (
                    <span className="mt-1 inline-block rounded bg-[var(--pink)]/15 px-1.5 py-0.5 text-[10px] tracking-wide text-[var(--pink)]">
                      PLACEHOLDER — ganti nama di data/achievements.ts
                    </span>
                  )}
                </div>
                {unlockedFlag && <span className="shrink-0 text-[10px] tracking-[0.15em] text-[var(--gold)]">UNLOCKED</span>}
              </div>
            );
          })}
        </div>

        <p
          className="mt-6 text-center font-mono text-[11px] leading-relaxed text-white/25"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Tip: kunjungi semua halaman (Home, About, Skill, Project, Sertifikat) untuk membuka 6 achievement pertama.
          <br />
          Diam 5 menit di satu halaman untuk membuka “Need more time to consider”. Reset via Settings.
        </p>
      </div>
    </MainLayout>
  );
}
