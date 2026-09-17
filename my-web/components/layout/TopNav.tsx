"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/translations";
import { LangToggle } from "./LangToggle";
import { SourceCodeModal } from "./SourceCodeModal";
import "@/components/GooeyNav/GooeyNav.css";

type NavItem = {
  key: string;
  labelKey: string;
  href?: string;
  external?: boolean;
  rotate: string;
  smear: string;
};

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

  // Gooey burst saat perpindahan halaman — tetap pakai desain lama, hanya tambah efek
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const gooeyRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!navListRef.current || !navContainerRef.current || !gooeyRef.current) return;
    const activeIndex = NAV_ITEMS.findIndex((it) => !it.external && it.href && isActive(pathname, it.href));
    if (activeIndex < 0) return;
    const activeLi = navListRef.current.querySelectorAll("li")[activeIndex] as HTMLElement | undefined;
    if (!activeLi || !gooeyRef.current || !navContainerRef.current) return;

    const containerRect = navContainerRef.current.getBoundingClientRect();
    const pos = activeLi.getBoundingClientRect();
    Object.assign(gooeyRef.current.style, {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    });

    // particle burst (gooey)
    const el = gooeyRef.current;
    const particleCount = 12;
    const colors = [1, 2, 3, 1, 2, 3, 1, 4];
    const noise = (n = 1) => n / 2 - Math.random() * n;
    const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
      const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };
    el.style.setProperty("--time", `1200ms`);
    // bersihkan sisa
    el.querySelectorAll(".particle").forEach((p) => p.remove());
    for (let i = 0; i < particleCount; i++) {
      const t = 600 + noise(300);
      const d: [number, number] = [90, 10];
      const r = 100;
      const rotate = noise(r / 10);
      const p = {
        start: getXY(d[0], particleCount - i, particleCount),
        end: getXY(d[1] + noise(7), particleCount - i, particleCount),
        time: t,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
      };
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        el.appendChild(particle);
        el.classList.add("active");
        setTimeout(() => {
          try {
            el.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#141014]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Desktop nav — desain lama tetap, tambah efek gooey saat pindah halaman */}
          <div ref={navContainerRef} className="relative hidden md:flex flex-1 items-center justify-center">
            <nav aria-label="Primary" className="relative">
              <ul
                ref={navListRef}
                className="flex items-center gap-1.5 lg:gap-5 list-none m-0 p-0"
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
                      <li key={item.key} className="relative">
                        <button
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
                      </li>
                    );
                  }

                  return (
                    <li key={item.key} className="relative">
                      <Link
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
                    </li>
                  );
                })}
              </ul>
            </nav>
            {/* Gooey burst layer — particles only, tidak mengganti desain pill */}
            <span
              ref={gooeyRef}
              className="gooey-burst graffiti-gooey pointer-events-none absolute left-0 top-0 grid place-items-center z-0"
              aria-hidden
              style={{ width: 0, height: 0 }}
            />
          </div>

          {/* Mobile: brand + hamburger */}
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

          <div className="shrink-0">
            <LangToggle />
          </div>
        </div>

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
