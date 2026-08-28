"use client";

import { MainLayout } from "@/components\/layout/MainLayout";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center lg:pl-[260px] lg:pr-10 lg:items-center">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("home.kicker")}
        </span>
        <p
          className="mt-4 max-w-[400px] text-[15px] leading-relaxed text-white\/55"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          {t("home.subtitle")}
        </p>

        {/* hint — collectible akan aktif Tahap 4 */}
        <p
          className="mt-8 font-mono text-xs text-white\/30"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          psst... ada sesuatu yang berkedip di sekitar sini
        </p>

        {/* placeholder collectible demo — non-functional until Tahap 4 */}
        <div
          className="mt-4 text-2xl opacity-20 select-none"
          style={{ animation: "graffiti-pulse 1.6s ease-in-out infinite" }}
          title="placeholder koleksi — aktif Tahap 4"
        >
          🎨
        </div>
      </div>
    </MainLayout>
  );
}
