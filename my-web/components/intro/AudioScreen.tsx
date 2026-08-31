"use client";

import { useI18n } from "@/lib/i18n";
import { playClick } from "@/lib/audio";

export function AudioScreen({
  onSelect,
}: {
  onSelect: (enabled: boolean) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center brick-bg px-6 text-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[15%] left-[18%] w-[200px] h-[200px] rounded-full bg-[var(--pink)] blur-[70px] opacity-12" />
        <div className="absolute bottom-[18%] right-[12%] w-[220px] h-[220px] rounded-full bg-[var(--gold)] blur-[70px] opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-[560px]">
        <div>
          <p
            className="font-mono text-xs tracking-[0.3em] text-[var(--pink)] mb-2"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            // step 2 / 2
          </p>
          <h2
            className="graffiti-heading text-[clamp(28px,6vw,44px)]"
            style={{ fontFamily: "var(--font-bungee), cursive" }}
          >
            {t("intro.audio.title")}
          </h2>
          <p
            className="mt-2 font-mono text-xs text-white/50 max-w-[360px] mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            {t("intro.audio.subtitle")}
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={() => {
              playClick();
              onSelect(true);
            }}
            className="flex-1 max-w-[200px] py-5 text-[18px] tracking-widest bg-[var(--gold)] text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors cursor-pointer select-none"
            style={{
              fontFamily: "var(--font-bungee), cursive",
              clipPath: "polygon(3% 0%, 97% 2%, 100% 92%, 4% 100%, 0% 8%)",
              boxShadow: "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)",
            }}
          >
            🔊 {t("intro.audio.on")}
          </button>
          <button
            onClick={() => {
              playClick();
              onSelect(false);
            }}
            className="flex-1 max-w-[200px] py-5 text-[18px] tracking-widest bg-white/5 text-[var(--cream)] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer select-none"
            style={{
              fontFamily: "var(--font-bungee), cursive",
              clipPath: "polygon(4% 0%, 96% 2%, 100% 94%, 6% 100%, 0% 6%)",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
            }}
          >
            🔇 {t("intro.audio.off")}
          </button>
        </div>

        <p
          className="font-mono text-[11px] text-white/25 leading-relaxed max-w-[340px]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {/* TODO_PLACEHOLDER_AUDIO: ganti/isi file audio di public/audio/bg-loop.mp3 jika sudah ada */}
          placeholder — file audio di <code className="text-white/40">public/audio/bg-loop.mp3</code>
        </p>
      </div>
    </div>
  );
}
