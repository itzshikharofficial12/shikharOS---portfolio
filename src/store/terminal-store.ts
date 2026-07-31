"use client";

import { create } from "zustand";

import type { TerminalEntry } from "@/types/terminal";

type TerminalStore = {
  entries: readonly TerminalEntry[];
  history: readonly string[];
  clear: () => void;
  pushEntry: (entry: TerminalEntry) => void;
};

export const useTerminalStore = create<TerminalStore>((set) => ({
  entries: [],
  history: [],
  clear: () => set({ entries: [] }),
  pushEntry: (entry) =>
    set((state) => ({
      entries: [...state.entries, entry],
      history: [...state.history, entry.command],
    })),
}));