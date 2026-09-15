import type { Metadata } from "next";
import { Bungee, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/components/layout/AppProviders";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Rahadyan Al Farisi — Portfolio",
  description:
    "Portfolio graffiti milik Rahadyan Al Farisi — Fullstack Developer. Lihat project, skill, dan sertifikat.",
  openGraph: {
    title: "Rahadyan Al Farisi — Portfolio",
    description:
      "Portfolio graffiti — Fullstack Developer. Lihat project, skill, dan sertifikat.",
    type: "website",
    locale: "id_ID",
  },
  // TODO_PLACEHOLDER_FAVICON: ganti dengan favicon RF graffiti setelah PRD & build awal selesai
  // Gunakan favicon.io atau realfavicongenerator.net
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full antialiased dark",
        bungee.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable
      )}
    >
      <body
        className="min-h-full flex flex-col brick-bg"
        style={{ fontFamily: "var(--font-space), Space Grotesk, sans-serif" }}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
