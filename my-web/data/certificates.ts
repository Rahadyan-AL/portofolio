export interface Certificate {
  title: string;
  image: string; // path/URL scan/foto sertifikat
  issuer: string; // nama penerbit / lembaga
  date: string; // Bulan, Tahun
}

// Data sertifikat — tambah 1 object untuk nambah sertifikat baru
export const certificates: Certificate[] = [
  {
    title: "Sertifikat Kompetensi (UUK)\nFull Stack Developer",
    image: "/images/sertifikat/sertif ukl.jpeg",
    issuer: "[SMK Telkom Malang]",
    date: "[Mei, 2026]",
  },
  {
    title: "[Coding Camp by DBS Foundation]",
    image: "/images/sertifikat/coding_camp.png",
    issuer: "[Dicoding X DBS foundation]",
    date: "[Januari-Mei, 2026]",
  },
  {
    title: "[Cyber Security Awareness]",
    image: "/images/sertifikat/cyber_security.png",
    issuer: "[SMK Telkom Malang]",
    date: "[Juni, 2024]",
  },
  {
    title: "[Bionix Competition]",
    image: "/images/sertifikat/bionix.png",
    issuer: "[Institut Teknologi Sepuluh November]",
    date: "[September, 2025]",
  },
  {
    title: "[Coming soon]",
    image: "/images/sertifikat/.png",
    issuer: "[-]",
    date: "[-, -]",
  },
  
];
