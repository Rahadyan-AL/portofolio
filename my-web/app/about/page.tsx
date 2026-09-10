"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { usePageAchievement } from "@/hooks/usePageAchievement";

export default function AboutPage() {
  usePageAchievement();
  return (
    <MainLayout>
      <div className="mx-auto max-w-[1100px] px-10 py-[130px] max-[900px]:px-6 max-[900px]:py-8 min-[901px]:pl-[260px]">
        <div className="flex flex-wrap items-start gap-[60px] max-[900px]:flex-col">
          <div
            className="flex h-[320px] w-[260px] shrink-0 items-center justify-center rounded-[6px] border-2 border-dashed border-white/25 p-5 text-center leading-relaxed"
            style={{ fontFamily: "var(--font-jetbrains), monospace", color: "rgba(245,241,232,0.35)", fontSize: 12 }}
          >
            ILUSTRASI / FOTO
            <br />
            KAMU DI SINI
          </div>

          <div className="min-w-[280px] flex-1">
            <span
              className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              // kenalan dulu
            </span>
            <h1
              className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
              style={{ fontFamily: "var(--font-bungee), cursive" }}
            >
              TENTANG
              <br />
              SAYA
            </h1>
            <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-white/85">
              [Tulis cerita singkat tentang diri kamu di sini — siapa kamu, apa yang kamu kerjakan, dan kenapa kamu
              suka bikin sesuatu.]
            </p>
            <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-white/85">
              [Paragraf kedua, bisa cerita perjalanan belajar coding atau hal personal lain yang mau ditonjolkan.]
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="relative w-fit pl-[18px] text-[15px] font-bold">
                <span className="absolute left-0 top-[5px] h-[9px] w-[9px] rounded-full bg-[var(--pink)]" />
                Fullstack Developer
              </div>
              <div className="relative w-fit pl-[18px] text-[15px] font-bold">
                <span className="absolute left-0 top-[5px] h-[9px] w-[9px] rounded-full bg-[var(--gold)]" />
                SMK Telkom Malang — RPL
              </div>
              <div className="relative w-fit pl-[18px] text-[15px] font-bold">
                <span className="absolute left-0 top-[5px] h-[9px] w-[9px] rounded-full bg-[var(--purple)]" />
                Berbasis di Malang, Indonesia
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
