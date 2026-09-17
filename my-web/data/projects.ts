export interface Project {
  slug: string; // url-safe id untuk /project/[slug]
  title: string;
  screenshot: string; // path/URL gambar — ganti dengan file asli kamu
  description: string; // ringkas untuk kartu list
  fullDescription: string; // lebih lengkap untuk halaman detail
  techStack: string[];
  role: string; // peran kamu di project ini
  sourceCode: string; // URL repo
  demoLink?: string; // OPSIONAL — kalau kosong, tombol demo tidak tampil
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/--+/g, "-");
}

// Data project — tambah 1 object untuk nambah project baru, TIDAK PERLU ubah kode tampilan
export const projects: Project[] = [
  {
    slug: "moklet-event-center",
    title: "Moklet Event Center",
    screenshot: "/images/projects/mec.webp",
    description:
      "Aplikasi mobile untuk mengelola dan mengikuti kegiatan lomba di lingkungan SMK Telkom Malang.",
    fullDescription:
      "Moklet Event Center (MEC) adalah aplikasi mobile untuk mengelola dan mengikuti kegiatan lomba di SMK Telkom Malang. Satu tempat bagi siswa, panitia, dan admin kesiswaan untuk mengakses event, pendaftaran lomba, pengumuman, serta data operasional. Dibangun dengan fokus pada performa di device low-end dan UX yang sederhana agar panitia non-teknis tetap mudah mengelola event.",
    techStack: ["React Native", "Expo", "TypeScript", "REST API"],
    role: "UI/UX Desainer & Mobile Developer",
    sourceCode: "https://github.com/Rahadyan-AL/Moklet-Event-Center-Front-End",
  },
  {
    slug: "mangan-rek",
    title: "Mangan Rek!",
    screenshot: "/images/projects/mangan.png",
    description: "Website ulang tahun bertema GTA Vice City dengan animasi retro dan mini-game.",
    fullDescription:
      "Website interaktif untuk perayaan ulang tahun bertema GTA Vice City. Menampilkan hero section bergaya game 80-an, galeri foto dengan transisi VHS, dan mini-interaksi (easter egg) yang dibuat dengan animasi CSS/GSAP. Dideploy di Vercel dengan optimasi image Next.js.",
    techStack: ["Next.js", "Tailwind CSS", "GSAP", "Vercel"],
    role: "Frontend Developer",
    sourceCode: "https://github.com/...",
    demoLink: "https://example.com",
  },
  {
    slug: "add_qr",
    title: "[Bot Telegram-AddQR]",
    screenshot: "/images/projects/placeholder.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    fullDescription:
      "[Deskripsi lengkap project — ceritakan latar belakang masalah, solusi yang kamu bangun, tantangan teknis, dan hasil akhirnya. 2-4 paragraf.]",
    techStack: ["Tech A", "Tech B"],
    role: "-",
    sourceCode: "https://github.com/...",
  },
  {
    slug: "yt-downloader",
    title: "[Youtube Downloader]",
    screenshot: "/images/projects/placeholder.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    fullDescription:
      "[Deskripsi lengkap project — ceritakan latar belakang masalah, solusi yang kamu bangun, tantangan teknis, dan hasil akhirnya. 2-4 paragraf.]",
    techStack: ["Tech A", "Tech B"],
    role: "-",
    sourceCode: "https://github.com/...",
  },
  {
    slug: "pdam",
    title: "[Nama Project]",
    screenshot: "/images/projects/placeholder.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    fullDescription:
      "[Deskripsi lengkap project — ceritakan latar belakang masalah, solusi yang kamu bangun, tantangan teknis, dan hasil akhirnya. 2-4 paragraf.]",
    techStack: ["Tech A", "Tech B"],
    role: "[Peran kamu — contoh: Fullstack Developer / UI Designer / Project Lead]",
    sourceCode: "https://github.com/...",
  },
  {
    slug: "placeholder-project",
    title: "[Nama Project]",
    screenshot: "/images/projects/placeholder.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    fullDescription:
      "[Deskripsi lengkap project — ceritakan latar belakang masalah, solusi yang kamu bangun, tantangan teknis, dan hasil akhirnya. 2-4 paragraf.]",
    techStack: ["Tech A", "Tech B"],
    role: "[Peran kamu — contoh: Fullstack Developer / UI Designer / Project Lead]",
    sourceCode: "https://github.com/...",
  },
  {
    slug: "placeholder-project",
    title: "[Nama Project]",
    screenshot: "/images/projects/placeholder.png",
    description: "[Deskripsi singkat project, 1-2 kalimat.]",
    fullDescription:
      "[Deskripsi lengkap project — ceritakan latar belakang masalah, solusi yang kamu bangun, tantangan teknis, dan hasil akhirnya. 2-4 paragraf.]",
    techStack: ["Tech A", "Tech B"],
    role: "[Peran kamu — contoh: Fullstack Developer / UI Designer / Project Lead]",
    sourceCode: "https://github.com/...",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || slugify(p.title) === slug);
}
