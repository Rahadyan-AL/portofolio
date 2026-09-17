"use client";

import Link from "next/link";
import ShinyText from "@/components/ShinyText";
import { useI18n } from "@/lib/translations";

const EMAIL = "rahadyancode@gmail.com";
const GITHUB = "https://github.com/Rahadyan-AL";
const LINKEDIN = "https://www.linkedin.com/in/rahadyan-al-farisi";
const INSTAGRAM = "https://instagram.com/rahadyan_al";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 mt-auto border-t border-white/10 bg-[#0f0c0f]/80 backdrop-blur-[2px]">
      <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div
              className="text-[11px] tracking-[0.2em] text-white/40"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {t("footer.contactTitle")}
            </div>
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`${t("footer.contactTitle")}: ${EMAIL}`}
              className="block break-words text-[14px] text-white/85 hover:text-[var(--gold)] transition-colors [overflow-wrap:break-word]"
              style={{ fontFamily: "var(--font-jetbrains), monospace", overflowWrap: "break-word", wordBreak: "normal" }}
            >
              {EMAIL}
            </a>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span className="text-white/20">•</span>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-white/20">•</span>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-[13px] font-semibold text-white/60 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="space-y-2 md:text-right">
            <div
              className="text-[11px] tracking-[0.2em] text-white/40"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {t("footer.infoTitle")}
            </div>
            <Link
              href="/privacy-policy"
              prefetch={false}
              aria-label={t("footer.privacyPolicy")}
              className="block text-[13px] text-white/60 hover:text-white transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <ShinyText
            text={t("footer.madeWith")}
            speed={2.2}
            color="rgba(255,255,255,0.55)"
            shineColor="#FFC93C"
            spread={120}
            className="text-[12px] tracking-[0.18em]"
          />
          <div
            className="mt-1 text-[11px] text-white/25"
            style={{ fontFamily: "var(--font-jetbrains), monospace" }}
          >
            © {new Date().getFullYear()} {t("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
