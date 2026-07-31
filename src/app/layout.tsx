import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  authors: [{ name: "Shikhar", url: "https://github.com/itzshikharofficial12" }],
  creator: "Shikhar",
  title: {
    default: "SHIKHAR OS",
    template: "%s | SHIKHAR OS",
  },
  description: "Developer portfolio for Shikhar.",
  openGraph: {
    description: "Developer portfolio for Shikhar.",
    siteName: "SHIKHAR OS",
    title: "SHIKHAR OS",
    url: "https://github.com/itzshikharofficial12",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
