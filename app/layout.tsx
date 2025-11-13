import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PulseVote",
  description: "Create polls, share them, and see real-time results with PulseVote.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-50">
      <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>{children}</body>
    </html>
  );
}
