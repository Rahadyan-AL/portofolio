"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Terminal } from "./Terminal";
import { printDevConsoleMessage } from "@/lib/devConsole";
import { useAchievements } from "@/components/achievements/AchievementContext";

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const bufferRef = useRef<string>("");
  const { unlock } = useAchievements();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTerminal = useCallback(() => setOpen(true), []);
  const closeTerminal = useCallback(() => setOpen(false), []);

  // 1. Dev console message on mount
  useEffect(() => {
    printDevConsoleMessage();
  }, []);

  // 2. Detect dev console open (simple heuristic) for achievement
  useEffect(() => {
    let detected = false;
    const check = () => {
      if (detected) return;
      // Heuristic: outer/inner diff or firebug
      const widthDiff = window.outerWidth - window.innerWidth > 160;
      const heightDiff = window.outerHeight - window.innerHeight > 160;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firebug = !!(window as unknown as Record<string, unknown>)["__firebugOpened"];
      if (widthDiff || heightDiff || firebug) {
        detected = true;
        unlock("console");
      }
    };
    const interval = setInterval(check, 1000);
    // Also detect via F12 / Ctrl+Shift+I
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") || (e.metaKey && e.altKey && e.key.toLowerCase() === "i")) {
        setTimeout(() => unlock("console"), 500);
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [unlock]);

  // 3. Global sudo listener (ketik "sudo" di halaman mana pun)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (open) return; // jangan trigger saat terminal sudah terbuka
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;

      const key = e.key;
      // hanya huruf/angka/spasi, abaikan modifier
      if (key.length !== 1) return;

      bufferRef.current += key.toLowerCase();
      // keep last 20 chars
      if (bufferRef.current.length > 20) bufferRef.current = bufferRef.current.slice(-20);

      if (bufferRef.current.endsWith("sudo")) {
        bufferRef.current = "";
        openTerminal();
        // efek blank hitam sesaat sudah ditangani di Terminal (focus delay)
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, 1500);
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [open, openTerminal]);

  return (
    <>
      {children}
      <Terminal open={open} onClose={closeTerminal} />
      {/* hint kecil untuk QA — bisa dihapus nanti, tidak mengganggu */}
      <span className="sr-only">Ketik sudo untuk membuka terminal</span>
    </>
  );
}
