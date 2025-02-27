"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { LeaderboardPanel } from "../components/LeaderboardPanel";
import {
  HiHome,
  HiCube,
  HiServer,
  HiUserGroup,
  HiInformationCircle,
} from "react-icons/hi";

export default function BetaPage() {
  const [activeTab, setActiveTab] = useState("Home");

  const tabs = [
    { id: "Home", icon: HiHome, label: "Home" },
    { id: "Rent", icon: HiCube, label: "Rent GPUs" },
    { id: "Provide", icon: HiServer, label: "Provide GPUs" },
    { id: "Partner", icon: HiUserGroup, label: "Partner" },
    { id: "About", icon: HiInformationCircle, label: "About" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  Network Performance Rankings
                </h2>
                <p className="text-[var(--text-secondary)] mt-2">
                  Real-time analytics of top-performing compute networks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="text-sm font-medium text-[var(--primary)]">
                  Live Updates
                </span>
              </div>
            </div>
            <LeaderboardPanel />
          </div>
        );
      case "Rent":
        return (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            GPU rental interface coming soon
          </div>
        );
      case "Provide":
        return (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            GPU provider dashboard coming soon
          </div>
        );
      case "Partner":
        return (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            Partnership opportunities coming soon
          </div>
        );
      case "About":
        return (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            About Quok.it coming soon
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-[var(--surface)] border-r border-[var(--border-light)] 
                 flex flex-col fixed h-screen"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Quok.it Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[var(--foreground)]">
                Quok.it
              </span>
              <span className="text-xs text-[var(--text-secondary)]">
                Trust Layer BETA
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                       transition-all duration-200 text-left font-medium
              ${
                activeTab === tab.id
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--foreground)] hover:bg-[var(--primary)] hover:bg-opacity-5"
              }`}
            >
              <tab.icon
                className={`w-5 h-5 ${
                  activeTab === tab.id ? "text-white" : "text-current"
                }`}
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="p-4 space-y-2 border-t border-[var(--border-light)]">
          <button
            className="w-full px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg 
                   hover:bg-[var(--primary-dark)] transition-colors text-sm font-medium"
          >
            Share Feedback
          </button>
          <button
            className="w-full px-4 py-2.5 border border-[var(--border-light)] rounded-lg
                   hover:bg-[var(--surface-dark)] transition-colors
                   text-[var(--foreground)] text-sm font-medium"
          >
            View Documentation
          </button>
        </div>

        {/* Beta Badge */}
        <div className="p-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] bg-opacity-10 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--primary)]">
              BETA Version 0.1
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 ml-64 p-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Streamlined Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1
                className="text-3xl font-bold text-[var(--foreground)] 
                         bg-clip-text text-transparent bg-gradient-to-r 
                         from-[var(--primary)] to-[var(--primary-dark)]"
              >
                Welcome to Quok.it Beta
              </h1>
              <p className="text-[var(--text-secondary)] mt-2">
                Bringing Transparency & Reliability to Decentralized Compute
                Networks
              </p>
            </motion.div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[var(--surface)] rounded-xl shadow-sm border border-[var(--border-light)] p-6"
          >
            {renderContent()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
