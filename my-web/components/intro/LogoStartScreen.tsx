"use client";

import { useI18n } from "@/lib/i18n";

export function LogoStartScreen({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center brick-bg overflow-hidden px-6 text-center">
      {/* radial accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[18%] left-[12%] w-[200px] h-[200px] rounded-full bg-[var(--purple)] blur-[70px] opacity-18" />
        <div className="absolute bottom-[15%] right-[10%] w-[260px] h-[260px] rounded-full bg-[var(--pink)] blur-[70px] opacity-12" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[var(--gold)] blur-[90px] opacity-[0.06]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1
            className="graffiti-wordmark text-[clamp(44px,10vw,88px)] leading-none select-none"
            style={{ fontFamily: "var(--font-bungee), cursive" }}
          >
            RAHADYAN
          </h1>
          <p
            className="font-mono text-[11px] tracking-[0.32em] text-[var(--pink)] uppercase"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {t("intro.logo.subtitle")}
          </p>
          {/* smear blob under wordmark */}
          <div
            className="mt-3 h-[10px] w-[70%] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] opacity-60"
            style={{ background: "var(--purple)" }}
          />
        </div>

        <button
          onClick={onStart}
          className="group relative mt-2 inline-flex items-center justify-center px-10 py-4 text-[18px] font-black tracking-widest text-[var(--bg-dark)] bg-[var(--gold)] hover:bg-[#ffd76a] transition-colors cursor-pointer select-none"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            clipPath: "polygon(3% 0%, 97% 2%, 100% 92%, 4% 100%, 0% 8%)",
            boxShadow: "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)",
          }}
        >
          <span className="relative z-10">{t("intro.start")}</span>
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
        </button>

        <p
          className="font-mono text-xs text-white/35 tracking-wide"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("intro.start.hint")}
        </p>

        <p
          className="font-mono text-[10px] text-white/20 max-w-[320px] leading-relaxed"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {/* hint spray without revealing secrets */}
          ada sesuatu yang tersembunyi di dinding — coba jelajahi
        </p>
      </div>
    </div>
  );
}
