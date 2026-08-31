"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCollectibles } from "./CollectiblesContext";
import type { CollectibleType } from "@/lib/collectibles";

type Spawn = {
  type: CollectibleType;
  id: string;
  x: number; // vw %
  y: number; // vh %
  key: string;
};

function pickRandom<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

// posisi random tanpa hint teks, opacity rendah + pulse
export function CollectibleSpawner() {
  const pathname = usePathname();
  const { getUncollected, collectItem } = useCollectibles();
  const [active, setActive] = useState<Spawn | null>(null);
  const vanishRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleSpawn = useCallback(() => {
    if (spawnRef.current) clearTimeout(spawnRef.current);
    if (vanishRef.current) clearTimeout(vanishRef.current);

    // delay random 1.2s - 3.5s sebelum muncul (biar terasa tersembunyi)
    const delay = 1200 + Math.random() * 2300;
    spawnRef.current = setTimeout(() => {
      // pilih type random yang masih ada sisa
      const sprayLeft = getUncollected("spray");
      const codeLeft = getUncollected("code");
      const pool: CollectibleType[] = [];
      if (sprayLeft.length > 0) pool.push("spray");
      if (codeLeft.length > 0) pool.push("code");
      if (pool.length === 0) return; // sudah lengkap semua

      const chosenType = pickRandom(pool)!;
      const ids = chosenType === "spray" ? sprayLeft : codeLeft;
      const chosenId = pickRandom(ids)!;

      // posisi acak — hindari area nav kiri (56px + 260px) dan topbar
      // x: 35% - 90% , y: 20% - 85% biar tersebar
      const x = 35 + Math.random() * 55;
      const y = 20 + Math.random() * 60;

      setActive({ type: chosenType, id: chosenId, x, y, key: `${chosenType}-${chosenId}-${Date.now()}` });

      // hilang otomatis setelah 7 detik kalau tidak diklik (seperti mockup home)
      vanishRef.current = setTimeout(() => setActive(null), 7000);
    }, delay);
  }, [getUncollected]);

  // reset spawn tiap ganti halaman
  useEffect(() => {
    setActive(null);
    scheduleSpawn();
    return () => {
      if (spawnRef.current) clearTimeout(spawnRef.current);
      if (vanishRef.current) clearTimeout(vanishRef.current);
    };
  }, [pathname, scheduleSpawn]);

  if (!active) return null;

  const isSpray = active.type === "spray";

  return (
    <button
      key={active.key}
      onClick={() => {
        collectItem(active.type, active.id);
        setActive(null);
        // schedule next spawn setelah 2-4 detik
        if (vanishRef.current) clearTimeout(vanishRef.current);
        const nextDelay = 2000 + Math.random() * 2000;
        spawnRef.current = setTimeout(() => scheduleSpawn(), nextDelay);
      }}
      aria-label={isSpray ? "Koleksi kaleng cat" : "Koleksi simbol code"}
      className="fixed z-30 flex items-center justify-center select-none cursor-pointer"
      style={{
        left: `${active.x}%`,
        top: `${active.y}%`,
        transform: "translate(-50%, -50%)",
        opacity: 0.4,
        animation: "graffiti-pulse 1.6s ease-in-out infinite",
        filter: "drop-shadow(0 0 6px rgba(255,46,147,0.5))",
        background: "transparent",
        border: "none",
      }}
      title=""
    >
      {/* Tanpa teks/label — hanya ikon/gambar saja (placeholder, akan diganti custom) */}
      {isSpray ? (
        // TODO_PLACEHOLDER_SPRAY_ICON: ganti dengan <img src="/images/collectibles/spray.png" ... />
        <span className="text-[28px] leading-none" style={{ textShadow: "0 0 8px rgba(255,201,60,0.6)" }}>
          🎨
        </span>
      ) : (
        // TODO_PLACEHOLDER_CODE_ICON: ganti dengan <img src="/images/collectibles/code.png" ... />
        <span
          className="text-[22px] font-black tracking-tighter leading-none px-1"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            color: "var(--cream)",
            textShadow: "2px 2px 0 var(--purple-deep), 3px 3px 0 var(--pink)",
          }}
        >
          &lt;/&gt;
        </span>
      )}
    </button>
  );
}
