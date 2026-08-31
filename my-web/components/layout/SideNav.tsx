"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { playClick, playDenied, playHover } from "@/lib/audio";

type NavItem = {
  key: string;
  labelKey: string;
  href: string;
  size: number;
  rotate: string;
  smear: string;
  locked?: boolean;
};

const NAV: NavItem[] = [
  { key: "home", labelKey: "nav.home", href: "/", size: 24, rotate: "-2deg", smear: "var(--purple)" },
  { key: "about", labelKey: "nav.about", href: "/about", size: 26, rotate: "1.5deg", smear: "var(--gold)" },
  { key: "skill", labelKey: "nav.skill", href: "/skill", size: 23, rotate: "-1deg", smear: "var(--pink)" },
  { key: "project", labelKey: "nav.project", href: "/project", size: 26, rotate: "2deg", smear: "var(--purple)" },
  { key: "sertifikat", labelKey: "nav.certificate", href: "/sertifikat", size: 22, rotate: "-1.8deg", smear: "var(--gold)" },
  // Source Code — locked by default (akan unlock di Tahap 3 jika koleksi lengkap)
  { key: "source", labelKey: "nav.sourceCode", href: "https://github.com", size: 21, rotate: "1deg", smear: "var(--red)", locked: true },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SideNav({
  onNavigate,
  variant = "desktop",
}: {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav
      className={
        variant === "desktop"
          ? "absolute left-[56px] top-1\/2 -translate-y-1\/2 z-10 hidden flex-col gap-[22px] lg:flex"
          : "flex flex-col gap-5"
      }
    >
      {NAV.map((item) => {
        const active = !item.locked && isActive(pathname, item.href);
        const label = t(item.labelKey);
        const baseSize = item.size;
        const activeSize = 31;
        const fontSize = active ? activeSize : baseSize;

        const commonStyle: React.CSSProperties = {
          fontFamily: "var(--font-bungee), cursive",
          fontSize,
          transform: `rotate(${item.rotate})`,
          textShadow: active
            ? "2px 2px 0 var(--purple-deep), 5px 5px 0 var(--pink)"
            : item.locked
              ? "2px 2px 0 rgba(0,0,0,0.5)"
              : "2px 2px 0 rgba(0,0,0,0.5)",
        };

        const smearStyle: React.CSSProperties = {
          background: item.smear,
          opacity: item.locked ? 0.3 : 0.55,
          width: active ? "90%" : "75%",
          height: active ? 10 : 8,
        };

        if (item.locked) {
          return (
            <div
              key={item.key}
              onClick={() => playDenied()}
              onMouseEnter={() => playHover()}
              className="relative w-fit select-none cursor-pointer"
              style={{
                ...commonStyle,
                color: "rgba(232,54,43,0.55)",
              }}
              title="Locked — kumpulkan koleksi untuk membuka"
            >
              {label}
              <span className="ml-2 text-[14px] align-[2px]">🔒</span>
              <span
                className="absolute -bottom-1.5 left-[-3px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]"
                style={smearStyle}
              />
            </div>
          );
        }

        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => {
              playClick();
              onNavigate?.();
            }}
            onMouseEnter={() => playHover()}
            className={`relative w-fit cursor-pointer select-none transition-colors ${
              active ? "text-[var(--gold)]" : "text-white/50 hover:text-[var(--cream)]"
            }`}
            style={commonStyle}
          >
            {label}
            <span
              className="absolute -bottom-1.5 left-[-3px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]"
              style={smearStyle}
            />
            {active && (
              <span className="absolute -left-7 top-2 text-[13px] text-[var(--pink)]">◆</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
