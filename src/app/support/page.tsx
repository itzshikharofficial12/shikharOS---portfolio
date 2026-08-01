import type { Metadata } from "next";

import { SupportModule } from "@/components/support/support-module";

export const metadata: Metadata = {
  description: "Support future SHIKHAR OS projects, experiments, and late-night builds.",
  title: "Support",
};

export default function SupportPage() {
  return <SupportModule />;
}