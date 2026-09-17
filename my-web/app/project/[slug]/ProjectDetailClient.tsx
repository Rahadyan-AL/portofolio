"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { useI18n } from "@/lib/translations";
import type { Project } from "@/data/projects";

export function ProjectDetailClient({ project }: { project: Project }) {
  const { t, lang } = useI18n();

  if (!project) notFound();

  return (
    <MainLayout>
      <div className="mx-auto max-w-[900px] px-6 py-[80px] max-[900px]:px-6 max-[900px]:py-8">
        <Link
          href="/project"
          prefetch={false}
          aria-label={t("project.back")}
          className="inline-flex items-center gap-2.5 rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-[13px] font-semibold tracking-[0.15em] text-white transition-all hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] shadow-lg"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("project.back")}
        </Link>

        <div className="relative mt-6 rounded-2xl border border-white/15 bg-[#1c171c] p-6 md:p-8 shadow-2xl">
          <div className="overflow-hidden rounded-xl border border-white/15 bg-black/30 shadow-inner">
            <Image
              src={project.screenshot}
              alt={`${project.title[lang]} screenshot`}
              width={1200}
              height={675}
              sizes="(max-width: 600px) 100vw, 900px"
              className="h-[360px] w-full object-cover max-[600px]:h-[220px]"
              priority={false}
            />
          </div>

          <h1
            className="mt-6 text-[clamp(26px,4vw,40px)] leading-tight text-[var(--cream)]"
            style={{ fontFamily: "var(--font-bungee), cursive", whiteSpace: "pre-line" }}
          >
            {project.title[lang]}
          </h1>

          <div
            className="mt-2.5 text-[13px] tracking-[0.12em] text-[var(--gold)]"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {t("project.roleLabel")} <span className="text-white/90 font-medium">{project.role[lang]}</span>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-white/85" style={{ whiteSpace: "pre-line" }}>
            {project.fullDescription[lang]}
          </p>

          <div className="mt-7">
            <div
              className="mb-2.5 text-[12px] tracking-[0.2em] text-[var(--gold)]/80 font-bold"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {t("project.techStackLabel")}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-3.5 py-1.5 text-[12px] font-semibold text-[var(--gold)] shadow-sm"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noreferrer"
              aria-label={t("project.sourceCode")}
              className="inline-flex items-center justify-center bg-[var(--gold)] px-6 py-2.5 text-sm tracking-widest text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors"
              style={{ fontFamily: "var(--font-bungee), cursive" }}
            >
              {t("project.sourceCode")}
            </a>
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                aria-label={t("project.liveDemo")}
                className="inline-flex items-center justify-center border border-white/15 bg-white/5 px-6 py-2.5 text-sm tracking-widest text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-bungee), cursive" }}
              >
                {t("project.liveDemo")}
              </a>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
