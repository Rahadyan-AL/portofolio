"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { playClick, playDenied, playHover } from "@/lib/audio";
import { useCollectibles } from "@/components/collectibles/CollectiblesContext";

// TODO_PLACEHOLDER_SOURCE_REPO: ganti dengan link repo GitHub asli kamu
const SOURCE_REPO_URL = "https://github.com/rahadian/portfolio";

type NavItem = {
  key: string;
  labelKey: string;
  href: string;
  size: number;
  rotate: string;
  smear: string;
};

const NAV: NavItem[] = [
  { key: "home", labelKey: "nav.home", href: "/", size: 24, rotate: "-2deg", smear: "var(--purple)" },
  { key: "about", labelKey: "nav.about", href: "/about", size: 26, rotate: "1.5deg", smear: "var(--gold)" },
  { key: "skill", labelKey: "nav.skill", href: "/skill", size: 23, rotate: "-1deg", smear: "var(--pink)" },
  { key: "project", labelKey: "nav.project", href: "/project", size: 26, rotate: "2deg", smear: "var(--purple)" },
  { key: "sertifikat", labelKey: "nav.certificate", href: "/sertifikat", size: 22, rotate: "-1.8deg", smear: "var(--gold)" },
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
  const { sprayCount, codeCount } = useCollectibles();

  const sprayFull = sprayCount >= 10;
  const codeFull = codeCount >= 10;
  const bothFull = sprayFull && codeFull;

  // Source Code visual state
  const sourceState = bothFull ? "unlocked" : sprayFull ? "sprayOnly" : codeFull ? "codeOnly" : "locked";

  return (
    <nav
      className={
        variant === "desktop"
          ? "absolute left-[56px] top-1/2 -translate-y-1/2 z-10 hidden flex-col gap-[22px] lg:flex"
          : "flex flex-col gap-5"
      }
    >
      {NAV.map((item) => {
        const active = isActive(pathname, item.href);
        const label = t(item.labelKey);
        const fontSize = active ? 31 : item.size;

        const commonStyle: React.CSSProperties = {
          fontFamily: "var(--font-bungee), cursive",
          fontSize,
          transform: `rotate(${item.rotate})`,
          textShadow: active ? "2px 2px 0 var(--purple-deep), 5px 5px 0 var(--pink)" : "2px 2px 0 rgba(0,0,0,0.5)",
        };

        const smearStyle: React.CSSProperties = {
          background: item.smear,
          opacity: 0.55,
          width: active ? "90%" : "75%",
          height: active ? 10 : 8,
        };

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
            {active && <span className="absolute -left-7 top-2 text-[13px] text-[var(--pink)]">◆</span>}
          </Link>
        );
      })}

      {/* Source Code — progresif */}
      {sourceState === "unlocked" ? (
        <a
          href={SOURCE_REPO_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="relative w-fit cursor-pointer select-none text-[var(--gold)] hover:text-[#ffd76a] transition-colors"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            fontSize: 21,
            transform: "rotate(1deg)",
            textShadow: "2px 2px 0 var(--purple-deep), 5px 5px 0 var(--pink)",
          }}
          title="Source Code terbuka! Klik untuk buka repo"
        >
          {t("nav.sourceCode")}{" "}
          <span className="ml-1 text-[12px] align-[2px] text-white/80">↗</span>
          <span
            className="absolute -bottom-1.5 left-[-3px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]"
            style={{
              background: "linear-gradient(90deg, var(--red), var(--cream))",
              opacity: 0.85,
              width: "90%",
              height: 10,
              boxShadow: "0 0 8px rgba(255,201,60,0.5)",
            }}
          />
        </a>
      ) : sourceState === "sprayOnly" ? (
        <div
          onClick={() => playDenied()}
          onMouseEnter={() => playHover()}
          className="relative w-fit select-none cursor-pointer"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            fontSize: 21,
            transform: "rotate(1deg)",
            color: "var(--red)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
          }}
          title="Setengah terbuka — kumpulkan 10/10 simbol </> juga (spray 10/10 ✔)"
        >
          {t("nav.sourceCode")}
          <span className="ml-2 text-[11px] tracking-wide align-[2px] text-[var(--red)]/70">10/10 🎨</span>
          <span className="ml-1 text-[14px] align-[2px]">🔒</span>
          <span
            className="absolute -bottom-1.5 left-[-3px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] bg-[var(--red)] opacity-60"
            style={{ width: "75%", height: 8 }}
          />
        </div>
      ) : sourceState === "codeOnly" ? (
        <div
          onClick={() => playDenied()}
          onMouseEnter={() => playHover()}
          className="relative w-fit select-none cursor-pointer"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            fontSize: 21,
            transform: "rotate(1deg)",
            color: "var(--cream)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
          }}
          title="Setengah terbuka — kumpulkan 10/10 kaleng cat juga (code 10/10 ✔)"
        >
          {t("nav.sourceCode")}
          <span className="ml-2 text-[11px] tracking-wide align-[2px] text-white/50">10/10 &lt;/&gt;</span>
          <span className="ml-1 text-[14px] align-[2px]">🔒</span>
          <span
            className="absolute -bottom-1.5 left-[-3px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] bg-[var(--cream)] opacity-50"
            style={{ width: "75%", height: 8 }}
          />
        </div>
      ) : (
        <div
          onClick={() => playDenied()}
          onMouseEnter={() => playHover()}
          className="relative w-fit select-none cursor-pointer"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            fontSize: 21,
            transform: "rotate(1deg)",
            color: "rgba(232,54,43,0.55)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
          }}
          title={`Locked — spray ${sprayCount}/10, code ${codeCount}/10`}
        >
          {t("nav.sourceCode")}
          <span className="ml-2 text-[14px] align-[2px]">🔒</span>
          <span
            className="absolute -bottom-1.5 left-[-3px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] bg-[var(--red)] opacity-30"
            style={{ width: "75%", height: 8 }}
          />
        </div>
      )}
    </nav>
  );
}
