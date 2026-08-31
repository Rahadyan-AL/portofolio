// Helpers for achievement localStorage — extracted from storage.ts for clarity
import { STORAGE_KEYS } from "./storage";
import { achievements } from "@/data/achievements";

export function getUnlockedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
    return [];
  } catch {
    return [];
  }
}

export function isUnlocked(id: string): boolean {
  return getUnlockedIds().includes(id);
}

export function setUnlockedIds(ids: string[]): void {
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(ids));
}

// Return true if newly unlocked
export function unlockAchievement(id: string): boolean {
  const ids = getUnlockedIds();
  if (ids.includes(id)) return false;
  ids.push(id);
  setUnlockedIds(ids);

  // Auto-check combined achievement after each unlock
  const required = ["home", "about", "skill", "project", "certificate"];
  if (required.every((r) => ids.includes(r)) && !ids.includes("all_pages")) {
    ids.push("all_pages");
    setUnlockedIds(ids);
    // Return true for original id; caller can handle all_pages popup separately
    // We'll let the context handle the second unlock event
  }
  return true;
}

export function getAchievementById(id: string) {
  return achievements.find((a) => a.id === id) ?? null;
}
