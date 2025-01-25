import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/Navbar";
import "./globals.css";
import React from 'react';
import { Analytics } from "@vercel/analytics/react"
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-black flex flex-col`}>
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Analytics />

      </body>
    </html>
  );
};

export default Layout;
