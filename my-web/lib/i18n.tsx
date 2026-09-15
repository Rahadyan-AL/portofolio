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
    "home.greeting": "YO, SELAMAT DATANG!",
    "home.subtitle":
      "Fullstack developer yang kadang nyambi jadi UI/UX designer. Langsung saja — project dan sertifikatku ada di dinding sebelah.",
    "home.cta.projects": "LIHAT PROJECT →",
    "home.cta.certificates": "Lihat Sertifikat →",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skill": "Skill",
    "nav.project": "Project",
    "nav.certificate": "Sertifikat",
    "nav.sourceCode": "Source Code",
    "nav.contact": "Kontak",
    "nav.hint": "scroll di dalam kotak buat pilih menu",
    "contact.kicker": "// let's connect",
    "contact.heading": "HIT ME UP",
    "contact.subtitle": "Ada project, kerjaan, atau cuma mau ngobrol soal coding? Gas cari aku lewat salah satu ini.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.instagram": "Instagram",
    "sourceModal.title": "PINDAH KE GITHUB?",
    "sourceModal.desc":
      "Link ini membuka repo GitHub portofolio ini di tab baru. Kamu tetap di halaman ini.",
    "sourceModal.continue": "LANJUTKAN",
    "sourceModal.back": "← KEMBALI",
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
    "home.greeting": "YO, WELCOME!",
    "home.subtitle":
      "Fullstack developer who sometimes doubles as UI/UX designer. Straight to it — my projects and certificates are on the next walls.",
    "home.cta.projects": "VIEW PROJECTS →",
    "home.cta.certificates": "View Certificates →",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skill": "Skill",
    "nav.project": "Project",
    "nav.certificate": "Certificates",
    "nav.sourceCode": "Source Code",
    "nav.contact": "Contact",
    "nav.hint": "scroll inside the box to pick a menu",
    "contact.kicker": "// let's connect",
    "contact.heading": "HIT ME UP",
    "contact.subtitle": "Got a project, job, or just want to chat about coding? Reach me through one of these.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.instagram": "Instagram",
    "sourceModal.title": "OPEN GITHUB REPO?",
    "sourceModal.desc":
      "This opens this portfolio's GitHub repo in a new tab. You stay on this page.",
    "sourceModal.continue": "CONTINUE",
    "sourceModal.back": "← BACK",
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
