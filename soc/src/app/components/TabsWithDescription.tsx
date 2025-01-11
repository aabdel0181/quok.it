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
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className="relative"
            onHoverStart={() => setActiveTab(tab.id)}
            onHoverEnd={() => setActiveTab(null)}
          >
            <div
              className={`
                relative
                ${activeTab === tab.id ? "z-50" : "z-0"}
              `}
            >
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full w-full bg-black/90 border border-white/10 border-b-0 rounded-t-lg overflow-hidden"
                  >
                    <div className="p-4 text-sm text-gray-300">
                      {tab.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className={`
                    px-8 py-3 text-lg font-medium
                    transition-all
                    border border-white/10
                    ${
                      activeTab === tab.id
                        ? "bg-black/90 text-red-500 rounded-b-lg border-t-0"
                        : "rounded-lg text-white hover:text-red-500"
                    }
                  `}
              >
                {tab.title}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
