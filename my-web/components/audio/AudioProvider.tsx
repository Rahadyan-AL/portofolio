"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { getAudioEnabled, setAudioEnabled, STORAGE_KEYS } from "@/lib/storage";

type AudioCtxType = {
  enabled: boolean;
  volume: number;
  setEnabled: (v: boolean) => void;
  setVolume: (v: number) => void;
  toggle: () => void;
};

const AudioCtx = createContext<AudioCtxType>({
  enabled: true,
  volume: 0.3,
  setEnabled: () => {},
  setVolume: () => {},
  toggle: () => {},
});

export function useAudio() {
  return useContext(AudioCtx);
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabledState] = useState<boolean>(true);
  const [volume, setVolumeState] = useState<number>(0.3);

  // init from localStorage
  useEffect(() => {
    const v = getAudioEnabled();
    if (v !== null) setEnabledState(v);
    else setEnabledState(true); // default ON untuk bg (user sudah pilih di intro)

    const storedVol = localStorage.getItem("portfolio:volume");
    if (storedVol) {
      const n = Number(storedVol);
      if (!Number.isNaN(n)) setVolumeState(Math.max(0, Math.min(1, n)));
    }
  }, []);

  // create audio element
  useEffect(() => {
    const audio = new Audio("/audio/bg-loop.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onError = () => {
      // file placeholder kosong — fail silently
      console.warn("[Audio] bg-loop.mp3 not found or empty — add real file to public/audio/bg-loop.mp3");
    };
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []); // only once

  // sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    localStorage.setItem("portfolio:volume", String(volume));
  }, [volume]);

  // handle enabled changes (play/pause)
  const syncPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (enabled) {
      try {
        await audio.play();
      } catch {
        // autoplay blocked — will play on next user interaction
      }
    } else {
      audio.pause();
    }
  }, [enabled]);

  useEffect(() => {
    syncPlayback();
  }, [syncPlayback]);

  // also try to play on first user interaction if enabled but still paused
  useEffect(() => {
    if (!enabled) return;
    const handler = () => syncPlayback();
    window.addEventListener("click", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [enabled, syncPlayback]);

  const setEnabled = useCallback(
    (v: boolean) => {
      setEnabledState(v);
      setAudioEnabled(v);
      window.dispatchEvent(new Event("audio:changed"));
    },
    []
  );

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
  }, []);

  const toggle = useCallback(() => setEnabled(!enabled), [enabled, setEnabled]);

  return (
    <AudioCtx.Provider value={{ enabled, volume, setEnabled, setVolume, toggle }}>
      {children}
    </AudioCtx.Provider>
  );
}
