"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useI18n } from "@/lib/i18n";

// TODO: ganti dengan email asli kamu — placeholder supaya mudah di-replace
export const CONTACT_EMAIL = "rahadyancode@gmail.com";

const CONTACTS = [
  {
    key: "email",
    labelKey: "contact.email",
    handle: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: "email" as const,
  },
  {
    key: "github",
    labelKey: "contact.github",
    handle: "@Rahadyan-AL",
    href: "https://github.com/Rahadyan-AL",
    iconSlug: "github",
    iconColor: "F5F1E8",
  },
  {
    key: "linkedin",
    labelKey: "contact.linkedin",
    handle: "rahadyan-al-farisi",
    href: "https://www.linkedin.com/in/rahadyan-al-farisi",
    // inline SVG karena cdn.simpleicons.org/linkedin 404 — pakai path resmi Simple Icons
    icon: "linkedin" as const,
    iconColor: "6B21D8",
  },
  {
    key: "instagram",
    labelKey: "contact.instagram",
    handle: "@rahadyan_al",
    href: "https://instagram.com/rahadyan_al",
    iconSlug: "instagram",
    iconColor: "FF2E93",
  },
];

const ROTATIONS = ["-2deg", "1.5deg", "-1deg", "2deg"];

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="mx-auto max-w-[820px] px-6 py-[120px] text-center max-[900px]:px-6 max-[900px]:py-8">
        <span
          className="text-[13px] tracking-[2px] uppercase text-[var(--pink)]"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {t("contact.kicker")}
        </span>

        <h1
          className="mt-2 text-[clamp(44px,7vw,72px)] leading-none"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            color: "var(--gold)",
            textShadow: "3px 3px 0 var(--purple-deep), 6px 6px 0 var(--purple), -2px -2px 0 var(--pink)",
          }}
        >
          {t("contact.heading")}
        </h1>

        <p
          className="mx-auto mt-4 max-w-[480px] text-[15px] leading-relaxed text-white/65"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          {t("contact.subtitle")}
        </p>

        {/* kartu kontak — sticker/flyer robek, konsisten dengan Project/Certificates */}
        <div className="mt-12 flex flex-wrap justify-center gap-[26px_22px]">
          {CONTACTS.map((c, idx) => (
            <a
              key={c.key}
              href={c.href}
              target={c.key === "email" ? undefined : "_blank"}
              rel={c.key === "email" ? undefined : "noreferrer"}
              title={c.key === "email" ? "Kirim email" : undefined}
              className="group relative flex w-[190px] flex-col items-center gap-2.5 bg-[#1c171c] px-6 py-5 no-underline shadow-[5px_5px_0_rgba(0,0,0,0.4)] transition-transform hover:translate-y-[-4px] hover:!rotate-0"
              style={{
                clipPath: "polygon(4% 0%, 96% 3%, 100% 94%, 3% 100%, 0% 8%)",
                transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]})`,
              }}
            >
              {/* icon — LinkedIn pakai inline SVG agar tidak 404 (simpleicons CDN bug untuk linkedin) */}
              {c.icon === "email" ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFC93C"
                  strokeWidth={2}
                  className="h-[34px] w-[34px] shrink-0"
                  aria-hidden
                >
                  <rect x={2} y={4} width={20} height={16} rx={2} />
                  <path d="M2 7l10 6 10-6" />
                </svg>
              ) : c.icon === "linkedin" ? (
                <svg
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden
                  className="h-[34px] w-[34px] shrink-0"
                  fill={`#${c.iconColor}`}
                >
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ) : (
                <img
                  src={`https://cdn.simpleicons.org/${(c as unknown as { iconSlug: string }).iconSlug}/${(c as unknown as { iconColor: string }).iconColor}`}
                  alt=""
                  className="h-[34px] w-[34px] shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    // fallback: sembunyikan img rusak agar kartu tetap rapi
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              )}

              <div
                className="text-[15px] leading-none text-[var(--cream)]"
                style={{ fontFamily: "var(--font-bungee), cursive" }}
              >
                {t(c.labelKey)}
              </div>

              <div
                className="break-all text-[11px] leading-tight text-white/50"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {c.handle}
              </div>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
