"use client";

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { getUnlockedIds, unlockAchievement, getAchievementById } from "@/lib/achievements";
import { playAchievement } from "@/lib/audio";

type PopupItem = { id: string; name: string; trigger: string };

type AchContextType = {
  unlocked: string[];
  unlock: (id: string) => boolean;
  isUnlocked: (id: string) => boolean;
  refresh: () => void;
  total: number;
};

const AchContext = createContext<AchContextType>({
  unlocked: [],
  unlock: () => false,
  isUnlocked: () => false,
  refresh: () => {},
  total: 0,
});

export function useAchievements() {
  return useContext(AchContext);
}

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [queue, setQueue] = useState<PopupItem[]>([]);
  const [current, setCurrent] = useState<PopupItem | null>(null);

  const refresh = useCallback(() => {
    setUnlocked(getUnlockedIds());
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("storage", handler);
    // custom event for same-tab updates
    window.addEventListener("achievements:updated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("achievements:updated", handler);
    };
  }, [refresh]);

  // popup queue handling — show one at a time for 5s (auto-dismiss, tidak stuck)
  useEffect(() => {
    if (current) return;
    if (queue.length === 0) return;
    const next = queue[0];
    setCurrent(next);
    setQueue((q) => q.slice(1));
    const t = setTimeout(() => setCurrent(null), 5000);
    return () => clearTimeout(t);
  }, [queue, current]);

  const unlock = useCallback(
    (id: string) => {
      const wasUnlocked = getUnlockedIds().includes(id);
      if (wasUnlocked) return false;

      const newly = unlockAchievement(id);
      if (newly) {
        const def = getAchievementById(id);
        if (def) {
          setQueue((q) => [...q, { id: def.id, name: def.name, trigger: def.trigger }]);
          playAchievement();
        }
        // check if all_pages was auto-unlocked as side effect
        const after = getUnlockedIds();
        if (after.includes("all_pages") && !wasUnlocked) {
          const alreadyHadAll = wasUnlocked; // not needed
          // if all_pages is new and not the same id, queue it too
          if (id !== "all_pages" && after.includes("all_pages")) {
            const allDef = getAchievementById("all_pages");
            // avoid double queue if all_pages was already queued
            if (allDef) {
              // check if all_pages was already in unlocked before this call
              const beforeAll = unlocked.includes("all_pages");
              if (!beforeAll) {
                setTimeout(() => {
                  setQueue((q) => [...q, { id: allDef.id, name: allDef.name, trigger: allDef.trigger }]);
                }, 5200);
              }
            }
          }
        }
        refresh();
        window.dispatchEvent(new Event("achievements:updated"));
        return true;
      }
      return false;
    },
    [refresh, unlocked]
  );

  const isUnlocked = useCallback((id: string) => unlocked.includes(id), [unlocked]);

  return (
    <AchContext.Provider
      value={{
        unlocked,
        unlock,
        isUnlocked,
        refresh,
        total: unlocked.length,
      }}
    >
      {children}
      {/* popup container */}
      <div className="pointer-events-none fixed top-6 right-6 z-50 flex flex-col gap-3 max-[600px]:left-6 max-[600px]:right-6">
        {current && (
          <div
            className="pointer-events-auto flex items-start gap-3 rounded-[10px] border border-[var(--gold)]/30 bg-[#1c171c] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] animate-[slideIn_0.35s_ease]"
            style={{
              clipPath: "polygon(1% 0%, 99% 1%, 100% 97%, 2% 100%, 0% 4%)",
            }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[var(--bg-dark)] text-sm">
              🏆
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] tracking-[0.18em] text-[var(--gold)]"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                ACHIEVEMENT UNLOCKED
              </p>
              <p
                className="text-sm font-bold leading-tight text-[var(--cream)]"
                style={{ fontFamily: "var(--font-bungee), cursive" }}
              >
                {current.name}
              </p>
              <p className="text-[11px] leading-tight text-white/50">{current.trigger}</p>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes slideIn { from { transform: translateX(20px); opacity:0 } to { transform: translateX(0); opacity:1 } }`}</style>
    </AchContext.Provider>
  );
}
