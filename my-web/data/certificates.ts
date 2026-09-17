export type LocalizedString = { id: string; en: string };

export interface Certificate {
  title: LocalizedString;
  image: string;
  issuer: LocalizedString;
  date: LocalizedString;
}

export const certificates: Certificate[] = [
  {
    title: { id: "Sertifikat Kompetensi (UUK)\nFull Stack Developer", en: "Competency Certificate (UUK)\nFull Stack Developer" },
    image: "/images/sertifikat/sertif ukl.jpeg",
    issuer: { id: "SMK Telkom Malang", en: "SMK Telkom Malang" },
    date: { id: "Mei, 2026", en: "May, 2026" },
  },
  {
    title: { id: "[ISI SENDIRI: Coding Camp by DBS Foundation]", en: "[FILL IN: Coding Camp by DBS Foundation]" },
    image: "/images/sertifikat/coding_camp.png",
    issuer: { id: "[ISI SENDIRI: Dicoding X DBS Foundation]", en: "[FILL IN: Dicoding X DBS Foundation]" },
    date: { id: "[ISI SENDIRI: Januari-Mei, 2026]", en: "[FILL IN: January-May, 2026]" },
  },
  {
    title: { id: "[ISI SENDIRI: Cyber Security Awareness]", en: "[FILL IN: Cyber Security Awareness]" },
    image: "/images/sertifikat/cyber_security.png",
    issuer: { id: "[ISI SENDIRI: SMK Telkom Malang]", en: "[FILL IN: SMK Telkom Malang]" },
    date: { id: "[ISI SENDIRI: Juni, 2024]", en: "[FILL IN: June, 2024]" },
  },
  {
    title: { id: "[ISI SENDIRI: Bionix Competition]", en: "[FILL IN: Bionix Competition]" },
    image: "/images/sertifikat/bionix.png",
    issuer: { id: "[ISI SENDIRI: Institut Teknologi Sepuluh November]", en: "[FILL IN: Sepuluh Nopember Institute of Technology]" },
    date: { id: "[ISI SENDIRI: September, 2025]", en: "[FILL IN: September, 2025]" },
  },
  {
    title: { id: "[ISI SENDIRI: Coming soon]", en: "[FILL IN: Coming soon]" },
    image: "/images/sertifikat/.png",
    issuer: { id: "[ISI SENDIRI: -]", en: "[FILL IN: -]" },
    date: { id: "[ISI SENDIRI: -, -]", en: "[FILL IN: -, -]" },
  },
];
