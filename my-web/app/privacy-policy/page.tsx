import { MainLayout } from "@/components/layout/MainLayout";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Portfolio",
};

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-[800px] px-6 py-[48px] max-[900px]:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] text-white/50 hover:text-white/80"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          ← KEMBALI KE HOME
        </Link>

        <h1
          className="graffiti-heading mt-6 text-[clamp(28px,5vw,44px)]"
          style={{ fontFamily: "var(--font-bungee), cursive" }}
        >
          PRIVACY POLICY
        </h1>
        <p
          className="mt-2 text-[12px] tracking-[0.15em] text-white/40"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          Terakhir diperbarui: 15 September 2026 — placeholder, ganti dengan kebijakan asli jika diperlukan.
        </p>

        <div className="mt-8 space-y-6 rounded-[16px] border border-white/10 bg-[#1c171c]/80 p-6 text-[14px] leading-relaxed text-white/75 md:p-8">
          <p>
            Website portfolio ini menghormati privasi pengunjung. Halaman ini menjelaskan jenis informasi yang dikumpulkan
            dan bagaimana informasi tersebut digunakan. Ini adalah teks placeholder — silakan ganti dengan kebijakan
            privasi yang sesuai dengan kebutuhan hukum dan layanan yang kamu gunakan (mis. Web3Forms untuk form kontak).
          </p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            1. Informasi yang Dikumpulkan
          </h2>
          <p>
            Form kontak di halaman Contact mengirimkan nama, email, dan pesan yang kamu isi ke layanan pihak ketiga
            (Web3Forms atau Formspree) untuk diteruskan ke email pemilik situs. Tidak ada data lain yang disimpan di
            server situs ini karena situs di-host sebagai static site di GitHub Pages.
          </p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            2. Penggunaan Informasi
          </h2>
          <p>
            Informasi yang dikirim lewat form hanya digunakan untuk membalas pesan dan tidak dibagikan ke pihak lain.
            Log anonim (seperti yang disediakan GitHub Pages) mungkin mencatat akses halaman untuk keperluan statistik
            tanpa mengidentifikasi individu.
          </p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            3. Cookies
          </h2>
          <p>
            Situs ini tidak menggunakan cookies pelacakan. Preferensi bahasa disimpan di localStorage browser
            (<code className="rounded bg-white/10 px-1.5 py-0.5 text-[12px] text-white/80">portfolio:language</code>) dan
            tidak dikirim ke server.
          </p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            4. Tautan Eksternal
          </h2>
          <p>
            Tautan ke GitHub, LinkedIn, dan Instagram akan membuka situs pihak ketiga dengan kebijakan privasi
            masing-masing. Harap tinjau kebijakan mereka sebelum berinteraksi lebih lanjut.
          </p>

          <h2 className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-bungee), cursive" }}>
            5. Kontak
          </h2>
          <p>
            Jika ada pertanyaan tentang kebijakan ini, hubungi melalui form di{" "}
            <Link href="/contact" className="text-[var(--gold)] hover:underline">
              halaman Contact
            </Link>{" "}
            atau email langsung ke pemilik situs.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
