"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useI18n } from "@/lib/i18n";
import { usePageAchievement } from "@/hooks/usePageAchievement";

export default function HomePage() {
  usePageAchievement();
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center min-[901px]:pl-[260px] lg:pr-10 lg:items-center">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("home.kicker")}
        </span>
        {/* sambutan graffiti — informal, dekat tagline */}
        <h1
          className="mt-3 text-[clamp(28px,6vw,44px)] leading-none"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            color: "var(--gold)",
            textShadow: "2px 2px 0 var(--purple-deep), 4px 4px 0 var(--pink)",
          }}
        >
          YO, SELAMAT DATANG!
        </h1>
        <p
          className="mt-4 max-w-[400px] text-[15px] leading-relaxed text-white/80"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          {t("home.subtitle")}
        </p>

        <div
          className="mt-4 text-2xl opacity-20 select-none"
          style={{ animation: "graffiti-pulse 1.6s ease-in-out infinite" }}
          title="placeholder koleksi — aktif Tahap 4"
        >
          🫠
        </div>
      </div>
    </MainLayout>
  );
}
