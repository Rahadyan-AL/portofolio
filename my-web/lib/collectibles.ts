import { STORAGE_KEYS } from "./storage";

export type CollectibleType = "spray" | "code";

const TOTAL_PER_TYPE = 10;

export function getCollectedIds(type: CollectibleType): string[] {
  if (typeof window === "undefined") return [];
  const key = type === "spray" ? STORAGE_KEYS.COLLECTIBLES_SPRAY : STORAGE_KEYS.COLLECTIBLES_CODE;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
    return [];
  } catch {
    return [];
  }
}

export function getCollectedCount(type: CollectibleType): number {
  return getCollectedIds(type).length;
}

export function getTotalCollected(): number {
  return getCollectedCount("spray") + getCollectedCount("code");
}

export function isCollected(type: CollectibleType, id: string): boolean {
  return getCollectedIds(type).includes(id);
}

// id format: "spray-1" ... "spray-10", "code-1" ... "code-10"
export function collect(type: CollectibleType, id: string): boolean {
  const ids = getCollectedIds(type);
  if (ids.includes(id)) return false;
  ids.push(id);
  const key = type === "spray" ? STORAGE_KEYS.COLLECTIBLES_SPRAY : STORAGE_KEYS.COLLECTIBLES_CODE;
  localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new Event("collectibles:updated"));
  return true;
}

export function getUncollectedIds(type: CollectibleType): string[] {
  const all = Array.from({ length: TOTAL_PER_TYPE }, (_, i) => `${type}-${i + 1}`);
  const collected = getCollectedIds(type);
  return all.filter((id) => !collected.includes(id));
}

export function isFull(type: CollectibleType): boolean {
  return getCollectedCount(type) >= TOTAL_PER_TYPE;
}

export function isAllFull(): boolean {
  return isFull("spray") && isFull("code");
}
