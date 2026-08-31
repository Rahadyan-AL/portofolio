"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAchievements } from "@/components/achievements/AchievementContext";
import { playKeyTap } from "@/lib/audio";

type HistoryLine = { text: string; type: "input" | "output" | "system" };

const WELCOME_LINES: string[] = [
  "Selamat datang di Terminal Website portofolio Rahadyan Al Farisi",
  "",
  "[1] Tentang Saya       -> about",
  "[2] Skill              -> skills",
  "[3] Project            -> projects",
  "[4] Sertifikat         -> certificates",
  "[5] Hubungi Saya       -> contact",
  "[0] Keluar Terminal    -> exit",
  "",
  "Ketik command di atas dan tekan Enter. Tekan ESC atau ketik 'exit' untuk keluar.",
  "Psst... ada 1 command tersembunyi 😉",
];

export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { unlock } = useAchievements();
  const [history, setHistory] = useState<HistoryLine[]>(() =>
    WELCOME_LINES.map((t) => ({ text: t, type: "system" as const }))
  );
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // focus input when open
  useEffect(() => {
    if (open) {
      // blank hitam sesaat seperti PRD 7.2
      setTimeout(() => inputRef.current?.focus(), 120);
      unlock("terminal");
    } else {
      setInput("");
    }
  }, [open, unlock]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  // click overlay to focus
  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const playTap = useCallback(() => {
    playKeyTap();
  }, []);

  const handleCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      setHistory((h) => [...h, { text: `> ${raw}`, type: "input" }]);

      // hidden easter-egg-in-easter-egg
      if (cmd === "sudo hire me" || cmd === "hire me") {
        setHistory((h) => [
          ...h,
          { text: "✨ Wah, kamu nemu command rahasia!", type: "output" },
          { text: "Terima kasih sudah mau hire — hubungi aku di rahadian@example.com 🚀", type: "output" },
          { text: "(TODO_PLACEHOLDER_HIRE_ME: ganti email/pesan di Terminal.tsx)", type: "system" },
        ]);
        return;
      }

      const nav = (path: string) => {
        setHistory((h) => [...h, { text: `→ membuka ${path} ...`, type: "output" }]);
        setTimeout(() => {
          onClose();
          router.push(path);
        }, 400);
      };

      switch (cmd) {
        case "1":
        case "about":
        case "tentang":
          nav("/about");
          break;
        case "2":
        case "skill":
        case "skills":
          nav("/skill");
          break;
        case "3":
        case "project":
        case "projects":
          nav("/project");
          break;
        case "4":
        case "sertifikat":
        case "certificates":
        case "certificate":
          nav("/sertifikat");
          break;
        case "5":
        case "contact":
        case "hubungi":
        case "hubungi saya":
          setHistory((h) => [
            ...h,
            { text: "Hubungi saya: rahadian@example.com — atau DM Instagram", type: "output" },
            { text: "(TODO_PLACEHOLDER_CONTACT: ganti kontak di Terminal.tsx)", type: "system" },
          ]);
          break;
        case "0":
        case "exit":
        case "keluar":
        case "quit":
          onClose();
          break;
        case "help":
        case "ls":
          setHistory((h) => [...h, ...WELCOME_LINES.map((t) => ({ text: t, type: "system" as const }))]);
          break;
        case "clear":
          setHistory([]);
          break;
        default:
          setHistory((h) => [...h, { text: `command tidak dikenal: '${raw}' — ketik 'help' untuk daftar`, type: "output" }]);
      }
    },
    [onClose, router]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  // auto scroll
  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-black text-[#F5F1E8] overflow-hidden"
      onClick={focusInput}
      style={{ fontFamily: "var(--font-jetbrains), JetBrains Mono, monospace" }}
    >
      {/* scanline subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px)",
        }}
      />

      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs">
        <span className="tracking-[0.2em] text-white/40">TERMINAL — sudo mode</span>
        <button
          onClick={onClose}
          className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[11px] tracking-wide text-white/60 hover:bg-white/10 cursor-pointer"
        >
          ESC / exit
        </button>
      </div>

      <div ref={containerRef} className="flex-1 overflow-auto px-4 py-4 text-[13px] leading-5 whitespace-pre-wrap">
        {history.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input"
                ? "text-[var(--gold)]"
                : line.type === "system"
                  ? "text-white/35"
                  : "text-white/80"
            }
          >
            {line.text || "\u00A0"}
          </div>
        ))}

        <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
          <span className="shrink-0 text-[var(--pink)]">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              playTap();
            }}
            placeholder="ketik command..."
            className="flex-1 bg-transparent outline-none placeholder:text-white/20 text-white caret-[var(--gold)]"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>

      <div className="border-t border-white/10 px-4 py-2 text-[11px] leading-relaxed text-white/25">
        Tips: ketik angka 1-5 atau nama command. Coba ketik <code className="text-white/50">sudo hire me</code> 😉
      </div>
    </div>
  );
}
