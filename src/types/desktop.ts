export type DesktopWindowId = string;

export type DesktopWindowState = {
  id: DesktopWindowId;
  isMinimized: boolean;
  isOpen: boolean;
  zIndex: number;
};