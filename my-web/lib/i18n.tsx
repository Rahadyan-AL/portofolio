"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredLanguage, setStoredLanguage, type Language } from "./storage";

type Dictionary = Record<string, string>;

// Dummy/placeholder bilingual content — TODO: ganti isi asli nanti
const dict: Record<Language, Dictionary> = {
  id: {
    "intro.loading": "NGECAT DINDING...",
    "intro.logo.subtitle": "portfolio 2026 — game x graffiti",
    "intro.start": "START",
    "intro.start.hint": "tekan untuk masuk",
    "intro.language.title": "PILIH BAHASA",
    "intro.language.subtitle": "pilih bahasa untuk melanjutkan",
    "intro.audio.title": "AUDIO?",
    "intro.audio.subtitle": "nyalakan musik & efek suara? (bisa diubah di Settings)",
    "intro.audio.on": "NYALA",
    "intro.audio.off": "MATI",
    "intro.continue": "LANJUT",
    "home.kicker": "// portfolio 2026",
    "home.subtitle":
      "Fullstack developer yang kadang nyambi jadi UI/UX designer. Ada beberapa hal tersembunyi di sekitar sini — coba cari.",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skill": "Skill",
    "nav.project": "Project",
    "nav.certificate": "Sertifikat",
    "nav.sourceCode": "Source Code",
  },
  en: {
    "intro.loading": "SPRAYING THE WALL...",
    "intro.logo.subtitle": "portfolio 2026 — game x graffiti",
    "intro.start": "START",
    "intro.start.hint": "press to enter",
    "intro.language.title": "CHOOSE LANGUAGE",
    "intro.language.subtitle": "pick your language to continue",
    "intro.audio.title": "AUDIO?",
    "intro.audio.subtitle": "enable music & sound effects? (you can change in Settings)",
    "intro.audio.on": "ON",
    "intro.audio.off": "OFF",
    "intro.continue": "CONTINUE",
    "home.kicker": "// portfolio 2026",
    "home.subtitle":
      "Fullstack developer who sometimes doubles as UI/UX designer. There are hidden things around here — try to find them.",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skill": "Skill",
    "nav.project": "Project",
    "nav.certificate": "Certificates",
    "nav.sourceCode": "Source Code",
  },
};

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
