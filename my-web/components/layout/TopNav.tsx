"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { LangToggle } from "./LangToggle";
import { SourceCodeModal } from "./SourceCodeModal";

type NavItem = {
  key: string;
  labelKey: string;
  href?: string;
  external?: boolean;
  rotate: string;
  smear: string;
};

// Rotasi kecil & smear warna-warni per item — dipertahankan dari SideNav versi lama
const NAV_ITEMS: NavItem[] = [
  { key: "home", labelKey: "nav.home", href: "/", rotate: "-1.6deg", smear: "var(--purple)" },
  { key: "about", labelKey: "nav.about", href: "/about", rotate: "1.4deg", smear: "var(--gold)" },
  { key: "skill", labelKey: "nav.skill", href: "/skill", rotate: "-1deg", smear: "var(--pink)" },
  { key: "project", labelKey: "nav.project", href: "/project", rotate: "1.7deg", smear: "var(--purple)" },
  { key: "certificate", labelKey: "nav.certificate", href: "/sertifikat", rotate: "-1.5deg", smear: "var(--gold)" },
  { key: "source", labelKey: "nav.sourceCode", external: true, rotate: "1deg", smear: "var(--pink)" },
  { key: "contact", labelKey: "nav.contact", href: "/contact", rotate: "-1.1deg", smear: "var(--cream)" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function TopNav() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#141014]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Desktop nav — horizontal row, center */}
          <nav
            aria-label="Primary"
            className="hidden md:flex flex-1 items-center justify-center gap-1.5 lg:gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const label = t(item.labelKey);
              const active = !item.external && item.href ? isActive(pathname, item.href) : false;

              const baseStyle: React.CSSProperties = {
                fontFamily: "var(--font-bungee), cursive",
                transform: `rotate(${item.rotate})`,
                textShadow: active
                  ? "2px 2px 0 var(--purple-deep), 4px 4px 0 var(--pink)"
                  : "2px 2px 0 rgba(0,0,0,0.5)",
              };

              const smearStyle: React.CSSProperties = {
                background: item.smear,
                opacity: active ? 0.85 : 0.52,
                height: active ? 9 : 7,
                width: active ? "94%" : "78%",
              };

              if (item.external) {
                return (
                  <button
                    key={item.key}
                    onClick={() => setModalOpen(true)}
                    className={`relative shrink-0 cursor-pointer select-none px-1.5 py-1 text-[14px] lg:text-[16px] transition-colors ${
                      active ? "text-[var(--gold)]" : "text-white/85 hover:text-[var(--cream)]"
                    }`}
                    style={baseStyle}
                  >
                    {label}
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-[-2px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] transition-all"
                      style={smearStyle}
                    />
                  </button>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={item.href!}
                  prefetch={false}
                  aria-current={active ? "page" : undefined}
                  className={`relative shrink-0 select-none px-1.5 py-1 text-[14px] lg:text-[16px] transition-colors ${
                    active ? "text-[var(--gold)]" : "text-white/85 hover:text-[var(--cream)]"
                  }`}
                  style={baseStyle}
                >
                  {label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-[-2px] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] transition-all"
                    style={smearStyle}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile: brand placeholder + hamburger */}
          <div className="flex md:hidden flex-1 items-center gap-2">
            <span
              className="text-[16px] tracking-wide text-[var(--gold)]"
              style={{
                fontFamily: "var(--font-bungee), cursive",
                textShadow: "1.5px 1.5px 0 var(--purple-deep), 3px 3px 0 var(--pink)",
              }}
            >
              RF
            </span>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80"
            >
              <span className="text-[14px] leading-none">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* Lang toggle — selalu terlihat di kanan atas, terpisah dari nav */}
          <div className="shrink-0">
            <LangToggle />
          </div>
        </div>

        {/* Mobile dropdown — tetap horizontal feel, tapi stack vertical saat layar kecil */}
        {menuOpen && (
          <div className="border-t border-white/[0.06] bg-[#141014]/95 backdrop-blur-md md:hidden">
            <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.map((item) => {
                const label = t(item.labelKey);
                const active = !item.external && item.href ? isActive(pathname, item.href) : false;
                const baseStyle: React.CSSProperties = {
                  fontFamily: "var(--font-bungee), cursive",
                  transform: `rotate(${item.rotate})`,
                  textShadow: active
                    ? "2px 2px 0 var(--purple-deep), 4px 4px 0 var(--pink)"
                    : "2px 2px 0 rgba(0,0,0,0.5)",
                };
                const smearStyle: React.CSSProperties = {
                  background: item.smear,
                  opacity: active ? 0.85 : 0.45,
                  height: active ? 8 : 6,
                  width: active ? "90%" : "72%",
                };

                if (item.external) {
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setMenuOpen(false);
                        setModalOpen(true);
                      }}
                      className={`relative w-fit px-1 py-1.5 text-left text-[15px] ${
                        active ? "text-[var(--gold)]" : "text-white/85"
                      }`}
                      style={baseStyle}
                    >
                      {label}
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]"
                        style={smearStyle}
                      />
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.key}
                    href={item.href!}
                    prefetch={false}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`relative w-fit px-1 py-1.5 text-[15px] ${
                      active ? "text-[var(--gold)]" : "text-white/85"
                    }`}
                    style={baseStyle}
                  >
                    {label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%]"
                      style={smearStyle}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <SourceCodeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
