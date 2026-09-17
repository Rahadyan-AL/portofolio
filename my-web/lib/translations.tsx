"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredLanguage, setStoredLanguage, type Language } from "./storage";
import { homeText } from "./text/home";
import { aboutText } from "./text/about";
import { skillText } from "./text/skill";
import { projectText } from "./text/project";
import { certificatesText } from "./text/certificates";
import { contactText } from "./text/contact";
import { commonText } from "./text/common";

type Dictionary = Record<string, string>;

// Helper untuk flatten per-file {id:{k:v}, en:{k:v}} jadi dict flat "home.kicker" -> "..."
// Prefix diberikan sesuai file, kecuali common yang sudah pakai key lengkap "nav.home", "footer.madeWith" dll
function flatten(prefix: string, obj: { id: Record<string, string>; en: Record<string, string> }) {
  const out: Record<Language, Dictionary> = { id: {}, en: {} };
  for (const [k, v] of Object.entries(obj.id)) out.id[`${prefix}.${k}`] = v;
  for (const [k, v] of Object.entries(obj.en)) out.en[`${prefix}.${k}`] = v;
  return out;
}

function merge(...dicts: Record<Language, Dictionary>[]): Record<Language, Dictionary> {
  const res: Record<Language, Dictionary> = { id: {}, en: {} };
  for (const d of dicts) {
    Object.assign(res.id, d.id);
    Object.assign(res.en, d.en);
  }
  return res;
}

// Gabungkan semua file lib/text/* — tetap berdampingan id/en per key di tiap file sumber
const dict: Record<Language, Dictionary> = merge(
  flatten("home", homeText),
  flatten("about", aboutText),
  flatten("skill", skillText),
  flatten("project", projectText),
  flatten("certificates", certificatesText),
  flatten("contact", contactText),
  // common sudah pakai key lengkap seperti "nav.home", "footer.madeWith", jadi tidak perlu prefix
  { id: commonText.id, en: commonText.en }
);

type I18nContextType = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  lang: "id",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("id");

  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored) setLangState(stored);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    setStoredLanguage(l);
  };

  const t = (key: string) => dict[lang][key] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

// Re-export text objects agar bisa dipakai langsung jika perlu (mis. homeText[lang].greeting)
export { homeText, aboutText, skillText, projectText, certificatesText, contactText, commonText };
