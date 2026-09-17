"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import Link from "next/link";
import { useI18n } from "@/lib/translations";

export default function PrivacyPolicyPage() {
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="mx-auto max-w-[800px] px-6 py-[48px] max-[900px]:px-6">
        <Link
          href="/"
          aria-label={t("privacy.back")}
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] text-white/50 hover:text-white/80"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("privacy.back")}
        </Link>

        <h1
          className="graffiti-heading mt-6 text-[clamp(28px,5vw,44px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          {t("privacy.title")}
        </h1>
        <p
          className="mt-2 text-[12px] tracking-[0.15em] text-white/40"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("privacy.updated")}
        </p>

        <div className="mt-8 space-y-6 rounded-[16px] border border-white/10 bg-[#1c171c]/80 p-6 text-[14px] leading-relaxed text-white/75 md:p-8">
          <p>{t("privacy.intro")}</p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            {t("privacy.s1.title")}
          </h2>
          <p>{t("privacy.s1.desc")}</p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            {t("privacy.s2.title")}
          </h2>
          <p>{t("privacy.s2.desc")}</p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            {t("privacy.s3.title")}
          </h2>
          <p>{t("privacy.s3.desc")}</p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            {t("privacy.s4.title")}
          </h2>
          <p>{t("privacy.s4.desc")}</p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            {t("privacy.s5.title")}
          </h2>
          <p>
            {t("privacy.s5.descPrefix")}{" "}
            <Link href="/contact" className="text-[var(--gold)] hover:underline">
              {t("privacy.s5.link")}
            </Link>{" "}
            {t("privacy.s5.suffix")}
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
