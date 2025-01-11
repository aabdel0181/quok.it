"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "./Globe";
import { MetricCounter } from "./MetricCounter";

import { ParticleBackground } from "./ParticleBackground";

interface HomeViewProps {
  data: Array<{
    date: string;
    provider: string;
    capacity_gpu: number;
    available_gpu: number;
    utilization_gpu: number;
    leases: number;
    daily_earnings: number;
    protocol_earnings: number;
  }>;
}

export const HomeView: React.FC<HomeViewProps> = ({ data }) => {
  const [showContent, setShowContent] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Global glitch effect trigger
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        // Increased frequency (40% chance)
        setGlobalGlitch(true);
        setTimeout(() => setGlobalGlitch(false), 500);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticleBackground />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center pt-24 pb-8"
        >
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              The State of Compute
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Real-time analytics of decentralized GPU networks
          </motion.p>
        </motion.div>

        {/* Content Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Metrics Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-6 w-72"
            >
              <MetricCounter
                label="Total GPUs"
                metricType="total"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label="Available GPUs"
                metricType="available"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label="Network Utilization"
                metricType="utilization"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label="Daily Revenue"
                metricType="revenue"
                isGlitching={globalGlitch}
              />
            </motion.div>

            {/* Globe Container */}
            <div
              className="flex-1 relative"
              style={{ height: "calc(100vh - 300px)" }}
            >
              <Globe data={data} />
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* ... buttons ... */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
