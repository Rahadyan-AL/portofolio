"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useI18n } from "@/lib/translations";
import SpotlightCardRaw from "@/components/SpotlightCard";
import FadeContentRaw from "@/components/FadeContent/FadeContent";
const SpotlightCard: any = SpotlightCardRaw;
const FadeContent: any = FadeContentRaw;

// GANTI dengan access key Web3Forms kamu
// Langkah setup ada di bawah file ini (komentar) dan akan dijelaskan di jawaban.
// Daftar di https://web3forms.com → Create Form → copy Access Key → paste di sini
export const WEB3FORMS_ACCESS_KEY = "PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE";

export default function ContactPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Semua field wajib diisi.");
      setStatus("error");
      return;
    }
    if (WEB3FORMS_ACCESS_KEY.includes("PASTE_YOUR")) {
      setErrorMsg("Form belum dikonfigurasi — ganti WEB3FORMS_ACCESS_KEY di app/contact/page.tsx dengan key dari web3forms.com");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          subject: `Pesan portfolio dari ${name.trim()}`,
          from_name: "Portfolio Contact Form",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMsg(data.message || "Gagal mengirim. Coba lagi.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Gagal terhubung ke server. Cek koneksi.");
      setStatus("error");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-[720px] px-6 py-[48px] max-[900px]:px-6 max-[900px]:py-8 text-center">
        <FadeContent blur duration={800} threshold={0.2}>
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
        </FadeContent>

        <FadeContent blur duration={800} delay={120} threshold={0.15}>
          <SpotlightCard
            className="mt-10 rounded-[16px] border border-white/10 bg-[#1c171c]/90 p-6 text-left shadow-[6px_6px_0_rgba(0,0,0,0.4)] md:p-8"
            spotlightColor="rgba(107,33,216,0.22)"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* honeypot anti-spam Web3Forms */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <FadeContent blur duration={600} delay={180}>
                <label className="block">
                  <span
                    className="mb-1.5 block text-[11px] tracking-[0.18em] text-white/60"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    NAMA
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full rounded-[10px] border border-white/12 bg-black/25 px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-[var(--gold)]/50 focus:bg-black/40 transition-colors"
                    style={{ fontFamily: "var(--font-space), sans-serif" }}
                  />
                </label>
              </FadeContent>

              <FadeContent blur duration={600} delay={260}>
                <label className="block">
                  <span
                    className="mb-1.5 block text-[11px] tracking-[0.18em] text-white/60"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    EMAIL
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@contoh.com"
                    className="w-full rounded-[10px] border border-white/12 bg-black/25 px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-[var(--gold)]/50 focus:bg-black/40 transition-colors [overflow-wrap:break-word]"
                    style={{ overflowWrap: "break-word", wordBreak: "normal" }}
                  />
                </label>
              </FadeContent>

              <FadeContent blur duration={600} delay={340}>
                <label className="block">
                  <span
                    className="mb-1.5 block text-[11px] tracking-[0.18em] text-white/60"
                    style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                  >
                    PESAN
                  </span>
                  <textarea
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tulis pesanmu di sini..."
                    rows={5}
                    className="w-full resize-y rounded-[10px] border border-white/12 bg-black/25 px-4 py-3 text-[14px] leading-relaxed text-white placeholder:text-white/30 outline-none focus:border-[var(--gold)]/50 focus:bg-black/40 transition-colors"
                    style={{ fontFamily: "var(--font-space), sans-serif" }}
                  />
                </label>
              </FadeContent>

              {status === "success" && (
                <div className="rounded-[10px] border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[13px] text-emerald-200">
                  Pesan terkirim! Terima kasih sudah menghubungi — akan dibalas secepatnya.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-[13px] text-red-200 break-words [overflow-wrap:break-word]">
                  {errorMsg}
                </div>
              )}

              <FadeContent blur duration={600} delay={420}>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center rounded-[10px] bg-[var(--gold)] px-6 py-3 text-sm tracking-widest text-[var(--bg-dark)] transition-colors hover:bg-[#ffd76a] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-bungee), cursive" }}
                >
                  {status === "loading" ? "MENGIRIM..." : "KIRIM PESAN →"}
                </button>
              </FadeContent>

              <p
                className="text-center text-[11px] leading-relaxed text-white/30"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                Didukung Web3Forms — tanpa backend, aman untuk GitHub Pages static export.
              </p>
            </form>
          </SpotlightCard>
        </FadeContent>
      </div>
    </MainLayout>
  );
}

/*
CATATAN SETUP WEB3FORMS (PILIHAN: Formspree alternatif ada di bawah):

1. Buka https://web3forms.com → klik "Get Started" / "Create Form"
2. Masukkan email kamu (rahadyancode@gmail.com) → verifikasi email jika diminta
3. Copy "Access Key" (string panjang seperti 123abc-... )
4. Paste ke file ini: WEB3FORMS_ACCESS_KEY = "123abc-..."
5. Commit & push ke GitHub Pages, form akan langsung bisa kirim ke email kamu.
   - Cek spam folder untuk email verifikasi pertama.
   - Free tier: 250 submissions/bulan, tanpa kartu kredit.
   - Tidak perlu backend — form POST ke https://api.web3forms.com/submit (sudah di-handle di handleSubmit).

ALTERNATIF FORMSPREE (jika prefer):
1. Daftar di https://formspree.io → Create Form → dapat endpoint https://formspree.io/f/{id}
2. Ganti fetch URL dari https://api.web3forms.com/submit menjadi endpoint Formspree,
   dan body menjadi FormData: new FormData(form) tanpa access_key.
3. Free tier 50 submissions/bulan.
*/
