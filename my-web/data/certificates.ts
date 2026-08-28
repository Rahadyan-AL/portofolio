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
    image: "/images/certificates/uuk.png",
    issuer: "[Nama penerbit / lembaga]",
    date: "[Bulan, Tahun]",
  },
  {
    title: "[Nama Sertifikat]",
    image: "/images/certificates/placeholder.png",
    issuer: "[Nama penerbit / lembaga]",
    date: "[Bulan, Tahun]",
  },
  {
    title: "[Nama Sertifikat]",
    image: "/images/certificates/placeholder.png",
    issuer: "[Nama penerbit / lembaga]",
    date: "[Bulan, Tahun]",
  },
];
