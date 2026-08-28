"use client";

import { useI18n } from "@/lib/i18n";
import type { Language } from "@/lib/storage";

export function LanguageScreen({
  onNext,
}: {
  onNext: (lang: Language) => void;
}) {
  const { lang, setLang, t } = useI18n();

  const pick = (l: Language) => {
    setLang(l);
    onNext(l);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center brick-bg px-6 text-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] right-[15%] w-[200px] h-[200px] rounded-full bg-[var(--gold)] blur-[70px] opacity-10" />
        <div className="absolute bottom-[18%] left-[12%] w-[220px] h-[220px] rounded-full bg-[var(--purple)] blur-[70px] opacity-15" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-[520px]">
        <div>
          <p
            className="font-mono text-xs tracking-[0.3em] text-[var(--pink)] mb-2"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            // step 1 / 2
          </p>
          <h2
            className="graffiti-heading text-[clamp(28px,6vw,44px)]"
            style={{ fontFamily: "var(--font-bungee), cursive" }}
          >
            {t("intro.language.title")}
          </h2>
          <p
            className="mt-2 font-mono text-xs text-white/50"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {t("intro.language.subtitle")}
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center">
          {(["id", "en"] as Language[]).map((l) => {
            const active = lang === l;
            return (
              <button
                key={l}
                onClick={() => pick(l)}
                className={`flex-1 max-w-[200px] py-5 text-[20px] tracking-widest transition-all cursor-pointer select-none ${
                  active
                    ? "bg-[var(--gold)] text-[var(--bg-dark)]"
                    : "bg-white/5 text-[var(--cream)] border border-white/10 hover:bg-white/10 hover:border-[var(--gold)]/40"
                }`}
                style={{
                  fontFamily: "var(--font-bungee), cursive",
                  clipPath: "polygon(4% 0%, 96% 2%, 100% 94%, 6% 100%, 0% 6%)",
                  boxShadow: active
                    ? "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)"
                    : "3px 3px 0 rgba(0,0,0,0.3)",
                }}
              >
                {l.toUpperCase()}
              </button>
            );
          })}
        </div>

        <p
          className="font-mono text-[11px] text-white/30"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          bisa diganti kapan saja di Settings →
        </p>
      </div>
    </div>
  );
}
