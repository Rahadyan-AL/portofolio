// localStorage keys — single source of truth
export const STORAGE_KEYS = {
  SESSION_TIMESTAMP: "portfolio:sessionTimestamp",
  LANGUAGE: "portfolio:language",
  AUDIO_ENABLED: "portfolio:audioEnabled",
  // placeholders for next stages
  ACHIEVEMENTS: "portfolio:achievements",
  COLLECTIBLES_SPRAY: "portfolio:collectiblesSpray",
  COLLECTIBLES_CODE: "portfolio:collectiblesCode",
} as const;

export type Language = "id" | "en";

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 jam

export function isSessionValid(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(STORAGE_KEYS.SESSION_TIMESTAMP);
  if (!raw) return false;
  const ts = Number(raw);
  if (Number.isNaN(ts)) return false;
  return Date.now() - ts < SESSION_MAX_AGE_MS;
}

export function markSession(): void {
  localStorage.setItem(STORAGE_KEYS.SESSION_TIMESTAMP, String(Date.now()));
}

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (v === "id" || v === "en") return v;
  return null;
}

export function setStoredLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}

export function getAudioEnabled(): boolean | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEYS.AUDIO_ENABLED);
  if (v === "true") return true;
  if (v === "false") return false;
  return null;
}

export function setAudioEnabled(enabled: boolean): void {
  localStorage.setItem(STORAGE_KEYS.AUDIO_ENABLED, String(enabled));
}

export function resetProgress(): void {
  // dipakai di Settings → hapus achievement & koleksi, tapi biarkan bahasa
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  localStorage.removeItem(STORAGE_KEYS.COLLECTIBLES_SPRAY);
  localStorage.removeItem(STORAGE_KEYS.COLLECTIBLES_CODE);
  localStorage.removeItem("portfolio:grandFinaleShown");
}

export function resetAllForTesting(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION_TIMESTAMP);
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
  localStorage.removeItem(STORAGE_KEYS.COLLECTIBLES_SPRAY);
  localStorage.removeItem(STORAGE_KEYS.COLLECTIBLES_CODE);
  localStorage.removeItem("portfolio:grandFinaleShown");
  // bahasa & audio tetap biar gampang tes, tapi bisa di-reset manual kalau mau
}
