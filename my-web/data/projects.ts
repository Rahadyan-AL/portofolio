export interface Project {
  title: string;
  screenshot: string; // path/URL gambar — ganti dengan file asli kamu
  description: string;
  techStack: string[];
  sourceCode: string; // URL repo
  demoLink?: string; // OPSIONAL — kalau kosong, tombol demo tidak tampil
}

// Data project — tambah 1 object untuk nambah project baru, TIDAK PERLU ubah kode tampilan
export const projects: Project[] = [
  {
    title: "Moklet Event Center",
    screenshot: "/images/projects/mec.webp",
    description: "Aplikasi mobile untuk mengelola dan mengikuti kegiatan lomba di lingkungan SMK Telkom Malang. Moklet Event Center (MEC) menyediakan satu tempat bagi siswa, panitia, dan admin kesiswaan untuk mengakses event, pendaftaran lomba, pengumuman, serta data operasional.",
    techStack: ["React Native", "Expo"],
    sourceCode: "https://github.com/Rahadyan-AL/Moklet-Event-Center-Front-End",
    // demoLink tidak diisi -> tombol demo tidak tampil
  },
  {
    title: "Website Ulang Tahun\nVice City",
    screenshot: "/images/projects/vice-city.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    techStack: ["Next.js", "Vercel"],
    sourceCode: "https://github.com/...",
    demoLink: "https://example.com",
  },
  {
    title: "[Nama Project]",
    screenshot: "/images/projects/placeholder.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    techStack: ["Tech A", "Tech B"],
    sourceCode: "https://github.com/...",
  },
];
