// Central SFX via Web Audio API — 7 effects sesuai PRD 8
// Semua SFX respect audioEnabled (localStorage) — mute = tidak bunyi

import { getAudioEnabled } from "./storage";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx && ctx.state !== "closed") return ctx;
  try {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

function isMuted(): boolean {
  const v = getAudioEnabled();
  // null = belum pilih (default anggap ON untuk SFX agar ke-detect), tapi bg loop tetap butuh pilihan ON
  if (v === false) return true;
  return false;
}

// 1. Klik tombol/menu — short click
export function playClick() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.12, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.12);
  } catch {}
}

// 2. Hover menu — blip halus
export function playHover() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = 620;
    g.gain.setValueAtTime(0.06, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.07);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.07);
  } catch {}
}

// 3. Transisi antar halaman — swoosh (sweep down)
export function playSwoosh() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1200;
    o.type = "sawtooth";
    o.frequency.setValueAtTime(600, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(120, c.currentTime + 0.35);
    g.gain.setValueAtTime(0.14, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.35);
    o.connect(f).connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.35);
  } catch {}
}

// 4. Achievement unlock — chime dua nada (988 + 1480)
export function playAchievement() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    [988, 1480].forEach((freq, idx) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      const start = c.currentTime + idx * 0.08;
      g.gain.setValueAtTime(0.0001, start);
      g.gain.linearRampToValueAtTime(0.18, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);
      o.connect(g).connect(c.destination);
      o.start(start);
      o.stop(start + 0.6);
    });
  } catch {}
}

// 5. Koleksi ditemukan — spray (noise burst) + cling (achievement chime)
export function playSprayCling() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    const dur = 0.45;
    const bufferSize = Math.floor(c.sampleRate * dur);
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const noise = c.createBufferSource();
    noise.buffer = buffer;
    const band = c.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2600;
    band.Q.value = 0.7;
    const g1 = c.createGain();
    g1.gain.setValueAtTime(0.22, c.currentTime);
    g1.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    noise.connect(band).connect(g1).connect(c.destination);
    noise.start();
    noise.stop(c.currentTime + dur);

    setTimeout(() => {
      playAchievement();
    }, dur * 1000 - 60);
  } catch {}
}

// 6. Locked menu denied — buzz
export function playDenied() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "square";
    o.frequency.value = 140;
    g.gain.setValueAtTime(0.12, c.currentTime);
    g.gain.setValueAtTime(0.12, c.currentTime + 0.08);
    g.gain.linearRampToValueAtTime(0.0001, c.currentTime + 0.22);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.22);
    setTimeout(() => {
      try {
        if (isMuted()) return;
        const c2 = getCtx();
        if (!c2) return;
        const o2 = c2.createOscillator();
        const g2 = c2.createGain();
        o2.type = "square";
        o2.frequency.value = 110;
        g2.gain.setValueAtTime(0.1, c2.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.0001, c2.currentTime + 0.18);
        o2.connect(g2).connect(c2.destination);
        o2.start();
        o2.stop(c2.currentTime + 0.18);
      } catch {}
    }, 90);
  } catch {}
}

// 7. Typing di terminal — key tap (square 720Hz)
export function playKeyTap() {
  try {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "square";
    o.frequency.value = 720;
    g.gain.setValueAtTime(0.06, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.08);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.08);
  } catch {}
}
