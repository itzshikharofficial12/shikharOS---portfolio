"use client";

import { create } from "zustand";

import type { DesktopWindowId, DesktopWindowState } from "@/types/desktop";

type DesktopStore = {
  activeWindowId: DesktopWindowId | null;
  windows: Record<DesktopWindowId, DesktopWindowState>;
  focusWindow: (id: DesktopWindowId) => void;
  registerWindow: (window: DesktopWindowState) => void;
  setWindowMinimized: (id: DesktopWindowId, isMinimized: boolean) => void;
};

export const useDesktopStore = create<DesktopStore>((set) => ({
  activeWindowId: null,
  windows: {},
  focusWindow: (id) =>
    set((state) => ({
      activeWindowId: id,
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: false,
          zIndex: Math.max(0, ...Object.values(state.windows).map((window) => window.zIndex)) + 1,
        },
      },
    })),
  registerWindow: (window) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [window.id]: window,
      },
    })),
  setWindowMinimized: (id, isMinimized) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized,
        },
      },
    })),
}));