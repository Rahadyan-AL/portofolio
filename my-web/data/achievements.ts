// Achievement definitions — nama placeholder gampang diganti di sini
// TODO_PLACEHOLDER_ACHIEVEMENT_TBD: isi 4 nama di bawah dengan nama final kamu

export interface AchievementDef {
  id: string;
  trigger: string;
  name: string; // tampil di halaman achievement; "???" kalau locked
  placeholder?: boolean;
}

export const achievements: AchievementDef[] = [
  { id: "home", trigger: "Kunjungi halaman Home", name: "Welcome to the web" },
  { id: "about", trigger: "Kunjungi halaman About", name: "Get to know about me i see" },
  { id: "skill", trigger: "Kunjungi halaman Skill", name: "My skill, not bad right?" },
  { id: "project", trigger: "Kunjungi halaman Project", name: "the best from the best" },
  { id: "certificate", trigger: "Kunjungi halaman Sertifikat", name: "need more prove im good?" },
  { id: "all_pages", trigger: "Kelima achievement di atas terbuka semua", name: "Interested in me?" },
  { id: "stay_5min", trigger: "Diam di sebuah halaman selama 5 menit", name: "Need more time to consider" },
  {
    id: "terminal",
    trigger: "Menemukan easter egg terminal (sudo)",
    name: "TODO_ACHIEVEMENT_TBD_TERMINAL",
    placeholder: true,
  },
  {
    id: "console",
    trigger: "Membuka dev console (pesan tersembunyi)",
    name: "TODO_ACHIEVEMENT_TBD_CONSOLE",
    placeholder: true,
  },
  {
    id: "spray_full",
    trigger: "Koleksi 10/10 kaleng cat semprot",
    name: "TODO_ACHIEVEMENT_TBD_SPRAY_FULL",
    placeholder: true,
  },
  {
    id: "code_full",
    trigger: "Koleksi 10/10 simbol </>",
    name: "TODO_ACHIEVEMENT_TBD_CODE_FULL",
    placeholder: true,
  },
];
