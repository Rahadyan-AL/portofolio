"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/translations";

export const SOURCE_REPO_URL = "https://github.com/Rahadyan-AL/portofolio";

export function SourceCodeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] bg-[#1c171c] p-8 text-center shadow-[6px_6px_0_rgba(0,0,0,0.5)]"
        style={{
          clipPath: "polygon(3% 0%, 97% 2%, 100% 96%, 4% 100%, 0% 6%)",
        }}
      >
        <p
          className="text-[11px] tracking-[0.25em] text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {"// source code"}
        </p>
        <h2
          className="mt-2 text-[26px] leading-tight text-[var(--gold)]"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            textShadow: "2px 2px 0 var(--purple-deep), 4px 4px 0 var(--pink)",
          }}
        >
          {t("sourceModal.title")}
        </h2>
        <p
          className="mx-auto mt-3 max-w-[320px] text-[13px] leading-relaxed text-white/70"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          {t("sourceModal.desc")}
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={SOURCE_REPO_URL}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="inline-flex items-center justify-center px-6 py-3 text-sm tracking-widest bg-[var(--gold)] text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors"
            style={{ fontFamily: "var(--font-bungee), cursive" }}
          >
            {t("sourceModal.continue")} ↗
          </a>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-6 py-2.5 text-xs tracking-[0.2em] border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {t("sourceModal.back")}
          </button>
        </div>
      </div>
    </div>
  );
}
