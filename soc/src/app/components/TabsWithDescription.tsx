"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  RocketLaunchIcon,
  ServerStackIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

interface TabInfo {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  benefits: string[];
  ctaText: string;
}

const tabs: TabInfo[] = [
  {
    id: "devs",
    title: "For Developers",
    icon: RocketLaunchIcon,
    description: "Access only the most reliable decentralized GPUs",
    benefits: [
      "AWS reliability, DePIN pricing",
      "Source from the best performing networks only",
      "Run a workload instantaneously",
    ],
    ctaText: "Let's Build →",
  },
  // {
  //   id: "networks",
  //   title: "For Compute Networks",
  //   icon: ServerStackIcon,
  //   description: "Enhance your network reliability and performance",
  //   benefits: [
  //     "Automated GPU verification",
  //     "Real-time network analytics",
  //     "Fraud prevention system",
  //   ],
  //   ctaText: "Upgrade Your Network →",
  // },
  {
    id: "providers",
    title: "For GPU Providers",
    icon: CpuChipIcon,
    description: "Maximize your GPU fleet's potential",
    benefits: [
      "Hardware verification toolkit",
      "Optimized reward distribution",
      "Priority access to top customers",
    ],
    ctaText: "Start Earning →",
  },
];

export const TabsWithDescription = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();

  const handleTabClick = () => {
    if (router) {
      router.push("/waitlist");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center gap-8">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className="relative"
            onHoverStart={() => setActiveTab(tab.id)}
            onHoverEnd={() => setActiveTab(null)}
            onClick={handleTabClick}
          >
            <div className={`relative ${activeTab === tab.id ? "z-50" : "z-0"}`}>
              <AnimatePresence>
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full w-80 bg-[var(--background)] 
                              border border-[var(--text-secondary)] border-b-0 rounded-t-xl 
                              overflow-hidden backdrop-blur-xl shadow-lg"
                  >
                    <div className="p-6 space-y-4">
                      {/* Description */}
                      <p className="text-[var(--foreground)] font-medium">
                        {tab.description}
                      </p>

                      {/* Benefits */}
                      <ul className="space-y-2">
                        {tab.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-center text-[var(--text-secondary)]"
                          >
                            <span className="mr-2 text-[var(--primary)]">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <button
                        className="w-full py-2 px-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] 
                                   text-[var(--background)] rounded-lg transition-all 
                                   font-medium text-sm shadow-md"
                      >
                        {tab.ctaText}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tab Button */}
              <button
                className={`px-8 py-3 text-lg font-medium transition-all border border-[var(--text-secondary)] 
                  flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-[var(--surface-dark)] text-[var(--primary)] rounded-b-xl border-t-0"
                      : "rounded-xl text-[var(--foreground)] hover:text-[var(--primary)]"
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.title}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
