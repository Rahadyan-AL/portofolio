"use client";

import { MainLayout } from "@/components\/layout/MainLayout";
import { projects } from "@/data/projects";

const ROTATIONS = ["-1.5deg", "1deg", "-0.8deg", "1.2deg", "-1deg"];

export default function ProjectPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-[1200px] px-10 py-[130px] max-[900px]:px-6 max-[900px]:py-8 lg:pl-[260px]">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          // karya-karya
        </span>
        <h1
          className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          PROJECT
        </h1>

        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-9 gap-x-9">
          {projects.map((p, idx) => (
            <div
              key={p.title + idx}
              className="relative bg-[#1c171c] p-4 pb-5 shadow-[6px_6px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-[1.03] hover:rotate-0"
              style={{
                clipPath: "polygon(3% 0%, 97% 2%, 100% 96%, 4% 100%, 0% 6%)",
                transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]})`,
              }}
            >
              {/* art-slot — ganti dengan <img src={p.screenshot}> */}
              <div className="mb-3.5 flex h-[150px] items-center justify-center rounded border-2 border-dashed border-white\/25 p-2.5 text-center">
                <span
                  className="text-[11px] leading-relaxed text-white\/35"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  THUMBNAIL
                  <br />
                  PROJECT DI SINI
                  <br />
                  <span className="text-[10px] text-white\/20">{p.screenshot}</span>
                </span>
                {/* TODO: ganti div art-slot di atas dengan:
                    <img src={p.screenshot} alt={p.title} className="h-[150px] w-full object-cover rounded" />
                */}
              </div>

              <div
                className="mb-2 text-[19px] leading-tight text-[var(--cream)]"
                style={{ fontFamily: "var(--font-bungee), cursive", whiteSpace: "pre-line" }}
              >
                {p.title}
              </div>
              <p className="mb-3 text-[13px] leading-relaxed text-white\/60">{p.description}</p>

              <div className="mb-3.5 flex flex-wrap gap-2.5">
                {p.techStack.map((tag) => (
                  <span
                    key={tag}
                    className="relative pl-3 text-[11px] text-white\/70"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={p.sourceCode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] font-bold text-[var(--pink)] hover:underline"
                >
                  Lihat detail →
                </a>
                {p.demoLink && (
                  <a
                    href={p.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-bold text-[var(--gold)] hover:underline"
                  >
                    Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-[11px] leading-relaxed text-white\/25"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Tambah project baru: edit <code className="text-white\/40">data/projects.ts</code> — tambah 1 object, tidak perlu
          ubah kode tampilan.
        </p>
      </div>
    </MainLayout>
  );
}
