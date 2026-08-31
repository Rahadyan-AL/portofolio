"use client";

import { useEffect, useState, useCallback } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { LogoStartScreen } from "./LogoStartScreen";
import { LanguageScreen } from "./LanguageScreen";
import { AudioScreen } from "./AudioScreen";
import {
  isSessionValid,
  markSession,
  getStoredLanguage,
  setStoredLanguage,
  type Language,
} from "@/lib/storage";
import { useI18n } from "@/lib/i18n";
import { useAudio } from "@/components/audio/AudioProvider";

type Step = "loading" | "logo" | "language" | "audio" | "done" | "checking";

export function IntroFlow({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>("checking");
  const { setLang } = useI18n();
  const { setEnabled: setAudio } = useAudio();
  const [pendingDeepLink, setPendingDeepLink] = useState<string | null>(null);

  // Check session validity on mount
  useEffect(() => {
    const valid = isSessionValid();
    if (valid) {
      // skip intro
      setStep("done");
      return;
    }
    // capture deep link intention if not at /
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      setPendingDeepLink(window.location.pathname);
    }
    // show loading first
    setStep("loading");
  }, []);

  const handleLoadingDone = useCallback(() => setStep("logo"), []);
  const handleStart = useCallback(() => setStep("language"), []);

  const handleLanguageNext = useCallback(
    (lang: Language) => {
      setLang(lang);
      setStoredLanguage(lang);
      setStep("audio");
    },
    [setLang]
  );

  const handleAudioSelect = useCallback(
    (enabled: boolean) => {
      setAudio(enabled);
      markSession();
      const currentLang = getStoredLanguage();
      if (currentLang) setLang(currentLang);

      if (pendingDeepLink && pendingDeepLink !== "/") {
        setTimeout(() => {
          window.location.href = pendingDeepLink;
        }, 400);
      }

      setStep("done");
    },
    [pendingDeepLink, setLang, setAudio]
  );

  // Debug helper for QA: allow ?intro=1 to force intro
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("intro") === "1") {
      setStep("loading");
    }
  }, []);

  if (step === "checking") {
    return (
      <div className="min-h-screen brick-bg flex items-center justify-center">
        <p
          className="font-mono text-xs tracking-[0.2em] text-white/30"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          loading...
        </p>
      </div>
    );
  }

  if (step === "done") {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden brick-bg">
      {step === "loading" && <LoadingScreen onDone={handleLoadingDone} />}
      {step === "logo" && <LogoStartScreen onStart={handleStart} />}
      {step === "language" && <LanguageScreen onNext={handleLanguageNext} />}
      {step === "audio" && <AudioScreen onSelect={handleAudioSelect} />}

      {/* spray wipe overlay for transitions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />
      </div>
    </div>
  );
}
