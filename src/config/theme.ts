export const theme = {
  colors: {
    background: "var(--color-background)",
    surface: "var(--color-surface)",
    border: "var(--color-border)",
    text: "var(--color-text)",
    muted: "var(--color-text-muted)",
    accent: "var(--color-accent)",
    secondary: "var(--color-secondary)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
  },
  fonts: {
    display: "var(--font-geist-sans)",
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  layout: {
    radius: "var(--radius-panel)",
    glassBlur: "var(--blur-glass)",
    softShadow: "var(--shadow-soft)",
  },
  spacing: {
    unit: "var(--space-1)",
  },
  motion: {
    reducedMotion: "user",
  },
} as const;

export type Theme = typeof theme;