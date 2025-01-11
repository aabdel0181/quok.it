"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TabInfo {
  id: string;
  title: string;
  description: string;
}

const tabs: TabInfo[] = [
  {
    id: "devs",
    title: "For Developers",
    description:
      "Access only the most reliable, high-performance GPUs instantly. We test GPUs across networks and only serve the most reliable ones you deserve ;)",
  },
  {
    id: "networks",
    title: "For Compute Networks",
    description:
      "Detect and ban fake GPUs. Improve network reliability. Maxamize utilization.",
  },
  {
    id: "providers",
    title: "For GPU Providers",
    description:
      "Verify your hardware. Improve your rewards. Increase your demand.",
  },
];

export const TabsWithDescription = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-center gap-8">
        {" "}
        {/* Increased gap from 4 to 8 */}
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className="relative"
            onHoverStart={() => setActiveTab(tab.id)}
            onHoverEnd={() => setActiveTab(null)}
          >
            <button
              className={`px-8 py-3 text-lg font-medium rounded-lg transition-all
                          ${
                            activeTab === tab.id
                              ? "bg-red-500/10 text-red-500"
                              : "text-white hover:text-red-500"
                          }`}
            >
              {tab.title}
            </button>

            <AnimatePresence>
              {activeTab === tab.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72
                              bg-black/90 backdrop-blur-lg border border-white/10
                              p-4 rounded-lg shadow-xl z-50"
                >
                  <div className="text-sm text-gray-300 text-center">
                    {tab.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
