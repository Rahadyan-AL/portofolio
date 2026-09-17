"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { useI18n } from "@/lib/translations";

export default function AboutPage() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1100px] px-10 py-[80px] max-[900px]:px-6 max-[900px]:py-8">
        <div className="flex flex-wrap items-start gap-[36px] max-[900px]:flex-col">
          <div className="w-[380px] shrink-0 max-[900px]:w-full max-[900px]:max-w-[400px] max-[900px]:mx-auto">
            <ProfileCard
              name={t("about.cardName")}
              title={t("about.cardTitle")}
              handle={t("about.cardHandle")}
              status={t("about.cardStatus")}
              contactText={t("about.cardContact")}
              avatarUrl="/images/profile.jpg"
              miniAvatarUrl="https://ui-avatars.com/api/?name=RA&background=6B21D8&color=F5F1E8&size=128&bold=true"
              showUserInfo
              enableTilt
              enableMobileTilt={false}
              behindGlowEnabled
              behindGlowColor="rgba(107,33,216,0.45)"
              innerGradient="linear-gradient(145deg,#3B107388 0%,#FF2E9330 100%)"
              onContactClick={() => router.push("/contact")}
            />
            <p
              className="mt-3 text-center text-[10px] tracking-[0.15em] text-white/30"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {t("about.cardHint")}
            </p>
          </div>

          <div className="min-w-[280px] flex-1 pt-4">
            <span
              className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {t("about.kicker")}
            </span>
            <h1
              className="graffiti-heading mt-2 text-[clamp(34px,5vw,56px)]"
              style={{ fontFamily: "var(--font-bungee), cursive" }}
            >
              {t("about.headingLine1")}
              <br />
              {t("about.headingLine2")}
            </h1>
            <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-white/85">{t("about.bio1")}</p>
            <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-white/85">{t("about.bio2")}</p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="relative w-fit pl-[18px] text-[15px] font-bold">
                <span className="absolute left-0 top-[5px] h-[9px] w-[9px] rounded-full bg-[var(--pink)]" />
                {t("about.role1")}
              </div>
              <div className="relative w-fit pl-[18px] text-[15px] font-bold">
                <span className="absolute left-0 top-[5px] h-[9px] w-[9px] rounded-full bg-[var(--gold)]" />
                {t("about.role2")}
              </div>
              <div className="relative w-fit pl-[18px] text-[15px] font-bold">
                <span className="absolute left-0 top-[5px] h-[9px] w-[9px] rounded-full bg-[var(--purple)]" />
                {t("about.role3")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
