export type LocalizedString = { id: string; en: string };

export interface Project {
  slug: string;
  title: LocalizedString;
  screenshot: string;
  description: LocalizedString;
  fullDescription: LocalizedString;
  techStack: string[];
  role: LocalizedString;
  sourceCode: string;
  demoLink?: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/\n/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/--+/g, "-");
}

export const projects: Project[] = [
  {
    slug: "moklet-event-center",
    title: { id: "Moklet Event Center", en: "Moklet Event Center" },
    screenshot: "/images/projects/mec.webp",
    description: {
      id: "Aplikasi mobile untuk mengelola dan mengikuti kegiatan lomba di lingkungan SMK Telkom Malang.",
      en: "Mobile app to manage and join competitions at SMK Telkom Malang.",
    },
    fullDescription: {
      id: "Moklet Event Center (MEC) adalah aplikasi mobile untuk mengelola dan mengikuti kegiatan lomba di SMK Telkom Malang. Satu tempat bagi siswa, panitia, dan admin kesiswaan untuk mengakses event, pendaftaran lomba, pengumuman, serta data operasional. Dibangun dengan fokus pada performa di device low-end dan UX yang sederhana agar panitia non-teknis tetap mudah mengelola event.",
      en: "Moklet Event Center (MEC) is a mobile app to manage and join competitions at SMK Telkom Malang. A single place for students, committees, and student affairs admins to access events, competition registrations, announcements, and operational data. Built with a focus on low-end device performance and simple UX so non-technical committees can easily manage events.",
    },
    techStack: ["React Native", "Expo", "TypeScript", "REST API"],
    role: { id: "Mobile Developer — UI, integrasi API event & pendaftaran, flow admin", en: "Mobile Developer — UI, event API integration & registration, admin flow" },
    sourceCode: "https://github.com/Rahadyan-AL/Moklet-Event-Center-Front-End",
  },
  {
    slug: "mangan-rek",
    title: { id: "Mangan Rek!", en: "Mangan Rek!" },
    screenshot: "/images/projects/mangan.png",
    description: {
      id: "Website pemesanan makanan lokal dengan kurasi UMKM Malang.",
      en: "Local food ordering website curating Malang MSMEs.",
    },
    fullDescription: {
      id: "[ISI SENDIRI: deskripsi lengkap Mangan Rek — latar belakang, fitur utama (katalog, keranjang, checkout), tantangan teknis, dan hasil. 2-4 paragraf.]",
      en: "[FILL IN: full description for Mangan Rek — background, main features (catalog, cart, checkout), technical challenges, and results. 2-4 paragraphs.]",
    },
    techStack: ["Next.js", "Tailwind CSS", "Prisma", "MySQL"],
    role: { id: "[ISI SENDIRI: peran kamu di Mangan Rek — contoh: Fullstack Developer]", en: "[FILL IN: your role in Mangan Rek — e.g., Fullstack Developer]" },
    sourceCode: "https://github.com/Rahadyan-AL/mangan-rek",
  },
  {
    slug: "vice-city-birthday",
    title: { id: "Website Ulang Tahun\nVice City", en: "Vice City\nBirthday Website" },
    screenshot: "/images/projects/vice-city.png",
    description: {
      id: "[ISI SENDIRI: deskripsi singkat project Vice City — 1-2 kalimat, tema retro GTA, animasi, mini-game.]",
      en: "[FILL IN: short description for Vice City project — 1-2 sentences, retro GTA theme, animations, mini-game.]",
    },
    fullDescription: {
      id: "[ISI SENDIRI: deskripsi lengkap Vice City — hero bergaya game 80-an, galeri VHS, easter egg dengan GSAP, deploy Vercel. 2-4 paragraf.]",
      en: "[FILL IN: full description for Vice City — 80s game hero, VHS gallery, easter eggs with GSAP, Vercel deploy. 2-4 paragraphs.]",
    },
    techStack: ["Next.js", "Tailwind CSS", "GSAP", "Vercel"],
    role: { id: "[ISI SENDIRI: peran kamu — Frontend Developer]", en: "[FILL IN: your role — Frontend Developer]" },
    sourceCode: "https://github.com/Rahadyan-AL/vice-city-birthday",
    demoLink: "https://example.com",
  },
  {
    slug: "add-qr-bot",
    title: { id: "[Bot Telegram-AddQR]", en: "[Telegram Bot-AddQR]" },
    screenshot: "/images/projects/placeholder.png",
    description: {
      id: "[ISI SENDIRI: deskripsi singkat AddQR — bot Telegram untuk generate QR, 1-2 kalimat.]",
      en: "[FILL IN: short description for AddQR — Telegram bot to generate QR, 1-2 sentences.]",
    },
    fullDescription: {
      id: "[ISI SENDIRI: deskripsi lengkap AddQR — latar belakang masalah, solusi, tantangan teknis, hasil. 2-4 paragraf.]",
      en: "[FILL IN: full description for AddQR — background, solution, technical challenges, results. 2-4 paragraphs.]",
    },
    techStack: ["Python", "Telegram API"],
    role: { id: "[ISI SENDIRI: peran kamu — Backend Developer]", en: "[FILL IN: your role — Backend Developer]" },
    sourceCode: "https://github.com/Rahadyan-AL/add-qr-bot",
  },
  {
    slug: "yt-downloader",
    title: { id: "[Youtube Downloader]", en: "[Youtube Downloader]" },
    screenshot: "/images/projects/placeholder.png",
    description: {
      id: "[ISI SENDIRI: deskripsi singkat YT Downloader — 1-2 kalimat.]",
      en: "[FILL IN: short description for YT Downloader — 1-2 sentences.]",
    },
    fullDescription: {
      id: "[ISI SENDIRI: deskripsi lengkap YT Downloader — latar belakang, solusi, tantangan, hasil. 2-4 paragraf.]",
      en: "[FILL IN: full description for YT Downloader — background, solution, challenges, results. 2-4 paragraphs.]",
    },
    techStack: ["Python", "yt-dlp"],
    role: { id: "[ISI SENDIRI: peran kamu — Developer]", en: "[FILL IN: your role — Developer]" },
    sourceCode: "https://github.com/Rahadyan-AL/yt-downloader",
  },
  {
    slug: "pdam-monitor",
    title: { id: "[PDAM Monitor]", en: "[PDAM Monitor]" },
    screenshot: "/images/projects/placeholder.png",
    description: {
      id: "[ISI SENDIRI: deskripsi singkat PDAM Monitor — 1-2 kalimat.]",
      en: "[FILL IN: short description for PDAM Monitor — 1-2 sentences.]",
    },
    fullDescription: {
      id: "[ISI SENDIRI: deskripsi lengkap PDAM Monitor — monitoring, dashboard, alert. 2-4 paragraf.]",
      en: "[FILL IN: full description for PDAM Monitor — monitoring, dashboard, alert. 2-4 paragraphs.]",
    },
    techStack: ["Next.js", "IoT"],
    role: { id: "[ISI SENDIRI: peran kamu — IoT Developer]", en: "[FILL IN: your role — IoT Developer]" },
    sourceCode: "https://github.com/Rahadyan-AL/pdam-monitor",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || slugify(typeof p.title === "string" ? p.title : p.title.id) === slug);
}
