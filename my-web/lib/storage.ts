// localStorage — hanya bahasa yang disimpan (game systems dihapus total)
export const STORAGE_KEYS = {
  LANGUAGE: "portfolio:language",
} as const;

export type Language = "id" | "en";

export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (v === "id" || v === "en") return v;
  return null;
}

export function setStoredLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}
