"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BetaPage() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = ["Home", "Rent", "Provide", "Partner", "About"];

  return (
    <div className="flex h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-[var(--surface)] border-r border-[var(--border-light)] p-6 flex flex-col"
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-12">
          <Image
            src="/logo.png"
            alt="Quok.it Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold text-[var(--foreground)]">
            Quok.it
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]"
                    : "text-[var(--foreground)] hover:bg-[var(--primary)] hover:bg-opacity-5"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Beta Badge */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] bg-opacity-10 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--primary)]">
              BETA
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8"
      >
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Quok.it Trust Layer — BETA
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Welcome to the future of decentralized compute management
          </p>
        </header>

        {/* Content area - to be populated based on active tab */}
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border-light)] p-6">
          {/* Content will be added here based on activeTab */}
          <div className="text-center text-[var(--text-secondary)]">
            Select a tab to get started
          </div>
        </div>
      </motion.div>
    </div>
  );
}
