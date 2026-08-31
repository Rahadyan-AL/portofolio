"use client";

import { useState } from "react";
import { Settings, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { resetProgress, STORAGE_KEYS } from "@/lib/storage";
import { useAudio } from "@/components/audio/AudioProvider";
import type { Language } from "@/lib/storage";
import { playClick } from "@/lib/audio";

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useI18n();
  const { enabled: audioOn, setEnabled: setAudioOn, volume, setVolume } = useAudio();

  const toggleAudio = (val: boolean) => {
    playClick();
    setAudioOn(val);
  };

  const handleReset = () => {
    playClick();
    if (confirm("Reset semua achievement & koleksi? (bahasa tetap disimpan)")) {
      resetProgress();
      localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
      localStorage.removeItem(STORAGE_KEYS.COLLECTIBLES_SPRAY);
      localStorage.removeItem(STORAGE_KEYS.COLLECTIBLES_CODE);
      window.location.reload();
    }
  };

  const switchLang = (l: Language) => {
    playClick();
    setLang(l);
  };

  return (
    <div className="relative z-20">
      <button
        onClick={() => {
          playClick();
          setOpen((v) => !v);
        }}
        aria-label="Settings"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
      >
        {open ? <X size={16} /> : <Settings size={16} />}
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 w-[300px] rounded-[10px] border border-white/10 bg-[#1c171c]/95 backdrop-blur-md p-4 shadow-xl"
          style={{ clipPath: "polygon(2% 0%, 98% 1%, 100% 97%, 3% 100%, 0% 4%)" }}
        >
          <h3
            className="text-[11px] tracking-[0.2em] text-[var(--gold)] mb-3"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            SETTINGS
          </h3>

          <div className="mb-4">
            <p
              className="text-xs text-white/50 mb-2"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              Bahasa / Language
            </p>
            <div className="flex gap-2">
              {(["id", "en"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className={`flex-1 py-2 text-sm font-bold tracking-widest border transition-colors cursor-pointer ${
                    lang === l
                      ? "bg-[var(--gold)] text-[var(--bg-dark)] border-[var(--gold)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                  }`}
                  style={{ fontFamily: "var(--font-bungee), cursive" }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p
              className="text-xs text-white/50 mb-2"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              Musik Latar
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => toggleAudio(true)}
                className={`flex-1 py-2 text-xs tracking-widest border cursor-pointer ${
                  audioOn ? "bg-[var(--gold)] text-[var(--bg-dark)] border-[var(--gold)]" : "bg-white/5 text-white/60 border-white/10"
                }`}
                style={{ fontFamily: "var(--font-bungee), cursive" }}
              >
                ON
              </button>
              <button
                onClick={() => toggleAudio(false)}
                className={`flex-1 py-2 text-xs tracking-widest border cursor-pointer ${
                  !audioOn ? "bg-white/15 text-white border-white/20" : "bg-white/5 text-white/60 border-white/10"
                }`}
                style={{ fontFamily: "var(--font-bungee), cursive" }}
              >
                OFF
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] text-white/40 shrink-0"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                Volume
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 accent-[var(--gold)] h-1"
                disabled={!audioOn}
              />
              <span
                className="text-[11px] text-white/60 w-8 text-right"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {Math.round(volume * 100)}%
              </span>
            </div>
            <p
              className="mt-1 text-[10px] leading-relaxed text-white/25"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              file: <code className="text-white/40">public/audio/bg-loop.mp3</code> (loop)
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 text-xs tracking-widest bg-[var(--red)]/15 text-[var(--red)] border border-[var(--red)]/30 hover:bg-[var(--red)]/25 transition-colors cursor-pointer"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            RESET PROGRESS
          </button>
          <p
            className="mt-2 text-[10px] leading-relaxed text-white/25"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            hapus achievement & koleksi (dipakai untuk testing)
          </p>
        </div>
      )}
    </div>
  );
}
