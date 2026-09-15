"use client";

import { TopNav } from "./TopNav";
import { PageTransition } from "./PageTransition";
import Aurora from "@/components/Aurora";
import Noise from "@/components/Noise";
import ClickSpark from "@/components/ClickSpark";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden brick-bg">
      {/* Aurora global — lapisan cahaya ungu/pink di atas grid bata */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Aurora
          colorStops={["#6B21D8", "#FF2E93", "#3B1073"]}
          amplitude={1.0}
          blend={0.4}
          speed={0.6}
        />
      </div>

      {/* radial accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[12%] right-[15%] w-[200px] h-[200px] rounded-full bg-[var(--purple)] blur-[70px] opacity-10" />
        <div className="absolute bottom-[15%] left-[10%] w-[260px] h-[260px] rounded-full bg-[var(--pink)] blur-[70px] opacity-8" />
      </div>

      {/* top navbar — horizontal fixed di atas, menggantikan wheel/carousel */}
      <TopNav />

      {/* content — slide tiap pindah halaman, klik memicu spark */}
      <div className="relative z-10 px-6 pt-[68px] md:pt-[64px]">
        <PageTransition>
          <ClickSpark sparkColor="#FFC93C" sparkSize={10} sparkRadius={22} sparkCount={8} duration={450}>
            {children}
          </ClickSpark>
        </PageTransition>
      </div>

      {/* film grain halus di atas segalanya */}
      <div className="pointer-events-none fixed inset-0 z-[100]">
        <Noise patternAlpha={12} patternRefreshInterval={3} />
      </div>
    </div>
  );
}
