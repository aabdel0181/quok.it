import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import "./globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quok.it",
  description: "GPU Network Analytics Dashboard",
  icons: {
    icon: "/favicon.png",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
