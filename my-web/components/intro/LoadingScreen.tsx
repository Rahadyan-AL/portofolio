"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(onDone, 500);
      } else {
        setProgress(Math.min(p, 100));
      }
    }, 180);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-dark)] brick-bg overflow-hidden">
      {/* radial accent */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full bg-[var(--purple)] blur-[60px] opacity-20" />
        <div className="absolute bottom-[20%] right-[15%] w-[220px] h-[220px] rounded-full bg-[var(--pink)] blur-[60px] opacity-15" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* spray can icon placeholder + title */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-3 w-[220px] max-w-[70vw] rounded-full overflow-hidden border border-white/10 bg-black/40"
            aria-label="loading"
          >
            <div
              className="h-full bg-[var(--gold)] transition-all duration-200 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 12px rgba(255,201,60,0.6)",
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(0,0,0,0.12) 0 8px, transparent 8px 16px)",
              }}
            />
          </div>
          <p
            className="font-mono text-xs tracking-[0.2em] text-[var(--cream)]/60"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {t("intro.loading")} {Math.round(progress)}%
          </p>
        </div>

        {/* wordmark small while loading */}
        <p
          className="text-2xl graffiti-wordmark opacity-60"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          RAHADYAN
        </p>
      </div>

      {/* bottom drip decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[var(--purple)] via-[var(--pink)] to-[var(--gold)] opacity-60" />
    </div>
  );
}
