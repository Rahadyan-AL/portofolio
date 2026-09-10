"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SideNav } from "./SideNav";
import { SettingsPanel } from "./SettingsPanel";
import { useAchievements } from "@/components/achievements/AchievementContext";
import { useCollectibles } from "@/components/collectibles/CollectiblesContext";
import { CollectibleSpawner } from "@/components/collectibles/CollectibleSpawner";
import { GrandFinale } from "@/components/collectibles/GrandFinale";

export function MainLayout({
  children,
  hideStash,
}: {
  children: React.ReactNode;
  hideStash?: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { unlocked } = useAchievements();
  const { total: collectTotal, sprayCount, codeCount } = useCollectibles();

  return (
    <div className="relative min-h-screen overflow-hidden brick-bg">
      {/* radial accents — subtle per-page variation via children */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[12%] right-[15%] w-[200px] h-[200px] rounded-full bg-[var(--purple)] blur-[70px] opacity-10" />
        <div className="absolute bottom-[15%] left-[10%] w-[260px] h-[260px] rounded-full bg-[var(--pink)] blur-[70px] opacity-8" />
      </div>



      {/* topbar: mobile menu trigger + settings */}
      <div className="relative z-20 flex justify-end items-center gap-3 px-10 py-[26px] max-[900px]:px-6 max-[900px]:py-4">
        {/* mobile nav trigger — PRD 2.6: satu tombol trigger konsisten dengan Settings */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="hidden max-[900px]:flex h-9 w-9 items-center justify-center rounded-full border border-white\/15 bg-white\/5 text-white\/70 hover:bg-white\/10 hover:text-white transition-colors cursor-pointer"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
        <SettingsPanel />
      </div>

      {/* desktop side nav */}
      <SideNav />

      {/* mobile overlay */}
      {mobileOpen && (
        <div className="absolute inset-0 z-30 flex flex-col bg-[var(--bg-dark)]/95 backdrop-blur-md px-6 pt-20 pb-8 min-[901px]:hidden max-[900px]:flex">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 h-9 w-9 flex items-center justify-center rounded-full border border-white\/15 bg-white\/5 text-white\/70"
          >
            <X size={16} />
          </button>
          <SideNav variant="mobile" onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      {/* hidden collectible spawner — random posisi, opacity rendah + pulse, auto-vanish 7s */}
      <CollectibleSpawner />
      <GrandFinale />

      {/* content */}
      <div className="relative z-10 max-[900px]:px-6 max-[900px]:pt-4">{children}</div>

      {/* stash badges — trophy shows achievement count, bag */}
      {!hideStash && (
        <div className="fixed bottom-8 right-10 z-10 hidden gap-4 min-[901px]:flex">
          <Link
            href="/achievements"
            className="relative flex h-[64px] w-[64px] flex-col items-center justify-center hover:scale-105 transition-transform"
            title={`${unlocked.length} achievement terbuka — klik untuk lihat`}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <path
                d="M50,10 C70,8 90,25 92,48 C94,70 78,90 52,92 C28,94 8,75 8,50 C8,26 28,10 50,10 Z"
                fill="none"
                stroke="#FFC93C"
                strokeWidth="3"
                opacity="0.6"
              />
            </svg>
            <span className="text-[20px]" style={{ fontFamily: "var(--font-bungee), cursive", color: "var(--gold)" }}>
              {unlocked.length}
            </span>
            <span
              className="text-[8px] tracking-[1px] text-white/50"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              TROFI
            </span>
          </Link>
          <div
            className="relative flex h-[64px] w-[64px] flex-col items-center justify-center"
            title={`Koleksi ${collectTotal}/20 — spray ${sprayCount}/10, code ${codeCount}/10`}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <path
                d="M50,9 C72,11 91,28 90,50 C89,72 71,91 49,90 C27,89 9,71 10,49 C11,27 28,7 50,9 Z"
                fill="none"
                stroke="#FF2E93"
                strokeWidth="3"
                opacity="0.6"
              />
            </svg>
            <span className="text-[20px]" style={{ fontFamily: "var(--font-bungee), cursive", color: "var(--gold)" }}>
              {collectTotal}
            </span>
            <span
              className="text-[8px] tracking-[1px] text-white/50"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              KOLEKSI
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
