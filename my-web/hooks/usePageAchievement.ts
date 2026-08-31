"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAchievements } from "@/components/achievements/AchievementContext";

// Map pathname to achievement id
function pathToAchId(pathname: string): string | null {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/skill")) return "skill";
  if (pathname.startsWith("/project")) return "project";
  if (pathname.startsWith("/sertifikat")) return "certificate";
  return null;
}

export function usePageAchievement() {
  const pathname = usePathname();
  const { unlock } = useAchievements();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Unlock visit achievement on pathname change
  useEffect(() => {
    const id = pathToAchId(pathname);
    if (id) unlock(id);
  }, [pathname, unlock]);

  // 5-minute stay achievement
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    // Don't count if already unlocked — still set but will no-op
    timerRef.current = setTimeout(() => {
      unlock("stay_5min");
    }, 5 * 60 * 1000); // 5 menit

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname, unlock]);
}
