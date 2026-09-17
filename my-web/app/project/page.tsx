"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { projects } from "@/data/projects";
import { useI18n } from "@/lib/translations";

const ROTATIONS = ["-1.5deg", "1deg", "-0.8deg", "1.2deg", "-1deg"];

export default function ProjectPage() {
  const router = useRouter();
  const { t, lang } = useI18n();

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1200px] px-10 py-[130px] max-[900px]:px-6 max-[900px]:py-8">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("project.kicker")}
        </span>
        <h1
          className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          {t("project.heading")}
        </h1>

        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-9 gap-x-9">
          {projects.map((p, idx) => (
            <div
              key={p.slug}
              role="link"
              tabIndex={0}
              onClick={() => router.push(`/project/${p.slug}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/project/${p.slug}`);
                }
              }}
              className="relative block cursor-pointer bg-[#1c171c] p-4 pb-5 shadow-[6px_6px_0_rgba(0,0,0,0.4)] transition-transform hover:scale-[1.03] hover:rotate-0"
              style={{
                clipPath: "polygon(3% 0%, 97% 2%, 100% 96%, 4% 100%, 0% 6%)",
                transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]})`,
              }}
            >
              <div className="mb-3.5 h-[150px] overflow-hidden rounded border border-white/10 bg-black/20">
                <img
                  src={p.screenshot}
                  alt={`${p.title[lang]} screenshot`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.display = "none";
                    const fallback = img.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <div className="hidden flex h-full items-center justify-center rounded border-2 border-dashed border-white/25 p-2.5 text-center">
                  <span
                    className="text-[11px] leading-relaxed text-white/35"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    {t("project.thumbnailFallback")}
                    <br />
                    {t("project.thumbnailDesc")}
                    <br />
                    <span className="text-[10px] text-white/20">{p.screenshot}</span>
                  </span>
                </div>
              </div>

              <div
                className="mb-2 text-[19px] leading-tight text-[var(--cream)]"
                style={{ fontFamily: "var(--font-bungee), cursive", whiteSpace: "pre-line" }}
              >
                {p.title[lang]}
              </div>
              <p className="mb-3 text-[13px] leading-relaxed text-white/80">{p.description[lang]}</p>

              <div className="mb-3.5 flex flex-wrap gap-2.5">
                {p.techStack.map((tag) => (
                  <span
                    key={tag}
                    className="relative pl-3 text-[11px] text-white/85"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4" onClick={(e) => e.preventDefault()}>
                <a
                  href={p.sourceCode}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[13px] font-bold text-[var(--pink)] hover:underline"
                >
                  {t("project.viewSource")}
                </a>
                {p.demoLink && (
                  <a
                    href={p.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[13px] font-bold text-[var(--gold)] hover:underline"
                  >
                    {t("project.viewDemo")}
                  </a>
                )}
              </div>
              <div className="absolute inset-0 flex items-end justify-end p-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] tracking-widest text-white/70" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  {t("project.viewDetail")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
