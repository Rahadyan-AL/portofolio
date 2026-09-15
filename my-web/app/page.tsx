"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { useI18n } from "@/lib/i18n";
import SplitText from "@/components/SplitText";
import DecryptedText from "@/components/DecryptedText";
import ElectricBorder from "@/components/ElectricBorder";

export default function HomePage() {
  const { t, lang } = useI18n();

  return (
    <MainLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center lg:pr-10 lg:items-center">
        <DecryptedText
          key={`kicker-${lang}`}
          text={t("home.kicker")}
          animateOn="view"
          sequential
          revealDirection="start"
          speed={40}
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          parentClassName="inline-block"
          encryptedClassName="text-white/25"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        />

        {/* sambutan graffiti — reveal huruf-per-huruf */}
        <SplitText
          key={`greeting-${lang}`}
          text={t("home.greeting")}
          tag="h1"
          splitType="chars"
          delay={55}
          duration={0.9}
          textAlign="center"
          className="mt-3 text-[clamp(28px,6vw,44px)] leading-tight text-[var(--gold)] [text-shadow:2px_2px_0_var(--purple-deep),4px_4px_0_var(--pink)]"
        />

        <p
          className="mt-4 max-w-[400px] text-[15px] leading-relaxed text-white/80"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          {t("home.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ElectricBorder color="#FFC93C" speed={1} chaos={0.12} borderRadius={6}>
            <Link
              href="/project"
              prefetch={false}
              className="block px-8 py-3 text-sm tracking-widest bg-[#1c171c] text-[var(--gold)] hover:bg-[#262026] transition-colors"
              style={{ fontFamily: "var(--font-bungee), cursive" }}
            >
              {t("home.cta.projects")}
            </Link>
          </ElectricBorder>
          <Link
            href="/sertifikat"
            prefetch={false}
            className="text-[13px] font-bold text-[var(--pink)] hover:underline"
          >
            {t("home.cta.certificates")}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
