"use client";

import { useCallback, useEffect, useRef } from "react";

type TypingAudioOptions = {
  enabled?: boolean;
};

export function useTypingAudio({ enabled = false }: TypingAudioOptions = {}) {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(
    () => () => {
      audioContextRef.current?.close().catch(() => undefined);
    },
    [],
  );

  const playKeystroke = useCallback(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    audioContextRef.current ??= new AudioContextConstructor();
    const context = audioContextRef.current;

    if (context.state === "suspended") {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 1100;
    gain.gain.setValueAtTime(0.012, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.018);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.02);
  }, [enabled]);

  return { playKeystroke };
}