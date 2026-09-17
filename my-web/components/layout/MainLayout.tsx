"use client";

import { TopNav } from "./TopNav";
import { PageTransition } from "./PageTransition";
import Noise from "@/components/Noise";
import ClickSpark from "@/components/ClickSpark";
import DotGrid from "@/components/DotGrid/DotGrid";
import { Footer } from "./Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden brick-bg">
      {/* DotGrid tiling — kepadatan konsisten; di-optimasi untuk performa (gap lebih besar = dot lebih sedikit) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.28]">
        <DotGrid
          dotSize={3}
          gap={32}
          baseColor="#3B1073"
          activeColor="#FFC93C"
          proximity={120}
          speedTrigger={120}
          shockRadius={180}
          shockStrength={3}
          maxSpeed={3000}
          resistance={800}
          returnDuration={1.2}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      {/* subtle vignette tetap, tapi tidak bikin bawah lebih gelap */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.22)_100%)]" />

      {/* top navbar — horizontal fixed di atas, menggantikan wheel/carousel */}
      <TopNav />

      {/* content — slide tiap pindah halaman, klik memicu spark */}
      <div className="relative z-10 flex-1 px-6 pt-[68px] md:pt-[64px]">
        <PageTransition>
          <ClickSpark sparkColor="#FFC93C" sparkSize={10} sparkRadius={22} sparkCount={8} duration={450}>
            {children}
          </ClickSpark>
        </PageTransition>
      </div>

      <Footer />

      {/* film grain halus di atas segalanya */}
      <div className="pointer-events-none fixed inset-0 z-[100]">
        <Noise patternAlpha={12} patternRefreshInterval={3} />
      </div>
    </div>
  );
}
