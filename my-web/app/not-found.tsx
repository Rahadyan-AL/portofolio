import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden brick-bg flex flex-col items-center justify-center px-6 text-center">
      {/* radial accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[18%] left-[15%] w-[260px] h-[260px] rounded-full bg-[var(--purple)] blur-[70px] opacity-15" />
        <div className="absolute bottom-[18%] right-[15%] w-[220px] h-[220px] rounded-full bg-[var(--pink)] blur-[70px] opacity-12" />
      </div>

      <Link
        href="/"
        className="absolute top-[30px] left-[56px] z-10 max-[900px]:left-6 max-[900px]:top-5"
        style={{ fontFamily: "var(--font-bungee), cursive" }}
      >
        <span className="graffiti-wordmark text-[24px]">RAHADYAN</span>
      </Link>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div
          className="graffiti-heading text-[clamp(80px,18vw,160px)] leading-none select-none"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          404
        </div>
        {/* smear */}
        <div className="h-[12px] w-[60%] rounded-[40%_60%_55%_45%_/_60%_40%_60%_40%] bg-[var(--pink)] opacity-60 -mt-4" />
        <p
          className="max-w-[420px] text-sm leading-relaxed text-white\/60"
          style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
        >
          Dinding ini kosong — halaman yang kamu cari tidak ada atau sudah dicat ulang.
        </p>
        <p
          className="font-mono text-xs tracking-[0.2em] text-white\/30"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          // page not found
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center px-8 py-3 text-sm tracking-widest bg-[var(--gold)] text-[var(--bg-dark)] hover:bg-[#ffd76a] transition-colors"
          style={{
            fontFamily: "var(--font-bungee), cursive",
            clipPath: "polygon(3% 0%, 97% 2%, 100% 92%, 4% 100%, 0% 8%)",
            boxShadow: "4px 4px 0 var(--purple-deep), 7px 7px 0 var(--pink)",
          }}
        >
          KEMBALI KE HOME →
        </Link>
      </div>
    </div>
  );
}
