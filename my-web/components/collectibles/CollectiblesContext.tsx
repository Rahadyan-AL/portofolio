"use client";

import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import {
  getCollectedIds,
  getCollectedCount,
  getTotalCollected,
  collect,
  isAllFull,
  isFull,
  type CollectibleType,
} from "@/lib/collectibles";
import { useAchievements } from "@/components/achievements/AchievementContext";
import { playSprayCling } from "@/lib/audio";

type PopupData = { type: CollectibleType; id: string };

type CollectCtxType = {
  sprayCount: number;
  codeCount: number;
  total: number;
  collectItem: (type: CollectibleType, id: string) => boolean;
  isCollected: (type: CollectibleType, id: string) => boolean;
  getUncollected: (type: CollectibleType) => string[];
};

const CollectCtx = createContext<CollectCtxType>({
  sprayCount: 0,
  codeCount: 0,
  total: 0,
  collectItem: () => false,
  isCollected: () => false,
  getUncollected: () => [],
});

export function useCollectibles() {
  return useContext(CollectCtx);
}

export function CollectiblesProvider({ children }: { children: React.ReactNode }) {
  const [sprayCount, setSprayCount] = useState(0);
  const [codeCount, setCodeCount] = useState(0);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const { unlock } = useAchievements();

  const refresh = useCallback(() => {
    setSprayCount(getCollectedCount("spray"));
    setCodeCount(getCollectedCount("code"));
  }, []);

  useEffect(() => {
    refresh();
    const h = () => refresh();
    window.addEventListener("collectibles:updated", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("collectibles:updated", h);
      window.removeEventListener("storage", h);
    };
  }, [refresh]);

  // popup auto-hide after 1.6s (seperti mockup)
  useEffect(() => {
    if (!popup) return;
    const t = setTimeout(() => setPopup(null), 1600);
    return () => clearTimeout(t);
  }, [popup]);

  const collectItem = useCallback(
    (type: CollectibleType, id: string) => {
      const ok = collect(type, id);
      if (!ok) return false;
      refresh();
      setPopup({ type, id });

      playSprayCling();

      // achievement hooks for full collection
      const afterSpray = getCollectedCount("spray");
      const afterCode = getCollectedCount("code");
      if (type === "spray" && afterSpray >= 10) unlock("spray_full");
      if (type === "code" && afterCode >= 10) unlock("code_full");

      // grand finale trigger (akan ditangani full di Tahap 7, tapi simpan event)
      if (isAllFull()) {
        // TODO_TAHAP_7: grand finale popup + slide CTA akan dipicu di sini
        window.dispatchEvent(new Event("collectibles:allFull"));
      }

      window.dispatchEvent(new Event("collectibles:updated"));
      return true;
    },
    [refresh, unlock]
  );

  const isCollected = useCallback((type: CollectibleType, id: string) => {
    return getCollectedIds(type).includes(id);
  }, []);

  const getUncollected = useCallback((type: CollectibleType) => {
    const all = Array.from({ length: 10 }, (_, i) => `${type}-${i + 1}`);
    const collected = getCollectedIds(type);
    return all.filter((id) => !collected.includes(id));
  }, []);

  return (
    <CollectCtx.Provider value={{ sprayCount, codeCount, total: sprayCount + codeCount, collectItem, isCollected, getUncollected }}>
      {children}

      {/* found popup — tengah layar, spray reveal dari kiri ke kanan */}
      {popup && (
        <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-black/55">
          <div className="relative px-10 py-8 text-center">
            <p
              className="mb-2 text-xs tracking-[3px] text-[var(--gold)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              ITEM DITEMUKAN
            </p>
            <p
              className="relative inline-block text-[clamp(20px,4vw,34px)] text-[var(--gold)]"
              style={{
                fontFamily: "var(--font-bungee), cursive",
                textShadow: "2px 2px 0 var(--purple-deep), 4px 4px 0 var(--pink)",
                animation: "spray-reveal 0.7s steps(14) forwards",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              {popup.type === "spray" ? "KALENG CAT SEMPROT" : "SIMBOL </>"}
            </p>
          </div>
        </div>
      )}

      <style>{`@keyframes spray-reveal { to { clip-path: inset(0 0 0 0); } }`}</style>
    </CollectCtx.Provider>
  );
}


