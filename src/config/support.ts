export type SupportMethod = {
  enabled: boolean;
  label: string;
  provider: "UPI" | "GitHub Sponsors" | "Buy Me a Coffee" | "PayPal" | "Stripe";
  qrCode?: string;
  url?: string;
};

export const supportMethods: readonly SupportMethod[] = [
  { enabled: false, label: "Direct support via UPI", provider: "UPI" },
  { enabled: false, label: "Sponsor open-source work", provider: "GitHub Sponsors" },
  { enabled: false, label: "Fuel the next late-night build", provider: "Buy Me a Coffee" },
  { enabled: false, label: "Global support channel", provider: "PayPal" },
  { enabled: false, label: "Card payments", provider: "Stripe" },
] as const;