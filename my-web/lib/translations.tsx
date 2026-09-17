"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredLanguage, setStoredLanguage, type Language } from "./storage";

type Dictionary = Record<string, string>;

// Semua key di bawah ini masih dipakai — dicek via grep t("key") di codebase
// Hapus intro.* dan nav.hint yang sudah tidak terpakai (bekas intro flow / wheel hint)
const dict: Record<Language, Dictionary> = {
  id: {
    "home.kicker": "// portfolio 2026",
    "home.greeting": "SELAMAT DATANG!",
    "home.subtitle":
      "Fullstack developer, segala macam harus bisa Front End, Back End, Mobile, dan UI/UX designer.",
    "home.cta.projects": "Lihat Project →",
    "home.cta.certificates": "Lihat Sertifikat →",
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.skill": "Skill",
    "nav.project": "Projek",
    "nav.certificate": "Sertifikat",
    "nav.sourceCode": "Source Code",
    "nav.contact": "Kontak",
    "contact.kicker": "// let's connect",
    "contact.heading": "HIT ME UP",
    "contact.subtitle": "Ada project, kerjaan, atau cuma mau ngobrol soal coding? Gas cari aku lewat salah satu ini.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.instagram": "Instagram",
    "sourceModal.title": "Pindah ke Github?",
    "sourceModal.desc":
      "Link ini membuka repo GitHub portofolio ini di tab baru. Kamu tetap di halaman ini.",
    "sourceModal.continue": "Lanjutkan",
    "sourceModal.back": "← Kembali",
  },
  en: {
    "home.kicker": "// portfolio 2026",
    "home.greeting": "WELCOME to My Website!",
    "home.subtitle":
      "Fullstack developer  UI/UX designer. Straight to it — my projects and certificates are on the next walls.",
    "home.cta.projects": "VIEW PROJECTS →",
    "home.cta.certificates": "View Certificates →",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skill": "Skill",
    "nav.project": "Project",
    "nav.certificate": "Certificates",
    "nav.sourceCode": "Source Code",
    "nav.contact": "Contact",
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
