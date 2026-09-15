"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { certificates } from "@/data/certificates";

const ROTATIONS = ["1.2deg", "-1.5deg", "0.8deg", "-1deg", "1deg"];

export default function SertifikatPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-[1200px] px-10 py-[130px] max-[900px]:px-6 max-[900px]:py-8">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          // bukti perjalanan
        </span>
        <h1
          className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          SERTIFIKAT
        </h1>

        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-9 gap-x-9">
          {certificates.map((c, idx) => (
            <div
              key={c.title + idx}
              className="relative bg-[#1c171c] p-4 pb-5 shadow-[6px_6px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-[1.03] hover:rotate-0"
              style={{
                clipPath: "polygon(2% 3%, 96% 0%, 100% 92%, 5% 100%, 0% 8%)",
                transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]})`,
              }}
            >
              <div className="mb-3.5 flex h-[150px] items-center justify-center rounded border-2 border-dashed border-white/25 p-2.5 text-center">
                <span
                  className="text-[11px] leading-relaxed text-white/35"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  SCAN/FOTO
                  <br />
                  SERTIFIKAT DI SINI
                  <br />
                  <span className="text-[10px] text-white/20">{c.image}</span>
                </span>
              </div>

              <div
                className="mb-1.5 text-[18px] leading-tight text-[var(--cream)]"
                style={{ fontFamily: "var(--font-bungee), cursive", whiteSpace: "pre-line" }}
              >
                {c.title}
              </div>
              <div className="mb-1 text-xs text-white/80">{c.issuer}</div>
              <div
                className="text-[11px] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {c.date}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-[11px] leading-relaxed text-white/25"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Tambah sertifikat baru: edit <code className="text-white/40">data/certificates.ts</code>.
        </p>
      </div>
    </MainLayout>
  );
}
