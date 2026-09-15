"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div
          className="graffiti-heading text-[clamp(80px,18vw,160px)] leading-none select-none"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          404
        </div>
        <div className="h-[12px] w-[60%] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] bg-[var(--pink)] opacity-60 -mt-4" />
        <p
          className="mt-6 max-w-[420px] text-sm leading-relaxed text-white/80"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          Dinding ini kosong — halaman yang kamu cari tidak ada atau sudah dicat ulang.
        </p>
        <p
          className="mt-3 font-mono text-xs tracking-[0.2em] text-white/30"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          // page not found — spray another wall?
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest bg-[var(--gold)] text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors cursor-pointer"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            clipPath: "polygon(3% 0%, 97% 2%, 100% 92%, 4% 100%, 0% 8%)",
            boxShadow: "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)",
          }}
        >
          KEMBALI KE HOME →
        </Link>
      </div>
    </MainLayout>
  );
}
