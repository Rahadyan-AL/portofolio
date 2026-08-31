// Dev console easter egg — PRD 7.3
// Pesan muncul di browser console (F12 → Console) begitu halaman dimuat
// TODO_PLACEHOLDER_DEV_CONSOLE: ganti isi pesan di bawah dengan tulisan custom kamu
// Isi sementara = placeholder yang jelas, jangan dibiarkan kosong tanpa komentar

export function printDevConsoleMessage() {
  if (typeof window === "undefined") return;

  // Cegah print berulang di hot reload
  const w = window as unknown as { __devConsolePrinted?: boolean };
  if (w.__devConsolePrinted) return;
  w.__devConsolePrinted = true;

  const styleTitle = "color:#FFC93C; font-family: monospace; font-size:22px; font-weight:bold; text-shadow: 2px 2px 0 #3B1073, 4px 4px 0 #FF2E93;";
  const styleSub = "color:#F5F1E8; font-family: monospace; font-size:12px;";
  const styleHint = "color:#FF2E93; font-family: monospace; font-size:11px;";

  // TODO_PLACEHOLDER_DEV_CONSOLE_MESSAGE: ganti 3 baris di bawah dengan pesan kamu sendiri
  console.log("%cRAHADYAN // PORTFOLIO", styleTitle);
  console.log("%cHalo, kamu menemukan pesan tersembunyi! 👀", styleSub);
  console.log(
    "%c— TODO: tulis pesan custom kamu di lib/devConsole.ts —\n— contoh: cerita singkat, joke, atau ajakan hire —",
    styleHint
  );
  console.log(
    "%cKetik 'sudo' di halaman mana pun untuk membuka terminal rahasia. Ketik 'sudo hire me' di dalam terminal untuk kejutan.",
    "color:#6B21D8; font-family: monospace; font-size:11px; font-style:italic;"
  );
}
