"use client";

import { useI18n } from "@/lib/translations";
import type { Language } from "@/lib/storage";

export function LangToggle() {
  const { lang, setLang } = useI18n();

  const item = (l: Language, label: string) => (
    <button
      key={l}
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      className={`cursor-pointer px-1 py-0.5 transition-colors ${
        lang === l ? "text-[var(--gold)] font-bold" : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className="flex items-center gap-1.5 rounded-full bg-[#141014]/60 px-3 py-1.5 text-[13px] tracking-[1px]"
      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
    >
      {item("id", "ID")}
      <span className="text-white/25">/</span>
      {item("en", "EN")}
    </div>
  );
}
