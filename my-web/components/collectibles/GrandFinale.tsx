"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useCollectibles } from "./CollectiblesContext";
import { playAchievement, playClick } from "@/lib/audio";

const STORAGE_SHOWN = "portfolio:grandFinaleShown";

export function GrandFinale() {
  const { sprayCount, codeCount } = useCollectibles();
  const bothFull = sprayCount >= 10 && codeCount >= 10;
  const [showPopup, setShowPopup] = useState(false);
  const [showSlide, setShowSlide] = useState(false);

  // Show popup when bothFull becomes true for first time
  useEffect(() => {
    if (!bothFull) return;
    const already = typeof window !== "undefined" ? localStorage.getItem(STORAGE_SHOWN) : null;
    if (already === "true") return;
    // small delay biar achievement popup selesai dulu
    const t = setTimeout(() => {
      setShowPopup(true);
      playAchievement();
    }, 800);
    return () => clearTimeout(t);
  }, [bothFull]);

  // Also listen to collectibles:allFull event for immediate trigger
  useEffect(() => {
    const h = () => {
      if (bothFull && localStorage.getItem(STORAGE_SHOWN) !== "true") {
        setShowPopup(true);
      }
    };
    window.addEventListener("collectibles:allFull", h);
    return () => window.removeEventListener("collectibles:allFull", h);
  }, [bothFull]);

  const handleNext = useCallback(() => {
    playClick();
    setShowPopup(false);
    setShowSlide(true);
    localStorage.setItem(STORAGE_SHOWN, "true");
  }, []);

  const handleCloseSlide = useCallback(() => {
    playClick();
    setShowSlide(false);
  }, []);

  // Reset handler for testing — listen to reset via storage clear
  useEffect(() => {
    const h = () => {
      if (!bothFull) {
        // if reset, hide
        setShowPopup(false);
        setShowSlide(false);
      }
    };
    window.addEventListener("collectibles:updated", h);
    return () => window.removeEventListener("collectibles:updated", h);
  }, [bothFull]);

  return (
    <>
      {/* Popup — akses Source Code terbuka */}
      {showPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-6">
          <div
            className="relative w-full max-w-[480px] bg-[#1c171c] p-8 text-center shadow-[8px_8px_0_rgba(0,0,0,0.5)]"
            style={{ clipPath: "polygon(2% 0%, 98% 1%, 100% 97%, 3% 100%, 0% 4%)" }}
          >
            <p
              className="mb-2 text-xs tracking-[3px] text-[var(--gold)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              ★ GRAND FINALE ★
            </p>
            <h2
              className="text-[28px] leading-tight text-[var(--gold)]"
              style={{ fontFamily: "var(--font-bungee), cursive", textShadow: "2px 2px 0 var(--purple-deep), 4px 4px 0 var(--pink)" }}
            >
              SOURCE CODE TERBUKA!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Kamu berhasil mengumpulkan <b className="text-[var(--gold)]">10/10 kaleng</b> dan <b className="text-[var(--cream)]">10/10 simbol &lt;/&gt;</b>!
              <br />
              Menu <b>Source Code</b> sekarang bisa diklik — lihat repo asli di GitHub.
            </p>
            <p
              className="mt-3 text-[11px] leading-relaxed text-white/25"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              spray {sprayCount}/10 · code {codeCount}/10
            </p>
            <button
              onClick={handleNext}
              className="mt-6 inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest bg-[var(--gold)] text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors cursor-pointer"
              style={{
                fontFamily: "var(--font-bungee), cursive",
                clipPath: "polygon(3% 0%, 97% 2%, 100% 92%, 4% 100%, 0% 8%)",
                boxShadow: "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)",
              }}
            >
              NEXT →
            </button>
          </div>
        </div>
      )}

      {/* Slide ucapan selamat + CTA hire */}
      {showSlide && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[var(--bg-dark)] px-6 text-center overflow-hidden brick-bg">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[15%] left-[12%] w-[260px] h-[260px] rounded-full bg-[var(--purple)] blur-[70px] opacity-15" />
            <div className="absolute bottom-[12%] right-[10%] w-[220px] h-[220px] rounded-full bg-[var(--gold)] blur-[70px] opacity-10" />
          </div>

          <div className="relative z-10 flex max-w-[560px] flex-col items-center gap-5">
            <p
              className="text-xs tracking-[0.25em] text-[var(--pink)]"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              // selamat!
            </p>
            <h2
              className="text-[clamp(28px,6vw,48px)] leading-none text-[var(--gold)]"
              style={{ fontFamily: "var(--font-bungee), cursive", textShadow: "2px 2px 0 var(--purple-deep), 5px 5px 0 var(--pink)" }}
            >
              KAMU LUAR BIASA!
            </h2>
            <div className="h-[10px] w-[60%] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] bg-[var(--gold)] opacity-60" />
            <p className="max-w-[420px] text-sm leading-relaxed text-white/65">
              {/* TODO_PLACEHOLDER_GRAND_FINALE: ganti teks ucapan & CTA di GrandFinale.tsx */}
              [Placeholder ucapan selamat — ganti dengan kata-kata custom kamu. Ceritakan bahwa kamu siap diajak kolaborasi, freelance, atau fulltime.]
            </p>
            <p className="max-w-[420px] text-sm leading-relaxed text-white/65">
              [Placeholder CTA — ajakan untuk menghubungi via email / LinkedIn / WhatsApp. Ganti dengan kontak asli.]
            </p>

            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {/* TODO_PLACEHOLDER_CONTACT_LINK: ganti href dengan link kontak asli */}
              <a
                href="mailto:rahadian@example.com"
                onClick={() => playClick()}
                className="inline-flex items-center justify-center px-7 py-3 text-sm tracking-widest bg-[var(--gold)] text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors"
                style={{
                  fontFamily: "var(--font-bungee), cursive",
                  clipPath: "polygon(3% 0%, 97% 2%, 100% 92%, 4% 100%, 0% 8%)",
                  boxShadow: "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)",
                }}
              >
                HUBUNGI SAYA →
              </a>
              <Link
                href="/"
                onClick={() => playClick()}
                className="inline-flex items-center justify-center px-6 py-3 text-sm tracking-widest border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                KEMBALI KE HOME
              </Link>
            </div>

            <button
              onClick={handleCloseSlide}
              className="mt-2 text-xs tracking-wide text-white/30 hover:text-white/60 underline"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
